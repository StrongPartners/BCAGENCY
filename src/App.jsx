import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Contact from './components/Contact';
import SEO from './components/SEO';
import GoogleAds from './components/GoogleAds';
import SocialMedia from './components/SocialMedia';
import WebDesign from './components/WebDesign';
import Produksiyon from './components/Produksiyon';
import DroneCekim from './components/DroneCekim';
import FotografVideo from './components/FotografVideo';
import { LanguageProvider } from './context/LanguageContext';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
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
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
