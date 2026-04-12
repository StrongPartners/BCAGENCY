import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-end">
            {/* Single static background image */}
            <img
                src="/marketing-hero-v3.jpg"
                alt="BC Creative Agency"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <div className="container mx-auto px-6 md:px-12 pb-20 md:pb-28 relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight max-w-4xl"
                >
                    {t('hero_headline_1')} {t('hero_headline_accent')} {t('hero_headline_2')}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed"
                >
                    {t('hero_desc')}
                </motion.p>
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                    className="mt-8 bg-white text-ink-900 font-medium px-8 py-4 rounded-full hover:bg-ink-100 transition-colors"
                >
                    {t('hero_cta')}
                </motion.button>
            </div>
        </section>
    );
};

export default Hero;
