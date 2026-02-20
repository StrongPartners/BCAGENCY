import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  tr: {
    // Header
    nav_home: 'Ana Sayfa',
    nav_about: 'Hakkımızda',
    nav_blog: 'Blog',
    nav_services: 'Hizmetlerimiz',
    nav_seo: 'Arama Motoru Optimizasyonu',
    nav_social: 'Sosyal Medya Yönetimi',
    nav_ads: 'Google Ads Yönetimi',
    nav_web: 'Web Tasarım',
    btn_offer: 'Teklif Al',
    btn_whatsapp: 'WhatsApp İle Ulaş',

    // Hero
    hero_badge: 'KKTC\'nin #1 Dijital Ajansı',
    hero_title_1: 'Dijital Dünyada',
    hero_title_2: 'Fark Yaratın',
    hero_desc: 'BC Creative Agency olarak Kuzey Kıbrıs\'taki işletmenizi Google\'da üst sıralara taşıyor, sosyal medyada büyütüyor ve dijital reklamlarla müşteri akışınızı artırıyoruz.',
    hero_cta: 'Çalışmaya Başlayalım',
    hero_stats_clients: 'Mutlu Müşteri',
    hero_stats_projects: 'Tamamlanan Proje',
    hero_stats_experience: 'Yıllık Deneyim',
    hero_stats_results: 'Garantili Sonuç',

    // Services
    services_title: 'Hizmetlerimiz',
    services_subtitle: 'KKTC\'de işletmenizi büyütmek için ihtiyacınız olan her şey',

    // FAQ
    faq_title: 'Sıkça Sorulan Sorular',
    faq_subtitle: 'Merak ettiğiniz her şey burada',

    // Contact
    contact_title: 'İletişime Geçin',
    contact_cta: 'Bize Ulaşın',

    // Footer
    footer_rights: 'Tüm hakları saklıdır.',
    footer_services: 'Hizmetler',
    footer_contact: 'İletişim',
  },
  en: {
    // Header
    nav_home: 'Home',
    nav_about: 'About',
    nav_blog: 'Blog',
    nav_services: 'Services',
    nav_seo: 'Search Engine Optimization',
    nav_social: 'Social Media Management',
    nav_ads: 'Google Ads Management',
    nav_web: 'Web Design',
    btn_offer: 'Get a Quote',
    btn_whatsapp: 'Contact via WhatsApp',

    // Hero
    hero_badge: 'TRNC\'s #1 Digital Agency',
    hero_title_1: 'Stand Out in the',
    hero_title_2: 'Digital World',
    hero_desc: 'BC Creative Agency helps businesses in Northern Cyprus rank higher on Google, grow on social media, and increase customer flow with digital ads.',
    hero_cta: 'Let\'s Get Started',
    hero_stats_clients: 'Happy Clients',
    hero_stats_projects: 'Projects Completed',
    hero_stats_experience: 'Years of Experience',
    hero_stats_results: 'Guaranteed Results',

    // Services
    services_title: 'Our Services',
    services_subtitle: 'Everything you need to grow your business in TRNC',

    // FAQ
    faq_title: 'Frequently Asked Questions',
    faq_subtitle: 'Everything you need to know',

    // Contact
    contact_title: 'Get in Touch',
    contact_cta: 'Contact Us',

    // Footer
    footer_rights: 'All rights reserved.',
    footer_services: 'Services',
    footer_contact: 'Contact',
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('tr');

  const t = (key) => translations[lang][key] || key;

  const toggleLang = () => setLang(prev => prev === 'tr' ? 'en' : 'tr');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
