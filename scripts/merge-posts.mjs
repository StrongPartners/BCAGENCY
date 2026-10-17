// Aynı konuyu tekrar eden yazıları birleştirir: scripts/blog-birlestirme.json'daki "merge" yazıları
// blogPosts.js ve site haritasından çıkarılır, worker/blog-redirects.json ile "keep" yazısına 301 verilir.
// node scripts/merge-posts.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'acorn';

const plan = JSON.parse(readFileSync('scripts/blog-birlestirme.json', 'utf8'));
const target = Object.fromEntries(plan.flatMap((g) => g.merge.map((s) => [s, g.keep])));

const file = 'src/data/blogPosts.js';
const src = readFileSync(file, 'utf8');
const arr = parse(src, { ecmaVersion: 'latest', sourceType: 'module' }).body[0].declaration.declarations[0].init;
const slugOf = (el) => el.properties.find((p) => p.key.name === 'slug')?.value.value;
const drop = arr.elements.filter((el) => target[slugOf(el)]);
let out = src;
for (const el of [...drop].reverse()) {           // sondan başa: konumlar kaymasın
  let end = el.end;
  while (/[\s,]/.test(out[end]) && out[end] !== '\n') end++;
  if (out[end] === '\n') end++;
  let start = el.start;
  while (start > 0 && out[start - 1] !== '\n') start--;
  out = out.slice(0, start) + out.slice(end);
}
writeFileSync(file, out);

const vc = 'vite.config.js';
let v = readFileSync(vc, 'utf8');
for (const s of Object.keys(target)) v = v.replace(new RegExp(`^[ \\t]*'/blog/${s}',\\r?\\n`, 'm'), '');
writeFileSync(vc, v);

const rf = 'worker/blog-redirects.json';
let old = {};
try { old = JSON.parse(readFileSync(rf, 'utf8')); } catch { /* ilk kez */ }
writeFileSync(rf, JSON.stringify({ ...old, ...Object.fromEntries(Object.entries(target).map(([s, k]) => [`/blog/${s}`, `/blog/${k}`])) }, null, 1));
console.log(`çıkarılan ${drop.length} yazı, yönlendirme ${Object.keys(target).length}`);
