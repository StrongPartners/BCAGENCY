import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import useSEO from '../hooks/useSEO';
import ColorfulBlobs from './ColorfulBlobs';
import { useLanguage } from '../context/LanguageContext';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '../lib/geoSchemas';

const categoryTone = {
  'SEO': { bg: 'bg-brand-100', text: 'text-brand-700' },
  'Google Ads': { bg: 'bg-coral-100', text: 'text-coral-700' },
  'Sosyal Medya': { bg: 'bg-mint-100', text: 'text-mint-700' },
  'Dijital Pazarlama': { bg: 'bg-sun-100', text: 'text-sun-700' },
  'Web Tasarım': { bg: 'bg-brand-100', text: 'text-brand-700' },
};

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
    <div className="bg-white">

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ColorfulBlobs variant="hero" />
        </div>

        <motion.div
          className="absolute top-36 right-10 md:right-24 w-24 h-24 md:w-32 md:h-32 bg-sun-300 rounded-full flex items-center justify-center text-4xl md:text-5xl shadow-sticker-lg border-4 border-ink-900 rotate-neg-3 hidden md:flex"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          ✍️
        </motion.div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: -1 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-coral-200 border-2 border-ink-900 rounded-full px-4 py-1.5 mb-6 shadow-sticker"
          >
            <span className="font-black text-ink-900 text-xs uppercase tracking-wider">{t('blog_badge')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-ink-900 leading-[0.95] tracking-tighter"
          >
            {t('blog_heading_1')}{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-brand-600 via-coral-500 to-sun-500 bg-clip-text text-transparent animate-gradient-shift">
                {t('blog_heading_accent')}
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-lg md:text-xl text-ink-700 font-medium max-w-2xl mx-auto"
          >
            {t('blog_sub')}
          </motion.p>
        </div>
      </section>

      {/* Blog grid */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, index) => {
              const tones = ['shadow-sticker-brand', 'shadow-sticker-coral', 'shadow-sticker-mint', 'shadow-sticker-sun'];
              const tilts = ['rotate-neg-1', 'rotate-pos-1', 'rotate-neg-2', 'rotate-pos-2'];
              const catTone = categoryTone[post.category] || { bg: 'bg-ink-100', text: 'text-ink-700' };

              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
                  whileHover={{ y: -8, rotate: 0 }}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className={`bg-white rounded-3xl overflow-hidden border-2 border-ink-900 ${tones[index % 4]} ${tilts[index % 4]} cursor-pointer group transition-transform`}
                >
                  <div className="relative h-48 overflow-hidden border-b-2 border-ink-900">
                    <img
                      src={post.image}
                      alt={post.title[lang] || post.title.tr}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className={`absolute top-4 left-4 text-xs font-black px-3 py-1 rounded-full border-2 border-ink-900 ${catTone.bg} ${catTone.text}`}>
                      {categoryLabels[post.category]?.[lang] || post.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-ink-400 font-bold mb-3">
                      <span className="flex items-center gap-1">
                        <Clock size={12} strokeWidth={2.5} />
                        {post.readTime[lang] || post.readTime.tr} {t('blog_read_time')}
                      </span>
                      <span>·</span>
                      <span>{post.date[lang] || post.date.tr}</span>
                    </div>
                    <h2 className="text-xl font-black text-ink-900 mb-3 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">
                      {post.title[lang] || post.title.tr}
                    </h2>
                    <p className="text-ink-500 text-sm leading-relaxed mb-4 line-clamp-3 font-medium">
                      {post.excerpt[lang] || post.excerpt.tr}
                    </p>
                    <div className="flex items-center gap-2 text-brand-600 font-black text-sm group-hover:gap-3 transition-all">
                      {t('blog_read_more')}
                      <ArrowUpRight size={16} strokeWidth={3} />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-ink-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-coral-500/30 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-5 leading-none tracking-tight">
            {t('blog_cta_title')}
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-10 font-medium max-w-xl mx-auto">
            {t('blog_cta_sub')}
          </p>
          <button
            onClick={() => window.open('https://wa.me/905488755461', '_blank')}
            className="inline-flex items-center gap-2 bg-sun-300 text-ink-900 font-black text-lg px-10 py-5 rounded-full border-2 border-ink-900 shadow-sticker-coral hover:bg-sun-400 transition-colors"
          >
            {t('btn_offer')}
            <ArrowUpRight size={20} strokeWidth={3} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Blog;
