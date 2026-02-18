import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Target, TrendingUp, BarChart3, MousePointer2, Megaphone } from 'lucide-react';
import ColorfulBlobs from './ColorfulBlobs';

const GoogleAds = () => {
    const title = "Google Ads Yönetimi";

    const benefits = [
        {
            icon: <Target className="w-8 h-8" />,
            title: "Doğru Hedefleme",
            desc: "Potansiyel müşterilerinize tam arama yaptıkları anda ulaşın."
        },
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: "Bütçe Optimizasyonu",
            desc: "Reklam bütçenizi en verimli şekilde kullanarak maksimum dönüşüm elde edin."
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Ölçülebilir Sonuçlar",
            desc: "Her kuruşun nereye gittiğini ve ne kadar getiri sağladığını anlık takip edin."
        }
    ];

    return (
        <div className="pt-20">
            <Helmet>
                <title>Google Ads Yönetimi KKTC | Reklam Ajansı – BC Creative Agency Girne</title>
                <meta name="description" content="KKTC'de Google Ads reklamlarınızı profesyonelce yönetiyoruz. Kuzey Kıbrıs'ta potansiyel müşterilerinize doğru zamanda ulaşın. Ölçülebilir sonuçlar, şeffaf raporlama." />
                <meta name="keywords" content="KKTC Google Ads, Kuzey Kıbrıs Google reklamları, Girne reklam ajansı, KKTC PPC yönetimi, Kuzey Kıbrıs dijital reklam" />
                <link rel="canonical" href="https://bccreative.agency/hizmetler/google-ads" />
                <meta property="og:title" content="Google Ads Yönetimi KKTC | BC Creative Agency – Girne" />
                <meta property="og:description" content="KKTC'de Google Ads reklamlarınızı profesyonelce yönetiyoruz." />
                <meta property="og:url" content="https://bccreative.agency/hizmetler/google-ads" />
            </Helmet>
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/hero-bg.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-white/20" />
                    <ColorfulBlobs variant="hero" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
                        <div className="lg:w-1/2 text-left">
                            <motion.h1
                                className="text-4xl sm:text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-none tracking-tighter"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-brand-600">{title}</span>
                            </motion.h1>
                            <motion.p
                                className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed max-w-2xl"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                Profesyonel Google Ads yönetimi ile markanızı potansiyel müşterilerinizin karşısına tam zamanında çıkarın.
                            </motion.p>
                            <motion.button
                                onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-8 bg-brand-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-brand-700 transition-colors"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                Teklif Al
                            </motion.button>
                        </div>

                        <div className="lg:w-1/2 relative w-full max-w-2xl lg:max-w-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: [0, -15, 0]
                                }}
                                transition={{
                                    opacity: { duration: 1 },
                                    scale: { duration: 1 },
                                    y: { duration: 8, repeat: Infinity, ease: "linear" }
                                }}
                                className="relative z-10"
                            >
                                <img
                                    src="/google-ads-hero.jpg"
                                    alt="Google Ads Management"
                                    className="rounded-[3rem] shadow-2xl border-4 border-white/50 w-full object-cover aspect-[4/3] lg:aspect-auto"
                                />
                                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl z-20 hidden md:block border border-brand-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white">
                                            <TrendingUp size={24} />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">Hedef ROAS</div>
                                            <div className="text-2xl font-black text-gray-900">8.5x</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-32 bg-white relative">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 mb-10 leading-tight">
                                <span className="text-brand-600">Google Ads</span> ile Hızla Büyüyün
                            </h2>
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-medium">
                                <p>
                                    Google Ads (eski adıyla AdWords), işletmenizi arama sonuçlarında, YouTube'da ve Google iş ortağı sitelerinde öne çıkarmanın en hızlı yoludur. Profesyonel yönetimimizle reklamlarınız sadece sizi arayanlara görünür.
                                </p>
                                <p>
                                    Reklam bütçenizi boşa harcamayın. Anahtar kelime araştırmasından negatif anahtar kelime yönetimine, reklam metinlerinden tıklama başı maliyet optimizasyonuna kadar tüm süreci titizlikle yönetiyoruz.
                                </p>
                                <p>
                                    Hedefimiz sadece tıklama almak değil, bu tıklamaları gerçek satışa ve müşteri dönüşümüne çevirmektir. Dönüşüm takibi ve sürekli testler (A/B testing) ile kampanyalarınızı her gün daha iyiye götürüyoruz.
                                </p>
                                <p className="text-brand-600 font-bold">
                                    Markanızı dijital reklamcılığın zirvesine taşımak ve yatırım getirinizi (ROI) maksimize etmek için profesyonel Google Ads desteği alın!
                                </p>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-8">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2, duration: 0.6 }}
                                    className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 flex gap-6 items-start group"
                                >
                                    <div className="p-4 bg-brand-50 rounded-2xl text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300 shrink-0">
                                        {benefit.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {benefit.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
        </div>
    );
};

export default GoogleAds;
