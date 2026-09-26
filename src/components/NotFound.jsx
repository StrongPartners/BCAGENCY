import React, { lazy, Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { useLanguage } from '../context/LanguageContext';
import { textShape } from './hero/voxelShapes';

const VoxelMini = lazy(() => import('./hero/VoxelMini'));

const NotFound = () => {
    const { lang } = useLanguage();
    const isTr = lang === 'tr';
    const shape = useMemo(() => textShape('404', { rows: 14 }), []);

    useSEO({
        title: isTr ? '404 — Sayfa Bulunamadı | BC Creative Agency' : '404 — Page Not Found | BC Creative Agency',
        description: isTr ? 'Aradığınız sayfa bulunamadı.' : 'The page you are looking for could not be found.',
        noindex: true,
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-ink-900 px-6">
            <div className="text-center max-w-lg">
                <Suspense fallback={<div className="h-48 md:h-64" />}>
                    <VoxelMini shape={shape} mode="crumble" className="h-48 md:h-64 w-full" label="404" />
                </Suspense>
                <h1 className="mt-6 text-3xl md:text-4xl font-bold text-white">
                    {isTr ? 'Sayfa Bulunamadı' : 'Page Not Found'}
                </h1>
                <p className="mt-4 text-white/50 text-lg">
                    {isTr
                        ? 'Aradığınız sayfa taşınmış veya kaldırılmış olabilir.'
                        : 'The page you are looking for may have been moved or removed.'}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="on-dark inline-flex items-center gap-2 bg-brand-600 text-white font-medium px-8 py-3 rounded-full hover:bg-brand-700 transition-colors"
                    >
                        {isTr ? 'Ana Sayfaya Dön' : 'Back to Home'}
                    </Link>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 border border-white/20 text-white/70 font-medium px-8 py-3 rounded-full hover:border-white/40 transition-colors"
                    >
                        {isTr ? 'İletişim' : 'Contact Us'}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
