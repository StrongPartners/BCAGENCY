import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Approach = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 md:py-32 bg-ink-50">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-6">
                        {t('approach_eyebrow')}
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-ink-900 leading-tight tracking-tight mb-6">
                        {t('approach_heading_1')} {t('approach_heading_2')}
                    </h2>
                    <p className="text-lg text-ink-500 leading-relaxed">
                        {t('approach_sub')}
                    </p>
                </div>

                {/* Stats row */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {t('stats').map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-ink-900 mb-1">{stat.value}</div>
                            <div className="text-sm text-ink-500">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Approach;
