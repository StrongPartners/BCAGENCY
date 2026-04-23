/**
 * JSON-LD Schema Builders (Generative Engine Optimization)
 *
 * Produces structured data that is optimized for both traditional search
 * engines (Google, Bing) and generative AI engines (ChatGPT, Claude,
 * Perplexity, Gemini, Google AI Overviews).
 *
 * Patterns inspired by zubair-trabzada/geo-seo-claude's schema templates:
 *   - Organization / LocalBusiness
 *   - WebSite
 *   - Article
 *   - FAQPage
 *   - HowTo
 *   - Service
 *   - BreadcrumbList
 *   - SoftwareApplication (not used here but available on request)
 *
 * Every builder is a pure function that takes explicit inputs so it can be
 * unit-tested and consumed from any layer (no DOM, no React).
 */

import {
  BRAND,
  CONTACT,
  ADDRESS,
  GEO,
  AREA_SERVED,
  OPENING_HOURS,
  SOCIAL_PROFILES,
  SERVICES,
} from './geoConfig';

const CONTEXT = 'https://schema.org';
const ORG_ID = `${BRAND.url}/#organization`;
const WEBSITE_ID = `${BRAND.url}/#website`;

/**
 * Core Organization + LocalBusiness + MarketingAgency node.
 * Acts as the canonical @id referenced by every other schema.
 */
export const buildOrganizationSchema = () => ({
  '@context': CONTEXT,
  '@type': ['MarketingAgency', 'LocalBusiness', 'Organization'],
  '@id': ORG_ID,
  name: BRAND.name,
  alternateName: BRAND.alternateName,
  legalName: BRAND.legalName,
  url: BRAND.url,
  logo: BRAND.logo,
  image: BRAND.image,
  foundingDate: BRAND.foundingDate,
  description:
    "Kuzey Kıbrıs Türk Cumhuriyeti'nde hizmet veren profesyonel dijital pazarlama ajansı. SEO, Google Ads, sosyal medya, web tasarım ve prodüksiyon.",
  telephone: CONTACT.telephone,
  email: CONTACT.email,
  priceRange: BRAND.priceRange,
  currenciesAccepted: BRAND.currenciesAccepted,
  paymentAccepted: BRAND.paymentAccepted,
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS.streetAddress,
    addressLocality: ADDRESS.addressLocality,
    addressRegion: ADDRESS.addressRegion,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  },
  areaServed: AREA_SERVED.map((name) => ({ '@type': 'Place', name })),
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONTACT.telephone,
    email: CONTACT.email,
    contactType: CONTACT.contactType,
    availableLanguage: CONTACT.availableLanguage,
  },
  sameAs: [...SOCIAL_PROFILES],
  openingHoursSpecification: OPENING_HOURS.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.dayOfWeek,
    opens: h.opens,
    closes: h.closes,
  })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Dijital Pazarlama Hizmetleri',
    itemListElement: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.name.tr,
        description: s.description.tr,
        url: `${BRAND.url}${s.path}`,
      },
    })),
  },
});

/**
 * WebSite node with sitelink search box support.
 */
export const buildWebSiteSchema = () => ({
  '@context': CONTEXT,
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: BRAND.name,
  url: `${BRAND.url}/`,
  description: 'KKTC Girne merkezli dijital pazarlama ajansı',
  inLanguage: 'tr-TR',
  publisher: { '@id': ORG_ID },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BRAND.url}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

/**
 * Build a Service schema for a specific service page.
 *
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.description
 * @param {string} params.url  Absolute URL of the service page.
 * @param {string} [params.serviceType]
 */
export const buildServiceSchema = ({ name, description, url, serviceType }) => ({
  '@context': CONTEXT,
  '@type': 'Service',
  name,
  description,
  url,
  serviceType: serviceType || name,
  provider: { '@id': ORG_ID },
  areaServed: AREA_SERVED.map((n) => ({ '@type': 'Place', name: n })),
});

/**
 * Build an Article / BlogPosting schema for a blog post.
 * GEO-friendly: exposes author, publisher, dates and word count so that
 * LLM crawlers can cite the content with high confidence.
 *
 * @param {Object} post
 * @param {string} post.headline
 * @param {string} post.description
 * @param {string} post.image
 * @param {string} post.url
 * @param {string} post.datePublished  ISO date string.
 * @param {string} [post.dateModified]
 * @param {string} [post.authorName]
 * @param {string} [post.articleBody]
 * @param {string[]} [post.keywords]
 */
export const buildArticleSchema = ({
  headline,
  description,
  image,
  url,
  datePublished,
  dateModified,
  authorName = BRAND.name,
  articleBody,
  keywords = [],
}) => {
  const schema = {
    '@context': CONTEXT,
    '@type': 'BlogPosting',
    headline,
    description,
    image,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished,
    dateModified: dateModified || datePublished,
    author: { '@type': 'Organization', name: BRAND.name, url: BRAND.url },
    publisher: { '@id': ORG_ID },
    inLanguage: 'tr-TR',
  };
  if (articleBody) {
    schema.articleBody = articleBody;
    schema.wordCount = articleBody.trim().split(/\s+/).length;
  }
  if (keywords.length > 0) schema.keywords = keywords.join(', ');
  return schema;
};

/**
 * FAQPage schema. Extremely valuable for GEO: AI engines love to lift
 * citation-worthy Q/A pairs from structured FAQ data.
 *
 * @param {Array<{question: string, answer: string}>} items
 */
export const buildFAQSchema = (items = []) => ({
  '@context': CONTEXT,
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

/**
 * HowTo schema for step-by-step guides (commonly cited by AI answer engines).
 *
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.description
 * @param {Array<{name: string, text: string}>} params.steps
 * @param {string} [params.totalTime] ISO 8601 duration (e.g. "PT30M")
 */
export const buildHowToSchema = ({ name, description, steps, totalTime }) => ({
  '@context': CONTEXT,
  '@type': 'HowTo',
  name,
  description,
  ...(totalTime ? { totalTime } : {}),
  step: steps.map((step, idx) => ({
    '@type': 'HowToStep',
    position: idx + 1,
    name: step.name,
    text: step.text,
  })),
});

/**
 * BreadcrumbList helper.
 *
 * @param {Array<{name: string, url: string}>} items
 */
export const buildBreadcrumbSchema = (items = []) => ({
  '@context': CONTEXT,
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: item.url,
  })),
});

/**
 * Convenience: wrap any set of schemas in a graph node.
 * Useful when a single page exposes multiple related entities at once.
 */
export const buildGraph = (...nodes) => ({
  '@context': CONTEXT,
  '@graph': nodes.filter(Boolean).map((n) => {
    const copy = { ...n };
    delete copy['@context'];
    return copy;
  }),
});
