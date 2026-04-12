import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import ColorfulBlobs from '../ColorfulBlobs';
import { useLanguage } from '../../context/LanguageContext';

/**
 * ServicePageLayout
 *
 * Shared modern layout for every /hizmetler/* page.
 * Each service just passes its content — the layout handles
 * the hero, feature grid, process strip, stats, FAQ and CTA.
 *
 * Keeps all service pages visually consistent and removes
 * duplicated layout code.
 */

const TONE_BG = { brand: 'bg-brand-50', coral: 'bg-coral-50', mint: 'bg-mint-50', sun: 'bg-sun-50' };
const TONE_TEXT = { brand: 'text-brand-600', coral: 'text-coral-500', mint: 'text-mint-500', sun: 'text-sun-500' };
const TONE_ICON = { brand: 'text-brand-600', coral: 'text-coral-600', mint: 'text-mint-600', sun: 'text-sun-600' };

const ServicePageLayout = ({
    eyebrow,
    headline,
    headlineAccent,
    headlineRest,
    subheadline,
    description,
    tone = 'brand',
    features = [],      // [{ icon (LucideIcon component), title, desc, tone? }]
    steps = [],         // [{ step, title, desc }]
    stats = [],         // [{ value, label }]
    faqs = [],          // [{ question, answer }]
    ctaTitle,
    ctaSub,
}) => {
    const { t } = useLanguage();

    return (
        <div>
            {/* Hero */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-surface-card">
                <div className="absolute inset-0 z-0">
                    <ColorfulBlobs variant="hero" />
                </div>

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className={`inline-block ${TONE_BG[tone]} rounded-full px-4 py-1.5 mb-6 shadow-md`}
                        >
                            <span className="font-black text-ink-900 text-xs uppercase tracking-wider">{eyebrow}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black text-ink-900 leading-[0.95] tracking-tighter"
                        >
                            {headline}{' '}
                            <span className="relative inline-block">
                                <span className={`relative z-10 ${TONE_TEXT[tone]}`}>{headlineAccent}</span>
                                <span className="absolute left-0 right-0 bottom-1 h-4 bg-sun-300 -z-0 rounded-sm" />
                            </span>
                            {headlineRest && <> {headlineRest}</>}
                        </motion.h1>

                        {subheadline && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="mt-6 text-xl md:text-2xl font-bold text-ink-700"
                            >
                                {subheadline}
                            </motion.p>
                        )}

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-6 text-lg text-ink-700 font-medium max-w-2xl leading-relaxed"
                        >
                            {description}
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                            className="mt-10 bg-ink-900 text-white font-black text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                        >
                            {t('btn_offer')}
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Features */}
            {features.length > 0 && (
                <section className="py-20 md:py-28 bg-surface-card">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                            {features.map((feature, i) => {
                                const featTone = feature.tone || ['brand', 'coral', 'mint', 'sun'][i % 4];
                                const IconComponent = feature.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 }}
                                        whileHover={{ y: -6 }}
                                        className="bg-surface-card rounded-2xl p-8 shadow-sm hover:shadow-lg border border-gray-100 transition-all"
                                    >
                                        <div className={`w-14 h-14 ${TONE_BG[featTone]} rounded-xl flex items-center justify-center mb-5`}>
                                            {IconComponent && <IconComponent size={24} className={TONE_ICON[featTone]} strokeWidth={2} />}
                                        </div>
                                        <h3 className="text-2xl font-black text-ink-900 mb-3 leading-tight">{feature.title}</h3>
                                        <p className="text-ink-700 font-medium leading-relaxed">{feature.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Stats */}
            {stats.length > 0 && (
                <section className="py-16 md:py-20 bg-ink-900 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-coral-500/20 rounded-full blur-3xl" />
                    <div className="container mx-auto px-4 md:px-8 relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat, i) => {
                                const tones = ['text-sun-300', 'text-coral-400', 'text-mint-400', 'text-brand-300'];
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 }}
                                        className="text-center"
                                    >
                                        <div className={`text-5xl md:text-7xl font-black ${tones[i % tones.length]} leading-none mb-2`}>
                                            {stat.value}
                                        </div>
                                        <div className="text-white font-bold uppercase tracking-wider text-xs md:text-sm">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Process steps */}
            {steps.length > 0 && (
                <section className="py-20 md:py-28 bg-surface-alt relative overflow-hidden">
                    <div className="container mx-auto px-4 md:px-8 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-6xl font-black text-ink-900 leading-none tracking-tight">
                                {t('approach_eyebrow')}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {steps.map((step, i) => {
                                const toneOrder = ['brand', 'coral', 'mint', 'sun'];
                                const stepTone = toneOrder[i % 4];
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ y: -6 }}
                                        className="bg-surface-card rounded-2xl p-7 shadow-sm hover:shadow-lg border border-gray-100 transition-all"
                                    >
                                        <div className={`w-12 h-12 ${TONE_BG[stepTone]} rounded-xl flex items-center justify-center font-black text-sm ${TONE_TEXT[stepTone]} mb-4`}>
                                            {step.step}
                                        </div>
                                        <h4 className="text-xl font-black text-ink-900 mb-3 leading-tight">{step.title}</h4>
                                        <p className="text-ink-700 font-medium text-sm leading-relaxed">{step.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ */}
            {faqs.length > 0 && (
                <section className="py-20 md:py-28 bg-surface-card">
                    <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                        <div className="text-center mb-14">
                            <span className="inline-block bg-sun-200 text-ink-900 font-black text-xs px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                                FAQ
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black text-ink-900 leading-none tracking-tight">
                                {t('faq_title')}
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-24 md:py-32 bg-ink-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/40 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-coral-500/30 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
                    <h2 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tight mb-6">
                        {ctaTitle}
                    </h2>
                    <p className="text-xl md:text-2xl text-ink-300 font-medium max-w-2xl mx-auto mb-10">
                        {ctaSub}
                    </p>
                    <motion.button
                        onClick={() => window.open('https://wa.me/905488755461', '_blank')}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.96 }}
                        className="inline-flex items-center gap-2 bg-sun-300 text-ink-900 font-black text-lg px-10 py-5 rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                        {t('btn_offer')}
                        <ArrowUpRight size={20} strokeWidth={3} />
                    </motion.button>
                </div>
            </section>
        </div>
    );
};

// Small local FAQ item
const FAQItem = ({ question, answer, index }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            className="bg-surface-card rounded-2xl overflow-hidden shadow-sm border border-gray-100"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-surface-alt transition-colors"
            >
                <span className="font-black text-ink-900 text-base md:text-lg">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-ink-900 text-white flex items-center justify-center"
                >
                    <Plus size={20} strokeWidth={3} />
                </motion.div>
            </button>
            {isOpen && (
                <div className="px-6 pb-6 text-ink-700 text-base leading-relaxed font-medium border-t border-ink-100 pt-4">
                    {answer}
                </div>
            )}
        </motion.div>
    );
};

export default ServicePageLayout;
