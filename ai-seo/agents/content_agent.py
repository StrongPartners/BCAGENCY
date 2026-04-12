"""
Content Strategy Agent.
Icerik stratejisi olusturur, icerik kalitesini degerlendirir.
"""

import logging

from langchain_core.prompts import ChatPromptTemplate

from agents.seo_agent import get_llm

logger = logging.getLogger("ai-seo.agents.content")


class ContentAgent:
    """Icerik stratejisi ve kalite degerlendirme agent'i."""

    SYSTEM_PROMPT = """Sen bir SEO icerik stratejistisin. E-E-A-T (Experience,
Expertise, Authoritativeness, Trustworthiness) standartlarina hakim, 2026 SEO
trendlerini bilen bir uzmansin.

Gorevlerin:
1. Mevcut icerigi E-E-A-T acisindan degerlendirmek
2. Icerik iyilestirme onerileri sunmak
3. Yeni icerik stratejisi olusturmak
4. Icerik takvimi planlamak
5. Answer-first yaklasimla icerik yapilandirmak
6. GEO/AEO icin icerik optimize etmek

Turkce yanit ver. Pratik ve uygulanabilir oneriler sun."""

    def __init__(self, llm_provider: str | None = None):
        self.llm = get_llm(llm_provider)

    async def evaluate_content(self, content: str, target_keyword: str) -> dict:
        """Mevcut icerigi SEO acisindan degerlendir."""
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.SYSTEM_PROMPT),
                (
                    "human",
                    """Asagidaki icerigi "{target_keyword}" keyword'u icin degerlendir:

---
{content}
---

Degerlendirme kriterleri:
1. **E-E-A-T Skoru** (0-100):
   - Experience: Gercek deneyim yansitiliyor mu?
   - Expertise: Uzmanlik seviyesi yeterli mi?
   - Authoritativeness: Otorite sinyalleri var mi?
   - Trustworthiness: Guvenilirlik sinyalleri var mi?

2. **SEO Optimizasyon Skoru** (0-100):
   - Keyword kullanimi (title, H1, ilk paragraf, dogal dagilim)
   - Heading yapisi (H1-H6 hiyerarsisi)
   - Internal/external linking
   - Gorsel optimizasyonu
   - Meta description uygunlugu

3. **Icerik Kalitesi** (0-100):
   - Derinlik ve kapsamlilik
   - Okunabilirlik
   - Benzersizlik
   - Kullanici amacina uygunluk
   - Guncellik

4. **GEO/AEO Uyumluluk** (0-100):
   - Citation-ready yapilar (net cevaplar, listeler)
   - Knowledge chunk'lar
   - Structured data uygunlugu
   - AI snippet potansiyeli

Her kategori icin skor ve iyilestirme onerileri ver.""",
                ),
            ]
        )

        chain = prompt | self.llm
        response = await chain.ainvoke(
            {"content": content[:5000], "target_keyword": target_keyword}
        )

        return {
            "target_keyword": target_keyword,
            "evaluation": response.content,
        }

    async def create_content_calendar(
        self,
        keywords: list[str],
        frequency: str = "daily",
        duration_weeks: int = 4,
    ) -> dict:
        """Icerik takvimi olustur."""
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.SYSTEM_PROMPT),
                (
                    "human",
                    """Asagidaki keyword'ler icin {frequency} {duration_weeks} haftalik icerik takvimi olustur:

Keyword'ler:
{keywords}

Takvim su formatta olmali:
- Tarih
- Baslik
- Hedef keyword
- Icerik turu (blog, guide, listicle, how-to, comparison)
- Tahmini kelime sayisi
- Oncelik (1-5)
- Not (ozel dikkat edilecek noktalar)

E-E-A-T ve GEO/AEO standartlarina uygun bir plan olustur.""",
                ),
            ]
        )

        chain = prompt | self.llm
        response = await chain.ainvoke(
            {
                "keywords": "\n".join(keywords),
                "frequency": frequency,
                "duration_weeks": duration_weeks,
            }
        )

        return {"content_calendar": response.content}
