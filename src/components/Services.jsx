import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Search, Megaphone, Smartphone, Monitor, Video, Plane, Camera } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SERVICE_ICONS = [Search, Megaphone, Smartphone, Monitor, Video, Plane, Camera];

const Services = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const services = t('services_list');

    return (
        <section id="services" className="relative py-32 md:py-48 bg-white">
            <div className="container mx-auto px-4 md:px-8">
                {/* Section header */}
                <div className="max-w-3xl mb-20 md:mb-24">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-6"
                    >
                        {t('services_eyebrow')}
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-bold text-ink-900 leading-[0.95] tracking-tight"
                    >
                        {t('services_heading_1')}{' '}
                        {t('services_heading_2')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 text-lg md:text-xl text-ink-500 max-w-2xl leading-relaxed"
                    >
                        {t('services_sub')}
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {services.map((service, i) => {
                        const IconComponent = SERVICE_ICONS[i] || Search;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                                onClick={() => service.path && navigate(service.path)}
                                className="group cursor-pointer border-b border-ink-100 py-10 px-2 md:px-6 hover:bg-ink-50 transition-colors"
                            >
                                <div className="flex items-start gap-5">
                                    <IconComponent size={28} className="text-ink-400 shrink-0 mt-1" strokeWidth={1.5} />
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-ink-900 mb-2 tracking-tight">
                                            {service.title}
                                        </h3>
                                        <p className="text-ink-500 leading-relaxed mb-4">
                                            {service.description}
                                        </p>
                                        {service.path && (
                                            <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 group-hover:gap-3 transition-all">
                                                {t('services_see_details')}
                                                <ArrowUpRight size={14} strokeWidth={2} />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
