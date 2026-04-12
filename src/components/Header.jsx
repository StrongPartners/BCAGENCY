import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

/**
 * Header — Creative Playground top navigation.
 * Rounded pill badge logo, wobbly indigo underline on hover,
 * coral/mint/sun accents for the services dropdown.
 */
const Header = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { lang, toggleLang, t } = useLanguage();
    const { theme, setTheme, themes } = useTheme();

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
        { name: t('nav_seo'),        path: '/hizmetler/seo',           tone: 'brand' },
        { name: t('nav_ads'),        path: '/hizmetler/google-ads',    tone: 'coral' },
        { name: t('nav_social'),     path: '/hizmetler/sosyal-medya',  tone: 'mint' },
        { name: t('nav_web'),        path: '/hizmetler/web-tasarim',   tone: 'sun' },
        { name: t('nav_production'), path: '/hizmetler/produksiyon',   tone: 'brand' },
        { name: t('nav_drone'),      path: '/hizmetler/drone-cekim',   tone: 'coral' },
        { name: t('nav_photo'),      path: '/hizmetler/fotograf-video',tone: 'mint' },
    ];

    const dotColors = { brand: 'bg-brand-500', coral: 'bg-coral-500', mint: 'bg-mint-500', sun: 'bg-sun-400' };

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'}`}
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">

                {/* Logo pill */}
                <motion.button
                    onClick={() => go('/')}
                    whileHover={{ scale: 1.03, rotate: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 group"
                >
                    <div className="relative">
                        <img src="/logo-icon.png" alt="BC Creative Agency" className="h-14 md:h-16 w-auto object-contain relative z-10" />
                        <span className="absolute inset-0 bg-sun-300 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity" />
                    </div>
                    <span className="hidden sm:block font-black text-ink-900 text-base md:text-lg tracking-tight leading-none">
                        BC <span className="text-brand-600">Creative</span>
                        <span className="block text-[10px] md:text-xs font-bold text-ink-400 tracking-[0.2em] uppercase mt-0.5">Agency · KKTC</span>
                    </span>
                </motion.button>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
                    {navLinks.map((item) => {
                        const active = location.pathname === item.path;
                        return (
                            <button
                                key={item.label}
                                onClick={() => go(item.path)}
                                className={`relative font-bold text-[15px] tracking-tight transition-colors ${active ? 'text-brand-600' : 'text-ink-700 hover:text-brand-600'}`}
                            >
                                {item.label}
                                <span className={`absolute -bottom-1 left-0 h-[6px] bg-sun-300 -z-10 transition-all rounded-sm ${active ? 'w-full' : 'w-0'}`} />
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
                            className="flex items-center gap-1.5 font-bold text-[15px] text-ink-700 hover:text-brand-600 transition-colors py-2"
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
                                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72"
                                >
                                    <div className="bg-surface-card rounded-2xl shadow-xl border border-gray-200 overflow-hidden py-2">
                                        {services.map((s) => (
                                            <button
                                                key={s.name}
                                                onClick={() => go(s.path)}
                                                className="w-full flex items-center gap-3 px-5 py-3 text-ink-700 hover:bg-surface-alt transition-colors text-[14px] font-bold group"
                                            >
                                                <span className={`w-2.5 h-2.5 rounded-full ${dotColors[s.tone]} group-hover:scale-125 transition-transform`} />
                                                <span className="group-hover:text-brand-600 transition-colors">{s.name}</span>
                                                <span className="ml-auto opacity-0 group-hover:opacity-100 text-brand-600">→</span>
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
                    {/* Theme picker */}
                    <div className="flex items-center gap-1.5">
                        {themes.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTheme(t.id)}
                                className={`w-6 h-6 rounded-full ${t.preview} border-2 transition-all ${
                                    theme === t.id ? 'border-brand-600 scale-110' : 'border-transparent hover:scale-105'
                                }`}
                                title={t.name[lang]}
                            />
                        ))}
                    </div>

                    {/* Language toggle */}
                    <div className="flex items-center bg-ink-100 rounded-full p-1">
                        <button
                            onClick={() => lang !== 'tr' && toggleLang()}
                            className={`px-3 py-1 rounded-full text-xs font-black transition-all ${lang === 'tr' ? 'bg-surface-card text-ink-900 shadow-sm' : 'text-ink-400'}`}
                        >
                            TR
                        </button>
                        <button
                            onClick={() => lang !== 'en' && toggleLang()}
                            className={`px-3 py-1 rounded-full text-xs font-black transition-all ${lang === 'en' ? 'bg-surface-card text-ink-900 shadow-sm' : 'text-ink-400'}`}
                        >
                            EN
                        </button>
                    </div>

                    {/* CTA pill */}
                    <motion.button
                        onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-ink-900 text-white font-black text-sm px-5 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow"
                    >
                        {t('btn_offer')}
                    </motion.button>
                </div>

                {/* Mobile menu button */}
                <button
                    className="lg:hidden p-2 text-ink-900 rounded-full bg-surface-card border border-gray-200 shadow-md"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Menu"
                >
                    {isMobileMenuOpen ? <X size={22} strokeWidth={3} /> : <Menu size={22} strokeWidth={3} />}
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
                        className="absolute top-full left-0 right-0 bg-surface-card border-t border-gray-200 shadow-xl lg:hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4 max-h-[85vh] overflow-y-auto">
                            {/* Theme picker */}
                            <div className="flex items-center gap-2 self-start">
                                {themes.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setTheme(t.id)}
                                        className={`w-8 h-8 rounded-full ${t.preview} border-2 transition-all ${
                                            theme === t.id ? 'border-brand-600 scale-110' : 'border-transparent hover:scale-105'
                                        }`}
                                        title={t.name[lang]}
                                    />
                                ))}
                            </div>

                            {/* Language toggle */}
                            <div className="flex items-center gap-2 bg-ink-100 rounded-full p-1 self-start">
                                <button onClick={toggleLang} className={`px-4 py-1.5 rounded-full text-xs font-black ${lang === 'tr' ? 'bg-surface-card text-ink-900 shadow-sm' : 'text-ink-400'}`}>TR</button>
                                <button onClick={toggleLang} className={`px-4 py-1.5 rounded-full text-xs font-black ${lang === 'en' ? 'bg-surface-card text-ink-900 shadow-sm' : 'text-ink-400'}`}>EN</button>
                            </div>

                            {navLinks.map((item) => (
                                <button key={item.label} onClick={() => go(item.path)} className="text-left text-xl font-black text-ink-900 hover:text-brand-600 transition-colors">
                                    {item.label}
                                </button>
                            ))}

                            <div className="pt-4 border-t border-ink-100">
                                <div className="text-xs font-black text-ink-400 uppercase tracking-wider mb-3">{t('nav_services')}</div>
                                <div className="space-y-3">
                                    {services.map((s) => (
                                        <button
                                            key={s.name}
                                            onClick={() => go(s.path)}
                                            className="w-full flex items-center gap-3 text-left text-base font-bold text-ink-700 hover:text-brand-600"
                                        >
                                            <span className={`w-2 h-2 rounded-full ${dotColors[s.tone]}`} />
                                            {s.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                                className="mt-4 w-full bg-ink-900 text-white font-black py-4 rounded-full shadow-md hover:shadow-lg transition-shadow"
                            >
                                {t('btn_offer')}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
