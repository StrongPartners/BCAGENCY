"""
Genel yardimci fonksiyonlar.
"""

import re
import logging
from urllib.parse import urlparse, urljoin

logger = logging.getLogger("ai-seo")


def setup_logging(level: str = "INFO"):
    """Loglama yapilandirmasi."""
    logging.basicConfig(
        level=getattr(logging, level.upper()),
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[
            logging.StreamHandler(),
            logging.FileHandler("ai-seo.log"),
        ],
    )


def normalize_url(url: str) -> str:
    """URL'yi normalize et (trailing slash, fragment kaldir)."""
    parsed = urlparse(url)
    # Fragment'i kaldir
    normalized = parsed._replace(fragment="")
    result = normalized.geturl()
    # Trailing slash ekle (path bossa)
    if not parsed.path or parsed.path == "/":
        result = result.rstrip("/") + "/"
    return result


def is_same_domain(url1: str, url2: str) -> bool:
    """Iki URL'nin ayni domain'de olup olmadigini kontrol et."""
    return urlparse(url1).netloc == urlparse(url2).netloc


def make_absolute_url(base_url: str, relative_url: str) -> str:
    """Relative URL'yi absolute URL'ye cevir."""
    return urljoin(base_url, relative_url)


def extract_domain(url: str) -> str:
    """URL'den domain'i cikar."""
    return urlparse(url).netloc


def slugify(text: str) -> str:
    """Metni URL-uyumlu slug'a cevir."""
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[-\s]+", "-", text)
    return text.strip("-")


def truncate(text: str, max_length: int, suffix: str = "...") -> str:
    """Metni belirli bir uzunlukta kes."""
    if len(text) <= max_length:
        return text
    return text[: max_length - len(suffix)] + suffix


def count_words(text: str) -> int:
    """Metindeki kelime sayisini hesapla."""
    return len(text.split())


def extract_meta_tag(html: str, name: str) -> str | None:
    """HTML'den meta tag degerini cikar."""
    pattern = rf'<meta\s+(?:name|property)=["\']?{re.escape(name)}["\']?\s+content=["\']([^"\']*)["\']'
    match = re.search(pattern, html, re.IGNORECASE)
    if match:
        return match.group(1)
    # content once gelebilir
    pattern = rf'<meta\s+content=["\']([^"\']*)["\']?\s+(?:name|property)=["\']?{re.escape(name)}["\']?'
    match = re.search(pattern, html, re.IGNORECASE)
    return match.group(1) if match else None
