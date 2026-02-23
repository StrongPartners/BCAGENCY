import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, Tag, ChevronRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import useSEO from '../hooks/useSEO';
import { useLanguage } from '../context/LanguageContext';

const categoryColors = {
  'SEO': 'bg-blue-100 text-blue-700',
  'Google Ads': 'bg-yellow-100 text-yellow-700',
  'Sosyal Medya': 'bg-pink-100 text-pink-700',
  'Dijital Pazarlama': 'bg-purple-100 text-purple-700',
  'Web Tasarım': 'bg-green-100 text-green-700',
};

const categoryLabels = {
  'SEO': { tr: 'SEO', en: 'SEO' },
  'Google Ads': { tr: 'Google Ads', en: 'Google Ads' },
  'Sosyal Medya': { tr: 'Sosyal Medya', en: 'Social Media' },
  'Dijital Pazarlama': { tr: 'Dijital Pazarlama', en: 'Digital Marketing' },
  'Web Tasarım': { tr: 'Web Tasarım', en: 'Web Design' },
};

// Markdown'u basit HTML'e çevir
const renderContent = (content) => {
  if (!content) return null;
  const lines = content.trim().split('\n');
  const result = [];
  let currentTable = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Table detection
    if (line.startsWith('|')) {
      if (!currentTable) {
        currentTable = [];
      }
      // Skip separator row (|---|---|)
      if (line.includes('---')) continue;

      const cells = line.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim());
      currentTable.push(cells);
      continue;
    } else if (currentTable) {
      // Table ended
      const tableRows = currentTable;
      result.push(
        <div key={`table-${i}`} className="overflow-x-auto my-8">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                {tableRows[0].map((cell, idx) => (
                  <th key={idx} className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableRows.slice(1).map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-50/50 transition-colors">
                  {row.map((cell, idx) => (
                    <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTable = null;
    }

    if (line.startsWith('## ')) {
      result.push(<h2 key={i} className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">{line.replace('## ', '')}</h2>);
    } else if (line.startsWith('### ')) {
      result.push(<h3 key={i} className="text-xl font-bold text-gray-800 mt-6 mb-3">{line.replace('### ', '')}</h3>);
    } else if (line.startsWith('**') && line.endsWith('**')) {
      result.push(<p key={i} className="font-bold text-gray-800 my-2">{line.replace(/\*\*/g, '')}</p>);
    } else if (line.startsWith('- ')) {
      result.push(<li key={i} className="text-gray-600 ml-4 mb-1 list-disc font-medium">{line.replace('- ', '')}</li>);
    } else if (line.startsWith('* ')) {
      result.push(<li key={i} className="text-gray-600 ml-4 mb-1 list-disc font-medium">{line.replace('* ', '')}</li>);
    } else if (line.startsWith('`') && line.endsWith('`')) {
      result.push(<code key={i} className="block bg-gray-100 text-brand-600 px-4 py-2 rounded-lg text-sm font-mono my-3">{line.replace(/`/g, '')}</code>);
    } else if (line === '') {
      result.push(<br key={i} />);
    } else if (line.includes('**')) {
      const parts = line.split('**');
      result.push(
        <p key={i} className="text-gray-600 leading-relaxed mb-3 font-medium">
          {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-gray-900 font-bold">{part}</strong> : part)}
        </p>
      );
    } else {
      result.push(<p key={i} className="text-gray-600 leading-relaxed mb-3 font-medium">{line}</p>);
    }
  }
  return result;
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const postTitle = post?.title[lang] || post?.title.tr;
  const postExcerpt = post?.excerpt[lang] || post?.excerpt.tr;
  const postContent = post?.content[lang] || post?.content.tr;
  const postDate = post?.date[lang] || post?.date.tr;
  const postReadTime = post?.readTime[lang] || post?.readTime.tr;

  useSEO({
    title: post ? `${postTitle} | BC Creative Agency Blog` : 'Blog | BC Creative Agency',
    description: postExcerpt || "KKTC dijital pazarlama, SEO ve reklam rehberleri.",
    keywords: `KKTC ${post?.category}, Kuzey Kıbrıs dijital pazarlama, ${postTitle}`,
    canonical: `https://bccreative.agency/blog/${slug}`,
  });

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">{t('blog_not_found')}</h1>
          <button onClick={() => navigate('/blog')} className="text-brand-600 font-semibold">
            ← {t('blog_back')}
          </button>
        </div>
      </div>
    );
  }

  const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={post.image} alt={postTitle} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto">
            <button
              onClick={() => navigate('/blog')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 text-sm"
            >
              <ArrowLeft size={16} /> {t('blog_back')}
            </button>
            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
              {categoryLabels[post.category]?.[lang] || post.category}
            </span>
            <h1 className="text-2xl md:text-5xl font-black text-white leading-tight max-w-3xl">
              {postTitle}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Meta */}
          <div className="flex items-center gap-6 text-sm text-gray-400 mb-10 pb-8 border-b border-gray-100">
            <span className="flex items-center gap-1"><Clock size={14} /> {postReadTime} {t('blog_read_time')}</span>
            <span>{postDate}</span>
            <span className="flex items-center gap-1"><Tag size={14} /> {categoryLabels[post.category]?.[lang] || post.category}</span>
          </div>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:font-medium text-lg leading-relaxed"
          >
            {renderContent(postContent)}
          </motion.div>

          {/* CTA */}
          <div className="mt-20 p-10 md:p-16 bg-gray-900 rounded-[3rem] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 blur-3xl pointer-events-none" />
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">
              {t('blog_cta_title')}
            </h3>
            <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">
              {t('blog_cta_sub')}
            </p>
            <button
              onClick={() => window.open('https://wa.me/905488755461', '_blank')}
              className="bg-brand-600 text-white font-black text-xl px-12 py-5 rounded-full hover:bg-brand-700 transition-all shadow-2xl relative z-10"
            >
              {t('btn_offer')} →
            </button>
          </div>
        </div>
      </div>

      {/* Other Posts */}
      {otherPosts.length > 0 && (
        <section className="py-24 px-4 md:px-8 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-black text-gray-900 mb-12">{t('blog_other_posts')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherPosts.map(other => (
                <div
                  key={other.id}
                  onClick={() => navigate(`/blog/${other.slug}`)}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1 border border-gray-100"
                >
                  <div className="h-48 overflow-hidden">
                    <img src={other.image} alt={other.title[lang] || other.title.tr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[other.category] || 'bg-gray-100 text-gray-700'}`}>
                      {other.category}
                    </span>
                    <h3 className="font-bold text-gray-900 mt-4 text-lg leading-tight group-hover:text-brand-600 transition-colors line-clamp-2">
                      {other.title[lang] || other.title.tr}
                    </h3>
                    <div className="flex items-center gap-1 text-brand-600 text-sm font-bold mt-4">
                      {t('blog_read_more')} <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
