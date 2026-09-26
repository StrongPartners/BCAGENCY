// BC Creative sitesi — Cloudflare Workers (statik varlıklar + SPA).
// - www → bccreative.agency 301
// - /api/img?u=<url> → izinli depolama alanlarındaki görselleri aynı alan adından sunar
//   (iş birliği logolarını tarayıcıda küplere dönüştürebilmek için; canvas CORS kısıtı)
const IMG_HOSTS = new Set(['firebasestorage.googleapis.com', 'storage.googleapis.com']);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.bccreative.agency') {
      url.hostname = 'bccreative.agency';
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
    return env.ASSETS.fetch(request);
  },
};
