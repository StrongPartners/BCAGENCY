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
        // ── Ana Sayfalar ─────────────────────────────────────────────────────
        '/',
        '/about',
        '/contact',
        '/blog',

        // ── Hizmet Sayfaları ─────────────────────────────────────────────────
        '/hizmetler/seo',
        '/hizmetler/google-ads',
        '/hizmetler/sosyal-medya',
        '/hizmetler/web-tasarim',
        '/hizmetler/produksiyon',
        '/hizmetler/drone-cekim',
        '/hizmetler/fotograf-video',

        // ── Blog Yazıları ────────────────────────────────────────────────────
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
        // Yeni blog yazıları generate-blog.mjs tarafından buraya otomatik eklenir
      ],
    }),
  ],
})
