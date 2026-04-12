import React from 'react';
import { Camera, PartyPopper, User, UtensilsCrossed } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import ServicePageLayout from './shared/ServicePageLayout';
import { useLanguage } from '../context/LanguageContext';
import {
    buildServiceSchema,
    buildFAQSchema,
    buildBreadcrumbSchema,
    buildOrganizationSchema,
} from '../lib/geoSchemas';

const FotografVideo = () => {
    const { lang } = useLanguage();
    const isTr = lang === 'tr';

    const content = isTr ? {
        eyebrow: 'Fotoğraf & Video · Profesyonel çekim',
        headline: 'Ürün, etkinlik,',
        headlineAccent: 'kurumsal',
        headlineRest: '— hepsini çekiyoruz.',
        subheadline: 'Profesyonel çekim, sosyal medyaya hazır içerik.',
        description: "Ürün katalogu mu, etkinlik mi, kurumsal headshot mu — ne ihtiyacınız varsa. Stüdyo ve dış mekan, tüm ekipman ve post prodüksiyon dahil.",
        features: [
            { icon: Camera, title: 'Ürün foto��rafçılığı', desc: 'E-ticaret için beyaz fon, lifestyle çekim, katalog. Amazon/Shopify için hazır.', tone: 'brand' },
            { icon: PartyPopper, title: 'Etkinlik kaydı', desc: 'Düğün, konferans, lansman, sergi — fotoğraf + video birlikte.', tone: 'coral' },
            { icon: User, title: 'Kurumsal headshot', desc: 'LinkedIn, hakkımızda sayfası, basın b��lteni için profesyonel portreler.', tone: 'mint' },
            { icon: UtensilsCrossed, title: 'Yemek & mekan', desc: "Restoran menüsü, menü fotoğrafları, mekan atmosfer çekimi — iştah açan görseller.", tone: 'sun' },
        ],
        stats: [
            { value: '50MP', label: 'Fotoğraf kalitesi' },
            { value: '4K', label: 'Video kalitesi' },
            { value: '2-5 gün', label: 'Teslim' },
            { value: '10+', label: 'Yıllık çekim' },
        ],
        steps: [
            { step: '01', title: 'Keşif', desc: 'Çekimin amacını, sayısını, lokasyonunu planlıyoruz.' },
            { step: '02', title: 'Çekim', desc: 'Profesyonel ekipman, ışık, yönetmen — stüdyo ya da dış mekan.' },
            { step: '03', title: 'Retouch', desc: 'Renk, ışık, detay rötuşları — her fotoğraf elden geçer.' },
            { step: '04', title: 'Teslim', desc: "Web için optimize edilmiş ve yüksek çözünürlük versiyonlar birlikte." },
        ],
        faqs: [
            { question: 'Kaç fotoğraf teslim ediyorsunuz?', answer: "Çekim kapsamına göre değişir. Standart ürün çekiminde ürün başına 5–8 fotoğraf, etkinlik çekiminde 150–300 fotoğraf arasında." },
            { question: 'Retouch dahil mi?', answer: "Evet. Temel renk düzenleme ve ışık rötuşları dahil. İleri retouch (model retouch, arka plan değiştirme vb.) ekstra." },
            { question: 'Stüdyo çekim mi dış mekan mı?', answer: "İkisi de. KKTC'de stüdyomuz var, dış mekan çekim için ise Girne, Lefkoşa, Gazimağusa her yere geliyoruz." },
            { question: 'Teslim formatı nasıl?', answer: "JPG yüksek çözünürlük + web için optimize edilmiş versiyonlar. İsterseniz RAW dosyaları da gönderiyoruz." },
        ],
        ctaTitle: 'Görsel dünyanızı yenileyelim mi?',
        ctaSub: 'Ürün, etkinlik, kurumsal — ne ihtiyacınız varsa çekiyoruz.',
    } : {
        eyebrow: 'Photo & Video · Professional shoots',
        headline: 'Product, event,',
        headlineAccent: 'corporate',
        headlineRest: "— we shoot it all.",
        subheadline: 'Professional shoots, social-ready output.',
        description: "Product catalog, event, corporate headshots — whatever you need. Studio or on-location, all equipment and post-production included.",
        features: [
            { icon: Camera, title: 'Product photography', desc: 'White background for e-commerce, lifestyle shots, catalog. Amazon / Shopify ready.', tone: 'brand' },
            { icon: PartyPopper, title: 'Event capture', desc: 'Weddings, conferences, launches, exhibitions — photo + video together.', tone: 'coral' },
            { icon: User, title: 'Corporate headshots', desc: 'Professional portraits for LinkedIn, about pages, press kits.', tone: 'mint' },
            { icon: UtensilsCrossed, title: 'Food & venue', desc: "Restaurant menus, dish photography, venue atmosphere — mouth-watering shots.", tone: 'sun' },
        ],
        stats: [
            { value: '50MP', label: 'Photo quality' },
            { value: '4K', label: 'Video quality' },
            { value: '2-5 days', label: 'Turnaround' },
            { value: '10+', label: 'Years shooting' },
        ],
        steps: [
            { step: '01', title: 'Discovery', desc: "We plan the shoot's purpose, scope and location." },
            { step: '02', title: 'Shoot', desc: 'Professional gear, lighting, direction — studio or on-location.' },
            { step: '03', title: 'Retouch', desc: 'Color, light and detail retouching — every photo gets attention.' },
            { step: '04', title: 'Delivery', desc: "Web-optimized and high-res versions together." },
        ],
        faqs: [
            { question: 'How many photos do you deliver?', answer: "Depends on scope. Standard product shoot: 5–8 photos per product. Event shoot: 150–300 photos." },
            { question: 'Is retouching included?', answer: "Yes. Basic color and light retouching is included. Advanced retouching (model retouch, background replacement) is extra." },
            { question: 'Studio or on-location?', answer: "Both. We have a studio in Northern Cyprus and also travel to Kyrenia, Nicosia, Famagusta for location shoots." },
            { question: 'Delivery format?', answer: "High-res JPG + web-optimized versions. RAW files available on request." },
        ],
        ctaTitle: 'Ready for a visual refresh?',
        ctaSub: 'Product, event, corporate — whatever you need, we shoot it.',
    };

    const serviceUrl = 'https://bccreative.agency/hizmetler/fotograf-video';
    useSEO({
        title: isTr ? 'KKTC Fotoğraf & Video Çekim | Profesyonel Prodüksiyon' : 'TRNC Photo & Video Shooting | Professional Production',
        description: isTr ? "KKTC'de profesyonel fotoğraf ve video çekimi. Ürün, etkinlik, kurumsal." : 'Professional photo and video shooting in TRNC. Product, event, corporate.',
        keywords: 'KKTC fotoğraf çekim, Girne video çekim, KKTC ürün fotoğrafı, KKTC kurumsal çekim',
        canonical: serviceUrl,
        alternates: [
            { hreflang: 'tr', href: serviceUrl },
            { hreflang: 'en', href: 'https://bccreative.agency/en/hizmetler/fotograf-video' },
        ],
        schemas: [
            buildServiceSchema({ name: isTr ? 'Fotoğraf & Video' : 'Photography & Video', description: content.description, url: serviceUrl, serviceType: 'Photography' }),
            buildFAQSchema(content.faqs),
            buildBreadcrumbSchema([
                { name: isTr ? 'Ana Sayfa' : 'Home', url: 'https://bccreative.agency/' },
                { name: isTr ? 'Hizmetler' : 'Services', url: 'https://bccreative.agency/' },
                { name: isTr ? 'Fotoğraf & Video' : 'Photo & Video', url: serviceUrl },
            ]),
            buildOrganizationSchema(),
        ],
    });

    return <ServicePageLayout {...content} tone="mint" />;
};

export default FotografVideo;
