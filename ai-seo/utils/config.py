"""
Konfigrasyon yonetimi.
Tum ortam degiskenleri ve ayarlar burada merkezilestiriliyor.
"""

import os
from dataclasses import dataclass, field
from pathlib import Path

from dotenv import load_dotenv

# .env dosyasini yukle
load_dotenv(Path(__file__).parent.parent / ".env")


@dataclass
class Settings:
    """Uygulama ayarlari."""

    # Genel
    APP_NAME: str = "AI SEO Canavari"
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"

    # Veritabani
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", "postgresql://seo_user:seo_pass@localhost:5432/ai_seo_db"
    )

    # Google Search Console
    GSC_SERVICE_ACCOUNT_FILE: str = os.getenv(
        "GSC_SERVICE_ACCOUNT_FILE", "gsc-service-account.json"
    )

    # LLM API Keys
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    GOOGLE_GEMINI_API_KEY: str = os.getenv("GOOGLE_GEMINI_API_KEY", "")

    # Varsayilan LLM
    DEFAULT_LLM: str = os.getenv("DEFAULT_LLM", "claude")

    # PageSpeed Insights
    PAGESPEED_API_KEY: str = os.getenv("PAGESPEED_API_KEY", "")

    # WordPress CMS
    WP_URL: str = os.getenv("WP_URL", "")
    WP_USERNAME: str = os.getenv("WP_USERNAME", "")
    WP_APP_PASSWORD: str = os.getenv("WP_APP_PASSWORD", "")

    # Shopify CMS
    SHOPIFY_STORE_URL: str = os.getenv("SHOPIFY_STORE_URL", "")
    SHOPIFY_API_KEY: str = os.getenv("SHOPIFY_API_KEY", "")
    SHOPIFY_API_SECRET: str = os.getenv("SHOPIFY_API_SECRET", "")

    # Crawler Ayarlari
    CRAWLER_MAX_PAGES: int = int(os.getenv("CRAWLER_MAX_PAGES", "500"))
    CRAWLER_DELAY: float = float(os.getenv("CRAWLER_DELAY", "1.0"))
    CRAWLER_RESPECT_ROBOTS: bool = (
        os.getenv("CRAWLER_RESPECT_ROBOTS", "true").lower() == "true"
    )
    CRAWLER_USER_AGENT: str = os.getenv(
        "CRAWLER_USER_AGENT",
        "AI-SEO-Canavari/1.0 (+https://github.com/strongpartners/bcagency)",
    )

    # CORS
    CORS_ORIGINS: list[str] = field(
        default_factory=lambda: os.getenv(
            "CORS_ORIGINS", "http://localhost:3000,http://localhost:8501"
        ).split(",")
    )

    # Redis (Celery icin)
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")


settings = Settings()
