// Derleme öncesi: blogPosts.js'i ikiye böler.
//  - src/data/blogIndex.json  → liste/önizleme için hafif özet (içerik yok), en yeni önce
//  - public/blog-data/<slug>.json → tek yazının tam içeriği (yazı sayfası açılınca yüklenir)
import { blogPosts } from '../src/data/blogPosts.js';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';

const outDir = 'public/blog-data';
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const index = [...blogPosts]
  .sort((a, b) => b.id - a.id)
  .map(({ content, ...meta }) => meta);

for (const p of blogPosts) writeFileSync(`${outDir}/${p.slug}.json`, JSON.stringify(p));
writeFileSync('src/data/blogIndex.json', JSON.stringify(index));
writeFileSync('src/data/blogLatest.json', JSON.stringify(index.slice(0, 3)));
console.log(`blog: ${index.length} yazı, özet ${(JSON.stringify(index).length / 1024).toFixed(0)} KB`);
