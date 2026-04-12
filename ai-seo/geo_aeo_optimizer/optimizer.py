"""
GEO/AEO Optimizer.
Icerigi Generative Engine Optimization ve Answer Engine Optimization icin optimize eder.
ChatGPT, Perplexity, Gemini, Google AI Overviews icin citation-ready hale getirir.
"""

import logging

from langchain_core.prompts import ChatPromptTemplate

from agents.seo_agent import get_llm

logger = logging.getLogger("ai-seo.geo_aeo")


class GEOAEOOptimizer:
    """GEO/AEO icerik optimizer."""

    SYSTEM_PROMPT = """Sen bir GEO (Generative Engine Optimization) ve AEO (Answer Engine
Optimization) uzmansin. 2026'da AI aramalari (ChatGPT, Perplexity, Gemini, Google AI
Overviews) icin icerikleri optimize etme konusunda uzmansin.

Temel prensiplerin:
1. **Citation-Ready Yapilar**: AI'larin kolayca alintilayabilecegi net, ozlu cevaplar
2. **Knowledge Chunks**: Bagimsiz bilgi parcalari (her biri kendi basina anlamli)
3. **Structured Data**: Schema.org markup ile zenginlestirilmis icerik
4. **Answer-First Format**: Soruyu once cevapla, detaylari sonra ver
5. **Entity Clarity**: Konulari, kisileri, kavramlari net tanimla
6. **Source Attribution**: Guvenilir kaynaklara referans ver
7. **Freshness Signals**: Guncel veri ve tarih referanslari ekle

Turkce yanit ver."""

    def __init__(self, llm_provider: str | None = None):
        self.llm = get_llm(llm_provider)

    async def optimize(self, content: str) -> dict:
        """Icerigi GEO/AEO icin optimize et."""
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.SYSTEM_PROMPT),
                (
                    "human",
                    """Asagidaki icerigi GEO/AEO icin optimize et:

---
{content}
---

Optimizasyon adimlari:
1. **Knowledge Chunk'lar Olustur**: Her paragrafi bagimsiz bir bilgi parcasi olarak yapilandir
2. **Answer Boxes Ekle**: Temel sorulara 2-3 cumlelik net cevaplar ekle
3. **Liste ve Tablo Yapilari**: Bilgileri listeler ve tablolarla sun
4. **Entity Tanimlari**: Anahtar kavramlari net tanimla
5. **FAQ Schema**: Soru-cevap yapilarini schema-ready formata getir
6. **Citation Sinyalleri**: "[Kaynak]" referanslari ekle
7. **Freshness**: Tarih ve guncellik sinyalleri ekle

Cikti:
- OPTIMIZED_CONTENT: Tam optimize edilmis icerik
- KNOWLEDGE_CHUNKS: Bagimsiz bilgi parcalari listesi
- FAQ_SCHEMA: JSON-LD formatinda FAQ schema
- OPTIMIZATION_NOTES: Yapilan degisikliklerin ozeti
- GEO_SCORE: Tahmini GEO uyumluluk skoru (0-100)""",
                ),
            ]
        )

        chain = prompt | self.llm
        response = await chain.ainvoke({"content": content[:5000]})

        return {
            "optimized": response.content,
            "original_length": len(content),
        }

    async def generate_schema(self, content: str, page_type: str = "article") -> dict:
        """Icerige uygun JSON-LD schema olustur."""
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.SYSTEM_PROMPT),
                (
                    "human",
                    """Asagidaki icerik icin JSON-LD schema markup olustur:

Sayfa Tipi: {page_type}

Icerik:
---
{content}
---

Olusturulacak schema tipleri:
1. Ana schema (Article, BlogPosting, HowTo, FAQ, Product, vb.)
2. BreadcrumbList
3. Organization (varsa)
4. FAQPage (FAQ varsa)

Her schema'yi gecerli JSON-LD formatinda ver.
Schema'larin Google Rich Results Test'ten gecebilecek
kalitede olmasina dikkat et.""",
                ),
            ]
        )

        chain = prompt | self.llm
        response = await chain.ainvoke(
            {"content": content[:3000], "page_type": page_type}
        )

        return {"schemas": response.content, "page_type": page_type}

    async def check_ai_visibility(self, keyword: str, brand: str) -> dict:
        """
        Bir keyword icin AI arama motorlarindaki gorunurlugu kontrol et.
        (Not: Gercek implementasyonda AI arama API'leri kullanilir)
        """
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.SYSTEM_PROMPT),
                (
                    "human",
                    """"{keyword}" keyword'u icin "{brand}" markasinin AI arama
motorlarindaki potansiyel gorunurlugunu degerlendir:

1. **Google AI Overviews**: Bu keyword icin AI Overview gosterilir mi?
   Markamiz referans alinir mi?
2. **ChatGPT/Perplexity**: Bu konuda soru sorulsa markamiz onerilir mi?
3. **Gemini**: Google ekosisteminde gorunurlugumuz nasil?

Her platform icin:
- Mevcut durum tahmini
- Iyilestirme onerileri
- Oncelikli aksiyonlar

Not: Bu bir tahmin/strateji analizidir, gercek API sorgusu degil.""",
                ),
            ]
        )

        chain = prompt | self.llm
        response = await chain.ainvoke({"keyword": keyword, "brand": brand})

        return {
            "keyword": keyword,
            "brand": brand,
            "visibility_analysis": response.content,
        }
