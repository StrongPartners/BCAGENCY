import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useSEO from '../hooks/useSEO';
import Hero from './Hero';
import Services from './Services';
import Approach from './WhyChooseUs';
import FAQ from './FAQ';
import { useLanguage } from '../context/LanguageContext';
import { buildOrganizationSchema, buildWebSiteSchema } from '../lib/geoSchemas';

const ParallaxImage = ({ src, alt, speed = 0.3, height = 'h-[60vh] md:h-[80vh]', overlay = 'bg-ink-900/30', children }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

    return (
        <section ref={ref} className={`${height} relative overflow-hidden`}>
            <motion.img
                src={src}
                alt={alt}
                className="absolute inset-0 w-full h-[130%] object-cover -top-[15%]"
                style={{ y }}
                loading="lazy"
                width="1920"
                height="1080"
            />
            <div className={`absolute inset-0 ${overlay}`} />
            {children && (
                <div className="relative z-10 flex items-center justify-center h-full">
                    {children}
                </div>
            )}
        </section>
    );
};

const Home = () => {
    const { t } = useLanguage();

    useSEO({
        title: 'BC Creative Agency | KKTC Dijital Pazarlama, SEO, Google Ads – Girne',
        description: "BC Creative Agency — KKTC Girne merkezli yaratıcı dijital pazarlama ajansı. SEO, Google Ads, sosyal medya, web tasarım ve prodüksiyon hizmetleri.",
        keywords: 'KKTC dijital ajans, Kuzey Kıbrıs reklam ajansı, KKTC SEO, Girne dijital pazarlama, KKTC Google Ads, sosyal medya yönetimi KKTC',
        canonical: 'https://bccreative.agency/',
        alternates: [
            { hreflang: 'tr', href: 'https://bccreative.agency/' },
            { hreflang: 'en', href: 'https://bccreative.agency/' },
            { hreflang: 'ru', href: 'https://bccreative.agency/' },
            { hreflang: 'fa', href: 'https://bccreative.agency/' },
        ],
        schemas: [buildOrganizationSchema(), buildWebSiteSchema()],
    });

    return (
        <main>
            <Hero />
            <Services />

            {/* Parallax 1 — Team brainstorming */}
            <ParallaxImage
                src="/hf-team-brainstorm.webp"
                alt="BC Creative Agency ekip toplantısı ve strateji geliştirme"
                speed={0.25}
                overlay="bg-ink-900/40"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center px-6"
                >
                    <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-4">
                        {t('approach_eyebrow')}
                    </p>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight">
                        {t('approach_heading_1')}<br />{t('approach_heading_2')}
                    </h2>
                </motion.div>
            </ParallaxImage>

            <Approach />

            {/* Parallax 2 — Girne aerial */}
            <ParallaxImage
                src="/hf-girne-aerial.webp"
                alt="Girne limanı havadan drone görünümü, Kuzey Kıbrıs"
                speed={0.2}
                height="h-[50vh] md:h-[70vh]"
                overlay="bg-brand-600/20"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center px-6"
                >
                    <p className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
                        Girne, KKTC<br />
                        <span className="text-lg md:text-2xl font-normal text-white/80">EST. 2017</span>
                    </p>
                </motion.div>
            </ParallaxImage>

            <FAQ />

            {/* Parallax 3 — Navy abstract CTA */}
            <ParallaxImage
                src="/hf-navy-abstract.webp"
                alt="BC Creative Agency dijital pazarlama"
                speed={0.15}
                height="h-[50vh] md:h-[60vh]"
                overlay="bg-ink-900/50"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center px-6 max-w-3xl"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {t('blog_cta_title')}
                    </h2>
                    <p className="text-white/70 text-lg mb-8">
                        {t('blog_cta_sub')}
                    </p>
                    <button
                        onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                        className="inline-flex items-center gap-3 bg-white text-ink-900 font-medium text-base px-8 py-4 rounded-full hover:bg-ink-100 transition-all"
                    >
                        {t('btn_whatsapp')}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </motion.div>
            </ParallaxImage>
        </main>
    );
};

export default Home;
