import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  tr: {
    // Header nav
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
    hero_top: 'Sizlere',
    hero_bottom: 'konusunda nasıl yardımcı olabiliriz?',
    hero_desc: 'BC Creative Agency, dijital pazarlama alanında markalara ölçülebilir büyüme sağlayan bir performans ajansıdır. Reklam, sosyal medya ve strateji süreçlerini tek merkezden yönetir, harcadığınız bütçeyi gerçek sonuçlara dönüştürürüz.',
    hero_cta: 'Çalışmaya Başlayalım',
    hero_titles: ['Google Ads Yönetimi', 'Sosyal Medya Yönetimi', 'Web Tasarım', 'Arama Motoru Optimizasyonu'],

    // Service Banner
    banner_services: ['#Web Tasarım', '#Sosyal Medya Yönetimi', '#Google Ads Yönetimi', '#Meta Ads Yönetimi', '#Grafik Tasarım', '#İçerik Üretimi'],

    // Services section
    services_heading_1: 'Sunduğumuz',
    services_heading_2: 'Hizmetler',
    services_see_details: 'Detayları Gör',
    services_list: [
      { title: 'Arama Motoru Optimizasyonu', description: 'İnternet sitenizi arama sonuçlarında en üst sıralara çıkaralım.' },
      { title: 'Google Ads Yönetimi', description: 'Reklamlarınızı gelişmiş hedefleme ve bütçe optimizasyonu ile yayınlayalım.' },
      { title: 'Sosyal Medya Yönetimi', description: 'Sosyal Medya Hesaplarınızı daha geniş kitlelere, profesyonel çalışmalarla ulaştıralım.' },
      { title: 'Web Tasarım', description: 'Markanızı dijital dünyada en iyi yansıtacak modern ve kullanıcı dostu web siteleri tasarlayalım.' }
    ],

    // Why Choose Us
    why_heading: 'Neden Bizi',
    why_heading_2: 'Tercih Etmelisiniz?',
    why_features: [
      { icon: '🚀', title: 'Sonuç Odaklı Deneyim', description: 'Sadece iş yapmayız, sonuç üretiriz. Reklam, e-ticaret ve dijital pazarlamada edindiğimiz tecrübeyi ölçülebilir büyümeye dönüştürürüz.' },
      { icon: '📊', title: 'Strateji + Performans', description: 'Her markaya aynı yolu çizmeyiz. Veriye dayalı strateji kurar, reklam ve sosyal medyayı performans hedefleriyle yönetiriz.' },
      { icon: '🤝', title: 'Gerçek İş Ortağı', description: 'Biz sadece ajans değil, büyüme partneriyiz. Sürecin her adımında ulaşılabilir, şeffaf ve çözüm odaklı çalışırız.' }
    ],

    // FAQ
    faq_label: 'SSS',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_subtitle: 'Merak ettiğiniz her şey burada',
    faq_no_answer: 'Cevabını bulamadığınız bir soru mu var?',
    faq_whatsapp: "WhatsApp'tan Sor",

    // Footer
    footer_desc: 'BC Creative Agency, dijital pazarlama ve reklam alanında öncü bir ajansdır. Yaratıcı yaklaşımı ve uzman ekibiyle markanızı dijital dünyada öne çıkarmak için en etkili stratejileri sunar.',
    footer_contact_title: 'Bize Ulaşın',
    footer_address_title: 'Adres',
    footer_address: 'Kıbrıs / Girne',
    footer_social: 'Sosyal Medya',
    footer_instagram: "Instagram'da takip edin",

    // About
    about_action_words: ['Büyütüyoruz!', 'Geliştiriyoruz!', 'Tanıtıyoruz!', 'Hızlandırıyoruz!'],
    about_hero_prefix: 'Markanızı',
    about_hero_desc: 'BC Creative Agency olarak, dijital dünyada markanızın sesini en gür şekilde duyurmak için tecrübe ve yaratıcılığımızı birleştiriyoruz.',
    about_who_title: 'Biz Kimiz',
    about_who_p1: 'BC Creative Agency olarak, teknoloji ve veriyi yaratıcılıkla harmanlayan yeni nesil bir dijital performans ajansıyız.',
    about_who_p2: 'İş ortaklarımızın dijital dönüşüm yolculuklarında yanlarında yer alarak, sadece reklam yönetimi değil, ölçülebilir büyüme stratejileri geliştiriyoruz.',
    about_what_title: 'Neler',
    about_what_title2: 'Yapıyoruz?',
    about_services: [
      { title: 'Dijital Strateji', description: 'Markanız için özel olarak tasarlanmış dijital stratejiler geliştiriyoruz.' },
      { title: 'Sosyal Medya Yönetimi', description: 'Sosyal medya hesaplarınızı profesyonel bir şekilde yönetiyor ve içerik üretiyoruz.' },
      { title: 'Google Ads', description: 'Google reklamlarınızı optimize ederek en yüksek dönüşüm oranını sağlıyoruz.' },
      { title: 'SEO', description: 'Web sitenizin arama motorlarında üst sıralarda yer almasını sağlıyoruz.' },
      { title: 'Web Tasarım', description: 'Modern ve kullanıcı dostu web siteleri tasarlıyoruz.' },
      { title: 'İçerik Üretimi', description: 'Markanıza özel, etkileyici ve özgün içerikler üretiyoruz.' }
    ],
    about_vision_title: 'Vizyonumuz',
    about_vision_desc: 'Dijital pazarlama alanında öncü olmak ve müşterilerimize sürdürülebilir büyüme ve rekabet avantajı sağlamak için ileri düzey stratejiler geliştiren bir ajansız. Her geçen gün daha fazla marka ve işletme için değer yaratmayı sürdürüyoruz.',
    about_vision_items: [
      'Müşterilerimizin dijital varlıklarını en üst düzeye çıkarmak ve pazarlama hedeflerini aşmalarına yardımcı olmak.',
      'Müşterilerimizle uzun vadeli iş ilişkileri kurarak sürdürülebilir büyüme sağlamak.',
      'Dijital pazarlama alanında yenilikçi çözümler ve stratejiler geliştirmek ve müşterilerimize en son trendleri sunmak.',
      'İş ahlakı ve şeffaflık prensiplerine sıkı sıkıya bağlı kalarak müşterilerimize güven vermek.'
    ],
    about_vision_footer: 'Bu misyon, vizyon, değerler ve amaçlar, müşterilere ve iş ortaklarına ajansın neyi temsil ettiğini ve neye odaklandığını açıkça ifade eder.',
    about_mission_title: 'Misyonumuz',
    about_mission_desc: 'Müşterilerimize dijital dünyada başarılı olmaları için güç katmayı amaçlıyoruz. Dijital pazarlama alanındaki derin uzmanlığımızı ve yaratıcı yaklaşımlarımızı kullanarak, markaların hedeflerini aşmalarına yardımcı oluyoruz.',
    about_mission_items: [
      { title: 'Müşteri Merkezlilik', desc: 'Müşterilerimizin başarısı bizim önceliğimizdir. Onların ihtiyaçlarını anlamak ve onlarla işbirliği yapmak, en iyi sonuçları elde etmemize yardımcı olur.' },
      { title: 'Yenilikçilik', desc: 'Dijital dünyadaki değişikliklere ayak uyduruyoruz. Sürekli olarak yeni fikirler ve teknolojiler araştırıyor, müşterilerimize rekabet avantajı sağlamak için en son araçları kullanıyoruz.' },
      { title: 'Kalite ve İş Ahlakı', desc: 'İşimizi dürüstlük, şeffaflık ve yüksek kalite standartlarıyla yapıyoruz. Müşterilerimize her zaman en iyi hizmeti sunmayı taahhüt ediyoruz.' },
      { title: 'Ekip Çalışması', desc: 'Birlikte daha fazlasını başarabiliriz. Müşterilerimizin başarısı için iç ve dış ekiplerimiz arasında güçlü işbirlikleri kuruyoruz.' }
    ],

    // Contact
    contact_heading_1: 'Markan İçin En Doğru',
    contact_heading_2: 'Dijital Yol Haritasını',
    contact_heading_3: 'Birlikte Çıkaralım.',
    contact_sub: 'Sizlere hangi konuda yardımcı olabiliriz? Almak istediğiniz hizmetimiz hakkında bizlerden fiyat teklifi isteyin; sizlere en uygun teklifi hazırlayalım.',
    contact_name: 'Adınız & Soyadınız',
    contact_phone: 'Telefon Numaranız',
    contact_email: 'E-Mail Adresiniz',
    contact_service_placeholder: 'Hizmet Seçiniz',
    contact_services: ['Sosyal Medya Yönetimi', 'Arama Motoru Optimizasyonu', 'Google Ads Yönetimi', 'Web Tasarım', 'Diğer'],
    contact_message: 'Almak istediğiniz hizmeti biraz açıklar mısınız?',
    contact_captcha: 'Güvenlik Sorusu:',
    contact_captcha_placeholder: 'Sonucu yazınız',
    contact_submit: 'Teklif İste',
    contact_captcha_error: 'Güvenlik sorusu yanlış! Lütfen tekrar deneyin.',
    contact_success: 'Mesajınız başarıyla gönderildi!',
    contact_demo: 'Mesajınız alındı! (Demo Modu - Backend bağlantısı sunucuda aktif olacaktır)',
    contact_visit: 'Bizi',
    contact_visit_2: 'Ziyaret Edin',
    contact_address_label: 'Adres',
    contact_address_val: 'Girne, Kuzey Kıbrıs Türk Cumhuriyeti',
    contact_phone_label: 'Telefon / WhatsApp',
    contact_email_label: 'E-posta',
    contact_hours_label: 'Çalışma Saatleri',
    contact_hours_val: 'Pazartesi – Cuma: 09:00 – 18:00',
    contact_maps_btn: "Google Maps'te Aç →",
    contact_map_title: 'BC Creative Agency Konum – Girne KKTC',
  },

  en: {
    // Header nav
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
    hero_top: 'How can we help you with',
    hero_bottom: '',
    hero_desc: 'BC Creative Agency is a performance-driven digital marketing agency delivering measurable growth for brands. We manage advertising, social media, and strategy from a single hub — turning your budget into real results.',
    hero_cta: "Let's Get Started",
    hero_titles: ['Google Ads Management', 'Social Media Management', 'Web Design', 'Search Engine Optimization'],

    // Service Banner
    banner_services: ['#Web Design', '#Social Media Management', '#Google Ads Management', '#Meta Ads Management', '#Graphic Design', '#Content Creation'],

    // Services section
    services_heading_1: 'Our',
    services_heading_2: 'Services',
    services_see_details: 'View Details',
    services_list: [
      { title: 'Search Engine Optimization', description: 'Let us rank your website to the top of search results.' },
      { title: 'Google Ads Management', description: 'Run your ads with advanced targeting and budget optimization.' },
      { title: 'Social Media Management', description: 'Reach wider audiences with professional social media management.' },
      { title: 'Web Design', description: 'We design modern, user-friendly websites that best reflect your brand.' }
    ],

    // Why Choose Us
    why_heading: 'Why Choose',
    why_heading_2: 'Us?',
    why_features: [
      { icon: '🚀', title: 'Results-Driven Experience', description: "We don't just work — we deliver results. We transform our experience in advertising, e-commerce, and digital marketing into measurable growth." },
      { icon: '📊', title: 'Strategy + Performance', description: "We don't follow the same path for every brand. We build data-driven strategies and manage ads and social media with performance targets." },
      { icon: '🤝', title: 'True Business Partner', description: "We're not just an agency — we're your growth partner. We work with accessibility, transparency, and a solution-focused approach at every step." }
    ],

    // FAQ
    faq_label: 'FAQ',
    faq_title: 'Frequently Asked Questions',
    faq_subtitle: 'Everything you need to know, answered here',
    faq_no_answer: "Can't find the answer you're looking for?",
    faq_whatsapp: 'Ask on WhatsApp',

    // Footer
    footer_desc: 'BC Creative Agency is a leading digital marketing and advertising agency. With a creative approach and expert team, it offers the most effective strategies to make your brand stand out in the digital world.',
    footer_contact_title: 'Contact Us',
    footer_address_title: 'Address',
    footer_address: 'Cyprus / Kyrenia',
    footer_social: 'Social Media',
    footer_instagram: 'Follow us on Instagram',

    // About
    about_action_words: ['Growing!', 'Developing!', 'Promoting!', 'Accelerating!'],
    about_hero_prefix: 'Your Brand,',
    about_hero_desc: "At BC Creative Agency, we combine experience and creativity to make your brand's voice heard as loudly as possible in the digital world.",
    about_who_title: 'Who We Are',
    about_who_p1: 'At BC Creative Agency, we are a next-generation digital performance agency that blends technology and data with creativity.',
    about_who_p2: 'Walking alongside our business partners in their digital transformation journeys, we develop not just ad management, but measurable growth strategies.',
    about_what_title: 'What Do',
    about_what_title2: 'We Do?',
    about_services: [
      { title: 'Digital Strategy', description: 'We develop digital strategies custom-designed for your brand.' },
      { title: 'Social Media Management', description: 'We professionally manage your social media accounts and produce content.' },
      { title: 'Google Ads', description: 'We optimize your Google ads to achieve the highest conversion rates.' },
      { title: 'SEO', description: 'We ensure your website ranks at the top of search engines.' },
      { title: 'Web Design', description: 'We design modern, user-friendly websites.' },
      { title: 'Content Creation', description: 'We create compelling and original content tailored to your brand.' }
    ],
    about_vision_title: 'Our Vision',
    about_vision_desc: "We are an agency that develops advanced strategies to be a pioneer in digital marketing and to provide our clients with sustainable growth and competitive advantage. We continue to create value for more brands and businesses every day.",
    about_vision_items: [
      "To maximize our clients' digital presence and help them exceed their marketing goals.",
      'To build long-term business relationships with our clients and ensure sustainable growth.',
      'To develop innovative solutions and strategies in digital marketing and deliver the latest trends to our clients.',
      'To earn the trust of our clients by strictly adhering to business ethics and transparency principles.'
    ],
    about_vision_footer: "These mission, vision, values, and goals clearly express to clients and business partners what the agency stands for and what it focuses on.",
    about_mission_title: 'Our Mission',
    about_mission_desc: "We aim to empower our clients to succeed in the digital world. Using our deep expertise in digital marketing and creative approaches, we help brands exceed their goals.",
    about_mission_items: [
      { title: 'Client-Centricity', desc: "Our clients' success is our priority. Understanding their needs and collaborating with them helps us achieve the best results." },
      { title: 'Innovation', desc: 'We keep up with changes in the digital world. We constantly explore new ideas and technologies, using the latest tools to give our clients a competitive advantage.' },
      { title: 'Quality & Ethics', desc: 'We conduct our work with honesty, transparency, and high quality standards. We commit to always providing the best service to our clients.' },
      { title: 'Teamwork', desc: 'Together we can achieve more. We build strong collaborations between our internal and external teams for the success of our clients.' }
    ],

    // Contact
    contact_heading_1: 'The Right Digital',
    contact_heading_2: 'Road Map for',
    contact_heading_3: 'Your Brand.',
    contact_sub: 'How can we help you? Request a quote for the service you need and we will prepare the most suitable offer for you.',
    contact_name: 'Full Name',
    contact_phone: 'Phone Number',
    contact_email: 'E-Mail Address',
    contact_service_placeholder: 'Select a Service',
    contact_services: ['Social Media Management', 'Search Engine Optimization', 'Google Ads Management', 'Web Design', 'Other'],
    contact_message: 'Could you briefly describe the service you need?',
    contact_captcha: 'Security Question:',
    contact_captcha_placeholder: 'Enter the result',
    contact_submit: 'Get a Quote',
    contact_captcha_error: 'Wrong answer! Please try again.',
    contact_success: 'Your message has been sent successfully!',
    contact_demo: 'Your message received! (Demo Mode - Backend will be active on the server)',
    contact_visit: 'Visit',
    contact_visit_2: 'Us',
    contact_address_label: 'Address',
    contact_address_val: 'Kyrenia, Northern Cyprus',
    contact_phone_label: 'Phone / WhatsApp',
    contact_email_label: 'Email',
    contact_hours_label: 'Working Hours',
    contact_hours_val: 'Monday – Friday: 09:00 – 18:00',
    contact_maps_btn: 'Open in Google Maps →',
    contact_map_title: 'BC Creative Agency Location – Kyrenia TRNC',
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
