import React from 'react';
import useSEO from '../../hooks/useSEO';
import ServicePageLayout from './ServicePageLayout';
import { useLanguage } from '../../context/LanguageContext';
import { buildServiceSchema, buildFAQSchema, buildBreadcrumbSchema, buildOrganizationSchema } from '../../lib/geoSchemas';

/** Yeni hizmet sayfaları için ortak kurgu: SEO + şema + breadcrumb + şablon. */
export default function makeServicePage({ path, name, seo, serviceType, tr, en, heroImage }) {
  return function ServicePage() {
    const { lang } = useLanguage();
    const isTr = lang === 'tr';
    const c = isTr ? tr : en;
    const url = `https://bccreative.agency${path}`;
    const n = isTr ? name.tr : name.en;
    useSEO({
      title: isTr ? seo.titleTr : seo.titleEn,
      description: c.description,
      keywords: seo.keywords,
      canonical: url,
      schemas: [
        buildServiceSchema({ name: n, description: c.description, url, serviceType }),
        buildFAQSchema(c.faqs),
        buildBreadcrumbSchema([
          { name: isTr ? 'Ana Sayfa' : 'Home', url: 'https://bccreative.agency/' },
          { name: n, url },
        ]),
        buildOrganizationSchema(),
      ],
    });
    const breadcrumbs = [{ name: isTr ? 'Ana Sayfa' : 'Home', url: '/' }, { name: n, url: path }];
    return <ServicePageLayout {...c} breadcrumbs={breadcrumbs} heroImage={heroImage} />;
  };
}
