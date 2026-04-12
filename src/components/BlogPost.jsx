import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, Tag, ChevronRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import useSEO from '../hooks/useSEO';
import { useLanguage } from '../context/LanguageContext';
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildOrganizationSchema,
} from '../lib/geoSchemas';

const categoryLabels = {
  'SEO': { tr: 'SEO', en: 'SEO' },
  'Google Ads': { tr: 'Google Ads', en: 'Google Ads' },
  'Sosyal Medya': { tr: 'Sosyal Medya', en: 'Social Media' },
  'Dijital Pazarlama': { tr: 'Dijital Pazarlama', en: 'Digital Marketing' },
  'Web Tasarım': { tr: 'Web Tasarım', en: 'Web Design' },
};

// Inline bold/italic parser
const parseInline = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, j) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={j} className="text-ink-900 font-bold">{part.slice(2, -2)}</strong>
      : part
  );
};

const renderContent = (content) => {
  if (!content) return null;
  const lines = content.trim().split('\n');
  const result = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line.startsWith('|') && !line.includes('---')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        if (!lines[i].includes('---')) tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length > 0) {
        const rows = tableLines.map(r =>
          r.split('|').filter(c => c.trim() !== '').map(c => c.trim())
        );
        result.push(
          <div key={`tbl-${i}`} className="overflow-x-auto my-8">
            <table className="min-w-full divide-y divide-ink-100 border border-ink-100 rounded-xl overflow-hidden">
              <thead className="bg-ink-50">
                <tr>{rows[0].map((c, idx) => <th key={idx} className="px-6 py-4 text-left text-xs font-semibold text-ink-500 uppercase tracking-wider">{c}</th>)}</tr>
              </thead>
              <tbody className="bg-white divide-y divide-ink-100">
                {rows.slice(1).map((row, ri) => (
                  <tr key={ri} className="hover:bg-ink-50 transition-colors">
                    {row.map((c, ci) => <td key={ci} className="px-6 py-4 text-sm text-ink-600">{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    if (line.startsWith('#### ')) {
      result.push(<h4 key={i} className="text-lg font-bold text-ink-900 mt-5 mb-2">{line.slice(5)}</h4>);
    } else if (line.startsWith('### ')) {
      result.push(<h3 key={i} className="text-xl font-bold text-ink-800 mt-8 mb-3 border-l-4 border-ink-200 pl-4">{line.slice(4)}</h3>);
    } else if (line.startsWith('## ')) {
      result.push(<h2 key={i} className="text-2xl md:text-3xl font-bold text-ink-900 mt-12 mb-5">{line.slice(3)}</h2>);

    } else if (line.startsWith('> ')) {
      result.push(
        <blockquote key={i} className="border-l-4 border-ink-200 bg-ink-50 rounded-r-xl px-6 py-4 my-6 text-ink-600 italic">
          {parseInline(line.slice(2))}
        </blockquote>
      );

    } else if (line === '---') {
      result.push(<hr key={i} className="my-10 border-ink-100" />);

    } else if (line.startsWith('![')) {
      const m = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (m) {
        result.push(
          <figure key={i} className="my-10">
            <img
              src={m[2]}
              alt={m[1]}
              className="w-full rounded-xl object-cover max-h-80"
              loading="lazy"
            />
            {m[1] && <figcaption className="text-center text-sm text-ink-400 mt-3 italic">{m[1]}</figcaption>}
          </figure>
        );
      }

    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const items = [];
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        items.push(lines[i].trim().replace(/^[-*]\s/, ''));
        i++;
      }
      result.push(
        <ul key={`ul-${i}`} className="my-4 space-y-2 pl-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-ink-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-ink-400 flex-shrink-0" />
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;

    } else if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      result.push(
        <ol key={`ol-${i}`} className="my-4 space-y-3 pl-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-ink-600">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-ink-900 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {idx + 1}
              </span>
              <span className="pt-0.5">{parseInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;

    } else if (line.startsWith('`') && line.endsWith('`')) {
      result.push(<code key={i} className="block bg-ink-50 text-ink-700 px-4 py-2 rounded-lg text-sm font-mono my-3">{line.slice(1, -1)}</code>);

    } else if (line === '') {
      // skip empty

    } else if (line.startsWith('**') && line.endsWith('**') && line.indexOf('**', 2) === line.length - 2) {
      result.push(<p key={i} className="font-bold text-ink-800 my-3 text-lg">{line.slice(2, -2)}</p>);

    } else {
      result.push(
        <p key={i} className="text-ink-600 leading-relaxed mb-4">
          {line.includes('**') ? parseInline(line) : line}
        </p>
      );
    }

    i++;
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

  const canonicalUrl = `https://bccreative.agency/blog/${slug}`;

  const articleSchemas = post
    ? [
        buildArticleSchema({
          headline: postTitle,
          description: postExcerpt,
          image: post.image,
          url: canonicalUrl,
          datePublished: post.date.en || post.date.tr,
          articleBody: postContent,
          keywords: [
            'KKTC',
            post.category,
            'Kuzey Kibris',
            'dijital pazarlama',
          ],
        }),
        buildBreadcrumbSchema([
          { name: 'Ana Sayfa', url: 'https://bccreative.agency/' },
          { name: 'Blog',      url: 'https://bccreative.agency/blog' },
          { name: postTitle,   url: canonicalUrl },
        ]),
        buildOrganizationSchema(),
      ]
    : null;

  useSEO({
    title: post ? `${postTitle}` : 'Blog | BC Creative Agency',
    description: postExcerpt || "KKTC dijital pazarlama, SEO ve reklam rehberleri.",
    keywords: `KKTC ${post?.category}, Kuzey Kibris dijital pazarlama, ${postTitle}`,
    canonical: canonicalUrl,
    ogType: 'article',
    ogImage: post?.image,
    alternates: [
      { hreflang: 'tr', href: canonicalUrl },
      { hreflang: 'en', href: `https://bccreative.agency/en/blog/${slug}` }
    ],
    schemas: articleSchemas,
  });

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-ink-900 mb-4">{t('blog_not_found')}</h1>
          <button onClick={() => navigate('/blog')} className="text-brand-600 font-medium">
            &larr; {t('blog_back')}
          </button>
        </div>
      </div>
    );
  }

  const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-80 md:h-[480px] overflow-hidden pt-24">
        <img
          src={post.image}
          alt={post.imageAlt?.[lang] || post.imageAlt?.tr || postTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto max-w-4xl">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 bg-white text-ink-900 font-medium text-sm px-4 py-2 rounded-full mb-4 hover:bg-ink-50 transition-colors"
            >
              <ArrowLeft size={14} /> {t('blog_back')}
            </button>
            <span className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-3 bg-white/90 text-ink-700">
              {categoryLabels[post.category]?.[lang] || post.category}
            </span>
            <h1 className="text-3xl md:text-6xl font-bold text-white leading-[0.95] max-w-4xl tracking-tight">
              {postTitle}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-ink-400 mb-10 pb-8 border-b border-ink-100">
            <span className="flex items-center gap-1"><Clock size={14} /> {postReadTime} {t('blog_read_time')}</span>
            <span>&middot;</span>
            <span>{postDate}</span>
            <span>&middot;</span>
            <span className="flex items-center gap-1"><Tag size={14} /> {categoryLabels[post.category]?.[lang] || post.category}</span>
          </div>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-lg max-w-none text-lg leading-relaxed"
          >
            {renderContent(postContent)}
          </motion.div>

          {/* CTA */}
          <div className="mt-20 p-10 md:p-14 bg-ink-900 rounded-2xl text-center">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
              {t('blog_cta_title')}
            </h3>
            <p className="text-ink-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              {t('blog_cta_sub')}
            </p>
            <button
              onClick={() => window.open('https://wa.me/905488755461', '_blank')}
              className="bg-white text-ink-900 font-medium text-lg px-10 py-4 rounded-full hover:bg-ink-50 transition-colors"
            >
              {t('btn_offer')} &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Other Posts */}
      {otherPosts.length > 0 && (
        <section className="py-20 md:py-24 px-4 md:px-8 bg-ink-50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-ink-900 mb-10 tracking-tight">{t('blog_other_posts')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {otherPosts.map((other) => (
                <div
                  key={other.id}
                  onClick={() => navigate(`/blog/${other.slug}`)}
                  className="bg-white rounded-xl overflow-hidden border border-ink-100 cursor-pointer group hover:shadow-sm transition-all"
                >
                  <div className="h-44 overflow-hidden">
                    <img
                      src={other.image}
                      alt={other.imageAlt?.[lang] || other.imageAlt?.tr || other.title[lang] || other.title.tr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-ink-50 text-ink-600">
                      {other.category}
                    </span>
                    <h3 className="font-bold text-ink-900 mt-3 text-lg leading-tight group-hover:text-brand-600 transition-colors line-clamp-2">
                      {other.title[lang] || other.title.tr}
                    </h3>
                    <div className="flex items-center gap-1 text-brand-600 text-sm font-medium mt-4">
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
