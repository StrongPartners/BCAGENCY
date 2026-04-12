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

const DroneCekim = () => {
    const { lang } = useLanguage();
    const isTr = lang === 'tr';

    const content = isTr ? {
        eyebrow: 'Drone · Hava çekimi',
        headline: "KKTC'nin en güzel",
        headlineAccent: 'açıları,',
        headlineRest: 'yukarıdan.',
        subheadline: 'Turizm, emlak, etkinlik — havadan profesyonel çekim.',
        description: "Profesyonel drone'larla 4K hava çekimi. Gayrimenkul tanıtımı, otel promosyonu, etkinlik kaydı, reklam filmi için sinematik havadan görüntüler.",
        features: [
            { icon: '', title: 'Turizm & otel', desc: 'Otel tesisi, plaj, havuz, manzara — tanıtım için birebir. KKTC\'nin en güzel hali.', tone: 'brand' },
            { icon: '', title: 'Emlak & gayrimenkul', desc: 'Villa, apartman, site tanıtımı. Havadan görüntü satış ilanlarını 3x daha etkili yapar.', tone: 'coral' },
            { icon: '', title: 'Etkinlik kaydı', desc: 'Düğün, konser, spor etkinliği — unutulmaz havadan sahneler.', tone: 'mint' },
            { icon: '', title: 'Reklam filmi', desc: 'Sinematik havadan sekanslarla marka filmlerinize epik bir başlangıç.', tone: 'sun' },
        ],
        stats: [
            { value: '4K', label: 'Çekim kalitesi' },
            { value: '2-4 gün', label: 'Teslim' },
            { value: 'FAA', label: 'Sertifikalı pilot' },
            { value: '100+', label: 'Proje geçmişi' },
        ],
        steps: [
            { step: '01', title: 'Lokasyon', desc: 'Çekim yapılacak lokasyonu, açıları ve izinleri planlıyoruz.' },
            { step: '02', title: 'Çekim', desc: 'Sertifikalı pilot, 4K kamera, ideal hava koşulları.' },
            { step: '03', title: 'Kurgu', desc: 'Renk düzenleme, ses, müzik, geçişler — sinematik son ürün.' },
            { step: '04', title: 'Teslim', desc: 'Ham görüntü + kurgulanmış versiyon, istenen formatlarda.' },
        ],
        faqs: [
            { question: 'Drone çekimi için izin gerekiyor mu?', answer: "Evet, bazı lokasyonlar için izin gerekebilir. Biz bu süreci sizin için yönetiyoruz. KKTC'de sertifikalı pilotumuz var." },
            { question: 'Hava şartlarına bağlı mı?', answer: "Evet. Rüzgar ve yağmur çekimi etkiler. Hava durumu kötüyse çekimi yeniden planlıyoruz — ek ücret almıyoruz." },
            { question: 'Sadece drone mu, yer çekimi de var mı?', answer: "Drone tek başına alınabilir ama en iyi sonuç için yer çekimi + drone kombinasyonunu öneriyoruz. Prodüksiyon ekibimiz tam paket sunabilir." },
            { question: 'Teslim süresi ne kadar?', answer: "Ham görüntüler çekim sonrası 24 saat içinde, kurgulanmış versiyon 2–4 gün içinde teslim edilir." },
        ],
        ctaTitle: 'Markanıza epik bir bakış açısı.',
        ctaSub: "Drone çekimi ile markanızı havadan göstermek için bize ulaşın.",
    } : {
        eyebrow: 'Drone · Aerial filming',
        headline: "The best angles",
        headlineAccent: 'of TRNC,',
        headlineRest: 'from above.',
        subheadline: 'Tourism, real estate, events — professional aerial footage.',
        description: "4K aerial filming with professional drones. Real estate promos, hotel marketing, event capture, ad films — cinematic footage from above.",
        features: [
            { icon: '', title: 'Tourism & hotels', desc: "Hotel grounds, beaches, pools, views — perfect for promos. TRNC at its best.", tone: 'brand' },
            { icon: '', title: 'Real estate', desc: 'Villa, apartment, complex promos. Aerial shots make listings 3x more effective.', tone: 'coral' },
            { icon: '', title: 'Event capture', desc: 'Weddings, concerts, sports — unforgettable aerial moments.', tone: 'mint' },
            { icon: '', title: 'Ad films', desc: 'Epic opening sequences for brand films with cinematic aerial shots.', tone: 'sun' },
        ],
        stats: [
            { value: '4K', label: 'Footage quality' },
            { value: '2-4 days', label: 'Turnaround' },
            { value: 'FAA', label: 'Certified pilot' },
            { value: '100+', label: 'Projects done' },
        ],
        steps: [
            { step: '01', title: 'Location', desc: 'We plan the location, angles and permits.' },
            { step: '02', title: 'Shoot', desc: 'Certified pilot, 4K camera, optimal weather window.' },
            { step: '03', title: 'Edit', desc: 'Color grading, sound, music, transitions — cinematic final.' },
            { step: '04', title: 'Delivery', desc: 'Raw footage + edited version in requested formats.' },
        ],
        faqs: [
            { question: 'Do you need permits for drone footage?', answer: "Yes, some locations require permits. We handle the process for you. We have certified drone pilots in Northern Cyprus." },
            { question: 'Is it weather dependent?', answer: "Yes. Wind and rain affect shooting. If weather is bad we reschedule — no extra charge." },
            { question: 'Drone only or ground filming too?', answer: "Drone can be booked alone, but for the best result we recommend combining it with ground filming. Our production team offers the full package." },
            { question: 'Delivery time?', answer: "Raw footage within 24 hours of shooting, edited version in 2–4 days." },
        ],
        ctaTitle: 'An epic view of your brand.',
        ctaSub: 'Get in touch to showcase your brand from above.',
    };

    const serviceUrl = 'https://bccreative.agency/hizmetler/drone-cekim';
    useSEO({
        title: isTr ? 'KKTC Drone Çekim | 4K Hava Çekimi Hizmeti' : 'TRNC Drone Filming | 4K Aerial Footage',
        description: isTr ? "KKTC'de profesyonel drone çekim. 4K hava çekimi, turizm, emlak ve etkinlik." : 'Professional drone filming in TRNC. 4K aerial footage for tourism, real estate and events.',
        keywords: 'KKTC drone çekim, hava çekimi Girne, KKTC emlak çekim, havadan fotoğraf KKTC',
        canonical: serviceUrl,
        alternates: [
            { hreflang: 'tr', href: serviceUrl },
            { hreflang: 'en', href: 'https://bccreative.agency/en/hizmetler/drone-cekim' },
        ],
        schemas: [
            buildServiceSchema({ name: isTr ? 'Drone Çekim' : 'Drone Filming', description: content.description, url: serviceUrl, serviceType: 'AerialPhotography' }),
            buildFAQSchema(content.faqs),
            buildBreadcrumbSchema([
                { name: isTr ? 'Ana Sayfa' : 'Home', url: 'https://bccreative.agency/' },
                { name: isTr ? 'Hizmetler' : 'Services', url: 'https://bccreative.agency/' },
                { name: isTr ? 'Drone Çekim' : 'Drone Filming', url: serviceUrl },
            ]),
            buildOrganizationSchema(),
        ],
    });

    return <ServicePageLayout {...content} tone="brand" />;
};

export default DroneCekim;
