"""
AI SEO Canavari - Streamlit Dashboard.
Gercek zamanli SEO metrikleri, audit raporlari ve icerik yonetimi.
"""

import streamlit as st
import httpx

API_BASE = "http://localhost:8000"

st.set_page_config(
    page_title="AI SEO Canavari",
    page_icon="🔍",
    layout="wide",
    initial_sidebar_state="expanded",
)


def main():
    st.title("AI SEO Canavari Dashboard")
    st.markdown("**Tam otonom yapay zeka destekli SEO uygulamasi**")

    # Sidebar - Navigasyon
    page = st.sidebar.selectbox(
        "Sayfa Sec",
        [
            "Genel Bakis",
            "Site Tarama",
            "GSC Performans",
            "Keyword Analiz",
            "Icerik Uretici",
            "GEO/AEO Optimizer",
            "Audit Raporu",
        ],
    )

    if page == "Genel Bakis":
        show_overview()
    elif page == "Site Tarama":
        show_crawler()
    elif page == "GSC Performans":
        show_gsc()
    elif page == "Keyword Analiz":
        show_keywords()
    elif page == "Icerik Uretici":
        show_content_generator()
    elif page == "GEO/AEO Optimizer":
        show_geo_optimizer()
    elif page == "Audit Raporu":
        show_audit()


def show_overview():
    """Genel bakis sayfasi."""
    st.header("Genel Bakis")

    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Taranan Sayfalar", "—", help="Toplam taranan sayfa sayisi")
    with col2:
        st.metric("Ortalama SEO Skoru", "—", help="Ortalama teknik SEO skoru")
    with col3:
        st.metric("Keyword Firsatlari", "—", help="Tespit edilen keyword gap'ler")
    with col4:
        st.metric("Uretilen Icerik", "—", help="AI ile uretilen icerik sayisi")

    st.info(
        "Dashboard, FastAPI backend'e baglandiginda gercek verilerle dolacaktir. "
        "Once `uvicorn main:app --reload` ile backend'i baslatin."
    )


def show_crawler():
    """Site tarama sayfasi."""
    st.header("Site Tarama")

    url = st.text_input("Site URL", placeholder="https://www.example.com")
    if st.button("Taramaya Basla"):
        if url:
            with st.spinner("Site taraniyor..."):
                try:
                    response = httpx.post(
                        f"{API_BASE}/api/crawl",
                        params={"url": url},
                        timeout=120.0,
                    )
                    data = response.json()
                    st.success(f"Tarama tamamlandi! {data.get('pages_crawled', 0)} sayfa tarandı.")
                    st.json(data)
                except httpx.ConnectError:
                    st.error("Backend'e baglanilamiyor. `uvicorn main:app --reload` calistirin.")
        else:
            st.warning("Lutfen bir URL girin.")


def show_gsc():
    """GSC performans sayfasi."""
    st.header("Google Search Console Performans")

    site_url = st.text_input("GSC Property URL", placeholder="https://www.example.com/")
    days = st.slider("Son kac gun", 7, 90, 28)

    col1, col2 = st.columns(2)

    with col1:
        if st.button("Performans Getir"):
            with st.spinner("GSC verisi cekiliyor..."):
                try:
                    response = httpx.get(
                        f"{API_BASE}/api/gsc/performance",
                        params={"site_url": site_url, "days": days},
                        timeout=30.0,
                    )
                    data = response.json()
                    st.subheader("Sorgu Performansi")
                    st.json(data)
                except httpx.ConnectError:
                    st.error("Backend'e baglanilamiyor.")

    with col2:
        if st.button("Sayfa Performansi"):
            with st.spinner("Sayfa verisi cekiliyor..."):
                try:
                    response = httpx.get(
                        f"{API_BASE}/api/gsc/pages",
                        params={"site_url": site_url, "days": days},
                        timeout=30.0,
                    )
                    data = response.json()
                    st.subheader("Sayfa Performansi")
                    st.json(data)
                except httpx.ConnectError:
                    st.error("Backend'e baglanilamiyor.")


def show_keywords():
    """Keyword analiz sayfasi."""
    st.header("Keyword Arastirma & Analiz")

    seed = st.text_input("Seed Keyword", placeholder="dijital pazarlama")
    site_url = st.text_input("Site URL (opsiyonel)", placeholder="https://www.example.com")

    if st.button("Keyword Arastirmasi Baslat"):
        if seed:
            with st.spinner("AI keyword analizi yapiliyor..."):
                try:
                    response = httpx.post(
                        f"{API_BASE}/api/keywords/research",
                        params={"seed_keyword": seed, "site_url": site_url or None},
                        timeout=60.0,
                    )
                    data = response.json()
                    st.subheader("Keyword Analiz Sonuclari")
                    st.markdown(data.get("keywords", {}).get("analysis", ""))
                except httpx.ConnectError:
                    st.error("Backend'e baglanilamiyor.")
        else:
            st.warning("Lutfen bir seed keyword girin.")


def show_content_generator():
    """Icerik uretici sayfasi."""
    st.header("AI Icerik Uretici")

    keyword = st.text_input("Hedef Keyword", placeholder="seo nedir")
    content_type = st.selectbox(
        "Icerik Tipi", ["blog", "guide", "listicle", "how-to", "comparison"]
    )

    if st.button("Icerik Uret"):
        if keyword:
            with st.spinner("AI icerik uretiyor..."):
                try:
                    response = httpx.post(
                        f"{API_BASE}/api/content/generate",
                        params={"keyword": keyword, "content_type": content_type},
                        timeout=120.0,
                    )
                    data = response.json()
                    st.subheader("Uretilen Icerik")
                    st.markdown(data.get("content", {}).get("raw_content", ""))
                except httpx.ConnectError:
                    st.error("Backend'e baglanilamiyor.")
        else:
            st.warning("Lutfen bir keyword girin.")


def show_geo_optimizer():
    """GEO/AEO optimizer sayfasi."""
    st.header("GEO/AEO Optimizer")

    content = st.text_area("Optimize Edilecek Icerik", height=300)

    if st.button("GEO/AEO Optimize Et"):
        if content:
            with st.spinner("GEO/AEO optimizasyonu yapiliyor..."):
                try:
                    response = httpx.post(
                        f"{API_BASE}/api/geo/optimize",
                        params={"content": content},
                        timeout=60.0,
                    )
                    data = response.json()
                    st.subheader("Optimize Edilmis Icerik")
                    st.markdown(data.get("optimized_content", {}).get("optimized", ""))
                except httpx.ConnectError:
                    st.error("Backend'e baglanilamiyor.")
        else:
            st.warning("Lutfen icerik girin.")


def show_audit():
    """Audit raporu sayfasi."""
    st.header("SEO Audit Raporu")
    st.info(
        "Audit raporu icin once 'Site Tarama' sayfasindan bir site tarayin. "
        "Tarama tamamlandiktan sonra burada detayli audit raporu goreceksiniz."
    )


if __name__ == "__main__":
    main()
