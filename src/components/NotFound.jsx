import React from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { useLanguage } from '../context/LanguageContext';

const NotFound = () => {
    const { lang } = useLanguage();
    const isTr = lang === 'tr';

    useSEO({
        title: isTr ? '404 — Sayfa Bulunamadı | BC Creative Agency' : '404 — Page Not Found | BC Creative Agency',
        description: isTr ? 'Aradığınız sayfa bulunamadı.' : 'The page you are looking for could not be found.',
        noindex: true,
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6">
            <div className="text-center max-w-lg">
                <p className="text-9xl font-bold text-brand-600 leading-none">404</p>
                <h1 className="mt-6 text-3xl md:text-4xl font-bold text-ink-900">
                    {isTr ? 'Sayfa Bulunamadı' : 'Page Not Found'}
                </h1>
                <p className="mt-4 text-ink-500 text-lg">
                    {isTr
                        ? 'Aradığınız sayfa taşınmış veya kaldırılmış olabilir.'
                        : 'The page you are looking for may have been moved or removed.'}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-brand-600 text-white font-medium px-8 py-3 rounded-full hover:bg-brand-700 transition-colors"
                    >
                        {isTr ? 'Ana Sayfaya Dön' : 'Back to Home'}
                    </Link>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 border border-ink-200 text-ink-700 font-medium px-8 py-3 rounded-full hover:border-ink-400 transition-colors"
                    >
                        {isTr ? 'İletişim' : 'Contact Us'}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
