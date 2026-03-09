const fs = require('fs');
const path = require('path');

// Basic settings
const BASE_URL = 'https://bccreative.agency';
const OUT_DIR = path.resolve(__dirname, '../public');

// Static routes
const staticRoutes = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/hizmetler/seo',
    '/hizmetler/google-ads',
    '/hizmetler/sosyal-medya',
    '/hizmetler/web-tasarim',
];

// Blog posts (simulated from our data/blogPosts.js structure)
// NOTE: This script assumes commonJS environment.
// In a real environment, you'd potentially import your actual data.
// For this task, I'll read the data directly to ensure accuracy.
const blogPostsPath = path.resolve(__dirname, '../src/data/blogPosts.js');
let blogSlugs = [];

try {
    const content = fs.readFileSync(blogPostsPath, 'utf8');
    // Simple regex to extract slugs
    const slugMatches = content.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
    for (const match of slugMatches) {
        blogSlugs.push(`/blog/${match[1]}`);
    }
} catch (error) {
    console.error('Error reading blog posts:', error);
}

const allRoutes = [...staticRoutes, ...blogSlugs];

const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allRoutes.map(route => {
        const url = `${BASE_URL}${route}`;
        return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.includes('/blog/') ? 'monthly' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : route.startsWith('/hizmetler') ? '0.8' : '0.6'}</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${url.replace(BASE_URL, BASE_URL + '/en')}" />
  </url>`;
    }).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), sitemap);
    console.log('✅ sitemap.xml generated successfully in /public');
};

generateSitemap();
