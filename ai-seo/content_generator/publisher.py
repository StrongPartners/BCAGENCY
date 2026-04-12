"""
CMS Publisher.
Uretilen icerigi WordPress veya Shopify'a publish eder.
"""

import logging
from datetime import datetime

import httpx

from utils.config import settings

logger = logging.getLogger("ai-seo.content_generator.publisher")


class CMSPublisher:
    """CMS'e icerik publish eden sinif."""

    def __init__(self, platform: str = "wordpress"):
        self.platform = platform

    async def publish(self, title: str, content: str, **kwargs) -> dict:
        """Icerigi secilen platforma publish et."""
        if self.platform == "wordpress":
            return await self._publish_wordpress(title, content, **kwargs)
        elif self.platform == "shopify":
            return await self._publish_shopify(title, content, **kwargs)
        else:
            raise ValueError(f"Desteklenmeyen platform: {self.platform}")

    async def _publish_wordpress(
        self,
        title: str,
        content: str,
        status: str = "draft",
        categories: list[int] | None = None,
        tags: list[int] | None = None,
        slug: str | None = None,
        meta_description: str | None = None,
    ) -> dict:
        """WordPress REST API ile icerik publish et."""
        if not settings.WP_URL:
            return {"error": "WordPress URL yapilandirilmamis", "status": "failed"}

        api_url = f"{settings.WP_URL.rstrip('/')}/wp-json/wp/v2/posts"

        post_data = {
            "title": title,
            "content": content,
            "status": status,  # draft, publish, pending
        }

        if slug:
            post_data["slug"] = slug
        if categories:
            post_data["categories"] = categories
        if tags:
            post_data["tags"] = tags
        if meta_description:
            post_data["excerpt"] = meta_description

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    api_url,
                    json=post_data,
                    auth=(settings.WP_USERNAME, settings.WP_APP_PASSWORD),
                    timeout=30.0,
                )
                response.raise_for_status()
                result = response.json()

                logger.info(
                    "WordPress post published: %s (ID: %s)", title, result.get("id")
                )
                return {
                    "platform": "wordpress",
                    "post_id": result.get("id"),
                    "url": result.get("link"),
                    "status": result.get("status"),
                    "published_at": datetime.utcnow().isoformat(),
                }

        except httpx.HTTPStatusError as e:
            logger.error("WordPress publish error: %s", e)
            return {"error": str(e), "status": "failed"}

    async def _publish_shopify(
        self,
        title: str,
        content: str,
        published: bool = False,
    ) -> dict:
        """Shopify API ile blog yazisi publish et."""
        if not settings.SHOPIFY_STORE_URL:
            return {"error": "Shopify URL yapilandirilmamis", "status": "failed"}

        api_url = (
            f"https://{settings.SHOPIFY_STORE_URL}/admin/api/2024-01/blogs/articles.json"
        )

        article_data = {
            "article": {
                "title": title,
                "body_html": content,
                "published": published,
            }
        }

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    api_url,
                    json=article_data,
                    headers={
                        "X-Shopify-Access-Token": settings.SHOPIFY_API_KEY,
                        "Content-Type": "application/json",
                    },
                    timeout=30.0,
                )
                response.raise_for_status()
                result = response.json()
                article = result.get("article", {})

                logger.info(
                    "Shopify article published: %s (ID: %s)",
                    title,
                    article.get("id"),
                )
                return {
                    "platform": "shopify",
                    "article_id": article.get("id"),
                    "url": f"https://{settings.SHOPIFY_STORE_URL}/blogs/{article.get('handle', '')}",
                    "status": "published" if published else "draft",
                    "published_at": datetime.utcnow().isoformat(),
                }

        except httpx.HTTPStatusError as e:
            logger.error("Shopify publish error: %s", e)
            return {"error": str(e), "status": "failed"}
