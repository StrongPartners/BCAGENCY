import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://bccreative.agency',
      generateRobotsTxt: true,
      dynamicRoutes: [
        // ── Main Pages ─────────────────────────────────────────────────────
        '/',
        '/about',
        '/contact',
        '/blog',

        // ── Service Pages ─────────────────────────────────────────────────
        '/hizmetler/seo',
        '/hizmetler/google-ads',
        '/hizmetler/sosyal-medya',
        '/hizmetler/web-tasarim',
        '/hizmetler/produksiyon',
        '/hizmetler/drone-cekim',
        '/hizmetler/fotograf-video',

        // ── Blog Posts ────────────────────────────────────────────────────
        '/blog/kktcde-seo-nasil-yapilir',
        '/blog/kktc-google-ads-rehberi',
        '/blog/kktc-sosyal-medya-yonetimi',
        '/blog/kktc-web-tasarim-rehberi',
        '/blog/kktc-meta-ads-facebook-instagram-reklam',
        '/blog/kktc-icerik-pazarlamasi',
        '/blog/kktc-google-my-business-optimizasyonu',
        '/blog/kktc-tiktok-stratejisi',
        '/blog/kktc-video-pazarlama-youtube',
        '/blog/kktc-dijital-pazarlama-rakip-analizi',
        '/blog/kktc-whatsapp-business-pazarlama',
        '/blog/kktc-turizm-dijital-pazarlama',
        '/blog/kktc-restoran-kafe-dijital-pazarlama',
        '/blog/kktc-influencer-pazarlama',
        '/blog/kktc-landing-page-optimizasyonu',
        '/blog/kktc-marka-kimligi-ve-tasarim',
        '/blog/kktc-e-ticaret-rehberi',
        '/blog/kktc-gayrimenkul-yabanci-aliciya-ulasma',
        '/blog/kktc-dijital-pazarlama-rakip-analizi-ileri',
        '/blog/kktc-gayrimenkul-dijital-pazarlama-rehberi',
        '/blog/kktc-yerel-seo-stratejileri-harita-paket',
        '/blog/kktc-b2b-linkedin-pazarlama-stratejileri',
        '/blog/kktc-isletmeleri-icin-e-posta-pazarlama-otomasyonu',
        '/blog/kktc-isletmeleri-icin-google-ads-performans-max-kampanyalari',
        '/blog/kktc-web-tasarim-kullanici-deneyimi-ux-onemi',
        '/blog/kktc-gelir-ortakligi-pazarlama-rehberi',
        '/blog/kktc-isletmeleri-icin-yapay-zeka-pazarlama-donusumu',
        '/blog/kktc-mobil-pazarlama-musteriye-ulasmanin-yeni-yolu',
        '/blog/kktc-e-ticaret-google-analytics-4-veri-analizi',
        '/blog/kktc-marka-stratejisi-podcast-ile-otorite-insasi',
      ],
    }),
  ],
})
