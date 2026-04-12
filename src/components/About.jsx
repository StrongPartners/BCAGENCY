import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Zap, Target, Search, Megaphone, Smartphone, Monitor, Video, Plane, Camera, Paintbrush, FileText } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { useLanguage } from '../context/LanguageContext';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '../lib/geoSchemas';

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
        <div className="bg-white">

            {/* Hero */}
            <section className="pt-32 pb-20 md:pt-40 md:pb-28">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-4xl">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-6"
                        >
                            {t('about_eyebrow')}
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-bold text-ink-900 leading-[0.95] tracking-tighter"
                        >
                            {t('about_hero_title_1')}{' '}
                            <span className="text-brand-600">{t('about_hero_title_accent')}</span>{' '}
                            {t('about_hero_title_2')}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mt-8 text-lg md:text-xl text-ink-500 max-w-2xl leading-relaxed"
                        >
                            {t('about_hero_desc')}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="py-32 md:py-48 bg-ink-50">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-6">Story</p>
                            <h2 className="text-4xl md:text-6xl font-bold text-ink-900 leading-[0.95] tracking-tight mb-6">
                                {t('about_story_title')}
                            </h2>
                            <p className="text-lg text-ink-500 leading-relaxed mb-4">
                                {t('about_story_p1')}
                            </p>
                            <p className="text-lg text-ink-500 leading-relaxed">
                                {t('about_story_p2')}
                            </p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="rounded-2xl shadow-lg overflow-hidden">
                                <img src="/about-rocket.jpg" alt="BC Creative Agency" className="w-full h-full object-cover" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-32 md:py-48 bg-white">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-3xl mb-16">
                        <p className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-6">Values</p>
                        <h2 className="text-4xl md:text-6xl font-bold text-ink-900 leading-[0.95] tracking-tight">
                            {t('about_values_title')}
                        </h2>
                        <p className="mt-4 text-lg md:text-xl text-ink-500">
                            {t('about_values_sub')}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {values.map((value, i) => {
                            const IconComponent = VALUE_ICONS[i] || Eye;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <IconComponent size={28} className="text-ink-400 mb-5" strokeWidth={1.5} />
                                    <h3 className="text-2xl font-bold text-ink-900 mb-3 leading-tight">{value.title}</h3>
                                    <p className="text-ink-500 leading-relaxed text-sm">{value.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Services grid */}
            <section className="py-32 md:py-48 bg-ink-50">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-bold text-ink-900 leading-[0.95] tracking-tight">
                            {t('about_services_title')}
                            {t('about_services_title_accent')}
                        </h2>
                        <p className="mt-4 text-lg md:text-xl text-ink-500 max-w-2xl mx-auto">
                            {t('about_services_sub')}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {services.map((service, i) => {
                            const IconComponent = SERVICE_ICONS[i] || Search;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-white rounded-xl p-6 border border-ink-100 hover:shadow-sm transition-all"
                                >
                                    <IconComponent size={24} className="text-ink-400 mb-3" strokeWidth={1.5} />
                                    <h3 className="text-lg font-bold text-ink-900 mb-1 leading-tight">{service.title}</h3>
                                    <p className="text-ink-500 text-sm leading-snug">{service.description}</p>
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
