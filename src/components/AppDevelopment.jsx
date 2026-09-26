import { Smartphone, Layers, Bell, ShieldCheck } from 'lucide-react';
import makeServicePage from './shared/makeServicePage';

export default makeServicePage({
  path: '/hizmetler/uygulama-gelistirme',
  name: { tr: 'Uygulama Geliştirme', en: 'App Development' },
  serviceType: 'MobileApplicationDevelopment',
  seo: {
    titleTr: 'KKTC Mobil Uygulama Geliştirme | iOS & Android – BC Creative Girne',
    titleEn: 'Mobile App Development in Northern Cyprus | iOS & Android – BC Creative',
    keywords: 'KKTC mobil uygulama, Girne uygulama geliştirme, iOS Android uygulama KKTC, Kuzey Kıbrıs yazılım',
  },
  tr: {
    eyebrow: 'Uygulama Geliştirme · iOS & Android',
    headline: 'Müşteriniz', headlineAccent: 'cebinizde', headlineRest: 'dursun.',
    subheadline: 'Tek kod tabanından iOS ve Android uygulamalar.',
    description: 'Rezervasyon, sipariş, sadakat kartı veya şirket içi iş takibi. İşinizin gerçekten ihtiyaç duyduğu uygulamayı tasarlıyor, geliştiriyor ve mağazalara yüklüyoruz.',
    features: [
      { icon: Smartphone, title: 'iOS ve Android birlikte', desc: 'Tek kod tabanıyla iki platform. Daha kısa süre, daha kolay bakım.' },
      { icon: Layers, title: 'Web paneliyle birlikte', desc: 'Uygulamadaki her şeyi yönettiğiniz bir yönetim paneli de teslimatın parçası.' },
      { icon: Bell, title: 'Bildirim ve WhatsApp', desc: 'Push bildirimleri, WhatsApp onay ve hatırlatma mesajlarıyla müşteriyle bağ kurun.' },
      { icon: ShieldCheck, title: 'Mağaza yayını dahil', desc: 'App Store ve Google Play hesap kurulumu, inceleme süreci ve yayın bizde.' },
    ],
    stats: [{ value: 'iOS', label: 'App Store' }, { value: 'Android', label: 'Google Play' }, { value: 'Web', label: 'Yönetim paneli' }, { value: '4 dil', label: 'TR · EN · RU · FA' }],
    steps: [
      { step: '01', title: 'Keşif', desc: 'Kullanıcıyı, akışları ve ihtiyacı birlikte çıkarıyoruz.' },
      { step: '02', title: 'Prototip', desc: 'Tıklanabilir tasarımla uygulamayı yazmadan önce deniyorsunuz.' },
      { step: '03', title: 'Geliştirme', desc: 'Sprintler halinde, her hafta test edebileceğiniz sürümler.' },
      { step: '04', title: 'Yayın ve bakım', desc: 'Mağaza yayını, güncellemeler ve teknik destek.' },
    ],
    faqs: [
      { question: 'Uygulama ne kadar sürede hazır olur?', answer: 'Kapsama göre değişir. Keşif görüşmesinden sonra ekran listesi ve takvimle birlikte net bir süre veriyoruz.' },
      { question: 'Mağaza hesaplarını kim açıyor?', answer: 'Hesaplar sizin adınıza açılır, kurulumunu ve yayın sürecini biz yönetiriz. Uygulama her zaman sizin hesabınızda kalır.' },
      { question: 'Mevcut web sitemle veya CRM ile bağlanabilir mi?', answer: 'Evet. Uygulama mevcut sisteminizle veya sizin için yazdığımız CRM ile aynı veriyi kullanabilir.' },
      { question: 'Yayından sonra destek var mı?', answer: 'Aylık bakım paketiyle işletim sistemi güncellemelerine uyum, hata düzeltme ve yeni özellik geliştirme sunuyoruz.' },
    ],
    ctaTitle: 'Uygulama fikriniz mi var?', ctaSub: 'Bir kahve eşliğinde anlatın, ücretsiz bir kapsam taslağı çıkaralım.',
  },
  en: {
    eyebrow: 'App Development · iOS & Android',
    headline: 'Keep your customers', headlineAccent: 'in their pocket', headlineRest: '',
    subheadline: 'iOS and Android apps from a single codebase.',
    description: 'Bookings, ordering, loyalty cards or internal operations. We design, build and publish the app your business actually needs.',
    features: [
      { icon: Smartphone, title: 'iOS and Android together', desc: 'One codebase, two platforms. Shorter timelines, easier maintenance.' },
      { icon: Layers, title: 'With a web dashboard', desc: 'An admin panel to manage everything in the app is part of the delivery.' },
      { icon: Bell, title: 'Notifications and WhatsApp', desc: 'Stay connected with push notifications and WhatsApp confirmations and reminders.' },
      { icon: ShieldCheck, title: 'Store release included', desc: 'App Store and Google Play setup, review process and release handled by us.' },
    ],
    stats: [{ value: 'iOS', label: 'App Store' }, { value: 'Android', label: 'Google Play' }, { value: 'Web', label: 'Admin panel' }, { value: '4 langs', label: 'TR · EN · RU · FA' }],
    steps: [
      { step: '01', title: 'Discovery', desc: 'We map users, flows and needs together.' },
      { step: '02', title: 'Prototype', desc: 'Try the app as a clickable design before any code.' },
      { step: '03', title: 'Build', desc: 'In sprints, with testable builds every week.' },
      { step: '04', title: 'Launch & care', desc: 'Store release, updates and technical support.' },
    ],
    faqs: [
      { question: 'How long does an app take?', answer: 'It depends on scope. After a discovery meeting we give a clear timeline with a screen list.' },
      { question: 'Who opens the store accounts?', answer: 'Accounts are opened in your name; we handle setup and release. The app always stays in your account.' },
      { question: 'Can it connect to my website or CRM?', answer: 'Yes. The app can share data with your existing system or a CRM we build for you.' },
      { question: 'Is there support after launch?', answer: 'Our monthly care plan covers OS updates, bug fixes and new features.' },
    ],
    ctaTitle: 'Got an app idea?', ctaSub: 'Tell us over coffee and we’ll draft a free scope.',
  },
});
