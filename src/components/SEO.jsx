import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Rocket, Target, TrendingUp, Search, CheckCircle2 } from 'lucide-react';
import ColorfulBlobs from './ColorfulBlobs';

const SEO = () => {
    const title = "Arama Motoru Optimizasyonu";

    const benefits = [
        {
            icon: <Target className="w-8 h-8" />,
            title: "İlk Sıralarda Yer Alın",
            desc: "Google üzerinde ilk sırada yerinizi alarak rakiplerinize fark atın."
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Satışlarınızı Artırın",
            desc: "Daha fazla görünürlük, daha fazla trafik ve yüksek satış oranları demektir."
        },
        {
            icon: <Rocket className="w-8 h-8" />,
            title: "Markalaşın",
            desc: "Siteniz daha bilinir bir hal alacak ve dijital dünyada markalaşacaktır."
        }
    ];

    return (
        <div className="pt-20">
            <Helmet>
                <title>SEO Hizmetleri KKTC | Arama Motoru Optimizasyonu – BC Creative Agency Girne</title>
                <meta name="description" content="Kuzey Kıbrıs'ta Google'da üst sıralara çıkın. BC Creative Agency'nin profesyonel SEO hizmetleriyle KKTC ve uluslararası pazarda rakiplerinizin önüne geçin." />
                <meta name="keywords" content="KKTC SEO, Kuzey Kıbrıs arama motoru optimizasyonu, Girne SEO ajansı, KKTC Google sıralaması, Kuzey Kıbrıs dijital pazarlama SEO" />
                <link rel="canonical" href="https://bccreative.agency/hizmetler/seo" />
                <meta property="og:title" content="SEO Hizmetleri KKTC | BC Creative Agency – Girne" />
                <meta property="og:description" content="KKTC'de Google'da üst sıralara çıkmak için profesyonel SEO hizmetleri." />
                <meta property="og:url" content="https://bccreative.agency/hizmetler/seo" />
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
                                SEO <span className="text-brand-600">{title}</span>
                            </motion.h1>
                            <motion.p
                                className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed max-w-2xl"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                Google'da ilk sırada yerinizi alın, rakiplerinizden sıyrılın ve dijital varlığınızı maksimuma çıkarın.
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
                                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    rotate: 0,
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
                                    src="/seo-hero.jpg"
                                    alt="SEO Optimization"
                                    className="rounded-[3rem] shadow-2xl border-4 border-white/50 w-full object-cover aspect-[4/3] lg:aspect-auto"
                                />
                                {/* Optional: Decorative badge */}
                                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl z-20 hidden md:block border border-brand-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white">
                                            <TrendingUp size={24} />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">Büyüme Oranı</div>
                                            <div className="text-2xl font-black text-gray-900">+340%</div>
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
                                Neden <span className="text-brand-600">SEO</span> Hizmeti Almalısınız?
                            </h2>
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-medium">
                                <p>
                                    SEO Arama Motoru Optimizasyonu hizmeti ile siz de Google üzerinde ilk sırada yerinizi almak istemez misiniz? Hizmetimiz ile siz de rakiplerinize fark atabilirsiniz.
                                </p>
                                <p>
                                    Satış yaptığınız veya başka bir amaçla açtığınız sitenizin rakiplerinize karşı fark atmasını ve ilk sıralarda yer almasını istiyorsanız hizmetimizi almanız gerekir. Çünkü hizmetimizin avantajları arasında en baş sırada; Google sıralamada ilk sayfa ve sıralarda yer almanız bulunur.
                                </p>
                                <p>
                                    Arama Motoru Optimizasyonu hizmetimiz ile siz de son derece başarılı bir rota çizebilir ve izleyebilirsiniz. Böylelikle siteniz daha bilinir bir hal alacak, markalaşacaktır.
                                </p>
                                <p className="text-brand-600 font-bold">
                                    Aynı zamanda satışlarınız artışa geçecek ve sizi kâr üstüne kâra götürecektir. Siz de web tabanlı sitenizin Arama Motoru Optimizasyonu hizmeti için geç kalmayın!
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

export default SEO;
