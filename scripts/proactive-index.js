const axios = require('axios');
const fs = require('fs');
const path = require('path');

// IndexNow API endpoint (for Bing, Yandex, etc.)
const INDEXNOW_API = 'https://www.bing.com/indexnow';
const HOST = 'bccreative.agency';
const KEY = 'c0ffee-de-f00d-babe-feed-007'; // Example Key. You should generate a real one.
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Routes to notify
const routes = [
    '',
    '/blog',
    '/hizmetler/seo',
    '/hizmetler/google-ads',
    '/hizmetler/sosyal-medya',
    '/hizmetler/web-tasarim',
];

async function notifyIndexNow() {
    console.log('🚀 Starting Proactive Indexing via IndexNow...');

    // Ensure the key file exists in public/
    const publicDir = path.resolve(__dirname, '../public');
    const keyFile = path.join(publicDir, `${KEY}.txt`);

    if (!fs.existsSync(keyFile)) {
        fs.writeFileSync(keyFile, KEY);
        console.log(`✅ IndexNow Key File Created: ${KEY}.txt`);
    }

    const payload = {
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: routes.map(r => `https://${HOST}${r}`)
    };

    try {
        const response = await axios.post(INDEXNOW_API, payload);
        console.log(`✅ IndexNow Success: ${response.status} ${response.statusText}`);
    } catch (error) {
        console.error('❌ IndexNow Failed:', error.message);
    }
}

notifyIndexNow();
