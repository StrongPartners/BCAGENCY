import React from 'react';
import { useNavigate } from 'react-router-dom';
import ColorfulBlobs from './ColorfulBlobs';
import { useLanguage } from '../context/LanguageContext';

const Services = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const paths = ['/hizmetler/seo', '/hizmetler/google-ads', '/hizmetler/sosyal-medya', '/hizmetler/web-tasarim'];
    const numbers = ['01', '02', '03', '04'];
    const servicesList = t('services_list');

    const services = servicesList.map((s, i) => ({
        ...s,
        number: numbers[i],
        path: paths[i]
    }));

    return (
        <section className="relative py-24 px-4 md:px-8 bg-gray-50 overflow-hidden">
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

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent z-2" />

            <div className="container mx-auto relative z-10">
                {/* Section Header */}
                <div className="mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 leading-none tracking-tight">
                        {t('services_heading_1')} <span className="text-brand-600">{t('services_heading_2')}</span>
                    </h2>
                    <div className="w-32 h-2 bg-brand-600 rounded-full" />
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                if (service.path !== '#') {
                                    navigate(service.path);
                                    window.scrollTo(0, 0);
                                }
                            }}
                            className={`group relative bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${service.path !== '#' ? 'cursor-pointer' : ''}`}
                        >
                            {/* Decorative Orange Element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-400/20 to-brand-600/20 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />

                            {/* Number */}
                            <div className="absolute top-6 right-6 text-8xl font-black text-brand-600/10 group-hover:text-brand-600/20 transition-colors">
                                {service.number}
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-brand-600 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    {service.description}
                                </p>

                                {/* Arrow Icon */}
                                <div className="inline-flex items-center text-brand-600 font-semibold group-hover:translate-x-2 transition-transform">
                                    <span>{t('services_see_details')}</span>
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>

                            {/* Bottom Orange Accent */}
                            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-brand-600 to-brand-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-3xl" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Curve Transition - To WhyChooseUs */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10 transform rotate-180">
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="relative block w-[calc(100%+1.3px)] h-[80px] fill-gray-50/50"
                >
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.32,37.5,102.74,30,204,47.5,310.87,19.25,102.69-27.15,183.23-93.59,306-93.59V0Z" />
                </svg>
            </div>
        </section>
    );
};

export default Services;
