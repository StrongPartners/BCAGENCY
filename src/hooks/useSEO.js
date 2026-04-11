import { useEffect } from 'react';
import { GEO } from '../lib/geoConfig';

/**
 * useSEO
 *
 * Manages document <head> tags for SEO + GEO (Generative Engine
 * Optimization). Supports:
 *  - classic meta (description, keywords, robots)
 *  - Open Graph / Twitter cards
 *  - canonical + hreflang alternates
 *  - GEO meta tags (geo.region, geo.placename, geo.position, ICBM)
 *  - One or many JSON-LD schema nodes (AI citability)
 *
 * Pattern note: the hook accepts `schema` (single object) OR `schemas`
 * (array) so existing callsites keep working while new pages can emit
 * multiple schemas at once (FAQPage + Article + Breadcrumb).
 */
const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  alternates = [], // [{ hreflang: 'en', href: '...' }]
  schema = null,   // single JSON-LD object (legacy)
  schemas = null,  // array of JSON-LD objects (preferred)
  noindex = false,
  geoMeta = true,  // inject geo.* meta tags from geoConfig
}) => {
  useEffect(() => {
    // 1. Title
    if (title) {
      const fullTitle = title.includes('|') ? title : `${title} | BC Creative Agency`;
      document.title = fullTitle;
    }

    // Helper: set or create meta tag
    const setMeta = (selector, attr, value) => {
      if (!value) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrValue] = attr.split('=');
        el.setAttribute(attrName, attrValue.replace(/"/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    // Helper: set or create link tag
    const setLink = (selector, rel, href, extraAttrs = {}) => {
      if (!href) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
      Object.keys(extraAttrs).forEach(key => el.setAttribute(key, extraAttrs[key]));
    };

    // 2. Meta Tags
    setMeta('meta[name="description"]', 'name=description', description);
    setMeta('meta[name="keywords"]', 'name=keywords', keywords);
    setMeta('meta[name="robots"]', 'name=robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    // 3. Open Graph
    setMeta('meta[property="og:type"]', 'property=og:type', ogType);
    setMeta('meta[property="og:title"]', 'property=og:title', ogTitle || title);
    setMeta('meta[property="og:description"]', 'property=og:description', ogDescription || description);
    setMeta('meta[property="og:url"]', 'property=og:url', ogUrl || window.location.href);
    setMeta('meta[property="og:image"]', 'property=og:image', ogImage || 'https://bccreative.agency/logo-icon.png');

    // 4. Twitter
    setMeta('meta[name="twitter:card"]', 'name=twitter:card', twitterCard);
    setMeta('meta[name="twitter:title"]', 'name=twitter:title', ogTitle || title);
    setMeta('meta[name="twitter:description"]', 'name=twitter:description', ogDescription || description);
    setMeta('meta[name="twitter:image"]', 'name=twitter:image', ogImage || 'https://bccreative.agency/logo-icon.png');

    // 5. Canonical & Alternates
    setLink('link[rel="canonical"]', 'canonical', canonical || window.location.href);

    // Cleanup old alternates
    document.querySelectorAll('link[hreflang]').forEach(el => el.remove());
    alternates.forEach(alt => {
      setLink(`link[hreflang="${alt.hreflang}"]`, 'alternate', alt.href, { hreflang: alt.hreflang });
    });

    // 6. GEO meta tags (page-level, inherited from central geoConfig)
    if (geoMeta) {
      setMeta('meta[name="geo.region"]', 'name=geo.region', GEO.region);
      setMeta('meta[name="geo.placename"]', 'name=geo.placename', GEO.placename);
      setMeta('meta[name="geo.position"]', 'name=geo.position', `${GEO.latitude};${GEO.longitude}`);
      setMeta('meta[name="ICBM"]', 'name=ICBM', GEO.icbm);
    }

    // 7. JSON-LD Schemas — supports both legacy single and multi-node arrays
    document.querySelectorAll('script[data-seo-jsonld="true"]').forEach(el => el.remove());

    const schemaList = [];
    if (Array.isArray(schemas)) schemaList.push(...schemas.filter(Boolean));
    if (schema) schemaList.push(schema);

    schemaList.forEach((node, idx) => {
      const scriptEl = document.createElement('script');
      scriptEl.type = 'application/ld+json';
      scriptEl.dataset.seoJsonld = 'true';
      scriptEl.dataset.seoJsonldIndex = String(idx);
      scriptEl.text = JSON.stringify(node);
      document.head.appendChild(scriptEl);
    });

  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogUrl, ogImage, ogType, twitterCard, alternates, schema, schemas, noindex, geoMeta]);
};

export default useSEO;
