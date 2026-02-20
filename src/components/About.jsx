import React, { useState, useEffect } from 'react';
import useSEO from '../hooks/useSEO';
import { motion, AnimatePresence } from 'framer-motion';
import ColorfulBlobs from './ColorfulBlobs';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();
    const actions = t('about_action_words');
    const [actionIndex, setActionIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActionIndex((prev) => (prev + 1) % actions.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [actions.length]);

    useSEO({
        title: 'Hakkımızda | BC Creative Agency - KKTC Girne Dijital Pazarlama Ajansı',
        description: 'BC Creative Agency hakkında bilgi edinin. Kuzey Kıbrıs Türk Cumhuriyeti Girne\'de kurulu dijital pazarlama ajansımız, 2017\'den bu yana markalara SEO, Google Ads, sosyal medya ve web tasarım hizmetleri sunmaktadır.',
        keywords: 'BC Creative Agency hakkında, KKTC dijital ajans ekibi, Kuzey Kıbrıs pazarlama ajansı, Girne reklam ajansı kimdir',
        canonical: 'https://bccreative.agency/about',
        ogTitle: 'Hakkımızda | BC Creative Agency - KKTC Girne',
        ogDescription: '2017\'den bu yana KKTC\'de dijital pazarlama hizmetleri sunan BC Creative Agency ekibini tanıyın.',
        ogUrl: 'https://bccreative.agency/about',
    });

    const aboutServices = t('about_services').map((s, i) => ({ ...s, number: `0${i + 1}` }));
    const visionItems = t('about_vision_items');
    const missionItems = t('about_mission_items');

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-32 md:py-48 px-4 md:px-8 overflow-hidden bg-gray-50">
                {/* Background Video Layer */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-[0.85]"
                >
                    <source src="/hero-bg.mp4" type="video/mp4" />
                </video>

                {/* Colorful Blobs Layer */}
                <div className="absolute inset-0 z-1">
                    <ColorfulBlobs variant="hero" />
                </div>

                <div className="container mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 text-left">
                            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 leading-none tracking-tighter min-h-[1.2em] flex flex-wrap items-center">
                                {t('about_hero_prefix')}&nbsp;
                                <span className="text-brand-600 inline-block relative">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={actionIndex}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className="flex"
                                        >
                                            {actions[actionIndex].split("").map((letter, i) => (
                                                <motion.span
                                                    key={i}
                                                    variants={{
                                                        initial: { opacity: 0, x: -20, rotateY: 90, scale: 0.8 },
                                                        animate: {
                                                            opacity: 1, x: 0, rotateY: 0, scale: 1,
                                                            transition: { type: "spring", damping: 12, stiffness: 100, delay: i * 0.05 }
                                                        },
                                                        exit: { opacity: 0, x: 20, rotateY: -90, transition: { duration: 0.2 } }
                                                    }}
                                                    className="inline-block"
                                                    style={{ perspective: "1000px" }}
                                                >
                                                    {letter === " " ? "\u00A0" : letter}
                                                </motion.span>
                                            ))}
                                        </motion.div>
                                    </AnimatePresence>
                                </span>
                            </h1>
                            <p className="text-gray-700 text-xl md:text-2xl font-medium leading-relaxed">
                                {t('about_hero_desc')}
                            </p>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <motion.div
                                animate={{ y: [0, -15, 0], rotate: [0, 1, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="relative z-10"
                            >
                                <img
                                    src="/marketing-hero-v3.jpg"
                                    alt="Digital Marketing"
                                    className="rounded-[3rem] shadow-2xl border-4 border-white/50"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-brand-600/20 blur-[100px] -z-1 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Bottom Curve Transition */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10 transform rotate-180">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] fill-white">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.32,37.5,102.74,30,204,47.5,310.87,19.25,102.69-27.15,183.23-93.59,306-93.59V0Z" />
                    </svg>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-4 md:px-8 bg-white relative">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
                                {t('about_who_title')} <span className="text-brand-600">?</span>
                            </h2>
                            <div className="w-32 h-2 bg-brand-600 rounded-full mb-8" />
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                <p>{t('about_who_p1')}</p>
                                <p>{t('about_who_p2')}</p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-video rounded-[2rem] border border-brand-600/20 overflow-hidden shadow-2xl group">
                                <img
                                    src="/about-rocket.jpg"
                                    alt="BC Creative Agency"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-brand-600/5 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-600/10 rounded-full blur-3xl -z-1" />
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-400/10 rounded-full blur-3xl -z-1" />
                        </div>
                    </div>

                    {/* Services Section */}
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 leading-none tracking-tight text-center">
                            {t('about_what_title')} <span className="text-brand-600">{t('about_what_title2')}</span>
                        </h2>
                        <div className="w-24 h-2 bg-brand-600 rounded-full mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {aboutServices.map((service, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-400/20 to-brand-600/20 rounded-bl-full transform translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500" />
                                <div className="absolute top-6 right-6 text-6xl font-black text-brand-600/5 group-hover:text-brand-600/10 transition-colors">
                                    {service.number}
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-brand-600 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-600 to-brand-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vision Section */}
                <div className="container mx-auto mt-40">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="flex flex-col h-full">
                            <div>
                                <div className="w-48 h-1 bg-brand-600/30 mb-8" />
                                <h2 className="text-5xl md:text-7xl font-black text-brand-600 mb-8 leading-tight tracking-tighter">
                                    {t('about_vision_title')}
                                </h2>
                            </div>
                            <div className="flex-1 relative rounded-3xl overflow-hidden border border-brand-600/20 shadow-2xl group min-h-[300px] lg:max-h-[600px]">
                                <img
                                    src="/about-vision.jpg"
                                    alt={t('about_vision_title')}
                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-brand-600/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                            </div>
                        </div>
                        <div className="space-y-12">
                            <p className="text-gray-500 text-xl font-medium leading-relaxed italic border-l-4 border-brand-600/20 pl-6">
                                {t('about_vision_desc')}
                            </p>
                            <div className="space-y-8">
                                {visionItems.map((item, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <span className="text-3xl font-black text-brand-600/20 group-hover:text-brand-600 transition-colors duration-300">
                                            {i + 1}.
                                        </span>
                                        <p className="text-gray-700 text-lg font-bold leading-relaxed pt-1">{item}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-brand-600/60 font-medium text-lg pt-10 border-t border-gray-100">
                                {t('about_vision_footer')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="container mx-auto mt-40">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="flex flex-col h-full">
                            <div>
                                <div className="w-48 h-1 bg-brand-600/30 mb-8" />
                                <h2 className="text-5xl md:text-7xl font-black text-brand-600 mb-8 leading-tight tracking-tighter">
                                    {t('about_mission_title')}
                                </h2>
                            </div>
                            <div className="flex-1 relative rounded-3xl overflow-hidden border border-brand-600/20 shadow-2xl group min-h-[300px] lg:max-h-[600px]">
                                <img
                                    src="/about-mission.jpg"
                                    alt={t('about_mission_title')}
                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-brand-600/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                            </div>
                        </div>
                        <div className="space-y-12">
                            <p className="text-gray-500 text-xl font-medium leading-relaxed italic border-l-4 border-brand-600/20 pl-6">
                                {t('about_mission_desc')}
                            </p>
                            <div className="space-y-8">
                                {missionItems.map((item, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <span className="text-3xl font-black text-brand-600/20 group-hover:text-brand-600 transition-colors duration-300">
                                            {i + 1}.
                                        </span>
                                        <div>
                                            <h4 className="text-gray-900 text-xl font-black mb-2">{item.title}</h4>
                                            <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
