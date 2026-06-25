/**
 * GEO (Generative Engine Optimization) & Organization Config
 *
 * Central source-of-truth for all NAP (Name / Address / Phone), brand,
 * citation and geo metadata used by JSON-LD schema builders, meta tags,
 * llms.txt and any AI-facing surface.
 *
 * Inspired by the patterns used in zubair-trabzada/geo-seo-claude where
 * every schema derives from one canonical brand profile, so that ChatGPT,
 * Claude, Perplexity, Gemini and Google AI Overviews receive consistent,
 * high-confidence signals about the business.
 *
 * NOTE: per CORE_ARCHITECTURE.md no hardcoding – update this file if
 * organization data changes, not individual components.
 */

export const BRAND = Object.freeze({
  name: 'BC Creative Agency',
  legalName: 'BC Creative Agency',
  alternateName: 'BC Creative Agency KKTC',
  foundingDate: '2017',
  url: 'https://bccreative.agency',
  logo: 'https://bccreative.agency/logo-icon.png',
  image: 'https://bccreative.agency/logo-icon.png',
  priceRange: '$$',
  currenciesAccepted: 'TRY, EUR, USD, GBP',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
});

export const CONTACT = Object.freeze({
  telephone: '+905488755461',
  whatsapp: '905488755461',
  email: 'info@bccreative.agency',
  contactType: 'customer service',
  availableLanguage: ['Turkish', 'English', 'Russian', 'Persian'],
});

export const ADDRESS = Object.freeze({
  streetAddress: 'Alsancak, Emtan West Park No:4',
  addressLocality: 'Alsancak/Girne',
  addressRegion: 'Girne',
  postalCode: '99320',
  addressCountry: 'CY',
  countryDescription: 'Kuzey Kıbrıs Türk Cumhuriyeti',
});

export const GEO = Object.freeze({
  latitude: 35.3401,
  longitude: 33.3200,
  region: 'CY-GI',
  placename: 'Girne, Kuzey Kıbrıs Türk Cumhuriyeti',
  icbm: '35.3401, 33.3200',
});

export const AREA_SERVED = Object.freeze([
  'Kuzey Kıbrıs Türk Cumhuriyeti',
  'Girne',
  'Lefkoşa',
  'Gazimağusa',
  'İskele',
  'Güzelyurt',
]);

export const OPENING_HOURS = Object.freeze([
  {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
]);

export const SOCIAL_PROFILES = Object.freeze([
  'https://www.instagram.com/bccreative.agency/',
]);

/**
 * Service catalog used by OfferCatalog schema and llms.txt.
 * Each entry is a citation-worthy "atomic fact" for AI engines.
 */
export const SERVICES = Object.freeze([
  {
    slug: 'seo',
    name: { tr: 'SEO – Arama Motoru Optimizasyonu', en: 'SEO – Search Engine Optimization' },
    description: {
      tr: "KKTC ve uluslararası pazarda Google'da üst sıralara çıkmanızı sağlayan kapsamlı SEO hizmetleri.",
      en: 'Comprehensive SEO services to rank you on Google in the TRNC and international markets.',
    },
    path: '/hizmetler/seo',
  },
  {
    slug: 'google-ads',
    name: { tr: 'Google Ads Yönetimi', en: 'Google Ads Management' },
    description: {
      tr: "KKTC'de Google reklamlarınızı profesyonelce yönetiyoruz.",
      en: 'We professionally manage your Google Ads campaigns in the TRNC.',
    },
    path: '/hizmetler/google-ads',
  },
  {
    slug: 'sosyal-medya',
    name: { tr: 'Sosyal Medya Yönetimi', en: 'Social Media Management' },
    description: {
      tr: 'Instagram, Facebook ve diğer platformlarda markanızı profesyonelce yönetiyoruz.',
      en: 'Professional brand management on Instagram, Facebook and other platforms.',
    },
    path: '/hizmetler/sosyal-medya',
  },
  {
    slug: 'web-tasarim',
    name: { tr: 'Web Tasarım', en: 'Web Design' },
    description: {
      tr: 'Modern, hızlı ve mobil uyumlu web siteleri tasarlıyoruz.',
      en: 'Modern, fast and mobile-friendly websites.',
    },
    path: '/hizmetler/web-tasarim',
  },
  {
    slug: 'produksiyon',
    name: { tr: 'Prodüksiyon', en: 'Production' },
    description: {
      tr: 'Profesyonel video prodüksiyon ve içerik üretimi.',
      en: 'Professional video production and content creation.',
    },
    path: '/hizmetler/produksiyon',
  },
  {
    slug: 'drone-cekim',
    name: { tr: 'Drone Çekim', en: 'Drone Filming' },
    description: {
      tr: 'Havadan profesyonel drone çekim hizmetleri.',
      en: 'Professional aerial drone filming services.',
    },
    path: '/hizmetler/drone-cekim',
  },
  {
    slug: 'fotograf-video',
    name: { tr: 'Fotoğraf & Video', en: 'Photography & Video' },
    description: {
      tr: 'Ürün, etkinlik ve kurumsal fotoğraf-video çekimleri.',
      en: 'Product, event and corporate photography and video shoots.',
    },
    path: '/hizmetler/fotograf-video',
  },
]);

/**
 * GEO signals for AI engines (Generative Engine Optimization).
 * Used to build llms.txt and the E-E-A-T section of the Organization schema.
 */
export const GEO_SIGNALS = Object.freeze({
  expertise: [
    'Local SEO for Northern Cyprus (TRNC)',
    'Google Ads management',
    'Social media strategy (Instagram, Facebook, TikTok)',
    'Web design and development',
    'Drone & aerial video production',
  ],
  primaryMarket: 'Kuzey Kıbrıs Türk Cumhuriyeti (Northern Cyprus / TRNC)',
  languages: ['tr-TR', 'en-GB', 'ru-RU', 'fa-IR'],
  yearsOfExperience: new Date().getFullYear() - 2017,
});
