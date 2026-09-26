import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Clapperboard, Code2, TrendingUp, ArrowRight, ArrowUpRight, Check,
  Users, Layers, MessageCircle, LineChart,
} from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { useLanguage } from '../context/LanguageContext';
import { buildOrganizationSchema, buildWebSiteSchema } from '../lib/geoSchemas';
import Partners from './Partners';
import Testimonials from './Testimonials';
import BlogPreview from './BlogPreview';
import FAQ from './FAQ';

const BCObject = lazy(() => import('./hero/BCObject'));

/*
 * Ana sayfa
 * Hero (interaktif BC) → İş birlikleri → Üç kapı (İçerik · Yazılım · Büyüme) →
 * Tek ekip → Süreç + rakamlar → Yorumlar → Blog → SSS → İletişim çağrısı
 */
const WA = 'https://wa.me/905488321919';

const COPY = {
  tr: {
    kicker: 'BC Creative Agency · Girne, KKTC',
    title_1: 'KKTC’de markanı', title_accent: 'dijitalde', title_2: 'büyüten ekip.',
    desc: 'Sosyal medya, Reels ve video, web sitesi, mobil uygulama, CRM ve SEO. İçeriği üreten ekiple yazılımı yazan ekip aynı çatı altında.',
    cta: 'Bir kahve içelim', cta2: 'Ne yapıyoruz?',
    trust: ['2017’den beri', 'Girne stüdyosu', '4 dilde hizmet'],
    pillars_eyebrow: 'Ne yapıyoruz',
    pillars_title: 'Üç iş, tek ekip.',
    pillars: [
      { icon: Clapperboard, name: 'İçerik', desc: 'Markanızın her gün konuşulması için: strateji, çekim, kurgu ve paylaşım.',
        items: [['Sosyal Medya Yönetimi', '/hizmetler/sosyal-medya'], ['Reels ve Video Edit', '/hizmetler/reels-video-edit'], ['Video Çekim ve Prodüksiyon', '/hizmetler/produksiyon'], ['Fotoğraf ve Drone', '/hizmetler/fotograf-video']] },
      { icon: Code2, name: 'Yazılım', desc: 'İşinizi taşıyan dijital altyapı: hızlı siteler, uygulamalar ve iş yazılımları.',
        items: [['Web Sitesi', '/hizmetler/web-tasarim'], ['Mobil Uygulama', '/hizmetler/uygulama-gelistirme'], ['CRM ve İş Yazılımları', '/hizmetler/crm-yazilim']] },
      { icon: TrendingUp, name: 'Büyüme', desc: 'Doğru kişiye ulaşmak ve bunu ölçmek: arama, reklam ve raporlama.',
        items: [['SEO Yönetimi', '/hizmetler/seo'], ['Google Ads', '/hizmetler/google-ads'], ['Meta Reklamları', '/hizmetler/sosyal-medya']] },
    ],
    why_eyebrow: 'Neden BC',
    why_title: 'Tek ekip, tek muhatap.',
    why_desc: 'Videoyu çeken ekiple siteyi yazan ekip aynı masada oturuyor. Kampanya, içerik ve yazılım birbirinden kopmuyor; siz de beş ayrı firmayla uğraşmıyorsunuz.',
    why: [
      { icon: Users, t: 'Tek muhatap', d: 'Tüm işleriniz için tek proje yöneticisi ve tek WhatsApp grubu.' },
      { icon: Layers, t: 'Kendi yazılımımız', d: 'Kendi CRM’imizi yazdık ve her gün kullanıyoruz. Aynı deneyimi size taşıyoruz.' },
      { icon: LineChart, t: 'Şeffaf raporlama', d: 'Müşteri portalında raporlarınızı, form mesajlarınızı ve işlerinizi görürsünüz.' },
      { icon: MessageCircle, t: 'Hızlı iletişim', d: 'Girne’deki stüdyomuzda yüz yüze, gerisi WhatsApp’ta aynı gün.' },
    ],
    cta_title: 'Bir sonraki iş seninki olsun.',
    cta_desc: 'WhatsApp’tan yaz, aynı gün dönelim. İlk görüşme ve fikir bizden.',
  },
  en: {
    kicker: 'BC Creative Agency · Kyrenia, Northern Cyprus',
    title_1: 'The team that grows', title_accent: 'your brand', title_2: 'online.',
    desc: 'Social media, Reels and video, websites, mobile apps, CRM and SEO. The team that creates your content and the team that writes your software work under one roof.',
    cta: 'Let’s grab a coffee', cta2: 'What we do',
    trust: ['Since 2017', 'Kyrenia studio', 'Service in 4 languages'],
    pillars_eyebrow: 'What we do',
    pillars_title: 'Three crafts, one team.',
    pillars: [
      { icon: Clapperboard, name: 'Content', desc: 'Keeping your brand in the conversation every day: strategy, shoots, editing and posting.',
        items: [['Social Media Management', '/hizmetler/sosyal-medya'], ['Reels & Video Editing', '/hizmetler/reels-video-edit'], ['Video Production', '/hizmetler/produksiyon'], ['Photo & Drone', '/hizmetler/fotograf-video']] },
      { icon: Code2, name: 'Software', desc: 'The digital backbone of your business: fast websites, apps and business software.',
        items: [['Websites', '/hizmetler/web-tasarim'], ['Mobile Apps', '/hizmetler/uygulama-gelistirme'], ['CRM & Business Software', '/hizmetler/crm-yazilim']] },
      { icon: TrendingUp, name: 'Growth', desc: 'Reaching the right people and measuring it: search, ads and reporting.',
        items: [['SEO Management', '/hizmetler/seo'], ['Google Ads', '/hizmetler/google-ads'], ['Meta Ads', '/hizmetler/sosyal-medya']] },
    ],
    why_eyebrow: 'Why BC',
    why_title: 'One team, one contact.',
    why_desc: 'The people who shoot your videos and the people who build your site sit at the same table. Campaigns, content and software stay connected, and you don’t juggle five vendors.',
    why: [
      { icon: Users, t: 'One contact', d: 'One project manager and one WhatsApp group for everything.' },
      { icon: Layers, t: 'Our own software', d: 'We built our own CRM and use it daily. We bring that experience to you.' },
      { icon: LineChart, t: 'Transparent reporting', d: 'See your reports, form messages and jobs in the client portal.' },
      { icon: MessageCircle, t: 'Fast communication', d: 'Face to face at our Kyrenia studio, same-day replies on WhatsApp.' },
    ],
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
    title: 'BC Creative Agency | KKTC Sosyal Medya, Web Sitesi, Uygulama, CRM ve SEO – Girne',
    description: 'BC Creative Agency — KKTC Girne merkezli ajans. Sosyal medya yönetimi, Reels ve video, web sitesi, mobil uygulama, CRM yazılımı ve SEO tek ekipte.',
    keywords: 'KKTC sosyal medya ajansı, Girne web tasarım, KKTC mobil uygulama, KKTC CRM yazılımı, KKTC SEO, Reels üretimi KKTC, Kuzey Kıbrıs dijital ajans',
    canonical: 'https://bccreative.agency/',
    schemas: [buildOrganizationSchema(), buildWebSiteSchema()],
  });

  const steps = Array.isArray(t('approach_steps')) ? t('approach_steps') : [];
  const stats = Array.isArray(t('stats')) ? t('stats') : [];
  const go = (p) => { navigate(p); window.scrollTo({ top: 0 }); };

  return (
    <div className="bg-ink-900 text-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,58,138,0.45),transparent_60%)]" />
        <div className="container mx-auto px-6 md:px-12 relative grid lg:grid-cols-12 gap-8 items-center">
          <motion.div className="lg:col-span-6 relative z-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50 mb-6">{c.kicker}</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
              {c.title_1} <span className="italic font-light text-secondary-300">{c.title_accent}</span> {c.title_2}
            </h1>
            <p className="mt-7 text-lg text-white/65 max-w-xl leading-relaxed">{c.desc}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-ink-900 font-semibold px-7 py-4 rounded-full hover:bg-secondary-100 transition-colors">
                {c.cta} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <button onClick={() => document.getElementById('ne-yapiyoruz')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/40 transition-colors">
                {c.cta2}
              </button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/45">
              {c.trust.map((x) => <li key={x} className="flex items-center gap-2"><Check size={14} className="text-secondary-300" />{x}</li>)}
            </ul>
          </motion.div>
          <motion.div className="lg:col-span-6 h-[320px] sm:h-[440px] lg:h-[560px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
            <Suspense fallback={null}><BCObject className="w-full h-full cursor-crosshair" /></Suspense>
          </motion.div>
        </div>
      </section>

      {/* ── İŞ BİRLİKLERİ ── */}
      <Partners />

      {/* ── ÜÇ KAPI ── */}
      <section id="ne-yapiyoruz" className="py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fade} className="max-w-2xl mb-14">
            <Eyebrow>{c.pillars_eyebrow}</Eyebrow>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">{c.pillars_title}</h2>
          </motion.div>
          <div className="grid lg:grid-cols-3 gap-5">
            {c.pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div {...fade} transition={{ ...fade.transition, delay: i * 0.08 }} key={p.name}
                  className="group flex flex-col p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-secondary-300/40 hover:bg-white/[0.05] transition-colors">
                  <div className="flex items-center justify-between mb-8">
                    <span className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-brand-500/30 text-secondary-300"><Icon size={26} /></span>
                    <span className="font-mono text-sm text-white/30">0{i + 1}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-3">{p.name}</h3>
                  <p className="text-white/55 leading-relaxed mb-8">{p.desc}</p>
                  <ul className="mt-auto border-t border-white/10">
                    {p.items.map(([label, path]) => (
                      <li key={label}>
                        <button onClick={() => go(path)} className="w-full flex items-center justify-between py-3.5 border-b border-white/10 text-left text-white/80 hover:text-white group/item">
                          {label}
                          <ArrowUpRight size={16} className="text-white/30 group-hover/item:text-secondary-300 transition-colors" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TEK EKİP ── */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12">
          <motion.div {...fade} className="lg:col-span-5">
            <Eyebrow>{c.why_eyebrow}</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">{c.why_title}</h2>
            <p className="mt-6 text-white/60 text-lg leading-relaxed">{c.why_desc}</p>
          </motion.div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {c.why.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div {...fade} transition={{ ...fade.transition, delay: i * 0.06 }} key={w.t} className="p-7 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <Icon size={22} className="text-secondary-300 mb-5" />
                  <h3 className="text-lg font-semibold mb-2">{w.t}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{w.d}</p>
                </motion.div>
              );
            })}
          </div>
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
