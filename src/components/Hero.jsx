import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-end bg-ink-900 overflow-hidden">
            {/* Background video */}
            <video
                autoPlay loop muted playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-40"
            >
                <source src="/hero-bg.mp4" type="video/mp4" />
            </video>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent" />

            {/* Content — positioned at bottom */}
            <div className="container mx-auto px-4 md:px-8 pb-20 md:pb-32 relative z-10">
                <div className="max-w-5xl">
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
                        className="mt-8 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl"
                    >
                        {t('hero_desc')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                    >
                        <button
                            onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                            className="bg-white text-ink-900 font-medium text-lg px-8 py-4 rounded-full hover:bg-ink-100 transition-colors"
                        >
                            {t('hero_cta')}
                        </button>
                        <button
                            onClick={() => {
                                const el = document.getElementById('services');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-2 font-medium text-white/60 hover:text-white transition-colors"
                        >
                            {t('hero_cta_secondary')}
                            <ArrowDown size={18} strokeWidth={2} />
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ArrowDown size={24} strokeWidth={1.5} />
            </motion.div>
        </section>
    );
};

export default Hero;
