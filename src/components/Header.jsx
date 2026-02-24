import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { lang, toggleLang, t } = useLanguage();

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                delay: 0
            }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md transition-all duration-300 py-4"
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                {/* Logo */}
                <motion.div
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        navigate('/');
                        setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center cursor-pointer relative group overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                >
                    <img
                        src="/logo-icon.png"
                        alt="BC Creative Agency"
                        className="h-20 md:h-24 w-auto object-contain relative z-10"
                    />
                    <span className="ml-3 text-[#1e3a8a] font-black text-lg md:text-xl tracking-widest uppercase whitespace-nowrap">BC CREATIVE AGENCY</span>
                </motion.div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
                    {[
                        { label: t('nav_home'), path: '/' },
                        { label: t('nav_about'), path: '/about' },
                        { label: t('nav_blog'), path: '/blog' },
                    ].map((item) => (
                        <a
                            key={item.label}
                            href={item.path}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(item.path);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="relative text-gray-800 font-normal hover:text-brand-600 transition-all duration-300 hover:translate-y-1 inline-block group text-[16px] xl:text-[18px]"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-600 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}

                    {/* Dropdown Menu - Hizmetlerimiz */}
                    <div
                        className="relative group"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <div className="flex items-center gap-1 text-gray-800 font-normal hover:text-brand-600 cursor-pointer transition-all duration-300 hover:translate-y-1 py-2 text-[16px] xl:text-[18px]">
                            <span>{t('nav_services')}</span>
                            <ChevronDown size={16} className={`transition-transform duration-200 ${isHovering ? 'rotate-180' : ''}`} />
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 transition-all duration-300 group-hover:w-full"></span>
                        </div>

                        <AnimatePresence>
                            {isHovering && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64"
                                >
                                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1">
                                        {[
                                            { name: t('nav_seo'), path: '/hizmetler/seo' },
                                            { name: t('nav_social'), path: '/hizmetler/sosyal-medya' },
                                            { name: t('nav_ads'), path: '/hizmetler/google-ads' },
                                            { name: t('nav_web'), path: '/hizmetler/web-tasarim' },
                                            { name: t('nav_production'), path: '/hizmetler/produksiyon' },
                                            { name: t('nav_drone'), path: '/hizmetler/drone-cekim' },
                                            { name: t('nav_photo'), path: '/hizmetler/fotograf-video' },
                                        ].map((service, index, arr) => (
                                            service.path ? (
                                                <a
                                                    key={service.name}
                                                    href={service.path}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        navigate(service.path);
                                                        setIsHovering(false);
                                                    }}
                                                    className={`block px-5 py-3 text-gray-600 hover:text-brand-600 hover:bg-gray-50 transition-colors text-[15px] ${index !== arr.length - 1 ? 'border-b border-gray-100' : ''}`}
                                                >
                                                    {service.name}
                                                </a>
                                            ) : (
                                                <button
                                                    key={service.name}
                                                    onClick={() => {
                                                        window.open('https://wa.me/905488755461', '_blank');
                                                        setIsHovering(false);
                                                    }}
                                                    className={`w-full text-left px-5 py-3 text-gray-600 hover:text-brand-600 hover:bg-gray-50 transition-colors text-[15px] flex items-center justify-between ${index !== arr.length - 1 ? 'border-b border-gray-100' : ''}`}
                                                >
                                                    {service.name}
                                                    <span className="text-xs text-green-500 font-semibold">WhatsApp</span>
                                                </button>
                                            )
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </nav>

                {/* Social & Contact - Desktop */}
                <div className="hidden lg:flex items-center gap-3">
                    {/* Dil Toggle */}
                    <div className="flex items-center bg-gray-100 rounded-full p-1 gap-0.5">
                        <motion.button
                            onClick={() => lang !== 'tr' && toggleLang()}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${lang === 'tr' ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <span>🇹🇷</span>
                            <span>TR</span>
                        </motion.button>
                        <motion.button
                            onClick={() => lang !== 'en' && toggleLang()}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${lang === 'en' ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <span>🇬🇧</span>
                            <span>EN</span>
                        </motion.button>
                    </div>

                    <motion.button
                        onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-600 text-white shadow-md cursor-pointer"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.81 12.81 0 00.62 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l2.27-2.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.62A2 2 0 0122 16.92z" />
                        </svg>
                    </motion.button>
                    <motion.button
                        onClick={() => window.open('https://www.instagram.com/bccreative.agency/', '_blank')}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-md cursor-pointer"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </motion.button>
                    <motion.button
                        onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#25D366] text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg hover:shadow-[#25D366]/40 cursor-pointer flex items-center gap-2 group"
                    >
                        {t('btn_offer')}
                    </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 text-gray-800"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl overflow-hidden lg:hidden"
                        >
                            <div className="flex flex-col p-6 space-y-6">
                                {/* Mobil Dil Toggle */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={toggleLang}
                                        className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-all ${lang === 'tr' ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-500'}`}
                                    >
                                        🇹🇷 Türkçe
                                    </button>
                                    <button
                                        onClick={toggleLang}
                                        className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-all ${lang === 'en' ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-500'}`}
                                    >
                                        🇬🇧 English
                                    </button>
                                </div>

                                <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); setIsMobileMenuOpen(false); }} className="text-xl font-medium text-gray-800">{t('nav_home')}</a>
                                <a href="/about" onClick={(e) => { e.preventDefault(); navigate('/about'); setIsMobileMenuOpen(false); }} className="text-xl font-medium text-gray-800">{t('nav_about')}</a>
                                <a href="/blog" onClick={(e) => { e.preventDefault(); navigate('/blog'); setIsMobileMenuOpen(false); }} className="text-xl font-medium text-gray-800">{t('nav_blog')}</a>

                                <div className="space-y-4">
                                    <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t('nav_services')}</div>
                                    <a href="/hizmetler/seo" onClick={(e) => { e.preventDefault(); navigate('/hizmetler/seo'); setIsMobileMenuOpen(false); }} className="block text-lg text-gray-600 pl-4 border-l-2 border-brand-100">SEO</a>
                                    <a href="/hizmetler/sosyal-medya" onClick={(e) => { e.preventDefault(); navigate('/hizmetler/sosyal-medya'); setIsMobileMenuOpen(false); }} className="block text-lg text-gray-600 pl-4 border-l-2 border-brand-100">{t('nav_social')}</a>
                                    <a href="/hizmetler/google-ads" onClick={(e) => { e.preventDefault(); navigate('/hizmetler/google-ads'); setIsMobileMenuOpen(false); }} className="block text-lg text-gray-600 pl-4 border-l-2 border-brand-100">Google Ads</a>
                                    <a href="/hizmetler/web-tasarim" onClick={(e) => { e.preventDefault(); navigate('/hizmetler/web-tasarim'); setIsMobileMenuOpen(false); }} className="block text-lg text-gray-600 pl-4 border-l-2 border-brand-100">{t('nav_web')}</a>
                                    <a href="/hizmetler/produksiyon" onClick={(e) => { e.preventDefault(); navigate('/hizmetler/produksiyon'); setIsMobileMenuOpen(false); }} className="block text-lg text-gray-600 pl-4 border-l-2 border-brand-100">{t('nav_production')}</a>
                                    <a href="/hizmetler/drone-cekim" onClick={(e) => { e.preventDefault(); navigate('/hizmetler/drone-cekim'); setIsMobileMenuOpen(false); }} className="block text-lg text-gray-600 pl-4 border-l-2 border-brand-100">{t('nav_drone')}</a>
                                    <a href="/hizmetler/fotograf-video" onClick={(e) => { e.preventDefault(); navigate('/hizmetler/fotograf-video'); setIsMobileMenuOpen(false); }} className="block text-lg text-gray-600 pl-4 border-l-2 border-brand-100">{t('nav_photo')}</a>
                                </div>

                                <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                                    <button onClick={() => window.open('https://wa.me/905488755461', '_blank')} className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold text-lg">{t('btn_whatsapp')}</button>
                                    <div className="flex justify-center gap-6">
                                        <button onClick={() => window.location.href = 'tel:+905488755461'} className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-50 text-brand-600">
                                            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.81 12.81 0 00.62 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l2.27-2.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.62A2 2 0 0122 16.92z" /></svg>
                                        </button>
                                        <button onClick={() => window.open('https://instagram.com', '_blank')} className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-50 text-brand-600">
                                            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header >
    );
};

export default Header;
