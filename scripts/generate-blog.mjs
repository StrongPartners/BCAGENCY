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
                    const rawText = result.response.text();

                    // Gemini bazen ```json ... ``` bloğu içinde döner — temizle
                    const cleanText = rawText
                        .replace(/^```json\s*/m, '')
                        .replace(/^```\s*/m, '')
                        .replace(/```\s*$/m, '')
                        .trim();

                    const jsonMatch = cleanText.match(/\[[\s\S]*\]/);
                    const data = JSON.parse(jsonMatch ? jsonMatch[0] : cleanText);
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
        return `Sen "BC Creative Agency" adlı KKTC'nin (Kuzey Kıbrıs) önde gelen dijital pazarlama ve reklam ajansının içerik yazarısın.

## AJANS BİLGİLERİ (içeriklerde doğal biçimde kullan)
- Ajans adı: BC Creative Agency
- Lokasyon: Girne, KKTC (Lefkoşa ve tüm KKTC'ye hizmet)
- Hizmetler: SEO, Google Ads, Meta/Facebook/Instagram Reklamları, Sosyal Medya Yönetimi, Web Tasarım, Grafik Tasarım, Prodüksiyon, Drone Çekim, Fotoğraf & Video Çekim
- Hedef: Arama sonuçlarında "reklam ajansı KKTC", "dijital pazarlama Girne", "sosyal medya yönetimi Lefkoşa", "grafik tasarım KKTC", "video prodüksiyon Kuzey Kıbrıs" gibi aramalarda üst sıralara çıkmak

## KONU HAVUZU — Bir reklam ajansının sunduğu tüm hizmetler (her seferinde farklı, henüz işlenmemiş bir konu seç):

### A) DİJİTAL PAZARLAMA & REKLAM
- Google Ads kampanya yönetimi, Performance Max, Search/Display/Shopping reklamları
- Meta Ads (Facebook & Instagram reklamları), hedef kitle oluşturma, retargeting
- TikTok Ads, Reels reklamları, genç kitleye ulaşma
- YouTube Ads, video reklam stratejileri, in-stream reklamlar
- LinkedIn Ads, B2B reklamcılık, profesyonel kitleye ulaşma
- Programatik reklam, display network, banner tasarım
- E-posta pazarlama otomasyonu, newsletter stratejisi, Mailchimp/Klaviyo
- SMS pazarlama, WhatsApp Business API, anlık bildirimler
- Affiliate/gelir ortaklığı pazarlaması
- Influencer & mikro-influencer pazarlama stratejisi
- Reklam bütçesi optimizasyonu, ROAS hesaplama, CPC/CPM analizi

### B) SEO & ARAMA MOTORU OPTİMİZASYONU
- Teknik SEO (site hızı, Core Web Vitals, schema markup)
- Yerel SEO, Google My Business optimizasyonu, harita paketi
- Anahtar kelime araştırması ve içerik stratejisi
- Backlink inşası ve off-page SEO
- E-ticaret SEO, ürün sayfası optimizasyonu
- Sesli arama optimizasyonu
- Google Search Console ve Analytics kullanımı

### C) SOSYAL MEDYA YÖNETİMİ
- Instagram hesap yönetimi, grid planlaması, Reels stratejisi
- TikTok hesap yönetimi, viral içerik formülleri
- Facebook sayfa yönetimi, topluluk oluşturma
- LinkedIn şirket sayfası ve kişisel marka yönetimi
- Twitter/X kullanımı ve kriz iletişimi
- Sosyal medya içerik takvimi oluşturma
- Topluluk yönetimi, yorum ve mesaj yanıtlama stratejisi
- Hashtag stratejisi ve algoritma optimizasyonu

### D) WEB TASARIM & GELİŞTİRME
- Kurumsal web sitesi tasarımı ve geliştirme
- E-ticaret sitesi kurulumu (Shopify, WooCommerce)
- Landing page tasarımı ve dönüşüm optimizasyonu (CRO)
- Mobil uyumluluk ve hız optimizasyonu
- UX/UI tasarım prensipleri
- Web sitesi güvenliği ve bakımı

### E) GRAFİK TASARIM & MARKA KİMLİĞİ
- Logo tasarımı ve marka kimliği oluşturma
- Kurumsal kimlik (kartvizit, antet, zarf, broşür)
- Sosyal medya görsel şablonları ve tasarım rehberi
- Billboard, tabela ve outdoor reklam tasarımı
- Ambalaj ve ürün tasarımı
- Sunum ve katalog tasarımı
- İnfografik ve data visualization tasarımı
- Motion design ve animasyon

### F) VİDEO PRODÜKSİYON & FOTOĞRAFÇILIK
- Kurumsal tanıtım filmi ve reklam filmi çekimi
- Sosyal medya için kısa video içerik üretimi (Reels, TikTok, YouTube Shorts)
- Ürün tanıtım videosu ve unboxing içerikleri
- Etkinlik ve organizasyon video çekimi
- Belgesel ve röportaj çekimi
- Drone ile hava fotoğraf ve video çekimi (emlak, turizm, inşaat)
- Kurumsal fotoğraf çekimi (çalışan, ofis, ekip)
- Ürün fotoğrafçılığı ve e-ticaret görselleri
- Mimari fotoğrafçılık (oteller, villalar, projeler)
- Yemek fotoğrafçılığı (restoran, kafe, catering)
- Moda ve lifestyle fotoğraf çekimi

### G) SEKTÖR BAZLI DİJİTAL STRATEJİLER
- Turizm & otel sektörü: rezervasyon artırma, sezonsallık, OTA stratejileri
- Emlak & inşaat: yabancı alıcıya ulaşma, drone ile tanıtım, çok dilli pazarlama
- Restoran & kafe: menü fotoğrafçılığı, Google Haritalar, sosyal medya
- Sağlık & klinik: hasta kazanımı, medikal SEO, HIPAA uyumlu içerik
- Eğitim & üniversite: öğrenci rekrutmanı, kampüs tanıtımı, uluslararası öğrenci
- Perakende & mağaza: e-ticaret entegrasyonu, yerel müşteri çekme
- İnşaat & müteahhit: proje lansman kampanyaları, B2B pazarlama
- Finans & danışmanlık: otorite içerik, güven inşası, LinkedIn stratejisi
- Otomotiv & servis: Google Ads, araç fotoğrafçılığı, sosyal medya

### H) STRATEJİ & DANIŞMANLIK
- Marka stratejisi ve konumlandırma
- Rakip analizi ve pazar araştırması
- Dijital pazarlama danışmanlığı ve denetimi
- Kriz iletişimi ve itibar yönetimi
- Kampanya planlama ve bütçe yönetimi
- KPI belirleme ve performans raporlama
- A/B testi ve dönüşüm optimizasyonu

## KULLANILMIŞ SLUG'LAR — Bunları KULLANMA:
${existingSlugs.join(', ')}

## HER BLOG YAZISI İÇİN ZORUNLU KURALLAR:

### İçerik Stratejisi:
1. Başlık, "KKTC", "Kuzey Kıbrıs", "Girne" veya "Lefkoşa" kelimelerinden en az birini içermeli
2. İçerik boyunca "BC Creative Agency" 3-5 kez doğal biçimde geçmeli (reklam gibi değil, uzman referansı gibi)
3. İçerikte şu lokasyonlara doğal referans ver: Girne, Lefkoşa, Gazimağusa, Karpaz, İskele, Güzelyurt
4. Yazının sonunda MUTLAKA "BC Creative Agency ile Çalışın" başlıklı bir CTA bölümü olmalı
5. İçerik, okuyucuyu ajansın hizmetine yönlendirmeli ama baskıcı olmadan

### SEO Kuralları:
- Ana hedef keyword başlıkta, ilk paragrafta ve en az 3 H2/H3 başlığında geçmeli
- LSI (ilgili) keywordler içeriğe serpiştirilmeli (örn: "reklam ajansı" yazısında "dijital ajans", "medya ajansı", "kreatif ajans" da geçmeli)
- Yerel SEO için şehir adları heading'lerde de kullanılmalı

### Markdown Yapısı (ZORUNLU):
- ## ile SEO başlıkları (en az 5 adet, keyword içermeli)
- ### ile alt bölümler
- #### ile numaralı adım başlıkları
- Adım adım süreçlerde numaralı liste (1. 2. 3.)
- Madde listeleri için -
- En az 3 adet > callout kutusu (istatistik veya kritik ipucu)
- --- ile bölüm ayırıcılar (3-4 kez)
- Minimum 1000 kelime Türkçe içerik

### Kaçınılacaklar:
- Genel tavsiyeler vermekten kaçın, her şeyi KKTC özelinde somutlaştır
- "Her ülkede geçerli" tarzı cümleler yazma
- Ajansı açıkça "bizi seçin" diye pazarlama, uzmanlıkla öne çık

## ZORUNLU JSON ALANLARI:
- slug: kktc-keyword-sehir formatında (örn: "reklam-ajansi-girne-sosyal-medya")
- title_tr: 55-65 karakter, keyword + lokasyon içermeli
- title_en: 55-65 karakter
- excerpt_tr: 150-160 karakter, ana keyword + BC Creative Agency + KKTC geçmeli
- excerpt_en: 150-160 karakter
- category: SEO / Google Ads / Sosyal Medya / Web Tasarım / Dijital Pazarlama
- readTimeMinutes: sayı
- image_prompt_en: Görsel için detaylı İngilizce prompt (örn: "Professional creative agency team working on digital marketing campaign in a modern Kyrenia Cyprus office, laptops and screens showing social media analytics")
- image_alt_tr: SEO odaklı Türkçe görsel açıklaması (keyword içermeli)
- image_alt_en: SEO odaklı İngilizce görsel açıklaması
- content_tr: Yukarıdaki tüm kurallara uyan Türkçe içerik (min 1000 kelime)
- content_en: Aynı kurallara uyan İngilizce içerik (min 1000 kelime)

SADECE geçerli JSON dizisi döndür, başka hiçbir şey yazma:
[
  {
    "slug": "...",
    "title_tr": "...",
    "title_en": "...",
    "excerpt_tr": "...",
    "excerpt_en": "...",
    "category": "...",
    "readTimeMinutes": 10,
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
