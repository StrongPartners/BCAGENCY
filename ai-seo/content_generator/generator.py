"""
AI Icerik Uretici.
Keyword ve strateji bazli, E-E-A-T uyumlu icerik uretir.
Gunluk otomatik blog yazma dongusunu yonetir.
"""

import logging
from datetime import datetime

from langchain_core.prompts import ChatPromptTemplate

from agents.seo_agent import get_llm
from utils.helpers import slugify

logger = logging.getLogger("ai-seo.content_generator")


class ContentGenerator:
    """AI tabanli SEO icerik uretici."""

    BLOG_PROMPT = """Sen profesyonel bir SEO icerik yazarisin. E-E-A-T standartlarina
hakim, 2026 SEO trendlerini bilen bir uzmansin.

Icerik yazarken su kurallara uy:
1. Answer-first yaklasim: Soruyu hemen cevapla, detaylari sonra ver
2. E-E-A-T sinyalleri: Gercek deneyim, uzmanlik, kaynak gosterimi
3. SEO optimizasyonu: Keyword'u dogal sekilde yerlestir
4. GEO/AEO uyumlu: Net cevaplar, listeler, knowledge chunk'lar
5. Okunabilirlik: Kisa paragraflar, bullet point'ler, alt basliklar
6. Internal linking firsatlari icin yer birak
7. Turkce yaz, dogal ve akici bir dil kullan"""

    def __init__(self, llm_provider: str | None = None):
        self.llm = get_llm(llm_provider)

    async def generate(
        self,
        keyword: str,
        content_type: str = "blog",
        word_count: int = 1500,
        tone: str = "professional",
        additional_context: str = "",
    ) -> dict:
        """
        Keyword'e gore icerik uret.

        Args:
            keyword: Hedef keyword
            content_type: Icerik tipi (blog, guide, listicle, how-to, comparison)
            word_count: Hedef kelime sayisi
            tone: Yazi tonu (professional, casual, academic)
            additional_context: Ek baglam bilgisi
        """
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.BLOG_PROMPT),
                (
                    "human",
                    """Asagidaki bilgilere gore bir {content_type} yaz:

**Hedef Keyword**: {keyword}
**Kelime Sayisi**: ~{word_count} kelime
**Ton**: {tone}
**Ek Baglam**: {additional_context}

Icerik yapisi:
1. **Title** (H1): Keyword iceren, dikkat cekici, 60 karakterden kisa
2. **Meta Description**: 155-160 karakter, CTA iceren
3. **Giris Paragrafi**: Answer-first, keyword ilk 100 kelimede
4. **Ana Icerik**: H2/H3 alt basliklarla yapilandirilmis
5. **Sonuc/Ozet**: Ana noktalari ozetle
6. **FAQ Bolumu**: En az 3 ilgili soru-cevap (schema icin)
7. **Schema Onerisi**: Icerige uygun JSON-LD schema tipi

Ciktida su bolumler ayri olmali:
- TITLE: ...
- META_DESCRIPTION: ...
- SLUG: ...
- CONTENT: (tam icerik, markdown formatinda)
- FAQ: (soru-cevap listesi)
- SCHEMA_TYPE: ...
- SUGGESTED_INTERNAL_LINKS: (link onerileri)""",
                ),
            ]
        )

        chain = prompt | self.llm
        response = await chain.ainvoke(
            {
                "keyword": keyword,
                "content_type": content_type,
                "word_count": word_count,
                "tone": tone,
                "additional_context": additional_context or "Yok",
            }
        )

        content_text = response.content

        return {
            "keyword": keyword,
            "content_type": content_type,
            "slug": slugify(keyword),
            "generated_at": datetime.utcnow().isoformat(),
            "raw_content": content_text,
            "status": "draft",
        }

    async def improve_content(
        self, existing_content: str, keyword: str, gsc_data: dict | None = None
    ) -> dict:
        """Mevcut icerigi GSC verisine gore iyilestir."""
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.BLOG_PROMPT),
                (
                    "human",
                    """Asagidaki mevcut icerigi iyilestir:

**Hedef Keyword**: {keyword}
**GSC Verisi**: {gsc_data}

**Mevcut Icerik**:
---
{existing_content}
---

Iyilestirme alanlari:
1. Title ve meta description optimizasyonu
2. H1/H2/H3 yapisi duzeltmesi
3. Keyword yogunlugu ve dogal dagilimi
4. E-E-A-T sinyallerini guclendirme
5. GEO/AEO uyumlu knowledge chunk'lar ekleme
6. FAQ bolumu ekleme/guncelleme
7. Internal linking firsatlari

Degisiklikleri acikla ve iyilestirilmis icerigi ver.""",
                ),
            ]
        )

        chain = prompt | self.llm
        response = await chain.ainvoke(
            {
                "keyword": keyword,
                "existing_content": existing_content[:5000],
                "gsc_data": str(gsc_data) if gsc_data else "Veri yok",
            }
        )

        return {
            "keyword": keyword,
            "improvements": response.content,
            "improved_at": datetime.utcnow().isoformat(),
        }

    async def generate_daily_content(
        self, site_url: str, gsc_client=None
    ) -> list[dict]:
        """
        Gunluk otomatik icerik uretim dongusu.
        1. GSC'den dusuk performansli keyword'leri bul
        2. Her biri icin icerik uret
        3. Sonuclari dondur (publish icin hazir)
        """
        contents = []

        if gsc_client:
            # Keyword gap'leri bul
            gaps = gsc_client.get_keyword_gaps(site_url)

            # En yuksek firsatli 3 keyword icin icerik uret
            for gap in gaps[:3]:
                keyword = gap["keys"][0] if gap.get("keys") else None
                if keyword:
                    content = await self.generate(keyword=keyword)
                    contents.append(content)
                    logger.info("Daily content generated for keyword: %s", keyword)
        else:
            logger.warning(
                "GSC client not provided, skipping daily content generation"
            )

        return contents
