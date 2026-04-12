import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Approach = () => {
    const { t } = useLanguage();
    const steps = t('approach_steps');

    return (
        <section className="relative py-40 md:py-56 bg-white">
            <div className="container mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="max-w-3xl mb-20 md:mb-24">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-6"
                    >
                        {t('approach_eyebrow')}
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold text-ink-900 leading-[0.95] tracking-tight"
                    >
                        {t('approach_heading_1')}{' '}
                        {t('approach_heading_2')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-6 text-lg md:text-xl text-ink-500 max-w-2xl leading-relaxed"
                    >
                        {t('approach_sub')}
                    </motion.p>
                </div>

                {/* Steps grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                            className="relative"
                        >
                            <div className="text-7xl md:text-8xl font-bold text-brand-500 leading-none mb-4">
                                {step.number}
                            </div>
                            <h3 className="text-2xl font-bold text-ink-900 mb-3 leading-tight">
                                {step.title}
                            </h3>
                            <p className="text-ink-500 leading-relaxed">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-32 border-t border-ink-100 pt-16">
                    <h3 className="text-center text-2xl md:text-3xl font-bold text-ink-900 mb-12 tracking-tight">
                        {t('stats_heading')}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {t('stats').map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="text-center"
                            >
                                <div className="text-5xl md:text-6xl font-bold text-ink-900 mb-2 leading-none">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-medium text-ink-500">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Approach;
