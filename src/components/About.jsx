import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Zap, Target, Search, Megaphone, Smartphone, Monitor, Video, Plane, Camera, Paintbrush, FileText } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import ColorfulBlobs from './ColorfulBlobs';
import { useLanguage } from '../context/LanguageContext';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '../lib/geoSchemas';

const TONE_BG = { brand: 'bg-brand-50', coral: 'bg-coral-50', mint: 'bg-mint-50', sun: 'bg-sun-50' };
const TONE_ICON = { brand: 'text-brand-600', coral: 'text-coral-600', mint: 'text-mint-600', sun: 'text-sun-600' };

const VALUE_ICONS = [Eye, Heart, Zap, Target];
const SERVICE_ICONS = [Search, Megaphone, Smartphone, Monitor, Video, Plane, Camera, Paintbrush, FileText];

const About = () => {
    const { lang, t } = useLanguage();
    const values = t('about_values');
    const services = t('about_services');

    useSEO({
        title: lang === 'tr' ? 'Hakkımızda | BC Creative Agency - KKTC Girne' : 'About | BC Creative Agency - Kyrenia TRNC',
        description: lang === 'tr' ? "BC Creative Agency — 2017'den beri KKTC'de dijital pazarlama. Küçük bir stüdyodan bugünkü 50+ markaya uzanan samimi hikayemiz." : "BC Creative Agency — digital marketing in Northern Cyprus since 2017. Our story from a small studio to working with 50+ brands today.",
        keywords: 'BC Creative Agency hakkında, KKTC dijital ajans ekibi, Girne reklam ajansı kimdir',
        canonical: 'https://bccreative.agency/about',
        schemas: [
            buildOrganizationSchema(),
            buildBreadcrumbSchema([
                { name: t('nav_home'), url: 'https://bccreative.agency/' },
                { name: t('nav_about'), url: 'https://bccreative.agency/about' },
            ]),
        ],
    });

    return (
        <div className="bg-surface-card">

            {/* Hero */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-surface-card">
                <div className="absolute inset-0 z-0">
                    <ColorfulBlobs variant="hero" />
                </div>

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block bg-coral-100 rounded-full px-4 py-1.5 mb-6 shadow-md"
                        >
                            <span className="font-black text-ink-900 text-xs uppercase tracking-wider">{t('about_eyebrow')}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black text-ink-900 leading-[0.95] tracking-tighter"
                        >
                            {t('about_hero_title_1')}{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 bg-gradient-to-r from-brand-600 via-coral-500 to-sun-500 bg-clip-text text-transparent animate-gradient-shift">
                                    {t('about_hero_title_accent')}
                                </span>
                            </span>{' '}
                            {t('about_hero_title_2')}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mt-8 text-lg md:text-xl text-ink-700 font-medium max-w-2xl leading-relaxed"
                        >
                            {t('about_hero_desc')}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="py-20 md:py-28 bg-surface-alt relative overflow-hidden">
                <div className="absolute top-10 right-10 w-72 h-72 bg-brand-200 rounded-full blur-3xl opacity-50" />
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-block bg-mint-200 rounded-full px-4 py-1.5 mb-6"
                            >
                                <span className="font-black text-ink-900 text-xs uppercase tracking-wider">Story</span>
                            </motion.div>
                            <h2 className="text-4xl md:text-6xl font-black text-ink-900 leading-[0.95] tracking-tight mb-6">
                                {t('about_story_title')}
                            </h2>
                            <p className="text-lg text-ink-700 font-medium leading-relaxed mb-4">
                                {t('about_story_p1')}
                            </p>
                            <p className="text-lg text-ink-700 font-medium leading-relaxed">
                                {t('about_story_p2')}
                            </p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="rounded-3xl shadow-2xl overflow-hidden">
                                <img src="/about-rocket.jpg" alt="BC Creative Agency" className="w-full h-full object-cover" />
                            </div>
                            {/* Badge */}
                            <div className="absolute -top-5 -right-5 w-22 h-22 bg-sun-300 rounded-full flex flex-col items-center justify-center shadow-xl">
                                <div className="text-2xl font-black text-ink-900 leading-none">2017</div>
                                <div className="text-[10px] font-bold text-ink-700 uppercase tracking-wider">Since</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 md:py-28 bg-surface-card">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-3xl mb-14">
                        <div className="inline-block bg-sun-200 rounded-full px-4 py-1.5 mb-6">
                            <span className="font-black text-ink-900 text-xs uppercase tracking-wider">Values</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-ink-900 leading-[0.95] tracking-tight">
                            {t('about_values_title')}
                        </h2>
                        <p className="mt-4 text-lg md:text-xl text-ink-700 font-medium">
                            {t('about_values_sub')}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, i) => {
                            const tones = ['brand', 'coral', 'mint', 'sun'];
                            const tone = tones[i % 4];
                            const IconComponent = VALUE_ICONS[i] || Eye;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -6 }}
                                    className="bg-surface-card rounded-2xl p-7 shadow-sm hover:shadow-lg border border-gray-100 transition-all"
                                >
                                    <div className={`w-14 h-14 ${TONE_BG[tone]} rounded-xl flex items-center justify-center mb-5`}>
                                        <IconComponent size={24} className={TONE_ICON[tone]} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-2xl font-black text-ink-900 mb-3 leading-tight">{value.title}</h3>
                                    <p className="text-ink-700 font-medium leading-relaxed text-sm">{value.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Services grid */}
            <section className="py-20 md:py-28 bg-surface-alt relative overflow-hidden">
                <div className="absolute top-10 left-10 w-72 h-72 bg-coral-200 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-brand-200 rounded-full blur-3xl opacity-50" />

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl md:text-6xl font-black text-ink-900 leading-[0.95] tracking-tight">
                            {t('about_services_title')}
                            <span className="relative inline-block">
                                <span className="relative z-10">{t('about_services_title_accent')}</span>
                                <span className="absolute left-0 right-0 bottom-1 h-3 bg-sun-300 -z-0 rounded-sm" />
                            </span>
                        </h2>
                        <p className="mt-4 text-lg md:text-xl text-ink-700 font-medium max-w-2xl mx-auto">
                            {t('about_services_sub')}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                        {services.map((service, i) => {
                            const tones = ['brand', 'coral', 'mint', 'sun'];
                            const tone = tones[i % 4];
                            const IconComponent = SERVICE_ICONS[i] || Search;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-surface-card rounded-2xl p-5 shadow-sm hover:shadow-lg border border-gray-100 hover:-translate-y-1 transition-all"
                                >
                                    <div className={`w-12 h-12 ${TONE_BG[tone]} rounded-xl flex items-center justify-center mb-3`}>
                                        <IconComponent size={20} className={TONE_ICON[tone]} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-lg font-black text-ink-900 mb-1 leading-tight">{service.title}</h3>
                                    <p className="text-ink-700 text-sm font-medium leading-snug">{service.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
