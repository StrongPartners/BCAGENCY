import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  "Google'da 'Girne kiralık daire' yazdığında artık ilk sayfadayız. 3 ayda geldi bu sonuç, beklediğimden hızlıydı.",
  "Sosyal medyayı devrettik, takipçi 800'den 4.500'e çıktı. Müşteriler artık 'Instagram'dan gördüm' diye geliyor.",
  "Siteyi hızlı teslim ettiler, telefonda da çok iyi görünüyor. Birkaç müşterimiz bile 'nerede yaptırdınız' diye sordu.",
  "Daha önce iki ajansla çalıştım, ikisi de düzgün rapor vermedi. BC her ay oturup anlatıyor ne yaptıklarını.",
  "Aynı Google Ads bütçesiyle çalışıyoruz ama dönüşler karşılaştırılamaz. Önceki ajansla ayda 2-3 lead geliyordu, şimdi 30'un üstünde.",
  "Sadece Google harita optimizasyonu yaptılar. Yabancı müşteri sayısında ciddi artış oldu, bu kadar fark edeceğini düşünmemiştim.",
  "Drone çekimi çok iyi oldu. Manzarayı öyle güzel yakaladılar ki, videoyu Instagram'a koyduk 50K izlendi.",
  "Avukat aramasında 5. sayfadaydık, şimdi ilk sayfadayız. Telefonla gelen danışan sayısı gözle görülür arttı.",
  "Yaz öncesi sosyal medya ve reklam kampanyası yaptırdık. En yoğun sezonumuzu geçirdik diyebilirim.",
  "We needed a bilingual website. They delivered in 2 weeks and the SEO results came faster than expected.",
  "Sektörümüzde dijital pazarlama yapan yoktu. Biz başladık, şimdi en çok aranan servis biziz.",
  "Kayıt döneminde Instagram reklamı verdik, 1 haftada 40 veli aradı. Normalde bu sayıya 2 ayda ulaşıyorduk.",
  "Ürün çekimlerini yaptılar, sosyal medya içeriklerini hazırladılar. Gelenler 'Instagram'dan bakıp geldik' diyor.",
  "Küçük işletmeyiz, bütçemiz sınırlıydı. Ona göre bir paket hazırladılar, zorlamadılar. Sonuçlar gayet iyi.",
  "Önceki ajansımız KKTC pazarını bilmiyordu. BC burada, pazarı tanıyor, doğru kelimeleri seçiyor.",
  "WhatsApp'tan yazıyorum, genelde 10-15 dakikada dönüyorlar. İletişim konusunda sıkıntı yaşamadım hiç.",
  "Tur paketleri için Google reklamı ve landing page yaptırdık. Yurt dışından gelen rezervasyonlarda ciddi artış oldu.",
  "Sadece Instagram'dan satış yapıyorduk. Siteyi kurdular, SEO'sunu ayarladılar, artık Google'dan da sipariş alıyorum.",
  "Tanıtım videosu ve drone çekimi yaptırdık. Booking profilimize koyduk, tıklanma oranında belirgin artış oldu.",
  "Açıkçası dijital pazarlamaya pek inanmıyordum. İlk ay sonunda raporları görünce fikrimi değiştirdim.",
];

const QuoteIcon = () => (
  <svg className="w-8 h-8 text-secondary-300/20 mb-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
  </svg>
);

const TestimonialCard = ({ text }) => (
  <div className="flex-shrink-0 w-[320px] md:w-[380px] p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
    <QuoteIcon />
    <p className="text-white/70 text-sm leading-relaxed">{text}</p>
  </div>
);

const MarqueeRow = ({ items, reverse = false }) => (
  <div className="relative overflow-hidden">
    {/* Fade edges */}
    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-ink-900 to-transparent z-10 pointer-events-none" />
    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-ink-900 to-transparent z-10 pointer-events-none" />

    <div
      className="flex gap-5 animate-marquee"
      style={reverse ? { animationDirection: 'reverse' } : undefined}
    >
      {[...items, ...items].map((text, i) => (
        <TestimonialCard key={i} text={text} />
      ))}
    </div>
  </div>
);

const Testimonials = () => {
  const row1 = testimonials.slice(0, 10);
  const row2 = testimonials.slice(10, 20);

  return (
    <section className="py-24 md:py-32 bg-ink-900 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
            Müşteri Yorumları
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight">
            Sonuçlar{' '}
            <span className="text-secondary-300">kendini</span>{' '}
            gösteriyor
          </h2>
        </motion.div>
      </div>

      <div className="space-y-5">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
};

export default Testimonials;
