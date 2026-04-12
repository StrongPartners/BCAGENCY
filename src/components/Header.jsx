import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { lang, toggleLang, t } = useLanguage();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const go = (path) => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMobileMenuOpen(false);
        setIsHovering(false);
    };

    const navLinks = [
        { label: t('nav_home'), path: '/' },
        { label: t('nav_about'), path: '/about' },
        { label: t('nav_blog'), path: '/blog' },
        { label: t('nav_contact'), path: '/contact' },
    ];

    const services = [
        { name: t('nav_seo'),        path: '/hizmetler/seo' },
        { name: t('nav_ads'),        path: '/hizmetler/google-ads' },
        { name: t('nav_social'),     path: '/hizmetler/sosyal-medya' },
        { name: t('nav_web'),        path: '/hizmetler/web-tasarim' },
        { name: t('nav_production'), path: '/hizmetler/produksiyon' },
        { name: t('nav_drone'),      path: '/hizmetler/drone-cekim' },
        { name: t('nav_photo'),      path: '/hizmetler/fotograf-video' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white border-b border-ink-100 py-3' : 'bg-transparent py-5'}`}
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">

                {/* Logo */}
                <button
                    onClick={() => go('/')}
                    className="flex items-center gap-2 group"
                >
                    <img src="/logo-icon.png" alt="BC Creative Agency" className="h-12 md:h-14 w-auto object-contain" />
                    <span className={`hidden sm:block font-bold text-base md:text-lg tracking-tight leading-none transition-colors ${!isScrolled && isHome ? 'text-white' : 'text-ink-900'}`}>
                        BC Creative
                    </span>
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
                    {navLinks.map((item) => {
                        const active = location.pathname === item.path;
                        const lightMode = !isScrolled && isHome;
                        return (
                            <button
                                key={item.label}
                                onClick={() => go(item.path)}
                                className={`font-medium text-[15px] tracking-tight transition-colors ${lightMode ? (active ? 'text-white' : 'text-white/80 hover:text-white') : (active ? 'text-ink-900' : 'text-ink-600 hover:text-ink-900')}`}
                            >
                                {item.label}
                            </button>
                        );
                    })}

                    {/* Services dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <button
                            className={`flex items-center gap-1.5 font-medium text-[15px] transition-colors py-2 ${!isScrolled && isHome ? 'text-white/80 hover:text-white' : 'text-ink-600 hover:text-ink-900'}`}
                        >
                            {t('nav_services')}
                            <ChevronDown size={16} className={`transition-transform ${isHovering ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isHovering && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                                    transition={{ duration: 0.18 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-64"
                                >
                                    <div className="bg-white rounded-xl shadow-lg border border-ink-100 overflow-hidden py-2">
                                        {services.map((s) => (
                                            <button
                                                key={s.name}
                                                onClick={() => go(s.path)}
                                                className="w-full flex items-center justify-between px-5 py-3 text-ink-600 hover:bg-ink-50 transition-colors text-[14px] font-medium group"
                                            >
                                                <span className="group-hover:text-ink-900 transition-colors">{s.name}</span>
                                                <span className="opacity-0 group-hover:opacity-100 text-ink-400 transition-opacity">&rarr;</span>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </nav>

                {/* Desktop right side */}
                <div className="hidden lg:flex items-center gap-3">
                    {/* Language toggle */}
                    <div className={`flex items-center rounded-full p-0.5 ${!isScrolled && isHome ? 'bg-white/15' : 'bg-ink-50'}`}>
                        <button
                            onClick={() => lang !== 'tr' && toggleLang()}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${lang === 'tr' ? 'bg-white text-ink-900 shadow-sm' : (!isScrolled && isHome ? 'text-white/60' : 'text-ink-400')}`}
                        >
                            TR
                        </button>
                        <button
                            onClick={() => lang !== 'en' && toggleLang()}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${lang === 'en' ? 'bg-white text-ink-900 shadow-sm' : (!isScrolled && isHome ? 'text-white/60' : 'text-ink-400')}`}
                        >
                            EN
                        </button>
                    </div>

                    {/* CTA pill */}
                    <button
                        onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                        className="bg-brand-600 text-white font-medium text-sm px-6 py-2.5 rounded-full hover:bg-brand-700 transition-colors"
                    >
                        {t('btn_offer')}
                    </button>
                </div>

                {/* Mobile menu button */}
                <button
                    className={`lg:hidden p-2 transition-colors ${!isScrolled && isHome ? 'text-white' : 'text-ink-900'}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Menu"
                >
                    {isMobileMenuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
                </button>
            </div>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 bg-white border-t border-ink-100 shadow-lg lg:hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4 max-h-[85vh] overflow-y-auto">
                            {/* Language toggle */}
                            <div className="flex items-center gap-2 bg-ink-50 rounded-full p-0.5 self-start">
                                <button onClick={() => { if (lang !== 'tr') toggleLang(); }} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${lang === 'tr' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-400'}`}>TR</button>
                                <button onClick={() => { if (lang !== 'en') toggleLang(); }} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${lang === 'en' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-400'}`}>EN</button>
                            </div>

                            {navLinks.map((item) => (
                                <button key={item.label} onClick={() => go(item.path)} className="text-left text-lg font-medium text-ink-900 hover:text-brand-600 transition-colors">
                                    {item.label}
                                </button>
                            ))}

                            <div className="pt-4 border-t border-ink-100">
                                <div className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">{t('nav_services')}</div>
                                <div className="space-y-3">
                                    {services.map((s) => (
                                        <button
                                            key={s.name}
                                            onClick={() => go(s.path)}
                                            className="w-full text-left text-base font-medium text-ink-600 hover:text-ink-900 transition-colors"
                                        >
                                            {s.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                                className="mt-4 w-full bg-brand-600 text-white font-medium py-3.5 rounded-full hover:bg-brand-700 transition-colors"
                            >
                                {t('btn_offer')}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
