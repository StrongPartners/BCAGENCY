/**
 * BC Creative Agency — Gemini-Powered Automated Blog Engine
 * Clean Architecture: Model → Repository → UseCase → ImageService → Manager
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// --- 1. MODEL KATMANI ---
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

// --- 2. REPOSITORY IMPLEMENTATION ---
class FileBlogRepository {
    constructor(filePath) {
        this.filePath = filePath;
    }

    _readFile() {
        if (!existsSync(this.filePath)) throw new Error(`Blog dosyası bulunamadı: ${this.filePath}`);
        return readFileSync(this.filePath, 'utf-8');
    }

    getExistingSlugs() {
        return [...this._readFile().matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);
    }

    getMaxId() {
        const ids = [...this._readFile().matchAll(/\bid:\s*(\d+)/g)].map(m => parseInt(m[1]));
        return ids.length > 0 ? Math.max(...ids) : 0;
    }

    savePosts(newPosts) {
        let content = this._readFile();
        const entries = newPosts.map(post => BlogPost.toRawObject(post));
        const insertAt = content.lastIndexOf('];');
        if (insertAt === -1) throw new Error("Dosya yapısı geçersiz: '];' bulunamadı.");
        const updated = content.substring(0, insertAt) + entries.join(',\n') + ',\n' + content.substring(insertAt);
        writeFileSync(this.filePath, updated, 'utf-8');
        return entries.length;
    }
}

// --- 3. BLOG USECASE (İçerik Üretimi) ---
class GenerateBlogBatchUseCase {
    constructor(geminiKey) {
        this.geminiKey = geminiKey;
        this.genAI = new GoogleGenerativeAI(geminiKey);
    }

    _detectKeyType() {
        if (this.geminiKey.trim().startsWith('{')) return "SERVICE_ACCOUNT_JSON";
        if (this.geminiKey.trim().startsWith('AIza')) return "AI_STUDIO_KEY";
        return "UNKNOWN";
    }

    async execute(batchSize, existingSlugs) {
        const keyType = this._detectKeyType();
        console.log(`[BlogUseCase] Gemini Motoru Hazırlanıyor... (Anahtar Türü: ${keyType})`);

        if (keyType === "SERVICE_ACCOUNT_JSON") {
            throw new Error(`GEMINI_API_KEY içine JSON yapıştırılmış! aistudio.google.com'dan AIza... ile başlayan key al.`);
        }

        const models = ["gemini-2.0-flash", "gemini-2.5-pro", "gemini-1.5-flash", "gemini-1.5-pro"];
        const versions = ["v1beta", "v1"];
        const prompt = this._getPrompt(batchSize, existingSlugs);

        for (const modelName of models) {
            for (const apiVer of versions) {
                try {
                    console.log(`[BlogUseCase] Deneniyor: ${modelName} (${apiVer})...`);
                    const model = this.genAI.getGenerativeModel({ model: modelName }, { apiVersion: apiVer });
                    const result = await model.generateContent(prompt);
                    const responseText = result.response.text();
                    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
                    const data = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);
                    console.log(`✅ [BlogUseCase] BAŞARILI: ${modelName}`);
                    return data;
                } catch (err) {
                    if (err.message.toLowerCase().includes("403") || err.message.toLowerCase().includes("forbidden")) {
                        throw new Error(`API KAPALI! Google Cloud'da Generative Language API'yi aktifleştir.`);
                    }
                    console.warn(`[BlogUseCase] ${modelName} (${apiVer}) hata: ${err.message.substring(0, 60)}...`);
                }
            }
        }
        throw new Error("❌ Hiçbir metin modeli çalışmadı.");
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
- image_prompt_en: Görsel üretmek için İngilizce prompt (örn: "Professional SEO dashboard with analytics charts in a modern Cyprus office")
- image_alt_tr: Türkçe görsel açıklaması (SEO için)
- image_alt_en: İngilizce görsel açıklaması (SEO için)
- content_tr: Türkçe içerik (en az 900 kelime). Markdown kuralları:
  * ## ile ana bölüm başlıkları (en az 4 adet)
  * ### ile alt bölüm başlıkları
  * #### ile numaralı tip başlıkları (örn: #### 1. Adım: ...)
  * Adım adım süreçlerde numaralı liste (1. 2. 3. formatında)
  * Madde listeleri - ile
  * En az 2 adet > callout kutusu (önemli istatistik veya kritik ipucu)
  * Somut KKTC örnekleri ve gerçekçi sayılar/istatistikler
  * --- ile bölüm ayırıcılar (2-3 kez)
- content_en: İngilizce içerik (en az 900 kelime, aynı Markdown kuralları)

SADECE geçerli bir JSON dizisi döndür:
[
  {
    "slug": "...",
    "title_tr": "...",
    "title_en": "...",
    "excerpt_tr": "...",
    "excerpt_en": "...",
    "category": "...",
    "readTimeMinutes": 8,
    "image_prompt_en": "...",
    "image_alt_tr": "...",
    "image_alt_en": "...",
    "content_tr": "...",
    "content_en": "..."
  }
]`;
    }
}

// --- 4. IMAGE SERVICE (Görsel Üretim + Cloudinary Upload) ---
class ImageGenerationService {
    constructor(geminiKey, cloudName, uploadPreset) {
        this.geminiKey = geminiKey;
        this.cloudName = cloudName;
        this.uploadPreset = uploadPreset;
        this.enabled = !!(geminiKey && cloudName && uploadPreset);

        if (this.enabled) {
            console.log(`[ImageService] ✅ Cloudinary aktif → ${cloudName}`);
        } else {
            console.log(`[ImageService] ⚠️ Cloudinary ayarları eksik, Picsum fallback kullanılacak.`);
        }
    }

    async generateAndUpload(imagePromptEn, category, slug) {
        if (!this.enabled) {
            return `https://picsum.photos/seed/${slug}/1200/630`;
        }

        try {
            console.log(`[ImageService] 🎨 Görsel üretiliyor: "${imagePromptEn.substring(0, 50)}..."`);
            const base64 = await this._generateWithGemini(imagePromptEn, category);
            const url = await this._uploadToCloudinary(base64, slug);
            console.log(`[ImageService] ✅ Yüklendi: ${url}`);
            return url;
        } catch (err) {
            console.warn(`[ImageService] ⚠️ Başarısız (${err.message.substring(0, 80)}), Picsum kullanılıyor.`);
            return `https://picsum.photos/seed/${slug}/1200/630`;
        }
    }

    async _generateWithGemini(imagePromptEn, category) {
        // Yeni @google/genai SDK'yı dinamik import ediyoruz
        const { GoogleGenAI } = await import('@google/genai');
        const ai = new GoogleGenAI({ apiKey: this.geminiKey });

        const fullPrompt = `Create a professional, high-quality blog cover image.
Topic: ${imagePromptEn}
Category: ${category} (Digital Marketing / KKTC Northern Cyprus)
Style: Modern, clean, professional photography or flat design illustration.
Requirements: Wide landscape format (16:9), no text overlay, no watermarks,
vibrant colors, suitable for a B2B digital marketing agency website.`;

        const imageModels = [
            'gemini-2.0-flash-preview-image-generation',
            'gemini-2.0-flash-exp',
        ];

        for (const modelName of imageModels) {
            try {
                console.log(`[ImageService] Model deneniyor: ${modelName}`);
                const response = await ai.models.generateContent({
                    model: modelName,
                    contents: fullPrompt,
                    config: { responseModalities: ['IMAGE', 'TEXT'] },
                });

                for (const part of response.candidates[0].content.parts) {
                    if (part.inlineData) {
                        console.log(`[ImageService] ✅ Görsel üretildi: ${modelName}`);
                        return part.inlineData.data; // base64
                    }
                }
            } catch (err) {
                console.warn(`[ImageService] ${modelName} hata: ${err.message.substring(0, 70)}`);
            }
        }

        throw new Error('Tüm görsel modelleri başarısız oldu.');
    }

    async _uploadToCloudinary(base64Data, slug) {
        const formData = new FormData();
        formData.append('file', `data:image/png;base64,${base64Data}`);
        formData.append('upload_preset', this.uploadPreset);
        formData.append('public_id', `blog/${slug}`);
        formData.append('overwrite', 'true');

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
            { method: 'POST', body: formData }
        );

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Cloudinary HTTP ${res.status}: ${errText.substring(0, 100)}`);
        }

        const json = await res.json();
        if (!json.secure_url) throw new Error('Cloudinary secure_url dönmedi.');
        return json.secure_url;
    }
}

// --- 5. MANAGER / SERVICE LAYER ---
class BlogManager {
    constructor(repository, blogUseCase, imageService) {
        this.repository = repository;
        this.blogUseCase = blogUseCase;
        this.imageService = imageService;
    }

    async runDailyAutomation(totalCount = 10) {
        console.log(`🚀 [Manager] Günlük otomasyon başlatıldı... (Hedef: ${totalCount} yazı)`);

        try {
            const existingSlugs = this.repository.getExistingSlugs();
            const startId = this.repository.getMaxId();

            // Batch'lere böl (her batch max 5 yazı)
            const BATCH_SIZE = 5;
            let rawDataBatch = [];
            let usedSlugs = [...existingSlugs];
            const batchCount = Math.ceil(totalCount / BATCH_SIZE);

            for (let b = 0; b < batchCount; b++) {
                const thisBatch = Math.min(BATCH_SIZE, totalCount - rawDataBatch.length);
                console.log(`[Manager] Batch ${b + 1}/${batchCount}: ${thisBatch} yazı içerik üretiliyor...`);
                const result = await this.blogUseCase.execute(thisBatch, usedSlugs);
                rawDataBatch = [...rawDataBatch, ...result];
                usedSlugs = [...usedSlugs, ...result.map(p => p.slug)];
            }

            const now = new Date();
            const months_tr = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
            const months_en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const dateTr = `${now.getDate()} ${months_tr[now.getMonth()]} ${now.getFullYear()}`;
            const dateEn = `${months_en[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

            // Her yazı için sırayla görsel üret (rate limit aşmamak için)
            const finalBlogPosts = [];
            for (let index = 0; index < rawDataBatch.length; index++) {
                const data = rawDataBatch[index];
                const slug = data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');

                console.log(`[Manager] (${index + 1}/${rawDataBatch.length}) Görsel üretiliyor: ${slug}`);
                const imgUrl = await this.imageService.generateAndUpload(
                    data.image_prompt_en || `${data.category} digital marketing in Northern Cyprus`,
                    data.category,
                    slug
                );

                finalBlogPosts.push(new BlogPost({
                    id: startId + index + 1,
                    slug,
                    title_tr: data.title_tr,
                    title_en: data.title_en,
                    excerpt_tr: data.excerpt_tr,
                    excerpt_en: data.excerpt_en,
                    category: data.category,
                    date: { tr: dateTr, en: dateEn },
                    readTime: { tr: `${data.readTimeMinutes || 10} dk okuma`, en: `${data.readTimeMinutes || 10} min read` },
                    image: imgUrl,
                    image_alt_tr: data.image_alt_tr,
                    image_alt_en: data.image_alt_en,
                    content_tr: data.content_tr,
                    content_en: data.content_en
                }));
            }

            const savedCount = this.repository.savePosts(finalBlogPosts);
            console.log(`✅ [Manager] ${savedCount} yeni yazı eklendi.`);

            this._updateViteConfig(finalBlogPosts);
            console.log(`✅ [Manager] vite.config.js güncellendi.`);

        } catch (error) {
            console.error("❌ [Manager] Kritik Hata:", error.message);
            throw error;
        }
    }

    _updateViteConfig(newPosts) {
        const viteConfigPath = join(dirname(fileURLToPath(import.meta.url)), '../vite.config.js');
        let content = readFileSync(viteConfigPath, 'utf-8');
        const newRoutes = newPosts.map(p => `        '/blog/${p.slug}',`).join('\n');
        const lastBlogRouteMatch = content.match(/(\/blog\/[a-z0-9-]+',\s*\n)(\s*\],)/);
        if (lastBlogRouteMatch) {
            content = content.replace(
                lastBlogRouteMatch[0],
                `${lastBlogRouteMatch[1]}${newRoutes}\n${lastBlogRouteMatch[2]}`
            );
            writeFileSync(viteConfigPath, content, 'utf-8');
        } else {
            console.warn('[Manager] vite.config.js güncellenemedi.');
        }
    }
}

// --- 6. ENTRY POINT ---
async function main() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const POSTS_PATH = join(__dirname, '../src/data/blogPosts.js');

    const GEMINI_KEY             = process.env.GEMINI_API_KEY;
    const CLOUDINARY_CLOUD_NAME  = process.env.CLOUDINARY_CLOUD_NAME;
    const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
    const BLOG_COUNT             = Math.min(Math.max(parseInt(process.env.BLOG_COUNT) || 10, 1), 30);

    if (!GEMINI_KEY) {
        console.error("❌ HATA: GEMINI_API_KEY ortam değişkeni ayarlanmamış.");
        process.exit(1);
    }

    console.log(`📝 [Main] Üretilecek yazı: ${BLOG_COUNT}`);
    console.log(`🖼️  [Main] Cloudinary: ${CLOUDINARY_CLOUD_NAME ? `${CLOUDINARY_CLOUD_NAME} ✅` : 'Ayarlanmamış ⚠️ (Picsum fallback)'}`);

    const repository  = new FileBlogRepository(POSTS_PATH);
    const blogUseCase = new GenerateBlogBatchUseCase(GEMINI_KEY);
    const imageService = new ImageGenerationService(GEMINI_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET);
    const manager     = new BlogManager(repository, blogUseCase, imageService);

    try {
        await manager.runDailyAutomation(BLOG_COUNT);
    } catch (err) {
        process.exit(1);
    }
}

main();
