import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { shapeCheck } from './hero/voxelShapes';
import VoxelIcon from './hero/VoxelIcon';
import { useLanguage } from '../context/LanguageContext';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '../lib/geoSchemas';
import { ScrollText } from './shared/ParallaxKit';

const LEAD_API = 'https://leadintake-fafl6lnd7a-ew.a.run.app';
const API_KEY = '36ee59119b9aa5590032763a6079e1a899485ad9d8850e447676441b71e26ad';

const VoxelMini = lazy(() => import('./hero/VoxelMini'));
const CHECK = shapeCheck();
// kanal sırası: WhatsApp, telefon, e-posta, Instagram, TikTok, YouTube, Facebook, LinkedIn
const CHANNEL_SHAPES = ['chat', 'phone', 'mail', 'insta', 'tiktok', 'youtube', 'facebook', 'linkedin'];

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
                headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
                body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message: form.message, source: 'bccreative.agency iletisim formu' }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Bir hata oluştu');
            setStatus('success');
            setForm({ name: '', email: '', phone: '', message: '' });
        } catch (err) {
            setStatus('error');
            setError(err.message);
        }
    };

    useSEO({
        title: isTr ? 'İletişim | BC Creative Agency - KKTC Girne' : 'Contact | BC Creative Agency - Kyrenia TRNC',
        description: isTr ? "BC Creative Agency ile iletişime geçin." : 'Contact BC Creative Agency.',
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
        { label: isTr ? "WhatsApp'ta yazışalım" : "Let's chat on WhatsApp", value: '+90 548 832 19 19', href: 'https://wa.me/905488321919', primary: true },
        { label: isTr ? 'Telefon' : 'Call us', value: '+90 548 832 19 19', href: 'tel:+905488321919' },
        { label: isTr ? 'E-posta' : 'Email us', value: 'info@bccreative.agency', href: 'mailto:info@bccreative.agency' },
        { label: 'Instagram', value: '@bccreative.agency', href: 'https://www.instagram.com/bccreative.agency/' },
        { label: 'TikTok', value: '@bccreative.agency', href: 'https://www.tiktok.com/@bccreative.agency' },
        { label: 'YouTube', value: '@bc_medya', href: 'https://www.youtube.com/@bc_medya' },
        { label: 'Facebook', value: 'BC Creative Agency', href: 'https://www.facebook.com/978954551969501' },
        { label: 'LinkedIn', value: 'BC Creative Agency', href: 'https://www.linkedin.com/company/bc-creative-agencyy' },
    ];

    return (
        <main className="bg-ink-900">
            {/* Hero */}
            <section className="relative overflow-hidden pt-28 md:pt-32 pb-12 md:pb-16">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,208,224,0.45),transparent_60%)]" />
                <div className="container mx-auto px-6 md:px-12 text-center relative">
                    <div data-voxel-anchor="always" aria-hidden="true" className="mx-auto w-full max-w-xl h-[24svh] md:h-[30vh] mb-2" />
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-5">{t('contact_eyebrow')}</p>
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-[0.95] tracking-tighter">
                        {t('contact_heading_1')} <span className="text-secondary-300">{t('contact_heading_accent')}</span>
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-white/55 max-w-2xl mx-auto leading-relaxed">{t('contact_sub')}</p>
                </div>
            </section>

            {/* Form + Channels */}
            <section className="relative bg-ink-900 py-16 md:py-24">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-10">
                    <source src="/bg-smoke.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-ink-900/80" />
                <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <ScrollText>
                            <h2 className="text-2xl font-bold text-white mb-6">{isTr ? 'Bize yazın' : 'Send us a message'}</h2>
                            {status === 'success' ? (
                                <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-8 text-center">
                                    <Suspense fallback={<CheckCircle size={48} className="text-green-500 mx-auto mb-4" />}><VoxelMini shape={CHECK} className="h-40 w-full mb-2" label="Gönderildi" /></Suspense>
                                    <h3 className="text-xl font-bold text-white mb-2">{isTr ? 'Mesajınız alındı!' : 'Message received!'}</h3>
                                    <p className="text-white/50">{isTr ? 'En kısa sürede size döneceğiz.' : "We'll get back to you shortly."}</p>
                                    <button onClick={() => setStatus('idle')} className="mt-6 text-secondary-300 font-medium text-sm">{isTr ? 'Yeni mesaj gönder' : 'Send another'}</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-secondary-300 transition-all" placeholder={isTr ? 'Adınız Soyadınız' : 'Your full name'} />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-secondary-300 transition-all" placeholder="ornek@email.com" />
                                        <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-secondary-300 transition-all" placeholder="+90 5XX XXX XX XX" />
                                    </div>
                                    <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-secondary-300 transition-all resize-none" placeholder={isTr ? 'Projeniz hakkında bilgi verin...' : 'Tell us about your project...'} />
                                    {status === 'error' && <p className="text-red-500 text-sm">{error}</p>}
                                    <button type="submit" disabled={status === 'sending'} className="w-full flex items-center justify-center gap-2 bg-white text-ink-900 font-medium py-4 rounded-full hover:bg-secondary-300 transition-colors disabled:opacity-60">
                                        {status === 'sending' ? <><Loader2 size={18} className="animate-spin" />{isTr ? 'Gönderiliyor...' : 'Sending...'}</> : <><Send size={18} />{isTr ? 'Gönder' : 'Send message'}</>}
                                    </button>
                                </form>
                            )}
                        </ScrollText>

                        <div className="space-y-4">
                            {channels.map((ch, i) => (
                                <ScrollText key={ch.label} delay={i * 0.08}>
                                    <a href={ch.href} target={ch.href.startsWith('http') ? '_blank' : undefined} rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="group flex items-center gap-5 p-5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-secondary-300/30 transition-all">
                                        <VoxelIcon name={CHANNEL_SHAPES[i] || 'chat'} className="w-12 h-12 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                                        <div><p className="text-white/40 text-xs mb-0.5">{ch.label}</p><p className="font-bold text-base">{ch.value}</p></div>
                                    </a>
                                </ScrollText>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="relative bg-ink-900 py-16 px-6 md:px-12">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <ScrollText>
                            <div className="space-y-5">
                                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                    <div className="flex items-start gap-4">
                                        <VoxelIcon name="pin" className="w-10 h-10 shrink-0 -mt-1" />
                                        <div>
                                            <h3 className="font-bold text-white text-lg mb-2">{t('contact_address_label')}</h3>
                                            <p className="text-white/50">{t('contact_address_val')}</p>
                                            <button onClick={() => window.open(t('contact_map_url'), '_blank')} className="mt-3 text-secondary-300 font-medium text-sm">{t('contact_maps_btn')}</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                    <div className="flex items-start gap-4">
                                        <VoxelIcon name="clock" className="w-10 h-10 shrink-0 -mt-1" />
                                        <div>
                                            <h3 className="font-bold text-white text-lg mb-2">{t('contact_hours_label')}</h3>
                                            <p className="text-white/50">{t('contact_hours_val')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollText>
                        <ScrollText delay={0.1}>
                            <div className="rounded-xl overflow-hidden border border-white/10 h-80 lg:h-full min-h-[350px]">
                                <iframe title={t('contact_map_title')} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.8!2d33.3184!3d35.3421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de1763498dfb09%3A0x0!2sAlsancak+Emtan+West+Park+Girne!5e0!3m2!1str!2str!4v1700000000001" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                            </div>
                        </ScrollText>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contact;
