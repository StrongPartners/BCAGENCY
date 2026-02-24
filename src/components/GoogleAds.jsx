import React from 'react';
import useSEO from '../hooks/useSEO';
import { motion } from 'framer-motion';
import { Target, TrendingUp, BarChart3, MousePointer2, Megaphone, Zap, ArrowRight, ShieldCheck, Search, Users } from 'lucide-react';
import ColorfulBlobs from './ColorfulBlobs';
import { useLanguage } from '../context/LanguageContext';

const GoogleAds = () => {
    const { lang } = useLanguage();
    const isTr = lang === 'tr';

    const adsContent = {
        tr: {
            hero_title: "KKTC Google Ads Yönetimi & Performan Pazarlaması",
            hero_sub: "Doğru Kitleye, Doğru Zamanda, En Düşük Maliyetle Ulaşın.",
            hero_desc: "BC Creative Agency olarak, reklam bütçenizin her kuruşunu satışa dönüştürüyoruz. Google Arama Ağı, Görüntülü Reklam ve YouTube ads stratejilerimizle markanızı karlı bir büyüme yolculuğuna çıkarıyoruz.",

            section1_title: "Neden Profesyonel Reklam Yönetimi?",
            section1_subtitle: "Karmaşık reklam panelleriyle vakit kaybetmeyin. Veriye dayalı optimizasyonla yatırım getirinizi (ROI) maksimize edelim.",

            features: [
                {
                    title: "Hassas Hedefleme",
                    desc: "Sadece KKTC'de veya dünyanın herhangi bir yerinde, tam da sizin verdiğiniz hizmeti arayan kişileri nokta atışı hedefliyoruz.",
                    icon: <Target className="text-brand-600" size={32} />
                },
                {
                    title: "Bütçe Verimliliği",
                    desc: "Sürekli negatif anahtar kelime takibi ve teklif optimizasyonu ile tık başı maliyetlerinizi düşürüyor, bütçenizi koruyoruz.",
                    icon: <BarChart3 className="text-brand-600" size={32} />
                },
                {
                    title: "YouTube & Görüntülü Reklam",
                    desc: "Markanızı sadece aramalarda değil, tüm Google ekosisteminde (YouTube, Haber siteleri vb.) görsel ve video reklamlarla tanıtıyoruz.",
                    icon: <Megaphone className="text-brand-600" size={32} />
                },
                {
                    title: "Şeffaf Raporlama",
                    desc: "Gelen her kuruşun nereye gittiğini, kaç tık ve kaç form aldığınızı her ay detaylı ve anlaşılır raporlarla sunuyoruz.",
                    icon: <TrendingUp className="text-brand-600" size={32} />
                }
            ],

            process_title: "Google Ads Çalışma Sürecimiz",
            process_steps: [
                { step: "01", title: "Pazar Araştırması", desc: "Rakiplerinizin ne kadar harcadığını ve hangi kelimelere odaklandığını analiz ediyoruz." },
                { step: "02", title: "Kampanya Kurulumu", desc: "Yüksek dönüşüm oranlı reklam metinleri ve hedef kitle ayarlarıyla hesabınızı hazırlıyoruz." },
                { step: "03", title: "Sürekli Optimizasyon", desc: "Verileri günlük takip ediyor, en iyi performansı veren reklamları öne çıkarıyoruz." },
                { step: "04", title: "Ölçeklendirme", desc: "Karlı olan kampanyaların bütçesini artırarak büyümenizi hızlandırıyoruz." }
            ],

            cta_title: "Reklam Bütçeniz Satışa Dönüşüyor Mu?",
            cta_sub: "BC Creative Agency ile Google reklamlarından maksimum verim alın. Profesyonel danışmanlık için iletişime geçin.",
            cta_btn: "Reklam Analizi & Teklif İste"
        },
        en: {
            hero_title: "TRNC Google Ads Management & Performance Marketing",
            hero_sub: "Reach the Right Audience at the Right Time with Lowest Costs.",
            hero_desc: "At BC Creative Agency, we turn every cent of your advertising budget into sales. We lead your brand through a profitable growth journey with Search, Display, and YouTube ads strategies.",

            section1_title: "Why Professional Ad Management?",
            section1_subtitle: "Don't waste time with complex ad panels. Let's maximize your Return on Investment (ROI) with data-driven optimization.",

            features: [
                {
                    title: "Precision Targeting",
                    desc: "We pinpoint people searching specifically for your services, whether in the TRNC or anywhere else in the world.",
                    icon: <Target className="text-brand-600" size={32} />
                },
                {
                    title: "Budget Efficiency",
                    desc: "Through constant negative keyword tracking and bid optimization, we lower your cost-per-click and protect your budget.",
                    icon: <BarChart3 className="text-brand-600" size={32} />
                },
                {
                    title: "YouTube & Display Ads",
                    desc: "We promote your brand across the entire Google ecosystem (YouTube, News sites, etc.) using visual and video ads.",
                    icon: <Megaphone className="text-brand-600" size={32} />
                },
                {
                    title: "Transparent Reporting",
                    desc: "We provide detailed, clear monthly reports showing exactly where your money goes and how many leads you gain.",
                    icon: <TrendingUp className="text-brand-600" size={32} />
                }
            ],

            process_title: "Our Google Ads Workflow",
            process_steps: [
                { step: "01", title: "Market Research", desc: "We analyze competitor spend and keyword focus to find your advantage." },
                { step: "02", title: "Campaign Setup", desc: "We prepare your account with high-converting copy and precise audience settings." },
                { step: "03", title: "Constant Optimization", desc: "Daily data monitoring ensures we double down on what works best." },
                { step: "04", title: "Scaling", desc: "We increase budgets for profitable campaigns to accelerate your growth." }
            ],

            cta_title: "Is Your Ad Budget Turning Into Sales?",
            cta_sub: "Maximize your Google ads efficiency with BC Creative Agency. Contact us for professional consultancy.",
            cta_btn: "Get Ad Analysis & Quote"
        }
    };

    const content = adsContent[lang] || adsContent.tr;

    useSEO({
        title: isTr ? 'KKTC Google Ads Yönetimi | Profesyonel Reklam Ajansı - BC Creative' : 'TRNC Google Ads Management | Professional Ad Agency - BC Creative',
        description: isTr ? 'KKTC\'de profesyonel Google Ads yönetimi. Google reklam bütçenizi satışa dönüştürün. Girne ve Lefkoşa performans pazarlama ajansı.' : 'Professional Google Ads management in Northern Cyprus. Turn your ad budget into sales. Kyrenia and Nicosia performance marketing agency.',
        keywords: 'KKTC Google Ads, Kuzey Kıbrıs reklam ajansı, Girne Google reklamları, KKTC dijital pazarlama, Google Ads uzmanı KKTC, reklam yönetimi Girne',
        canonical: 'https://bccreative.agency/hizmetler/google-ads',
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
                            className="text-2xl md:text-3xl text-brand-600 font-bold mb-8 leading-tight"
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
                            {content.cta_btn} <ArrowRightIcon size={20} />
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

            {/* Stats/Badge Section */}
            <section className="py-24 bg-gray-50 px-4">
                <div className="container mx-auto">
                    <div className="bg-white rounded-[4rem] p-12 shadow-2xl border border-gray-100 flex flex-wrap justify-around items-center gap-12 text-center">
                        <div>
                            <div className="text-6xl font-black text-brand-600 mb-2">10X+</div>
                            <div className="text-gray-500 font-bold uppercase tracking-wider">{isTr ? "Ciro Artışı" : "Revenue Growth"}</div>
                        </div>
                        <div className="h-20 w-px bg-gray-100 hidden md:block" />
                        <div>
                            <div className="text-6xl font-black text-brand-600 mb-2">35%</div>
                            <div className="text-gray-500 font-bold uppercase tracking-wider">{isTr ? "Düşük Tık Maliyeti" : "Lower CPC"}</div>
                        </div>
                        <div className="h-20 w-px bg-gray-100 hidden md:block" />
                        <div>
                            <div className="text-6xl font-black text-brand-600 mb-2">7/24</div>
                            <div className="text-gray-500 font-bold uppercase tracking-wider">{isTr ? "Destek & Takip" : "Support & Tracking"}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-32 bg-gray-900 text-white px-4">
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
                            </div>
                        ))}
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
        </div>
    );
};

const ArrowRightIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

export default GoogleAds;
