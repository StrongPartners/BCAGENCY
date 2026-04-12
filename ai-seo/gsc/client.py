"""
Google Search Console API Client.
Service Account ile GSC verilerini ceker.
"""

import logging
from datetime import datetime, timedelta

from google.oauth2 import service_account
from googleapiclient.discovery import build

from utils.config import settings

logger = logging.getLogger("ai-seo.gsc")

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]


class GSCClient:
    """Google Search Console API wrapper."""

    def __init__(self):
        self.service = self._authenticate()

    def _authenticate(self):
        """Service Account ile kimlik dogrulama."""
        credentials = service_account.Credentials.from_service_account_file(
            settings.GSC_SERVICE_ACCOUNT_FILE, scopes=SCOPES
        )
        return build("webmasters", "v3", credentials=credentials)

    def list_sites(self) -> list[dict]:
        """Erisim izni olan tum GSC property'lerini listele."""
        response = self.service.sites().list().execute()
        return response.get("siteEntry", [])

    def get_performance(
        self,
        site_url: str,
        days: int = 28,
        dimensions: list[str] | None = None,
    ) -> list[dict]:
        """
        Performans verisini getir (impressions, clicks, ctr, position).

        Args:
            site_url: GSC property URL'si (ornegin https://www.example.com/)
            days: Kac gunluk veri cekilecek
            dimensions: Boyutlar (query, page, country, device, date)
        """
        if dimensions is None:
            dimensions = ["query"]

        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=days)

        request_body = {
            "startDate": start_date.isoformat(),
            "endDate": end_date.isoformat(),
            "dimensions": dimensions,
            "rowLimit": 1000,
        }

        response = (
            self.service.searchanalytics()
            .query(siteUrl=site_url, body=request_body)
            .execute()
        )

        rows = response.get("rows", [])
        results = []
        for row in rows:
            results.append(
                {
                    "keys": row["keys"],
                    "clicks": row["clicks"],
                    "impressions": row["impressions"],
                    "ctr": round(row["ctr"] * 100, 2),
                    "position": round(row["position"], 1),
                }
            )

        logger.info(
            "GSC performance data fetched: %d rows for %s", len(results), site_url
        )
        return results

    def get_page_performance(
        self, site_url: str, days: int = 28
    ) -> list[dict]:
        """Sayfa bazli performans verisini getir."""
        return self.get_performance(
            site_url=site_url, days=days, dimensions=["page"]
        )

    def get_query_performance(
        self, site_url: str, days: int = 28
    ) -> list[dict]:
        """Sorgu bazli performans verisini getir."""
        return self.get_performance(
            site_url=site_url, days=days, dimensions=["query"]
        )

    def get_low_performing_pages(
        self,
        site_url: str,
        days: int = 28,
        min_impressions: int = 100,
        max_ctr: float = 2.0,
    ) -> list[dict]:
        """
        Dusuk performansli sayfalari bul.
        Yuksek impression ama dusuk CTR olan sayfalar = optimizasyon firsati.
        """
        pages = self.get_page_performance(site_url=site_url, days=days)

        low_performing = [
            page
            for page in pages
            if page["impressions"] >= min_impressions and page["ctr"] <= max_ctr
        ]

        # Impression'a gore sirala (en yuksek once)
        low_performing.sort(key=lambda x: x["impressions"], reverse=True)

        logger.info(
            "Found %d low-performing pages for %s", len(low_performing), site_url
        )
        return low_performing

    def get_keyword_gaps(
        self,
        site_url: str,
        days: int = 28,
        position_range: tuple[float, float] = (8.0, 20.0),
    ) -> list[dict]:
        """
        Keyword gap'leri bul.
        Pozisyon 8-20 arasi = biraz optimize edersen ilk sayfaya cikarsin.
        """
        queries = self.get_query_performance(site_url=site_url, days=days)

        gaps = [
            q
            for q in queries
            if position_range[0] <= q["position"] <= position_range[1]
        ]

        # Impression'a gore sirala
        gaps.sort(key=lambda x: x["impressions"], reverse=True)

        logger.info("Found %d keyword gaps for %s", len(gaps), site_url)
        return gaps

    def get_date_performance(
        self, site_url: str, days: int = 28
    ) -> list[dict]:
        """Tarih bazli performans trendi."""
        return self.get_performance(
            site_url=site_url, days=days, dimensions=["date"]
        )
