import React from 'react';
import useSEO from '../hooks/useSEO';
import { motion } from 'framer-motion';
import { Camera, Image, Video, Aperture, ArrowRight, CheckCircle2 } from 'lucide-react';
import ColorfulBlobs from './ColorfulBlobs';
import { useLanguage } from '../context/LanguageContext';

const FotografVideo = () => {
    const { lang } = useLanguage();
    const isTr = lang === 'tr';

    useSEO({
        title: isTr ? 'Fotoğraf & Video Çekim | BC Creative Agency KKTC' : 'Photography & Video | BC Creative Agency TRNC',
        description: isTr
            ? 'KKTC\'de profesyonel fotoğraf ve video çekim hizmetleri. Ürün fotoğrafçılığı, mekân çekimleri ve kurumsal içerik üretimi Kuzey Kıbrıs.'
            : 'Professional photography and video services in TRNC. Product photography, venue shoots, and corporate content production in North Cyprus.',
        keywords: isTr
            ? 'KKTC fotoğraf çekim, Girne ürün fotoğrafçılığı, video çekim Kuzey Kıbrıs, kurumsal fotoğraf KKTC'
            : 'TRNC photography, Kyrenia product photography, video production North Cyprus, corporate photography TRNC',
        canonical: 'https://bccreative.agency/hizmetler/fotograf-video',
    });

    const content = {
        tr: {
            badge: 'Fotoğraf & Video',
            hero_title: 'Markanızı Görsel Olarak',
            hero_title2: 'Güçlendiriyoruz',
            hero_desc: 'Ürününüzden mekânınıza, ekibinizden etkinliğinize kadar her şeyi en etkileyici şekilde görüntülüyoruz. Profesyonel stüdyo ve saha ekipmanlarıyla yayın kalitesinde fotoğraf ve video.',
            section_title: 'Fotoğraf & Video Hizmetlerimiz',
            section_sub: 'Her sektöre ve platforma uygun görsel içerik üretiminde tam hizmet.',
            services: [
                { icon: <Image size={32} className="text-brand-600" />, title: 'Ürün Fotoğrafçılığı', desc: 'E-ticaret, katalog ve sosyal medya için profesyonel ürün fotoğrafları. Beyaz fon, yaratıcı düzenleme ve lifestyle çekimler. Satışlarınızı artıracak görsel içerik.' },
                { icon: <Aperture size={32} className="text-brand-600" />, title: 'Mekân & İç Mimari Fotoğrafçılığı', desc: 'Restoranlar, oteller, ofisler ve mağazalar için mekânınızın atmosferini en iyi yansıtan profesyonel fotoğraflar. Emlak ilanı ve tanıtım materyali.' },
                { icon: <Video size={32} className="text-brand-600" />, title: 'Kurumsal Fotoğraf & Video', desc: 'Ekip fotoğrafları, ofis çekimleri, etkinlik belgeleme ve kurumsal tanıtım videoları. Markanızın profesyonel imajını güçlendiren içerikler.' },
                { icon: <Camera size={32} className="text-brand-600" />, title: 'Sosyal Medya İçerik Üretimi', desc: 'Instagram, Facebook ve TikTok için optimize edilmiş düzenli fotoğraf ve video içeriği. Reels, hikaye formatları ve feed tasarımı uyumlu görseller.' },
            ],
            features: [
                'Profesyonel stüdyo ekipmanı',
                'Saha ve lokasyon çekimleri',
                'Hızlı retouching ve düzenleme',
                'RAW + JPEG teslim seçeneği',
                'Marka kılavuzuna uyumlu renk düzenleme',
                'Sosyal medya formatlarında teslim',
            ],
            process_title: 'Çekim Sürecimiz',
            process: [
                { step: '01', title: 'Brifing', desc: 'Hedeflerinizi, markanızı ve çekim ihtiyaçlarınızı dinliyor, konsept oluşturuyoruz.' },
                { step: '02', title: 'Hazırlık', desc: 'Ekipman, lokasyon ve ışık kurulumunu tamamlıyor, çekim günü programı yapıyoruz.' },
                { step: '03', title: 'Çekim', desc: 'Profesyonel fotoğraf makineleri ve aydınlatma ekipmanlarıyla yüksek kaliteli çekim yapıyoruz.' },
                { step: '04', title: 'Düzenleme', desc: 'Renk düzeltme, retouching ve kurgu ile içerikleri marka standartlarına göre hazırlıyoruz.' },
                { step: '05', title: 'Teslimat', desc: 'Tüm platformlar için optimize edilmiş formatlarda dijital teslimat yapıyoruz.' },
            ],
            stats: [
                { value: '200+', label: 'Tamamlanan Çekim' },
                { value: '50MP+', label: 'Yüksek Çözünürlük' },
                { value: '4K', label: 'Video Kalitesi' },
                { value: '48h', label: 'Teslimat Süresi' },
            ],
            cta_title: 'Çekim Planınızı Oluşturalım',
            cta_sub: 'Fotoğraf veya video çekim ihtiyacınızı WhatsApp\'tan bildirin, size özel paket hazırlayalım.',
            cta_btn: 'WhatsApp\'tan Teklif Al',
        },
        en: {
            badge: 'Photo & Video',
            hero_title: 'Strengthening Your Brand',
            hero_title2: 'Visually',
            hero_desc: 'We capture everything from your products to your venue, your team to your event in the most impressive way. Broadcast-quality photography and video with professional studio and field equipment.',
            section_title: 'Our Photography & Video Services',
            section_sub: 'Full-service visual content production suited to every industry and platform.',
            services: [
                { icon: <Image size={32} className="text-brand-600" />, title: 'Product Photography', desc: 'Professional product photos for e-commerce, catalogs, and social media. White background, creative styling, and lifestyle shots. Visual content that boosts your sales.' },
                { icon: <Aperture size={32} className="text-brand-600" />, title: 'Venue & Interior Photography', desc: 'Professional photos that best reflect the atmosphere of your space for restaurants, hotels, offices, and stores. For property listings and promotional materials.' },
                { icon: <Video size={32} className="text-brand-600" />, title: 'Corporate Photography & Video', desc: 'Team photos, office shoots, event documentation, and corporate presentation videos. Content that strengthens your brand\'s professional image.' },
                { icon: <Camera size={32} className="text-brand-600" />, title: 'Social Media Content Production', desc: 'Regular photo and video content optimized for Instagram, Facebook, and TikTok. Reels, story formats, and feed-design-compatible visuals.' },
            ],
            features: [
                'Professional studio equipment',
                'Field and location shoots',
                'Fast retouching and editing',
                'RAW + JPEG delivery option',
                'Brand guide-compliant color editing',
                'Delivery in social media formats',
            ],
            process_title: 'Our Shooting Process',
            process: [
                { step: '01', title: 'Briefing', desc: 'We listen to your goals, brand, and shooting needs to develop a concept.' },
                { step: '02', title: 'Preparation', desc: 'We complete equipment, location, and lighting setup, then plan the shoot day schedule.' },
                { step: '03', title: 'Shooting', desc: 'We shoot high-quality content with professional cameras and lighting equipment.' },
                { step: '04', title: 'Editing', desc: 'We prepare content to brand standards with color correction, retouching, and editing.' },
                { step: '05', title: 'Delivery', desc: 'We deliver digitally in formats optimized for all platforms.' },
            ],
            stats: [
                { value: '200+', label: 'Completed Shoots' },
                { value: '50MP+', label: 'High Resolution' },
                { value: '4K', label: 'Video Quality' },
                { value: '48h', label: 'Delivery Time' },
            ],
            cta_title: "Let's Plan Your Shoot",
            cta_sub: "Tell us your photography or video needs on WhatsApp and we'll prepare a custom package for you.",
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

            {/* Features */}
            <section className="py-20 px-4 md:px-8 bg-gray-50">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12">
                        {isTr ? 'Neden BC Creative Agency?' : 'Why BC Creative Agency?'}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
                        {c.features.map((feature, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                                className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100">
                                <CheckCircle2 size={20} className="text-brand-600 shrink-0" />
                                <span className="text-gray-700 font-medium text-sm">{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20 px-4 md:px-8">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 text-center mb-14">{c.process_title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {c.process.map((step, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                className="bg-gray-50 rounded-2xl p-6 text-center shadow-sm border border-gray-100">
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

export default FotografVideo;
