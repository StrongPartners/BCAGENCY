import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { syncVoxelToRoute } from './components/hero/voxelBus';
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
const AppDevelopment = lazy(() => import('./components/AppDevelopment'));
const CrmSoftware = lazy(() => import('./components/CrmSoftware'));
const ReelsVideo = lazy(() => import('./components/ReelsVideo'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const NotFound = lazy(() => import('./components/NotFound'));
import Intro from './components/Intro';
import CubeLoader from './components/cubes/CubeLoader';
import CubeBurst from './components/cubes/CubeBurst';
import ScrollTopCube from './components/cubes/ScrollTopCube';
const VoxelWorld = lazy(() => import('./components/hero/VoxelWorld'));

// Sayfa değişince küp dünyasına hangi şekli göstereceğini söyler
const VoxelRouteSync = () => {
  const { pathname } = useLocation();
  useEffect(() => { syncVoxelToRoute(pathname); }, [pathname]);
  return null;
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <VoxelRouteSync />
        <Intro />
        <CubeBurst />
        <ScrollTopCube />
        <Suspense fallback={null}><VoxelWorld className="z-[5] pointer-events-none" /></Suspense>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><CubeLoader /></div>}>
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
                <Route path="/hizmetler/uygulama-gelistirme" element={<AppDevelopment />} />
                <Route path="/hizmetler/crm-yazilim" element={<CrmSoftware />} />
                <Route path="/hizmetler/reels-video-edit" element={<ReelsVideo />} />
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
