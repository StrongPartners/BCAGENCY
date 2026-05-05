import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import { LanguageProvider } from './context/LanguageContext';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

const About = lazy(() => import('./components/About'));
const Blog = lazy(() => import('./components/Blog'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const Contact = lazy(() => import('./components/Contact'));
const SEO = lazy(() => import('./components/SEO'));
const GoogleAds = lazy(() => import('./components/GoogleAds'));
const SocialMedia = lazy(() => import('./components/SocialMedia'));
const WebDesign = lazy(() => import('./components/WebDesign'));
const Produksiyon = lazy(() => import('./components/Produksiyon'));
const DroneCekim = lazy(() => import('./components/DroneCekim'));
const FotografVideo = lazy(() => import('./components/FotografVideo'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Suspense fallback={<div className="min-h-screen" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/hizmetler/seo" element={<SEO />} />
                <Route path="/hizmetler/google-ads" element={<GoogleAds />} />
                <Route path="/hizmetler/sosyal-medya" element={<SocialMedia />} />
                <Route path="/hizmetler/web-tasarim" element={<WebDesign />} />
                <Route path="/hizmetler/produksiyon" element={<Produksiyon />} />
                <Route path="/hizmetler/drone-cekim" element={<DroneCekim />} />
                <Route path="/hizmetler/fotograf-video" element={<FotografVideo />} />
                <Route path="/gizlilik-politikasi" element={<PrivacyPolicy />} />
                <Route path="/kullanim-sartlari" element={<TermsOfService />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
