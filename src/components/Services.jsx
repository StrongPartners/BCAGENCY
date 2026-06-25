import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    ru: [
        {
            icon: TrendingUp,
            title: 'Цифровая стратегия',
            desc: 'SEO, Google Ads и перформанс-маркетинг для выхода на целевую аудиторию. Рост на основе данных.',
            link: '/hizmetler/seo',
            linkText: 'Подробнее',
        },
        {
            icon: Camera,
            title: 'Креативный контент',
            desc: 'Управление соцсетями, видеопродакшн, дрон-съёмка и фотография. Рассказываем историю бренда на каждой платформе.',
            link: '/hizmetler/sosyal-medya',
            linkText: 'Подробнее',
        },
        {
            icon: Monitor,
            title: 'Веб и технологии',
            desc: 'Быстрые, современные и SEO-дружественные сайты. Mobile-first, ориентация на конверсию.',
            link: '/hizmetler/web-tasarim',
            linkText: 'Подробнее',
        },
    ],
    fa: [
        {
            icon: TrendingUp,
            title: 'استراتژی دیجیتال',
            desc: 'سئو، Google Ads و بازاریابی عملکردی برای رسیدن به مخاطب هدف. رشد مبتنی بر داده.',
            link: '/hizmetler/seo',
            linkText: 'بیشتر بدانید',
        },
        {
            icon: Camera,
            title: 'محتوای خلاقانه',
            desc: 'مدیریت شبکه‌های اجتماعی، تولید ویدئو، فیلمبرداری هوایی و عکاسی. داستان برند شما در هر پلتفرم.',
            link: '/hizmetler/sosyal-medya',
            linkText: 'بیشتر بدانید',
        },
        {
            icon: Monitor,
            title: 'وب و فناوری',
            desc: 'سایت‌های سریع، مدرن و سئو-دوست. اول موبایل، متمرکز بر تبدیل، سفارشی برای برند شما.',
            link: '/hizmetler/web-tasarim',
            linkText: 'بیشتر بدانید',
        },
    ],
};

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Services = () => {
    const navigate = useNavigate();
    const { lang } = useLanguage();
    const items = pillars[lang] || pillars.tr;

    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
                >
                    {items.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={i}
                                variants={cardVariant}
                                className="group relative"
                            >
                                <div className="absolute -inset-6 rounded-2xl bg-ink-50/0 group-hover:bg-ink-50 transition-colors duration-500" />
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-xl bg-ink-50 group-hover:bg-brand-600 flex items-center justify-center mb-6 transition-colors duration-300">
                                        <Icon size={24} className="text-ink-400 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-ink-900 mb-4 leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-ink-500 leading-relaxed mb-6">
                                        {item.desc}
                                    </p>
                                    <button
                                        onClick={() => { navigate(item.link); window.scrollTo(0, 0); }}
                                        className="inline-flex items-center gap-2 bg-ink-900 text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-brand-600 transition-all duration-300 hover:gap-3"
                                    >
                                        {item.linkText}
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
