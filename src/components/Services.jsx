import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Camera, Monitor } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const pillars = {
    tr: [
        {
            icon: TrendingUp,
            title: 'Dijital Strateji',
            desc: 'SEO, Google Ads ve performans pazarlaması ile markanızı doğru kitleye ulaştırıyoruz. Veriye dayalı, ölçülebilir büyüme.',
            link: '/hizmetler/seo',
            linkText: 'Daha fazla',
        },
        {
            icon: Camera,
            title: 'Yaratıcı İçerik',
            desc: 'Sosyal medya yönetimi, video prodüksiyon, drone çekim ve fotoğraf. Markanızın hikayesini her platformda anlatıyoruz.',
            link: '/hizmetler/sosyal-medya',
            linkText: 'Daha fazla',
        },
        {
            icon: Monitor,
            title: 'Web & Teknoloji',
            desc: 'Hızlı, modern ve SEO dostu web siteleri. Mobil uyumlu, dönüşüm odaklı, markanıza özel tasarım.',
            link: '/hizmetler/web-tasarim',
            linkText: 'Daha fazla',
        },
    ],
    en: [
        {
            icon: TrendingUp,
            title: 'Digital Strategy',
            desc: 'SEO, Google Ads and performance marketing to reach the right audience. Data-driven, measurable growth.',
            link: '/hizmetler/seo',
            linkText: 'Learn more',
        },
        {
            icon: Camera,
            title: 'Creative Content',
            desc: 'Social media management, video production, drone filming and photography. Telling your brand story on every platform.',
            link: '/hizmetler/sosyal-medya',
            linkText: 'Learn more',
        },
        {
            icon: Monitor,
            title: 'Web & Technology',
            desc: 'Fast, modern and SEO-friendly websites. Mobile-first, conversion-focused, custom to your brand.',
            link: '/hizmetler/web-tasarim',
            linkText: 'Learn more',
        },
    ],
};

const Services = () => {
    const navigate = useNavigate();
    const { lang } = useLanguage();
    const items = pillars[lang] || pillars.tr;

    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                    {items.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <div key={i} className="group">
                                <Icon size={32} className="text-ink-300 mb-6" strokeWidth={1.5} />
                                <h3 className="text-2xl md:text-3xl font-bold text-ink-900 mb-4 leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-ink-500 leading-relaxed mb-6">
                                    {item.desc}
                                </p>
                                <button
                                    onClick={() => { navigate(item.link); window.scrollTo(0, 0); }}
                                    className="inline-flex items-center gap-2 bg-ink-900 text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-ink-800 transition-colors"
                                >
                                    {item.linkText}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
