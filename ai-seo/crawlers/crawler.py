"""
Site Crawler Motoru.
Tum sayfalari tarar, teknik verileri toplar.
robots.txt'e uyar, rate limit uygular.
"""

import asyncio
import logging
import time
from urllib.parse import urlparse
from urllib.robotparser import RobotFileParser

import httpx
from crawlers.parser import PageParser
from utils.config import settings
from utils.helpers import normalize_url, is_same_domain, make_absolute_url

logger = logging.getLogger("ai-seo.crawler")


class SiteCrawler:
    """Asenkron site crawler."""

    def __init__(self, base_url: str):
        self.base_url = normalize_url(base_url)
        self.domain = urlparse(self.base_url).netloc
        self.visited: set[str] = set()
        self.queue: list[str] = [self.base_url]
        self.results: list[dict] = []
        self.max_pages = settings.CRAWLER_MAX_PAGES
        self.delay = settings.CRAWLER_DELAY
        self.parser = PageParser()
        self.robots_parser = RobotFileParser()

    def _load_robots_txt(self):
        """robots.txt dosyasini yukle ve parse et."""
        robots_url = f"{urlparse(self.base_url).scheme}://{self.domain}/robots.txt"
        self.robots_parser.set_url(robots_url)
        try:
            self.robots_parser.read()
            logger.info("robots.txt loaded from %s", robots_url)
        except Exception as e:
            logger.warning("Could not load robots.txt: %s", e)

    def _can_crawl(self, url: str) -> bool:
        """robots.txt kuralina gore URL'nin taranabilir olup olmadigini kontrol et."""
        if not settings.CRAWLER_RESPECT_ROBOTS:
            return True
        return self.robots_parser.can_fetch(settings.CRAWLER_USER_AGENT, url)

    async def crawl(self) -> list[dict]:
        """Siteyi tara ve sonuclari dondur."""
        logger.info("Starting crawl for %s (max %d pages)", self.base_url, self.max_pages)
        self._load_robots_txt()

        async with httpx.AsyncClient(
            headers={"User-Agent": settings.CRAWLER_USER_AGENT},
            follow_redirects=True,
            timeout=30.0,
        ) as client:
            while self.queue and len(self.visited) < self.max_pages:
                url = self.queue.pop(0)
                url = normalize_url(url)

                if url in self.visited:
                    continue
                if not is_same_domain(url, self.base_url):
                    continue
                if not self._can_crawl(url):
                    logger.debug("Blocked by robots.txt: %s", url)
                    continue

                self.visited.add(url)
                page_data = await self._crawl_page(client, url)
                if page_data:
                    self.results.append(page_data)

                    # Yeni linkleri kuyruga ekle
                    for link in page_data.get("internal_links", []):
                        abs_link = make_absolute_url(self.base_url, link)
                        if abs_link not in self.visited:
                            self.queue.append(abs_link)

                # Rate limiting
                await asyncio.sleep(self.delay)

        logger.info("Crawl completed: %d pages crawled", len(self.results))
        return self.results

    async def _crawl_page(self, client: httpx.AsyncClient, url: str) -> dict | None:
        """Tek bir sayfayi tara."""
        start_time = time.time()

        try:
            response = await client.get(url)
            load_time = time.time() - start_time

            if "text/html" not in response.headers.get("content-type", ""):
                return None

            html = response.text
            parsed = self.parser.parse(html, url)

            page_data = {
                "url": url,
                "status_code": response.status_code,
                "load_time": round(load_time, 3),
                **parsed,
            }

            logger.debug("Crawled: %s (%d) in %.2fs", url, response.status_code, load_time)
            return page_data

        except httpx.TimeoutException:
            logger.warning("Timeout crawling %s", url)
            return {"url": url, "status_code": 0, "error": "timeout"}
        except Exception as e:
            logger.error("Error crawling %s: %s", url, e)
            return {"url": url, "status_code": 0, "error": str(e)}
