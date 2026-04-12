import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const ServiceBanner = () => {
    const { t } = useLanguage();
    const services = t('banner_services');
    const tickerItems = [...services, ...services];

    return (
        <div className="relative bg-ink-900 py-4 overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee">
                {tickerItems.map((item, index) => (
                    <span
                        key={index}
                        className="text-sm tracking-widest uppercase font-medium text-white/80 px-8 flex items-center"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ServiceBanner;
