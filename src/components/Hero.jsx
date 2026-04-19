import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-ink-900">
            {/* Full-bleed video background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60"
            >
                <source src="/hero-bg.mp4" type="video/mp4" />
            </video>

            {/* Gradient overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-ink-900/80 via-ink-900/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-ink-900/30" />

            {/* Content */}
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-5xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-white/60 mb-8"
                    >
                        BC Creative Agency · KKTC
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold text-white leading-[0.9] tracking-tighter"
                    >
                        {t('hero_headline_1')}{' '}
                        <span className="italic font-light">{t('hero_headline_accent')}</span>
                        <br />
                        {t('hero_headline_2')}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="mt-10 text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed"
                    >
                        {t('hero_desc')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
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

                        <button
                            onClick={() => {
                                const el = document.querySelector('section:nth-of-type(2)');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-2 text-white/60 hover:text-white font-medium text-sm transition-colors"
                        >
                            {t('hero_cta_secondary')}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 5v14M5 12l7 7 7-7" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Bottom corner meta */}
            <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-6 text-white/40 text-xs font-medium uppercase tracking-widest z-10">
                <span>EST. 2017</span>
                <span className="w-12 h-px bg-white/20" />
                <span>Girne, KKTC</span>
            </div>
        </section>
    );
};

export default Hero;
