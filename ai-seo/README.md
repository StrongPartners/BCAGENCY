# AI SEO Canavari - Tam Otonom Yapay Zeka Destekli SEO Uygulamasi

**Kendi SEO ajanin: Siteyi tarar -> Eksikleri bulur -> GSC verisiyle karar verir -> Gunluk otomatik blog yazar -> H1, keyword, schema optimize eder -> CMS'e publish eder -> Predictive ranking tahmini yapar.**

2026'da SEO artik "oneri" degil, **tam execution** istiyor. Bu proje klasik araclarin (Surfer, SEMrush) otesinde: **tam kapali dongu + GEO/AEO + predictive analytics + multi-LLM**.

## Ozellikler (Benzersizlik Noktalari)

- **Tam Site Tarama & AI Audit**: Crawler ile tum sayfalari tarar, teknik/on-page/icerik/E-E-A-T eksiklerini AI ile analiz eder.
- **Google Search Console Entegrasyonu**: Gercek zamanli performans, index coverage, impressions/clicks verisi ceker.
- **Gunluk Otomatik Blog & Icerik Otomasyonu**: Dusuk performansli sayfalari tespit eder -> gap keyword bulur -> E-E-A-T uyumlu icerik uretir -> H1/H2/title/meta/schema optimize eder -> CMS'e (WordPress/Shopify) otomatik publish.
- **GEO/AEO Optimizasyonu**: Icerigi ChatGPT, Perplexity, Gemini, Google AI Overviews icin citation-ready hale getirir (knowledge chunk, structured data).
- **Predictive Analytics**: "Bu optimizasyonu yaparsan tahmini +%X traffic" tahmini.
- **Tam Execution**: Sadece oneri degil, **dogrudan uygular** (low-risk degisiklikler auto-apply).
- **Multi-LLM Ensemble**: Claude + GPT-4o + Gemini ile daha kaliteli kararlar.
- **Dashboard & Alert**: Gercek zamanli rapor, ranking dususu bildirimi.
- **Yerel SEO & Off-Page**: GBP entegrasyonu, backlink opportunity scanner.

**Mevcut araclardan farki**: Cogu "oner" der. Bu proje **yapar** ve 2026'nin en kritik katmanlari (GEO/AEO + predictive) ile one cikar.

## 2026 A'dan Z'ye SEO Yol Haritasi (Temel Referans)

**Foundation (A-C)**
- Audit & Baseline (GSC + GA4)
- Teknik Temel (Core Web Vitals, HTTPS, mobile-first)
- Crawl & Index Yonetimi

**On-Page & Content (D-G)**
- Semantic Keyword Research & Clustering
- H1-H6 hiyerarsisi, internal linking, schema
- E-E-A-T guclu, answer-first icerik

**Off-Page & Local (H-K)**
- Backlink + Yerel Citation
- Google Business Profile optimizasyonu

**Advanced (L-Z)**
- SXO + AIO + GEO + AEO
- Surekli predictive monitoring

## Proje Gelistirme Yol Haritasi (Asamalar)

### Asama 1: Temel Kurulum (1-2 hafta)
- FastAPI backend kurulumu
- PostgreSQL veritabani baglantisi
- GSC Service Account entegrasyonu
- Temel proje yapisinin olusturulmasi

### Asama 2: Site Tarama & Audit Motoru (2-3 hafta)
- Playwright/Scrapy tabanli crawler
- Teknik SEO analizi (Core Web Vitals, meta tags, schema)
- On-page analiz (H1-H6, internal links, image alt)
- AI destekli audit raporu olusturma

### Asama 3: Keyword & Gunluk Otomatik Icerik (3-4 hafta)
- Keyword research & clustering
- Gap analizi (GSC verisiyle)
- LangChain agent ile icerik uretimi
- E-E-A-T uyumlu blog yazma
- CMS entegrasyonu (WordPress REST API)

### Asama 4: Optimizasyon & Execution (2 hafta)
- Otomatik H1/title/meta optimizasyonu
- Schema markup olusturma ve ekleme
- Internal linking onerisi ve uygulama
- Low-risk degisikliklerin auto-apply'i

### Asama 5: Yerel & Off-Page + Izleme (2 hafta)
- Google Business Profile entegrasyonu
- Backlink opportunity scanner
- Ranking tracking & alert sistemi
- Competitor monitoring

### Asama 6: Advanced Ozellikler (Surekli)
- GEO/AEO optimizasyonu
- Predictive analytics motoru
- Multi-LLM ensemble kararlari
- A/B test entegrasyonu

## Teknoloji Stack

- **Backend**: Python 3.11+ / FastAPI
- **Crawler**: Playwright + BeautifulSoup (LibreCrawl'dan esinlenme)
- **AI Layer**: LangChain + Claude 3.5 / GPT-4o / Gemini
- **Veritabani**: PostgreSQL + SQLAlchemy
- **Frontend/Dashboard**: Streamlit
- **Task Queue**: Celery + Redis (zamanlanmis gorevler icin)
- **Containerization**: Docker + Docker Compose

## Gerekli API'ler ve Kurulumlar

### 1. Google Search Console (GSC) Service Account JSON Key

1. [Google Cloud Console](https://console.cloud.google.com/)'a gir.
2. Yeni proje olustur (ornek: `ai-seo-canavari`).
3. **API & Services > Library**'den **Search Console API**'yi ara ve **Enable** et.
4. **IAM & Admin > Service Accounts** > **Create Service Account**.
   - Isim: `seo-agent`
   - Role: **Viewer**
5. Service account olusturulduktan sonra **Keys > Add Key > Create new key > JSON** sec ve indir.
   **Dosya adi**: `gsc-service-account.json` (asla GitHub'a yukleme!)
6. Indirdigin JSON dosyasindaki **client_email**'i kopyala.
7. [Google Search Console](https://search.google.com/search-console/)'a git > Property Settings > **Users and permissions** > Add user > Service account email'ini **Restricted** yetkiyle ekle.

### 2. Diger API'ler

- **LLM API'leri**: Anthropic (Claude), OpenAI, Google Gemini -> `.env` dosyasina API key'leri ekle.
- **GA4** (opsiyonel): Google Analytics Admin API enable et, ayni service account kullan.
- **PageSpeed Insights**: Ucretsiz API key al (Google Cloud).
- **CMS Entegrasyonu**: WordPress icin REST API + Application Password veya Shopify API key.

## Kurulum

```bash
git clone https://github.com/strongpartners/bcagency.git
cd bcagency/ai-seo

# Ortam degiskenlerini ayarla
cp .env.example .env
# .env dosyasini duzenle ve API key'lerini ekle

# GSC JSON key dosyasini ai-seo/ dizinine koy
# .env'de GSC_SERVICE_ACCOUNT_FILE yolunu belirt

# Python bagimliklarini yukle
pip install -r requirements.txt

# Docker ile PostgreSQL ve Redis'i baslat
docker-compose up -d

# Uygulamayi baslat
uvicorn main:app --reload --port 8000

# Dashboard'u baslat (ayri terminal)
streamlit run dashboard/app.py
```

## Proje Yapisi

```
ai-seo/
├── agents/                  # LangChain AI agent'lar
│   ├── __init__.py
│   ├── audit_agent.py       # Teknik SEO audit agent
│   ├── content_agent.py     # Icerik uretim agent
│   ├── keyword_agent.py     # Keyword research agent
│   └── seo_agent.py         # Ana SEO orkestrasyon agent
├── crawlers/                # Site crawler modulu
│   ├── __init__.py
│   ├── crawler.py           # Ana crawler motoru
│   └── parser.py            # HTML parser & veri cikarma
├── gsc/                     # Google Search Console wrapper
│   ├── __init__.py
│   └── client.py            # GSC API client
├── content_generator/       # Gunluk icerik uretimi
│   ├── __init__.py
│   ├── generator.py         # AI icerik uretici
│   └── publisher.py         # CMS publisher (WordPress/Shopify)
├── geo_aeo_optimizer/       # GEO/AEO optimizasyonu
│   ├── __init__.py
│   └── optimizer.py         # Citation-ready icerik optimizer
├── dashboard/               # Streamlit dashboard
│   ├── __init__.py
│   └── app.py               # Dashboard ana uygulama
├── utils/                   # Yardimci moduller
│   ├── __init__.py
│   ├── config.py            # Konfigrasyon yonetimi
│   ├── database.py          # PostgreSQL baglantisi
│   └── helpers.py           # Genel yardimci fonksiyonlar
├── tests/                   # Test dosyalari
│   ├── __init__.py
│   ├── test_crawler.py
│   ├── test_gsc.py
│   └── test_agents.py
├── main.py                  # FastAPI ana uygulama
├── requirements.txt         # Python bagimliliklari
├── .env.example             # Ortam degiskenleri sablonu
├── docker-compose.yml       # Docker konfigurasyonu
├── Dockerfile               # Docker image
└── README.md                # Bu dosya
```

## Kullanilacak Acik Kaynak GitHub Repolari

### Awesome List'ler
- [serpapi/awesome-seo-tools](https://github.com/serpapi/awesome-seo-tools) - Kapsamli SEO araclari listesi
- [best-of-ai/awesome-ai-seo](https://github.com/best-of-ai/awesome-ai-seo) - AI SEO araclari

### Crawler & Audit
- [every-app/open-seo](https://github.com/every-app/open-seo) - Open-source Semrush alternatifi
- [PhialsBasement/LibreCrawl](https://github.com/PhialsBasement/LibreCrawl) - Screaming Frog alternatifi
- [sethblack/python-seo-analyzer](https://github.com/sethblack/python-seo-analyzer) - Python SEO analyzer
- [StJudeWasHere/seonaut](https://github.com/StJudeWasHere/seonaut) - SEO auditing tool

### GSC Entegrasyonu
- [TheMihirNaik/gsc-explorer-app](https://github.com/TheMihirNaik/gsc-explorer-app) - GSC explorer
- [AminForou/mcp-gsc](https://github.com/AminForou/mcp-gsc) - Claude ile GSC sorgulama

### AI + GEO/AEO
- [AICMO/ai-cmo](https://github.com/AICMO/ai-cmo) - AI visibility monitoring
- [Dominien/agentic-seo-agent](https://github.com/Dominien/agentic-seo-agent) - Agentic SEO
- [aaron-he-zhu/seo-geo-claude-skills](https://github.com/aaron-he-zhu/seo-geo-claude-skills) - SEO/GEO Claude skills

### Diger
- [GoogleChrome/lighthouse](https://github.com/nicholasareed/lighthouse) - Core Web Vitals

## Uyarilar & Best Practices

- **Crawler**: robots.txt'e uy, rate limit uygula, nazik ol.
- **AI Icerik**: E-E-A-T standartlarina uy, insanlastir, spam yapma.
- **Degisiklik Loglama**: Tum uygulamalari logla, rollback mekanizmasi ekle.
- **Guvenlik**: API key'leri `.env` + Docker secret'ta tut, asla repo'ya commit'leme.
- **Yasal**: Google politikalarina uy, manipulatif SEO'dan kacin.

## Lisans

Bu proje ozel kullanim icindir. Ticari kullanim icin lisans gereklidir.
