import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import FAQ from './FAQ';
import { useLanguage } from '../context/LanguageContext';
import { buildOrganizationSchema, buildWebSiteSchema } from '../lib/geoSchemas';

/* ─── Zoom-through section ───
   As you scroll, the section scales from small (far) → fills screen → zooms past you.
   Creates the "diving into the screen" illusion. */
const ZoomSection = ({ children, bg, video, overlay = 'bg-black/40', className = '' }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.6, 0.85, 1, 1.15, 1.4]);
    const opacity = useTransform(scrollYProgress, [0, 0.25, 0.4, 0.65, 0.85], [0, 1, 1, 1, 0]);
    const borderRadius = useTransform(scrollYProgress, [0, 0.3, 0.5], ['24px', '12px', '0px']);
    const z = useTransform(scrollYProgress, [0, 0.5, 1], [0, 50, 100]);

    return (
        <div ref={ref} className="h-[200vh] relative" style={{ perspective: '1200px' }}>
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ scale, opacity, borderRadius, z }}
                    className={`w-full h-full relative overflow-hidden ${className}`}
                >
                    {video ? (
                        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                            <source src={video} type="video/mp4" />
                        </video>
                    ) : bg ? (
                        <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover" />
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

/* ─── Text that reveals as you scroll into a section ─── */
const ScrollText = ({ children, className = '', delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

/* ─── Animated counter ─── */
const AnimatedNumber = ({ value, suffix = '' }) => {
    const ref = useRef(null);
    const [display, setDisplay] = React.useState('0');
    const started = useRef(false);

    React.useEffect(() => {
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

/* ─── Marquee ─── */
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

            {/* ═══ 1. HERO — Zoom-through with video ═══ */}
            <ZoomSection video="/hero-bg.mp4" overlay="bg-gradient-to-b from-ink-900/50 via-ink-900/20 to-ink-900">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-5xl">
                        <ScrollText>
                            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-white/40 mb-8">
                                BC Creative Agency · Girne, KKTC
                            </p>
                        </ScrollText>

                        <ScrollText delay={0.1}>
                            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold text-white leading-[0.9] tracking-tighter">
                                {t('hero_headline_1')}{' '}
                                <span className="italic font-light text-secondary-300">{t('hero_headline_accent')}</span>
                                <br />
                                {t('hero_headline_2')}
                            </h1>
                        </ScrollText>

                        <ScrollText delay={0.2}>
                            <p className="mt-10 text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed">
                                {t('hero_desc')}
                            </p>
                        </ScrollText>

                        <ScrollText delay={0.3}>
                            <div className="mt-12 flex flex-wrap items-center gap-6">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                                    className="group inline-flex items-center gap-3 bg-white text-ink-900 font-medium text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-full hover:bg-secondary-300 transition-colors duration-300"
                                >
                                    {t('hero_cta')}
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </motion.button>
                            </div>
                        </ScrollText>
                    </div>

                    <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-6 text-white/30 text-xs font-medium uppercase tracking-widest">
                        <span>EST. 2017</span>
                        <span className="w-12 h-px bg-white/15" />
                        <span>Girne, KKTC</span>
                    </div>
                </div>
            </ZoomSection>

            {/* ═══ MARQUEE ═══ */}
            <Marquee items={bannerItems} />

            {/* ═══ 2. SERVICES — Zoom into ink ═══ */}
            <ZoomSection video="/bg-ink.mp4" bg="/parallax-ink.webp" overlay="bg-ink-900/75">
                <div className="container mx-auto px-6 md:px-12 py-16">
                    <ScrollText className="max-w-3xl mb-12">
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                            {t('services_eyebrow')}
                        </p>
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

            {/* ═══ 3. STATS — Zoom into light ═══ */}
            <ZoomSection video="/bg-light.mp4" bg="/parallax-light.webp" overlay="bg-ink-900/70">
                <div className="container mx-auto px-6 md:px-12 py-16">
                    <ScrollText className="text-center mb-16">
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                            {t('stats_heading')}
                        </p>
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

            {/* ═══ 4. FAQ — Static dark section (too long for zoom) ═══ */}
            <section className="relative bg-ink-900 overflow-hidden">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-20">
                    <source src="/bg-powder.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-ink-900/75" />
                <div className="relative z-10 py-24 md:py-32">
                    <FAQ />
                </div>
            </section>

            {/* ═══ 5. CTA — Zoom into smoke ═══ */}
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
                                onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                                className="group inline-flex items-center gap-3 bg-white text-ink-900 font-medium text-lg px-10 py-5 rounded-full hover:bg-secondary-300 transition-colors duration-300"
                            >
                                {t('btn_whatsapp')}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
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
    );
};

export default Home;
