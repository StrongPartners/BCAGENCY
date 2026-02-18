import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import SEO from './components/SEO';
import GoogleAds from './components/GoogleAds';
import SocialMedia from './components/SocialMedia';
import WebDesign from './components/WebDesign';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans antialiased text-gray-900 bg-white min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hizmetler/seo" element={<SEO />} />
        <Route path="/hizmetler/google-ads" element={<GoogleAds />} />
        <Route path="/hizmetler/sosyal-medya" element={<SocialMedia />} />
        <Route path="/hizmetler/web-tasarim" element={<WebDesign />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
