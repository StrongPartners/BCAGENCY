"""
Ana SEO Orkestrasyon Agent.
Tum alt agent'lari koordine eder ve tam execution dongusu yonetir.
"""

import logging
from langchain_anthropic import ChatAnthropic
from langchain_openai import ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.prompts import ChatPromptTemplate

from utils.config import settings

logger = logging.getLogger("ai-seo.agents.seo")


def get_llm(provider: str | None = None):
    """LLM provider'a gore model dondur."""
    provider = provider or settings.DEFAULT_LLM

    if provider == "claude":
        return ChatAnthropic(
            model="claude-sonnet-4-20250514",
            api_key=settings.ANTHROPIC_API_KEY,
            max_tokens=4096,
        )
    elif provider == "openai":
        return ChatOpenAI(
            model="gpt-4o",
            api_key=settings.OPENAI_API_KEY,
        )
    elif provider == "gemini":
        return ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=settings.GOOGLE_GEMINI_API_KEY,
        )
    else:
        raise ValueError(f"Unknown LLM provider: {provider}")


class SEOAgent:
    """
    Ana SEO orkestrasyon agent'i.
    Tam execution dongusunu yonetir:
    1. Site tara
    2. GSC verisini cek
    3. Analiz et
    4. Aksiyon planla
    5. Uygula (low-risk auto-apply)
    6. Raporla
    """

    SYSTEM_PROMPT = """Sen bir uzman SEO analistisin. Gorevlerin:

1. Web sitelerini teknik ve icerik acisindan analiz etmek
2. Google Search Console verilerini yorumlamak
3. Keyword firsatlarini belirlemek
4. SEO optimizasyon onerileri sunmak
5. Low-risk degisiklikleri otomatik uygulamak
6. E-E-A-T standartlarina uygun icerik stratejisi olusturmak
7. GEO/AEO (Generative Engine Optimization) icin icerik optimize etmek

Her zaman veri odakli kararlar ver. Oneri verirken tahmini etki (traffic artisi %)
ve oncelik sirasi belirt. Turkce yanit ver."""

    def __init__(self, llm_provider: str | None = None):
        self.llm = get_llm(llm_provider)

    async def analyze_site(self, crawl_data: list[dict], gsc_data: list[dict]) -> dict:
        """
        Crawl + GSC verisini birlestirip kapsamli analiz yap.
        """
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.SYSTEM_PROMPT),
                (
                    "human",
                    """Asagidaki crawl ve GSC verilerini analiz et:

CRAWL VERISI (ilk 20 sayfa):
{crawl_data}

GSC PERFORMANS VERISI (ilk 50 sorgu):
{gsc_data}

Su analizleri yap:
1. Teknik SEO sorunlari (status code, load time, viewport, lang)
2. On-page eksiklikler (title, meta description, H1, alt text)
3. Icerik firsatlari (dusuk CTR ama yuksek impression)
4. Keyword gap'ler (pozisyon 8-20 arasi)
5. Schema eksiklikleri
6. Genel SEO skoru (0-100)

Her sorun icin oncelik (critical/high/medium/low) ve tahmini etki belirt.""",
                ),
            ]
        )

        chain = prompt | self.llm
        response = await chain.ainvoke(
            {
                "crawl_data": str(crawl_data[:20]),
                "gsc_data": str(gsc_data[:50]),
            }
        )

        return {
            "analysis": response.content,
            "pages_analyzed": len(crawl_data),
            "queries_analyzed": len(gsc_data),
        }

    async def create_action_plan(self, analysis: dict) -> dict:
        """Analiz sonucuna gore aksiyon plani olustur."""
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.SYSTEM_PROMPT),
                (
                    "human",
                    """Asagidaki SEO analizine gore bir aksiyon plani olustur:

{analysis}

Plan su kategorilerde olmali:
1. **Otomatik Uygulanabilir** (low-risk, hemen yapilabilir):
   - Title/meta description optimizasyonu
   - Missing alt text ekleme
   - Schema markup ekleme

2. **Manuel Onay Gerektiren** (medium-risk):
   - H1 degisiklikleri
   - Internal linking degisiklikleri
   - Icerik guncellemeleri

3. **Uzun Vadeli** (strateji):
   - Yeni icerik olusturma
   - Backlink stratejisi
   - Teknik altyapi degisiklikleri

Her aksiyon icin tahmini etki ve sure belirt.""",
                ),
            ]
        )

        chain = prompt | self.llm
        response = await chain.ainvoke({"analysis": str(analysis)})

        return {"action_plan": response.content}
