import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ZoomSection = ({ children, bg, video, overlay = 'bg-black/40', className = '' }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.92, 0.98, 1, 1.05, 1.15]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.35, 0.7, 0.9], [0, 1, 1, 1, 0]);

    return (
        <div ref={ref} className="h-[180vh] relative bg-ink-900">
            <div className="sticky top-0 h-screen overflow-hidden bg-ink-900">
                <motion.div
                    style={{ scale, opacity }}
                    className={`w-full h-full relative overflow-hidden ${className}`}
                >
                    {video ? (
                        <video autoPlay loop muted playsInline className="absolute inset-[-5%] w-[110%] h-[110%] object-cover">
                            <source src={video} type="video/mp4" />
                        </video>
                    ) : bg ? (
                        <img src={bg} alt="" className="absolute inset-[-5%] w-[110%] h-[110%] object-cover" />
                    ) : null}
                    <div className={`absolute inset-0 ${overlay}`} />
                    <div className="relative z-10 flex items-center justify-center h-full">
                        {children}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export const ScrollText = ({ children, className = '', delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

export const Marquee = ({ items }) => (
    <div className="bg-ink-900 overflow-hidden py-5 border-y border-white/5">
        <div className="flex animate-marquee whitespace-nowrap">
            {[...items, ...items].map((item, i) => (
                <span key={i} className="mx-8 text-base md:text-lg font-bold text-white/15 uppercase tracking-widest">
                    {item} <span className="text-secondary-300/30 mx-4">·</span>
                </span>
            ))}
        </div>
    </div>
);
