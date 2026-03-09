/**
 * BC Creative Agency — Gemini-Powered Automated Blog Engine (Aggressive SEO Version)
 * 
 * Generates 10 hyper-optimized bilingual (TR/EN) posts daily.
 * Focused on Cyprus Real Estate, Digital Ads, and Local SEO Dominance.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_FILE = join(__dirname, '../src/data/blogPosts.js');
const VITE_CONFIG = join(__dirname, '../vite.config.js');

if (!process.env.GEMINI_API_KEY) {
    console.error("❌ Error: GEMINI_API_KEY is not set.");
    process.exit(1);
}

const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const postsContent = readFileSync(POSTS_FILE, 'utf-8');
const existingSlugs = [...postsContent.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);
const ids = [...postsContent.matchAll(/\bid:\s*(\d+)/g)].map(m => parseInt(m[1]));
const maxId = ids.length > 0 ? Math.max(...ids) : 0;

const now = new Date();
const months_tr = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const months_en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dateTr = `${now.getDate()} ${months_tr[now.getMonth()]} ${now.getFullYear()}`;
const dateEn = `${months_en[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

async function generateBatch(batchSize) {
    console.log(`--- Generating ${batchSize} Competitive SEO posts with Gemini ---`);
    const model = geminiAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Sen BC Creative Agency adlı, KKTC'nin en iddialı dijital pazarlama ajansının Baş İçerik Stratejistisin.
Merkezin Girne, ancak tüm Kuzey Kıbrıs'ı dijitalde domine ediyorsun.

HEDEF: Google aramalarında (hem Türkçe hem İngilizce) rakipleri ezerek 1. sıraya çıkacak ${batchSize} adet blog yazısı üret.

Mevcut slug'lar: ${existingSlugs.join(', ')} (ASLA TEKRARLAMA!)

KRİTİK ODAK NOKTALARI:
1. KKTC Gayrimenkul Pazarlaması (Yabancı yatırımcı çekme, villa satışı, Girne/İskele emlak reklamları).
2. Google & Meta Ads (KKTC'de en düşük maliyetle en yüksek dönüşüm).
3. Turizm ve Otel SEO (Kıbrıs tatil aramalarında zirve).
4. Yerel İşletme Büyütme (Restoranlar, kafeler, butikler için dijital dönüşüm).
5. Kurumsal Kimlik & Web Tasarım (Kıbrıs'ın en modern web projeleri).

İSTEK: SADECE geçerli bir JSON dizisi döndür:
[
  {
    "slug": "url-dostu-slug-anahtar-kelime-icermeli",
    "category": "SEO | Google Ads | Sosyal Medya | Dijital Pazarlama | Web Tasarım",
    "readTimeMinutes": 12,
    "title_tr": "Dikkat Çeken Türkçe Başlık", 
    "title_en": "High-CTR English Title",
    "excerpt_tr": "Okuyucuyu hemen içeri çeken zengin Türkçe özet.", 
    "excerpt_en": "Compelling English excerpt to boost click-through rate.",
    "image_keyword": "unsplash search term",
    "image_alt_tr": "SEO odaklı Türkçe resim alt metni",
    "image_alt_en": "SEO specialized English image alt text",
    "content_tr": "<p>Giriş...</p><h2>Başlık</h2><p>...</p>",
    "content_en": "<p>Intro...</p><h2>Heading</h2><p>...</p>"
  }
]

KURALLAR:
- Her yazı TR ve EN dillerinde minimum 1000 kelime olmalı.
- En az 4 adet <h2> başlığı olmalı.
- Kıbrıs yerel isimleri (Girne, Lefkoşa, Mağusa, İskele) geçmeli.
- Her yazıda BC Creative Agency'den bahset.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonTextMatch = responseText.match(/\[[\s\S]*\]/);
    const jsonText = jsonTextMatch ? jsonTextMatch[0] : responseText;

    return JSON.parse(jsonText);
}

async function run() {
    console.log(`🚀 Automated SEO Engine (Gemini Pro) Starting...`);

    try {
        const batch1 = await generateBatch(5);
        const batch2 = await generateBatch(5);
        const allNewPosts = [...batch1, ...batch2];

        const entries = allNewPosts.map((post, i) => {
            const id = maxId + i + 1;
            const mins = post.readTimeMinutes || 12;
            const randomSeed = Math.random().toString(36).substring(7);
            const imgUrl = `https://images.unsplash.com/photo-dynamic?query=${encodeURIComponent(post.image_keyword || 'marketing')}&sig=${randomSeed}&w=1200&auto=format&fit=crop`;

            const slug = post.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
            if (existingSlugs.includes(slug)) return null;

            return `    {
        id: ${id},
        slug: ${JSON.stringify(slug)},
        title: { tr: ${JSON.stringify(post.title_tr)}, en: ${JSON.stringify(post.title_en)} },
        excerpt: { tr: ${JSON.stringify(post.excerpt_tr)}, en: ${JSON.stringify(post.excerpt_en)} },
        category: ${JSON.stringify(post.category)},
        date: { tr: ${JSON.stringify(dateTr)}, en: ${JSON.stringify(dateEn)} },
        readTime: { tr: ${JSON.stringify(`${mins} dk okuma`)}, en: ${JSON.stringify(`${mins} min read`)} },
        image: ${JSON.stringify(imgUrl)},
        imageAlt: { tr: ${JSON.stringify(post.image_alt_tr)}, en: ${JSON.stringify(post.image_alt_en)} },
        content: { tr: ${JSON.stringify(post.content_tr)}, en: ${JSON.stringify(post.content_en)} },
    }`;
        }).filter(Boolean);

        const insertAt = postsContent.lastIndexOf('];');
        const updatedPosts = postsContent.substring(0, insertAt) + entries.join(',\n') + ',\n' + postsContent.substring(insertAt);
        writeFileSync(POSTS_FILE, updatedPosts, 'utf-8');

        console.log(`✅ Success! ${entries.length} new bilingual posts added.`);
    } catch (error) {
        console.error('❌ Generation Failed:', error);
        process.exit(1);
    }
}

run();
