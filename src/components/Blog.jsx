import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import useSEO from '../hooks/useSEO';
import { useLanguage } from '../context/LanguageContext';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '../lib/geoSchemas';

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
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-6"
          >
            {t('blog_badge')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold text-ink-900 leading-[0.95] tracking-tighter"
          >
            {t('blog_heading_1')}{' '}
            {t('blog_heading_accent')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-lg md:text-xl text-ink-500 max-w-2xl mx-auto"
          >
            {t('blog_sub')}
          </motion.p>
        </div>
      </section>

      {/* Blog grid */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="bg-white rounded-xl overflow-hidden border border-ink-100 cursor-pointer group hover:shadow-sm transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title[lang] || post.title.tr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 text-xs font-medium px-3 py-1 rounded-full bg-white/90 text-ink-700 backdrop-blur-sm">
                    {categoryLabels[post.category]?.[lang] || post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-ink-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime[lang] || post.readTime.tr} {t('blog_read_time')}
                    </span>
                    <span>&middot;</span>
                    <span>{post.date[lang] || post.date.tr}</span>
                  </div>
                  <h2 className="text-xl font-bold text-ink-900 mb-3 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">
                    {post.title[lang] || post.title.tr}
                  </h2>
                  <p className="text-ink-500 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt[lang] || post.excerpt.tr}
                  </p>
                  <div className="flex items-center gap-2 text-brand-600 font-medium text-sm group-hover:gap-3 transition-all">
                    {t('blog_read_more')}
                    <ArrowUpRight size={14} strokeWidth={2} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-ink-900">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-none tracking-tight">
            {t('blog_cta_title')}
          </h2>
          <p className="text-ink-400 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            {t('blog_cta_sub')}
          </p>
          <button
            onClick={() => window.open('https://wa.me/905488755461', '_blank')}
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
