import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search, MousePointerClick, Share2, Monitor, Clapperboard, Plane, Camera,
  ArrowRight, ArrowUpRight, Check,
} from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { useLanguage } from '../context/LanguageContext';
import { buildOrganizationSchema, buildWebSiteSchema } from '../lib/geoSchemas';
import Partners from './Partners';
import Testimonials from './Testimonials';
import BlogPreview from './BlogPreview';
import FAQ from './FAQ';

/*
 * Ana sayfa — sade, tek tema, hızlı.
 * Sıra: Hero → İş birlikleri → Hizmetler → Öne çıkan iş (3D LED) → Süreç →
 *       Yorumlar → Blog → SSS → İletişim çağrısı
 */

const WA = 'https://wa.me/905488321919';
const ICONS = [Search, MousePointerClick, Share2, Monitor, Clapperboard, Plane, Camera];

// Bu sayfaya özel metinler (tr/en; diğer diller en'e düşer)
const COPY = {
  tr: {
    trust: ['2017’den beri', 'Girne stüdyosu', '4 dilde hizmet'],
    featured_eyebrow: 'Öne çıkan iş',
    featured_title: 'Ekrandan fırlayan reklamlar: çıplak göz 3D LED',
    featured_desc: 'Köşe, kavisli ve dikey LED ekranlar için ürününüzün ekrandan dışarı çıkıyormuş gibi göründüğü reklam videoları üretiyoruz. Yer keşfinden müziğe kadar her şey bizde.',
    featured_points: ['Ekranınızın ölçüsüne ve izleme noktasına göre tasarım', 'Gerçekçi prodüksiyon, sesli ve müzikli kurgu', 'Aynı videonun sosyal medya sürümleri'],
    featured_cta: 'Rehberi oku',
    services_title: 'Markanız için gereken her şey, tek ekipte.',
    cta_title: 'Bir sonraki iş seninki olsun.',
    cta_desc: 'WhatsApp’tan yaz, aynı gün dönelim. İlk görüşme ve fikir bizden.',
  },
  en: {
    trust: ['Since 2017', 'Kyrenia studio', 'Service in 4 languages'],
    featured_eyebrow: 'Featured work',
    featured_title: 'Ads that leap out of the screen: naked-eye 3D LED',
    featured_desc: 'We produce ad videos for corner, curved and vertical LED screens in which your product seems to burst out of the screen. From site survey to music, we do it all.',
    featured_points: ['Designed for your screen size and viewing point', 'Realistic production with sound and music', 'Social media versions of the same video'],
    featured_cta: 'Read the guide',
    services_title: 'Everything your brand needs, in one team.',
    cta_title: 'Let the next one be yours.',
    cta_desc: 'Message us on WhatsApp and we’ll reply the same day. The first meeting and ideas are on us.',
  },
};

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
};

const Eyebrow = ({ children }) => (
  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary-300/80 mb-4">{children}</p>
);

const Home = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const c = COPY[lang] || COPY.en;

  useSEO({
    title: 'BC Creative Agency | KKTC Dijital Pazarlama, SEO, Google Ads – Girne',
    description: 'BC Creative Agency — KKTC Girne merkezli yaratıcı dijital pazarlama ajansı. SEO, Google Ads, sosyal medya, web tasarım, prodüksiyon ve 3D LED reklam.',
    keywords: 'KKTC dijital ajans, Kuzey Kıbrıs reklam ajansı, KKTC SEO, Girne dijital pazarlama, KKTC Google Ads, sosyal medya yönetimi KKTC, 3D LED reklam KKTC',
    canonical: 'https://bccreative.agency/',
    schemas: [buildOrganizationSchema(), buildWebSiteSchema()],
  });

  const services = Array.isArray(t('services_list')) ? t('services_list') : [];
  const steps = Array.isArray(t('approach_steps')) ? t('approach_steps') : [];
  const stats = Array.isArray(t('stats')) ? t('stats') : [];
  const go = (p) => { navigate(p); window.scrollTo({ top: 0 }); };

  return (
    <div className="bg-ink-900 text-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,58,138,0.45),transparent_60%)]" />
        <div className="container mx-auto px-6 md:px-12 relative grid lg:grid-cols-12 gap-12 items-center">
          <motion.div className="lg:col-span-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50 mb-6">BC Creative Agency · Girne, KKTC</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
              {t('hero_headline_1')} <span className="italic font-light text-secondary-300">{t('hero_headline_accent')}</span><br />
              {t('hero_headline_2')}
            </h1>
            <p className="mt-7 text-lg text-white/65 max-w-xl leading-relaxed">{t('hero_desc')}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-ink-900 font-semibold px-7 py-4 rounded-full hover:bg-secondary-100 transition-colors">
                {t('hero_cta')} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <button onClick={() => document.getElementById('hizmetler')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/40 transition-colors">
                {t('hero_cta_secondary')}
              </button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/45">
              {c.trust.map((x) => <li key={x} className="flex items-center gap-2"><Check size={14} className="text-secondary-300" />{x}</li>)}
            </ul>
          </motion.div>

          {/* Görsel kolaj — 3D LED çalışmalarından */}
          <motion.div className="lg:col-span-6 relative h-[380px] sm:h-[460px]" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <img src="/blog/led-3d/01-girne-liman-3d-led.webp" alt="Liman kenarında 3D LED reklam" fetchpriority="high"
              className="absolute right-0 top-0 w-[82%] h-[70%] object-cover rounded-2xl shadow-2xl" />
            <img src="/blog/led-3d/09-stil-karesi-kutu-oda.webp" alt="3D LED stil karesi" loading="lazy"
              className="absolute left-0 bottom-0 w-[52%] h-[48%] object-cover rounded-2xl shadow-2xl ring-4 ring-ink-900" />
            <img src="/blog/led-3d/12-telefonla-cekim-viral.webp" alt="3D LED reklamı telefonla çeken insanlar" loading="lazy"
              className="absolute right-[6%] bottom-[2%] w-[40%] h-[34%] object-cover rounded-2xl shadow-2xl ring-4 ring-ink-900 hidden sm:block" />
          </motion.div>
        </div>
      </section>

      {/* ── İŞ BİRLİKLERİ ── */}
      <Partners />

      {/* ── HİZMETLER ── */}
      <section id="hizmetler" className="py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fade} className="max-w-2xl mb-14">
            <Eyebrow>{t('services_eyebrow')}</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">{c.services_title}</h2>
            <p className="mt-5 text-white/55 text-lg">{t('services_sub')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => {
              const Icon = ICONS[i] || Search;
              return (
                <motion.button {...fade} transition={{ ...fade.transition, delay: i * 0.05 }} key={s.path} onClick={() => go(s.path)}
                  className="group text-left p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-secondary-300/40 transition-colors">
                  <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-brand-500/30 text-secondary-300 mb-5"><Icon size={20} /></span>
                  <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">{s.title}<ArrowUpRight size={16} className="text-white/30 group-hover:text-secondary-300 transition-colors" /></h3>
                  <p className="text-sm text-white/50 leading-relaxed">{s.description}</p>
                </motion.button>
              );
            })}
            <motion.a {...fade} href={WA} target="_blank" rel="noopener noreferrer"
              className="p-7 rounded-2xl bg-accent-500 hover:bg-accent-600 transition-colors flex flex-col justify-between min-h-[190px]">
              <span className="text-lg font-semibold">{t('btn_talk')}</span>
              <span className="flex items-center gap-2 text-white/90">{t('btn_whatsapp')} <ArrowRight size={16} /></span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── ÖNE ÇIKAN İŞ: 3D LED ── */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fade} className="grid grid-cols-2 gap-3">
            <img src="/blog/led-3d/03-kose-led-ekran-3d.webp" alt="Köşe LED ekranda 3D reklam" loading="lazy" className="col-span-2 w-full aspect-[16/9] object-cover rounded-2xl" />
            <img src="/blog/led-3d/10-buz-patlama-karesi.webp" alt="Buz patlaması 3D kare" loading="lazy" className="w-full aspect-[4/3] object-cover rounded-2xl" />
            <img src="/blog/led-3d/05-otel-lobi-dikey-led.webp" alt="Otel lobisinde dikey LED" loading="lazy" className="w-full aspect-[4/3] object-cover rounded-2xl" />
          </motion.div>
          <motion.div {...fade}>
            <Eyebrow>{c.featured_eyebrow}</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">{c.featured_title}</h2>
            <p className="mt-5 text-white/60 text-lg leading-relaxed">{c.featured_desc}</p>
            <ul className="mt-7 space-y-3">
              {c.featured_points.map((p) => (
                <li key={p} className="flex gap-3 text-white/75"><Check size={18} className="text-secondary-300 shrink-0 mt-0.5" />{p}</li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-4">
              <button onClick={() => go('/blog/kktc-ciplak-goz-3d-led-reklam-rehberi-girne-lefkosa')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 hover:border-white/50 transition-colors">
                {c.featured_cta} <ArrowUpRight size={16} />
              </button>
              <button onClick={() => go('/hizmetler/produksiyon')} className="inline-flex items-center gap-2 px-6 py-3.5 text-white/60 hover:text-white transition-colors">
                {t('nav_production')} <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SÜREÇ + RAKAMLAR ── */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fade} className="max-w-2xl mb-14">
            <Eyebrow>{t('approach_eyebrow')}</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t('approach_heading_1')} {t('approach_heading_2')}</h2>
            <p className="mt-5 text-white/55 text-lg">{t('approach_sub')}</p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <motion.div {...fade} transition={{ ...fade.transition, delay: i * 0.08 }} key={s.number}
                className="p-7 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="text-sm font-mono text-secondary-300 mb-6">{s.number}</div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          {stats.length > 0 && (
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 border-y border-white/10">
              {stats.map((s, i) => (
                <div key={i} className="py-8 px-4 text-center">
                  <div className="text-4xl md:text-5xl font-bold">{s.value}</div>
                  <div className="mt-2 text-sm text-white/45">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── YORUMLAR / BLOG / SSS ── */}
      <Testimonials />
      <BlogPreview />
      <section className="py-24 md:py-32 border-t border-white/5"><FAQ /></section>

      {/* ── İLETİŞİM ÇAĞRISI ── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fade} className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-10 md:p-16 text-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">{c.cta_title}</h2>
            <p className="mt-5 text-white/70 text-lg max-w-xl mx-auto">{c.cta_desc}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white text-ink-900 font-semibold px-7 py-4 rounded-full hover:bg-secondary-100 transition-colors">
                {t('btn_whatsapp')} <ArrowRight size={18} />
              </a>
              <a href="mailto:info@bccreative.agency" className="inline-flex items-center px-7 py-4 rounded-full border border-white/25 hover:border-white/60 transition-colors">
                info@bccreative.agency
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
