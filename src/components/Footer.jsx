import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const services = t('services_list');

    const go = (path) => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-brand-600 text-white">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="container mx-auto px-4 md:px-8 py-20 md:py-28"
            >

                {/* Columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-1">
                        <button onClick={() => go('/')} className="flex items-center gap-2 group mb-5">
                            <img src="/logo-icon.png" alt="BC" className="h-14 w-auto" />
                            <span className="font-bold text-lg leading-none">
                                BC Creative
                            </span>
                        </button>
                        <p className="text-ink-400 text-sm leading-relaxed mb-6">
                            {t('footer_desc')}
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://www.instagram.com/bccreative.agency/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-ink-700 flex items-center justify-center hover:border-white transition-colors"
                            >
                                <Instagram size={16} className="text-ink-400 hover:text-white" />
                            </a>
                            <a
                                href="https://wa.me/905488755461"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-ink-700 flex items-center justify-center hover:border-white transition-colors"
                            >
                                <Phone size={14} className="text-ink-400" />
                            </a>
                            <a
                                href="mailto:info@bccreative.agency"
                                className="w-10 h-10 rounded-full border border-ink-700 flex items-center justify-center hover:border-white transition-colors"
                            >
                                <Mail size={14} className="text-ink-400" />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-400 mb-5">
                            {t('footer_services_title')}
                        </h3>
                        <ul className="space-y-2.5">
                            {services.map((s, i) => (
                                <li key={i}>
                                    {s.path ? (
                                        <button
                                            onClick={() => go(s.path)}
                                            className="text-ink-400 hover:text-white text-sm transition-colors"
                                        >
                                            {s.title}
                                        </button>
                                    ) : (
                                        <span className="text-ink-400 text-sm">{s.title}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Nav */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-400 mb-5">
                            {t('footer_nav_title')}
                        </h3>
                        <ul className="space-y-2.5">
                            <li><button onClick={() => go('/')} className="text-ink-400 hover:text-white text-sm transition-colors">{t('nav_home')}</button></li>
                            <li><button onClick={() => go('/about')} className="text-ink-400 hover:text-white text-sm transition-colors">{t('nav_about')}</button></li>
                            <li><button onClick={() => go('/blog')} className="text-ink-400 hover:text-white text-sm transition-colors">{t('nav_blog')}</button></li>
                            <li><button onClick={() => go('/contact')} className="text-ink-400 hover:text-white text-sm transition-colors">{t('nav_contact')}</button></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-400 mb-5">
                            {t('footer_contact_title')}
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-2.5 text-ink-400 text-sm leading-relaxed">
                                <MapPin size={16} className="text-ink-500 shrink-0 mt-0.5" />
                                <a
                                    href={t('contact_map_url')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    {t('footer_address')}
                                </a>
                            </li>
                            <li className="flex items-center gap-2.5 text-ink-400 text-sm">
                                <Phone size={16} className="text-ink-500 shrink-0" />
                                <a href="tel:+905488755461" className="hover:text-white transition-colors">+90 548 875 54 61</a>
                            </li>
                            <li className="flex items-center gap-2.5 text-ink-400 text-sm">
                                <Mail size={16} className="text-ink-500 shrink-0" />
                                <a href="mailto:info@bccreative.agency" className="hover:text-white transition-colors">info@bccreative.agency</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom strip */}
                <div className="mt-16 pt-8 border-t border-ink-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-500">
                    <div>&copy; 2017 &ndash; 2026 BC Creative Agency. {t('footer_rights')}</div>
                    <div>{t('footer_made_with')}</div>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
