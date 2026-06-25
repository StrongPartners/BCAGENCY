import React from 'react';
import { Film, Building2, Video, Scissors } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import ServicePageLayout from './shared/ServicePageLayout';
import { useLanguage } from '../context/LanguageContext';
import {
    buildServiceSchema,
    buildFAQSchema,
    buildBreadcrumbSchema,
    buildOrganizationSchema,
} from '../lib/geoSchemas';

const Produksiyon = () => {
    const { lang } = useLanguage();
    const isTr = lang === 'tr';

    const content = isTr ? {
        eyebrow: 'Prodüksiyon · Reklam filmi & kurumsal video',
        headline: 'Senaryodan',
        headlineAccent: 'yayına',
        headlineRest: 'kadar yanınızdayız.',
        subheadline: 'Reklam filmi, kurumsal tanıtım, sosyal medya videoları.',
        description: "Fikir aşamasından post prodüksiyona kadar tüm süreci biz yönetiyoruz. Senaryo yazımı, storyboard, çekim, kurgu, renk, ses — hepsi tek ekipten.",
        features: [
            { icon: Film, title: 'Reklam filmi', desc: 'Marka hikayenizi anlatan kısa, etkili reklam filmleri. 30–60 saniye TV & dijital.', tone: 'brand' },
            { icon: Building2, title: 'Kurumsal video', desc: 'Şirket tanıtımı, röportaj, süreç anlatımı, iç iletişim videoları.', tone: 'coral' },
            { icon: Video, title: 'Sosyal medya videoları', desc: 'Reels, TikTok, YouTube Shorts — her platform i��in özelleştirilmiş içerik.', tone: 'mint' },
            { icon: Scissors, title: 'Post prodüksiyon', desc: 'Kurgu, renk düzenleme, ses tasarımı, motion graphics — hepsi bir arada.', tone: 'sun' },
        ],
        stats: [
            { value: '4K', label: 'Çekim kalitesi' },
            { value: '7–14 gün', label: 'Teslim süresi' },
            { value: '3+', label: 'Kamera ekipmanı' },
            { value: '∞', label: 'Revizyon anlayışı' },
        ],
        steps: [
            { step: '01', title: 'Brief & senaryo', desc: 'Hedefi dinliyor, senaryoyu birlikte yazıyoruz.' },
            { step: '02', title: 'Storyboard', desc: 'Sahne sahne görsel plan, çekim öncesi onay.' },
            { step: '03', title: 'Çekim', desc: 'Profesyonel ekip, 4K kamera, ışık, ses.' },
            { step: '04', title: 'Post prodüksiyon', desc: 'Kurgu, renk, ses, grafik — son ürün teslim.' },
        ],
        faqs: [
            { question: 'Ne tür videolar çekiyorsunuz?', answer: "Reklam filmi, kurumsal tanıtım, ürün videosu, röportaj, etkinlik kaydı, sosyal medya kısa videoları, eğitim videoları — geniş yelpaze." },
            { question: 'Çekim süresi ne kadar?', answer: "Proje kapsamına göre değişir. Basit bir ürün videosu 1 gün, kurumsal tanıtım 2–3 gün, reklam filmi 3–5 gün sürer. Teslim süresi çekimden 1–2 hafta sonra." },
            { question: 'Oyuncu / figüran temin ediyor musunuz?', answer: "Evet. KKTC'de geniş bir oyuncu ve figüran ağımız var. Gerekirse seçme (casting) süreci de dahil." },
            { question: 'Drone çekim dahil mi?', answer: "Evet, paketlerimizde drone çekim opsiyonu mevcut. Ayrıca drone çekim tek başına da alınabilir." },
        ],
        ctaTitle: 'Hikayenizi birlikte anlatalım.',
        ctaSub: "Reklam filmi, kurumsal video, sosyal medya içeriği — ne ihtiyacınız varsa.",
    } : {
        eyebrow: 'Production · Ad films & corporate video',
        headline: 'From script',
        headlineAccent: 'to screen,',
        headlineRest: "we've got you.",
        subheadline: 'Ad films, corporate videos, social media content.',
        description: "We manage the entire process from concept to post-production. Script writing, storyboard, shooting, edit, color, sound — all from one team.",
        features: [
            { icon: Film, title: 'Ad films', desc: 'Short, powerful brand films that tell your story. 30–60 seconds for TV & digital.', tone: 'brand' },
            { icon: Building2, title: 'Corporate video', desc: 'Company intros, interviews, process explainers, internal comms.', tone: 'coral' },
            { icon: Video, title: 'Social media video', desc: 'Reels, TikTok, YouTube Shorts — tailored per platform.', tone: 'mint' },
            { icon: Scissors, title: 'Post production', desc: 'Edit, color, sound design, motion graphics — all in one house.', tone: 'sun' },
        ],
        stats: [
            { value: '4K', label: 'Shooting quality' },
            { value: '7–14 days', label: 'Delivery time' },
            { value: '3+', label: 'Camera setups' },
            { value: '∞', label: 'Revisions' },
        ],
        steps: [
            { step: '01', title: 'Brief & script', desc: 'We listen to the goal and co-write the script.' },
            { step: '02', title: 'Storyboard', desc: 'Scene-by-scene visual plan, pre-shoot approval.' },
            { step: '03', title: 'Shoot', desc: 'Professional crew, 4K cameras, lighting, sound.' },
            { step: '04', title: 'Post', desc: 'Edit, color, sound, graphics — final delivery.' },
        ],
        faqs: [
            { question: 'What kinds of videos do you shoot?', answer: "Ad films, corporate intros, product videos, interviews, event coverage, social media shorts, training videos — wide range." },
            { question: 'How long does shooting take?', answer: "Depends on scope. Simple product video is 1 day, corporate intro 2–3 days, ad film 3–5 days. Delivery is 1–2 weeks after shoot." },
            { question: 'Do you provide actors / extras?', answer: "Yes. We have an extensive network of actors and extras in Northern Cyprus. Casting is included if needed." },
            { question: 'Is drone footage included?', answer: "Yes, our packages include drone footage as an option. Drone filming can also be booked standalone." },
        ],
        ctaTitle: "Let's tell your story together.",
        ctaSub: 'Ad film, corporate video, social content — whatever you need.',
    };

    const serviceUrl = 'https://bccreative.agency/hizmetler/produksiyon';
    useSEO({
        title: isTr ? 'KKTC Prodüksiyon | Reklam Filmi & Kurumsal Video' : 'TRNC Production | Ad Films & Corporate Video',
        description: isTr ? "KKTC'de profesyonel video prodüksiyon ve reklam filmi çekimi." : 'Professional video production and ad films in Northern Cyprus.',
        keywords: 'KKTC prodüksiyon, Girne reklam filmi, KKTC video çekim, kurumsal video KKTC',
        canonical: serviceUrl,
        alternates: [
            { hreflang: 'tr', href: serviceUrl },
            { hreflang: 'en', href: 'https://bccreative.agency/en/hizmetler/produksiyon' },
        ],
        schemas: [
            buildServiceSchema({ name: isTr ? 'Video Prodüksiyon' : 'Video Production', description: content.description, url: serviceUrl, serviceType: 'VideoProduction' }),
            buildFAQSchema(content.faqs),
            buildBreadcrumbSchema([
                { name: isTr ? 'Ana Sayfa' : 'Home', url: 'https://bccreative.agency/' },
                { name: isTr ? 'Hizmetler' : 'Services', url: 'https://bccreative.agency/' },
                { name: isTr ? 'Prodüksiyon' : 'Production', url: serviceUrl },
            ]),
            buildOrganizationSchema(),
        ],
    });

    const breadcrumbs = [
        { name: isTr ? 'Ana Sayfa' : 'Home', url: '/' },
        { name: isTr ? 'Hizmetler' : 'Services', url: '/hizmetler/produksiyon' },
        { name: isTr ? 'Prodüksiyon' : 'Production', url: '/hizmetler/produksiyon' },
    ];

    return <ServicePageLayout {...content} tone="coral" breadcrumbs={breadcrumbs} />;
};

export default Produksiyon;
