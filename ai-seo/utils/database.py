"""
PostgreSQL veritabani baglantisi ve model tanimlari.
SQLAlchemy async engine kullanir.
"""

from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    Float,
    Integer,
    String,
    Text,
    Boolean,
    JSON,
    ForeignKey,
    create_engine,
)
from sqlalchemy.orm import DeclarativeBase, sessionmaker, relationship

from utils.config import settings


class Base(DeclarativeBase):
    pass


# --- Modeller ---


class Site(Base):
    """Takip edilen web siteleri."""

    __tablename__ = "sites"

    id = Column(Integer, primary_key=True, autoincrement=True)
    url = Column(String(500), unique=True, nullable=False)
    name = Column(String(200))
    gsc_property = Column(String(500))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    pages = relationship("Page", back_populates="site", cascade="all, delete-orphan")
    audits = relationship("Audit", back_populates="site", cascade="all, delete-orphan")


class Page(Base):
    """Taranan sayfalar."""

    __tablename__ = "pages"

    id = Column(Integer, primary_key=True, autoincrement=True)
    site_id = Column(Integer, ForeignKey("sites.id"), nullable=False)
    url = Column(String(1000), nullable=False)
    title = Column(String(500))
    meta_description = Column(Text)
    h1 = Column(String(500))
    status_code = Column(Integer)
    load_time = Column(Float)
    word_count = Column(Integer)
    schema_types = Column(JSON)
    internal_links_count = Column(Integer)
    external_links_count = Column(Integer)
    images_without_alt = Column(Integer)
    crawled_at = Column(DateTime, default=datetime.utcnow)

    site = relationship("Site", back_populates="pages")


class Audit(Base):
    """AI audit raporlari."""

    __tablename__ = "audits"

    id = Column(Integer, primary_key=True, autoincrement=True)
    site_id = Column(Integer, ForeignKey("sites.id"), nullable=False)
    audit_type = Column(String(50))  # technical, on_page, content, eeat
    score = Column(Float)
    findings = Column(JSON)
    recommendations = Column(JSON)
    auto_applied = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    site = relationship("Site", back_populates="audits")


class Keyword(Base):
    """Keyword verileri ve takibi."""

    __tablename__ = "keywords"

    id = Column(Integer, primary_key=True, autoincrement=True)
    keyword = Column(String(500), nullable=False)
    site_url = Column(String(500))
    cluster = Column(String(200))
    search_volume = Column(Integer)
    difficulty = Column(Float)
    current_position = Column(Float)
    impressions = Column(Integer)
    clicks = Column(Integer)
    ctr = Column(Float)
    intent = Column(String(50))  # informational, transactional, navigational
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class ContentPiece(Base):
    """Uretilen icerikler."""

    __tablename__ = "content_pieces"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(500), nullable=False)
    slug = Column(String(500))
    content = Column(Text, nullable=False)
    keyword = Column(String(500))
    content_type = Column(String(50))  # blog, landing_page, product
    status = Column(String(50), default="draft")  # draft, published, archived
    published_url = Column(String(1000))
    platform = Column(String(50))  # wordpress, shopify
    seo_score = Column(Float)
    geo_optimized = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    published_at = Column(DateTime)


class RankingHistory(Base):
    """Ranking degisim gecmisi."""

    __tablename__ = "ranking_history"

    id = Column(Integer, primary_key=True, autoincrement=True)
    keyword_id = Column(Integer, ForeignKey("keywords.id"), nullable=False)
    position = Column(Float)
    impressions = Column(Integer)
    clicks = Column(Integer)
    recorded_at = Column(DateTime, default=datetime.utcnow)


# --- Veritabani Baglantisi ---

engine = create_engine(settings.DATABASE_URL, echo=settings.DEBUG)
SessionLocal = sessionmaker(bind=engine)


async def init_db():
    """Veritabani tablolarini olustur."""
    Base.metadata.create_all(bind=engine)


def get_db():
    """Veritabani oturumu al."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
