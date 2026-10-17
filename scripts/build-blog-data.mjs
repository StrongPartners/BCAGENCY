// Derleme öncesi: blogPosts.js'i ikiye böler.
//  - src/data/blogIndex.json  → liste/önizleme için hafif özet (içerik yok), en yeni önce
//  - public/blog-data/<slug>.json → tek yazının tam içeriği (yazı sayfası açılınca yüklenir)
import { blogPosts } from '../src/data/blogPosts.js';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';

const outDir = 'public/blog-data';
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const index = [...blogPosts]
  .sort((a, b) => b.id - a.id)
  .map(({ content, ...meta }) => meta);

// Yazı → ilgili hizmet sayfası (önce adres kelimeleri, sonra kategori)
const SERVICE_BY_WORD = [
  [/drone/, '/hizmetler/drone-cekim'], [/crm/, '/hizmetler/crm-yazilim'], [/uygulama|mobil-app/, '/hizmetler/uygulama-gelistirme'],
  [/reels|tiktok|shorts/, '/hizmetler/reels-video-edit'], [/google-ads|ppc|arama-kampanya/, '/hizmetler/google-ads'],
  [/seo|geo-|yapisal-veri/, '/hizmetler/seo'], [/web|site|e-ticaret|qr-menu/, '/hizmetler/web-tasarim'],
  [/fotograf/, '/hizmetler/fotograf-video'], [/video|film|produksiyon/, '/hizmetler/produksiyon'],
  [/sosyal-medya|instagram|meta|facebook|whatsapp|ugc|influencer/, '/hizmetler/sosyal-medya'],
];
const SERVICE_BY_CAT = { 'SEO': '/hizmetler/seo', 'Google Ads': '/hizmetler/google-ads', 'Web Tasarım': '/hizmetler/web-tasarim',
  'Sosyal Medya': '/hizmetler/sosyal-medya', 'Sosyal Medya Yönetimi': '/hizmetler/sosyal-medya', 'Video Prodüksiyon': '/hizmetler/produksiyon',
  'Video Prodüksiyon & Fotoğrafçılık': '/hizmetler/fotograf-video' };
const serviceFor = (p) => (SERVICE_BY_WORD.find(([re]) => re.test(p.slug)) || [])[1] || SERVICE_BY_CAT[p.category] || '/hizmetler/sosyal-medya';

// Aynı kategoriden en yakın 3 yazı (taranabilir iç bağlantı ağı)
const card = ({ id, slug, title, image, imageAlt, category }) => ({ id, slug, title, image, imageAlt, category });
const byCat = {};
for (const p of index) (byCat[p.category] ||= []).push(p);
const relatedFor = (p) => {
  const same = byCat[p.category].filter((o) => o.slug !== p.slug)
    .sort((a, b) => Math.abs(a.id - p.id) - Math.abs(b.id - p.id));
  return same.slice(0, 3).map(card);
};

for (const p of blogPosts) writeFileSync(`${outDir}/${p.slug}.json`, JSON.stringify({ ...p, service: serviceFor(p), related: relatedFor(p) }));
writeFileSync('src/data/blogIndex.json', JSON.stringify(index));
writeFileSync('src/data/blogLatest.json', JSON.stringify(index.slice(0, 3)));
console.log(`blog: ${index.length} yazı, özet ${(JSON.stringify(index).length / 1024).toFixed(0)} KB`);
