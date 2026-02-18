import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://bccreative.agency',
      dynamicRoutes: [
        '/',
        '/about',
        '/contact',
        '/blog',
        '/hizmetler/seo',
        '/hizmetler/google-ads',
        '/hizmetler/sosyal-medya',
        '/hizmetler/web-tasarim',
        '/blog/kktcde-seo-nasil-yapilir',
        '/blog/kuzey-kibrista-google-ads-rehberi',
        '/blog/kktc-isletmeleri-icin-sosyal-medya-stratejileri',
        '/blog/girne-dijital-pazarlama-rehberi',
        '/blog/kktc-web-tasarim-trendleri-2025',
        '/blog/kktc-dijital-reklamcilik-basari-sirlari',
      ],
    }),
  ],
})
