"""
AI SEO Canavari - Ana FastAPI Uygulamasi
Tam otonom yapay zeka destekli SEO uygulamasi.
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from utils.config import settings
from utils.database import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Uygulama baslatildiginda ve kapatildiginda calisir."""
    await init_db()
    yield


app = FastAPI(
    title="AI SEO Canavari",
    description="Tam otonom yapay zeka destekli SEO uygulamasi",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- API Routes ---


@app.get("/")
async def root():
    return {
        "app": "AI SEO Canavari",
        "version": "0.1.0",
        "status": "running",
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


# --- Crawl & Audit ---


@app.post("/api/crawl")
async def start_crawl(url: str):
    """Bir siteyi taramaya basla."""
    from crawlers.crawler import SiteCrawler

    crawler = SiteCrawler(base_url=url)
    results = await crawler.crawl()
    return {"status": "completed", "pages_crawled": len(results), "results": results}


@app.get("/api/audit/{site_id}")
async def get_audit(site_id: str):
    """Bir site icin AI audit raporu getir."""
    from agents.audit_agent import AuditAgent

    agent = AuditAgent()
    report = await agent.generate_report(site_id)
    return {"site_id": site_id, "report": report}


# --- GSC ---


@app.get("/api/gsc/performance")
async def gsc_performance(site_url: str, days: int = 28):
    """GSC performans verisini getir."""
    from gsc.client import GSCClient

    client = GSCClient()
    data = client.get_performance(site_url=site_url, days=days)
    return {"site_url": site_url, "days": days, "data": data}


@app.get("/api/gsc/pages")
async def gsc_pages(site_url: str, days: int = 28):
    """GSC sayfa bazli performans verisini getir."""
    from gsc.client import GSCClient

    client = GSCClient()
    data = client.get_page_performance(site_url=site_url, days=days)
    return {"site_url": site_url, "data": data}


# --- Content ---


@app.post("/api/content/generate")
async def generate_content(keyword: str, content_type: str = "blog"):
    """AI ile icerik uret."""
    from content_generator.generator import ContentGenerator

    generator = ContentGenerator()
    content = await generator.generate(keyword=keyword, content_type=content_type)
    return {"keyword": keyword, "content": content}


@app.post("/api/content/publish")
async def publish_content(title: str, content: str, platform: str = "wordpress"):
    """Icerigi CMS'e publish et."""
    from content_generator.publisher import CMSPublisher

    publisher = CMSPublisher(platform=platform)
    result = await publisher.publish(title=title, content=content)
    return {"status": "published", "result": result}


# --- Keywords ---


@app.post("/api/keywords/research")
async def keyword_research(seed_keyword: str, site_url: str | None = None):
    """Keyword arastirmasi yap."""
    from agents.keyword_agent import KeywordAgent

    agent = KeywordAgent()
    keywords = await agent.research(
        seed_keyword=seed_keyword, site_url=site_url
    )
    return {"seed_keyword": seed_keyword, "keywords": keywords}


# --- GEO/AEO ---


@app.post("/api/geo/optimize")
async def geo_optimize(content: str):
    """Icerigi GEO/AEO icin optimize et."""
    from geo_aeo_optimizer.optimizer import GEOAEOOptimizer

    optimizer = GEOAEOOptimizer()
    optimized = await optimizer.optimize(content=content)
    return {"optimized_content": optimized}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
