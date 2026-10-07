// BC Creative sitesi — Cloudflare Workers (statik varlıklar + SPA).
// - http → https ve www → bccreative.agency 301
// - sondaki "/" olan sayfa adresleri tek adrese 301 (örn. /about/ → /about)
// - SPA sayfaları ilk HTML'de kendi canonical, og:url, başlık ve açıklamasıyla gelir. Eskiden her sayfa ana sayfayı
//   canonical gösteriyordu; Google JS çalıştırmadan önce bunu görüp sayfaları "doğru standart etikete sahip
//   alternatif sayfa" sayıyordu (Search Console, Ekim 2026).
// - bilinmeyen adresler gerçek 404 + noindex (soft 404 yerine)
// - /api/img?u=<url> → izinli depolama alanlarındaki görselleri aynı alan adından sunar
//   (iş birliği logolarını tarayıcıda küplere dönüştürebilmek için; canvas CORS kısıtı)
const ORIGIN = 'https://bccreative.agency';
const IMG_HOSTS = new Set(['firebasestorage.googleapis.com', 'storage.googleapis.com']);

// Sayfa başlık/açıklamaları: bileşenlerdeki useSEO değerlerinin Türkçeleri (tarayıcıda bileşen yine kendi değerini yazar)
const PAGES = {
  '/': ['BC Creative Agency | KKTC Sosyal Medya, Web Sitesi, Uygulama, CRM ve SEO – Girne', 'BC Creative Agency — KKTC Girne merkezli ajans. Sosyal medya yönetimi, Reels ve video, web sitesi, mobil uygulama, CRM yazılımı ve SEO tek ekipte.'],
  '/about': ['Hakkımızda | BC Creative Agency - KKTC Girne', "BC Creative Agency — 2017'den beri KKTC'de dijital pazarlama."],
  '/contact': ['İletişim | BC Creative Agency - KKTC Girne', 'BC Creative Agency ile iletişime geçin.'],
  '/blog': ['Blog | BC Creative Agency', 'KKTC işletmeleri için SEO, Google Ads, sosyal medya ve web tasarım üzerine samimi rehberler.'],
  '/kup': ['Küp | BC Creative Agency', 'BC Creative Agency — KKTC Girne merkezli dijital ajans.'],
  '/hizmetler/seo': ['KKTC SEO Ajansı | Kuzey Kıbrıs SEO Hizmetleri', "KKTC odaklı profesyonel SEO hizmetleri. Google'da ilk sırada yer alarak müşterilerinizi yakalayın. Girne ve Lefkoşa dijital pazarlama ajansı."],
  '/hizmetler/google-ads': ['KKTC Google Ads Yönetimi | Profesyonel Reklam Ajansı', "KKTC'de profesyonel Google Ads yönetimi. Google reklam bütçenizi satışa dönüştürün."],
  '/hizmetler/sosyal-medya': ['KKTC Sosyal Medya Yönetimi | BC Creative Agency', "KKTC'de profesyonel sosyal medya yönetimi. Instagram, Facebook, TikTok stratejisi ve içerik."],
  '/hizmetler/web-tasarim': ['KKTC Web Tasarım | Hızlı ve Modern Web Siteleri', "KKTC'de profesyonel web tasarım. Hızlı, modern, SEO dostu siteler."],
  '/hizmetler/produksiyon': ['KKTC Prodüksiyon | Reklam Filmi & Kurumsal Video', "KKTC'de profesyonel video prodüksiyon ve reklam filmi çekimi."],
  '/hizmetler/drone-cekim': ['KKTC Drone Çekim | 4K Hava Çekimi Hizmeti', "KKTC'de profesyonel drone çekim. 4K hava çekimi, turizm, emlak ve etkinlik."],
  '/hizmetler/fotograf-video': ['KKTC Fotoğraf & Video Çekim | Profesyonel Prodüksiyon', "KKTC'de profesyonel fotoğraf ve video çekimi. Ürün, etkinlik, kurumsal."],
  '/hizmetler/uygulama-gelistirme': ['KKTC Mobil Uygulama Geliştirme | iOS & Android – BC Creative Girne', 'Rezervasyon, sipariş, sadakat kartı veya şirket içi iş takibi. İşinizin gerçekten ihtiyaç duyduğu uygulamayı tasarlıyor, geliştiriyor ve mağazalara yüklüyoruz.'],
  '/hizmetler/crm-yazilim': ['KKTC CRM Yazılımı ve Özel İş Yazılımları | BC Creative Girne', 'Müşteri adayları, teklifler, e-posta, görevler ve gün sonu raporları: işinize özel CRM ve iş yazılımları.'],
  '/hizmetler/reels-video-edit': ['KKTC Reels Üretimi ve Video Edit | Instagram & TikTok – BC Creative Girne', 'Instagram Reels, TikTok ve YouTube Shorts için dikey video üretiyoruz. Aylık çekim günleriyle bir ayın içeriğini tek seferde çekip kurguluyoruz.'],
  '/gizlilik-politikasi': ['Gizlilik Politikası | BC Creative Agency', 'BC Creative Agency gizlilik politikası. Kişisel verilerinizin korunması hakkında bilgi.'],
  '/kullanim-sartlari': ['Kullanım Şartları | BC Creative Agency', 'BC Creative Agency web sitesi kullanım şartları ve koşulları.'],
};

const clip = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

// Bir sayfanın meta bilgisi: { title, desc, image?, article? } ya da null (sayfa yok → 404)
async function pageMeta(path, env) {
  if (PAGES[path]) return { title: PAGES[path][0], desc: PAGES[path][1] };
  const m = path.match(/^\/blog\/([a-z0-9-]+)$/);
  if (!m) return null;
  const r = await env.ASSETS.fetch(new Request(`${ORIGIN}/blog-data/${m[1]}.json`));
  if (!r.ok || !(r.headers.get('content-type') || '').includes('json')) return null;
  try {
    const p = await r.json();
    const title = (p.title && (p.title.tr || p.title.en)) || '';
    const desc = (p.excerpt && (p.excerpt.tr || p.excerpt.en)) || '';
    if (!title) return null;
    return { title: `${title} | BC Creative Agency`, desc: clip(desc, 300), image: p.image, article: true };
  } catch { return null; }
}

const setAttr = (attr, val) => ({ element: (e) => { if (val) e.setAttribute(attr, val); } });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.bccreative.agency' || (url.protocol === 'http:' && url.hostname === 'bccreative.agency')) {
      url.hostname = 'bccreative.agency'; url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === '/api/img') {
      let src;
      try { src = new URL(url.searchParams.get('u') || ''); } catch { return new Response('bad url', { status: 400 }); }
      if (src.protocol !== 'https:' || !IMG_HOSTS.has(src.hostname)) return new Response('host not allowed', { status: 403 });
      const r = await fetch(src.toString(), { cf: { cacheTtl: 86400, cacheEverything: true } });
      const type = r.headers.get('content-type') || '';
      if (!r.ok || !type.startsWith('image/')) return new Response('not an image', { status: 502 });
      return new Response(r.body, { headers: { 'content-type': type, 'cache-control': 'public, max-age=86400', 'x-content-type-options': 'nosniff' } });
    }

    // Uzantılı dosyalar ve GET/HEAD dışı istekler olduğu gibi
    const isPage = (request.method === 'GET' || request.method === 'HEAD') && !/\.[a-z0-9]{1,8}$/i.test(url.pathname);
    if (!isPage) return env.ASSETS.fetch(request);

    // Sondaki eğik çizgi → tek adres
    if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
      url.pathname = url.pathname.replace(/\/+$/, '') || '/';
      return Response.redirect(url.toString(), 301);
    }

    const path = url.pathname;
    const [meta, res] = await Promise.all([pageMeta(path, env), env.ASSETS.fetch(request)]);
    if (!(res.headers.get('content-type') || '').includes('text/html')) return res;

    if (!meta) {
      // Uygulama kendi 404 ekranını gösterir; Google gerçek 404 ve noindex görür
      const out = new HTMLRewriter()
        .on('link[rel="canonical"]', { element: (e) => e.remove() })
        .on('meta[name="robots"]', setAttr('content', 'noindex, follow'))
        .transform(res);
      return new Response(out.body, { status: 404, headers: out.headers });
    }

    const canon = ORIGIN + path;
    return new HTMLRewriter()
      .on('link[rel="canonical"]', setAttr('href', canon))
      .on('meta[property="og:url"]', setAttr('content', canon))
      .on('title', { element: (e) => e.setInnerContent(meta.title) })
      .on('meta[name="description"]', setAttr('content', meta.desc))
      .on('meta[property="og:title"]', setAttr('content', meta.title))
      .on('meta[property="og:description"]', setAttr('content', meta.desc))
      .on('meta[name="twitter:title"]', setAttr('content', meta.title))
      .on('meta[name="twitter:description"]', setAttr('content', meta.desc))
      .on('meta[property="og:type"]', setAttr('content', meta.article ? 'article' : ''))
      .on('meta[property="og:image"]', setAttr('content', meta.image))
      .on('meta[name="twitter:image"]', setAttr('content', meta.image))
      .transform(res);
  },
};
