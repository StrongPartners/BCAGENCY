import React from 'react';
import useSEO from '../hooks/useSEO';
import { motion } from 'framer-motion';
import { Film, Clapperboard, Tv, Play, Star, CheckCircle2, ArrowRight, Zap, Users, Trophy } from 'lucide-react';
import ColorfulBlobs from './ColorfulBlobs';
import { useLanguage } from '../context/LanguageContext';

const Produksiyon = () => {
    const { lang } = useLanguage();
    const isTr = lang === 'tr';

    useSEO({
        title: isTr ? 'Prodüksiyon Hizmetleri | BC Creative Agency KKTC' : 'Production Services | BC Creative Agency TRNC',
        description: isTr
            ? 'Tanıtım filmleri, reklam spotları ve kurumsal video prodüksiyonu. KKTC\'de fikir aşamasından post-prodüksiyona kadar tam hizmet.'
            : 'Promotional films, advertising spots and corporate video production. Full service from concept to post-production in TRNC.',
        keywords: isTr
            ? 'KKTC prodüksiyon, Girne video çekim, reklam filmi KKTC, kurumsal video Kuzey Kıbrıs'
            : 'TRNC production, Kyrenia video production, ad film North Cyprus, corporate video TRNC',
        canonical: 'https://bccreative.agency/hizmetler/produksiyon',
    });

    const content = {
        tr: {
            badge: 'Prodüksiyon',
            hero_title: 'Markanızı Ekrana Taşıyan',
            hero_title2: 'Profesyonel Prodüksiyon',
            hero_desc: 'Fikir aşamasından son kesime kadar tüm prodüksiyon sürecinizi biz yönetiyoruz. Reklam filmleri, tanıtım videoları ve kurumsal içeriklerle markanızı unutulmaz kılıyoruz.',
            section_title: 'Prodüksiyon Hizmetlerimiz',
            section_sub: 'Her bütçeye ve her sektöre uygun video prodüksiyon çözümleri sunuyoruz.',
            services: [
                { icon: <Film size={32} className="text-brand-600" />, title: 'Reklam Filmi', desc: 'Markanızı hedef kitlenize en etkili şekilde anlatacak, yayın kalitesinde reklam filmleri üretiyoruz. TV, sosyal medya ve dijital platformlara özel formatlar.' },
                { icon: <Clapperboard size={32} className="text-brand-600" />, title: 'Kurumsal Tanıtım Filmi', desc: 'Şirketinizi, hizmetlerinizi ve ekibinizi en profesyonel şekilde sunan kurumsal videolar. Yatırımcılar, müşteriler ve paydaşlar için ikna edici içerikler.' },
                { icon: <Tv size={32} className="text-brand-600" />, title: 'Sosyal Medya Videoları', desc: 'Instagram Reels, TikTok ve YouTube Shorts için optimized, viral potansiyeli yüksek kısa video içerikleri. Düzenli içerik üretimi ile hesabınızı büyütüyoruz.' },
                { icon: <Play size={32} className="text-brand-600" />, title: 'Ürün Tanıtım Videosu', desc: 'E-ticaret ve perakende için ürünlerinizi en cazip açıdan gösteren, satış odaklı tanıtım videoları. Dönüşüm oranlarını artıran içerik stratejisi.' },
            ],
            process_title: 'Prodüksiyon Sürecimiz',
            process: [
                { step: '01', title: 'Brifing & Konsept', desc: 'İhtiyaçlarınızı dinliyor, hedef kitlenizi ve mesajınızı netleştiriyoruz. Yaratıcı konsept geliştiriyoruz.' },
                { step: '02', title: 'Senaryo & Storyboard', desc: 'Onaylı konsepte göre senaryo yazıyor ve görsel planlamayı (storyboard) hazırlıyoruz.' },
                { step: '03', title: 'Çekim Günü', desc: 'Profesyonel ekipman ve deneyimli ekibimizle çekim günü sahneleri hayata geçiriyoruz.' },
                { step: '04', title: 'Post-Prodüksiyon', desc: 'Kurgu, renk düzeltme, ses tasarımı ve motion graphics ile videoya son halini veriyoruz.' },
                { step: '05', title: 'Teslimat & Yayın', desc: 'Her platform için optimize edilmiş formatlarda teslim ediyoruz. İsterseniz yayın sürecini de yönetiyoruz.' },
            ],
            stats: [
                { value: '50+', label: 'Tamamlanan Proje' },
                { value: '4K', label: 'Ultra HD Kalite' },
                { value: '100%', label: 'Müşteri Memnuniyeti' },
                { value: '7/24', label: 'Destek' },
            ],
            cta_title: 'Projenizi Hayata Geçirelim',
            cta_sub: 'Reklam filminiz, kurumsal videonuz veya sosyal medya içerik planınız için WhatsApp\'tan yazın.',
            cta_btn: 'WhatsApp\'tan Teklif Al',
        },
        en: {
            badge: 'Production',
            hero_title: 'Professional Video Production',
            hero_title2: 'That Brings Your Brand to the Screen',
            hero_desc: 'We manage your entire production process from concept to final cut. We make your brand unforgettable with advertising films, promotional videos, and corporate content.',
            section_title: 'Our Production Services',
            section_sub: 'We offer video production solutions suited to every budget and every industry.',
            services: [
                { icon: <Film size={32} className="text-brand-600" />, title: 'Advertising Film', desc: 'We produce broadcast-quality advertising films that communicate your brand to your target audience most effectively. Custom formats for TV, social media, and digital platforms.' },
                { icon: <Clapperboard size={32} className="text-brand-600" />, title: 'Corporate Presentation Film', desc: 'Corporate videos that present your company, services, and team in the most professional way. Persuasive content for investors, clients, and stakeholders.' },
                { icon: <Tv size={32} className="text-brand-600" />, title: 'Social Media Videos', desc: 'Short-form video content optimized for Instagram Reels, TikTok, and YouTube Shorts with high viral potential. We grow your account with regular content production.' },
                { icon: <Play size={32} className="text-brand-600" />, title: 'Product Showcase Video', desc: 'Sales-driven product presentation videos for e-commerce and retail that show your products from the most appealing angles. Content strategy that boosts conversion rates.' },
            ],
            process_title: 'Our Production Process',
            process: [
                { step: '01', title: 'Briefing & Concept', desc: 'We listen to your needs, clarify your target audience and message. We develop a creative concept.' },
                { step: '02', title: 'Script & Storyboard', desc: 'Based on the approved concept, we write the script and prepare the visual plan (storyboard).' },
                { step: '03', title: 'Shoot Day', desc: 'We bring the scenes to life on shoot day with professional equipment and our experienced crew.' },
                { step: '04', title: 'Post-Production', desc: 'We finalize the video with editing, color correction, sound design, and motion graphics.' },
                { step: '05', title: 'Delivery & Distribution', desc: 'We deliver in formats optimized for every platform. We can also manage the distribution process for you.' },
            ],
            stats: [
                { value: '50+', label: 'Completed Projects' },
                { value: '4K', label: 'Ultra HD Quality' },
                { value: '100%', label: 'Client Satisfaction' },
                { value: '24/7', label: 'Support' },
            ],
            cta_title: "Let's Bring Your Project to Life",
            cta_sub: 'Message us on WhatsApp for your advertising film, corporate video, or social media content plan.',
            cta_btn: 'Get a Quote on WhatsApp',
        },
    };

    const c = content[lang];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-gray-50">
                <div className="absolute inset-0 z-0"><ColorfulBlobs variant="hero" /></div>
                <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="inline-block bg-brand-600/10 text-brand-600 font-semibold text-sm px-4 py-2 rounded-full mb-4 tracking-wider uppercase">{c.badge}</span>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                            {c.hero_title}<br />
                            <span className="text-brand-600">{c.hero_title2}</span>
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-10">{c.hero_desc}</p>
                        <motion.a href="https://wa.me/905488755461" target="_blank" rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 bg-brand-600 text-white font-black text-lg px-10 py-4 rounded-full shadow-xl hover:bg-brand-700 transition-colors">
                            {c.cta_btn} <ArrowRight size={20} />
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-14 bg-brand-600">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {c.stats.map((s, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                                <div className="text-4xl md:text-5xl font-black text-white mb-1">{s.value}</div>
                                <div className="text-white/70 text-sm font-medium">{s.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 px-4 md:px-8">
                <div className="container mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">{c.section_title}</h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">{c.section_sub}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {c.services.map((svc, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="w-14 h-14 bg-brand-600/10 rounded-2xl flex items-center justify-center mb-5">{svc.icon}</div>
                                <h3 className="text-xl font-black text-gray-900 mb-3">{svc.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{svc.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20 px-4 md:px-8 bg-gray-50">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 text-center mb-14">{c.process_title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {c.process.map((step, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                                <div className="text-4xl font-black text-brand-600/20 mb-3">{step.step}</div>
                                <h3 className="font-black text-gray-900 mb-2 text-sm">{step.title}</h3>
                                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 md:px-8 bg-brand-600">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4">{c.cta_title}</h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">{c.cta_sub}</p>
                    <a href="https://wa.me/905488755461" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-brand-600 font-black text-lg px-10 py-4 rounded-full shadow-xl hover:bg-gray-100 transition-colors">
                        {c.cta_btn} <ArrowRight size={20} />
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Produksiyon;
