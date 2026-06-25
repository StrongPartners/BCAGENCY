import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import useSEO from '../hooks/useSEO';
import FAQ from './FAQ';
import { useLanguage } from '../context/LanguageContext';
import { buildOrganizationSchema, buildWebSiteSchema } from '../lib/geoSchemas';

/* ─── Lenis smooth scroll ─── */
const useLenis = () => {
    useEffect(() => {
        const lenis = new Lenis({ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);
};

/* ─── Preloader ─── */
const Preloader = ({ onComplete }) => (
    <motion.div
        className="fixed inset-0 z-[9999] bg-ink-900 flex items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
    >
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onAnimationComplete={() => setTimeout(onComplete, 800)}
            className="text-center"
        >
            <img src="/logo-icon.png" alt="" className="w-14 h-14 mx-auto mb-4" />
            <motion.div className="w-28 h-0.5 bg-white/10 rounded-full overflow-hidden mx-auto">
                <motion.div
                    className="h-full bg-secondary-300"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />
            </motion.div>
        </motion.div>
    </motion.div>
);

/* ─── Cursor spotlight ─── */
const CursorSpotlight = () => {
    const [pos, setPos] = useState({ x: -100, y: -100 });

    useEffect(() => {
        const move = (e) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, []);

    return (
        <div
            className="fixed pointer-events-none z-[100] hidden md:block"
            style={{
                left: pos.x - 150,
                top: pos.y - 150,
                width: 300,
                height: 300,
                background: 'radial-gradient(circle, rgba(168,208,224,0.06) 0%, transparent 70%)',
                transition: 'left 0.15s ease-out, top 0.15s ease-out',
            }}
        />
    );
};

/* ─── Scroll progress bar ─── */
const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-secondary-300 origin-left z-[60]"
            style={{ scaleX: scrollYProgress }}
        />
    );
};

/* ─── Zoom-through section ─── */
const ZoomSection = ({ children, bg, video, overlay = 'bg-black/40', className = '' }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.92, 0.98, 1, 1.05, 1.15]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.35, 0.7, 0.9], [0, 1, 1, 1, 0]);

    return (
        <div ref={ref} className="h-[180vh] relative bg-ink-900">
            <div className="sticky top-0 h-screen overflow-hidden bg-ink-900">
                <motion.div
                    style={{ scale, opacity }}
                    className={`w-full h-full relative overflow-hidden ${className}`}
                >
                    {video ? (
                        <video autoPlay loop muted playsInline className="absolute inset-[-5%] w-[110%] h-[110%] object-cover">
                            <source src={video} type="video/mp4" />
                        </video>
                    ) : bg ? (
                        <img src={bg} alt="" className="absolute inset-[-5%] w-[110%] h-[110%] object-cover" />
                    ) : null}
                    <div className={`absolute inset-0 ${overlay}`} />
                    <div className="relative z-10 flex items-center justify-center h-full">
                        {children}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

/* ─── Helpers ─── */
const ScrollText = ({ children, className = '', delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

const Marquee = ({ items }) => (
    <div className="bg-ink-900 overflow-hidden py-5 border-y border-white/5">
        <div className="flex animate-marquee whitespace-nowrap">
            {[...items, ...items].map((item, i) => (
                <span key={i} className="mx-8 text-base md:text-lg font-bold text-white/15 uppercase tracking-widest">
                    {item} <span className="text-secondary-300/30 mx-4">·</span>
                </span>
            ))}
        </div>
    </div>
);

const AnimatedNumber = ({ value, suffix = '' }) => {
    const ref = useRef(null);
    const [display, setDisplay] = useState('0');
    const started = useRef(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                const num = parseInt(value.replace(/[^0-9]/g, ''));
                if (isNaN(num)) { setDisplay(value); return; }
                let current = 0;
                const timer = setInterval(() => {
                    current += num / 25;
                    if (current >= num) { setDisplay(value); clearInterval(timer); }
                    else setDisplay(Math.floor(current) + suffix);
                }, 40);
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, suffix]);
    return <span ref={ref}>{display}</span>;
};

/* ═══════════════════════════════════════════ */

const Home = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    useLenis();

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
        <>
            {/* Preloader */}
            <AnimatePresence>
                {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
            </AnimatePresence>

            {/* Cursor spotlight */}
            <CursorSpotlight />

            {/* Scroll progress */}
            <ScrollProgress />

            <main className="bg-ink-900">

                {/* ═══ 1. HERO ═══ */}
                <section className="relative min-h-screen flex items-center overflow-hidden bg-ink-900">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 animate-gradient" style={{
                        background: 'linear-gradient(135deg, #0c1224 0%, #1B2A5C 25%, #111a35 50%, #162247 75%, #0c1224 100%)',
                        backgroundSize: '400% 400%',
                    }} />

                    {/* Video overlay (may not load on all hosts) */}
                    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay">
                        <source src="/hero-bg.mp4" type="video/mp4" />
                    </video>

                    {/* Animated grid lines */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `linear-gradient(rgba(168,208,224,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,208,224,0.3) 1px, transparent 1px)`,
                        backgroundSize: '80px 80px',
                    }} />

                    {/* Floating orbs */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{ x: [0, 100, -50, 0], y: [0, -80, 40, 0], scale: [1, 1.3, 0.9, 1] }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[100px]"
                        />
                        <motion.div
                            animate={{ x: [0, -80, 60, 0], y: [0, 60, -40, 0], scale: [1, 0.8, 1.2, 1] }}
                            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                            className="absolute bottom-1/4 left-1/6 w-[400px] h-[400px] bg-accent-500/15 rounded-full blur-[80px]"
                        />
                        <motion.div
                            animate={{ x: [0, 50, -30, 0], y: [0, -50, 80, 0] }}
                            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                            className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-secondary-300/10 rounded-full blur-[60px]"
                        />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-900" />

                    {/* Content */}
                    <div className="container mx-auto px-6 md:px-12 relative z-10">
                        <div className="max-w-5xl">
                            <motion.p
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-white/40 mb-8"
                            >
                                BC Creative Agency · Girne, KKTC
                            </motion.p>

                            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold text-white leading-[0.9] tracking-tighter">
                                {/* Word by word stagger */}
                                {t('hero_headline_1').split(' ').map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 80, rotateX: -90 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        transition={{ duration: 0.8, delay: 0.7 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                        className="inline-block mr-[0.25em]"
                                        style={{ perspective: '500px' }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                                {' '}
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                                    className="italic font-light text-secondary-300 inline-block"
                                >
                                    {t('hero_headline_accent')}
                                </motion.span>
                                <br />
                                {t('hero_headline_2').split(' ').map((word, i) => (
                                    <motion.span
                                        key={`r2-${i}`}
                                        initial={{ opacity: 0, y: 80, rotateX: -90 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        transition={{ duration: 0.8, delay: 1.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                        className="inline-block mr-[0.25em]"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1.6 }}
                                className="mt-10 text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed"
                            >
                                {t('hero_desc')}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.9 }}
                                className="mt-12 flex flex-wrap items-center gap-6"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(168,208,224,0.3)' }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => window.open('https://wa.me/905488321919', '_blank')}
                                    className="group inline-flex items-center gap-3 bg-white text-ink-900 font-medium text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-full hover:bg-secondary-300 transition-colors duration-300"
                                >
                                    {t('hero_cta')}
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="inline-flex items-center gap-2 text-white/40 hover:text-white font-medium text-sm transition-colors border border-white/15 hover:border-white/30 px-6 py-3 rounded-full"
                                >
                                    {t('hero_cta_secondary')}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 5v14M5 12l7 7 7-7" />
                                    </svg>
                                </motion.button>
                            </motion.div>
                        </div>

                        {/* Bottom meta */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.2, duration: 1 }}
                            className="absolute bottom-8 right-8 hidden md:flex items-center gap-6 text-white/20 text-xs font-medium uppercase tracking-widest"
                        >
                            <span>EST. 2017</span>
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: 48 }}
                                transition={{ delay: 2.5, duration: 0.8 }}
                                className="h-px bg-white/15 block"
                            />
                            <span>Girne, KKTC</span>
                        </motion.div>
                    </div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        >
                            <div className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-1.5">
                                <motion.div
                                    className="w-1 h-1 bg-secondary-300/60 rounded-full"
                                    animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ═══ MARQUEE ═══ */}
                <Marquee items={bannerItems} />

                {/* ═══ 2. SERVICES ═══ */}
                <ZoomSection video="/bg-ink.mp4" bg="/parallax-ink.webp" overlay="bg-ink-900/75">
                    <div className="container mx-auto px-6 md:px-12 py-16">
                        <ScrollText className="max-w-3xl mb-12">
                            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">{t('services_eyebrow')}</p>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight">
                                {t('services_heading_1')}{' '}
                                <span className="text-secondary-300">{t('services_heading_2')}</span>
                            </h2>
                        </ScrollText>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {services.map((item, i) => (
                                <ScrollText key={i} delay={i * 0.08}>
                                    <motion.div
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        onClick={() => { navigate(item.path); window.scrollTo(0, 0); }}
                                        className="group cursor-pointer p-7 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-secondary-300/30 transition-all duration-500"
                                    >
                                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-white/40 leading-relaxed mb-4 text-sm">{item.description}</p>
                                        <span className="inline-flex items-center gap-2 text-secondary-300 text-sm font-medium group-hover:gap-3 transition-all">
                                            {t('services_see_details')}
                                        </span>
                                    </motion.div>
                                </ScrollText>
                            ))}
                        </div>
                    </div>
                </ZoomSection>

                {/* ═══ 3. STATS ═══ */}
                <ZoomSection video="/bg-light.mp4" bg="/parallax-light.webp" overlay="bg-ink-900/70">
                    <div className="container mx-auto px-6 md:px-12 py-16">
                        <ScrollText className="text-center mb-16">
                            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">{t('stats_heading')}</p>
                            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
                                {t('approach_heading_1')} {t('approach_heading_2')}
                            </h2>
                            <p className="mt-4 text-lg text-white/40 max-w-2xl mx-auto">{t('approach_sub')}</p>
                        </ScrollText>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
                            {stats.map((stat, i) => (
                                <ScrollText key={i} delay={i * 0.08} className="text-center">
                                    <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                                        <AnimatedNumber value={stat.value} suffix={stat.value.includes('+') ? '+' : ''} />
                                    </div>
                                    <div className="text-sm text-white/40">{stat.label}</div>
                                </ScrollText>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                            {steps.map((step, i) => (
                                <ScrollText key={i} delay={i * 0.1}>
                                    <motion.div whileHover={{ y: -5 }} className="text-center group">
                                        <motion.div
                                            whileHover={{ rotate: 90 }}
                                            className="w-14 h-14 mx-auto rounded-xl border-2 border-white/15 group-hover:border-secondary-300/50 flex items-center justify-center mb-3 transition-colors"
                                        >
                                            <span className="text-base font-bold text-white/30 group-hover:text-secondary-300 transition-colors">{step.number}</span>
                                        </motion.div>
                                        <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                                        <p className="text-sm text-white/35 leading-relaxed">{step.desc}</p>
                                    </motion.div>
                                </ScrollText>
                            ))}
                        </div>
                    </div>
                </ZoomSection>

                {/* ═══ MARQUEE 2 ═══ */}
                <Marquee items={['SEO', 'Google Ads', 'Social Media', 'Web Design', 'Production', 'Drone', 'Photo & Video']} />

                {/* ═══ 4. FAQ ═══ */}
                <section className="relative bg-ink-900 overflow-hidden">
                    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-20">
                        <source src="/bg-powder.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-ink-900/75" />
                    <div className="relative z-10 py-24 md:py-32">
                        <FAQ />
                    </div>
                </section>

                {/* ═══ 5. CTA ═══ */}
                <ZoomSection video="/bg-smoke.mp4" bg="/parallax-smoke.webp" overlay="bg-ink-900/50">
                    <div className="container mx-auto px-6 md:px-12 py-16">
                        <ScrollText className="text-center max-w-3xl mx-auto">
                            <motion.p
                                initial={{ letterSpacing: '0em' }}
                                whileInView={{ letterSpacing: '0.3em' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5 }}
                                className="text-xs font-semibold uppercase text-white/30 mb-6"
                            >
                                Girne, KKTC · EST. 2017
                            </motion.p>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[0.95] tracking-tight">
                                {t('blog_cta_title')}
                            </h2>
                            <p className="text-lg md:text-xl text-white/40 mb-10 leading-relaxed">
                                {t('blog_cta_sub')}
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => window.open('https://wa.me/905488321919', '_blank')}
                                    className="group inline-flex items-center gap-3 bg-white text-ink-900 font-medium text-lg px-10 py-5 rounded-full hover:bg-secondary-300 transition-colors duration-300"
                                >
                                    {t('btn_whatsapp')}
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
                                    className="text-white/50 hover:text-white font-medium text-base transition-all border border-white/20 hover:border-white/40 px-8 py-4 rounded-full"
                                >
                                    {t('btn_talk')}
                                </motion.button>
                            </div>
                        </ScrollText>
                    </div>
                </ZoomSection>

            </main>
        </>
    );
};

export default Home;
