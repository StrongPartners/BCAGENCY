import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import FAQ from './FAQ';
import { useLanguage } from '../context/LanguageContext';
import { buildOrganizationSchema, buildWebSiteSchema } from '../lib/geoSchemas';

/* ─── Parallax hook ─── */
const useParallax = (ref, speed = 0.5) => {
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    return {
        y: useTransform(scrollYProgress, [0, 1], [`${speed * 50}%`, `-${speed * 50}%`]),
        opacity: useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]),
        scale: useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]),
    };
};

/* ─── Immersive section with video or image bg ─── */
const ImmersiveSection = ({ bg, video, overlay = 'bg-black/40', children, className = '' }) => {
    const ref = useRef(null);
    const { y, scale } = useParallax(ref, 0.3);

    return (
        <section ref={ref} className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
            {video ? (
                <motion.div className="absolute inset-0 w-full h-[120%] -top-[10%]" style={{ y }}>
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                        <source src={video} type="video/mp4" />
                    </video>
                </motion.div>
            ) : (
                <motion.div className="absolute inset-0 w-full h-[120%] -top-[10%]" style={{ y, scale }}>
                    <img src={bg} alt="" className="w-full h-full object-cover" loading="lazy" />
                </motion.div>
            )}
            <div className={`absolute inset-0 ${overlay}`} />
            {/* Floating orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-600/20 rounded-full animate-pulse-glow animate-float" />
                <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-secondary-300/15 rounded-full animate-pulse-glow animate-float-delay" />
            </div>
            <div className="relative z-10 w-full">{children}</div>
        </section>
    );
};

/* ─── Split text: word-by-word reveal ─── */
const SplitText = ({ children, className = '', delay = 0 }) => {
    const words = String(children).split(' ');
    return (
        <span className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block mr-[0.3em]"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

/* ─── Scroll reveal ─── */
const ScrollReveal = ({ children, delay = 0, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

/* ─── Marquee ─── */
const Marquee = ({ items }) => (
    <div className="overflow-hidden py-6 border-y border-white/10">
        <div className="flex animate-marquee whitespace-nowrap">
            {[...items, ...items].map((item, i) => (
                <span key={i} className="mx-8 text-lg md:text-xl font-bold text-white/20 uppercase tracking-widest">
                    {item}
                </span>
            ))}
        </div>
    </div>
);

/* ─── Animated counter ─── */
const AnimatedNumber = ({ value, suffix = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [display, setDisplay] = React.useState('0');

    React.useEffect(() => {
        if (!isInView) return;
        const num = parseInt(value.replace(/[^0-9]/g, ''));
        if (isNaN(num)) { setDisplay(value); return; }
        let current = 0;
        const timer = setInterval(() => {
            current += num / 25;
            if (current >= num) { setDisplay(value); clearInterval(timer); }
            else setDisplay(Math.floor(current) + suffix);
        }, 40);
        return () => clearInterval(timer);
    }, [isInView, value, suffix]);

    return <span ref={ref}>{display}</span>;
};

/* ═══════════════════════════════════════════ */

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
    const bannerItems = t('banner_services');

    return (
        <main className="bg-ink-900">

            {/* ═══ 1. HERO ═══ */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-ink-900">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
                    <source src="/hero-bg.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-ink-900/50 via-transparent to-ink-900" />

                {/* Floating accent orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-brand-600/20 rounded-full animate-pulse-glow animate-float-slow" />
                    <div className="absolute bottom-40 left-10 w-72 h-72 bg-accent-500/10 rounded-full animate-pulse-glow animate-float-delay" />
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="max-w-5xl">
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-white/40 mb-8"
                        >
                            BC Creative Agency · Girne, KKTC
                        </motion.p>

                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold text-white leading-[0.9] tracking-tighter">
                            <SplitText delay={0.3}>
                                {t('hero_headline_1')}
                            </SplitText>
                            {' '}
                            <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="italic font-light text-secondary-300"
                            >
                                {t('hero_headline_accent')}
                            </motion.span>
                            <br />
                            <SplitText delay={0.8}>
                                {t('hero_headline_2')}
                            </SplitText>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="mt-10 text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed"
                        >
                            {t('hero_desc')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.5 }}
                            className="mt-12 flex flex-wrap items-center gap-6"
                        >
                            <button
                                onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                                className="group inline-flex items-center gap-3 bg-white text-ink-900 font-medium text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-full hover:bg-secondary-300 transition-all duration-300 hover:gap-4"
                            >
                                {t('hero_cta')}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                                className="inline-flex items-center gap-2 text-white/40 hover:text-white font-medium text-sm transition-colors"
                            >
                                {t('hero_cta_secondary')}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 5v14M5 12l7 7 7-7" />
                                </svg>
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                >
                    <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5">
                        <motion.div
                            className="w-1.5 h-1.5 bg-white/50 rounded-full"
                            animate={{ y: [0, 16, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* ═══ MARQUEE ═══ */}
            <Marquee items={bannerItems} />

            {/* ═══ 2. SERVICES ═══ */}
            <ImmersiveSection id="services" video="/bg-ink.mp4" bg="/parallax-ink.webp" overlay="bg-ink-900/75">
                <div className="container mx-auto px-6 md:px-12 py-24 md:py-32">
                    <ScrollReveal className="max-w-3xl mb-16">
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                            {t('services_eyebrow')}
                        </p>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight">
                            <SplitText>{t('services_heading_1')}</SplitText>{' '}
                            <span className="text-secondary-300">
                                <SplitText delay={0.3}>{t('services_heading_2')}</SplitText>
                            </span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {services.map((item, i) => (
                            <ScrollReveal key={i} delay={i * 0.12}>
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    onClick={() => { navigate(item.path); window.scrollTo(0, 0); }}
                                    className="group cursor-pointer p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-secondary-300/30 transition-all duration-500 relative overflow-hidden"
                                >
                                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary-300/5 rounded-full group-hover:bg-secondary-300/10 transition-colors duration-500" />
                                    <h3 className="text-2xl font-bold text-white mb-3 relative">{item.title}</h3>
                                    <p className="text-white/40 leading-relaxed mb-6 text-sm relative">{item.description}</p>
                                    <span className="inline-flex items-center gap-2 text-secondary-300 text-sm font-medium group-hover:gap-3 transition-all relative">
                                        {t('services_see_details')}
                                    </span>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </ImmersiveSection>

            {/* ═══ 3. STATS + PROCESS ═══ */}
            <ImmersiveSection video="/bg-light.mp4" bg="/parallax-light.webp" overlay="bg-ink-900/70">
                <div className="container mx-auto px-6 md:px-12 py-24 md:py-32">
                    <ScrollReveal className="text-center mb-20">
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                            {t('stats_heading')}
                        </p>
                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
                            <SplitText>{t('approach_heading_1')} {t('approach_heading_2')}</SplitText>
                        </h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-4 text-lg text-white/40 max-w-2xl mx-auto"
                        >
                            {t('approach_sub')}
                        </motion.p>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-24">
                        {stats.map((stat, i) => (
                            <ScrollReveal key={i} delay={i * 0.1} className="text-center">
                                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                                    <AnimatedNumber value={stat.value} suffix={stat.value.includes('+') ? '+' : ''} />
                                </div>
                                <div className="text-sm text-white/40">{stat.label}</div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Process steps with animated connector */}
                    <div className="relative max-w-5xl mx-auto">
                        <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {steps.map((step, i) => (
                                <ScrollReveal key={i} delay={i * 0.15}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="relative group text-center"
                                    >
                                        <motion.div
                                            whileHover={{ rotate: 90, borderColor: 'rgba(168,208,224,0.6)' }}
                                            transition={{ type: 'spring', stiffness: 200 }}
                                            className="w-16 h-16 mx-auto rounded-xl border-2 border-white/15 flex items-center justify-center mb-4"
                                        >
                                            <span className="text-lg font-bold text-white/30 group-hover:text-secondary-300 transition-colors">
                                                {step.number}
                                            </span>
                                        </motion.div>
                                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                        <p className="text-sm text-white/35 leading-relaxed">{step.desc}</p>
                                    </motion.div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </ImmersiveSection>

            {/* ═══ MARQUEE 2 ═══ */}
            <Marquee items={['SEO', 'Google Ads', 'Social Media', 'Web Design', 'Production', 'Drone', 'Photo & Video']} />

            {/* ═══ 4. FAQ ═══ */}
            <ImmersiveSection video="/bg-powder.mp4" bg="/parallax-powder.webp" overlay="bg-ink-900/80" className="!min-h-0">
                <div className="py-24 md:py-32">
                    <FAQ />
                </div>
            </ImmersiveSection>

            {/* ═══ 5. CTA ═══ */}
            <ImmersiveSection video="/bg-smoke.mp4" bg="/parallax-smoke.webp" overlay="bg-ink-900/50">
                <div className="container mx-auto px-6 md:px-12 py-32 md:py-48">
                    <ScrollReveal className="text-center max-w-3xl mx-auto">
                        <motion.p
                            initial={{ opacity: 0, letterSpacing: '0em' }}
                            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="text-xs font-semibold uppercase text-white/30 mb-6"
                        >
                            Girne, KKTC · EST. 2017
                        </motion.p>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[0.95] tracking-tight">
                            <SplitText>{t('blog_cta_title')}</SplitText>
                        </h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="text-lg md:text-xl text-white/40 mb-10 leading-relaxed"
                        >
                            {t('blog_cta_sub')}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                                className="group inline-flex items-center gap-3 bg-white text-ink-900 font-medium text-lg px-10 py-5 rounded-full hover:bg-secondary-300 transition-colors duration-300 hover:gap-4"
                            >
                                {t('btn_whatsapp')}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
                                className="inline-flex items-center gap-2 text-white/50 hover:text-white font-medium text-base transition-all border border-white/20 hover:border-white/40 px-8 py-4 rounded-full"
                            >
                                {t('btn_talk')}
                            </motion.button>
                        </motion.div>
                    </ScrollReveal>
                </div>
            </ImmersiveSection>

        </main>
    );
};

export default Home;
