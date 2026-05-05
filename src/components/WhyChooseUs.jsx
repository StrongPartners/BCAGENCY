import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const AnimatedNumber = ({ value, suffix = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [display, setDisplay] = useState('0');

    useEffect(() => {
        if (!isInView) return;
        const num = parseInt(value.replace(/[^0-9]/g, ''));
        if (isNaN(num)) { setDisplay(value); return; }

        const duration = 1500;
        const steps = 40;
        const stepTime = duration / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += num / steps;
            if (current >= num) {
                setDisplay(value);
                clearInterval(timer);
            } else {
                setDisplay(Math.floor(current) + suffix);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [isInView, value, suffix]);

    return <span ref={ref}>{isInView ? display : '0'}</span>;
};

const Approach = () => {
    const { t } = useLanguage();
    const stats = t('stats');

    return (
        <section className="py-24 md:py-32 bg-ink-50 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <p className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-6">
                        {t('approach_eyebrow')}
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-ink-900 leading-tight tracking-tight mb-6">
                        {t('approach_heading_1')} {t('approach_heading_2')}
                    </h2>
                    <p className="text-lg text-ink-500 leading-relaxed">
                        {t('approach_sub')}
                    </p>
                </motion.div>

                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-ink-900 mb-1">
                                <AnimatedNumber value={stat.value} suffix={stat.value.includes('+') ? '+' : ''} />
                            </div>
                            <div className="text-sm text-ink-500">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Process steps */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
                >
                    {t('approach_steps').map((step, i) => (
                        <div key={i} className="relative group">
                            {i < 3 && (
                                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-ink-200 -z-0" />
                            )}
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full bg-white border-2 border-ink-200 group-hover:border-brand-600 flex items-center justify-center mb-4 transition-colors duration-300">
                                    <span className="text-lg font-bold text-ink-400 group-hover:text-brand-600 transition-colors duration-300">
                                        {step.number}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-ink-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-ink-500 leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Approach;
