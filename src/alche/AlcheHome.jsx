import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import useSEO from '../hooks/useSEO';
import { useLanguage } from '../context/LanguageContext';
import { buildOrganizationSchema, buildWebSiteSchema } from '../lib/geoSchemas';
import BlueprintIntro from './BlueprintIntro';
import SectionRail from './SectionRail';
import Clapper from './Clapper';
import { WORKS } from './works';
import './alche.css';

/* ─── metinler (tr / en; diğer diller en'e düşer) ─── */
const COPY = {
  tr: {
    tagline: 'Fikirleri görünür kılan ekip.',
    hero_kicker: 'BC CREATIVE AGENCY / GİRNE, KKTC',
    hero_1: 'Fikirleri', hero_2: 'görünür', hero_3: 'kılan ekip.',
    hero_desc: "SEO, reklam, sosyal medya, prodüksiyon. Girne'deki stüdyomuzda 2017'den beri markaları büyütüyoruz.",
    scroll: 'KEŞFETMEK İÇİN KAYDIR',
    cta: 'Bir kahve içelim', cta2: 'İşlerimize bak',
    rail: ['BAŞLANGIÇ', 'İŞLER', 'HAKKIMIZDA', 'VİZYON', 'HİZMETLER', 'İLETİŞİM'],
    works_label: 'SEÇİLMİŞ İŞLER', works_all: 'Tüm işler',
    about_label: 'HAKKIMIZDA',
    about_h: 'Küçük bir stüdyo, büyük bir iştah.',
    about_p: "2017'de Girne'de iki kişiyle başladık. Bugün 50'den fazla markanın dijital tarafını yürütüyoruz. Formül basit: iyi fikir, iyi veri, iyi iş ahlakı.",
    about_items: [['01', 'Strateji', 'Veriye bakıp karar veririz, hisse değil.'], ['02', 'Üretim', 'Tasarımdan drone çekimine kadar içeride yaparız.'], ['03', 'Büyüme', 'Reklam bütçesini kâra çeviririz, tıklamaya değil.']],
    vision_label: 'VİZYON',
    vision_h: "KKTC'nin en çok iş üreten yaratıcı ekibi olmak.",
    stats: [['9', 'yıl'], ['50+', 'marka'], ['400+', 'proje'], ['4', 'dil']],
    services_label: 'HİZMETLER',
    services: [
      ['SEO', 'Aranınca bulunmak', '/hizmetler/seo', '/seo-hero.jpg'],
      ['Google Ads', 'Bütçeyi satışa çevirmek', '/hizmetler/google-ads', '/google-ads-hero.jpg'],
      ['Sosyal Medya', 'Her gün konuşulmak', '/hizmetler/sosyal-medya', '/social-media-hero.jpg'],
      ['Web Tasarım', 'Hızlı, temiz, satan siteler', '/hizmetler/web-tasarim', '/marketing-hero.jpg'],
      ['Prodüksiyon', 'Reklam filmi, LED 3D, drone', '/hizmetler/produksiyon', '/marketing-hero-v2.jpg'],
    ],
    roll: ['Web', 'Tasarım', 'Yazılım', 'Kimlik', 'Kampanya', 'İçerik', 'Prodüksiyon', 'Drone', 'SEO', 'Reklam', 'Etki'],
    contact_label: 'İLETİŞİM',
    contact_h: 'Bir sonraki iş seninki olsun.',
    contact_p: 'WhatsApp\'tan yaz, 24 saat içinde dönüş yapalım.',
    contact_btn: 'WhatsApp\'tan yaz',
  },
  en: {
    tagline: 'The team that makes ideas visible.',
    hero_kicker: 'BC CREATIVE AGENCY / KYRENIA, TRNC',
    hero_1: 'We make', hero_2: 'ideas', hero_3: 'visible.',
    hero_desc: 'SEO, ads, social media, production. Growing brands from our Kyrenia studio since 2017.',
    scroll: 'SCROLL TO EXPLORE',
    cta: "Let's grab a coffee", cta2: 'See our work',
    rail: ['TOP', 'WORKS', 'ABOUT', 'VISION', 'SERVICES', 'CONTACT'],
    works_label: 'SELECTED WORKS', works_all: 'All works',
    about_label: 'ABOUT',
    about_h: 'A small studio with a big appetite.',
    about_p: 'We started in Kyrenia in 2017 with two people. Today we run the digital side of 50+ brands. The formula is simple: good ideas, good data, good ethics.',
    about_items: [['01', 'Strategy', 'We decide on data, not gut feeling.'], ['02', 'Production', 'From design to drone footage, all in-house.'], ['03', 'Growth', 'We turn ad budgets into profit, not clicks.']],
    vision_label: 'VISION',
    vision_h: 'To be the most productive creative team in Northern Cyprus.',
    stats: [['9', 'years'], ['50+', 'brands'], ['400+', 'projects'], ['4', 'languages']],
    services_label: 'SERVICES',
    services: [
      ['SEO', 'Be found when searched', '/hizmetler/seo', '/seo-hero.jpg'],
      ['Google Ads', 'Turn budget into sales', '/hizmetler/google-ads', '/google-ads-hero.jpg'],
      ['Social Media', 'Be talked about daily', '/hizmetler/sosyal-medya', '/social-media-hero.jpg'],
      ['Web Design', 'Fast, clean, selling websites', '/hizmetler/web-tasarim', '/marketing-hero.jpg'],
      ['Production', 'Commercials, LED 3D, drone', '/hizmetler/produksiyon', '/marketing-hero-v2.jpg'],
    ],
    roll: ['Web', 'Design', 'Development', 'Identity', 'Campaign', 'Content', 'Production', 'Drone', 'SEO', 'Ads', 'Impact'],
    contact_label: 'CONTACT',
    contact_h: 'Let the next one be yours.',
    contact_p: 'Message us on WhatsApp, we reply within 24 hours.',
    contact_btn: 'Write on WhatsApp',
  },
};

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.3, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let id; const raf = (time) => { lenis.raf(time); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
};

const Label = ({ children }) => (
  <div className="bp-mono flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.25em] text-white/50 uppercase">
    <span className="bp-marker" /> {children}
  </div>
);

const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}>
    {children}
  </motion.div>
);

/* ─── HERO ─── */
const Hero = ({ c }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const op = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <section id="top" ref={ref} className="relative min-h-screen bp-grid flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,208,224,.07),transparent_60%)]" />
      <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-12 gap-10 items-center pt-28 pb-24">
        <motion.div style={{ y, opacity: op }} className="lg:col-span-7">
          <p className="bp-mono text-[10px] md:text-[11px] tracking-[0.3em] text-white/50 mb-8">{c.hero_kicker}</p>
          <h1 className="bp-display text-[15vw] sm:text-[11vw] lg:text-[7.2vw] leading-[0.88] text-white font-semibold">
            {c.hero_1} <span className="italic font-light text-[#A8D0E0]">{c.hero_2}</span><br />{c.hero_3}
          </h1>
          <p className="mt-8 max-w-xl text-white/60 text-base md:text-lg leading-relaxed">{c.hero_desc}</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <button onClick={() => window.open('https://wa.me/905488321919', '_blank')} className="bp-mono text-[11px] tracking-[0.2em] uppercase bg-white text-black px-7 py-4 hover:bg-[#E03C31] hover:text-white transition-colors">{c.cta}</button>
            <button onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })} className="bp-mono text-[11px] tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors">{c.cta2} ↓</button>
          </div>
        </motion.div>
        <div className="lg:col-span-5 hidden md:block">
          <Clapper scene="01" take="09" title={c.tagline} sub="GİRNE 2017" />
        </div>
      </div>
      <div className="absolute bottom-8 left-6 md:left-12 flex items-center gap-4 bp-mono text-[10px] tracking-[0.25em] text-white/40">
        <span className="block w-px h-10 bg-white/50 bp-scan" /> {c.scroll}
      </div>
      <div className="absolute bottom-8 right-6 md:right-24 bp-mono text-[10px] tracking-[0.25em] text-white/30 hidden md:block">35°20'N 33°19'E</div>
    </section>
  );
};

/* ─── WORKS ─── */
const Works = ({ c }) => {
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const [hover, setHover] = useState(null);
  useEffect(() => {
    const move = (e) => { if (imgRef.current) { imgRef.current.style.left = e.clientX + 'px'; imgRef.current.style.top = e.clientY + 'px'; } };
    window.addEventListener('mousemove', move); return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <section id="works" className="relative py-28 md:py-40">
      <img ref={imgRef} src={hover?.image} alt="" className={`bp-float-img hidden lg:block ${hover ? 'on' : ''}`} />
      <div className="container mx-auto px-6 md:px-12">
        <Reveal><Label>{c.works_label}</Label></Reveal>
        <div className="mt-10">
          {WORKS.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <button onMouseEnter={() => setHover(w)} onMouseLeave={() => setHover(null)} onClick={() => navigate(w.href)}
                className="bp-row group w-full grid grid-cols-12 items-center gap-4 py-6 md:py-8 text-left">
                <span className="bp-mono col-span-2 md:col-span-1 text-[11px] text-white/40">{String(i + 1).padStart(2, '0')}</span>
                <span className="bp-row-title bp-display col-span-10 md:col-span-6 text-3xl md:text-5xl text-white/85 font-medium leading-none">{w.title}</span>
                <span className="col-span-8 md:col-span-4 flex flex-wrap gap-2 md:justify-end">
                  {w.tags.map(t => <span key={t} className="bp-mono text-[10px] tracking-[0.15em] uppercase border border-white/15 px-2.5 py-1 text-white/50 group-hover:border-white/40 group-hover:text-white/80 transition-colors">{t}</span>)}
                </span>
                <span className="bp-mono col-span-4 md:col-span-1 text-[11px] text-white/40 text-right">{w.year}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── ABOUT ─── */
const About = ({ c }) => (
  <section id="about" className="relative py-28 md:py-40 border-t border-white/5">
    <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5">
        <Reveal><Label>{c.about_label}</Label></Reveal>
        <Reveal delay={0.1}><h2 className="bp-display mt-8 text-4xl md:text-6xl text-white leading-[0.95]">{c.about_h}</h2></Reveal>
        <Reveal delay={0.2}><p className="mt-8 text-white/60 text-base md:text-lg leading-relaxed max-w-md">{c.about_p}</p></Reveal>
      </div>
      <div className="lg:col-span-6 lg:col-start-7 relative">
        <div className="absolute left-[4px] top-2 bottom-2 w-px bg-white/10" />
        {c.about_items.map(([n, h, p], i) => (
          <Reveal key={n} delay={0.1 * i} className="relative pl-10 py-6">
            <span className="bp-marker absolute left-0 top-8 bg-[#050506]" />
            <div className="bp-mono text-[10px] tracking-[0.25em] text-white/40">{n}</div>
            <div className="bp-display text-2xl md:text-3xl text-white mt-1">{h}</div>
            <div className="text-white/55 mt-2 max-w-sm">{p}</div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ─── VISION ─── */
const Vision = ({ c }) => (
  <section id="vision" className="relative py-28 md:py-40 border-t border-white/5 bp-grid">
    <div className="container mx-auto px-6 md:px-12">
      <Reveal><Label>{c.vision_label}</Label></Reveal>
      <Reveal delay={0.1}><h2 className="bp-display mt-8 text-4xl md:text-7xl text-white leading-[0.95] max-w-4xl">{c.vision_h}</h2></Reveal>
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 border-t border-white/10">
        {c.stats.map(([v, l], i) => (
          <Reveal key={l} delay={0.08 * i} className="py-8 md:py-10 pr-6 border-r border-white/10 last:border-r-0">
            <div className="bp-display text-5xl md:text-7xl text-white">{v}</div>
            <div className="bp-mono mt-2 text-[10px] tracking-[0.25em] uppercase text-white/45">{l}</div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ─── SERVICES ─── */
const Services = ({ c }) => {
  const navigate = useNavigate();
  const roll = [...c.roll, ...c.roll];
  return (
    <section id="services" className="relative py-28 md:py-40 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-3">
          <Reveal><Label>{c.services_label}</Label></Reveal>
          <div className="mt-8 h-[300px] overflow-hidden [mask-image:linear-gradient(transparent,black_20%,black_80%,transparent)]">
            <div className="bp-roll">
              {roll.map((w, i) => <div key={i} className="bp-display text-3xl md:text-4xl text-white/70 leading-tight">{w}</div>)}
            </div>
          </div>
        </div>
        <div className="lg:col-span-9 grid sm:grid-cols-2 gap-px bg-white/10">
          {c.services.map(([h, p, href, img], i) => (
            <Reveal key={h} delay={0.05 * i} className="bg-[#050506]">
              <button onClick={() => navigate(href)} className="group relative w-full text-left p-7 md:p-9 overflow-hidden min-h-[240px]">
                <img src={img} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-30 scale-105 group-hover:scale-100 transition-all duration-700" />
                <div className="relative">
                  <div className="bp-mono text-[10px] tracking-[0.25em] text-white/40">{String(i + 1).padStart(2, '0')}</div>
                  <div className="bp-display text-3xl md:text-4xl text-white mt-3">{h}</div>
                  <div className="text-white/55 mt-2">{p}</div>
                  <div className="bp-mono text-[10px] tracking-[0.2em] uppercase text-white/40 group-hover:text-white mt-8 transition-colors">→</div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── CONTACT ─── */
const Contact = ({ c }) => (
  <section id="contact" className="relative py-28 md:py-40 border-t border-white/5">
    <div className="container mx-auto px-6 md:px-12">
      <Reveal><Label>{c.contact_label}</Label></Reveal>
      <Reveal delay={0.1}><h2 className="bp-display mt-8 text-5xl md:text-8xl text-white leading-[0.92] max-w-4xl">{c.contact_h}</h2></Reveal>
      <Reveal delay={0.2}>
        <p className="mt-8 text-white/60 text-lg">{c.contact_p}</p>
        <div className="mt-8 flex flex-wrap gap-6 items-center">
          <button onClick={() => window.open('https://wa.me/905488321919', '_blank')} className="bp-mono text-[11px] tracking-[0.2em] uppercase bg-[#E03C31] text-white px-7 py-4 hover:bg-white hover:text-black transition-colors">{c.contact_btn}</button>
          <a href="mailto:info@bccreative.agency" className="bp-mono text-[11px] tracking-[0.2em] uppercase text-white/60 hover:text-white">info@bccreative.agency</a>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ─── SAYFA ─── */
const AlcheHome = () => {
  const { lang } = useLanguage();
  const c = COPY[lang] || COPY.en;
  const [intro, setIntro] = useState(() => !sessionStorage.getItem('bc_intro_seen'));
  useLenis();
  useSEO({
    title: 'BC Creative Agency | KKTC Dijital Pazarlama, SEO, Google Ads – Girne',
    description: 'BC Creative Agency — KKTC Girne merkezli yaratıcı dijital pazarlama ajansı. SEO, Google Ads, sosyal medya, web tasarım ve prodüksiyon.',
    keywords: 'KKTC dijital ajans, Kuzey Kıbrıs reklam ajansı, KKTC SEO, Girne dijital pazarlama',
    canonical: 'https://bccreative.agency/',
    schemas: [buildOrganizationSchema(), buildWebSiteSchema()],
  });

  const ids = ['top', 'works', 'about', 'vision', 'services', 'contact'];
  const sections = ids.map((id, i) => ({ id, label: c.rail[i] }));

  return (
    <div className="bp bg-[#050506] text-white">
      <AnimatePresence>
        {intro && <BlueprintIntro tagline={c.tagline} onDone={() => { sessionStorage.setItem('bc_intro_seen', '1'); setIntro(false); }} />}
      </AnimatePresence>
      <SectionRail sections={sections} />
      <Hero c={c} />
      <Works c={c} />
      <About c={c} />
      <Vision c={c} />
      <Services c={c} />
      <Contact c={c} />
    </div>
  );
};

export default AlcheHome;
