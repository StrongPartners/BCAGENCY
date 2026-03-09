/**
 * BC Creative Agency — Gemini-Powered Automated Blog Engine
 * Refactored to Clean Architecture as per CORE_ARCHITECTURE.md
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// --- 1. MODEL KATMANI (Entity / Domain Model) ---
class BlogPost {
    constructor(data) {
        this.id = data.id;
        this.slug = data.slug;
        this.title = { tr: data.title_tr, en: data.title_en };
        this.excerpt = { tr: data.excerpt_tr, en: data.excerpt_en };
        this.category = data.category;
        this.date = data.date;
        this.readTime = data.readTime;
        this.image = data.image;
        this.imageAlt = { tr: data.image_alt_tr, en: data.image_alt_en };
        this.content = { tr: data.content_tr, en: data.content_en };
    }

    static toRawObject(post) {
        return `    {
        id: ${post.id},
        slug: ${JSON.stringify(post.slug)},
        title: { tr: ${JSON.stringify(post.title.tr)}, en: ${JSON.stringify(post.title.en)} },
        excerpt: { tr: ${JSON.stringify(post.excerpt.tr)}, en: ${JSON.stringify(post.excerpt.en)} },
        category: ${JSON.stringify(post.category)},
        date: { tr: ${JSON.stringify(post.date.tr)}, en: ${JSON.stringify(post.date.en)} },
        readTime: { tr: ${JSON.stringify(post.readTime.tr)}, en: ${JSON.stringify(post.readTime.en)} },
        image: ${JSON.stringify(post.image)},
        imageAlt: { tr: ${JSON.stringify(post.imageAlt.tr)}, en: ${JSON.stringify(post.imageAlt.en)} },
        content: { tr: ${JSON.stringify(post.content.tr)}, en: ${JSON.stringify(post.content.en)} },
    }`;
    }
}

// --- 2. REPOSITORY INTERFACE (Sözleşme Katmanı) ---
// JavaScript'te interface olmadığı için dokümante ediyoruz.
// IBlogRepository: { getExistingSlugs(), getMaxId(), savePosts(posts) }

// --- 3. REPOSITORY IMPLEMENTATION (Data Access Layer) ---
class FileBlogRepository {
    constructor(filePath) {
        this.filePath = filePath;
    }

    _readFile() {
        if (!existsSync(this.filePath)) {
            throw new Error(`Blog dosyası bulunamadı: ${this.filePath}`);
        }
        return readFileSync(this.filePath, 'utf-8');
    }

    getExistingSlugs() {
        const content = this._readFile();
        return [...content.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);
    }

    getMaxId() {
        const content = this._readFile();
        const ids = [...content.matchAll(/\bid:\s*(\d+)/g)].map(m => parseInt(m[1]));
        return ids.length > 0 ? Math.max(...ids) : 0;
    }

    savePosts(newPosts) {
        let content = this._readFile();
        const entries = newPosts.map(post => BlogPost.toRawObject(post));

        const insertAt = content.lastIndexOf('];');
        if (insertAt === -1) throw new Error("Dosya yapısı geçersiz: '];' bulunamadı.");

        const updatedContent = content.substring(0, insertAt) + entries.join(',\n') + ',\n' + content.substring(insertAt);
        writeFileSync(this.filePath, updatedContent, 'utf-8');
        return entries.length;
    }
}

// --- 4. USECASE (Business Logic Katmanı) ---
class GenerateBlogBatchUseCase {
    constructor(geminiKey) {
        this.genAI = new GoogleGenerativeAI(geminiKey);
        // Explicitly set apiVersion to 'v1' to avoid v1beta 404 issues
        this.model = this.genAI.getGenerativeModel(
            { model: "gemini-1.5-flash" },
            { apiVersion: "v1" }
        );
    }

    async execute(batchSize, existingSlugs) {
        console.log(`[UseCase] Gemini ile ${batchSize} içerik üretiliyor...`);

        const prompt = `Sen BC Creative Agency adlı, KKTC'nin en iddialı dijital pazarlama ajansının Baş İçerik Stratejistisin.
Merkezin Girne, ancak tüm Kıbrıs'ı domine eden bir vizyonla yazıyorsun.

HEDEF: Google aramalarında (TR/EN) rakipleri geride bırakacak ${batchSize} adet blog yazısı üret.
Mevcut slug'lar: ${existingSlugs.join(', ')} (ASLA TEKRARLAMA!)

KRİTİK ODAK: KKTC Emlak, Google Ads, Turizm SEO, Dijital Dönüşüm.

SADECE geçerli bir JSON dizisi döndür:
[
  {
    "slug": "url-slug",
    "category": "SEO | Google Ads",
    "readTimeMinutes": 12,
    "title_tr": "...", "title_en": "...",
    "excerpt_tr": "...", "excerpt_en": "...",
    "image_keyword": "unsplash search term",
    "image_alt_tr": "...", "image_alt_en": "...",
    "content_tr": "<p>...</p>", "content_en": "<p>...</p>"
  }
]

KURALLAR:
- Her yazı TR ve EN dillerinde minimum 1000 kelime olmalı.
- En az 4 adet <h2> başlığı olmalı.
- Kıbrıs yerel isimleri (Girne, Lefkoşa vb.) geçmeli.`;

        try {
            const result = await this.model.generateContent(prompt);
            const responseText = result.response.text();
            const jsonTextMatch = responseText.match(/\[[\s\S]*\]/);
            const jsonText = jsonTextMatch ? jsonTextMatch[0] : responseText;

            return JSON.parse(jsonText);
        } catch (err) {
            console.warn(`⚠️ [UseCase] gemini-1.5-flash başarısız oldu, gemini-1.5-pro-latest deneniyor...`);
            const fallbackModel = this.genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" }, { apiVersion: "v1" });
            const result = await fallbackModel.generateContent(prompt);
            const responseText = result.response.text();
            const jsonTextMatch = responseText.match(/\[[\s\S]*\]/);
            const jsonText = jsonTextMatch ? jsonTextMatch[0] : responseText;
            return JSON.parse(jsonText);
        }
    }
}

// --- 5. MANAGER / SERVICE LAYER (Orkestra Katmanı) ---
class BlogManager {
    constructor(repository, useCase) {
        this.repository = repository;
        this.useCase = useCase;
    }

    async runDailyAutomation() {
        console.log("🚀 [Manager] Günlük otomasyon başlatıldı...");

        try {
            const existingSlugs = this.repository.getExistingSlugs();
            const startId = this.repository.getMaxId();

            // 2 batch halinde 10 yazı (AI limitlerine takılmamak için)
            const batch1 = await this.useCase.execute(5, existingSlugs);
            const batch2 = await this.useCase.execute(5, [...existingSlugs, ...batch1.map(p => p.slug)]);
            const rawDataBatch = [...batch1, ...batch2];

            const now = new Date();
            const months_tr = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
            const months_en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            const dateTr = `${now.getDate()} ${months_tr[now.getMonth()]} ${now.getFullYear()}`;
            const dateEn = `${months_en[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

            const finalBlogPosts = rawDataBatch.map((data, index) => {
                const randomSeed = Math.random().toString(36).substring(7);
                const imgUrl = `https://images.unsplash.com/photo-dynamic?query=${encodeURIComponent(data.image_keyword || 'marketing')}&sig=${randomSeed}&w=1200&auto=format&fit=crop`;

                return new BlogPost({
                    id: startId + index + 1,
                    slug: data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                    title_tr: data.title_tr,
                    title_en: data.title_en,
                    excerpt_tr: data.excerpt_tr,
                    excerpt_en: data.excerpt_en,
                    category: data.category,
                    date: { tr: dateTr, en: dateEn },
                    readTime: { tr: `${data.readTimeMinutes || 12} dk okuma`, en: `${data.readTimeMinutes || 12} min read` },
                    image: imgUrl,
                    image_alt_tr: data.image_alt_tr,
                    image_alt_en: data.image_alt_en,
                    content_tr: data.content_tr,
                    content_en: data.content_en
                });
            });

            const savedCount = this.repository.savePosts(finalBlogPosts);
            console.log(`✅ [Manager] İşlem tamam: ${savedCount} yeni yazı eklendi.`);

        } catch (error) {
            console.error("❌ [Manager] Kritik Hata:", error.message);
            throw error;
        }
    }
}

// --- 6. ÇALIŞTIRICI SCRIPT (Entry Point) ---
async function main() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const POSTS_PATH = join(__dirname, '../src/data/blogPosts.js');
    const GEMINI_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_KEY) {
        console.error("❌ HATA: GEMINI_API_KEY ortam değişkeni ayarlanmamış.");
        process.exit(1);
    }

    const repository = new FileBlogRepository(POSTS_PATH);
    const useCase = new GenerateBlogBatchUseCase(GEMINI_KEY);
    const manager = new BlogManager(repository, useCase);

    try {
        await manager.runDailyAutomation();
    } catch (err) {
        process.exit(1);
    }
}

main();

// Mesaj sonu kuralı:
// bitti bebeğim kontrol eder misin
