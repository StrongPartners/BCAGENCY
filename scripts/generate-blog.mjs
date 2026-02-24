/**
 * BC Creative Agency — Otomatik Blog Yazısı Üreteci
 *
 * Kullanım:
 *   ANTHROPIC_API_KEY=sk-... node scripts/generate-blog.mjs
 *
 * GitHub Actions üzerinden günlük otomatik çalışır.
 * Her çalıştırmada 2 adet tam bilingual (TR+EN) blog yazısı
 * src/data/blogPosts.js dosyasına eklenir.
 */

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ── Dosya yolları ────────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_FILE  = join(__dirname, '../src/data/blogPosts.js');
const VITE_CONFIG = join(__dirname, '../vite.config.js');

// ── API İstemcisi ────────────────────────────────────────────────────────────
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Mevcut dosyayı oku ───────────────────────────────────────────────────────
const postsContent = readFileSync(POSTS_FILE, 'utf-8');

// Mevcut slug'ları çıkar (duplicate önleme)
const existingSlugs = [...postsContent.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);

// En büyük ID'yi bul
const ids = [...postsContent.matchAll(/\bid:\s*(\d+)/g)].map(m => parseInt(m[1]));
const maxId = ids.length > 0 ? Math.max(...ids) : 0;

// ── Tarih formatla ───────────────────────────────────────────────────────────
const now = new Date();
const months_tr = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
const months_en = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const dateTr = `${now.getDate()} ${months_tr[now.getMonth()]} ${now.getFullYear()}`;
const dateEn  = `${months_en[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

// ── Görsel havuzu ────────────────────────────────────────────────────────────
const imagePool = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop',
];

function randomImage() {
    return imagePool[Math.floor(Math.random() * imagePool.length)];
}

// ── Prompt ───────────────────────────────────────────────────────────────────
const prompt = `Sen BC Creative Agency adlı dijital pazarlama ajansının kıdemli içerik yazarısın.
Ajans Kuzey Kıbrıs'ın (KKTC) Girne şehrinde faaliyet gösteriyor ve bölgedeki işletmelere
dijital pazarlama hizmetleri sunuyor (SEO, Google Ads, Sosyal Medya, Web Tasarım, Prodüksiyon).

Bugünün tarihi: ${dateTr}
Mevcut blog yazılarının slug listesi (BUNLARI ASLA TEKRAR KULLANMA):
${existingSlugs.join(', ')}

GÖREV: Tam olarak 2 adet özgün, SEO uyumlu blog yazısı üret.

Konu yelpazesi (çeşitlilik önemli):
- KKTC/Kuzey Kıbrıs'ta yerel SEO stratejileri
- Otel ve turizm işletmeleri için dijital pazarlama
- Emlak sektöründe Google Ads ve sosyal medya
- Restoran/kafe için Instagram ve TikTok büyüme taktikleri
- KKTC'de e-ticaret başlatma ve büyütme
- Google My Business optimizasyonu Kuzey Kıbrıs
- WhatsApp Business ile müşteri ilişkileri yönetimi
- Rakip analizi ve pazar araştırması teknikleri
- Video pazarlama ve Reels stratejileri
- Web sitesi dönüşüm oranı optimizasyonu (CRO)
- Influencer pazarlama KKTC'de
- E-posta pazarlama ve otomasyon
- Marka kimliği ve görsel tasarımın önemi
- Dijital reklamcılıkta A/B testleri
- TikTok Ads KKTC işletmeleri için

Kategorilerden birini seç: SEO, Google Ads, Sosyal Medya, Dijital Pazarlama, Web Tasarım

SADECE geçerli bir JSON dizisi döndür — başka hiçbir şey yazma, markdown kod bloğu kullanma:
[
  {
    "slug": "url-dostu-slug-turkce-karakter-yok-tire-ile-ayir",
    "category": "kategori",
    "readTimeMinutes": 9,
    "title_tr": "Türkçe başlık (arama hacmi olan anahtar kelimeyle başla)",
    "title_en": "English title (start with a high-search keyword)",
    "excerpt_tr": "İki cümlelik Türkçe özet. Okuyucuyu yazıyı okumaya teşvik etmeli.",
    "excerpt_en": "Two sentence English excerpt. Should entice the reader to read more.",
    "content_tr": "<p>Giriş paragrafı...</p><h2>Alt Başlık 1</h2><p>...</p><h2>Alt Başlık 2</h2><p>...</p><ul><li>Madde 1</li><li>Madde 2</li></ul><h2>Alt Başlık 3</h2><p>...</p><h2>Sonuç</h2><p>...BC Creative Agency ile iletişime geçin...</p>",
    "content_en": "<p>Intro paragraph...</p><h2>Subheading 1</h2><p>...</p>"
  }
]

Kalite gereksinimleri:
- Her yazı minimum 800 kelime (TR ve EN ayrı ayrı)
- En az 4 adet <h2> alt başlık
- En az 1 adet <ul><li> liste
- KKTC'ye özgü yerel referanslar (Girne, Lefkoşa, Gazimağusa, turizm, gayrimenkul vb.)
- Sonuç paragrafında BC Creative Agency'den teklif almaya davet et
- Slug'lar Türkçe karakter içermemeli, sadece küçük harf, rakam ve tire`;

// ── API Çağrısı ──────────────────────────────────────────────────────────────
console.log(`[${new Date().toISOString()}] Blog yazısı üretimi başlıyor...`);
console.log(`Mevcut post sayısı: ${existingSlugs.length}, maxId: ${maxId}`);

const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 10000,
    messages: [{ role: 'user', content: prompt }],
});

const responseText = message.content[0].text.trim();

// ── JSON parse ───────────────────────────────────────────────────────────────
let jsonText = responseText;

// Markdown kod bloğu varsa çıkar
const codeBlockMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
if (codeBlockMatch) {
    jsonText = codeBlockMatch[1];
} else {
    // Düz JSON dizisi ara
    const arrayMatch = responseText.match(/\[[\s\S]*\]/);
    if (arrayMatch) jsonText = arrayMatch[0];
}

let newPosts;
try {
    newPosts = JSON.parse(jsonText);
    if (!Array.isArray(newPosts) || newPosts.length === 0) {
        throw new Error('Geçerli bir dizi bulunamadı');
    }
} catch (e) {
    console.error('JSON parse hatası:', e.message);
    console.error('Ham yanıt (ilk 1500 karakter):');
    console.error(responseText.substring(0, 1500));
    process.exit(1);
}

console.log(`${newPosts.length} yazı başarıyla parse edildi.`);

// ── JS girdilerini oluştur ────────────────────────────────────────────────────
const entries = newPosts.map((post, i) => {
    const id   = maxId + i + 1;
    const mins = post.readTimeMinutes || 9;
    const img  = randomImage();

    // Slug doğrula
    const slug = post.slug
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    if (existingSlugs.includes(slug)) {
        console.warn(`Uyarı: "${slug}" slug'ı zaten mevcut, atlanıyor.`);
        return null;
    }

    return `    {
        id: ${id},
        slug: ${JSON.stringify(slug)},
        title: { tr: ${JSON.stringify(post.title_tr)}, en: ${JSON.stringify(post.title_en)} },
        excerpt: { tr: ${JSON.stringify(post.excerpt_tr)}, en: ${JSON.stringify(post.excerpt_en)} },
        category: ${JSON.stringify(post.category)},
        date: { tr: ${JSON.stringify(dateTr)}, en: ${JSON.stringify(dateEn)} },
        readTime: { tr: ${JSON.stringify(`${mins} dk okuma`)}, en: ${JSON.stringify(`${mins} min read`)} },
        image: ${JSON.stringify(img)},
        content: { tr: ${JSON.stringify(post.content_tr)}, en: ${JSON.stringify(post.content_en)} },
    }`;
}).filter(Boolean);

if (entries.length === 0) {
    console.error('Eklenecek yeni yazı yok (tüm slug\'lar mevcut).');
    process.exit(1);
}

// ── blogPosts.js'e ekle ──────────────────────────────────────────────────────
const insertAt = postsContent.lastIndexOf('];');
if (insertAt === -1) {
    console.error('blogPosts.js içinde ]; bulunamadı!');
    process.exit(1);
}

const updated =
    postsContent.substring(0, insertAt) +
    entries.join(',\n') + ',\n' +
    postsContent.substring(insertAt);

writeFileSync(POSTS_FILE, updated, 'utf-8');

// ── vite.config.js sitemap'ini güncelle ──────────────────────────────────────
const viteContent = readFileSync(VITE_CONFIG, 'utf-8');

// Yeni slug satırlarını oluştur
const newSlugLines = newPosts
    .map(post => {
        const slug = post.slug
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        return `        '/blog/${slug}',`;
    })
    .join('\n');

// "otomatik eklenir" yorumunun hemen öncesine yeni slug'ları ekle
const sitemapInsertMarker = '        // Yeni blog yazıları generate-blog.mjs tarafından buraya otomatik eklenir';
if (viteContent.includes(sitemapInsertMarker)) {
    const updatedVite = viteContent.replace(
        sitemapInsertMarker,
        newSlugLines + '\n' + sitemapInsertMarker
    );
    writeFileSync(VITE_CONFIG, updatedVite, 'utf-8');
    console.log('📍 vite.config.js sitemap güncellendi.');
} else {
    console.warn('⚠️ vite.config.js içinde sitemap marker bulunamadı, atlandı.');
}

// ── Rapor ────────────────────────────────────────────────────────────────────
console.log(`\n✅ ${entries.length} yeni blog yazısı eklendi (ID: ${maxId + 1}–${maxId + entries.length}):`);
newPosts.forEach((p, i) => {
    console.log(`  [${maxId + i + 1}] ${p.title_tr}`);
    console.log(`       ${p.title_en}`);
});
