import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  tr: {
    // Header nav
    nav_home: 'Ana Sayfa',
    nav_about: 'Hakkımızda',
    nav_blog: 'Blog',
    nav_services: 'Hizmetlerimiz',
    nav_contact: 'İletişim',
    nav_seo: 'SEO',
    nav_social: 'Sosyal Medya',
    nav_ads: 'Google Ads',
    nav_web: 'Web Tasarım',
    nav_production: 'Prodüksiyon',
    nav_drone: 'Drone Çekim',
    nav_photo: 'Fotoğraf & Video',
    btn_offer: 'Bir kahve içelim',
    btn_whatsapp: "WhatsApp'tan yaz",
    btn_talk: 'Hadi konuşalım',
    btn_start: 'Başlayalım',

    // Hero
    hero_greet: 'Merhaba, biz BC.',
    hero_headline_1: 'Fikirleri',
    hero_headline_accent: 'görünür',
    hero_headline_2: 'kılan ekip.',
    hero_desc: "KKTC'nin yaratıcı motoruyuz. SEO, reklam, sosyal medya, prodüksiyon — ne ihtiyacınız varsa Girne'deki stüdyomuzda pişiriyoruz. 2017'den beri, gülümseyerek.",
    hero_cta: 'Bir kahve içelim',
    hero_cta_secondary: 'Ne yapıyoruz?',
    hero_rotating: ['SEO', 'Sosyal Medya', 'Google Ads', 'Web Tasarım', 'Prodüksiyon'],

    // Service Banner (marquee)
    banner_services: ['Web Tasarım', 'Sosyal Medya', 'Google Ads', 'Meta Ads', 'Grafik Tasarım', 'İçerik Üretimi', 'Prodüksiyon', 'Drone Çekim', 'Fotoğraf & Video', 'SEO', 'Marka Danışmanlığı'],

    // Services section
    services_eyebrow: 'Neler yapıyoruz',
    services_heading_1: 'Birlikte',
    services_heading_2: 'güzel şeyler yapalım.',
    services_sub: "Markanız için tam olarak ne lazımsa — biz onu yapıyoruz. Hepsi tek çatı altında, hepsi ölçülebilir, hepsi biraz eğlenceli.",
    services_see_details: 'Detayları gör →',
    services_list: [
      { icon: '', title: 'SEO', description: 'Google aramalarında ilk sıralara çıkıyorsunuz. Hem de organik, hem de kalıcı.', path: '/hizmetler/seo', tone: 'brand' },
      { icon: '', title: 'Google Ads', description: 'Reklamı açıyorsunuz, telefonu açıyorsunuz. Bütçenizin her kuruşu işine yarıyor.', path: '/hizmetler/google-ads', tone: 'coral' },
      { icon: '', title: 'Sosyal Medya', description: 'Instagram, Facebook, TikTok — marka sesiniz her platformda aynı sıcaklıkta.', path: '/hizmetler/sosyal-medya', tone: 'mint' },
      { icon: '', title: 'Web Tasarım', description: 'Hızlı, modern, akıllı telefonda çakılmayan web siteleri. Üstelik SEO ile doğuyor.', path: '/hizmetler/web-tasarim', tone: 'sun' },
      { icon: '', title: 'Prodüksiyon', description: 'Senaryodan post prodüksiyona kadar reklam filmleri ve kurumsal videolar.', path: '/hizmetler/produksiyon', tone: 'brand' },
      { icon: '', title: 'Drone Çekim', description: "KKTC'nin en güzel açılarını havadan yakalıyoruz. Turizm, emlak, etkinlik.", path: '/hizmetler/drone-cekim', tone: 'coral' },
      { icon: '', title: 'Fotoğraf & Video', description: 'Ürün, etkinlik, kurumsal — profesyonel çekim, sosyal medyaya hazır içerik.', path: '/hizmetler/fotograf-video', tone: 'mint' },
    ],

    // Approach (replaces WhyChooseUs)
    approach_eyebrow: 'Nasıl çalışıyoruz',
    approach_heading_1: 'Karmaşık değil,',
    approach_heading_2: 'sadece iyi iş.',
    approach_sub: 'Süreci basit tutuyoruz — öğreniyoruz, tasarlıyoruz, üretiyoruz, ölçüyoruz. Tekrarlıyoruz.',
    approach_steps: [
      { number: '01', title: 'Dinle', desc: "Önce markanızı, hedeflerinizi ve müşterinizi anlıyoruz. Bol kahve eşliğinde.", tone: 'brand' },
      { number: '02', title: 'Tasarla', desc: 'Veriye ve yaratıcılığa dayalı bir strateji çıkarıyoruz. Kısa, net, ölçülebilir.', tone: 'coral' },
      { number: '03', title: 'Üret', desc: 'Reklamlar, içerikler, siteler — hepsi ekibimizin elinden çıkıyor. Outsource yok.', tone: 'mint' },
      { number: '04', title: 'Ölç', desc: 'Her ay ne olduğunu, neyin işe yaradığını gösteren şeffaf raporlar paylaşıyoruz.', tone: 'sun' },
    ],

    // Stats (new section)
    stats_heading: 'Rakamlarla BC',
    stats: [
      { value: '8+', label: 'Yılı deviriyoruz' },
      { value: '50+', label: 'Mutlu marka' },
      { value: '2M+', label: 'Yönetilen reklam bütçesi' },
      { value: '∞', label: 'Kahve' },
    ],

    // FAQ
    faq_label: 'SSS',
    faq_title: 'Sık sorulanlar',
    faq_subtitle: 'Aklınızdakiler, burada cevabı.',
    faq_no_answer: 'Cevabı burada yok mu?',
    faq_whatsapp: "WhatsApp'tan sor",

    // Footer
    footer_tagline: 'Fikirleri görünür kılıyoruz.',
    footer_desc: "BC Creative Agency — KKTC Girne merkezli yaratıcı dijital pazarlama ajansı. 2017'den beri markalarla büyüyoruz.",
    footer_contact_title: 'Bize ulaş',
    footer_address_title: 'Bizi bul',
    footer_address: 'Alsancak, Emtan West Park No:4, Girne, KKTC',
    footer_social: 'Takip et',
    footer_instagram: "Instagram'dayız",
    footer_services_title: 'Neler yapıyoruz',
    footer_nav_title: 'Gezin',
    footer_rights: 'Tüm hakları saklıdır.',
    footer_made_with: 'Girne\'de sevgiyle yapıldı',

    // About
    about_eyebrow: 'Hakkımızda',
    about_hero_title_1: 'Biz',
    about_hero_title_accent: 'BC',
    about_hero_title_2: "ve markaların yanındayız.",
    about_hero_desc: "2017'den beri KKTC'de dijital pazarlama yapıyoruz. Küçük bir stüdyoyla başladık, bugün 50+ markanın yanındayız. Formülümüz basit: iyi fikir + iyi veri + iyi iş ahlakı.",
    about_story_title: 'Hikayemiz',
    about_story_p1: "Girne'de küçük bir ofiste, bol kahve ve bir projektörle başladık. O zamanlar KKTC'de dijital pazarlama ajansı parmakla sayılacak kadar azdı. Biz farklı bir şey yapmak istedik: samimi, ölçülebilir ve gerçekten işe yarayan dijital iş.",
    about_story_p2: "Bugün aynı stüdyoda devam ediyoruz — biraz büyüdük, biraz daha ciddileştik ama hâlâ her projeye ilk gün heyecanıyla yaklaşıyoruz. İşin sırrı orada.",
    about_values_title: 'Değerlerimiz',
    about_values_sub: 'Çalışma şeklimizi belirleyen dört şey:',
    about_values: [
      { icon: '', title: 'Şeffaflık', desc: 'Ne yapıyoruz, neden yapıyoruz — her ay rakamlarla anlatıyoruz. Sürpriz yok.' },
      { icon: '', title: 'Gerçek ilgi', desc: 'Her müşterimize sanki kendi markamızmış gibi ilgi gösteriyoruz. Klişe değil, politika.' },
      { icon: '', title: 'Hız', desc: "WhatsApp mesajlarınıza ortalama 15 dakikada dönüyoruz. Çünkü biz de bekleyen olmayı sevmiyoruz." },
      { icon: '', title: 'Sonuç odaklılık', desc: 'İş iyi oldu demek yetmez. Ölçüyoruz, raporluyoruz, sonraki adımı planlıyoruz.' },
    ],
    about_services_title: 'Neler yaptığımız ',
    about_services_title_accent: 'listesi',
    about_services_sub: 'Tek çatı altında tüm dijital pazarlama ihtiyaçlarınız.',
    about_services: [
      { icon: '', title: 'SEO', description: 'Google aramalarında ilk sayfa hedefi.' },
      { icon: '', title: 'Google Ads', description: 'Performans odaklı reklam yönetimi.' },
      { icon: '', title: 'Sosyal Medya', description: 'Instagram, Facebook, TikTok stratejisi ve içerik.' },
      { icon: '', title: 'Web Tasarım', description: 'Hızlı, modern, SEO-dostu web siteleri.' },
      { icon: '', title: 'Prodüksiyon', description: 'Reklam filmi, kurumsal video, viral içerik.' },
      { icon: '', title: 'Drone Çekim', description: 'Havadan profesyonel çekim.' },
      { icon: '', title: 'Fotoğraf & Video', description: 'Ürün, etkinlik, kurumsal çekim.' },
      { icon: '', title: 'Grafik Tasarım', description: 'Logo, kurumsal kimlik, kampanya grafikleri.' },
      { icon: '', title: 'İçerik', description: 'Metin yazımı, copywriting, blog içerikleri.' },
    ],

    // Contact
    contact_eyebrow: 'İletişim',
    contact_heading_1: 'Hadi',
    contact_heading_accent: 'konuşalım.',
    contact_heading_2: "Bir fikriniz mi var?",
    contact_sub: "Bir projeniz, bir fikriniz ya da sadece bir sorunuz olabilir — WhatsApp'a yazın, ortalama 15 dakikada döneriz. Söz.",
    contact_address_label: 'Adres',
    contact_address_val: 'Alsancak, Emtan West Park No:4, Girne, KKTC',
    contact_phone_label: 'Telefon / WhatsApp',
    contact_email_label: 'E-posta',
    contact_hours_label: 'Çalışma Saatleri',
    contact_hours_val: 'Pazartesi – Cuma: 09:00 – 18:00',
    contact_maps_btn: "Google Maps'te aç →",
    contact_map_title: 'BC Creative Agency – Girne KKTC',
    contact_map_url: 'https://www.google.com/maps/search/Alsancak+Emtan+West+Park+Girne+Kuzey+K%C4%B1br%C4%B1s',
    contact_response_title: 'Ortalama yanıt süresi',
    contact_response_desc: "Çalışma saatlerinde WhatsApp mesajlarınıza 15 dakikada dönüyoruz. WhatsApp'a 7/24 yazabilirsiniz.",
    contact_response_btn: "WhatsApp'ı aç",

    // Blog
    blog_badge: 'Blog',
    blog_heading_1: 'Yazmayı da',
    blog_heading_accent: 'seviyoruz.',
    blog_heading_2: '',
    blog_sub: 'KKTC işletmeleri için SEO, Google Ads, sosyal medya ve web tasarım üzerine samimi rehberler.',
    blog_read_more: 'Oku →',
    blog_read_time: 'okuma',
    blog_back: "Blog'a dön",
    blog_other_posts: 'Diğer yazılar',
    blog_cta_title: 'KKTC\'de büyümeye hazır mısınız?',
    blog_cta_sub: 'Girne ve tüm KKTC\'deki işletmelere özel dijital pazarlama çözümleri.',
    blog_not_found: 'Yazı bulunamadı',
  },

  en: {
    // Header nav
    nav_home: 'Home',
    nav_about: 'About',
    nav_blog: 'Blog',
    nav_services: 'Services',
    nav_contact: 'Contact',
    nav_seo: 'SEO',
    nav_social: 'Social Media',
    nav_ads: 'Google Ads',
    nav_web: 'Web Design',
    nav_production: 'Production',
    nav_drone: 'Drone',
    nav_photo: 'Photo & Video',
    btn_offer: "Let's grab a coffee",
    btn_whatsapp: 'Message on WhatsApp',
    btn_talk: "Let's talk",
    btn_start: "Let's start",

    // Hero
    hero_greet: "Hi, we're BC.",
    hero_headline_1: 'We make',
    hero_headline_accent: 'ideas',
    hero_headline_2: 'visible.',
    hero_desc: "We're the creative engine of Northern Cyprus (TRNC). SEO, ads, social, production — whatever you need, we cook it up in our Kyrenia studio. Since 2017, with a smile.",
    hero_cta: "Let's grab a coffee",
    hero_cta_secondary: 'What we do',
    hero_rotating: ['SEO', 'Social', 'Ads', 'Web', 'Production'],

    // Service Banner (marquee)
    banner_services: ['Web Design', 'Social Media', 'Google Ads', 'Meta Ads', 'Graphic Design', 'Content', 'Production', 'Drone', 'Photo & Video', 'SEO', 'Brand Strategy'],

    // Services
    services_eyebrow: 'What we do',
    services_heading_1: "Let's make",
    services_heading_2: 'beautiful things together.',
    services_sub: "Whatever your brand needs — we do it. All under one roof, all measurable, all a little fun.",
    services_see_details: 'See details →',
    services_list: [
      { icon: '', title: 'SEO', description: "Rank on the first page of Google. Organic and built to last.", path: '/hizmetler/seo', tone: 'brand' },
      { icon: '', title: 'Google Ads', description: 'Flip the ad switch, the phone rings. Every cent of your budget earns its keep.', path: '/hizmetler/google-ads', tone: 'coral' },
      { icon: '', title: 'Social Media', description: 'Instagram, Facebook, TikTok — your brand voice, same warmth on every platform.', path: '/hizmetler/sosyal-medya', tone: 'mint' },
      { icon: '', title: 'Web Design', description: 'Fast, modern, mobile-friendly sites. Born with SEO baked in.', path: '/hizmetler/web-tasarim', tone: 'sun' },
      { icon: '', title: 'Production', description: 'Ad films and corporate video, from script to post.', path: '/hizmetler/produksiyon', tone: 'brand' },
      { icon: '', title: 'Drone', description: "We capture the best angles of Northern Cyprus from above. Tourism, real estate, events.", path: '/hizmetler/drone-cekim', tone: 'coral' },
      { icon: '', title: 'Photo & Video', description: 'Product, event, corporate — professional shoots, social-ready output.', path: '/hizmetler/fotograf-video', tone: 'mint' },
    ],

    // Approach
    approach_eyebrow: 'How we work',
    approach_heading_1: 'Not complicated,',
    approach_heading_2: 'just good work.',
    approach_sub: 'We keep the process simple — listen, design, make, measure. Rinse and repeat.',
    approach_steps: [
      { number: '01', title: 'Listen', desc: "First we understand your brand, your goals, your customer. Over plenty of coffee.", tone: 'brand' },
      { number: '02', title: 'Design', desc: 'We build a strategy on data and creativity. Short, clear, measurable.', tone: 'coral' },
      { number: '03', title: 'Make', desc: "Ads, content, sites — all built in-house by our team. No outsourcing.", tone: 'mint' },
      { number: '04', title: 'Measure', desc: 'Every month we share transparent reports showing what worked and what\'s next.', tone: 'sun' },
    ],

    // Stats
    stats_heading: 'BC in numbers',
    stats: [
      { value: '8+', label: 'Years in the game' },
      { value: '50+', label: 'Happy brands' },
      { value: '2M+', label: 'Ad spend managed' },
      { value: '∞', label: 'Coffee' },
    ],

    // FAQ
    faq_label: 'FAQ',
    faq_title: 'Frequently asked',
    faq_subtitle: 'The things you probably want to know.',
    faq_no_answer: "Can't find your answer?",
    faq_whatsapp: 'Message us',

    // Footer
    footer_tagline: 'Making ideas visible.',
    footer_desc: "BC Creative Agency — a creative digital marketing studio based in Kyrenia, TRNC. Growing with brands since 2017.",
    footer_contact_title: 'Get in touch',
    footer_address_title: 'Find us',
    footer_address: 'Alsancak, Emtan West Park No:4, Kyrenia, TRNC',
    footer_social: 'Follow',
    footer_instagram: "We're on Instagram",
    footer_services_title: 'What we do',
    footer_nav_title: 'Explore',
    footer_rights: 'All rights reserved.',
    footer_made_with: 'Made with love in Kyrenia',

    // About
    about_eyebrow: 'About us',
    about_hero_title_1: "We're",
    about_hero_title_accent: 'BC',
    about_hero_title_2: 'and we stand beside brands.',
    about_hero_desc: "We've been doing digital marketing in Northern Cyprus since 2017. Started as a small studio, today we work with 50+ brands. Our formula is simple: good ideas + good data + good ethics.",
    about_story_title: 'Our story',
    about_story_p1: "We started in a small Kyrenia office with lots of coffee and a projector. Back then, you could count digital agencies in TRNC on one hand. We wanted to do something different: warm, measurable and genuinely useful digital work.",
    about_story_p2: "We're still in the same studio today — a bit bigger, a bit more serious, but we still approach every project with day-one excitement. That's the secret.",
    about_values_title: 'Our values',
    about_values_sub: 'Four things that shape how we work:',
    about_values: [
      { icon: '', title: 'Transparency', desc: 'What we do, why we do it — every month, in numbers. No surprises.' },
      { icon: '', title: 'Real care', desc: 'We treat every client as if it were our own brand. It\'s not a cliché, it\'s policy.' },
      { icon: '', title: 'Speed', desc: 'We answer WhatsApp messages in an average of 15 minutes. Because we hate waiting too.' },
      { icon: '', title: 'Results', desc: "It\'s not enough to say the work was good. We measure, report, plan the next step." },
    ],
    about_services_title: 'The ',
    about_services_title_accent: "what-we-do",
    about_services_sub: 'All your digital marketing needs, under one roof.',
    about_services: [
      { icon: '', title: 'SEO', description: 'First-page Google ranking as the goal.' },
      { icon: '', title: 'Google Ads', description: 'Performance-focused ad management.' },
      { icon: '', title: 'Social Media', description: 'Instagram, Facebook, TikTok strategy & content.' },
      { icon: '', title: 'Web Design', description: 'Fast, modern, SEO-friendly websites.' },
      { icon: '', title: 'Production', description: 'Ad films, corporate videos, viral content.' },
      { icon: '', title: 'Drone', description: 'Professional aerial shooting.' },
      { icon: '', title: 'Photo & Video', description: 'Product, event, corporate photography.' },
      { icon: '', title: 'Graphic Design', description: 'Logos, brand identity, campaign graphics.' },
      { icon: '', title: 'Content', description: 'Copywriting and blog articles.' },
    ],

    // Contact
    contact_eyebrow: 'Contact',
    contact_heading_1: "Let's",
    contact_heading_accent: 'talk.',
    contact_heading_2: 'Got an idea?',
    contact_sub: "A project, an idea or just a question — send a WhatsApp, we'll reply in about 15 minutes. Promise.",
    contact_address_label: 'Address',
    contact_address_val: 'Alsancak, Emtan West Park No:4, Kyrenia, TRNC',
    contact_phone_label: 'Phone / WhatsApp',
    contact_email_label: 'Email',
    contact_hours_label: 'Working hours',
    contact_hours_val: 'Monday – Friday: 09:00 – 18:00',
    contact_maps_btn: 'Open in Google Maps →',
    contact_map_title: 'BC Creative Agency – Kyrenia TRNC',
    contact_map_url: 'https://www.google.com/maps/search/Alsancak+Emtan+West+Park+Girne+Kuzey+K%C4%B1br%C4%B1s',
    contact_response_title: 'Average response time',
    contact_response_desc: "During business hours we reply to WhatsApp messages within 15 minutes. You can message us 24/7.",
    contact_response_btn: 'Open WhatsApp',

    // Blog
    blog_badge: 'Blog',
    blog_heading_1: 'We also love',
    blog_heading_accent: 'writing.',
    blog_heading_2: '',
    blog_sub: 'Friendly guides on SEO, Google Ads, social media and web design for TRNC businesses.',
    blog_read_more: 'Read →',
    blog_read_time: 'read',
    blog_back: 'Back to blog',
    blog_other_posts: 'Other posts',
    blog_cta_title: 'Ready to grow in TRNC?',
    blog_cta_sub: "We offer tailored digital marketing solutions for businesses in Kyrenia and across TRNC.",
    blog_not_found: 'Post not found',
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('tr');

  const t = (key) => {
    const val = translations[lang]?.[key];
    return val !== undefined ? val : key;
  };

  const toggleLang = () => setLang(prev => prev === 'tr' ? 'en' : 'tr');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
