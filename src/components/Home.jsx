import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { useLanguage } from '../context/LanguageContext';
import { buildOrganizationSchema, buildWebSiteSchema } from '../lib/geoSchemas';
import Partners from './Partners';
import Testimonials from './Testimonials';
import BlogPreview from './BlogPreview';
import FAQ from './FAQ';
import BrandTyper from './BrandTyper';
import VoxelIcon from './hero/VoxelIcon';
import { shapeForPath } from './hero/voxelBus';


/*
 * Ana sayfa — "Küp dünyası".
 * Arkada tek bir 3D sahne yaşar; her [data-voxel-step] bölümü küplerin bir şekle
 * girmesini tetikler: BC → telefon → tarayıcı → katmanlar → grafik → BC.
 */
const WA = 'https://wa.me/905488321919';

const COPY = {
  tr: {
    kicker: 'BC Creative Agency · Girne, KKTC',
    hero: ['KKTC’de markanı', 'dijitalde', 'büyüten ekip.'],
    heroDesc: 'Sosyal medya, Reels ve video, web sitesi, mobil uygulama, CRM ve SEO. Hepsi tek ekipte, hepsi aynı masada.',
    cta: 'Bir kahve içelim', scroll: 'Kaydır, küpler anlatsın',
    trust: ['2017’den beri', 'Girne stüdyosu', '4 dilde hizmet'],
    steps: [
      { no: '01', tag: 'İçerik', title: 'Her gün konuşulan bir marka.', desc: 'Strateji, çekim günü, kurgu, altyazı, müzik ve paylaşım. İlk üç saniyede durduran Reels’ler ve markanızın sesini taşıyan hesaplar.',
        links: [['Sosyal Medya Yönetimi', '/hizmetler/sosyal-medya'], ['Reels ve Video Edit', '/hizmetler/reels-video-edit'], ['Video Çekim ve Prodüksiyon', '/hizmetler/produksiyon']] },
      { no: '02', tag: 'Web', title: 'Satış yapan bir vitrin.', desc: 'Hızlı açılan, telefonda kusursuz çalışan, Google’ın sevdiği siteler. Formları doğrudan CRM’e düşer, ilanları panelden yönetilir.',
        links: [['Web Sitesi', '/hizmetler/web-tasarim']] },
      { no: '03', tag: 'Yazılım', title: 'İşinizi taşıyan sistemler.', desc: 'iOS ve Android uygulamalar, müşteri ve teklif takibi yapan CRM’ler, müşterilerinizin kendi verisini gördüğü portallar. Kendi CRM’imizi yazdık, her gün kullanıyoruz.',
        links: [['Mobil Uygulama', '/hizmetler/uygulama-gelistirme'], ['CRM ve İş Yazılımları', '/hizmetler/crm-yazilim']] },
      { no: '04', tag: 'Büyüme', title: 'Doğru kişiye, ölçülerek.', desc: 'SEO ile aranınca bulunmak, Google ve Meta reklamlarıyla bütçeyi müşteriye çevirmek, her ay neyin işe yaradığını açıkça görmek.',
        links: [['SEO Yönetimi', '/hizmetler/seo'], ['Google Ads', '/hizmetler/google-ads']] },
    ],
    oneTitle: 'Dört iş. Tek ekip.', oneDesc: 'Videoyu çeken ekiple siteyi yazan ekip aynı masada. Beş ayrı firmayla uğraşmazsınız; tek muhatap, tek WhatsApp grubu, tek rapor.',
    oneCta: 'Projenizi anlatın',
    ctaTitle: 'Bir sonraki iş seninki olsun.', ctaDesc: 'WhatsApp’tan yaz, aynı gün dönelim. İlk görüşme ve fikir bizden.',
  },
  en: {
    kicker: 'BC Creative Agency · Kyrenia, Northern Cyprus',
    hero: ['The team that grows', 'your brand', 'online.'],
    heroDesc: 'Social media, Reels and video, websites, mobile apps, CRM and SEO. One team, one table.',
    cta: 'Let’s grab a coffee', scroll: 'Scroll and let the cubes talk',
    trust: ['Since 2017', 'Kyrenia studio', 'Service in 4 languages'],
    steps: [
      { no: '01', tag: 'Content', title: 'A brand people talk about daily.', desc: 'Strategy, shoot days, editing, captions, music and posting. Reels that stop the scroll in three seconds and accounts that carry your voice.',
        links: [['Social Media Management', '/hizmetler/sosyal-medya'], ['Reels & Video Editing', '/hizmetler/reels-video-edit'], ['Video Production', '/hizmetler/produksiyon']] },
      { no: '02', tag: 'Web', title: 'A storefront that sells.', desc: 'Fast websites that work perfectly on phones and that Google loves. Forms land straight in your CRM, listings are managed from a dashboard.',
        links: [['Websites', '/hizmetler/web-tasarim']] },
      { no: '03', tag: 'Software', title: 'Systems that carry your business.', desc: 'iOS and Android apps, CRMs that track customers and quotes, portals where your clients see their own data. We built our own CRM and use it daily.',
        links: [['Mobile Apps', '/hizmetler/uygulama-gelistirme'], ['CRM & Business Software', '/hizmetler/crm-yazilim']] },
      { no: '04', tag: 'Growth', title: 'The right people, measured.', desc: 'Being found through SEO, turning budget into customers with Google and Meta ads, and seeing clearly every month what works.',
        links: [['SEO Management', '/hizmetler/seo'], ['Google Ads', '/hizmetler/google-ads']] },
    ],
    oneTitle: 'Four crafts. One team.', oneDesc: 'The people who shoot your videos and the people who build your site share one table. No juggling five vendors: one contact, one WhatsApp group, one report.',
    oneCta: 'Tell us about your project',
    ctaTitle: 'Let the next one be yours.', ctaDesc: 'Message us on WhatsApp and we’ll reply the same day. The first meeting and ideas are on us.',
  },
};

const Step = ({ index, children, className = '' }) => (
  <section data-voxel-step={index} className={`relative min-h-[100svh] flex items-start lg:items-center pt-[calc(34svh+4.5rem)] lg:pt-0 pb-20 lg:pb-0 ${className}`}>
    <div className="container mx-auto px-6 md:px-12 w-full">
      <div className="lg:w-1/2 relative z-10">{children}</div>
    </div>
  </section>
);

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { amount: 0.4 },
  transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
};

const Home = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const c = COPY[lang] || COPY.en;
  const go = (p) => { navigate(p); window.scrollTo({ top: 0 }); };

  useSEO({
    title: 'BC Creative Agency | KKTC Sosyal Medya, Web Sitesi, Uygulama, CRM ve SEO – Girne',
    description: 'BC Creative Agency — KKTC Girne merkezli ajans. Sosyal medya yönetimi, Reels ve video, web sitesi, mobil uygulama, CRM yazılımı ve SEO tek ekipte.',
    keywords: 'KKTC sosyal medya ajansı, Girne web tasarım, KKTC mobil uygulama, KKTC CRM yazılımı, KKTC SEO, Reels üretimi KKTC, Kuzey Kıbrıs dijital ajans',
    canonical: 'https://bccreative.agency/',
    schemas: [buildOrganizationSchema(), buildWebSiteSchema()],
  });

  return (
    <div className="bg-ink-900 text-white">
      {/* 3D sahne App seviyesinde yaşar (hero/VoxelWorld); burada sadece arka ışık */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_70%_40%,rgba(168,208,224,0.35),transparent_60%)]" />

      <div className="relative z-10">
        {/* 0 — BC */}
        <Step index={0}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50 mb-6">{c.kicker}</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
              {c.hero[0]} <span className="italic font-light text-secondary-300">{c.hero[1]}</span> {c.hero[2]}
            </h1>
            <p className="mt-7 text-lg text-white/65 max-w-xl leading-relaxed">{c.heroDesc}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="pointer-events-auto group inline-flex items-center gap-3 bg-white text-ink-900 font-semibold px-7 py-4 rounded-full hover:bg-brand-600 transition-colors">
                {c.cta} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/45">
              {c.trust.map((x) => <li key={x} className="flex items-center gap-2"><Check size={14} className="text-secondary-300" />{x}</li>)}
            </ul>
            <div className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/35">
              <span className="block w-px h-10 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />{c.scroll}
            </div>
          </motion.div>
        </Step>

        {/* 1..4 — hizmet adımları */}
        {c.steps.map((s, i) => (
          <Step index={i + 1} key={s.no}>
            <motion.div {...reveal} className="">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-sm text-secondary-300">{s.no}</span>
                <span className="h-px w-10 bg-white/25" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">{s.tag}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.02]">{s.title}</h2>
              <p className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">{s.desc}</p>
              <ul className="mt-8 max-w-md border-t border-white/10">
                {s.links.map(([label, path]) => (
                  <li key={label}>
                    <button onClick={() => go(path)} className="w-full flex items-center justify-between py-4 border-b border-white/10 text-left text-white/85 hover:text-white group">
                      <span className="flex items-center gap-3 text-lg"><VoxelIcon name={shapeForPath(path)} className="w-9 h-9 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />{label}</span>
                      <ArrowUpRight size={18} className="text-white/30 group-hover:text-secondary-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Step>
        ))}

        {/* 5 — tekrar BC: tek ekip */}
        <Step index={5}>
          <motion.div {...reveal} className="">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]">{c.oneTitle}</h2>
            <p className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">{c.oneDesc}</p>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="on-dark mt-9 inline-flex items-center gap-3 bg-accent-500 hover:bg-accent-600 font-semibold px-7 py-4 rounded-full transition-colors">
              {c.oneCta} <ArrowRight size={18} />
            </a>
          </motion.div>
        </Step>

        {/* Klasik bölümler (3D sahne burada kaybolur) */}
        <div className="bg-ink-900">
          <BrandTyper />
          <Partners />
          <Testimonials />
          <BlogPreview />
          <section className="py-24 md:py-32 border-t border-white/5"><FAQ /></section>
          <section className="py-24 md:py-32">
            <div className="container mx-auto px-6 md:px-12">
              <div className="on-dark rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-10 md:p-16 text-center">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">{c.ctaTitle}</h2>
                <p className="mt-5 text-white/70 text-lg max-w-xl mx-auto">{c.ctaDesc}</p>
                <div className="mt-9 flex flex-wrap justify-center gap-4">
                  <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white text-ink-900 font-semibold px-7 py-4 rounded-full hover:bg-brand-600 transition-colors">
                    {t('btn_whatsapp')} <ArrowRight size={18} />
                  </a>
                  <a href="mailto:info@bccreative.agency" className="inline-flex items-center px-7 py-4 rounded-full border border-white/25 hover:border-white/60 transition-colors">info@bccreative.agency</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
