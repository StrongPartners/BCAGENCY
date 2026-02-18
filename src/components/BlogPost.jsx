import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, Tag, ChevronRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import useSEO from '../hooks/useSEO';

const categoryColors = {
  'SEO': 'bg-blue-100 text-blue-700',
  'Google Ads': 'bg-yellow-100 text-yellow-700',
  'Sosyal Medya': 'bg-pink-100 text-pink-700',
  'Dijital Pazarlama': 'bg-purple-100 text-purple-700',
  'Web Tasarım': 'bg-green-100 text-green-700',
};

// Markdown'u basit HTML'e çevir
const renderContent = (content) => {
  return content
    .trim()
    .split('\n')
    .map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-4">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-bold text-gray-800 mt-6 mb-3">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-gray-800 my-2">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="text-gray-600 ml-4 mb-1 list-disc">{line.replace('- ', '')}</li>;
      }
      if (line.startsWith('`') && line.endsWith('`')) {
        return <code key={i} className="block bg-gray-100 text-brand-600 px-4 py-2 rounded-lg text-sm font-mono my-3">{line.replace(/`/g, '')}</code>;
      }
      if (line.trim() === '') {
        return <br key={i} />;
      }
      // Bold içeren normal satır
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={i} className="text-gray-600 leading-relaxed mb-3">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-gray-800">{part}</strong> : part)}
          </p>
        );
      }
      return <p key={i} className="text-gray-600 leading-relaxed mb-3">{line}</p>;
    });
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  useSEO({
    title: post ? `${post.title} | BC Creative Agency Blog` : 'Blog | BC Creative Agency',
    description: post?.excerpt || "KKTC dijital pazarlama, SEO ve reklam rehberleri.",
    keywords: `KKTC ${post?.category}, Kuzey Kıbrıs dijital pazarlama, ${post?.title}`,
    canonical: `https://bccreative.agency/blog/${slug}`,
    ogTitle: post?.title,
    ogDescription: post?.excerpt,
    ogUrl: `https://bccreative.agency/blog/${slug}`,
  });

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Yazı Bulunamadı</h1>
          <button onClick={() => navigate('/blog')} className="text-brand-600 font-semibold">
            ← Blog'a Dön
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
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto">
            <button
              onClick={() => navigate('/blog')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 text-sm"
            >
              <ArrowLeft size={16} /> Blog'a Dön
            </button>
            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
              {post.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight max-w-3xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Meta */}
          <div className="flex items-center gap-6 text-sm text-gray-400 mb-10 pb-8 border-b border-gray-100">
            <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime} okuma</span>
            <span>{post.date}</span>
            <span className="flex items-center gap-1"><Tag size={14} /> {post.category}</span>
          </div>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose max-w-none"
          >
            {renderContent(post.content)}
          </motion.div>

          {/* CTA */}
          <div className="mt-16 p-8 bg-brand-600 rounded-3xl text-center">
            <h3 className="text-2xl font-black text-white mb-3">
              KKTC'de Dijital Büyüme için Hazır mısınız?
            </h3>
            <p className="text-white/80 mb-6">
              BC Creative Agency olarak Girne ve tüm KKTC'deki işletmelere özel çözümler sunuyoruz.
            </p>
            <button
              onClick={() => window.open('https://wa.me/905488755461', '_blank')}
              className="bg-white text-brand-600 font-black px-8 py-3 rounded-full hover:bg-gray-100 transition-all"
            >
              Ücretsiz Teklif Al →
            </button>
          </div>
        </div>
      </div>

      {/* Other Posts */}
      {otherPosts.length > 0 && (
        <section className="py-16 px-4 md:px-8 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-2xl font-black text-gray-900 mb-8">Diğer Yazılar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherPosts.map(other => (
                <div
                  key={other.id}
                  onClick={() => navigate(`/blog/${other.slug}`)}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1"
                >
                  <div className="h-40 overflow-hidden">
                    <img src={other.image} alt={other.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${categoryColors[other.category] || 'bg-gray-100 text-gray-700'}`}>
                      {other.category}
                    </span>
                    <h3 className="font-bold text-gray-900 mt-2 text-sm leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                      {other.title}
                    </h3>
                    <div className="flex items-center gap-1 text-brand-600 text-xs font-semibold mt-3">
                      Oku <ChevronRight size={12} />
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
