import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

/**
 * Approach section — "how we work" 01-04 process steps.
 * Re-uses the WhyChooseUs.jsx filename to preserve existing imports.
 * Creative Playground styling: tilted sticker cards, colorful borders.
 */
const TONE_BG     = { brand: 'bg-brand-100',  coral: 'bg-coral-100',  mint: 'bg-mint-100',  sun: 'bg-sun-100'  };
const TONE_NUMBER = { brand: 'text-brand-600', coral: 'text-coral-500', mint: 'text-mint-500', sun: 'text-sun-500' };
const TONE_SHADOW = {
    brand: 'shadow-sticker-brand',
    coral: 'shadow-sticker-coral',
    mint:  'shadow-sticker-mint',
    sun:   'shadow-sticker-sun',
};

const Approach = () => {
    const { t } = useLanguage();
    const steps = t('approach_steps');

    return (
        <section className="relative py-24 md:py-32 bg-ink-50 overflow-hidden">
            {/* Decorative accents */}
            <div className="absolute top-20 left-10 w-40 h-40 bg-coral-200 rounded-full blur-3xl opacity-40" />
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-brand-200 rounded-full blur-3xl opacity-40" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Header */}
                <div className="max-w-3xl mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block bg-mint-200 border-2 border-ink-900 rounded-full px-4 py-1.5 mb-6 rotate-pos-1"
                    >
                        <span className="font-black text-ink-900 text-xs uppercase tracking-wider">{t('approach_eyebrow')}</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black text-ink-900 leading-[0.95] tracking-tight"
                    >
                        {t('approach_heading_1')}{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10">{t('approach_heading_2')}</span>
                            <span className="absolute left-0 right-0 bottom-1 h-4 bg-coral-300 -z-0 rounded-sm" />
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-6 text-lg md:text-xl text-ink-700 font-medium max-w-2xl"
                    >
                        {t('approach_sub')}
                    </motion.p>
                </div>

                {/* Steps grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {steps.map((step, i) => {
                        const tiltClasses = ['rotate-neg-2', 'rotate-pos-1', 'rotate-neg-1', 'rotate-pos-2'];
                        const tilt = tiltClasses[i % tiltClasses.length];
                        const tone = step.tone || 'brand';

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -6, rotate: 0 }}
                                className={`group bg-white border-2 border-ink-900 rounded-3xl p-8 ${TONE_SHADOW[tone]} ${tilt} transition-transform`}
                            >
                                <div className={`w-14 h-14 ${TONE_BG[tone]} border-2 border-ink-900 rounded-xl flex items-center justify-center font-black text-lg text-ink-900 mb-6`}>
                                    {step.number}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-ink-900 mb-4 leading-tight">
                                    {step.title}
                                </h3>
                                <p className="text-ink-700 font-medium leading-relaxed">
                                    {step.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Stats */}
                <div className="mt-24">
                    <h3 className="text-center text-2xl md:text-3xl font-black text-ink-900 mb-10 tracking-tight">
                        {t('stats_heading')}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {t('stats').map((stat, i) => {
                            const tones = ['brand', 'coral', 'mint', 'sun'];
                            const tone = tones[i % tones.length];
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="text-center bg-white border-2 border-ink-900 rounded-3xl p-6 shadow-sticker"
                                >
                                    <div className={`text-5xl md:text-6xl font-black ${TONE_NUMBER[tone]} mb-2 leading-none`}>
                                        {stat.value}
                                    </div>
                                    <div className="text-sm md:text-base font-bold text-ink-700">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Approach;
