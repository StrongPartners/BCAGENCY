import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ColorfulBlobs from './ColorfulBlobs';

const Hero = () => {
    const titles = [
        "Google Ads Yönetimi",
        "Sosyal Medya Yönetimi",
        "Web Tasarım",
        "Arama Motoru Optimizasyonu"
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [titles.length]);

    const containerVariants = {
        animate: {
            transition: {
                staggerChildren: 0.03,
            }
        }
    };

    const letterVariants = {
        initial: {
            opacity: 0,
            rotateY: 90,
            y: 10,
            scale: 0.8
        },
        animate: {
            opacity: 1,
            rotateY: 0,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        },
        exit: {
            opacity: 0,
            rotateY: -90,
            y: -10,
            scale: 0.8,
            transition: { duration: 0.2 }
        }
    };

    return (
        <section className="relative min-h-screen bg-gray-50 overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-[0.85]"
            >
                <source src="/hero-bg.mp4" type="video/mp4" />
            </video>

            {/* Colorful Blobs Background */}
            <div className="absolute inset-0 z-1">
                <ColorfulBlobs variant="hero" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 md:px-8 h-screen flex items-center justify-center relative z-10">
                <div className="text-center max-w-7xl w-full space-y-1">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 leading-none">
                            Sizlere
                        </h2>
                    </motion.div>

                    {/* Rotating Service Title */}
                    <div className="h-20 sm:h-24 md:h-28 flex items-center justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={titles[index]}
                                variants={containerVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="text-3xl sm:text-5xl md:text-7xl font-black leading-none text-brand-600 flex justify-center flex-wrap px-2"
                            >
                                {titles[index].split("").map((char, i) => (
                                    <motion.span
                                        key={`${titles[index]}-${i}`}
                                        variants={letterVariants}
                                        className="inline-block origin-center"
                                        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </motion.h1>
                        </AnimatePresence>
                    </div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-2xl sm:text-4xl md:text-6xl font-black text-gray-900 leading-none px-4"
                    >
                        konusunda nasıl yardımcı olabiliriz?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-base md:text-xl text-gray-600 leading-relaxed max-w-6xl mx-auto pt-8"
                    >
                        <span className="font-bold text-gray-900">BC MEDYA</span>, dijital pazarlama alanında markalara ölçülebilir büyüme sağlayan bir performans ajansıdır. Reklam, sosyal medya ve strateji süreçlerini tek merkezden yönetir, harcadığınız bütçeyi gerçek sonuçlara dönüştürürüz.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="pt-10"
                    >
                        <button
                            onClick={() => window.location.href = '/contact'}
                            className="bg-brand-600 hover:bg-brand-700 text-white text-lg md:text-xl px-12 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                        >
                            Çalışmaya Başlayalım
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
