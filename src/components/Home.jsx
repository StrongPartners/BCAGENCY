import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import FAQ from './FAQ';
import { useLanguage } from '../context/LanguageContext';
import { buildOrganizationSchema, buildWebSiteSchema } from '../lib/geoSchemas';

const useParallax = (ref, speed = 0.5) => {
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    return {
        y: useTransform(scrollYProgress, [0, 1], [`${speed * 50}%`, `-${speed * 50}%`]),
        opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
    };
};

const ImmersiveSection = ({ bg, overlay = 'bg-black/40', children, className = '' }) => {
    const ref = useRef(null);
    const { y } = useParallax(ref, 0.4);

    return (
        <section ref={ref} className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
            <motion.div
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
                style={{ y }}
            >
                <img
                    src={bg}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </motion.div>
            <div className={`absolute inset-0 ${overlay}`} />
            <div className="relative z-10 w-full">
                {children}
            </div>
        </section>
    );
};

const ScrollReveal = ({ children, delay = 0, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

const AnimatedNumber = ({ value, suffix = '' }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const isVisible = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const [display, setDisplay] = React.useState('0');
    const started = useRef(false);

    React.useEffect(() => {
        return isVisible.on('change', (v) => {
            if (v > 0.5 && !started.current) {
                started.current = true;
                const num = parseInt(value.replace(/[^0-9]/g, ''));
                if (isNaN(num)) { setDisplay(value); return; }
                let current = 0;
                const timer = setInterval(() => {
                    current += num / 30;
                    if (current >= num) { setDisplay(value); clearInterval(timer); }
                    else setDisplay(Math.floor(current) + suffix);
                }, 40);
            }
        });
    }, [value, suffix, isVisible]);

    return <span ref={ref}>{display}</span>;
};

const Home = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

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

    const services = t('services_list');
    const stats = t('stats');
    const steps = t('approach_steps');

    return (
        <main>

            {/* ═══════════════════════════════════════════
                HERO — Video background, full viewport
            ═══════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-ink-900">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50">
                    <source src="/hero-bg.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-transparent to-ink-900/80" />

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="max-w-5xl">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-white/50 mb-8"
                        >
                            BC Creative Agency · Girne, KKTC
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold text-white leading-[0.9] tracking-tighter"
                        >
                            {t('hero_headline_1')}{' '}
                            <span className="italic font-light">{t('hero_headline_accent')}</span>
                            <br />
                            {t('hero_headline_2')}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="mt-10 text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed"
                        >
                            {t('hero_desc')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
                            className="mt-12 flex flex-wrap items-center gap-6"
                        >
                            <button
                                onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                                className="group inline-flex items-center gap-3 bg-white text-ink-900 font-medium text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-full hover:bg-ink-100 transition-all hover:gap-4"
                            >
                                {t('hero_cta')}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
                        <motion.div className="w-1.5 h-1.5 bg-white/60 rounded-full"
                            animate={{ y: [0, 16, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════
                SERVICES — Ink explosion parallax bg
            ═══════════════════════════════════════════ */}
            <ImmersiveSection bg="/parallax-ink.webp" overlay="bg-ink-900/85">
                <div className="container mx-auto px-6 md:px-12 py-24 md:py-32">
                    <ScrollReveal className="max-w-3xl mb-16">
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                            {t('services_eyebrow')}
                        </p>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight">
                            {t('services_heading_1')}{' '}
                            <span className="text-secondary-300">{t('services_heading_2')}</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {services.map((item, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div
                                    onClick={() => { navigate(item.path); window.scrollTo(0, 0); }}
                                    className="group cursor-pointer p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-500"
                                >
                                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-white/50 leading-relaxed mb-6 text-sm">{item.description}</p>
                                    <span className="inline-flex items-center gap-2 text-secondary-300 text-sm font-medium group-hover:gap-3 transition-all">
                                        {t('services_see_details')}
                                    </span>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </ImmersiveSection>

            {/* ═══════════════════════════════════════════
                STATS — Light trails parallax bg
            ═══════════════════════════════════════════ */}
            <ImmersiveSection bg="/parallax-light.webp" overlay="bg-ink-900/70">
                <div className="container mx-auto px-6 md:px-12 py-24 md:py-32">
                    <ScrollReveal className="text-center mb-20">
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                            {t('stats_heading')}
                        </p>
                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
                            {t('approach_heading_1')}{' '}{t('approach_heading_2')}
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-24">
                        {stats.map((stat, i) => (
                            <ScrollReveal key={i} delay={i * 0.1} className="text-center">
                                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                                    <AnimatedNumber value={stat.value} suffix={stat.value.includes('+') ? '+' : ''} />
                                </div>
                                <div className="text-sm text-white/50">{stat.label}</div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {steps.map((step, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="relative group text-center md:text-left">
                                    <div className="w-16 h-16 mx-auto md:mx-0 rounded-full border-2 border-white/20 group-hover:border-secondary-300 flex items-center justify-center mb-4 transition-colors duration-500">
                                        <span className="text-lg font-bold text-white/40 group-hover:text-secondary-300 transition-colors duration-500">
                                            {step.number}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </ImmersiveSection>

            {/* ═══════════════════════════════════════════
                FAQ — Powder explosion parallax bg
            ═══════════════════════════════════════════ */}
            <ImmersiveSection bg="/parallax-powder.webp" overlay="bg-ink-900/80" className="!min-h-0">
                <div className="py-24 md:py-32">
                    <FAQ />
                </div>
            </ImmersiveSection>

            {/* ═══════════════════════════════════════════
                CTA — Smoke parallax bg
            ═══════════════════════════════════════════ */}
            <ImmersiveSection bg="/parallax-smoke.webp" overlay="bg-ink-900/60">
                <div className="container mx-auto px-6 md:px-12 py-32 md:py-48">
                    <ScrollReveal className="text-center max-w-3xl mx-auto">
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-6">
                            Girne, KKTC · EST. 2017
                        </p>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[0.95] tracking-tight">
                            {t('blog_cta_title')}
                        </h2>
                        <p className="text-lg md:text-xl text-white/50 mb-10 leading-relaxed">
                            {t('blog_cta_sub')}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                                className="group inline-flex items-center gap-3 bg-white text-ink-900 font-medium text-lg px-10 py-5 rounded-full hover:bg-ink-100 transition-all hover:gap-4"
                            >
                                {t('btn_whatsapp')}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
                                className="inline-flex items-center gap-2 text-white/60 hover:text-white font-medium text-base transition-colors border border-white/20 hover:border-white/40 px-8 py-4 rounded-full"
                            >
                                {t('btn_talk')}
                            </button>
                        </div>
                    </ScrollReveal>
                </div>
            </ImmersiveSection>

        </main>
    );
};

export default Home;
