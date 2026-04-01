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
        this.geminiKey = geminiKey;
        this.genAI = new GoogleGenerativeAI(geminiKey);
    }

    _detectKeyType() {
        if (this.geminiKey.trim().startsWith('{')) {
            return "SERVICE_ACCOUNT_JSON";
        }
        if (this.geminiKey.trim().startsWith('AIza')) {
            return "AI_STUDIO_KEY";
        }
        return "UNKNOWN";
    }

    async execute(batchSize, existingSlugs) {
        const keyType = this._detectKeyType();
        console.log(`[UseCase] Gemini Motoru Hazırlanıyor... (Anahtar Türü: ${keyType})`);

        if (keyType === "SERVICE_ACCOUNT_JSON") {
            throw new Error(`
🚀 BABUŞ TEŞHİSİ:
'GEMINI_API_KEY' secret'ının içine bir JSON dosyası yapıştırmışsın abuş! 
Ancak şu anki kod (@google/generative-ai) sadece AI Studio anahtarlarını (AIza...) anlar.

Çözüm:
1. aistudio.google.com adresine git.
2. Ücretsiz bir API Key al (AIza... ile başlar).
3. Secret'a sadece anahtarı (metni) yapıştır.
            `);
        }

        const models = ["gemini-2.0-flash", "gemini-2.5-pro", "gemini-1.5-flash", "gemini-1.5-pro"];
        const versions = ["v1beta", "v1"];
        const prompt = this._getPrompt(batchSize, existingSlugs);

        for (const modelName of models) {
            for (const apiVer of versions) {
                try {
                    console.log(`[UseCase] Deneniyor: ${modelName} (${apiVer})...`);
                    const model = this.genAI.getGenerativeModel(
                        { model: modelName },
                        { apiVersion: apiVer }
                    );

                    const result = await model.generateContent(prompt);
                    const responseText = result.response.text();
                    const jsonTextMatch = responseText.match(/\[[\s\S]*\]/);
                    const jsonText = jsonTextMatch ? jsonTextMatch[0] : responseText;

                    const data = JSON.parse(jsonText);
                    console.log(`✅ [UseCase] BAŞARILI: ${modelName} aktif!`);
                    return data;
                } catch (err) {
                    const msg = err.message.toLowerCase();
                    if (msg.includes("403") || msg.includes("forbidden")) {
                        throw new Error(`
🔥 KRİTİK: API KAPALI!
Görünüşe göre anahtarın doğru ama Google Cloud projenizde 'Generative Language API' etkin değil.

Lütfen buradan aktifleştir:
https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
                        `);
                    }
                    console.warn(`[UseCase] ${modelName} (${apiVer}) hata: ${err.message.substring(0, 50)}...`);
                }
            }
        }

        throw new Error("❌ Hiçbir model çalışmadı. Lütfen API anahtarının geçerli olduğundan ve Google AI Studio'da test edildiğinden emin ol.");
    }

    _getPrompt(batchSize, existingSlugs) {
        return `Sen KKTC (Kuzey Kıbrıs) odaklı bir dijital pazarlama uzmanısın.
${batchSize} adet blog yazısı üret. Her yazı hem Türkçe hem İngilizce olmalı.

KULLANILMIŞ SLUG'LAR (bunları KULLANMA): ${existingSlugs.join(', ')}

Her blog yazısı için ZORUNLU ALANLAR:
- slug: URL uyumlu, benzersiz, küçük harf, kısa çizgili (örn: "kktc-seo-ipuclari-2025")
- title_tr: Türkçe başlık (60-70 karakter)
- title_en: İngilizce başlık (60-70 karakter)
- excerpt_tr: Türkçe özet (150-160 karakter)
- excerpt_en: İngilizce özet (150-160 karakter)
- category: Kategori (SEO / Google Ads / Sosyal Medya / Web Tasarım / Dijital Pazarlama)
- readTimeMinutes: Okuma süresi dakika olarak (sayı, örn: 8)
- image_keyword: İngilizce görsel arama kelimesi (örn: "digital marketing cyprus")
- image_alt_tr: Türkçe görsel açıklaması
- image_alt_en: İngilizce görsel açıklaması
- content_tr: Türkçe içerik (en az 900 kelime). Aşağıdaki Markdown kurallarına ZORUNLU uyu:
  * ## ile ana bölüm başlıkları (en az 4 adet)
  * ### ile alt bölüm başlıkları
  * #### ile numbered tip başlıkları (örn: #### 1. Adım: Anahtar Kelime Araştırması)
  * Adım adım süreçlerde MUTLAKA numaralı liste kullan (1. 2. 3. formatında)
  * Madde listelerini - ile yaz, her listeyi kendi bloğuna topla
  * En az 2 adet > callout kutusu ekle (önemli istatistik veya kritik ipucu için)
  * En az 2 adet inline görsel ekle: ![Türkçe açıklayıcı alt metin](https://source.unsplash.com/800x400/?ingilizce-keyword)
  * Somut KKTC/Kuzey Kıbrıs örnekleri ve gerçekçi sayılar/istatistikler kullan
  * --- ile bölümler arasına ayırıcı ekle (2-3 kez)
- content_en: İngilizce içerik (en az 900 kelime, aynı Markdown kuralları, ![English alt text](https://source.unsplash.com/800x400/?keyword) ile görsel)

SADECE aşağıdaki formatta geçerli bir JSON dizisi döndür, başka hiçbir şey yazma:
[
  {
    "slug": "...",
    "title_tr": "...",
    "title_en": "...",
    "excerpt_tr": "...",
    "excerpt_en": "...",
    "category": "...",
    "readTimeMinutes": 8,
    "image_keyword": "...",
    "image_alt_tr": "...",
    "image_alt_en": "...",
    "content_tr": "...",
    "content_en": "..."
  }
]`;
    }
}

// --- 5. MANAGER / SERVICE LAYER (Orkestra Katmanı) ---
class BlogManager {
    constructor(repository, useCase) {
        this.repository = repository;
        this.useCase = useCase;
    }

    async runDailyAutomation(totalCount = 10) {
        console.log(`🚀 [Manager] Günlük otomasyon başlatıldı... (Hedef: ${totalCount} yazı)`);

        try {
            const existingSlugs = this.repository.getExistingSlugs();
            const startId = this.repository.getMaxId();

            // Batch'lere böl (her batch max 5 yazı — AI limitlerine takılmamak için)
            const BATCH_SIZE = 5;
            const batches = Math.ceil(totalCount / BATCH_SIZE);
            let rawDataBatch = [];
            let usedSlugs = [...existingSlugs];

            for (let b = 0; b < batches; b++) {
                const remaining = totalCount - rawDataBatch.length;
                const thisBatch = Math.min(BATCH_SIZE, remaining);
                console.log(`[Manager] Batch ${b + 1}/${batches}: ${thisBatch} yazı üretiliyor...`);
                const result = await this.useCase.execute(thisBatch, usedSlugs);
                rawDataBatch = [...rawDataBatch, ...result];
                usedSlugs = [...usedSlugs, ...result.map(p => p.slug)];
            }

            const now = new Date();
            const months_tr = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
            const months_en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            const dateTr = `${now.getDate()} ${months_tr[now.getMonth()]} ${now.getFullYear()}`;
            const dateEn = `${months_en[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

            const finalBlogPosts = rawDataBatch.map((data, index) => {
                const slug = data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
                const imgUrl = `https://picsum.photos/seed/${slug}/1200/630`;

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

            // vite.config.js'deki dynamicRoutes listesini güncelle
            this._updateViteConfig(finalBlogPosts);
            console.log(`✅ [Manager] vite.config.js güncellendi (sitemap için).`);

        } catch (error) {
            console.error("❌ [Manager] Kritik Hata:", error.message);
            throw error;
        }
    }

    _updateViteConfig(newPosts) {
        const viteConfigPath = join(dirname(fileURLToPath(import.meta.url)), '../vite.config.js');
        let content = readFileSync(viteConfigPath, 'utf-8');

        const newRoutes = newPosts.map(p => `        '/blog/${p.slug}',`).join('\n');

        // Son blog rotasının hemen arkasına yeni rotaları ekle
        const insertMarker = "// ── Blog Posts ────────────────────────────────────────────────────────────────────";
        const fallbackMarker = "// ── Blog Posts ──────────────────────────────────────────────────";

        // Mevcut son blog route satırını bul ve sonrasına ekle
        const lastBlogRouteMatch = content.match(/(\/blog\/[a-z0-9-]+',\s*\n)(\s*\],)/);
        if (lastBlogRouteMatch) {
            content = content.replace(
                lastBlogRouteMatch[0],
                `${lastBlogRouteMatch[1]}${newRoutes}\n${lastBlogRouteMatch[2]}`
            );
            writeFileSync(viteConfigPath, content, 'utf-8');
        } else {
            console.warn('[Manager] vite.config.js güncellenemedi - pattern bulunamadı.');
        }
    }
}

// --- 6. ÇALIŞTIRICI SCRIPT (Entry Point) ---
async function main() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const POSTS_PATH = join(__dirname, '../src/data/blogPosts.js');
    const GEMINI_KEY = process.env.GEMINI_API_KEY;

    // Kaç yazı üretileceği: GitHub Actions input veya varsayılan 10
    const rawCount = process.env.BLOG_COUNT;
    const BLOG_COUNT = Math.min(Math.max(parseInt(rawCount) || 10, 1), 30);

    if (!GEMINI_KEY) {
        console.error("❌ HATA: GEMINI_API_KEY ortam değişkeni ayarlanmamış.");
        process.exit(1);
    }

    console.log(`📝 [Main] Üretilecek yazı sayısı: ${BLOG_COUNT}`);

    const repository = new FileBlogRepository(POSTS_PATH);
    const useCase = new GenerateBlogBatchUseCase(GEMINI_KEY);
    const manager = new BlogManager(repository, useCase);

    try {
        await manager.runDailyAutomation(BLOG_COUNT);
    } catch (err) {
        process.exit(1);
    }
}

main();

// Mesaj sonu kuralı:
// bitti bebeğim kontrol eder misin
