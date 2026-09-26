import React, { Suspense, lazy, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight } from 'lucide-react';
import blogPosts from '../data/blogIndex.json';
import useSEO from '../hooks/useSEO';
import { useLanguage } from '../context/LanguageContext';
import VoxelIcon from './hero/VoxelIcon';
import { categoryShape, getShape } from './hero/voxelShapes';

import { buildOrganizationSchema, buildBreadcrumbSchema } from '../lib/geoSchemas';

const VoxelMini = lazy(() => import('./hero/VoxelMini'));

// Kategori filtresi: her grup kendi küp şekliyle (video ve fotoğraf tek grupta)
const groupOf = (cat) => { const g = categoryShape(cat); return g === 'camera' ? 'clapper' : g; };
const FILTERS = [
  { key: 'all', icon: 'bc', tr: 'Tümü', en: 'All' },
  { key: 'heart', icon: 'heart', tr: 'Sosyal Medya', en: 'Social Media' },
  { key: 'magnifier', icon: 'magnifier', tr: 'SEO', en: 'SEO' },
  { key: 'target', icon: 'target', tr: 'Google Ads', en: 'Google Ads' },
  { key: 'browser', icon: 'browser', tr: 'Web', en: 'Web' },
  { key: 'clapper', icon: 'clapper', tr: 'Video & Foto', en: 'Video & Photo' },
  { key: 'pencil', icon: 'pencil', tr: 'Grafik', en: 'Graphic' },
  { key: 'chart', icon: 'chart', tr: 'Dijital Pazarlama', en: 'Digital Marketing' },
];
const PAGE = 12;

const categoryLabels = {
  'SEO': { tr: 'SEO', en: 'SEO' },
  'Google Ads': { tr: 'Google Ads', en: 'Google Ads' },
  'Sosyal Medya': { tr: 'Sosyal Medya', en: 'Social Media' },
  'Dijital Pazarlama': { tr: 'Dijital Pazarlama', en: 'Digital Marketing' },
  'Web Tasarım': { tr: 'Web Tasarım', en: 'Web Design' },
};

const Blog = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [limit, setLimit] = useState(PAGE);
  const counts = useMemo(() => blogPosts.reduce((m, p) => { const g = groupOf(p.category); m[g] = (m[g] || 0) + 1; return m; }, { all: blogPosts.length }), []);
  const list = useMemo(() => (filter === 'all' ? blogPosts : blogPosts.filter(p => groupOf(p.category) === filter)), [filter]);
  const shown = list.slice(0, limit);
  const pick = (k) => { setFilter(k); setLimit(PAGE); };

  useSEO({
    title: t('blog_heading_1') + ' ' + t('blog_heading_accent') + ' | BC Creative Agency',
    description: t('blog_sub'),
    keywords: 'KKTC dijital pazarlama blog, KKTC SEO rehberi, KKTC Google Ads, Girne dijital ajans',
    canonical: 'https://bccreative.agency/blog',
    schemas: [
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: t('nav_home'), url: 'https://bccreative.agency/' },
        { name: t('nav_blog'), url: 'https://bccreative.agency/blog' },
      ]),
    ],
  });

  return (
    <div className="bg-ink-900">

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div data-voxel-anchor="always" aria-hidden="true" className="mx-auto w-full max-w-xl h-[26svh] md:h-[34vh] lg:h-[38vh] mb-2" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-6"
          >
            {t('blog_badge')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold text-white leading-[0.95] tracking-tighter"
          >
            {t('blog_heading_1')}{' '}
            {t('blog_heading_accent')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
          >
            {t('blog_sub')}
          </motion.p>
        </div>
      </section>

      {/* Blog grid */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-3 mb-8 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap" role="tablist" aria-label={lang === 'tr' ? 'Kategoriler' : 'Categories'}>
            {FILTERS.filter(f => counts[f.key]).map(f => (
              <button key={f.key} role="tab" aria-selected={filter === f.key} onClick={() => pick(f.key)}
                className={`group shrink-0 inline-flex items-center gap-2 rounded-full border pl-2 pr-4 py-1.5 text-sm font-medium transition-colors ${filter === f.key ? 'border-secondary-300 bg-secondary-300/10 text-white' : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'}`}>
                <VoxelIcon name={f.icon} className="w-7 h-7 transition-transform duration-300 group-hover:-rotate-6" />
                {lang === 'tr' ? f.tr : f.en}
                <span className="text-xs text-white/35">{counts[f.key]}</span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {shown.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="bg-white/5 rounded-xl overflow-hidden border border-white/10 cursor-pointer group hover:bg-white/10 hover:border-secondary-300/30 transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title[lang] || post.title.tr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width="400"
                    height="192"
                  />
                  <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/40 transition-all duration-500" />
                  <span className="on-dark absolute top-4 left-4 text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm">
                    {categoryLabels[post.category]?.[lang] || post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-white/30 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime[lang] || post.readTime.tr} {t('blog_read_time')}
                    </span>
                    <span>&middot;</span>
                    <span>{post.date[lang] || post.date.tr}</span>
                    <VoxelIcon name={categoryShape(post.category)} className="ml-auto w-9 h-9 -my-2" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 leading-snug line-clamp-2 group-hover:text-secondary-300 group-hover:-translate-y-0.5 transition-all duration-300">
                    {post.title[lang] || post.title.tr}
                  </h2>
                  <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt[lang] || post.excerpt.tr}
                  </p>
                  <div className="flex items-center gap-2 text-secondary-300 font-medium text-sm group-hover:gap-3 transition-all">
                    {t('blog_read_more')}
                    <ArrowUpRight size={14} strokeWidth={2} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          {limit < list.length && (
            <div className="mt-12 flex justify-center">
              <button onClick={() => setLimit(l => l + PAGE)} className="group inline-flex items-center gap-3 rounded-full border border-white/15 pl-3 pr-6 py-2.5 font-medium hover:border-white/40 transition-colors">
                <VoxelIcon name="arrow-up" className="w-8 h-8 rotate-180 transition-transform duration-300 group-hover:translate-y-0.5" />
                {lang === 'tr' ? `Daha fazla göster (${list.length - limit} yazı daha)` : `Show more (${list.length - limit} more)`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="on-dark py-24 md:py-32 bg-brand-600">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <Suspense fallback={<div className="h-36 md:h-44" />}>
            <VoxelMini shape={getShape('chat')} palette="dark" className="h-36 md:h-44 w-full -mt-6 mb-6" />
          </Suspense>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-none tracking-tight">
            {t('blog_cta_title')}
          </h2>
          <p className="text-ink-400 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            {t('blog_cta_sub')}
          </p>
          <button
            onClick={() => window.open('https://wa.me/905488321919', '_blank')}
            className="inline-flex items-center gap-2 bg-white text-ink-900 font-medium text-lg px-10 py-4 rounded-full hover:bg-ink-50 transition-colors"
          >
            {t('btn_offer')}
            <ArrowUpRight size={18} strokeWidth={2} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Blog;
