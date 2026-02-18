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
        '/hizmetler/seo',
        '/hizmetler/google-ads',
        '/hizmetler/sosyal-medya',
        '/hizmetler/web-tasarim',
      ],
    }),
  ],
})
