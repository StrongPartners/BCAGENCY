import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import ColorfulBlobs from './ColorfulBlobs';
import { useLanguage } from '../context/LanguageContext';

/**
 * Hero — Creative Playground hero section.
 * Big playful type + rotating service chip + colorful blobs.
 */
const Hero = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const rotating = t('hero_rotating');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((i) => (i + 1) % rotating.length);
        }, 2500);
        return () => clearInterval(timer);
    }, [rotating.length]);

    return (
        <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-24 pb-16">
            {/* Colorful blobs background */}
            <div className="absolute inset-0 z-0">
                <ColorfulBlobs variant="hero" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="max-w-5xl">
                    {/* Greeting bubble */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                        animate={{ opacity: 1, scale: 1, rotate: -2 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2 mb-6 shadow-lg"
                    >
                        <span className="w-2 h-2 bg-mint-500 rounded-full animate-pulse" />
                        <span className="font-black text-ink-900 text-sm tracking-tight">{t('hero_greet')}</span>
                    </motion.div>

                    {/* Big headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-ink-900 leading-[0.95] tracking-tighter"
                    >
                        {t('hero_headline_1')}{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-gradient-to-r from-brand-600 via-coral-500 to-sun-500 bg-clip-text text-transparent animate-gradient-shift">
                                {t('hero_headline_accent')}
                            </span>
                            <motion.span
                                className="absolute left-0 right-0 bottom-2 h-4 md:h-6 bg-sun-300 -z-0 rounded-sm"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                style={{ transformOrigin: 'left' }}
                            />
                        </span>
                        <br />
                        {t('hero_headline_2')}
                    </motion.h1>

                    {/* Rotating chip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-6 flex items-center gap-3 flex-wrap"
                    >
                        <span className="text-ink-400 font-bold text-base md:text-lg">↳</span>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={rotating[index]}
                                initial={{ opacity: 0, y: 15, rotateX: -90 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                exit={{ opacity: 0, y: -15, rotateX: 90 }}
                                transition={{ duration: 0.35 }}
                                className="inline-flex items-center gap-2 bg-ink-900 text-white px-5 py-2 rounded-full font-black text-base md:text-lg"
                            >
                                {rotating[index]}
                            </motion.span>
                        </AnimatePresence>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-8 text-lg md:text-xl text-ink-700 leading-relaxed max-w-2xl font-medium"
                    >
                        {t('hero_desc')}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                    >
                        <motion.button
                            onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.96 }}
                            className="bg-brand-600 text-white font-black text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow hover:bg-brand-700"
                        >
                            {t('hero_cta')}
                        </motion.button>
                        <motion.button
                            onClick={() => {
                                const el = document.getElementById('services');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center gap-2 font-black text-ink-900 hover:text-brand-600 transition-colors"
                        >
                            <span className="underline decoration-sun-400 decoration-4 underline-offset-4">
                                {t('hero_cta_secondary')}
                            </span>
                            <ArrowDown size={18} strokeWidth={3} />
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-400"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ArrowDown size={24} strokeWidth={2.5} />
            </motion.div>
        </section>
    );
};

export default Hero;
