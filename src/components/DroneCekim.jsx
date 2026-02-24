import React from 'react';
import useSEO from '../hooks/useSEO';
import { motion } from 'framer-motion';
import { Camera, MapPin, Wind, Eye, ArrowRight, CheckCircle2 } from 'lucide-react';
import ColorfulBlobs from './ColorfulBlobs';
import { useLanguage } from '../context/LanguageContext';

const DroneCekim = () => {
    const { lang } = useLanguage();
    const isTr = lang === 'tr';

    useSEO({
        title: isTr ? 'Drone Çekim Hizmetleri | BC Creative Agency KKTC' : 'Drone Photography Services | BC Creative Agency TRNC',
        description: isTr
            ? 'KKTC\'de profesyonel drone çekim hizmetleri. Hava fotoğrafçılığı, mülk tanıtımı, etkinlik ve turizm drone videoları Kuzey Kıbrıs.'
            : 'Professional drone shooting services in TRNC. Aerial photography, property showcase, event and tourism drone videos in North Cyprus.',
        keywords: isTr
            ? 'KKTC drone çekim, Girne hava fotoğrafçılığı, drone video Kuzey Kıbrıs, havadan çekim KKTC'
            : 'TRNC drone shooting, Kyrenia aerial photography, drone video North Cyprus, aerial filming TRNC',
        canonical: 'https://bccreative.agency/hizmetler/drone-cekim',
    });

    const content = {
        tr: {
            badge: 'Drone Çekim',
            hero_title: 'KKTC\'yi Yukarıdan Keşfedin',
            hero_title2: 'Profesyonel Drone Çekim',
            hero_desc: 'Kuzey Kıbrıs\'ın benzersiz manzaralarını en etkileyici açıdan yakalıyoruz. Mülk tanıtımından turizm kampanyalarına, etkinliklerden kurumsal içeriklere kadar profesyonel hava görüntüleri.',
            section_title: 'Drone Çekim Hizmetlerimiz',
            section_sub: 'KKTC\'nin engebeli arazisini, kristal berraklığındaki koylarını ve tarihi dokusunu havadan belgeleyen içerikler üretiyoruz.',
            services: [
                { icon: <MapPin size={32} className="text-brand-600" />, title: 'Gayrimenkul & Mülk Tanıtımı', desc: 'Satılık veya kiralık mülklerinizi havadan çekimle en etkileyici şekilde tanıtın. Villalar, arsalar ve ticari gayrimenkuller için 4K drone görüntüleri.' },
                { icon: <Wind size={32} className="text-brand-600" />, title: 'Turizm & Otel Tanıtımı', desc: 'Otelinizin, resort\'unuzun veya turizm destinasyonunuzun en güzel cephesini gösterin. Havadan çekimler rezervasyonları ve ilgiyi artırır.' },
                { icon: <Camera size={32} className="text-brand-600" />, title: 'Etkinlik & Organizasyon', desc: 'Düğünler, kurumsal etkinlikler, festivaller ve açılışlar için unutulmaz hava görüntüleri. Etkinliğinizin büyüklüğünü ve atmosferini yansıtın.' },
                { icon: <Eye size={32} className="text-brand-600" />, title: 'Altyapı & İnşaat Takibi', desc: 'İnşaat projelerinizin ilerleme fotoğrafları ve videoları. Periyodik hava görüntüleriyle saha takibi, proje belgeleme ve raporlama.' },
            ],
            features: [
                '4K Ultra HD görüntü kalitesi',
                'Lisanslı ve sigortalı operatörler',
                'RAW format teslim seçeneği',
                'Hızlı teslimat (24-48 saat)',
                'Rüzgar ve hava koşullarına göre planlama',
                'Gerekli uçuş izinleri dahil',
            ],
            process_title: 'Çekim Sürecimiz',
            process: [
                { step: '01', title: 'Lokasyon Keşfi', desc: 'Çekim alanını önceden inceliyor, uçuş rotasını ve açıları planlıyoruz.' },
                { step: '02', title: 'İzin & Planlama', desc: 'Gerekli uçuş izinlerini alıyor, hava durumu ve ışık koşullarına göre program yapıyoruz.' },
                { step: '03', title: 'Çekim Günü', desc: 'Profesyonel drone ekipmanlarıyla 4K kalitesinde ham görüntü ve fotoğraf çekimi yapıyoruz.' },
                { step: '04', title: 'Post-İşlem', desc: 'Renk düzeltme, stabilizasyon ve kurgu ile görüntüleri yayına hazır hale getiriyoruz.' },
                { step: '05', title: 'Teslimat', desc: 'Dijital teslim veya fiziksel medya seçeneğiyle tüm dosyaları paylaşıyoruz.' },
            ],
            stats: [
                { value: '100+', label: 'Tamamlanan Çekim' },
                { value: '4K', label: 'Ultra HD Kalite' },
                { value: 'KKTC', label: 'Lisanslı Operatör' },
                { value: '48h', label: 'Hızlı Teslimat' },
            ],
            cta_title: 'Projeniz İçin Teklif Alın',
            cta_sub: 'Drone çekim ihtiyacınızı WhatsApp\'tan bildirin, size özel fiyat teklifi hazırlayalım.',
            cta_btn: 'WhatsApp\'tan Teklif Al',
        },
        en: {
            badge: 'Drone Shooting',
            hero_title: 'Discover TRNC from Above',
            hero_title2: 'Professional Drone Filming',
            hero_desc: 'We capture the unique landscapes of North Cyprus from the most striking angles. Professional aerial footage for property showcases, tourism campaigns, events, and corporate content.',
            section_title: 'Our Drone Services',
            section_sub: 'We produce aerial content documenting TRNC\'s rugged terrain, crystal-clear coves, and historic fabric.',
            services: [
                { icon: <MapPin size={32} className="text-brand-600" />, title: 'Real Estate & Property Showcase', desc: 'Showcase your properties for sale or rent from the air in the most impressive way. 4K drone footage for villas, land plots, and commercial real estate.' },
                { icon: <Wind size={32} className="text-brand-600" />, title: 'Tourism & Hotel Promotion', desc: 'Show the most beautiful face of your hotel, resort, or tourism destination. Aerial footage increases bookings and interest.' },
                { icon: <Camera size={32} className="text-brand-600" />, title: 'Events & Occasions', desc: 'Unforgettable aerial footage for weddings, corporate events, festivals, and openings. Reflect the scale and atmosphere of your event.' },
                { icon: <Eye size={32} className="text-brand-600" />, title: 'Infrastructure & Construction Tracking', desc: 'Progress photos and videos of your construction projects. Site monitoring, project documentation, and reporting with periodic aerial footage.' },
            ],
            features: [
                '4K Ultra HD image quality',
                'Licensed and insured operators',
                'RAW format delivery option',
                'Fast turnaround (24-48 hours)',
                'Planning based on wind and weather conditions',
                'Required flight permits included',
            ],
            process_title: 'Our Shooting Process',
            process: [
                { step: '01', title: 'Location Scouting', desc: 'We pre-inspect the shooting area, plan the flight route and angles.' },
                { step: '02', title: 'Permits & Planning', desc: 'We obtain the necessary flight permits and schedule according to weather and light conditions.' },
                { step: '03', title: 'Shoot Day', desc: 'We capture 4K quality raw footage and photos using professional drone equipment.' },
                { step: '04', title: 'Post-Processing', desc: 'We prepare footage for broadcast with color correction, stabilization, and editing.' },
                { step: '05', title: 'Delivery', desc: 'We share all files via digital delivery or physical media.' },
            ],
            stats: [
                { value: '100+', label: 'Completed Shoots' },
                { value: '4K', label: 'Ultra HD Quality' },
                { value: 'TRNC', label: 'Licensed Operator' },
                { value: '48h', label: 'Fast Delivery' },
            ],
            cta_title: 'Get a Quote for Your Project',
            cta_sub: 'Tell us your drone filming needs on WhatsApp and we\'ll prepare a custom quote for you.',
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

export default DroneCekim;
