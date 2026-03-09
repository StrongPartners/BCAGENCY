/**
 * BC Creative Agency — Google Indexing API Integration
 * 
 * This script notifies Google's Indexing API about new or updated URLs
 * to ensure rapid crawling and indexing (often within minutes).
 */

import { google } from 'googleapis';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// User explicitly provided this JSON file
const JSON_FILENAME = 'bccreative-49a1ba3a3690.json';
let KEY_FILE = join(__dirname, `../${JSON_FILENAME}`);

// Fallback for CI/CD environments where the file might be renamed
if (!existsSync(KEY_FILE)) {
    KEY_FILE = join(__dirname, '../google-service-account.json');
}

const POSTS_FILE = join(__dirname, '../src/data/blogPosts.js');

async function indexUrls() {
    console.log('🔍 Starting Google Indexing process...');

    let auth;
    try {
        const keyData = JSON.parse(readFileSync(KEY_FILE, 'utf-8'));
        auth = new google.auth.JWT(
            keyData.client_email,
            null,
            keyData.private_key,
            ['https://www.googleapis.com/auth/indexing'],
            null
        );
    } catch (err) {
        console.error(`❌ Error: Service Account JSON not found or invalid.`);
        return;
    }

    const indexing = google.indexing({ version: 'v3', auth });

    // Get slugs from blogPosts.js
    const postsContent = readFileSync(POSTS_FILE, 'utf-8');
    const slugs = [...postsContent.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);

    // Index the 10 most recent posts
    const recentSlugs = slugs.slice(-10);
    const baseUrl = 'https://bccreative.agency/blog/';

    for (const slug of recentSlugs) {
        const url = `${baseUrl}${slug}`;
        console.log(`🚀 Notifying Google of URL: ${url}`);

        try {
            await indexing.urlNotifications.publish({
                requestBody: {
                    url: url,
                    type: 'URL_UPDATED'
                }
            });
            console.log(`✅ Success: ${url}`);
        } catch (err) {
            console.error(`❌ Failed to index ${url}:`, err.message);
        }
    }
}

indexUrls();
