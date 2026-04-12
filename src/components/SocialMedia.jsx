import React from 'react';
import { Smartphone, Palette, MessageSquare, TrendingUp } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import ServicePageLayout from './shared/ServicePageLayout';
import { useLanguage } from '../context/LanguageContext';
import {
    buildServiceSchema,
    buildFAQSchema,
    buildBreadcrumbSchema,
    buildOrganizationSchema,
} from '../lib/geoSchemas';

const SocialMedia = () => {
    const { lang } = useLanguage();
    const isTr = lang === 'tr';

    const content = isTr ? {
        eyebrow: 'Sosyal Medya · Strateji & içerik',
        headline: 'Marka sesiniz',
        headlineAccent: 'her yerde',
        headlineRest: 'aynı sıcaklıkta.',
        subheadline: 'Instagram, Facebook, TikTok — üçü bir arada.',
        description: "Sadece post atmıyoruz — strateji, içerik, grafik, video ve topluluk yönetimi tek elden. Her ay içerik takvimi + performans raporu.",
        features: [
            { icon: Smartphone, title: 'İçerik stratejisi', desc: 'Haftalık içerik takvimi, hikaye serisi, reels planı — hepsi markanızın hedefine göre.', tone: 'brand' },
            { icon: Palette, title: 'Görsel & video üretimi', desc: 'Reels, grafik, carousel, story sticker — hepsi ekibimizin elinden.', tone: 'coral' },
            { icon: MessageSquare, title: 'Topluluk yönetimi', desc: "Yorumlar, DM'ler, şikayetler — hızlı ve marka diline uygun yanıtlar.", tone: 'mint' },
            { icon: TrendingUp, title: 'Meta Ads entegrasyonu', desc: 'Sosyal medya yönetimi + Meta Ads bir arada. Organik büyüme + ücretli erişim.', tone: 'sun' },
        ],
        stats: [
            { value: '3x', label: 'Etkileşim artışı' },
            { value: '+120%', label: 'Takipçi büyümesi' },
            { value: '15 dk', label: 'Yanıt süresi' },
            { value: '20+', label: 'Aylık içerik' },
        ],
        steps: [
            { step: '01', title: 'Brand sesi tanımı', desc: 'Markanızın kim olduğunu, nasıl konuştuğunu çıkarıyoruz.' },
            { step: '02', title: 'İçerik takvimi', desc: 'Aylık takvim, hikaye planı, kampanya öncesi içerikler.' },
            { step: '03', title: 'Üretim & yayın', desc: 'Grafik, video, reels — hepsi üretiliyor ve planlanıp yayınlanıyor.' },
            { step: '04', title: 'Takip & optimize', desc: 'Her ay etkileşim, büyüme ve kampanya sonuçları raporlanıyor.' },
        ],
        faqs: [
            { question: 'Paketleriniz nelerdir?', answer: "Starter (8 post/ay), Pro (15 post + 4 reels/ay), Kurumsal (özelleştirilmiş) paketlerimiz var. Her pakete içerik üretimi, grafik, takvim ve raporlama dahil." },
            { question: 'Reklam bütçesi dahil mi?', answer: "Hayır, reklam bütçesi yönetim ücretinden ayrıdır. Önerimiz: aylık 1.500–3.000 TL ile başlamak. İlk ay ücretsiz analiz sunuyoruz." },
            { question: 'Sadece Instagram mı?', answer: "Hayır. Instagram, Facebook, TikTok, LinkedIn — iş modelinize en uygun platformları birlikte seçiyoruz. Her yerde var olmak değil, doğru yerde olmak önemli." },
            { question: 'İçeriklerin onayı nasıl?', answer: "Her ay sonunda bir sonraki ayın içerik takvimini onayınıza sunuyoruz. İstediğiniz revizyonları yapıyoruz, sonra yayına alıyoruz. Şeffaflık her zaman." },
        ],
        ctaTitle: 'Sosyal medyanız sizi yoruyor mu?',
        ctaSub: 'Bize bırakın, siz işinize odaklanın.',
    } : {
        eyebrow: 'Social Media · Strategy & content',
        headline: 'Your brand voice,',
        headlineAccent: 'consistent',
        headlineRest: 'everywhere.',
        subheadline: 'Instagram, Facebook, TikTok — all in one place.',
        description: "We don't just post — strategy, content, graphics, video and community management all handled together. Monthly content calendar + performance report.",
        features: [
            { icon: Smartphone, title: 'Content strategy', desc: 'Weekly calendar, story series, reels plan — all aligned to your brand goals.', tone: 'brand' },
            { icon: Palette, title: 'Visual & video production', desc: 'Reels, graphics, carousels, story stickers — all built in-house.', tone: 'coral' },
            { icon: MessageSquare, title: 'Community management', desc: 'Comments, DMs, complaints — fast answers in your brand voice.', tone: 'mint' },
            { icon: TrendingUp, title: 'Meta Ads integration', desc: 'Social management + Meta Ads together. Organic growth + paid reach.', tone: 'sun' },
        ],
        stats: [
            { value: '3x', label: 'Engagement boost' },
            { value: '+120%', label: 'Follower growth' },
            { value: '15 min', label: 'Response time' },
            { value: '20+', label: 'Monthly posts' },
        ],
        steps: [
            { step: '01', title: 'Brand voice audit', desc: 'We define who your brand is and how it speaks.' },
            { step: '02', title: 'Content calendar', desc: 'Monthly plan, story sequence, pre-campaign content.' },
            { step: '03', title: 'Produce & publish', desc: 'Graphics, video, reels — produced, scheduled, published.' },
            { step: '04', title: 'Track & optimize', desc: 'Engagement, growth and campaign results reported monthly.' },
        ],
        faqs: [
            { question: 'What are your packages?', answer: "We offer Starter (8 posts/mo), Pro (15 posts + 4 reels/mo) and Enterprise (custom). Every package includes content production, graphics, calendar and reporting." },
            { question: 'Is ad spend included?', answer: "No, ad spend is separate from management fees. We recommend starting at €100–200/month. First month includes a free analysis." },
            { question: 'Instagram only?', answer: "No. Instagram, Facebook, TikTok, LinkedIn — we pick the platforms that fit your business. Being in the right places matters more than being everywhere." },
            { question: 'How are posts approved?', answer: "At the end of each month we send the next month's calendar for approval. We make requested revisions, then publish. Always transparent." },
        ],
        ctaTitle: 'Social media wearing you out?',
        ctaSub: 'Leave it to us and focus on your business.',
    };

    const serviceUrl = 'https://bccreative.agency/hizmetler/sosyal-medya';
    useSEO({
        title: isTr ? 'KKTC Sosyal Medya Yönetimi | BC Creative Agency' : 'TRNC Social Media Management | BC Creative Agency',
        description: isTr ? "KKTC'de profesyonel sosyal medya yönetimi. Instagram, Facebook, TikTok stratejisi ve içerik." : 'Professional social media management in TRNC. Instagram, Facebook, TikTok strategy and content.',
        keywords: 'KKTC sosyal medya, Girne Instagram ajansı, KKTC içerik üretimi, KKTC marka yönetimi',
        canonical: serviceUrl,
        alternates: [
            { hreflang: 'tr', href: serviceUrl },
            { hreflang: 'en', href: 'https://bccreative.agency/en/hizmetler/sosyal-medya' },
        ],
        schemas: [
            buildServiceSchema({ name: isTr ? 'Sosyal Medya Yönetimi' : 'Social Media Management', description: content.description, url: serviceUrl, serviceType: 'SocialMediaMarketing' }),
            buildFAQSchema(content.faqs),
            buildBreadcrumbSchema([
                { name: isTr ? 'Ana Sayfa' : 'Home', url: 'https://bccreative.agency/' },
                { name: isTr ? 'Hizmetler' : 'Services', url: 'https://bccreative.agency/' },
                { name: isTr ? 'Sosyal Medya' : 'Social Media', url: serviceUrl },
            ]),
            buildOrganizationSchema(),
        ],
    });

    return <ServicePageLayout {...content} tone="mint" />;
};

export default SocialMedia;
