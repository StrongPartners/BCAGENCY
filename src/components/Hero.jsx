import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden pt-24 pb-16">
            <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-5xl">
                    {/* Big headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-ink-900 leading-[0.9] tracking-tighter"
                    >
                        {t('hero_headline_1')}{' '}
                        {t('hero_headline_accent')}
                        <br />
                        {t('hero_headline_2')}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-10 text-xl text-ink-500 leading-relaxed max-w-2xl"
                    >
                        {t('hero_desc')}
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                    >
                        <button
                            onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                            className="bg-ink-900 text-white font-medium text-lg px-8 py-4 rounded-full hover:bg-ink-800 transition-colors"
                        >
                            {t('hero_cta')}
                        </button>
                        <button
                            onClick={() => {
                                const el = document.getElementById('services');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-2 font-medium text-ink-500 hover:text-ink-900 transition-colors"
                        >
                            {t('hero_cta_secondary')}
                            <ArrowDown size={18} strokeWidth={2} />
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
