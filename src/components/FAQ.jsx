import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const faqData = {
  tr: [
    {
      question: "KKTC'de SEO çalışması ne kadar sürede sonuç verir?",
      answer: "Genellikle 2–4 ay içinde ilk organik trafik artışı görülür. Kalıcı üst sıralar için 4–6 ay sürekli çalışma gerekiyor. KKTC pazarı global pazara göre daha düşük rekabetli olduğu için doğru stratejiyle bu süreç kısalabilir."
    },
    {
      question: "Aylık sosyal medya yönetimi paketleriniz nelerdir?",
      answer: "Paketlerimiz işletmenizin büyüklüğüne göre kişiselleştirilir. Starter, Pro ve Kurumsal paketlerde içerik üretimi, görsel tasarım, gönderi takvimi, reklam yönetimi ve aylık raporlama bulunur. Fiyat teklifi için WhatsApp'tan yazın."
    },
    {
      question: "Google Ads'te minimum ne kadar bütçe ile başlayabilirim?",
      answer: "Günlük 50–100 TL gibi düşük bütçelerle başlanabilir. Ölçülebilir sonuçlar için aylık 1.500–3.000 TL reklam bütçesi öneriyoruz. Ajans yönetim ücreti bu bütçenin dışındadır. İlk ay ücretsiz kampanya analizi sunuyoruz."
    },
    {
      question: "Web sitesi tasarımı ne kadar sürer ve fiyatlar nasıl?",
      answer: "Kurumsal web projeleri 2–4 hafta içinde teslim edilir. Fiyatlar; site kapsamı, sayfa sayısı ve e-ticaret özelliklerine göre değişir. Tek seferlik tasarım+geliştirme paketi olarak sunulur. Ücretsiz keşif görüşmesi için bize ulaşın."
    },
    {
      question: "Sadece KKTC'deki işletmelere mi hizmet veriyorsunuz?",
      answer: "Hayır. KKTC merkezliyiz ama Türkiye ve Avrupa'daki işletmelere de hizmet veriyoruz. Özellikle KKTC'yi hedefleyen Türkiyeli işletmeler ve yurt dışı pazarlara açılmak isteyen KKTC markaları için özel stratejiler geliştiriyoruz."
    },
    {
      question: "Çalışmaya başlamak için ne yapmalıyım?",
      answer: "Ücretsiz strateji görüşmesi için WhatsApp (+90 548 875 54 61) veya e-posta (info@bccreative.agency) üzerinden bize ulaşın. İlk görüşmede işletmenizi dinleyip size özel bir yol haritası sunuyoruz. Hiçbir bağlayıcılığı yok."
    },
    {
      question: "Hangi sektörlerde deneyiminiz var?",
      answer: "KKTC'nin önde gelen sektörlerinde geniş deneyime sahibiz: Turizm & Otelcilik, Gayrimenkul, Restoran & F&B, Eğitim, Sağlık, Perakende & E-ticaret. Her sektörün dinamiklerini ve KKTC pazarındaki fırsatları iyi biliyoruz."
    },
    {
      question: "Yaptığınız çalışmaların raporlamasını nasıl yapıyorsunuz?",
      answer: "Her ay detaylı performans raporu sunuyoruz: Google Analytics trafik verileri, anahtar kelime sıralama değişimleri, sosyal medya istatistikleri ve sonraki ayın aksiyon planı. Raporları WhatsApp veya e-posta ile paylaşıyoruz."
    },
    {
      question: "Sözleşme süresi ne kadar? Kilitli kalır mıyım?",
      answer: "Aylık bazda çalışıyoruz. Minimum 3 aylık başlangıç öneriyoruz ama zorunlu değil. 3. ayın sonundan itibaren her ay yenilenebilir ya da iptal edilebilir. Uzun dönemli sözleşmeler için özel indirimler var."
    },
  ],
  en: [
    {
      question: "How long does SEO take to show results in TRNC?",
      answer: "Typically you'll see the first organic traffic lift within 2–4 months. For sustained top rankings, 4–6 months of consistent work is needed. Since the TRNC market has lower competition than global markets, the right strategy can shorten this."
    },
    {
      question: "What are your monthly social media packages?",
      answer: "Our packages are customized to your business size. Starter, Pro and Enterprise include content creation, visual design, posting schedule, ad management and monthly reporting. Message us on WhatsApp for pricing."
    },
    {
      question: "What's the minimum Google Ads budget to start?",
      answer: "You can start with €3–5/day. For measurable results we recommend €100–200/month in ad spend. Agency management fees are separate. The first month includes a free campaign analysis."
    },
    {
      question: "How long does a website take and what does it cost?",
      answer: "Corporate sites are delivered in 2–4 weeks. Price depends on scope, page count and e-commerce features. Offered as a one-time design+development package. Contact us for a free discovery call."
    },
    {
      question: "Do you only serve TRNC businesses?",
      answer: "No. We're TRNC-based but also serve businesses in Turkey and Europe. We build special strategies for Turkish businesses targeting TRNC and for TRNC brands expanding to foreign markets."
    },
    {
      question: "How do I get started?",
      answer: "Message us on WhatsApp (+90 548 875 54 61) or email (info@bccreative.agency) for a free strategy call. We'll listen to your business, goals and budget, then give you a tailored roadmap. No strings attached."
    },
    {
      question: "What industries do you work with?",
      answer: "We have extensive experience in TRNC's leading sectors: Tourism & Hospitality, Real Estate, Restaurants & F&B, Education, Healthcare, Retail & E-commerce. We know the dynamics of each and the opportunities in the TRNC market."
    },
    {
      question: "How do you report your work?",
      answer: "Every month we share a detailed performance report: Google Analytics traffic, keyword ranking changes, social media stats, Google Ads results and the action plan for the next month. Sent via WhatsApp or email."
    },
    {
      question: "What's the contract length? Am I locked in?",
      answer: "We work monthly. A 3-month starter period is recommended but not required. After the 3rd month it renews or cancels each month. Long-term contracts get special discounts."
    },
  ]
};

const FAQItem = ({ question, answer, index, tone }) => {
  const [isOpen, setIsOpen] = useState(false);
  const shadowMap = {
    brand: 'shadow-sticker-brand',
    coral: 'shadow-sticker-coral',
    mint:  'shadow-sticker-mint',
    sun:   'shadow-sticker-sun',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className={`bg-white border-2 border-ink-900 rounded-2xl overflow-hidden ${shadowMap[tone]}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-ink-50 transition-colors"
      >
        <span className="font-black text-ink-900 text-base md:text-lg">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-ink-900 text-white flex items-center justify-center"
        >
          <Plus size={20} strokeWidth={3} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-6 pb-6 text-ink-700 text-base leading-relaxed font-medium border-t border-ink-100 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const { lang, t } = useLanguage();
  const faqs = faqData[lang];
  const tones = ['brand', 'coral', 'mint', 'sun'];

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden" id="faq">
      {/* Bg accents */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-sun-200 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-mint-200 rounded-full blur-3xl opacity-40" />

      <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-sun-200 border-2 border-ink-900 text-ink-900 font-black text-xs px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider rotate-pos-2">
            {t('faq_label')}
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-ink-900 leading-none tracking-tight">
            {t('faq_title')}
          </h2>
          <p className="mt-4 text-ink-700 text-lg md:text-xl font-medium">
            {t('faq_subtitle')}
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
              tone={tones[index % tones.length]}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-ink-900 rounded-3xl p-10 border-2 border-ink-900 shadow-sticker-sun"
        >
          <p className="text-white font-bold text-lg mb-5">
            {t('faq_no_answer')}
          </p>
          <button
            onClick={() => window.open('https://wa.me/905488755461', '_blank')}
            className="inline-flex items-center gap-2 bg-mint-400 text-ink-900 px-8 py-3 rounded-full font-black text-base border-2 border-ink-900 hover:bg-mint-500 transition-colors"
          >
            {t('faq_whatsapp')}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
