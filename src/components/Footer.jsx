import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/**
 * Footer — Creative Playground signature footer.
 * Big playful wordmark, sticker contact cards, rainbow services grid.
 */
const Footer = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const services = t('services_list');

    const go = (path) => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-ink-900 text-white overflow-hidden">
            {/* Decorative shapes */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-600/40 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-coral-500/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-mint-500/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 md:px-8 py-20 md:py-28 relative z-10">

                {/* Big headline / CTA */}
                <div className="max-w-4xl mb-16">
                    <div className="inline-block bg-sun-300 text-ink-900 border-2 border-ink-900 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider mb-6 rotate-neg-2">
                        {t('footer_tagline')}
                    </div>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight">
                        {t('contact_heading_1')}{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 text-sun-300">{t('contact_heading_accent')}</span>
                            <span className="absolute left-0 right-0 bottom-2 h-4 bg-coral-500/60 -z-0 rounded-sm" />
                        </span>
                    </h2>
                    <p className="mt-6 text-lg md:text-xl text-ink-300 font-medium max-w-2xl">
                        {t('footer_desc')}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <button
                            onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                            className="bg-mint-400 text-ink-900 font-black px-7 py-4 rounded-full border-2 border-mint-400 hover:bg-mint-300 transition-colors shadow-sticker-sun"
                        >
                            {t('btn_whatsapp')}
                        </button>
                        <button
                            onClick={() => go('/contact')}
                            className="bg-transparent text-white font-black px-7 py-4 rounded-full border-2 border-white hover:bg-white hover:text-ink-900 transition-colors"
                        >
                            {t('nav_contact')} →
                        </button>
                    </div>
                </div>

                {/* Columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-16 border-t border-ink-700">

                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-1">
                        <button onClick={() => go('/')} className="flex items-center gap-2 group mb-5">
                            <img src="/logo-icon.png" alt="BC" className="h-14 w-auto group-hover:rotate-12 transition-transform" />
                            <span className="font-black text-lg leading-none">
                                BC <span className="text-brand-400">Creative</span>
                                <span className="block text-[10px] font-bold text-ink-400 tracking-[0.2em] uppercase mt-0.5">Agency · KKTC</span>
                            </span>
                        </button>
                        <div className="flex items-center gap-3 mt-5">
                            <a
                                href="https://www.instagram.com/bccreative.agency/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center hover:scale-110 transition-transform border-2 border-white"
                            >
                                <Instagram size={18} className="text-white" />
                            </a>
                            <a
                                href="https://wa.me/905488755461"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-mint-400 text-ink-900 flex items-center justify-center hover:scale-110 transition-transform border-2 border-white"
                            >
                                <Phone size={16} strokeWidth={3} />
                            </a>
                            <a
                                href="mailto:info@bccreative.agency"
                                className="w-11 h-11 rounded-full bg-sun-300 text-ink-900 flex items-center justify-center hover:scale-110 transition-transform border-2 border-white"
                            >
                                <Mail size={16} strokeWidth={3} />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-wider text-sun-300 mb-5">
                            {t('footer_services_title')}
                        </h3>
                        <ul className="space-y-2.5">
                            {services.map((s, i) => (
                                <li key={i}>
                                    {s.path ? (
                                        <button
                                            onClick={() => go(s.path)}
                                            className="text-ink-300 hover:text-white font-bold text-sm transition-colors"
                                        >
                                            {s.title}
                                        </button>
                                    ) : (
                                        <span className="text-ink-300 font-bold text-sm">{s.title}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Nav */}
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-wider text-coral-400 mb-5">
                            {t('footer_nav_title')}
                        </h3>
                        <ul className="space-y-2.5">
                            <li><button onClick={() => go('/')} className="text-ink-300 hover:text-white font-bold text-sm transition-colors">{t('nav_home')}</button></li>
                            <li><button onClick={() => go('/about')} className="text-ink-300 hover:text-white font-bold text-sm transition-colors">{t('nav_about')}</button></li>
                            <li><button onClick={() => go('/blog')} className="text-ink-300 hover:text-white font-bold text-sm transition-colors">{t('nav_blog')}</button></li>
                            <li><button onClick={() => go('/contact')} className="text-ink-300 hover:text-white font-bold text-sm transition-colors">{t('nav_contact')}</button></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-wider text-mint-400 mb-5">
                            {t('footer_contact_title')}
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-2.5 text-ink-300 text-sm font-medium leading-relaxed">
                                <MapPin size={16} className="text-white shrink-0 mt-0.5" />
                                <a
                                    href={t('contact_map_url')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    {t('footer_address')}
                                </a>
                            </li>
                            <li className="flex items-center gap-2.5 text-ink-300 text-sm font-medium">
                                <Phone size={16} className="text-white shrink-0" />
                                <a href="tel:+905488755461" className="hover:text-white transition-colors font-bold">+90 548 875 54 61</a>
                            </li>
                            <li className="flex items-center gap-2.5 text-ink-300 text-sm font-medium">
                                <Mail size={16} className="text-white shrink-0" />
                                <a href="mailto:info@bccreative.agency" className="hover:text-white transition-colors font-bold">info@bccreative.agency</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom strip */}
                <div className="mt-16 pt-8 border-t border-ink-700 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-400">
                    <div>© 2017 – 2026 BC Creative Agency. {t('footer_rights')}</div>
                    <div className="flex items-center gap-1.5">
                        {t('footer_made_with')} <Heart size={12} className="fill-coral-500 stroke-coral-500" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
