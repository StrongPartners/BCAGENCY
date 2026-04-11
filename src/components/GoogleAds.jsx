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

const GoogleAds = () => {
    const { lang } = useLanguage();
    const isTr = lang === 'tr';

    const content = isTr ? {
        eyebrow: 'Google Ads · Performans pazarlaması',
        headline: 'Reklam bütçeniz,',
        headlineAccent: 'satışa',
        headlineRest: 'dönüşsün.',
        subheadline: 'Doğru kitle, doğru zaman, en düşük maliyet.',
        description: "Her kuruşun hesabını veriyoruz. Google Arama, Görüntülü Reklam, YouTube ve Performance Max kampanyalarıyla markanızı karlı bir büyüme yolculuğuna çıkarıyoruz.",
        features: [
            { icon: '🎯', title: 'Hassas hedefleme', desc: 'Tam da sizin verdiğiniz hizmeti arayan kişileri nokta atışı hedefliyoruz. Anlık satın alma niyeti.', tone: 'brand' },
            { icon: '💸', title: 'Bütçe verimliliği', desc: 'Negatif kelime takibi ve sürekli teklif optimizasyonu ile tıklama başına maliyeti düşürüyoruz.', tone: 'coral' },
            { icon: '📺', title: 'YouTube & Display', desc: 'Arama dışı: YouTube reklamları, haber sitelerinde görüntülü reklam, yeniden pazarlama kampanyaları.', tone: 'mint' },
            { icon: '📊', title: 'Şeffaf raporlama', desc: "Her ay nereye harcadık, ne kazandık — detaylı ve anlaşılır raporlar. Sürpriz yok.", tone: 'sun' },
        ],
        stats: [
            { value: '10x+', label: 'Ortalama ciro artışı' },
            { value: '-35%', label: 'Düşen tık maliyeti' },
            { value: '24h', label: 'Kampanya kurulum' },
            { value: '7/24', label: 'İzleme & optimize' },
        ],
        steps: [
            { step: '01', title: 'Pazar araştırması', desc: 'Rakip harcaması, anahtar kelime analizi ve benchmark.' },
            { step: '02', title: 'Kampanya kurulumu', desc: 'Yüksek dönüşüm metni ve kitle ayarlarıyla hesabınızı hazırlıyoruz.' },
            { step: '03', title: 'Sürekli optimizasyon', desc: 'Verileri günlük takip, en iyi performans verenleri öne çıkarma.' },
            { step: '04', title: 'Ölçeklendirme', desc: 'Karlı kampanyaların bütçesini artırıyor, büyümeyi hızlandırıyoruz.' },
        ],
        faqs: [
            { question: 'Minimum ne kadar bütçe ile başlayabilirim?', answer: "Günlük 50–100 TL gibi düşük bütçelerle başlanabilir. Ama ölçülebilir sonuçlar için aylık 1.500–3.000 TL reklam bütçesi öneriyoruz. Ajans yönetim ücreti bu bütçenin dışındadır." },
            { question: 'İlk ayda sonuç alır mıyım?', answer: "Google Ads hızlı sonuç veren bir kanal. Kampanya yayına girdiği gün ilk tıklamalar gelmeye başlar. İlk 2 hafta optimizasyon + stabilizasyon, sonra stabil performans." },
            { question: 'Hangi sektörlerde deneyiminiz var?', answer: "Turizm, emlak, restoran, eğitim, sağlık, e-ticaret, hukuk — KKTC'nin önde gelen sektörlerinde yoğun deneyimimiz var." },
            { question: 'Reklam hesabı kimin üzerine açılıyor?', answer: "Kendi Google Ads hesabınız üzerine çalışıyoruz. Hesap sizin, reklam harcamanız doğrudan Google'a gider. Biz sadece yönetim ücreti alıyoruz — tam şeffaflık." },
        ],
        ctaTitle: 'Reklam bütçeniz işine yarasın mı?',
        ctaSub: 'Ücretsiz kampanya analizi için şimdi iletişime geçin.',
    } : {
        eyebrow: 'Google Ads · Performance marketing',
        headline: 'Turn your ad budget',
        headlineAccent: 'into sales.',
        headlineRest: '',
        subheadline: 'Right audience, right time, lowest cost.',
        description: "We account for every cent. With Google Search, Display, YouTube and Performance Max campaigns we put your brand on a profitable growth path.",
        features: [
            { icon: '🎯', title: 'Precision targeting', desc: "We pinpoint people searching specifically for your services. Pure buying intent.", tone: 'brand' },
            { icon: '💸', title: 'Budget efficiency', desc: 'Negative keyword tracking and constant bid optimization to lower cost-per-click.', tone: 'coral' },
            { icon: '📺', title: 'YouTube & Display', desc: 'Beyond search: YouTube ads, display on news sites, remarketing campaigns.', tone: 'mint' },
            { icon: '📊', title: 'Transparent reports', desc: "Every month: where did we spend, what did we earn — clear reports. No surprises.", tone: 'sun' },
        ],
        stats: [
            { value: '10x+', label: 'Avg. revenue growth' },
            { value: '-35%', label: 'Lower cost-per-click' },
            { value: '24h', label: 'Campaign setup' },
            { value: '24/7', label: 'Monitoring & tuning' },
        ],
        steps: [
            { step: '01', title: 'Market research', desc: 'Competitor spend analysis, keyword research and benchmarking.' },
            { step: '02', title: 'Campaign setup', desc: 'High-converting copy and precise audience settings.' },
            { step: '03', title: 'Constant optimization', desc: 'Daily data monitoring, doubling down on what works.' },
            { step: '04', title: 'Scaling', desc: 'Increase budgets for profitable campaigns to accelerate growth.' },
        ],
        faqs: [
            { question: "What's the minimum Google Ads budget to start?", answer: "You can start with €3–5/day. For measurable results we recommend €100–200/month in ad spend. Agency management fees are separate." },
            { question: 'Will I see results in the first month?', answer: "Google Ads is a fast channel. Clicks start the day a campaign goes live. First 2 weeks are optimization + stabilization, then stable performance." },
            { question: 'What industries do you have experience in?', answer: "Tourism, real estate, restaurants, education, healthcare, e-commerce, legal — we have deep experience in TRNC's leading sectors." },
            { question: "Whose Google Ads account is used?", answer: "We run campaigns from your own Google Ads account. The account belongs to you, your ad spend goes directly to Google. We only take a management fee — fully transparent." },
        ],
        ctaTitle: 'Ready to make your ad budget work?',
        ctaSub: 'Get in touch now for a free campaign analysis.',
    };

    const serviceUrl = 'https://bccreative.agency/hizmetler/google-ads';
    useSEO({
        title: isTr ? 'KKTC Google Ads Yönetimi | Profesyonel Reklam Ajansı' : 'TRNC Google Ads Management | Professional Ad Agency',
        description: isTr
            ? 'KKTC\'de profesyonel Google Ads yönetimi. Google reklam bütçenizi satışa dönüştürün.'
            : 'Professional Google Ads management in Northern Cyprus. Turn your ad budget into sales.',
        keywords: 'KKTC Google Ads, Kuzey Kıbrıs reklam ajansı, Girne Google reklamları, reklam yönetimi Girne',
        canonical: serviceUrl,
        alternates: [
            { hreflang: 'tr', href: serviceUrl },
            { hreflang: 'en', href: 'https://bccreative.agency/en/hizmetler/google-ads' },
        ],
        schemas: [
            buildServiceSchema({
                name: isTr ? 'Google Ads Yönetimi' : 'Google Ads Management',
                description: content.description,
                url: serviceUrl,
                serviceType: 'Advertising',
            }),
            buildFAQSchema(content.faqs),
            buildBreadcrumbSchema([
                { name: isTr ? 'Ana Sayfa' : 'Home', url: 'https://bccreative.agency/' },
                { name: isTr ? 'Hizmetler' : 'Services', url: 'https://bccreative.agency/' },
                { name: 'Google Ads', url: serviceUrl },
            ]),
            buildOrganizationSchema(),
        ],
    });

    return <ServicePageLayout {...content} heroEmoji="📣" tone="coral" />;
};

export default GoogleAds;
