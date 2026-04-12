import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const slides = [
    { image: '/marketing-hero-v3.jpg', path: '/hizmetler/seo' },
    { image: '/web-design-hero.jpg', path: '/hizmetler/web-tasarim' },
    { image: '/social-media-hero.jpg', path: '/hizmetler/sosyal-medya' },
    { image: '/google-ads-hero.jpg', path: '/hizmetler/google-ads' },
    { image: '/marketing-hero-v2.jpg', path: '/hizmetler/produksiyon' },
];

const Hero = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const titles = t('hero_rotating');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-screen flex items-end bg-ink-900 overflow-hidden">
            {/* Background image carousel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0"
                >
                    <img
                        src={slides[current].image}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-ink-900/20" />

            {/* Content */}
            <div className="container mx-auto px-4 md:px-8 pb-16 md:pb-24 relative z-10">
                <div className="max-w-5xl">
                    {/* Rotating service label */}
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={current}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-6"
                        >
                            {titles[current % titles.length]}
                        </motion.p>
                    </AnimatePresence>

                    <motion.h1
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-bold text-white leading-[0.9] tracking-tighter"
                    >
                        {t('hero_headline_1')}{' '}
                        {t('hero_headline_accent')}
                        <br />
                        {t('hero_headline_2')}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mt-8 text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl"
                    >
                        {t('hero_desc')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-10 flex items-center gap-6"
                    >
                        <button
                            onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                            className="bg-white text-ink-900 font-medium text-lg px-8 py-4 rounded-full hover:bg-ink-100 transition-colors"
                        >
                            {t('hero_cta')}
                        </button>
                        <button
                            onClick={() => navigate(slides[current].path)}
                            className="inline-flex items-center gap-2 font-medium text-white/60 hover:text-white transition-colors group"
                        >
                            {t('hero_cta_secondary')}
                            <ArrowRight size={18} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>

                {/* Slide indicators */}
                <div className="absolute bottom-16 right-8 md:right-16 flex gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-1 rounded-full transition-all duration-500 ${i === current ? 'w-10 bg-white' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ArrowDown size={20} strokeWidth={1.5} />
            </motion.div>
        </section>
    );
};

export default Hero;
