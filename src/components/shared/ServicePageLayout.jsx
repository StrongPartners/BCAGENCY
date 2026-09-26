import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Breadcrumb from './Breadcrumb';

/*
 * Hizmet sayfası şablonu — sade, tek tema.
 * Props aynı kaldı; tüm hizmet sayfaları bu şablonu kullanır.
 */
const WA = 'https://wa.me/905488321919';
const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
};

const ServicePageLayout = ({
  eyebrow, headline, headlineAccent, headlineRest, subheadline, description,
  features = [], steps = [], stats = [], faqs = [],
  ctaTitle, ctaSub, breadcrumbs = [], heroImage, children,
}) => {
  const { t } = useLanguage();

  return (
    <main className="bg-ink-900 text-white">
      {breadcrumbs.length > 0 && <Breadcrumb items={breadcrumbs} />}
      {/* Hero */}
      <section className={`relative overflow-hidden pb-16 md:pb-24 ${breadcrumbs.length ? 'pt-8 md:pt-12' : 'pt-32 md:pt-40'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,58,138,0.4),transparent_60%)]" />
        <div className="container mx-auto px-6 md:px-12 relative">
          <div className={`grid gap-12 items-center ${heroImage ? 'lg:grid-cols-2' : ''}`}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
              <span className="inline-block rounded-full border border-white/15 px-4 py-1.5 mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{eyebrow}</span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.98] tracking-tight">
                {headline} <span className="text-secondary-300">{headlineAccent}</span>{headlineRest && <> {headlineRest}</>}
              </h1>
              {subheadline && <p className="mt-6 text-xl md:text-2xl font-semibold text-white/70">{subheadline}</p>}
              <p className="mt-5 text-lg text-white/55 max-w-2xl leading-relaxed">{description}</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href={WA} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 bg-white text-ink-900 font-semibold px-7 py-4 rounded-full hover:bg-secondary-100 transition-colors">
                  {t('btn_offer')} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
            {heroImage && (
              <motion.img initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
                src={heroImage.src} alt={heroImage.alt} fetchpriority="high" className="w-full aspect-[4/3] object-cover rounded-3xl shadow-2xl" />
            )}
          </div>
        </div>
      </section>

      {/* Özellikler */}
      {features.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-4 max-w-6xl">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div {...fade} transition={{ ...fade.transition, delay: i * 0.06 }} key={i}
                  className="p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                  {Icon && <span className="inline-flex w-12 h-12 items-center justify-center rounded-xl bg-brand-500/30 text-secondary-300 mb-5"><Icon size={22} /></span>}
                  <h3 className="text-2xl font-semibold mb-3">{f.title}</h3>
                  <p className="text-white/55 leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {children}

      {/* Süreç */}
      {steps.length > 0 && (
        <section className="py-20 md:py-28 border-t border-white/5">
          <div className="container mx-auto px-6 md:px-12">
            <motion.h2 {...fade} className="text-4xl md:text-5xl font-bold tracking-tight mb-12">{t('approach_eyebrow')}</motion.h2>
            <div className="grid md:grid-cols-4 gap-4">
              {steps.map((s, i) => (
                <motion.div {...fade} transition={{ ...fade.transition, delay: i * 0.08 }} key={i} className="p-7 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <div className="text-sm font-mono text-secondary-300 mb-6">{s.step}</div>
                  <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SSS */}
      {faqs.length > 0 && (
        <section className="py-20 md:py-28 border-t border-white/5">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl">
            <motion.h2 {...fade} className="text-4xl md:text-5xl font-bold tracking-tight mb-10">{t('faq_title')}</motion.h2>
            <div className="space-y-3">{faqs.map((f, i) => <FAQItem key={i} {...f} />)}</div>
          </div>
        </section>
      )}

      {/* Çağrı */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fade} className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-10 md:p-16 text-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">{ctaTitle}</h2>
            {ctaSub && <p className="mt-5 text-white/70 text-lg max-w-xl mx-auto">{ctaSub}</p>}
            <a href={WA} target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex items-center gap-2 bg-white text-ink-900 font-semibold px-8 py-4 rounded-full hover:bg-secondary-100 transition-colors">
              {t('btn_offer')} <ArrowUpRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-white/[0.05] transition-colors">
        <span className="font-semibold text-base md:text-lg">{question}</span>
        <Plus size={20} className={`shrink-0 text-white/60 transition-transform ${open ? 'rotate-45' : ''}`} />
      </button>
      {open && <div className="px-6 pb-6 pt-1 text-white/60 leading-relaxed">{answer}</div>}
    </div>
  );
};

export default ServicePageLayout;
