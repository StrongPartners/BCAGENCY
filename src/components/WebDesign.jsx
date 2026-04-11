import React from 'react';
import useSEO from '../hooks/useSEO';
import ServicePageLayout from './shared/ServicePageLayout';
import { useLanguage } from '../context/LanguageContext';
import {
    buildServiceSchema,
    buildFAQSchema,
    buildBreadcrumbSchema,
    buildOrganizationSchema,
} from '../lib/geoSchemas';

const WebDesign = () => {
    const { lang } = useLanguage();
    const isTr = lang === 'tr';

    const content = isTr ? {
        eyebrow: 'Web Tasarım · Hızlı & modern',
        headline: 'Siteniz,',
        headlineAccent: '7/24 çalışan',
        headlineRest: 'bir satış elemanı.',
        subheadline: 'Hızlı, modern, mobil uyumlu, SEO ile doğan web siteleri.',
        description: "Sadece güzel görünsün diye site yapmıyoruz. Dönüşüm odaklı, Google dostu, 2 saniyenin altında açılan siteler kuruyoruz. React + Vite + Tailwind ile.",
        features: [
            { icon: '⚡', title: 'Işık hızı', desc: 'Core Web Vitals 90+ skor. Google sevdiği kadar müşteri de sever. 2 saniyenin altında açılma hedefi.', tone: 'brand' },
            { icon: '📱', title: 'Mobil önce', desc: 'Önce mobil tasarlıyoruz. Çünkü kullanıcılarınızın %75\'i telefondan girer.', tone: 'coral' },
            { icon: '🔍', title: 'SEO ile doğar', desc: 'Meta tag, schema, sitemap, canonical — hepsi ilk günden hazır. Sonradan eklenmez.', tone: 'mint' },
            { icon: '🎨', title: 'Markanıza özel', desc: 'Hazır temalar yok. Her site sıfırdan, markanıza özel tasarlanır.', tone: 'sun' },
        ],
        stats: [
            { value: '2–4 hafta', label: 'Teslim süresi' },
            { value: '90+', label: 'Core Web Vitals' },
            { value: '< 2s', label: 'Açılma süresi' },
            { value: '100%', label: 'Mobil uyumlu' },
        ],
        steps: [
            { step: '01', title: 'Keşif & wireframe', desc: 'Markanızı dinliyor, sayfa yapısını çiziyoruz.' },
            { step: '02', title: 'Tasarım', desc: 'Figma üzerinde prototip, onay sürecinden sonra geliştirme.' },
            { step: '03', title: 'Geliştirme', desc: 'React + Vite + Tailwind ile hızlı, ölçeklenebilir kodlama.' },
            { step: '04', title: 'Yayın & bakım', desc: 'Domain, hosting, SSL, analytics — hepsi halledilir.' },
        ],
        faqs: [
            { question: 'Web sitesi ne kadar sürer?', answer: "Kurumsal siteler genellikle 2–4 hafta içinde teslim edilir. Kapsam arttıkça süre uzar. Projenin başında net takvim veriyoruz." },
            { question: 'Fiyatlar nasıl belirleniyor?', answer: "Sayfa sayısı, e-ticaret özelliği, özel entegrasyonlar ve içerik miktarı fiyatı belirler. Tek seferlik paket olarak sunuluyor. WhatsApp: +90 548 875 54 61." },
            { question: 'E-ticaret de yapıyor musunuz?', answer: "Evet. Ürün yönetimi, ödeme entegrasyonu (iyzico, stripe), kargo takibi — hepsi dahil. Shopify ya da custom React çözümler sunuyoruz." },
            { question: 'Site sonrası destek var mı?', answer: "Aylık bakım paketleri sunuyoruz: güncelleme, yedekleme, performans takibi, yeni içerik ekleme. Opsiyonel." },
        ],
        ctaTitle: 'Yeni bir siteye hazır mısınız?',
        ctaSub: "Ücretsiz keşif görüşmesi için yazın.",
    } : {
        eyebrow: 'Web Design · Fast & modern',
        headline: 'Your site,',
        headlineAccent: 'a 24/7',
        headlineRest: 'sales rep.',
        subheadline: 'Fast, modern, mobile-friendly websites born with SEO baked in.',
        description: "We don't build sites just to look pretty. Conversion-focused, Google-friendly sites that load in under 2 seconds. React + Vite + Tailwind.",
        features: [
            { icon: '⚡', title: 'Lightning fast', desc: 'Core Web Vitals 90+ score. What Google loves, customers love. Sub-2s load target.', tone: 'brand' },
            { icon: '📱', title: 'Mobile first', desc: 'We design for mobile first. Because 75% of your users come from phones.', tone: 'coral' },
            { icon: '🔍', title: 'Born with SEO', desc: 'Meta tags, schema, sitemap, canonical — all ready from day one. Not bolted on later.', tone: 'mint' },
            { icon: '🎨', title: 'Custom to your brand', desc: 'No stock themes. Every site is built from scratch, custom to your brand.', tone: 'sun' },
        ],
        stats: [
            { value: '2–4 weeks', label: 'Delivery time' },
            { value: '90+', label: 'Core Web Vitals' },
            { value: '< 2s', label: 'Load time' },
            { value: '100%', label: 'Mobile ready' },
        ],
        steps: [
            { step: '01', title: 'Discovery & wireframe', desc: 'We listen to your brand, sketch the page structure.' },
            { step: '02', title: 'Design', desc: 'Figma prototype, then development after approval.' },
            { step: '03', title: 'Development', desc: 'React + Vite + Tailwind for fast, scalable code.' },
            { step: '04', title: 'Launch & maintenance', desc: 'Domain, hosting, SSL, analytics — all sorted.' },
        ],
        faqs: [
            { question: 'How long does a website take?', answer: "Corporate sites are typically delivered in 2–4 weeks. Larger scopes take longer. We give a clear timeline at project start." },
            { question: 'How is pricing determined?', answer: "Page count, e-commerce features, custom integrations and content volume determine pricing. Offered as a one-time package." },
            { question: 'Do you build e-commerce?', answer: "Yes. Product management, payment integration (Stripe, iyzico), shipping — all included. Shopify or custom React solutions." },
            { question: 'Is there post-launch support?', answer: "We offer monthly maintenance packages: updates, backups, performance monitoring, content additions. Optional." },
        ],
        ctaTitle: 'Ready for a new website?',
        ctaSub: "Message us for a free discovery call.",
    };

    const serviceUrl = 'https://bccreative.agency/hizmetler/web-tasarim';
    useSEO({
        title: isTr ? 'KKTC Web Tasarım | Hızlı ve Modern Web Siteleri' : 'TRNC Web Design | Fast and Modern Websites',
        description: isTr ? "KKTC'de profesyonel web tasarım. Hızlı, modern, SEO dostu siteler." : 'Professional web design in TRNC. Fast, modern, SEO-friendly sites.',
        keywords: 'KKTC web tasarım, Girne web tasarım, KKTC e-ticaret, KKTC web geliştirme',
        canonical: serviceUrl,
        alternates: [
            { hreflang: 'tr', href: serviceUrl },
            { hreflang: 'en', href: 'https://bccreative.agency/en/hizmetler/web-tasarim' },
        ],
        schemas: [
            buildServiceSchema({ name: isTr ? 'Web Tasarım' : 'Web Design', description: content.description, url: serviceUrl, serviceType: 'WebDesign' }),
            buildFAQSchema(content.faqs),
            buildBreadcrumbSchema([
                { name: isTr ? 'Ana Sayfa' : 'Home', url: 'https://bccreative.agency/' },
                { name: isTr ? 'Hizmetler' : 'Services', url: 'https://bccreative.agency/' },
                { name: isTr ? 'Web Tasarım' : 'Web Design', url: serviceUrl },
            ]),
            buildOrganizationSchema(),
        ],
    });

    return <ServicePageLayout {...content} heroEmoji="💻" tone="sun" />;
};

export default WebDesign;
