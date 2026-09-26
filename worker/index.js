// BC Creative sitesi — Cloudflare Workers (statik varlıklar + SPA).
// Statik dosyalar doğrudan ASSETS'ten sunulur; bu betik yalnızca
// eşleşmeyen isteklerde ve www yönlendirmesinde devreye girer.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.bccreative.agency') {
      url.hostname = 'bccreative.agency';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
