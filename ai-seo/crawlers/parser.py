"""
HTML Parser - Sayfa iceriginden SEO verilerini cikarir.
"""

import json
import re

from bs4 import BeautifulSoup

from utils.helpers import count_words


class PageParser:
    """HTML sayfasindan SEO ile ilgili verileri cikarir."""

    def parse(self, html: str, url: str) -> dict:
        """HTML icerigini parse et ve SEO verilerini dondur."""
        soup = BeautifulSoup(html, "html.parser")

        return {
            "title": self._get_title(soup),
            "meta_description": self._get_meta_description(soup),
            "meta_robots": self._get_meta_robots(soup),
            "canonical": self._get_canonical(soup),
            "h1": self._get_h1(soup),
            "h2_count": len(soup.find_all("h2")),
            "h3_count": len(soup.find_all("h3")),
            "heading_hierarchy": self._get_heading_hierarchy(soup),
            "word_count": self._get_word_count(soup),
            "images_total": len(soup.find_all("img")),
            "images_without_alt": self._count_images_without_alt(soup),
            "internal_links": self._get_internal_links(soup, url),
            "external_links": self._get_external_links(soup, url),
            "internal_links_count": len(self._get_internal_links(soup, url)),
            "external_links_count": len(self._get_external_links(soup, url)),
            "schema_types": self._get_schema_types(soup),
            "has_viewport": self._has_viewport(soup),
            "has_lang": self._has_lang(soup),
            "open_graph": self._get_open_graph(soup),
        }

    def _get_title(self, soup: BeautifulSoup) -> str | None:
        tag = soup.find("title")
        return tag.get_text(strip=True) if tag else None

    def _get_meta_description(self, soup: BeautifulSoup) -> str | None:
        tag = soup.find("meta", attrs={"name": "description"})
        return tag.get("content", "").strip() if tag else None

    def _get_meta_robots(self, soup: BeautifulSoup) -> str | None:
        tag = soup.find("meta", attrs={"name": "robots"})
        return tag.get("content", "").strip() if tag else None

    def _get_canonical(self, soup: BeautifulSoup) -> str | None:
        tag = soup.find("link", attrs={"rel": "canonical"})
        return tag.get("href", "").strip() if tag else None

    def _get_h1(self, soup: BeautifulSoup) -> str | None:
        tag = soup.find("h1")
        return tag.get_text(strip=True) if tag else None

    def _get_heading_hierarchy(self, soup: BeautifulSoup) -> list[dict]:
        """H1-H6 hiyerarsisini cikar."""
        headings = []
        for level in range(1, 7):
            for tag in soup.find_all(f"h{level}"):
                headings.append(
                    {"level": level, "text": tag.get_text(strip=True)[:200]}
                )
        return headings

    def _get_word_count(self, soup: BeautifulSoup) -> int:
        # Script ve style etiketlerini kaldir
        for tag in soup(["script", "style", "nav", "footer", "header"]):
            tag.decompose()
        text = soup.get_text(separator=" ", strip=True)
        return count_words(text)

    def _count_images_without_alt(self, soup: BeautifulSoup) -> int:
        images = soup.find_all("img")
        return sum(1 for img in images if not img.get("alt", "").strip())

    def _get_internal_links(self, soup: BeautifulSoup, base_url: str) -> list[str]:
        from urllib.parse import urlparse

        base_domain = urlparse(base_url).netloc
        links = []
        for a_tag in soup.find_all("a", href=True):
            href = a_tag["href"]
            parsed = urlparse(href)
            if not parsed.netloc or parsed.netloc == base_domain:
                links.append(href)
        return links

    def _get_external_links(self, soup: BeautifulSoup, base_url: str) -> list[str]:
        from urllib.parse import urlparse

        base_domain = urlparse(base_url).netloc
        links = []
        for a_tag in soup.find_all("a", href=True):
            href = a_tag["href"]
            parsed = urlparse(href)
            if parsed.netloc and parsed.netloc != base_domain:
                links.append(href)
        return links

    def _get_schema_types(self, soup: BeautifulSoup) -> list[str]:
        """JSON-LD schema tiplerini cikar."""
        schemas = []
        for script in soup.find_all("script", type="application/ld+json"):
            try:
                data = json.loads(script.string)
                if isinstance(data, dict):
                    schema_type = data.get("@type", "Unknown")
                    schemas.append(schema_type)
                elif isinstance(data, list):
                    for item in data:
                        if isinstance(item, dict):
                            schemas.append(item.get("@type", "Unknown"))
            except (json.JSONDecodeError, TypeError):
                continue
        return schemas

    def _has_viewport(self, soup: BeautifulSoup) -> bool:
        return soup.find("meta", attrs={"name": "viewport"}) is not None

    def _has_lang(self, soup: BeautifulSoup) -> bool:
        html_tag = soup.find("html")
        return bool(html_tag and html_tag.get("lang"))

    def _get_open_graph(self, soup: BeautifulSoup) -> dict:
        og_tags = {}
        for tag in soup.find_all("meta", attrs={"property": re.compile(r"^og:")}):
            prop = tag.get("property", "")
            content = tag.get("content", "")
            og_tags[prop] = content
        return og_tags
