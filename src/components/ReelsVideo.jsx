import { Clapperboard, Scissors, TrendingUp, CalendarDays } from 'lucide-react';
import makeServicePage from './shared/makeServicePage';

export default makeServicePage({
  path: '/hizmetler/reels-video-edit',
  name: { tr: 'Reels ve Video Edit', en: 'Reels & Video Editing' },
  serviceType: 'VideoProduction',
  seo: {
    titleTr: 'KKTC Reels Üretimi ve Video Edit | Instagram & TikTok – BC Creative Girne',
    titleEn: 'Reels Production & Video Editing in Northern Cyprus | BC Creative',
    keywords: 'KKTC reels üretimi, Girne video edit, Instagram reels ajansı KKTC, TikTok video KKTC, kısa video prodüksiyon',
  },
  tr: {
    eyebrow: 'Reels · Video Çekim · Edit',
    headline: 'İlk üç saniyede', headlineAccent: 'durduran', headlineRest: 'videolar.',
    subheadline: 'Çekimden kurguya, altyazıdan müziğe kadar tek ekip.',
    description: 'Instagram Reels, TikTok ve YouTube Shorts için dikey video üretiyoruz. Aylık çekim günleriyle bir ayın içeriğini tek seferde çekip ritmi, altyazısı ve müziğiyle kurguluyoruz.',
    features: [
      { icon: Clapperboard, title: 'Aylık çekim günü', desc: 'Bir çekim gününde bir ayın içeriği: ürün, mekân, ekip ve müşteri videoları.' },
      { icon: Scissors, title: 'Kurgu ve altyazı', desc: 'Hızlı kurgu, dinamik altyazı, ses tasarımı ve telifsiz müzik.' },
      { icon: TrendingUp, title: 'Trend ve kanca', desc: 'Her video ilk üç saniyede izleyiciyi tutacak bir açılışla kurgulanır.' },
      { icon: CalendarDays, title: 'Takvim ve paylaşım', desc: 'İçerik takvimi, açıklama metinleri ve paylaşım planı sosyal medya ekibimizle birlikte.' },
    ],
    stats: [{ value: '9:16', label: 'Dikey format' }, { value: 'Reels', label: 'Instagram' }, { value: 'TikTok', label: 'Kısa video' }, { value: 'Shorts', label: 'YouTube' }],
    steps: [
      { step: '01', title: 'Fikir listesi', desc: 'Markanıza uygun Reels fikirleri ve senaryolar.' },
      { step: '02', title: 'Çekim', desc: 'Profesyonel ekipmanla mekânınızda veya stüdyoda.' },
      { step: '03', title: 'Kurgu', desc: 'Altyazı, müzik, efekt ve kapak görseli.' },
      { step: '04', title: 'Yayın ve analiz', desc: 'Paylaşım, izlenme ve etkileşim raporu.' },
    ],
    faqs: [
      { question: 'Ayda kaç Reels üretiyorsunuz?', answer: 'Paketinize göre değişir. Çekim gününde bir ayın içeriğini çekip takvime göre dağıtıyoruz.' },
      { question: 'Kendi çektiğim videoları da kurgular mısınız?', answer: 'Evet. Telefonla çektiğiniz görüntüleri de kurgulayıp altyazı ve müzikle yayına hazır hale getiriyoruz.' },
      { question: 'Müzik telif sorunu olur mu?', answer: 'Platformların müzik kütüphanelerini veya telifsiz müzik kullanıyoruz.' },
      { question: 'Sosyal medya yönetimiyle birlikte alınabilir mi?', answer: 'Evet. En verimli kullanım budur; çekim, kurgu ve paylaşım tek ekipten yürür.' },
    ],
    ctaTitle: 'Bu ayın videolarını birlikte çekelim.', ctaSub: 'Markanızı anlatın, ilk fikir listesini biz hazırlayalım.',
  },
  en: {
    eyebrow: 'Reels · Video Shoots · Editing',
    headline: 'Videos that', headlineAccent: 'stop the scroll', headlineRest: 'in three seconds.',
    subheadline: 'From shoot to edit, captions to music, one team.',
    description: 'We produce vertical video for Instagram Reels, TikTok and YouTube Shorts. With monthly shoot days we capture a month of content at once and edit it with rhythm, captions and music.',
    features: [
      { icon: Clapperboard, title: 'Monthly shoot day', desc: 'A month of content in one day: product, venue, team and customer videos.' },
      { icon: Scissors, title: 'Editing and captions', desc: 'Fast cuts, dynamic captions, sound design and licensed music.' },
      { icon: TrendingUp, title: 'Trends and hooks', desc: 'Every video opens with a hook that holds viewers in the first three seconds.' },
      { icon: CalendarDays, title: 'Calendar and posting', desc: 'Content calendar, captions and posting plan with our social media team.' },
    ],
    stats: [{ value: '9:16', label: 'Vertical format' }, { value: 'Reels', label: 'Instagram' }, { value: 'TikTok', label: 'Short video' }, { value: 'Shorts', label: 'YouTube' }],
    steps: [
      { step: '01', title: 'Idea list', desc: 'Reels ideas and scripts that fit your brand.' },
      { step: '02', title: 'Shoot', desc: 'Professional gear at your venue or in the studio.' },
      { step: '03', title: 'Edit', desc: 'Captions, music, effects and cover image.' },
      { step: '04', title: 'Post & analyse', desc: 'Posting, views and engagement report.' },
    ],
    faqs: [
      { question: 'How many Reels do you produce per month?', answer: 'It depends on your plan. We shoot a month of content in one day and spread it across the calendar.' },
      { question: 'Can you edit videos I shoot myself?', answer: 'Yes. We edit your phone footage and make it ready to post with captions and music.' },
      { question: 'Any music copyright issues?', answer: 'We use the platforms’ music libraries or licensed music.' },
      { question: 'Can it come with social media management?', answer: 'Yes, that’s the most effective setup: shoot, edit and posting from one team.' },
    ],
    ctaTitle: 'Let’s shoot this month’s videos.', ctaSub: 'Tell us about your brand and we’ll prepare the first idea list.',
  },
});
