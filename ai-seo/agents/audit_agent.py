"""
Teknik SEO Audit Agent.
Crawl verilerini alir, teknik sorunlari analiz eder.
"""

import logging

from agents.seo_agent import get_llm
from langchain_core.prompts import ChatPromptTemplate

logger = logging.getLogger("ai-seo.agents.audit")


class AuditAgent:
    """Teknik SEO audit agent'i."""

    SYSTEM_PROMPT = """Sen bir teknik SEO uzmansin. Web sitelerinin teknik SEO
sorunlarini tespit eder ve cozum onerileri sunarsun.

Analiz alanlarin:
- Core Web Vitals (LCP, FID, CLS)
- Sayfa yuklenme suresi
- Mobile-first uyumluluk
- HTTPS ve guvenlik
- Schema markup
- Crawlability ve indexability
- Internal linking yapisi
- Duplicate content
- Redirect zincirleri
- 404 hatalari

Her sorun icin severity (critical/high/medium/low) ve fix onerisi ver.
Turkce yanit ver."""

    def __init__(self, llm_provider: str | None = None):
        self.llm = get_llm(llm_provider)

    async def generate_report(self, site_id: str) -> dict:
        """Site ID'ye gore audit raporu olustur."""
        # TODO: Veritabanindan crawl verisini cek
        return {
            "site_id": site_id,
            "status": "pending",
            "message": "Audit raporu olusturmak icin once site taranmalidir.",
        }

    async def audit_page(self, page_data: dict) -> dict:
        """Tek bir sayfa icin teknik audit yap."""
        issues = []

        # Status code kontrolu
        status = page_data.get("status_code", 0)
        if status >= 400:
            issues.append(
                {
                    "type": "status_code",
                    "severity": "critical",
                    "message": f"Sayfa {status} hatasi donuyor",
                    "fix": "Sayfayi duzelt veya redirect ekle",
                }
            )

        # Title kontrolu
        title = page_data.get("title")
        if not title:
            issues.append(
                {
                    "type": "missing_title",
                    "severity": "critical",
                    "message": "Title tag eksik",
                    "fix": "Sayfaya benzersiz ve keyword iceren title ekle",
                }
            )
        elif len(title) > 60:
            issues.append(
                {
                    "type": "title_too_long",
                    "severity": "medium",
                    "message": f"Title cok uzun ({len(title)} karakter, max 60)",
                    "fix": "Title'i 60 karakterin altina indir",
                }
            )

        # Meta description kontrolu
        meta_desc = page_data.get("meta_description")
        if not meta_desc:
            issues.append(
                {
                    "type": "missing_meta_description",
                    "severity": "high",
                    "message": "Meta description eksik",
                    "fix": "155-160 karakter arasi aciklayici meta description ekle",
                }
            )
        elif len(meta_desc) > 160:
            issues.append(
                {
                    "type": "meta_description_too_long",
                    "severity": "low",
                    "message": f"Meta description cok uzun ({len(meta_desc)} karakter)",
                    "fix": "160 karakterin altina indir",
                }
            )

        # H1 kontrolu
        h1 = page_data.get("h1")
        if not h1:
            issues.append(
                {
                    "type": "missing_h1",
                    "severity": "high",
                    "message": "H1 tag eksik",
                    "fix": "Sayfaya tek ve anlamli H1 ekle",
                }
            )

        # Image alt kontrolu
        images_no_alt = page_data.get("images_without_alt", 0)
        if images_no_alt > 0:
            issues.append(
                {
                    "type": "images_missing_alt",
                    "severity": "medium",
                    "message": f"{images_no_alt} gorsel alt text'siz",
                    "fix": "Tum gorsellere aciklayici alt text ekle",
                }
            )

        # Load time kontrolu
        load_time = page_data.get("load_time", 0)
        if load_time > 3.0:
            issues.append(
                {
                    "type": "slow_load_time",
                    "severity": "high",
                    "message": f"Sayfa yuklenme suresi yuksek ({load_time:.1f}s)",
                    "fix": "Gorsel optimizasyonu, lazy loading, caching uygula",
                }
            )

        # Schema kontrolu
        schemas = page_data.get("schema_types", [])
        if not schemas:
            issues.append(
                {
                    "type": "missing_schema",
                    "severity": "medium",
                    "message": "Structured data (schema) eksik",
                    "fix": "Sayfa tipine uygun JSON-LD schema ekle",
                }
            )

        # Mobile kontrolu
        if not page_data.get("has_viewport", False):
            issues.append(
                {
                    "type": "missing_viewport",
                    "severity": "critical",
                    "message": "Viewport meta tag eksik (mobile uyumsuz)",
                    "fix": '<meta name="viewport" content="width=device-width, initial-scale=1"> ekle',
                }
            )

        # Skor hesapla
        severity_weights = {"critical": 25, "high": 15, "medium": 8, "low": 3}
        total_penalty = sum(severity_weights.get(i["severity"], 0) for i in issues)
        score = max(0, 100 - total_penalty)

        return {
            "url": page_data.get("url"),
            "score": score,
            "issues_count": len(issues),
            "issues": issues,
        }

    async def audit_site(self, pages_data: list[dict]) -> dict:
        """Tum site icin audit raporu olustur."""
        page_audits = []
        total_score = 0

        for page in pages_data:
            audit = await self.audit_page(page)
            page_audits.append(audit)
            total_score += audit["score"]

        avg_score = total_score / len(page_audits) if page_audits else 0

        # AI ile genel yorum
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.SYSTEM_PROMPT),
                (
                    "human",
                    """Asagidaki site audit sonuclarini ozetle ve stratejik onerilerde bulun:

Ortalama Skor: {avg_score}/100
Toplam Sayfa: {total_pages}
Toplam Sorun: {total_issues}

En ciddi sorunlar:
{critical_issues}

Onceliklendirmis bir aksiyon plani olustur.""",
                ),
            ]
        )

        critical_issues = []
        for audit in page_audits:
            for issue in audit["issues"]:
                if issue["severity"] in ("critical", "high"):
                    critical_issues.append(
                        f"- [{issue['severity'].upper()}] {audit['url']}: {issue['message']}"
                    )

        chain = prompt | self.llm
        summary = await chain.ainvoke(
            {
                "avg_score": f"{avg_score:.1f}",
                "total_pages": len(page_audits),
                "total_issues": sum(a["issues_count"] for a in page_audits),
                "critical_issues": "\n".join(critical_issues[:20]),
            }
        )

        return {
            "average_score": round(avg_score, 1),
            "total_pages": len(page_audits),
            "total_issues": sum(a["issues_count"] for a in page_audits),
            "summary": summary.content,
            "page_audits": page_audits,
        }
