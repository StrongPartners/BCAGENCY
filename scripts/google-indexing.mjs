/**
 * BC Creative Agency — Google Indexing API Integration
 * Refactored to Clean Architecture as per CORE_ARCHITECTURE.md
 */

import { google } from 'googleapis';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// --- 1. MODEL KATMANI ---
class IndexingNotification {
    constructor(url, type = 'URL_UPDATED') {
        this.url = url;
        this.type = type;
    }
}

// --- 2. REPOSITORY INTERFACE ---
// IIndexingRepository: { publish(notification) }

// --- 3. REPOSITORY IMPLEMENTATION (Data Access Layer) ---
class GoogleIndexingRepository {
    constructor(keyFilePath) {
        this.keyFilePath = keyFilePath;
    }

    async _getAuth() {
        if (!existsSync(this.keyFilePath)) {
            throw new Error(`Service Account JSON bulunamadı: ${this.keyFilePath}`);
        }
        const keyData = JSON.parse(readFileSync(this.keyFilePath, 'utf-8'));
        return new google.auth.JWT(
            keyData.client_email,
            null,
            keyData.private_key,
            ['https://www.googleapis.com/auth/indexing'],
            null
        );
    }

    async publish(notification) {
        const auth = await this._getAuth();
        const indexing = google.indexing({ version: 'v3', auth });

        const response = await indexing.urlNotifications.publish({
            requestBody: {
                url: notification.url,
                type: notification.type
            }
        });
        return response.status;
    }
}

// --- 4. USECASE (Business Logic Katmanı) ---
class IndexRecentPostsUseCase {
    constructor(indexingRepository, blogRepository) {
        this.indexingRepository = indexingRepository;
        this.blogRepository = blogRepository;
    }

    async execute(count = 10) {
        console.log(`[UseCase] Son ${count} yazı için indeksleme bildirimi gönderiliyor...`);

        try {
            const slugs = this.blogRepository.getExistingSlugs();
            const recentSlugs = slugs.slice(-count);
            const baseUrl = 'https://bccreative.agency/blog/';

            const results = [];
            for (const slug of recentSlugs) {
                const url = `${baseUrl}${slug}`;
                const notification = new IndexingNotification(url);
                try {
                    const status = await this.indexingRepository.publish(notification);
                    console.log(`✅ [UseCase] Başarılı: ${url} (Status: ${status})`);
                    results.push({ url, status: 'success' });
                } catch (err) {
                    console.error(`❌ [UseCase] Hata: ${url} - ${err.message}`);
                    results.push({ url, status: 'failed', error: err.message });
                }
            }
            return results;
        } catch (err) {
            console.error(`❌ [UseCase] Kritik Hata:`, err.message);
            throw err;
        }
    }
}

// --- 5. REPOSITORY FALLBACK (Script için Blog Repo benzeri) ---
class SimpleBlogReader {
    constructor(filePath) {
        this.filePath = filePath;
    }
    getExistingSlugs() {
        const content = readFileSync(this.filePath, 'utf-8');
        return [...content.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);
    }
}

// --- 6. ÇALIŞTIRICI SCRIPT ---
async function main() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const JSON_FILENAME = 'bccreative-49a1ba3a3690.json';
    let KEY_PATH = join(__dirname, `../${JSON_FILENAME}`);

    if (!existsSync(KEY_PATH)) {
        KEY_PATH = join(__dirname, '../google-service-account.json');
    }

    const BLOG_PATH = join(__dirname, '../src/data/blogPosts.js');

    const indexingRepo = new GoogleIndexingRepository(KEY_PATH);
    const blogReader = new SimpleBlogReader(BLOG_PATH);
    const useCase = new IndexRecentPostsUseCase(indexingRepo, blogReader);

    try {
        await useCase.execute(10);
        console.log("🏁 [Main] İndeksleme süreci tamamlandı.");
    } catch (err) {
        console.error("❌ [Main] Başarısız.");
        process.exit(1);
    }
}

main();

// Mesaj sonu kuralı:
// bitti bebeğim kontrol eder misin
