import React from 'react';
import useSEO from '../hooks/useSEO';
import { motion } from 'framer-motion';
import { Rocket, Target, TrendingUp, Search, CheckCircle2, Globe, MapPin, BarChart3, Users, Languages, Layout, MessageSquare, Video, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import ColorfulBlobs from './ColorfulBlobs';
import { useLanguage } from '../context/LanguageContext';

const SEO = () => {
    const { lang, t } = useLanguage();
    const isTr = lang === 'tr';

    const seoContent = {
        tr: {
            hero_title: "KKTC SEO Ajansı & Dijital Pazarlama Merkezi",
            hero_sub: "Google'da İlk Sırada Yer Alın, Müşterilerinizi Yakalayın.",
            hero_desc: "BC Creative Agency olarak, web sitenizi sadece bir tanıtım aracı olmaktan çıkarıp, 7/24 çalışan bir müşteri toplama makinesine dönüştürüyoruz. KKTC'deki potansiyel müşterilerinizin sizi bulmasını sağlıyoruz.",

            section1_title: "KKTC İçin Profesyonel SEO Çözümleri",
            section1_subtitle: "Kuzey Kıbrıs pazarına özel arama motoru optimizasyonu stratejileriyle rakiplerinizin önüne geçin. Girne, Lefkoşa ve Gazimağusa aramalarında görünür olun.",

            features: [
                {
                    title: "Sektörel Anahtar Kelime Stratejisi",
                    desc: "Hizmetlerinizi arayan kişileri doğrudan sitenize çekiyoruz. 'KKTC emlak', 'Girne araba kiralama' veya 'Kuzey Kıbrıs avukat' gibi niş kelimelerde üst sıralar için çalışıyoruz.",
                    icon: <Search className="text-brand-600" size={32} />
                },
                {
                    title: "Sayfa Hızı & Teknik SEO",
                    desc: "Google hızı sever. Sitenizi teknik açıdan optimize ederek hem kullanıcı deneyimini artırıyor hem de Google sıralamanızı yükseltiyoruz.",
                    icon: <Zap className="text-brand-600" size={32} />
                },
                {
                    title: "Yerel SEO & Google Haritalar",
                    desc: "Girne ve tüm KKTC genelindeki harita aramalarında görünür olun. İşletmenizi yerel aramaların merkezi haline getiriyoruz.",
                    icon: <MapPin className="text-brand-600" size={32} />
                },
                {
                    title: "İçerik Pazarlaması & Copywriting",
                    desc: "Sitenize yüksek trafik çekecek, anahtar kelime yoğunluğu optimize edilmiş ve ikna edici içerikler üretiyoruz.",
                    icon: <MessageSquare className="text-brand-600" size={32} />
                }
            ],

            process_title: "SEO İle Müşteri Kazanma Sürecimiz",
            process_steps: [
                { step: "01", title: "Detaylı SEO Analizi", desc: "Sitenizin tüm eksiklerini ve rakiplerinizin stratejilerini masaya yatırıyoruz." },
                { step: "02", title: "Hedef Odaklı Kelimeler", desc: "En çok müşteri kazandıracak anahtar kelimeleri tespit edip odaklanıyoruz." },
                { step: "03", title: "Site İçi Optimizasyon", desc: "Başlıklar, açıklamarlar ve teknik altyapıyı Google standartlarına getiriyoruz." },
                { step: "04", title: "Performans Raporlama", desc: "Sıralama değişimlerini ve gelen müşteri trafiğini düzenli olarak raporluyoruz." }
            ],

            cta_title: "İşletmenizi Google'da Zirveye Taşımaya Hazır Mısınız?",
            cta_sub: "KKTC'nin en etkili SEO stratejileriyle hemen tanışın. Ücretsiz site analizi için bize ulaşın.",
            cta_btn: "Ücretsiz SEO Analizi & Teklif İste"
        },
        en: {
            hero_title: "TRNC SEO Agency & Digital Marketing Hub",
            hero_sub: "Rank First on Google, Capture Your Customers.",
            hero_desc: "At BC Creative Agency, we transform your website into a 24/7 client acquisition machine. We ensure your potential customers in Northern Cyprus find you first.",

            section1_title: "Professional SEO Solutions for TRNC",
            section1_subtitle: "Stay ahead of your competitors with search engine optimization strategies specific to the North Cyprus market. Be visible in Kyrenia and Nicosia searches.",

            features: [
                {
                    title: "Niche Keyword Strategy",
                    desc: "We bring high-intent users directly to your site. We rank you for terms like 'TRNC real estate', 'Kyrenia car hire', or 'North Cyprus lawyer'.",
                    icon: <Search className="text-brand-600" size={32} />
                },
                {
                    title: "Speed & Technical SEO",
                    desc: "We optimize your technical structure according to Google's latest standards to improve rankings and user experience.",
                    icon: <Zap className="text-brand-600" size={32} />
                },
                {
                    title: "Local SEO Expertise",
                    desc: "Dominate Google Maps in Kyrenia and all TRNC regions. We make your business the center of local searches.",
                    icon: <MapPin className="text-brand-600" size={32} />
                },
                {
                    title: "Content Marketing",
                    desc: "We create persuasive, keyword-rich content that draws traffic and converts visitors into loyal customers.",
                    icon: <MessageSquare className="text-brand-600" size={32} />
                }
            ],

            process_title: "Our SEO Success Process",
            process_steps: [
                { step: "01", title: "Complete Audit", desc: "We analyze your site and your competitors to find every growth opportunity." },
                { step: "02", title: "Target Selection", desc: "We focus on high-conversion keywords that bring the most ROI to your business." },
                { step: "03", title: "Technical Setup", desc: "We implement on-page SEO, fixing headings, meta tags, and site structure." },
                { step: "04", title: "Monthly Growth", desc: "We track ranking progress and customer flow, providing transparent monthly reports." }
            ],

            cta_title: "Ready to Dominate Google Search?",
            cta_sub: "Meet the most effective SEO strategies in the TRNC. Contact us for a free audit today.",
            cta_btn: "Free SEO Audit & Quote"
        }
    };

    const content = seoContent[lang] || seoContent.tr;

    useSEO({
        title: isTr ? 'KKTC SEO Ajansı | Kuzey Kıbrıs SEO Hizmetleri - BC Creative' : 'TRNC SEO Agency | North Cyprus SEO Services - BC Creative',
        description: isTr ? 'KKTC odaklı profesyonel SEO hizmetleri. Google\'da ilk sırada yer alarak müşterilerinizi yakalayın. Girne ve Lefkoşa reklam ajansı.' : 'Professional SEO services focused on Northern Cyprus. Rank first on Google and capture your customers. Kyrenia and Nicosia advertising agency.',
        keywords: 'KKTC SEO, Kuzey Kıbrıs SEO, Girne SEO Ajansı, KKTC dijital pazarlama, Lefkoşa reklam ajansı, SEO uzmanı KKTC',
        canonical: 'https://bccreative.agency/hizmetler/seo',
    });

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-24 px-4">
                <div className="absolute inset-0 z-0">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                        <source src="/hero-bg.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
                    <ColorfulBlobs variant="hero" />
                </div>

                <div className="container mx-auto relative z-10">
                    <div className="max-w-4xl">
                        <motion.h1
                            className="text-5xl md:text-8xl font-black text-gray-900 mb-6 leading-none tracking-tighter"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {content.hero_title}
                        </motion.h1>
                        <motion.p
                            className="text-2xl md:text-4xl text-brand-600 font-bold mb-8 leading-tight"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {content.hero_sub}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg md:text-xl text-gray-700 font-medium max-w-2xl"
                        >
                            {content.hero_desc}
                        </motion.div>
                        <motion.button
                            onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-10 bg-brand-600 text-white px-10 py-4 rounded-full font-black text-lg shadow-2xl hover:bg-brand-700 transition-all flex items-center gap-3"
                        >
                            {content.cta_btn} <ArrowRight size={20} />
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 bg-white px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                            {content.section1_title}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
                            {content.section1_subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {content.features.map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="p-10 rounded-[3rem] bg-gray-50 border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col items-start"
                            >
                                <div className="p-4 bg-white rounded-2xl shadow-sm mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-black mb-4 text-gray-900">{feature.title}</h3>
                                <p className="text-gray-600 font-medium leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-32 bg-gray-900 text-white px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-600/10 blur-[150px] pointer-events-none" />
                <div className="container mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black mb-6">
                            {content.process_title}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {content.process_steps.map((step, i) => (
                            <div key={i} className="relative">
                                <span className="text-8xl font-black text-white/5 absolute -top-10 left-0 leading-none select-none">
                                    {step.step}
                                </span>
                                <div className="relative z-10">
                                    <h4 className="text-xl font-bold mb-4 text-brand-400">{step.title}</h4>
                                    <p className="text-gray-400 font-medium leading-relaxed">{step.desc}</p>
                                </div>
                                {i < 3 && <div className="hidden md:block absolute top-10 -right-4 w-8 h-px bg-gray-700" />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Local Stats Section */}
            <section className="py-32 bg-white px-4">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-16">
                        {isTr ? "KKTC Pazarında" : "Dominating the"} <span className="text-brand-600">{isTr ? "Zirveye Oynayın" : "TRNC Market"}</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="p-8 bg-gray-50 rounded-3xl">
                            <div className="text-5xl font-black text-brand-600 mb-2">90%</div>
                            <div className="text-gray-600 font-bold">{isTr ? "Tıklama Oranı İlk Sayfada" : "Clicks Occur on the First Page"}</div>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-3xl">
                            <div className="text-5xl font-black text-brand-600 mb-2">4X</div>
                            <div className="text-gray-600 font-bold">{isTr ? "Daha Fazla Dönüşüm" : "More Conversions via Organic"}</div>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-3xl">
                            <div className="text-5xl font-black text-brand-600 mb-2">7/24</div>
                            <div className="text-gray-600 font-bold">{isTr ? "Kesintisiz Müşteri Akışı" : "Continuous Customer Flow"}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-brand-600 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h2 className="text-3xl md:text-7xl font-black mb-8 leading-tight">
                        {content.cta_title}
                    </h2>
                    <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto font-medium">
                        {content.cta_sub}
                    </p>
                    <motion.button
                        onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-brand-600 px-12 py-5 rounded-full font-black text-2xl shadow-2xl hover:bg-gray-50 transition-colors"
                    >
                        {content.cta_btn}
                    </motion.button>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-24 bg-gray-50 px-4">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/3">
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
                                {isTr ? "Ofisimize" : "Visit"} <br /> <span className="text-brand-600">{isTr ? "Bekleriz" : "Our Office"}</span>
                            </h2>
                            <p className="text-gray-600 font-bold text-lg mb-8">
                                Fatih Sk, Aşağı Girne Mah. Ardem 11 Apt. Kat:3 No:14, Girne, KKTC
                            </p>
                            <button
                                onClick={() => window.open('https://www.google.com/maps/search/Fatih+Sokak+Ardem+11+Apartman%C4%B1+Kat+3+No+14+Girne+Kuzey+K%C4%B1br%C4%B1s/@35.3421,33.3184,17z', '_blank')}
                                className="bg-brand-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-brand-700 transition-all"
                            >
                                {isTr ? "Yol Tarifi Al" : "Get Directions"} →
                            </button>
                        </div>
                        <div className="md:w-2/3 w-full h-[400px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                            <iframe
                                title="BC Creative Agency Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.8!2d33.3184!3d35.3421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de1763498dfb09%3A0x0!2sFatih+Sk%2C+A%C5%9Fa%C4%9F%C4%B1+Girne+Mahallesi%2C+Girne!5e0!3m2!1str!2str!4v1700000000001"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SEO;
