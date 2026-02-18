import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import useSEO from '../hooks/useSEO';
import ColorfulBlobs from './ColorfulBlobs';

const categoryColors = {
  'SEO': 'bg-blue-100 text-blue-700',
  'Google Ads': 'bg-yellow-100 text-yellow-700',
  'Sosyal Medya': 'bg-pink-100 text-pink-700',
  'Dijital Pazarlama': 'bg-purple-100 text-purple-700',
  'Web Tasarım': 'bg-green-100 text-green-700',
};

const Blog = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Blog | KKTC Dijital Pazarlama, SEO ve Reklam Rehberleri – BC Creative Agency',
    description: "KKTC'de dijital pazarlama, SEO, Google Ads, sosyal medya ve web tasarım hakkında uzman içerikler. Kuzey Kıbrıs işletmeleri için kapsamlı rehberler.",
    keywords: 'KKTC dijital pazarlama blog, Kuzey Kıbrıs SEO rehberi, KKTC Google Ads, Girne dijital ajans blog',
    canonical: 'https://bccreative.agency/blog',
    ogTitle: 'Blog | BC Creative Agency – KKTC Dijital Pazarlama Rehberleri',
    ogDescription: "KKTC işletmeleri için dijital pazarlama, SEO ve reklam rehberleri.",
    ogUrl: 'https://bccreative.agency/blog',
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ColorfulBlobs variant="hero" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-brand-600/10 text-brand-600 font-semibold text-sm px-4 py-2 rounded-full mb-4 tracking-wider uppercase">
              Blog
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              KKTC Dijital Pazarlama<br />
              <span className="text-brand-600">Rehberleri</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Kuzey Kıbrıs işletmeleri için SEO, Google Ads, sosyal medya ve web tasarım konularında uzman içerikler.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime} okuma
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-brand-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    Devamını Oku <ArrowRight size={16} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 bg-brand-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            KKTC'de Dijital Büyüme için<br />Hazır mısınız?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            BC Creative Agency olarak Girne ve tüm KKTC'deki işletmelere özel dijital pazarlama çözümleri sunuyoruz.
          </p>
          <button
            onClick={() => window.open('https://wa.me/905488755461', '_blank')}
            className="bg-white text-brand-600 font-black text-lg px-10 py-4 rounded-full hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-1"
          >
            Ücretsiz Teklif Al
          </button>
        </div>
      </section>
    </div>
  );
};

export default Blog;
