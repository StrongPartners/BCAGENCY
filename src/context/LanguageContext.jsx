import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = ['tr', 'en', 'ru', 'fa'];

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

    // Contact form
    contact_form_name: 'Adınız',
    contact_form_email: 'E-posta',
    contact_form_phone: 'Telefon',
    contact_form_message: 'Mesajınız',
    contact_form_send: 'Gönder',
    contact_form_sending: 'Gönderiliyor...',
    contact_form_success: 'Mesajınız gönderildi! En kısa s��rede dönüş yapacağız.',
    contact_form_error: 'Bir hata oluştu. Lütfen tekrar deneyin.',

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
      { icon: '', title: 'Results', desc: "It's not enough to say the work was good. We measure, report, plan the next step." },
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

    // Contact form
    contact_form_name: 'Your name',
    contact_form_email: 'Email',
    contact_form_phone: 'Phone',
    contact_form_message: 'Your message',
    contact_form_send: 'Send',
    contact_form_sending: 'Sending...',
    contact_form_success: 'Your message has been sent! We will get back to you soon.',
    contact_form_error: 'An error occurred. Please try again.',

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
  },

  ru: {
    // Header nav
    nav_home: 'Главная',
    nav_about: 'О нас',
    nav_blog: 'Блог',
    nav_services: 'Услуги',
    nav_contact: 'Контакты',
    nav_seo: 'SEO',
    nav_social: 'Соцсети',
    nav_ads: 'Google Ads',
    nav_web: 'Веб-дизайн',
    nav_production: 'Продакшн',
    nav_drone: 'Дрон-съёмка',
    nav_photo: 'Фото и видео',
    btn_offer: 'Выпьем кофе',
    btn_whatsapp: 'Написать в WhatsApp',
    btn_talk: 'Давайте поговорим',
    btn_start: 'Начнём',

    // Hero
    hero_greet: 'Привет, мы BC.',
    hero_headline_1: 'Делаем идеи',
    hero_headline_accent: 'видимыми',
    hero_headline_2: '.',
    hero_desc: 'Мы — креативный двигатель Северного Кипра (ТРСК). SEO, ��еклама, соцсети, продакшн — всё, что нужно, готовим в нашей студии в Кирении. С 2017 года, с улыбкой.',
    hero_cta: 'Выпьем кофе',
    hero_cta_secondary: 'Что мы делаем',
    hero_rotating: ['SEO', 'Соцсети', 'Google Ads', 'Веб-дизайн', 'Продакшн'],

    // Service Banner (marquee)
    banner_services: ['Веб-дизайн', 'Соцсети', 'Google Ads', 'Meta Ads', 'Графический дизайн', 'Контент', 'Продакшн', 'Дрон-съёмка', 'Фото и видео', 'SEO', 'Бренд-стратегия'],

    // Services section
    services_eyebrow: 'Что мы делаем',
    services_heading_1: 'Создаём',
    services_heading_2: 'красивое вместе.',
    services_sub: 'Всё, что нужно вашему бренду — мы это делаем. Под одной крышей, измеримо и с удовольствием.',
    services_see_details: 'Подробнее →',
    services_list: [
      { icon: '', title: 'SEO', description: 'Выводим вас на первую страницу Google. Органически и надолго.', path: '/hizmetler/seo', tone: 'brand' },
      { icon: '', title: 'Google Ads', description: 'Включаете ре��ламу — телефон звонит. Каждый цент бюджета работает.', path: '/hizmetler/google-ads', tone: 'coral' },
      { icon: '', title: 'Соцсети', description: 'Instagram, Facebook, TikTok — гол��с бренда одинаково тёплый на каждой платформе.', path: '/hizmetler/sosyal-medya', tone: 'mint' },
      { icon: '', title: 'Веб-дизайн', description: 'Быстрые, современные, мобильные сайты. С встроенным SEO с самого старта.', path: '/hizmetler/web-tasarim', tone: 'sun' },
      { icon: '', title: 'Продакшн', description: 'Рекламные ролики и корпоративное видео — от сценария до постпродакшна.', path: '/hizmetler/produksiyon', tone: 'brand' },
      { icon: '', title: 'Дрон-съёмка', description: 'Снимаем лучшие виды Северного Кипра с высоты. Туризм, недвижимость, мероприятия.', path: '/hizmetler/drone-cekim', tone: 'coral' },
      { icon: '', title: 'Фото и видео', description: 'Продуктовая, событийная, корпоративная съёмка — готовый контент для соцсетей.', path: '/hizmetler/fotograf-video', tone: 'mint' },
    ],

    // Approach
    approach_eyebrow: 'Как мы работаем',
    approach_heading_1: 'Не сложно,',
    approach_heading_2: 'просто хорошая работа.',
    approach_sub: 'Мы держим процесс простым — слушаем, про��ктируем, создаём, измеряем. И повторяем.',
    approach_steps: [
      { number: '01', title: 'Слушаем', desc: 'Сначала понимаем ваш бренд, цели и клиента. За чашкой кофе.', tone: 'brand' },
      { number: '02', title: 'Проектируем', desc: '��троим стратегию на данных и креативе. Коротко, ясно, измеримо.', tone: 'coral' },
      { number: '03', title: 'Создаём', desc: 'Реклама, контент, сайты — всё делаем сами. Без аутсорса.', tone: 'mint' },
      { number: '04', title: 'Измеряем', desc: 'Каждый месяц — прозрачные отчёты о том, что сработало и что дальше.', tone: 'sun' },
    ],

    // Stats
    stats_heading: 'BC в цифрах',
    stats: [
      { value: '8+', label: 'Ле�� в деле' },
      { value: '50+', label: 'Довольных брендов' },
      { value: '2M+', label: 'Управляемый рекламный бюджет' },
      { value: '∞', label: 'Кофе' },
    ],

    // FAQ
    faq_label: 'FAQ',
    faq_title: 'Частые вопросы',
    faq_subtitle: 'То, что вы, вероятн��, хотите знать.',
    faq_no_answer: 'Не нашли ответ?',
    faq_whatsapp: 'Напишите нам',

    // Footer
    footer_tagline: 'Делаем идеи видимыми.',
    footer_desc: 'BC Creative Agency — креативная студия цифрового маркетинга в Кирении, ТРСК. Растём вместе с брендами с 2017 года.',
    footer_contact_title: 'Связаться',
    footer_address_title: 'Найти нас',
    footer_address: 'Алсанджак, Emtan West Park No:4, Кирения, ТРСК',
    footer_social: 'Подписаться',
    footer_instagram: 'Мы в Instagram',
    footer_services_title: 'Услуги',
    footer_nav_title: 'Навигация',
    footer_rights: 'Все права защищены.',
    footer_made_with: 'Сделано с любовью в Кирении',

    // About
    about_eyebrow: 'О нас',
    about_hero_title_1: 'Мы',
    about_hero_title_accent: 'BC',
    about_hero_title_2: 'и мы рядом с брендами.',
    about_hero_desc: 'Мы занимаемся цифровым маркетингом на Северном Кипре с 2017 года. Начинали как маленькая студия, сегодня работаем с 50+ брендами. Наша формула проста: хорошие идеи + данные + этика.',
    about_story_title: 'Наша история',
    about_story_p1: 'Мы начали в маленьком офисе в Кирении с кофе и проектором. Тогда цифровых агентств на Северном Кипре можно было пересчитать по пальцам. Мы хотели сделать что-то другое: тёплую, измеримую и действительно полезную цифровую работу.',
    about_story_p2: 'Мы до сих пор в той же студии — чуть больше, чуть серьёзнее, но по-прежнему подходим к каждому проекту с энтузиазмом первого д��я. В этом секрет.',
    about_values_title: 'Наши ценности',
    about_values_sub: 'Четыре вещи, которые определяют нашу работу:',
    about_values: [
      { icon: '', title: 'Прозрачность', desc: 'Что делаем, зачем — каждый месяц в цифрах. Без сюрпризов.' },
      { icon: '', title: 'Забота', desc: 'Относимся к каждому кли��нту как к своему бренду. Это не клише, это политика.' },
      { icon: '', title: 'Скорость', desc: 'Отвечаем на WhatsApp в среднем за 15 минут. Потому что сами не любим ждать.' },
      { icon: '', title: 'Результат', desc: 'Мало сказать «работа сделана хорошо». Измеряем, отчитываемся, планируем следующий шаг.' },
    ],
    about_services_title: 'Список ',
    about_services_title_accent: 'услуг',
    about_services_sub: 'Все ваши потребности в цифровом маркетинге — под одной крышей.',
    about_services: [
      { icon: '', title: 'SEO', description: 'Цель — первая страница Google.' },
      { icon: '', title: 'Google Ads', description: 'Управление рекла��ой с фокусом на результат.' },
      { icon: '', title: 'Соцсети', description: 'Стратегия и контент для Instagram, Facebook, TikTok.' },
      { icon: '', title: 'Веб-дизайн', description: 'Быстрые, современные, SEO-дружественные сайты.' },
      { icon: '', title: 'Продакшн', description: 'Рекламные ролики, корпоративное видео, вирусный контент.' },
      { icon: '', title: 'Дрон-съёмка', description: 'Проф��ссиональная аэросъёмка.' },
      { icon: '', title: 'Фото и видео', description: 'Продуктовая, событийная, корпоративная съёмка.' },
      { icon: '', title: 'Графический дизайн', description: 'Логотипы, фирменный стиль, графика для кампаний.' },
      { icon: '', title: 'Контент', description: 'Копирайтинг и статьи для блога.' },
    ],

    // Contact
    contact_eyebrow: 'Контакты',
    contact_heading_1: 'Давайте',
    contact_heading_accent: 'поговорим.',
    contact_heading_2: 'Есть идея?',
    contact_sub: 'Проект, идея или просто в��прос — напишите в WhatsApp, ответим примерно за 15 минут. Обещаем.',
    contact_address_label: 'Адрес',
    contact_address_val: 'Алсанджак, Emtan West Park No:4, Кирения, ТРСК',
    contact_phone_label: 'Телефон / WhatsApp',
    contact_email_label: 'Эл. почта',
    contact_hours_label: 'Часы работы',
    contact_hours_val: 'Понедельник – Пятница: 09:00 – 18:00',
    contact_maps_btn: 'Открыть в Google Maps →',
    contact_map_title: 'BC Creative Agency – Кирения ТРСК',
    contact_map_url: 'https://www.google.com/maps/search/Alsancak+Emtan+West+Park+Girne+Kuzey+K%C4%B1br%C4%B1s',
    contact_response_title: 'Среднее время ответа',
    contact_response_desc: 'В рабочие часы отвечаем на WhatsApp за 15 минут. Писать можно 24/7.',
    contact_response_btn: 'Открыть WhatsApp',

    // Contact form
    contact_form_name: 'Ваше имя',
    contact_form_email: 'Эл. почта',
    contact_form_phone: 'Телефон',
    contact_form_message: 'Ваше сообщение',
    contact_form_send: 'Отправить',
    contact_form_sending: 'Отправка...',
    contact_form_success: 'Сообщение отправлено! Мы свяжемся с вами в ближайшее время.',
    contact_form_error: 'Произошла ошибка. Попробуйте ещё раз.',

    // Blog
    blog_badge: 'Блог',
    blog_heading_1: 'Мы также любим',
    blog_heading_accent: 'писать.',
    blog_heading_2: '',
    blog_sub: 'Полезные гайды по SEO, Google Ads, соцсетям и веб-дизайну для бизне��а ТРСК.',
    blog_read_more: 'Читать →',
    blog_read_time: 'чтения',
    blog_back: 'Назад в блог',
    blog_other_posts: 'Другие статьи',
    blog_cta_title: 'Готовы ра��ти на Северном Кипре?',
    blog_cta_sub: 'Инди��идуальные решения цифрового маркетинга для бизнеса в Кирении и ТРСК.',
    blog_not_found: 'Статья не найдена',
  },

  fa: {
    // Header nav
    nav_home: 'خانه',
    nav_about: 'درباره ما',
    nav_blog: 'بلاگ',
    nav_services: 'خدمات',
    nav_contact: 'تماس',
    nav_seo: 'سئو',
    nav_social: 'شبکه‌های اجتماعی',
    nav_ads: 'Google Ads',
    nav_web: 'طراحی وب',
    nav_production: 'پروداکشن',
    nav_drone: 'فیلمبرداری هوایی',
    nav_photo: 'عکس و ویدئو',
    btn_offer: 'یک قهوه بنوشیم',
    btn_whatsapp: 'پیام در واتساپ',
    btn_talk: 'بیایید صحبت کنیم',
    btn_start: 'شروع کنیم',

    // Hero
    hero_greet: 'سلام، ما BC هستیم.',
    hero_headline_1: 'ایده‌ها را',
    hero_headline_accent: 'نمایان',
    hero_headline_2: 'می‌کنیم.',
    hero_desc: '��ا موتور خلاقیت قبرس شمالی هستیم. سئو، تبلیغات، شبکه‌های اجتماعی، پروداکشن — هرچه نیاز دارید، در استودیوی ما در گیرنه آماده می‌شود. از سال ۲۰۱۷، با لبخند.',
    hero_cta: 'یک قهوه بنوشیم',
    hero_cta_secondary: 'چه کار می‌کنیم',
    hero_rotating: ['سئو', 'شبکه‌های اجتماعی', 'Google Ads', 'طراحی وب', 'پروداکشن'],

    // Service Banner (marquee)
    banner_services: ['طراحی وب', 'شبکه‌های اجتماعی', 'Google Ads', 'Meta Ads', 'طراحی گرافیک', 'محتوا', 'پروداکشن', 'فیلمبرداری هوایی', 'عکس و ویدئو', 'سئو', 'استراتژی برند'],

    // Services section
    services_eyebrow: 'چه کار می‌کنیم',
    services_heading_1: 'با هم',
    services_heading_2: 'چیزهای زیبا بسازیم.',
    services_sub: 'هرچه برند شما نیاز دارد — ما انجام می‌دهیم. همه زیر یک سقف، همه قابل اندازه‌گیری.',
    services_see_details: 'جزئیات بیشتر →',
    services_list: [
      { icon: '', title: 'سئو', description: 'در صفحه اول گوگل قرار بگیرید. به صورت ارگانیک و پایدار.', path: '/hizmetler/seo', tone: 'brand' },
      { icon: '', title: 'Google Ads', description: 'تبلیغ را فعال کنید، ��لفن زنگ بزند. هر ریال بودجه کار می‌کند.', path: '/hizmetler/google-ads', tone: 'coral' },
      { icon: '', title: 'شبکه‌های اجتماعی', description: 'اینستاگرام، فیسبوک، تیک‌تاک — صدای برند شما در هر پلتفرم.', path: '/hizmetler/sosyal-medya', tone: 'mint' },
      { icon: '', title: 'طراحی وب', description: 'سایت‌های سریع، مدرن و سازگار با موبایل. با سئو از ابتدا.', path: '/hizmetler/web-tasarim', tone: 'sun' },
      { icon: '', title: 'پروداکشن', description: 'فیلم تبلیغاتی و ویدئوی شرکتی — از سناریو تا پست‌پروداکشن.', path: '/hizmetler/produksiyon', tone: 'brand' },
      { icon: '', title: 'فیلمبرداری هوایی', description: 'بهترین نماهای قبرس شمالی را از بالا ثبت می‌کنیم. گردشگری، املاک، رویدادها.', path: '/hizmetler/drone-cekim', tone: 'coral' },
      { icon: '', title: 'عکس و ویدئو', description: 'عکاسی محصول، رویداد و شرکتی — محتوای آماده برای شبکه‌های اجتماعی.', path: '/hizmetler/fotograf-video', tone: 'mint' },
    ],

    // Approach
    approach_eyebrow: 'نحوه کار ما',
    approach_heading_1: 'پیچیده نیست،',
    approach_heading_2: 'فقط کار خوب.',
    approach_sub: 'فرآیند را ساده نگه می‌داریم — گوش می‌دهیم، طراحی می‌کنیم، می‌سازیم، اندازه‌گیری می‌کنیم. و تکرار.',
    approach_steps: [
      { number: '01', title: 'گوش دادن', desc: 'ابتدا برند، اهداف و مشتری شما را می‌شناسیم. با کلی قهوه.', tone: 'brand' },
      { number: '02', title: 'طراحی', desc: 'استراتژی بر پایه داده و خلاقی�� می‌سا��یم. کوتاه، واضح، قابل اندازه‌گیری.', tone: 'coral' },
      { number: '03', title: 'ساختن', desc: 'تبلیغات، محتوا، سایت‌ها — همه توسط تیم خودمان. بدون برون‌سپاری.', tone: 'mint' },
      { number: '04', title: 'اندازه‌گیری', desc: 'هر ماه گزارش‌های شفاف از آنچه کار کرده و قدم بعدی.', tone: 'sun' },
    ],

    // Stats
    stats_heading: 'BC در اعداد',
    stats: [
      { value: '۸+', label: 'سال تجربه' },
      { value: '۵۰+', label: 'برند راضی' },
      { value: '۲M+', label: 'بودجه تبلیغاتی مدیریت شده' },
      { value: '∞', label: 'قهوه' },
    ],

    // FAQ
    faq_label: 'سوالات متداول',
    faq_title: 'سوالات رایج',
    faq_subtitle: 'آنچه احتمالاً می‌خواهید بدانید.',
    faq_no_answer: 'پاسخ خود را پیدا نکردید؟',
    faq_whatsapp: 'به ما پیام دهید',

    // Footer
    footer_tagline: 'ایده‌ها را نمایان می‌کنیم.',
    footer_desc: 'BC Creative Agency — استودیوی خلاق بازاریابی دیجیتال در گیرنه، TRNC. از سال ۲۰۱۷ با برندها رشد می‌کنیم.',
    footer_contact_title: 'تماس با ما',
    footer_address_title: 'ما را پیدا کنید',
    footer_address: 'آلسانجاک، Emtan West Park No:4، گیرنه، TRNC',
    footer_social: 'دنبال کنید',
    footer_instagram: 'ما در اینستاگرام',
    footer_services_title: 'خدمات ما',
    footer_nav_title: 'پیمایش',
    footer_rights: 'تمامی حقوق محفوظ است.',
    footer_made_with: 'با عشق در گیرنه ساخته شده',

    // About
    about_eyebrow: 'درباره ما',
    about_hero_title_1: 'ما',
    about_hero_title_accent: 'BC',
    about_hero_title_2: 'هستیم و در کنار برندها.',
    about_hero_desc: 'از سال ۲۰۱۷ در قبرس شمالی بازاریابی دیجیتال انجام می‌دهیم. به عنوان یک استودیوی ��وچک شروع کردیم، امروز با بیش از ۵۰ برند کار می‌کنیم. فرمول ما ساده است: ایده خوب + داده خوب + اخلاق خوب.',
    about_story_title: 'داستان ما',
    about_story_p1: 'در یک دفتر کوچک در گیرنه با قهوه فراوان و یک پروژکتور شروع کردیم. آن زمان آژانس‌های دیجیتال در قبرس شمالی انگشت‌شمار بودند. ما می‌خواستیم کاری متفاوت انجام دهیم: کار دیجیتال صمیمانه، قابل اندازه‌گیری و واقعاً مفید.',
    about_story_p2: 'هنوز در همان استودیو هستیم — کمی بزرگ‌تر، کمی جدی‌تر، اما هنوز با هیجان روز اول به هر پروژه نزدیک می‌شویم. راز کار همین است.',
    about_values_title: 'ارزش‌های ما',
    about_values_sub: 'چهار چیزی که نحوه کار ما را شکل می‌دهد:',
    about_values: [
      { icon: '', title: 'شفافیت', desc: 'چه کار می‌کنیم، چرا — هر ماه با اعداد. بدون سورپرایز.' },
      { icon: '', title: 'توجه واقعی', desc: 'با هر مشتری طوری رفتار می‌کنیم که انگار برند خودمان است. این کلیشه نیست، سیاست ماست.' },
      { icon: '', title: 'سرعت', desc: 'به پیام‌های واتساپ به طور متوسط در ۱۵ دقیقه پاسخ می‌دهیم. چون خودمان هم منتظر ماندن را دوست نداریم.' },
      { icon: '', title: 'نتیجه‌محوری', desc: 'گفتن "کار خوب بود" کافی نیست. اندازه‌گیری، گزارش، برنامه‌ریزی قدم بعدی.' },
    ],
    about_services_title: 'لیست ',
    about_services_title_accent: 'خدمات',
    about_services_sub: 'تمام نیازهای بازاریابی دیجیتال شما، زیر یک سقف.',
    about_services: [
      { icon: '', title: 'سئو', description: 'هدف: صفحه اول گوگل.' },
      { icon: '', title: 'Google Ads', description: 'مدیریت تبلیغات با تمرکز ب�� نتیجه.' },
      { icon: '', title: 'شبکه‌های اجتماعی', description: 'استراتژی و محتوا برای اینستاگرام، فیسبوک، تیک‌تاک.' },
      { icon: '', title: 'طراحی وب', description: 'سایت‌های سریع، مدرن و سئو-دوست.' },
      { icon: '', title: 'پروداکشن', description: 'فیلم تبلیغاتی، ویدئوی شرکتی، محتوای وایرال.' },
      { icon: '', title: 'فیلمبرداری هوایی', description: 'هوابرداری حرفه‌ای.' },
      { icon: '', title: 'عکس و ویدئو', description: 'عکاسی محصول، رویداد و شرکتی.' },
      { icon: '', title: 'طراحی گرافیک', description: 'لوگو، هویت بصری، گرافیک کمپین.' },
      { icon: '', title: 'محتوا', description: 'کپی‌رایتینگ و مقالات بلاگ.' },
    ],

    // Contact
    contact_eyebrow: 'تماس',
    contact_heading_1: 'بیایید',
    contact_heading_accent: 'صحبت کنیم.',
    contact_heading_2: 'ایده‌ای دارید؟',
    contact_sub: 'یک پروژه، یک ایده یا فقط یک سوال — در واتساپ بنویسید، حدود ۱۵ دقیقه‌ای پاسخ می‌دهیم. قول.',
    contact_address_label: 'آدرس',
    contact_address_val: 'آلسانجاک، Emtan West Park No:4، گیرنه، TRNC',
    contact_phone_label: 'تلفن / واتساپ',
    contact_email_label: 'ایمیل',
    contact_hours_label: 'ساعات کاری',
    contact_hours_val: 'دوشنبه – جمعه: ۰۹:۰۰ – ۱۸:۰۰',
    contact_maps_btn: 'باز کردن در Google Maps →',
    contact_map_title: 'BC Creative Agency – گیرنه TRNC',
    contact_map_url: 'https://www.google.com/maps/search/Alsancak+Emtan+West+Park+Girne+Kuzey+K%C4%B1br%C4%B1s',
    contact_response_title: 'میانگین زمان پاسخ',
    contact_response_desc: 'در ساعات کاری به پیام‌های واتساپ در ۱۵ دقیقه پاسخ می‌دهیم. می‌توانید ۲۴/۷ پیام دهید.',
    contact_response_btn: 'باز کردن واتساپ',

    // Contact form
    contact_form_name: 'نام شما',
    contact_form_email: 'ایمیل',
    contact_form_phone: 'تلفن',
    contact_form_message: 'پیام شما',
    contact_form_send: 'ارسال',
    contact_form_sending: 'در حال ارسال...',
    contact_form_success: 'پیام شما ارسال شد! به زودی با شما تماس می‌گیریم.',
    contact_form_error: 'خطایی رخ داد. لطفاً دوباره امتحان کنید.',

    // Blog
    blog_badge: 'بلاگ',
    blog_heading_1: 'ما نوشتن را هم',
    blog_heading_accent: 'دوست داریم.',
    blog_heading_2: '',
    blog_sub: 'راهنماهای مفید درباره سئو، Google Ads، شبکه‌های اجتماعی و طراحی وب برای کسب‌وکارهای TRNC.',
    blog_read_more: 'بخوانید →',
    blog_read_time: 'خواندن',
    blog_back: 'بازگشت به بلاگ',
    blog_other_posts: 'مقالات دیگر',
    blog_cta_title: 'آماده رشد در قبرس شمالی هستید؟',
    blog_cta_sub: 'راه‌حل‌های ��ازاریابی دیجیتال اختصاصی برای کسب‌وکارها در گیرنه و سراسر TRNC.',
    blog_not_found: 'مقاله یافت نشد',
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('tr');

  const t = (key) => {
    const val = translations[lang]?.[key];
    return val !== undefined ? val : translations.tr?.[key] || key;
  };

  const isRTL = lang === 'fa';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [lang, isRTL]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
