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

const SEO = () => {
    const { lang } = useLanguage();
    const isTr = lang === 'tr';

    const content = isTr ? {
        eyebrow: 'SEO · Arama motoru optimizasyonu',
        headline: 'Google\'da',
        headlineAccent: 'ilk sayfa.',
        headlineRest: 'Hedef bu.',
        subheadline: 'KKTC\'ye özel SEO stratejileri.',
        description: "Siz uyurken bile müşteri getiren bir sistem kuruyoruz. Yerel SEO, teknik SEO, içerik ve link inşası — hepsi KKTC pazarı için optimize edilmiş.",
        features: [
            { icon: '', title: 'Sektörel anahtar kelimeler', desc: "KKTC emlak, Girne araba kiralama, Lefkoşa avukat gibi müşterinin tam aradığı kelimelere odaklanıyoruz.", tone: 'brand' },
            { icon: '', title: 'Sayfa hızı & teknik SEO', desc: 'Core Web Vitals skorlarınızı düzeltiyor, siteyi 2 saniyenin altına çekiyoruz. Google hızı sever.', tone: 'coral' },
            { icon: '', title: 'Yerel SEO & Haritalar', desc: 'Google Business Profile optimizasyonu, NAP tutarlılığı, yerel backlinks — harita aramalarının yıldızı sizsiniz.', tone: 'mint' },
            { icon: '', title: 'İçerik pazarlaması', desc: 'Hem kullanıcıyı hem Google\'ı ikna eden içerikler. Blog, rehber, kategori sayfaları — hepsi yazımız.', tone: 'sun' },
        ],
        stats: [
            { value: '+280%', label: 'Ortalama organik trafik' },
            { value: '90%', label: 'İlk sayfa tıklama payı' },
            { value: '4-6 ay', label: 'Kalıcı sonuç süresi' },
            { value: '7/24', label: 'Müşteri akışı' },
        ],
        steps: [
            { step: '01', title: 'Detaylı SEO analizi', desc: 'Sitenizi ve rakiplerinizi masaya yatırıyoruz.' },
            { step: '02', title: 'Anahtar kelime stratejisi', desc: 'En çok müşteri getirecek kelimelere odaklanıyoruz.' },
            { step: '03', title: 'Site içi optimizasyon', desc: 'Başlıklar, açıklamalar ve teknik altyapı Google standartlarına.' },
            { step: '04', title: 'Aylık raporlama', desc: 'Sıralama değişimlerini şeffaf raporlarla paylaşıyoruz.' },
        ],
        faqs: [
            { question: "KKTC'de SEO ne kadar sürede sonuç verir?", answer: "İlk organik trafik artışı genellikle 2–4 ay içinde görülür. Kalıcı üst sıralar için 4–6 ay sürekli çalışma gerekir. KKTC global pazara göre daha az rekabetli olduğu için doğru strateji süreci kısaltabilir." },
            { question: 'BC Creative Agency hangi SEO hizmetlerini sunuyor?', answer: 'Sektörel anahtar kelime stratejisi, teknik SEO (Core Web Vitals, sayfa hızı), yerel SEO + Google Business Profile optimizasyonu, içerik pazarlaması, backlink kazanımı ve aylık performans raporlaması.' },
            { question: 'SEO fiyatları nasıl belirleniyor?', answer: "Fiyatlar rakip yoğunluğu, hedef anahtar kelime sayısı ve sitenin mevcut durumuna göre değişir. Ücretsiz SEO analizi sonrası size özel bir teklif sunuyoruz. WhatsApp: +90 548 875 54 61." },
            { question: 'Yerel SEO ile klasik SEO\'nun farkı nedir?', answer: "Yerel SEO, belirli bir şehir/bölge için arama yapan kullanıcılara odaklanır. KKTC için kritik çünkü müşteriler 'Girne emlak', 'Lefkoşa avukat' gibi yerel sorgular kullanır. Klasik SEO daha genel arama trafiği hedefler." },
        ],
        ctaTitle: 'Google zirvesine hazır mısınız?',
        ctaSub: "Ücretsiz site analizi ve KKTC'nin en etkili SEO stratejileriyle tanışın.",
    } : {
        eyebrow: 'SEO · Search engine optimization',
        headline: 'Google\'s',
        headlineAccent: 'first page.',
        headlineRest: 'That\'s the goal.',
        subheadline: 'SEO strategies tailored for the TRNC market.',
        description: "We build a system that brings customers even while you sleep. Local SEO, technical SEO, content and link building — all optimized for the Northern Cyprus market.",
        features: [
            { icon: '', title: 'Niche keyword strategy', desc: "We target exactly what your customers search for: 'TRNC real estate', 'Kyrenia car hire', 'Nicosia lawyer'.", tone: 'brand' },
            { icon: '', title: 'Speed & technical SEO', desc: 'We fix Core Web Vitals and get the site under 2 seconds. Google loves speed.', tone: 'coral' },
            { icon: '', title: 'Local SEO & Maps', desc: 'Google Business Profile optimization, NAP consistency, local backlinks — you rule the map pack.', tone: 'mint' },
            { icon: '', title: 'Content marketing', desc: "Content that convinces both users and Google. Blogs, guides, category pages — all written in-house.", tone: 'sun' },
        ],
        stats: [
            { value: '+280%', label: 'Avg. organic traffic' },
            { value: '90%', label: 'First-page click share' },
            { value: '4-6 mo', label: 'Time to lasting results' },
            { value: '24/7', label: 'Customer flow' },
        ],
        steps: [
            { step: '01', title: 'Full SEO audit', desc: 'We break down your site and your competitors.' },
            { step: '02', title: 'Keyword strategy', desc: 'We focus on keywords that bring the most customers.' },
            { step: '03', title: 'On-page optimization', desc: 'Titles, descriptions and technical setup to Google standards.' },
            { step: '04', title: 'Monthly reporting', desc: 'We share transparent monthly progress reports.' },
        ],
        faqs: [
            { question: 'How long does SEO take in TRNC?', answer: "First organic traffic lifts appear in 2–4 months. For sustained top rankings, 4–6 months of consistent work is needed. Since TRNC has lower competition than global markets, the right strategy can shorten this." },
            { question: 'Which SEO services does BC Creative Agency offer?', answer: 'Industry keyword strategy, technical SEO (Core Web Vitals, page speed), local SEO + Google Business Profile, content marketing, link building and monthly performance reporting.' },
            { question: 'How are SEO prices determined?', answer: "Pricing depends on competitive density, the number of target keywords and the current state of your website. We give you a custom quote after a free SEO audit. WhatsApp: +90 548 875 54 61." },
            { question: "What's the difference between local SEO and classic SEO?", answer: "Local SEO targets users searching for a specific city or region. It's critical for TRNC because customers use queries like 'Kyrenia real estate' or 'Nicosia lawyer'. Classic SEO targets broader search traffic." },
        ],
        ctaTitle: 'Ready to dominate Google?',
        ctaSub: "Get a free site audit and meet the most effective SEO strategies in TRNC.",
    };

    const serviceUrl = 'https://bccreative.agency/hizmetler/seo';

    useSEO({
        title: isTr ? 'KKTC SEO Ajansı | Kuzey Kıbrıs SEO Hizmetleri' : 'TRNC SEO Agency | North Cyprus SEO Services',
        description: isTr
            ? "KKTC odaklı profesyonel SEO hizmetleri. Google'da ilk sırada yer alarak müşterilerinizi yakalayın. Girne ve Lefkoşa dijital pazarlama ajansı."
            : 'Professional SEO services focused on Northern Cyprus. Rank first on Google and capture your customers. Kyrenia and Nicosia digital marketing agency.',
        keywords: 'KKTC SEO, Kuzey Kıbrıs SEO, Girne SEO Ajansı, KKTC dijital pazarlama, Lefkoşa reklam ajansı, SEO uzmanı KKTC',
        canonical: serviceUrl,
        alternates: [
            { hreflang: 'tr', href: serviceUrl },
            { hreflang: 'en', href: 'https://bccreative.agency/en/hizmetler/seo' },
        ],
        schemas: [
            buildServiceSchema({
                name: isTr ? 'KKTC SEO Hizmetleri' : 'TRNC SEO Services',
                description: content.description,
                url: serviceUrl,
                serviceType: 'Search Engine Optimization',
            }),
            buildFAQSchema(content.faqs),
            buildBreadcrumbSchema([
                { name: isTr ? 'Ana Sayfa' : 'Home', url: 'https://bccreative.agency/' },
                { name: isTr ? 'Hizmetler' : 'Services', url: 'https://bccreative.agency/hizmetler/seo' },
                { name: 'SEO', url: serviceUrl },
            ]),
            buildOrganizationSchema(),
        ],
    });

    return (
        <ServicePageLayout
            {...content}
            tone="brand"
        />
    );
};

export default SEO;
