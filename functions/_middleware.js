// Cloudflare Pages: tek bir asıl alan adı (bccreative.agency).
// www ve *.pages.dev önizleme adresleri dışındaki www isteklerini 301 ile yönlendirir.
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === 'www.bccreative.agency') {
    url.hostname = 'bccreative.agency';
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
