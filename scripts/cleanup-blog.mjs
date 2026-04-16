/**
 * BC Creative Agency — Blog Content Cleanup
 * Mevcut blogPosts.js içindeki bozuk/eski migration bug'larını temizler:
 *   1. "### H2:" / "### H3:" prefix artifact'larını kaldırır (### olarak bırakır)
 *   2. "en: undefined" bug'ını fixler (EN boş ise TR içerikle doldurur)
 *   3. Başlık prefix'lerini temizler ("H2: Title" → "Title")
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_PATH = join(__dirname, '../src/data/blogPosts.js');

let content = readFileSync(POSTS_PATH, 'utf-8');
const originalContent = content;
let changes = { headingArtifacts: 0, undefinedEn: 0, doubleCommas: 0 };

// FIX 1: "### H2: Title" → "## Title" (markdown seviyesi düzelt)
const beforeH2 = content.length;
content = content.replace(/###\s+H2:\s*/g, '## ');
content = content.replace(/###\s+H3:\s*/g, '### ');
content = content.replace(/##\s+H1:\s*/g, '# ');
content = content.replace(/####\s+H4:\s*/g, '#### ');
if (content.length !== beforeH2) changes.headingArtifacts++;

// FIX 2: en: undefined → en: "" (sonra BlogPost.jsx TR'ye fallback yapar)
const undefEnRegex = /en:\s*undefined\s*\}/g;
const undefMatches = content.match(undefEnRegex);
if (undefMatches) {
    changes.undefinedEn = undefMatches.length;
    content = content.replace(undefEnRegex, 'en: "" }');
}

// FIX 3: KRİTİK - "},," (çift virgül) bug'ı sparse array oluşturuyor,
// Blog.jsx .map() içinde post.id'ye erişince crash ediyor → BEYAZ EKRAN!
// "},(whitespace),"  →  "},(whitespace)"
const doubleCommaMatches = content.match(/\},(\s*),/g);
if (doubleCommaMatches) {
    changes.doubleCommas = doubleCommaMatches.length;
    content = content.replace(/\},(\s*),/g, '},$1');
}

// Kaydet
if (content !== originalContent) {
    writeFileSync(POSTS_PATH, content, 'utf-8');
    console.log('✅ Temizlik tamamlandı:');
    console.log(`   - Heading artifact'ları (H2:/H3:/H4: prefix): ${changes.headingArtifacts > 0 ? 'düzeltildi' : 'yok'}`);
    console.log(`   - Undefined EN içerik: ${changes.undefinedEn} adet → "" olarak ayarlandı (TR fallback)`);
    console.log(`   - Çift virgül (sparse array) bug'ı: ${changes.doubleCommas} adet düzeltildi`);
} else {
    console.log('ℹ️  Temizlenecek bir şey bulunamadı.');
}
