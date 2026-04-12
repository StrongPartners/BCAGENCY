import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Search, Megaphone, Smartphone, Monitor, Video, Plane, Camera } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/**
 * Services — Modern sleek card grid.
 * Each card takes a tone (brand/coral/mint/sun) and gets a
 * matching soft icon background. Hover lifts the card with shadow.
 */
const TONE_BG  = { brand: 'bg-brand-50',  coral: 'bg-coral-50',  mint: 'bg-mint-50',  sun: 'bg-sun-50'  };
const TONE_ICON = { brand: 'text-brand-600', coral: 'text-coral-600', mint: 'text-mint-600', sun: 'text-sun-600' };
const TONE_TXT = { brand: 'text-brand-600', coral: 'text-coral-600', mint: 'text-mint-600', sun: 'text-sun-600' };

const SERVICE_ICONS = [Search, Megaphone, Smartphone, Monitor, Video, Plane, Camera];

const Services = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const services = t('services_list');

    return (
        <section id="services" className="relative py-24 md:py-32 bg-surface-card overflow-hidden">
            {/* Decorative side strip */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-sun-200 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-mint-200 rounded-full blur-3xl opacity-50" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Section header */}
                <div className="max-w-3xl mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block bg-coral-100 rounded-full px-4 py-1.5 mb-6"
                    >
                        <span className="font-black text-ink-900 text-xs uppercase tracking-wider">{t('services_eyebrow')}</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-black text-ink-900 leading-[0.95] tracking-tight"
                    >
                        {t('services_heading_1')}{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10">{t('services_heading_2')}</span>
                            <span className="absolute left-0 right-0 bottom-1 h-4 bg-sun-300 -z-0 rounded-sm" />
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 text-lg md:text-xl text-ink-700 font-medium max-w-2xl"
                    >
                        {t('services_sub')}
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, i) => {
                        const tone = service.tone || 'brand';
                        const IconComponent = SERVICE_ICONS[i] || Search;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                whileHover={{ y: -8 }}
                                onClick={() => service.path && navigate(service.path)}
                                className="group relative cursor-pointer bg-surface-card rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 transition-all"
                            >
                                {/* Icon badge */}
                                <div className={`w-14 h-14 ${TONE_BG[tone]} rounded-xl flex items-center justify-center mb-5`}>
                                    <IconComponent size={24} className={TONE_ICON[tone]} strokeWidth={2} />
                                </div>

                                <h3 className="text-2xl md:text-3xl font-black text-ink-900 mb-3 tracking-tight leading-tight">
                                    {service.title}
                                </h3>
                                <p className="text-ink-700 font-medium leading-relaxed mb-6">
                                    {service.description}
                                </p>

                                {service.path && (
                                    <div className={`inline-flex items-center gap-2 font-black text-sm ${TONE_TXT[tone]} group-hover:gap-3 transition-all`}>
                                        {t('services_see_details')}
                                        <ArrowUpRight size={16} strokeWidth={3} />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
