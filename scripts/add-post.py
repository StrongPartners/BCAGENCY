"""Blog yazısı ekler: python3 scripts/add-post.py post.json
post.json: {slug, category, title{tr,en}, excerpt{tr,en}, readTime{tr,en}, imageAlt{tr,en}, content{tr,en}}
- id: mevcut en büyük id + 1
- date: bugün (TR/EN)
- image: picsum seed (slug)
- vite.config.js sitemap listesine /blog/<slug> ekler
"""
import json, re, sys, datetime, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
p = json.load(open(sys.argv[1], encoding='utf-8'))
data = root / 'src/data/blogPosts.js'; s = open(data, encoding='utf-8', newline='').read()
if f'"{p["slug"]}"' in s or f"'{p['slug']}'" in s:
    sys.exit(f'HATA: slug zaten var: {p["slug"]}')
nid = max(int(x) for x in re.findall(r'^\s*id:\s*(\d+)', s, re.M)) + 1
AY = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık']
d = datetime.date.today()
date = {'tr': f'{d.day} {AY[d.month-1]} {d.year}', 'en': d.strftime('%B ') + f'{d.day}, {d.year}'}
J = lambda o: json.dumps(o, ensure_ascii=False)
entry = f'''    {{
        id: {nid},
        slug: {J(p['slug'])},
        title: {{ tr: {J(p['title']['tr'])}, en: {J(p['title']['en'])} }},
        excerpt: {{ tr: {J(p['excerpt']['tr'])}, en: {J(p['excerpt']['en'])} }},
        category: {J(p['category'])},
        date: {{ tr: {J(date['tr'])}, en: {J(date['en'])} }},
        readTime: {{ tr: {J(p['readTime']['tr'])}, en: {J(p['readTime']['en'])} }},
        image: {J(p.get('image') or ('https://picsum.photos/seed/' + p['slug'] + '/1200/630'))},
        imageAlt: {{ tr: {J(p['imageAlt']['tr'])}, en: {J(p['imageAlt']['en'])} }},
        content: {{ tr: {J(p['content']['tr'])}, en: {J(p['content']['en'])} }},
    }},
'''
i = s.rstrip().rfind('];')
s = s[:i].rstrip() + '\n' + entry + '];\n'
open(data, 'w', encoding='utf-8', newline='').write(s)
vc = root / 'vite.config.js'; v = open(vc, encoding='utf-8', newline='').read()
m = list(re.finditer(r"^([ \t]*)'/blog/[^']+',", v, re.M))
if m:
    last = m[-1]; ind = last.group(1)
    v = v[:last.end()] + f"\n{ind}'/blog/{p['slug']}'," + v[last.end():]
    open(vc, 'w', encoding='utf-8', newline='').write(v)
print('eklendi', nid, p['slug'], date['tr'])
