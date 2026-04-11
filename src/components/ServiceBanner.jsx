import React from 'react';
import { useLanguage } from '../context/LanguageContext';

/**
 * ServiceBanner — horizontal marquee strip announcing services.
 * Uses a CSS keyframe marquee (index.css) for GPU-friendly scrolling.
 * Creative Playground: alternating colors, chunky border, bold type.
 */
const ServiceBanner = () => {
    const { t } = useLanguage();
    const services = t('banner_services');
    const tickerItems = [...services, ...services];

    return (
        <div className="relative bg-ink-900 border-y-4 border-ink-900 py-5 overflow-hidden">
            {/* Animated strip */}
            <div className="flex whitespace-nowrap animate-marquee">
                {tickerItems.map((item, index) => {
                    const tones = ['text-sun-300', 'text-coral-400', 'text-mint-300', 'text-brand-300'];
                    const tone = tones[index % tones.length];
                    return (
                        <span
                            key={index}
                            className={`text-2xl md:text-4xl font-black tracking-tight px-8 flex items-center ${tone}`}
                        >
                            {item}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default ServiceBanner;
