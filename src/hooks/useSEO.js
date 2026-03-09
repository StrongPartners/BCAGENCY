import { useEffect } from 'react';

const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  twitterCard = 'summary_large_image',
  alternates = [], // [{ hreflang: 'en', href: '...' }]
  schema = null,   // JSON-LD object
  noindex = false
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

    // 6. JSON-LD Schema
    const schemaId = 'dynamic-json-ld';
    let scriptEl = document.getElementById(schemaId);
    if (scriptEl) scriptEl.remove();

    if (schema) {
      scriptEl = document.createElement('script');
      scriptEl.id = schemaId;
      scriptEl.type = 'application/ld+json';
      scriptEl.text = JSON.stringify(schema);
      document.head.appendChild(scriptEl);
    }

  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogUrl, ogImage, twitterCard, alternates, schema, noindex]);
};

export default useSEO;
