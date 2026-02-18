import { useEffect } from 'react';

const useSEO = ({ title, description, keywords, canonical, ogTitle, ogDescription, ogUrl }) => {
  useEffect(() => {
    // Title
    if (title) document.title = title;

    // Helper: set or create meta tag
    const setMeta = (selector, attr, value) => {
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
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    if (description) setMeta('meta[name="description"]', 'name=description', description);
    if (keywords) setMeta('meta[name="keywords"]', 'name=keywords', keywords);
    if (canonical) setLink('canonical', canonical);
    if (ogTitle) setMeta('meta[property="og:title"]', 'property=og:title', ogTitle);
    if (ogDescription) setMeta('meta[property="og:description"]', 'property=og:description', ogDescription);
    if (ogUrl) setMeta('meta[property="og:url"]', 'property=og:url', ogUrl);
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogUrl]);
};

export default useSEO;
