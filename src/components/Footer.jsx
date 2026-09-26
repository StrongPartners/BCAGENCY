import React, { lazy, Suspense } from 'react';
import { getShape } from './hero/voxelShapes';
import { SERVICES } from './shared/services';
const VoxelMini = lazy(() => import('./hero/VoxelMini'));
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const navigate = useNavigate();
    const { t, lang } = useLanguage();
    const services = SERVICES.map(s => ({ title: lang === 'tr' ? s.tr : s.en, path: s.path }));

    const go = (path) => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="on-dark bg-brand-600 text-white">
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
                            <img src="/logo-icon.png" alt="BC Creative Agency Logo" className="h-14 w-auto" width="56" height="56" />
                            <span className="font-bold text-lg leading-none">
                                BC Creative
                            </span>
                        </button>
                        <p className="text-white/65 text-sm leading-relaxed mb-6">
                            {t('footer_desc')}
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://www.instagram.com/bccreative.agency/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition-colors"
                            >
                                <Instagram size={16} className="text-white/65 hover:text-white" />
                            </a>
                            <a
                                href="https://wa.me/905488321919"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition-colors"
                            >
                                <Phone size={14} className="text-white/65" />
                            </a>
                            <a
                                href="mailto:info@bccreative.agency"
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition-colors"
                            >
                                <Mail size={14} className="text-white/65" />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/65 mb-5">
                            {t('footer_services_title')}
                        </h3>
                        <ul className="space-y-2.5">
                            {services.map((s, i) => (
                                <li key={i}>
                                    {s.path ? (
                                        <button
                                            onClick={() => go(s.path)}
                                            className="text-white/65 hover:text-white text-sm transition-colors"
                                        >
                                            {s.title}
                                        </button>
                                    ) : (
                                        <span className="text-white/65 text-sm">{s.title}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Nav */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/65 mb-5">
                            {t('footer_nav_title')}
                        </h3>
                        <ul className="space-y-2.5">
                            <li><button onClick={() => go('/')} className="text-white/65 hover:text-white text-sm transition-colors">{t('nav_home')}</button></li>
                            <li><button onClick={() => go('/about')} className="text-white/65 hover:text-white text-sm transition-colors">{t('nav_about')}</button></li>
                            <li><button onClick={() => go('/blog')} className="text-white/65 hover:text-white text-sm transition-colors">{t('nav_blog')}</button></li>
                            <li><button onClick={() => go('/contact')} className="text-white/65 hover:text-white text-sm transition-colors">{t('nav_contact')}</button></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/65 mb-5">
                            {t('footer_contact_title')}
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-2.5 text-white/65 text-sm leading-relaxed">
                                <MapPin size={16} className="text-white/45 shrink-0 mt-0.5" />
                                <a
                                    href={t('contact_map_url')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    {t('footer_address')}
                                </a>
                            </li>
                            <li className="flex items-center gap-2.5 text-white/65 text-sm">
                                <Phone size={16} className="text-white/45 shrink-0" />
                                <a href="tel:+905488321919" className="hover:text-white transition-colors">+90 548 832 19 19</a>
                            </li>
                            <li className="flex items-center gap-2.5 text-white/65 text-sm">
                                <Mail size={16} className="text-white/45 shrink-0" />
                                <a href="mailto:info@bccreative.agency" className="hover:text-white transition-colors">info@bccreative.agency</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Küp imza: dokununca dağılır, geri toplanır */}
                <Suspense fallback={<div className="mt-16 h-36 md:h-52" />}>
                    <VoxelMini shape={getShape('bc')} palette="dark" className="mt-16 h-36 md:h-52 w-full" label="BC Creative" />
                </Suspense>

                {/* Bottom strip */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/45">
                    <div>&copy; 2017 &ndash; 2026 BC Creative Agency. {t('footer_rights')}</div>
                    <div>{t('footer_made_with')}</div>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
