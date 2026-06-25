import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Zap, Target } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { useLanguage } from '../context/LanguageContext';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '../lib/geoSchemas';
import { ZoomSection, ScrollText } from './shared/ParallaxKit';

const VALUE_ICONS = [Eye, Heart, Zap, Target];

const About = () => {
    const { lang, t } = useLanguage();
    const values = t('about_values');
    const services = t('about_services');

    useSEO({
        title: lang === 'tr' ? 'Hakkımızda | BC Creative Agency - KKTC Girne' : 'About | BC Creative Agency - Kyrenia TRNC',
        description: lang === 'tr' ? "BC Creative Agency — 2017'den beri KKTC'de dijital pazarlama." : "BC Creative Agency — digital marketing in Northern Cyprus since 2017.",
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
        <main className="bg-ink-900">
            {/* Hero — zoom into smoke */}
            <ZoomSection video="/bg-smoke.mp4" bg="/parallax-smoke.webp" overlay="bg-ink-900/60">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-4xl">
                        <ScrollText>
                            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-6">
                                {t('about_eyebrow')}
                            </p>
                        </ScrollText>
                        <ScrollText delay={0.1}>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tighter">
                                {t('about_hero_title_1')}{' '}
                                <span className="text-secondary-300">{t('about_hero_title_accent')}</span>{' '}
                                {t('about_hero_title_2')}
                            </h1>
                        </ScrollText>
                        <ScrollText delay={0.2}>
                            <p className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed">
                                {t('about_hero_desc')}
                            </p>
                        </ScrollText>
                    </div>
                </div>
            </ZoomSection>

            {/* Story — zoom into ink */}
            <ZoomSection video="/bg-ink.mp4" bg="/parallax-ink.webp" overlay="bg-ink-900/80">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <ScrollText>
                                <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-6">Story</p>
                                <h2 className="text-4xl md:text-6xl font-bold text-white leading-[0.95] tracking-tight mb-6">
                                    {t('about_story_title')}
                                </h2>
                            </ScrollText>
                            <ScrollText delay={0.1}>
                                <p className="text-lg text-white/50 leading-relaxed mb-4">{t('about_story_p1')}</p>
                            </ScrollText>
                            <ScrollText delay={0.2}>
                                <p className="text-lg text-white/50 leading-relaxed">{t('about_story_p2')}</p>
                            </ScrollText>
                        </div>
                        <ScrollText delay={0.15}>
                            <div className="rounded-2xl overflow-hidden border border-white/10">
                                <img src="/about-rocket.jpg" alt="BC Creative Agency ofis, Girne KKTC" className="w-full h-auto object-cover" loading="lazy" width="640" height="480" />
                            </div>
                        </ScrollText>
                    </div>
                </div>
            </ZoomSection>

            {/* Values — zoom into light */}
            <ZoomSection video="/bg-light.mp4" bg="/parallax-light.webp" overlay="bg-ink-900/80">
                <div className="container mx-auto px-6 md:px-12">
                    <ScrollText className="max-w-3xl mb-16">
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-6">Values</p>
                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-[0.95] tracking-tight">
                            {t('about_values_title')}
                        </h2>
                        <p className="mt-4 text-lg text-white/40">{t('about_values_sub')}</p>
                    </ScrollText>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, i) => {
                            const Icon = VALUE_ICONS[i] || Eye;
                            return (
                                <ScrollText key={i} delay={i * 0.1}>
                                    <motion.div whileHover={{ y: -5 }} className="group">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-secondary-300/20 flex items-center justify-center mb-4 transition-colors">
                                            <Icon size={22} className="text-secondary-300/60" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                                        <p className="text-white/40 text-sm leading-relaxed">{value.desc}</p>
                                    </motion.div>
                                </ScrollText>
                            );
                        })}
                    </div>
                </div>
            </ZoomSection>

            {/* Services — zoom into powder */}
            <ZoomSection video="/bg-powder.mp4" bg="/parallax-powder.webp" overlay="bg-ink-900/80">
                <div className="container mx-auto px-6 md:px-12">
                    <ScrollText className="text-center mb-14">
                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-[0.95] tracking-tight">
                            {t('about_services_title')}
                            <span className="text-secondary-300">{t('about_services_title_accent')}</span>
                        </h2>
                        <p className="mt-4 text-lg text-white/40 max-w-2xl mx-auto">{t('about_services_sub')}</p>
                    </ScrollText>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {services.map((service, i) => (
                            <ScrollText key={i} delay={i * 0.05}>
                                <motion.div
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-secondary-300/30 transition-all"
                                >
                                    <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
                                    <p className="text-white/40 text-sm leading-relaxed">{service.description}</p>
                                </motion.div>
                            </ScrollText>
                        ))}
                    </div>
                </div>
            </ZoomSection>
        </main>
    );
};

export default About;
