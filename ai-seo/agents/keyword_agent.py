"""
Keyword Research & Clustering Agent.
GSC verisini kullanarak keyword firsatlarini bulur ve cluster'lar.
"""

import logging

from langchain_core.prompts import ChatPromptTemplate

from agents.seo_agent import get_llm

logger = logging.getLogger("ai-seo.agents.keyword")


class KeywordAgent:
    """Keyword arastirma ve clustering agent'i."""

    SYSTEM_PROMPT = """Sen bir SEO keyword arastirma uzmansin. Gorevlerin:

1. Seed keyword'den ilgili keyword'leri bulmak
2. Keyword'leri semantic cluster'lara ayirmak
3. Her keyword icin search intent belirlemek (informational, transactional, navigational, commercial)
4. Keyword zorluk ve firsat tahmini yapmak
5. Content gap analizi yapmak
6. Long-tail keyword firsatlarini tespit etmek

GSC verilerini kullanarak gercek performans verisiyle karar ver.
Turkce yanit ver. Ciktiyi JSON formatinda ver."""

    def __init__(self, llm_provider: str | None = None):
        self.llm = get_llm(llm_provider)

    async def research(
        self, seed_keyword: str, site_url: str | None = None
    ) -> dict:
        """Keyword arastirmasi yap."""
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.SYSTEM_PROMPT),
                (
                    "human",
                    """Seed keyword: "{seed_keyword}"
Site URL: {site_url}

Bu keyword icin:
1. En az 20 ilgili keyword bul
2. Bunlari 3-5 semantic cluster'a ayir
3. Her keyword icin search intent belirle
4. Oncelik sirasi ver (kolay kazanim -> zor ama degerli)
5. Icerik onerileri sun (hangi keyword icin ne tur icerik uretilmeli)

Sonucu su JSON formatinda ver:
{{
    "seed_keyword": "...",
    "clusters": [
        {{
            "name": "Cluster Adi",
            "intent": "informational",
            "keywords": [
                {{
                    "keyword": "...",
                    "estimated_volume": "high/medium/low",
                    "difficulty": "easy/medium/hard",
                    "priority": 1,
                    "content_suggestion": "..."
                }}
            ]
        }}
    ],
    "content_plan": [
        {{
            "title": "Onerilen Yazi Basligi",
            "target_keywords": ["..."],
            "content_type": "blog/landing/guide",
            "estimated_impact": "high/medium/low"
        }}
    ]
}}""",
                ),
            ]
        )

        chain = prompt | self.llm
        response = await chain.ainvoke(
            {
                "seed_keyword": seed_keyword,
                "site_url": site_url or "Belirtilmedi",
            }
        )

        return {"seed_keyword": seed_keyword, "analysis": response.content}

    async def find_gaps(
        self, gsc_queries: list[dict], competitor_keywords: list[str] | None = None
    ) -> dict:
        """GSC verisi ve rakip keyword'leriyle gap analizi yap."""
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.SYSTEM_PROMPT),
                (
                    "human",
                    """GSC Query Verisi (mevcut sorgular):
{gsc_queries}

Rakip Keyword'leri:
{competitor_keywords}

Su analizleri yap:
1. Hangi keyword'lerde pozisyonumuz 8-20 arasi? (Quick win firsatlari)
2. Yuksek impression ama dusuk CTR olan keyword'ler neler? (Title/meta optimizasyonu)
3. Rakiplerin bizde olmayan keyword'leri neler? (Content gap)
4. Hangi keyword cluster'larda icerik eksiksiz?

Her firsat icin aksiyon ve tahmini etki belirt.""",
                ),
            ]
        )

        chain = prompt | self.llm
        response = await chain.ainvoke(
            {
                "gsc_queries": str(gsc_queries[:50]),
                "competitor_keywords": str(competitor_keywords or ["Veri yok"]),
            }
        )

        return {"gap_analysis": response.content}

    async def cluster_keywords(self, keywords: list[str]) -> dict:
        """Keyword listesini semantic cluster'lara ayir."""
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", self.SYSTEM_PROMPT),
                (
                    "human",
                    """Asagidaki keyword'leri semantic cluster'lara ayir:

{keywords}

Her cluster icin:
- Cluster adi
- Ana keyword (pillar)
- Alt keyword'ler (supporting)
- Search intent
- Onerilen icerik yapisi (pillar page + cluster content)""",
                ),
            ]
        )

        chain = prompt | self.llm
        response = await chain.ainvoke({"keywords": "\n".join(keywords)})

        return {"clusters": response.content}
