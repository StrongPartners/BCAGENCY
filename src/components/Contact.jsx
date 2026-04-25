import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Instagram, Send, Loader2, CheckCircle } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { useLanguage } from '../context/LanguageContext';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '../lib/geoSchemas';

const LEAD_API = 'https://leadintake-fafl6lnd7a-ew.a.run.app';
const API_KEY = '36ee59119b9aa5590032763a6079e1a899485ad9d8850e447676441b71e26ad';

const Contact = () => {
    const { lang, t } = useLanguage();
    const isTr = lang === 'tr';

    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setError('');

        try {
            const res = await fetch(LEAD_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    message: form.message,
                    source: 'bccreative.agency iletisim formu',
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Bir hata olustu');
            }

            setStatus('success');
            setForm({ name: '', email: '', phone: '', message: '' });
        } catch (err) {
            setStatus('error');
            setError(err.message);
        }
    };

    useSEO({
        title: isTr ? 'Iletisim | BC Creative Agency - KKTC Girne' : 'Contact | BC Creative Agency - Kyrenia TRNC',
        description: isTr ? "BC Creative Agency ile iletisime gecin." : 'Contact BC Creative Agency.',
        keywords: 'BC Creative Agency iletisim, KKTC dijital ajans, Girne reklam ajansi',
        canonical: 'https://bccreative.agency/contact',
        schemas: [
            buildOrganizationSchema(),
            buildBreadcrumbSchema([
                { name: t('nav_home'), url: 'https://bccreative.agency/' },
                { name: t('nav_contact'), url: 'https://bccreative.agency/contact' },
            ]),
        ],
    });

    const channels = [
        {
            icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
            label: isTr ? "WhatsApp'ta yazisalim" : "Let's chat on WhatsApp",
            value: '+90 548 875 54 61',
            href: 'https://wa.me/905488755461',
            primary: true,
        },
        {
            icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.81 12.81 0 00.62 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l2.27-2.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.62A2 2 0 0122 16.92z" /></svg>,
            label: isTr ? 'Telefon' : 'Call us',
            value: '+90 548 875 54 61',
            href: 'tel:+905488755461',
            primary: false,
        },
        {
            icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            label: isTr ? 'E-posta' : 'Email us',
            value: 'info@bccreative.agency',
            href: 'mailto:info@bccreative.agency',
            primary: false,
        },
        {
            icon: <Instagram className="w-6 h-6" />,
            label: 'Instagram',
            value: '@bccreative.agency',
            href: 'https://www.instagram.com/bccreative.agency/',
            primary: false,
        },
    ];

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-20">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-6">
                        {t('contact_eyebrow')}
                    </motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl md:text-8xl font-bold text-ink-900 leading-[0.95] tracking-tighter">
                        {t('contact_heading_1')} {t('contact_heading_accent')}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-8 text-lg md:text-xl text-ink-500 max-w-2xl mx-auto leading-relaxed">
                        {t('contact_sub')}
                    </motion.p>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-12 md:py-16 px-4 md:px-8">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Form */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <h2 className="text-2xl font-bold text-ink-900 mb-6">
                                {isTr ? 'Bize yazin' : 'Send us a message'}
                            </h2>

                            {status === 'success' ? (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                                    <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-ink-900 mb-2">
                                        {isTr ? 'Mesajiniz alindi!' : 'Message received!'}
                                    </h3>
                                    <p className="text-ink-500">
                                        {isTr ? 'En kisa surede size donecegiz.' : "We'll get back to you shortly."}
                                    </p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="mt-6 text-brand-600 font-medium text-sm hover:text-brand-700"
                                    >
                                        {isTr ? 'Yeni mesaj gonder' : 'Send another message'}
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-ink-700 mb-1.5">
                                            {isTr ? 'Ad Soyad' : 'Full Name'} *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-ink-200 bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                            placeholder={isTr ? 'Adiniz Soyadiniz' : 'Your full name'}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-ink-700 mb-1.5">
                                                {isTr ? 'E-posta' : 'Email'} *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={form.email}
                                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-ink-200 bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                                placeholder="ornek@email.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-ink-700 mb-1.5">
                                                {isTr ? 'Telefon' : 'Phone'}
                                            </label>
                                            <input
                                                type="tel"
                                                value={form.phone}
                                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-ink-200 bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                                placeholder="+90 5XX XXX XX XX"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-ink-700 mb-1.5">
                                            {isTr ? 'Mesajiniz' : 'Your message'} *
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-ink-200 bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                                            placeholder={isTr ? 'Projeniz hakkinda bize bilgi verin...' : 'Tell us about your project...'}
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <p className="text-red-500 text-sm">{error || (isTr ? 'Bir hata olustu. Tekrar deneyin.' : 'An error occurred. Please try again.')}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full inline-flex items-center justify-center gap-2 bg-ink-900 text-white font-medium py-4 rounded-full hover:bg-ink-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                {isTr ? 'Gonderiliyor...' : 'Sending...'}
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                {isTr ? 'Gonder' : 'Send message'}
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>

                        {/* Channels */}
                        <div className="space-y-4">
                            {channels.map((ch, i) => (
                                <motion.a
                                    key={ch.label}
                                    href={ch.href}
                                    target={ch.href.startsWith('http') ? '_blank' : undefined}
                                    rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.08 }}
                                    className="flex items-center gap-5 p-5 rounded-xl bg-white border border-ink-100 text-ink-900 hover:shadow-sm transition-all"
                                >
                                    <div className="w-11 h-11 bg-ink-50 rounded-xl flex items-center justify-center shrink-0">
                                        {ch.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-ink-500 text-xs mb-0.5">{ch.label}</p>
                                        <p className="font-bold text-base truncate">{ch.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Info + Map */}
            <section className="py-12 md:py-20 px-4 md:px-8">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-5">
                            <div className="bg-white rounded-xl p-6 border border-ink-100">
                                <div className="flex items-start gap-4">
                                    <MapPin size={20} strokeWidth={1.5} className="text-ink-400 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-ink-900 text-lg mb-2">{t('contact_address_label')}</h3>
                                        <p className="text-ink-500 leading-relaxed">{t('contact_address_val')}</p>
                                        <button onClick={() => window.open(t('contact_map_url'), '_blank')} className="mt-3 text-brand-600 font-medium text-sm hover:text-brand-700">
                                            {t('contact_maps_btn')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-6 border border-ink-100">
                                <div className="flex items-start gap-4">
                                    <Clock size={20} strokeWidth={1.5} className="text-ink-400 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-ink-900 text-lg mb-2">{t('contact_hours_label')}</h3>
                                        <p className="text-ink-500">{t('contact_hours_val')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-brand-600 rounded-xl p-6">
                                <h3 className="font-bold text-white text-lg mb-2">{t('contact_response_title')}</h3>
                                <p className="text-ink-400 leading-relaxed mb-4">{t('contact_response_desc')}</p>
                                <a href="https://wa.me/905488755461" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-ink-900 font-medium px-5 py-2 rounded-full hover:bg-ink-50 transition-colors">
                                    {t('contact_response_btn')}
                                </a>
                            </div>
                        </div>
                        <div className="rounded-xl overflow-hidden border border-ink-100 h-80 lg:h-full min-h-[400px]">
                            <iframe
                                title={t('contact_map_title')}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.8!2d33.3184!3d35.3421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de1763498dfb09%3A0x0!2sFatih+Sk%2C+A%C5%9Fa%C4%9F%C4%B1+Girne+Mahallesi%2C+Girne!5e0!3m2!1str!2str!4v1700000000001"
                                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
