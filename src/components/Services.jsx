import React from 'react';
import { useNavigate } from 'react-router-dom';
import ColorfulBlobs from './ColorfulBlobs';
import { useLanguage } from '../context/LanguageContext';

const Services = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const numbers = ['01', '02', '03', '04', '05', '06', '07'];
    const servicesList = t('services_list');

    const services = servicesList.map((s, i) => ({
        ...s,
        number: numbers[i],
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
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 leading-none tracking-tight">
                        {t('services_heading_1')} <span className="text-brand-600">{t('services_heading_2')}</span>
                    </h2>
                    <div className="w-32 h-2 bg-brand-600 rounded-full" />
                </div>

                {/* Services Grid — 4 col on xl, 2 col on md, 1 col on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {/* First 4 services — full feature cards */}
                    {services.slice(0, 4).map((service, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                if (service.path) {
                                    navigate(service.path);
                                    window.scrollTo(0, 0);
                                }
                            }}
                            className={`group relative bg-white rounded-3xl p-7 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${service.path ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-brand-400/20 to-brand-600/20 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />

                            {/* Number */}
                            <div className="absolute top-5 right-5 text-7xl font-black text-brand-600/8 group-hover:text-brand-600/15 transition-colors select-none">
                                {service.number}
                            </div>

                            {/* Icon */}
                            <div className="text-4xl mb-4 relative z-10">{service.icon}</div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors leading-tight">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                    {service.description}
                                </p>

                                {service.path && (
                                    <div className="inline-flex items-center text-brand-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                                        <span>{t('services_see_details')}</span>
                                        <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Bottom accent */}
                            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-600 to-brand-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-3xl" />
                        </div>
                    ))}
                </div>

                {/* Second row — production services (3 cards, centered) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {services.slice(4).map((service, index) => (
                        <div
                            key={index + 4}
                            className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-7 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-brand-100"
                        >
                            {/* Special badge for production services */}
                            <div className="absolute top-4 right-4 bg-brand-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                Prodüksiyon
                            </div>

                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-brand-400/15 to-brand-600/15 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />

                            {/* Number */}
                            <div className="absolute bottom-5 right-5 text-6xl font-black text-brand-600/8 group-hover:text-brand-600/15 transition-colors select-none">
                                {service.number}
                            </div>

                            {/* Icon */}
                            <div className="text-4xl mb-4 relative z-10">{service.icon}</div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors leading-tight">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                    {service.description}
                                </p>
                                <div
                                    onClick={() => window.open('https://wa.me/905488755461?text=Merhaba%2C%20' + encodeURIComponent(service.title) + '%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.', '_blank')}
                                    className="inline-flex items-center text-[#25D366] font-semibold text-sm cursor-pointer hover:translate-x-1 transition-transform"
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 mr-1.5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    Teklif Al
                                </div>
                            </div>

                            {/* Bottom accent */}
                            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#25D366] to-brand-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-3xl" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Curve Transition */}
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
