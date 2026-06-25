import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { useLanguage } from '../context/LanguageContext';

const categoryLabels = {
  'SEO': { tr: 'SEO', en: 'SEO' },
  'Google Ads': { tr: 'Google Ads', en: 'Google Ads' },
  'Sosyal Medya': { tr: 'Sosyal Medya', en: 'Social Media' },
  'Dijital Pazarlama': { tr: 'Dijital Pazarlama', en: 'Digital Marketing' },
  'Web Tasarım': { tr: 'Web Tasarım', en: 'Web Design' },
};

const BlogPreview = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-24 md:py-32 bg-ink-900">
      <div className="container mx-auto px-6 md:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
            Blog
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight">
            {t('blog_heading_1')}{' '}
            <span className="text-secondary-300">{t('blog_heading_accent')}</span>
          </h2>
          <p className="mt-4 text-lg text-white/40 max-w-2xl">
            {t('blog_sub')}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => { navigate(`/blog/${post.slug}`); window.scrollTo(0, 0); }}
              className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 hover:border-secondary-300/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title[lang] || post.title.tr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width="400"
                  height="192"
                />
                <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/30 transition-all duration-500" />
                <span className="absolute top-4 left-4 text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm">
                  {categoryLabels[post.category]?.[lang] || post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-white/30 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime[lang] || post.readTime.tr}
                  </span>
                  <span>&middot;</span>
                  <span>{post.date[lang] || post.date.tr}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug line-clamp-2 group-hover:text-secondary-300 transition-colors duration-300">
                  {post.title[lang] || post.title.tr}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt[lang] || post.excerpt.tr}
                </p>
                <span className="inline-flex items-center gap-2 text-secondary-300 text-sm font-medium group-hover:gap-3 transition-all">
                  {t('blog_read_more')}
                  <ArrowUpRight size={14} strokeWidth={2} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { navigate('/blog'); window.scrollTo(0, 0); }}
            className="text-white/50 hover:text-white font-medium text-base transition-all border border-white/20 hover:border-white/40 px-8 py-4 rounded-full"
          >
            {t('blog_view_all') || (lang === 'en' ? 'View all posts' : 'Tüm yazıları gör')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;
