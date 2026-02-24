import React from 'react';
import useSEO from '../hooks/useSEO';
import { motion } from 'framer-motion';
import { Camera, Share2, Users, Heart, MessageSquare, Instagram, Facebook, Video, Zap, ArrowRight, TrendingUp } from 'lucide-react';
import ColorfulBlobs from './ColorfulBlobs';
import { useLanguage } from '../context/LanguageContext';

const SocialMedia = () => {
    const { lang } = useLanguage();
    const isTr = lang === 'tr';

    const smContent = {
        tr: {
            hero_title: "KKTC Sosyal Medya Yönetimi & İçerik Ajansı",
            hero_sub: "Markanızı Sosyal Medyada İlgi Odağı Haline Getirin.",
            hero_desc: "BC Creative Agency ile Instagram, TikTok ve Facebook'ta sadece var olmayın, domine edin. Yaratıcı içerikler, profesyonel çekimler ve stratejik yönetimle kitlenizi sadık bir topluluğa dönüştürüyoruz.",

            section1_title: "Sosyal Medyada Neden Biz?",
            section1_subtitle: "Kuru bir paylaşım düzeninden fazlasını vaat ediyoruz. Markanızın ruhunu yansıtan özgün bir dijital kimlik inşa ediyoruz.",

            features: [
                {
                    title: "Profesyonel İçerik Üretimi",
                    desc: "Sadece tasarım değil; hikayesi olan Reels videoları, profesyonel fotoğraf çekimleri ve dikkat çeken grafikler üretiyoruz.",
                    icon: <Camera className="text-brand-600" size={32} />
                },
                {
                    title: "Topluluk & Kriz Yönetimi",
                    desc: "Takipçilerinizle 7/24 etkileşim kuruyor, yorum ve mesajları yöneterek marka imajınızı koruyoruz.",
                    icon: <Users className="text-brand-600" size={32} />
                },
                {
                    title: "Stratejik Reklam Yönetimi",
                    desc: "Meta (Instagram/Facebook) ve TikTok reklamlarını en düşük maliyetle en yüksek etkileşimi alacak şekilde optimize ediyoruz.",
                    icon: <Zap className="text-brand-600" size={32} />
                },
                {
                    title: "Trend Takibi & Analiz",
                    desc: "Viral akımları markanıza uyarlıyor, performans verilerini her ay detaylı raporlarla masaya yatırıyoruz.",
                    icon: <TrendingUp className="text-brand-600" size={32} />
                }
            ],

            process_title: "Sosyal Medya Yönetim Yolculuğumuz",
            process_steps: [
                { step: "01", title: "Marka Analizi", desc: "Markanızın dilini, rakiplerinizi ve hedef kitlenizin davranışlarını çözümlüyoruz." },
                { step: "02", title: "İçerik Planı", desc: "Aylık paylaşım takviminizi stratejik hedefler doğrultusunda hazırlıyoruz." },
                { step: "03", title: "Üretim & Paylaşım", desc: "Tasarımları ve videoları hazırlayıp, en doğru saatlerde yayına alıyoruz." },
                { step: "04", title: "Etkileşim Artışı", desc: "Reklamlar ve organik etkileşim çalışmalarıyla hesabınızı büyütüyoruz." }
            ],

            cta_title: "Sosyal Medyada Hak Ettiğiniz İlgiyi Görmüyor Musunuz?",
            cta_sub: "KKTC'nin en yaratıcı sosyal medya ekibiyle tanışın, markanızı birlikte uçuralım.",
            cta_btn: "Ücretsiz Sosyal Medya Analizi İste"
        },
        en: {
            hero_title: "TRNC Social Media Management & Content Agency",
            hero_sub: "Make Your Brand the Center of Attention on Social Media.",
            hero_desc: "Don't just exist on Instagram, TikTok, and Facebook—dominate them with BC Creative Agency. We turn your audience into a loyal community through creative content, professional shoots, and strategic management.",

            section1_title: "Why Choose Us for Social Media?",
            section1_subtitle: "We promise more than just a dry posting schedule. We build a unique digital identity that reflects your brand's soul.",

            features: [
                {
                    title: "Professional Content Creation",
                    desc: "More than just design; we produce Reels with stories, professional photography, and eye-catching graphics.",
                    icon: <Camera className="text-brand-600" size={32} />
                },
                {
                    title: "Community Management",
                    desc: "We interact with your followers 24/7, managing comments and messages to protect your brand image.",
                    icon: <Users className="text-brand-600" size={32} />
                },
                {
                    title: "Strategic Ad Management",
                    desc: "We optimize Meta and TikTok ads to achieve the highest engagement at the lowest cost.",
                    icon: <Zap className="text-brand-600" size={32} />
                },
                {
                    title: "Trend Tracking & Analysis",
                    desc: "We adapt viral trends to your brand and review performance data through detailed monthly reports.",
                    icon: <TrendingUp className="text-brand-600" size={32} />
                }
            ],

            process_title: "Our Social Media Management Journey",
            process_steps: [
                { step: "01", title: "Brand Audit", desc: "We analyze your brand voice, competitors, and target audience behavior." },
                { step: "02", title: "Content Strategy", desc: "We prepare your monthly content calendar aligned with strategic goals." },
                { step: "03", title: "Production & Posting", desc: "We create designs and videos, publishing them at peak engagement times." },
                { step: "04", title: "Engagement Growth", desc: "We grow your account through ads and organic engagement tactics." }
            ],

            cta_title: "Not Getting the Attention You Deserve on Social Media?",
            cta_sub: "Meet TRNC's most creative social media team and let's elevate your brand together.",
            cta_btn: "Get Free Social Media Audit"
        }
    };

    const content = smContent[lang] || smContent.tr;

    useSEO({
        title: isTr ? 'KKTC Sosyal Medya Yönetimi | Instagram & TikTok Ajansı - BC Creative' : 'TRNC Social Media Management | Instagram & TikTok Agency - BC Creative',
        description: isTr ? 'KKTC\'de profesyonel sosyal medya yönetimi. Instagram, TikTok ve Facebook içerik üretimi. Girne yaratıcı reklam ajansı.' : 'Professional social media management in Northern Cyprus. Instagram, TikTok, and Facebook content creation. Kyrenia creative ad agency.',
        keywords: 'KKTC sosyal medya, Kuzey Kıbrıs Instagram yönetimi, Girne reklam ajansı, TikTok danışmanlığı KKTC, sosyal medya uzmanı Girne',
        canonical: 'https://bccreative.agency/hizmetler/sosyal-medya',
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

            {/* Platform Icons Section */}
            <section className="py-12 bg-gray-50 border-y border-gray-100 flex justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all">
                <Instagram size={48} />
                <Facebook size={48} />
                <Video size={48} />
                <Share2 size={48} />
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
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-600/5 to-transparent pointer-events-none" />
                <div className="container mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black mb-6">
                            {content.process_title}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {content.process_steps.map((step, i) => (
                            <div key={i} className="relative group">
                                <span className="text-8xl font-black text-white/5 absolute -top-10 left-0 leading-none select-none group-hover:text-brand-600/10 transition-colors">
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

export default SocialMedia;
