import { Users, Mail, BarChart3, Plug } from 'lucide-react';
import makeServicePage from './shared/makeServicePage';

export default makeServicePage({
  path: '/hizmetler/crm-yazilim',
  name: { tr: 'CRM ve İş Yazılımları', en: 'CRM & Business Software' },
  serviceType: 'CustomSoftwareDevelopment',
  seo: {
    titleTr: 'KKTC CRM Yazılımı ve Özel İş Yazılımları | BC Creative Girne',
    titleEn: 'CRM & Custom Business Software in Northern Cyprus | BC Creative',
    keywords: 'KKTC CRM, Girne CRM yazılımı, özel yazılım KKTC, müşteri takip programı Kuzey Kıbrıs, iş yazılımı',
  },
  tr: {
    eyebrow: 'CRM ve İş Yazılımları',
    headline: 'Excel’den', headlineAccent: 'kendi sisteminize', headlineRest: 'geçin.',
    subheadline: 'Müşteri, teklif, görev ve rapor tek panelde.',
    description: 'Ajans olarak kendi CRM’imizi yazdık ve her gün kullanıyoruz: müşteri adayları, teklifler, e-posta gönderimi, görevler, gün sonu raporları ve müşteri portalı. Aynı deneyimle işinize özel sistemi kuruyoruz.',
    features: [
      { icon: Users, title: 'Müşteri ve aday takibi', desc: 'Adaydan müşteriye tüm geçmiş, notlar, hatırlatmalar ve takip tarihleri tek yerde.' },
      { icon: Mail, title: 'E-posta ve WhatsApp', desc: 'Kurumsal adresinizden tekli veya toplu e-posta, kayıtlarıyla birlikte. WhatsApp bildirimleri.' },
      { icon: BarChart3, title: 'Rapor ve müşteri portalı', desc: 'Gün sonu raporları, ekip görevleri ve müşterilerinizin kendi verisini gördüğü portal.' },
      { icon: Plug, title: 'Web sitenizle bağlı', desc: 'Sitenizdeki formlar, ilanlar ve iş birliği logoları doğrudan sistemden beslenir.' },
    ],
    stats: [{ value: 'Bulut', label: 'Her yerden erişim' }, { value: 'Mobil', label: 'Telefonda çalışır' }, { value: 'Rol', label: 'Yetki yönetimi' }, { value: 'Sizin', label: 'Veri sahipliği' }],
    steps: [
      { step: '01', title: 'Süreç analizi', desc: 'Bugün işinizi nasıl yürüttüğünüzü birlikte çıkarıyoruz.' },
      { step: '02', title: 'Tasarım', desc: 'Ekranlar ve akışlar, ekibinizin diliyle.' },
      { step: '03', title: 'Geliştirme ve aktarım', desc: 'Sistemi kuruyor, mevcut Excel ve listelerinizi içeri alıyoruz.' },
      { step: '04', title: 'Eğitim ve destek', desc: 'Ekip eğitimi, sürekli geliştirme ve teknik destek.' },
    ],
    faqs: [
      { question: 'Hazır bir CRM yerine neden özel yazılım?', answer: 'Hazır sistemler işinize uymayan alanlar ve aylık kullanıcı ücretleriyle gelir. Özel sistem sizin sürecinize göre kurulur ve veri tamamen sizde kalır.' },
      { question: 'Mevcut verilerim aktarılır mı?', answer: 'Evet. Excel, Google Sheets veya eski programınızdaki müşteri ve iş kayıtlarını sisteme aktarıyoruz.' },
      { question: 'Ekibim telefondan kullanabilir mi?', answer: 'Evet. Sistem tarayıcıdan ve telefondan çalışır, bildirim gönderebilir.' },
      { question: 'Sonradan özellik eklenebilir mi?', answer: 'Evet. Sistem sizinle birlikte büyür; yeni ihtiyaçları aylık geliştirme paketiyle ekliyoruz.' },
    ],
    ctaTitle: 'İşinizi tek panelde toplayalım.', ctaSub: 'Mevcut sürecinizi anlatın, size uygun sistemi birlikte çizelim.',
  },
  en: {
    eyebrow: 'CRM & Business Software',
    headline: 'Move from spreadsheets', headlineAccent: 'to your own system', headlineRest: '',
    subheadline: 'Customers, quotes, tasks and reports in one dashboard.',
    description: 'We built our own CRM as an agency and use it every day: leads, quotes, email, tasks, daily reports and a client portal. We bring the same experience to a system built for your business.',
    features: [
      { icon: Users, title: 'Customers and leads', desc: 'The full history from lead to client, notes, reminders and follow-up dates in one place.' },
      { icon: Mail, title: 'Email and WhatsApp', desc: 'Single or bulk email from your business address with records. WhatsApp notifications.' },
      { icon: BarChart3, title: 'Reports and client portal', desc: 'Daily reports, team tasks and a portal where your clients see their own data.' },
      { icon: Plug, title: 'Connected to your website', desc: 'Forms, listings and partner logos on your site are fed directly from the system.' },
    ],
    stats: [{ value: 'Cloud', label: 'Access anywhere' }, { value: 'Mobile', label: 'Works on phones' }, { value: 'Roles', label: 'Permission control' }, { value: 'Yours', label: 'Data ownership' }],
    steps: [
      { step: '01', title: 'Process analysis', desc: 'We map how you run your business today.' },
      { step: '02', title: 'Design', desc: 'Screens and flows in your team’s language.' },
      { step: '03', title: 'Build & migration', desc: 'We build the system and import your existing lists.' },
      { step: '04', title: 'Training & support', desc: 'Team training, ongoing development and support.' },
    ],
    faqs: [
      { question: 'Why custom software instead of an off-the-shelf CRM?', answer: 'Off-the-shelf tools come with fields you don’t need and per-user fees. A custom system follows your process and your data stays with you.' },
      { question: 'Can my existing data be migrated?', answer: 'Yes. We import customer and job records from Excel, Google Sheets or your old software.' },
      { question: 'Can my team use it on the phone?', answer: 'Yes. It works in the browser and on phones, and can send notifications.' },
      { question: 'Can features be added later?', answer: 'Yes. The system grows with you; we add new needs with a monthly development plan.' },
    ],
    ctaTitle: 'Let’s bring your business into one dashboard.', ctaSub: 'Tell us your current process and we’ll sketch the right system together.',
  },
});
