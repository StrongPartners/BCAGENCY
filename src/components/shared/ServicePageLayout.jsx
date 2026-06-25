import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ZoomSection, ScrollText } from './ParallaxKit';
import Breadcrumb from './Breadcrumb';

const ServicePageLayout = ({
    eyebrow, headline, headlineAccent, headlineRest, subheadline, description,
    tone = 'brand', features = [], steps = [], stats = [], faqs = [],
    ctaTitle, ctaSub, breadcrumbs = [],
}) => {
    const { t } = useLanguage();

    const bgMap = {
        brand: { video: '/bg-ink.mp4', bg: '/parallax-ink.webp' },
        coral: { video: '/bg-light.mp4', bg: '/parallax-light.webp' },
        mint: { video: '/bg-smoke.mp4', bg: '/parallax-smoke.webp' },
        sun: { video: '/bg-powder.mp4', bg: '/parallax-powder.webp' },
    };
    const heroBg = bgMap[tone] || bgMap.brand;
    const featureBg = bgMap[tone === 'brand' ? 'coral' : 'brand'];

    return (
        <main className="bg-ink-900">
            {breadcrumbs.length > 0 && <Breadcrumb items={breadcrumbs} />}

            {/* Hero */}
            <ZoomSection video={heroBg.video} bg={heroBg.bg} overlay="bg-ink-900/70">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-4xl">
                        <ScrollText>
                            <span className="inline-block bg-white/10 rounded-full px-4 py-1.5 mb-6 text-white text-xs font-bold uppercase tracking-wider">
                                {eyebrow}
                            </span>
                        </ScrollText>
                        <ScrollText delay={0.1}>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tighter">
                                {headline}{' '}
                                <span className="text-secondary-300">{headlineAccent}</span>
                                {headlineRest && <> {headlineRest}</>}
                            </h1>
                        </ScrollText>
                        {subheadline && (
                            <ScrollText delay={0.15}>
                                <p className="mt-6 text-xl md:text-2xl font-bold text-white/60">{subheadline}</p>
                            </ScrollText>
                        )}
                        <ScrollText delay={0.2}>
                            <p className="mt-6 text-lg text-white/50 max-w-2xl leading-relaxed">{description}</p>
                        </ScrollText>
                        <ScrollText delay={0.25}>
                            <motion.button
                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                                onClick={() => window.open('https://wa.me/905488321919', '_blank')}
                                className="mt-10 inline-flex items-center gap-2 bg-white text-ink-900 font-bold text-lg px-8 py-4 rounded-full hover:bg-secondary-300 transition-colors"
                            >
                                {t('btn_offer')}
                                <ArrowUpRight size={20} strokeWidth={2.5} />
                            </motion.button>
                        </ScrollText>
                    </div>
                </div>
            </ZoomSection>

            {/* Features */}
            {features.length > 0 && (
                <ZoomSection video={featureBg.video} bg={featureBg.bg} overlay="bg-ink-900/80">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {features.map((feature, i) => {
                                const Icon = feature.icon;
                                return (
                                    <ScrollText key={i} delay={i * 0.1}>
                                        <motion.div whileHover={{ y: -6 }}
                                            className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-secondary-300/30 transition-all">
                                            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                                                {Icon && <Icon size={24} className="text-secondary-300/60" strokeWidth={2} />}
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                            <p className="text-white/50 leading-relaxed">{feature.desc}</p>
                                        </motion.div>
                                    </ScrollText>
                                );
                            })}
                        </div>
                    </div>
                </ZoomSection>
            )}

            {/* Stats */}
            {stats.length > 0 && (
                <section className="relative bg-ink-900 py-16 md:py-20 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl" />
                    <div className="container mx-auto px-6 md:px-12 relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat, i) => (
                                <ScrollText key={i} delay={i * 0.08} className="text-center">
                                    <div className="text-5xl md:text-6xl font-bold text-white mb-2">{stat.value}</div>
                                    <div className="text-white/40 text-sm uppercase tracking-wider">{stat.label}</div>
                                </ScrollText>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Process steps */}
            {steps.length > 0 && (
                <section className="relative bg-ink-900 py-20 md:py-28 overflow-hidden">
                    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-10">
                        <source src="/bg-ink.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-ink-900/80" />
                    <div className="container mx-auto px-6 md:px-12 relative z-10">
                        <ScrollText className="text-center mb-14">
                            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{t('approach_eyebrow')}</h2>
                        </ScrollText>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {steps.map((step, i) => (
                                <ScrollText key={i} delay={i * 0.1}>
                                    <motion.div whileHover={{ y: -5 }}
                                        className="p-7 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-secondary-300/30 transition-all">
                                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-bold text-sm text-white/40 mb-4">{step.step}</div>
                                        <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                                        <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                                    </motion.div>
                                </ScrollText>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ */}
            {faqs.length > 0 && (
                <section className="relative bg-ink-900 py-20 md:py-28">
                    <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                        <ScrollText className="text-center mb-14">
                            <span className="inline-block bg-white/10 text-white font-bold text-xs px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">FAQ</span>
                            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{t('faq_title')}</h2>
                        </ScrollText>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />)}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <ZoomSection video="/bg-smoke.mp4" bg="/parallax-smoke.webp" overlay="bg-ink-900/50">
                <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
                    <ScrollText>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-6">{ctaTitle}</h2>
                        <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10">{ctaSub}</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                            onClick={() => window.open('https://wa.me/905488321919', '_blank')}
                            className="inline-flex items-center gap-2 bg-white text-ink-900 font-bold text-lg px-10 py-5 rounded-full hover:bg-secondary-300 transition-colors"
                        >
                            {t('btn_offer')}
                            <ArrowUpRight size={20} strokeWidth={2.5} />
                        </motion.button>
                    </ScrollText>
                </div>
            </ZoomSection>
        </main>
    );
};

const FAQItem = ({ question, answer, index }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}
            className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
            <button onClick={() => setIsOpen(!isOpen)} className="group w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-white/10 transition-colors">
                <span className="font-bold text-white text-base md:text-lg">{question}</span>
                <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">
                    <Plus size={20} strokeWidth={3} />
                </motion.div>
            </button>
            {isOpen && (
                <div className="px-6 pb-6 text-white/50 text-base leading-relaxed border-t border-white/10 pt-4">{answer}</div>
            )}
        </motion.div>
    );
};

export default ServicePageLayout;
