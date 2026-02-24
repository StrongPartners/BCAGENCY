import React from 'react';
import useSEO from '../hooks/useSEO';
import { motion } from 'framer-motion';
import { Layout, Smartphone, Globe, Code2, Sparkles, Zap, ArrowRight, ShieldCheck, Search, LayoutTemplate } from 'lucide-react';
import ColorfulBlobs from './ColorfulBlobs';
import { useLanguage } from '../context/LanguageContext';

const WebDesign = () => {
    const { lang } = useLanguage();
    const isTr = lang === 'tr';

    const webContent = {
        tr: {
            hero_title: "KKTC Web Tasarım & Kurumsal Web Yazılım",
            hero_sub: "Hızlı, Mobil Uyumlu ve Satış Odaklı Web Siteleri.",
            hero_desc: "BC Creative Agency ile markanızın dijital yüzünü baştan yaratın. Sadece 'güzel' görünen bir site değil; Google sevgi dolu, aşırı hızlı ve ziyaretçiyi müşteriye dönüştüren profesyonel platformlar inşa ediyoruz.",

            section1_title: "Neden Bizimle Çalışmalısınız?",
            section1_subtitle: "Eski nesil web sitelerini unutun. Modern teknolojilerle markanızı dijital dünyada bir adım öne taşıyoruz.",

            features: [
                {
                    title: "Ultra Hızlı Altyapı",
                    desc: "Saniyeler içinde açılan sitelerle hem kullanıcılarınızı hem de Google botlarını mutlu ediyoruz. Hız, bizim için bir standarttır.",
                    icon: <Zap className="text-brand-600" size={32} />
                },
                {
                    title: "Kusursuz Mobil Deneyim",
                    desc: "Tüm cihazlarda (telefon, tablet, masaüstü) mükemmel çalışan, duyarlı (responsive) tasarımlar hazırlıyoruz.",
                    icon: <Smartphone className="text-brand-600" size={32} />
                },
                {
                    title: "SEO Uyumlu Kodlama",
                    desc: "Sitenizi geliştirirken en baştan SEO kurallarına uygun kodluyoruz. Google aramalarında görünürlüğünüzü artırıyoruz.",
                    icon: <Search className="text-brand-600" size={32} />
                },
                {
                    title: "E-Ticaret & Özel Yazılım",
                    desc: "Satış odaklı e-ticaret sitelerinden, firmanıza özel karmaşık web yazılımlarına kadar tüm ihtiyaçlarınıza çözüm üretiyoruz.",
                    icon: <Code2 className="text-brand-600" size={32} />
                }
            ],

            process_title: "Web Tasarım Serüvenimiz",
            process_steps: [
                { step: "01", title: "İhtiyaç Analizi", desc: "Markanızı ve hedeflerinizi anlayıp, sitenizin kurgusunu ve kullanıcı haritasını çıkarıyoruz." },
                { step: "02", title: "Modern Tasarım", desc: "Markanıza özel, trendlere uygun ve kullanıcı dostu arayüzler tasarlıyoruz." },
                { step: "03", title: "Gelişmiş Kodlama", desc: "Tasarımı en güncel yazılım dilleriyle hayata geçiriyor, test süreçlerini tamamlıyoruz." },
                { step: "04", title: "Yayın & Destek", desc: "Sitenizi yayına alıyor ve sonrasında teknik destekle yanınızda olmaya devam ediyoruz." }
            ],

            cta_title: "Siteniz Eskidi mi Yoksa Hiç mi Yok?",
            cta_sub: "KKTC'nin en modern web tasarım çözümleriyle tanışın. Hemen projeniz için teklif alın.",
            cta_btn: "Ücretsiz Web Proje Analizi İste"
        },
        en: {
            hero_title: "TRNC Web Design & Corporate Web Development",
            hero_sub: "Fast, Mobile-Friendly, and Sales-Driven Websites.",
            hero_desc: "Recreate your brand's digital face with BC Creative Agency. We don't just build 'pretty' sites; we engineer ultra-fast, Google-friendly, and conversion-optimized professional platforms.",

            section1_title: "Why Build With Us?",
            section1_subtitle: "Forget old-generation websites. We propel your brand ahead in the digital world using cutting-edge technologies.",

            features: [
                {
                    title: "Ultra-Fast Infrastructure",
                    desc: "We please both your users and Google bots with sites that load in seconds. Speed is our standard.",
                    icon: <Zap className="text-brand-600" size={32} />
                },
                {
                    title: "Flawless Mobile Experience",
                    desc: "We create responsive designs that work perfectly across all devices—phones, tablets, and desktops.",
                    icon: <Smartphone className="text-brand-600" size={32} />
                },
                {
                    title: "SEO-Ready Coding",
                    desc: "We code your site from scratch following SEO best practices, boosting your visibility in Google searches.",
                    icon: <Search className="text-brand-600" size={32} />
                },
                {
                    title: "E-Commerce & Custom Software",
                    desc: "From sales-driven e-commerce stores to complex custom web software, we build solutions for all your needs.",
                    icon: <Code2 className="text-brand-600" size={32} />
                }
            ],

            process_title: "Our Web Design Journey",
            process_steps: [
                { step: "01", title: "Needs Analysis", desc: "We understand your brand and goals, mapping out your site's structure and user journey." },
                { step: "02", title: "Modern Design", desc: "We design custom, user-friendly interfaces that align with the latest digital trends." },
                { step: "03", title: "Advanced Coding", desc: "We bring designs to life with the latest programming languages and rigorous testing." },
                { step: "04", title: "Launch & Support", desc: "We launch your site and provide ongoing technical support to ensure your success." }
            ],

            cta_title: "Is Your Site Outdated, or Is It Non-Existent?",
            cta_sub: "Meet Northern Cyprus's most modern web design solutions. Get a quote for your project now.",
            cta_btn: "Get Free Web Project Analysis"
        }
    };

    const content = webContent[lang] || webContent.tr;

    useSEO({
        title: isTr ? 'KKTC Web Tasarım | Modern & Kurumsal Web Sitesi - BC Creative' : 'TRNC Web Design | Modern & Corporate Website - BC Creative',
        description: isTr ? 'KKTC\'de profesyonel web tasarım ve yazılım hizmetleri. Mobil uyumlu, hızlı ve SEO odaklı web siteleri. Girne web tasarım ajansı.' : 'Professional web design and software services in Northern Cyprus. Mobile-friendly, fast and SEO-focused websites. Kyrenia web design agency.',
        keywords: 'KKTC web tasarım, Kuzey Kıbrıs web sitesi, Girne yazılım ajansı, KKTC e-ticaret siteleri, kurumsal web tasarım KKTC',
        canonical: 'https://bccreative.agency/hizmetler/web-tasarim',
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
                    <div className="max-w-4xl text-left">
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

            {/* Platform Badge Section */}
            <section className="py-24 bg-white px-4">
                <div className="container mx-auto">
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-32">
                        <div className="flex items-center gap-3 grayscale opacity-40">
                            <Layout size={40} className="text-gray-900" />
                            <span className="text-2xl font-black">UI/UX</span>
                        </div>
                        <div className="flex items-center gap-3 grayscale opacity-40">
                            <Code2 size={40} className="text-gray-900" />
                            <span className="text-2xl font-black">React</span>
                        </div>
                        <div className="flex items-center gap-3 grayscale opacity-40">
                            <LayoutTemplate size={40} className="text-gray-900" />
                            <span className="text-2xl font-black">Next.js</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 bg-gray-50 px-4">
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
                                className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col items-start"
                            >
                                <div className="p-4 bg-brand-50 rounded-2xl text-brand-600 mb-6">
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
            <section className="py-32 bg-gray-900 text-white px-4">
                <div className="container mx-auto">
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

export default WebDesign;
