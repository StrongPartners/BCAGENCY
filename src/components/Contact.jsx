import React from 'react';
import useSEO from '../hooks/useSEO';
import { motion } from 'framer-motion';
import ColorfulBlobs from './ColorfulBlobs';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { lang, t } = useLanguage();

    useSEO({
        title: lang === 'tr' ? 'İletişim | BC Creative Agency - KKTC Girne Dijital Ajans' : 'Contact | BC Creative Agency - TRNC Kyrenia Digital Agency',
        description: lang === 'tr' ? 'BC Creative Agency ile WhatsApp üzerinden iletişime geçin. KKTC Girne\'de dijital pazarlama, SEO, Google Ads ve prodüksiyon hizmetleri için hızlı teklif alın.' : 'Contact BC Creative Agency via WhatsApp. Get a quick quote for digital marketing, SEO, Google Ads and production services in Kyrenia, TRNC.',
        keywords: 'BC Creative Agency iletişim, KKTC dijital ajans, Girne reklam ajansı, WhatsApp',
        canonical: 'https://bccreative.agency/contact',
    });

    const channels = [
        {
            icon: (
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            label: lang === 'tr' ? 'WhatsApp ile Yaz' : 'Message on WhatsApp',
            value: '+90 548 875 54 61',
            href: 'https://wa.me/905488755461',
            color: 'bg-[#25D366]',
            primary: true,
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.81 12.81 0 00.62 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l2.27-2.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.62A2 2 0 0122 16.92z" />
                </svg>
            ),
            label: lang === 'tr' ? 'Telefon ile Ara' : 'Call Us',
            value: '+90 548 875 54 61',
            href: 'tel:+905488755461',
            color: 'bg-brand-600',
            primary: false,
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            label: lang === 'tr' ? 'E-posta Gönder' : 'Send Email',
            value: 'info@bccreative.agency',
            href: 'mailto:info@bccreative.agency',
            color: 'bg-gray-700',
            primary: false,
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
            label: 'Instagram',
            value: '@bccreative.agency',
            href: 'https://www.instagram.com/bccreative.agency/',
            color: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
            primary: false,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 overflow-hidden">
            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <ColorfulBlobs variant="hero" />
                </div>
                <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block bg-brand-600/10 text-brand-600 font-semibold text-sm px-4 py-2 rounded-full mb-4 tracking-wider uppercase">
                            {lang === 'tr' ? 'İletişim' : 'Contact'}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                            {lang === 'tr' ? 'Hemen' : 'Let\'s'}{' '}
                            <span className="text-brand-600">{lang === 'tr' ? 'Konuşalım' : 'Talk'}</span>
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                            {lang === 'tr'
                                ? 'Projeniz için hızlı teklif almak ister misiniz? WhatsApp\'tan mesaj atın, ortalama 15 dakikada dönüş yapıyoruz.'
                                : 'Want a quick quote for your project? Message us on WhatsApp — we respond in an average of 15 minutes.'}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Channels */}
            <section className="py-12 px-4 md:px-8">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {channels.map((ch, i) => (
                            <motion.a
                                key={ch.label}
                                href={ch.href}
                                target={ch.href.startsWith('http') ? '_blank' : undefined}
                                rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                whileHover={{ scale: 1.03, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-5 p-6 rounded-2xl text-white shadow-lg cursor-pointer transition-shadow hover:shadow-xl ${ch.color} ${ch.primary ? 'sm:col-span-2' : ''}`}
                            >
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                                    {ch.icon}
                                </div>
                                <div>
                                    <p className="text-white/80 text-sm font-medium mb-0.5">{ch.label}</p>
                                    <p className="text-white font-black text-lg md:text-xl">{ch.value}</p>
                                </div>
                                {ch.primary && (
                                    <div className="ml-auto hidden sm:flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2 text-sm font-bold">
                                        {lang === 'tr' ? 'Hemen Yaz →' : 'Message Now →'}
                                    </div>
                                )}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Working Hours + Address + Map */}
            <section className="py-12 px-4 md:px-8">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Info Cards */}
                        <div className="space-y-5">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                            >
                                <h3 className="font-black text-gray-900 text-lg mb-4 flex items-center gap-2">
                                    <span className="text-2xl">📍</span>
                                    {t('contact_address_label')}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{t('contact_address_val')}</p>
                                <button
                                    onClick={() => window.open(t('contact_map_url'), '_blank')}
                                    className="mt-4 text-brand-600 font-bold text-sm hover:underline flex items-center gap-1"
                                >
                                    {t('contact_maps_btn')}
                                </button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                            >
                                <h3 className="font-black text-gray-900 text-lg mb-4 flex items-center gap-2">
                                    <span className="text-2xl">🕐</span>
                                    {t('contact_hours_label')}
                                </h3>
                                <p className="text-gray-600">{t('contact_hours_val')}</p>
                                <p className="text-gray-500 text-sm mt-2">
                                    {lang === 'tr' ? 'WhatsApp\'tan 7/24 mesaj atabilirsiniz.' : 'You can message us on WhatsApp 24/7.'}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-brand-600 rounded-2xl p-6 shadow-sm text-white"
                            >
                                <h3 className="font-black text-lg mb-2">
                                    {lang === 'tr' ? '⚡ Ortalama Yanıt Süresi' : '⚡ Average Response Time'}
                                </h3>
                                <p className="text-white/80 text-sm mb-3">
                                    {lang === 'tr'
                                        ? 'WhatsApp mesajlarınıza çalışma saatlerinde ortalama 15 dakika içinde dönüş yapıyoruz.'
                                        : 'We respond to WhatsApp messages within an average of 15 minutes during business hours.'}
                                </p>
                                <a
                                    href="https://wa.me/905488755461"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-white text-brand-600 font-black px-5 py-2 rounded-xl text-sm hover:bg-gray-50 transition-colors"
                                >
                                    {lang === 'tr' ? 'WhatsApp\'ı Aç' : 'Open WhatsApp'}
                                </a>
                            </motion.div>
                        </div>

                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-80 lg:h-full min-h-[320px]"
                        >
                            <iframe
                                title={t('contact_map_title')}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.8!2d33.3184!3d35.3421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de1763498dfb09%3A0x0!2sFatih+Sk%2C+A%C5%9Fa%C4%9F%C4%B1+Girne+Mahallesi%2C+Girne!5e0!3m2!1str!2str!4v1700000000001"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
