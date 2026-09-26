import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { useLanguage } from '../context/LanguageContext';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '../lib/geoSchemas';
import VoxelIcon from './hero/VoxelIcon';
import { getShape } from './hero/voxelShapes';
import { shapeForPath } from './hero/voxelBus';
import { SERVICES } from './shared/services';

const VoxelMini = lazy(() => import('./hero/VoxelMini'));

/*
 * Hakkımızda — kısa ve sakin: giriş (küp fincan), hikâye, değerler, hizmetler, çağrı.
 * Eski sürümdeki dört tam ekran video bölümü sayfayı çok uzatıyordu; kaldırıldı.
 */
const VALUE_SHAPES = ['eye', 'heart', 'bolt', 'target'];
const WA = 'https://wa.me/905488321919';

const fade = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10%' },
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
};

const About = () => {
    const { lang, t } = useLanguage();
    const navigate = useNavigate();
    const tr = lang === 'tr';
    const values = t('about_values');
    const go = (p) => { navigate(p); window.scrollTo({ top: 0 }); };

    useSEO({
        title: tr ? 'Hakkımızda | BC Creative Agency - KKTC Girne' : 'About | BC Creative Agency - Kyrenia TRNC',
        description: tr ? "BC Creative Agency — 2017'den beri KKTC'de dijital pazarlama." : 'BC Creative Agency — digital marketing in Northern Cyprus since 2017.',
        canonical: 'https://bccreative.agency/about',
        schemas: [
            buildOrganizationSchema(),
            buildBreadcrumbSchema([
                { name: t('nav_home'), url: 'https://bccreative.agency/' },
                { name: t('nav_about'), url: 'https://bccreative.agency/about' },
            ]),
        ],
    });

    return (
        <main className="bg-ink-900 text-white">
            {/* Giriş */}
            <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,208,224,0.45),transparent_60%)]" />
                <div className="container mx-auto px-6 md:px-12 relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div data-voxel-anchor="always" aria-hidden="true" className="lg:order-2 h-[28svh] md:h-[36vh] lg:h-[52vh] w-full" />
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50 mb-6">{t('about_eyebrow')}</p>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
                            {t('about_hero_title_1')} <span className="text-secondary-300">{t('about_hero_title_accent')}</span> {t('about_hero_title_2')}
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-white/60 max-w-xl leading-relaxed">{t('about_hero_desc')}</p>
                        <a href={WA} target="_blank" rel="noopener noreferrer" className="mt-9 group inline-flex items-center gap-3 bg-white text-ink-900 font-semibold pl-5 pr-7 py-3 rounded-full hover:bg-brand-600 transition-colors">
                            <VoxelIcon name="coffee" palette="dark" className="w-9 h-9 transition-transform duration-300 group-hover:-rotate-12" />
                            {t('btn_offer')} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Hikâye */}
            <section className="py-16 md:py-24 border-t border-white/5">
                <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <motion.div {...fade}>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50 mb-5">{tr ? 'Hikâye' : 'Story'}</p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{t('about_story_title')}</h2>
                        <p className="text-lg text-white/60 leading-relaxed mb-4">{t('about_story_p1')}</p>
                        <p className="text-lg text-white/60 leading-relaxed">{t('about_story_p2')}</p>
                    </motion.div>
                    <motion.div {...fade} transition={{ ...fade.transition, delay: 0.1 }} className="rounded-3xl overflow-hidden border border-white/10">
                        <img src="/about-rocket.jpg" alt={tr ? 'BC Creative Agency, Girne KKTC' : 'BC Creative Agency, Kyrenia'} className="w-full h-auto object-cover" loading="lazy" width="640" height="480" />
                    </motion.div>
                </div>
            </section>

            {/* Değerler */}
            <section className="py-16 md:py-24 border-t border-white/5">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div {...fade} className="max-w-2xl mb-10 md:mb-14">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t('about_values_title')}</h2>
                        <p className="mt-3 text-lg text-white/55">{t('about_values_sub')}</p>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {values.map((v, i) => (
                            <motion.div {...fade} transition={{ ...fade.transition, delay: i * 0.08 }} key={v.title}
                                className="group p-7 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                                <VoxelIcon name={VALUE_SHAPES[i] || 'eye'} className="w-16 h-16 -ml-2 -mt-2 mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                                <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
                                <p className="text-sm text-white/55 leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hizmetler */}
            <section className="py-16 md:py-24 border-t border-white/5">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div {...fade} className="max-w-2xl mb-10 md:mb-14">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{tr ? 'Neler yapıyoruz' : 'What we do'}</h2>
                        <p className="mt-3 text-lg text-white/55">{t('about_services_sub')}</p>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                        {SERVICES.map((s, i) => (
                            <motion.button {...fade} transition={{ ...fade.transition, delay: (i % 5) * 0.05 }} key={s.path} onClick={() => go(s.path)}
                                className="group text-left p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-secondary-300/40 transition-colors">
                                <div className="flex items-start justify-between">
                                    <VoxelIcon name={shapeForPath(s.path)} className="w-12 h-12 -ml-1 mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                                    <ArrowUpRight size={18} className="text-white/30 group-hover:text-secondary-300 transition-colors" />
                                </div>
                                <h3 className="font-semibold">{tr ? s.tr : s.en}</h3>
                                <p className="mt-1 text-sm text-white/50 leading-snug">{tr ? s.trD : s.enD}</p>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Çağrı */}
            <section className="pb-20 md:pb-28 pt-4">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div {...fade} className="on-dark rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-10 md:p-16 text-center">
                        <Suspense fallback={<div className="h-32 md:h-40" />}>
                            <VoxelMini shape={getShape('bc')} palette="dark" className="h-32 md:h-40 w-full -mt-4 mb-4" label="BC" />
                        </Suspense>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">{tr ? 'Bir kahve, bir fikir.' : 'One coffee, one idea.'}</h2>
                        <p className="mt-5 text-white/70 text-lg max-w-xl mx-auto">{tr ? 'Girne’deki stüdyomuza gelin ya da WhatsApp’tan yazın; aynı gün dönelim.' : 'Visit our Kyrenia studio or message us on WhatsApp; we reply the same day.'}</p>
                        <a href={WA} target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex items-center gap-2 bg-white text-ink-900 font-semibold px-8 py-4 rounded-full hover:bg-secondary-100 transition-colors">
                            {t('btn_whatsapp')} <ArrowUpRight size={18} />
                        </a>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default About;
