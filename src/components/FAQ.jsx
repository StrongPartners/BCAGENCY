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

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className="border-b border-ink-100"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group w-full flex items-center justify-between gap-4 py-6 text-left"
      >
        <span className="font-semibold text-ink-900 text-base md:text-lg">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-ink-400"
        >
          <Plus size={20} strokeWidth={2} />
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
            <div className="pb-6 text-ink-500 text-base leading-relaxed">
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

  return (
    <section className="py-24 md:py-32 bg-white" id="faq">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-6">
            {t('faq_label')}
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-ink-900 leading-none tracking-tight">
            {t('faq_title')}
          </h2>
          <p className="mt-4 text-ink-500 text-lg md:text-xl">
            {t('faq_subtitle')}
          </p>
        </motion.div>

        <div>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-ink-500 mb-4">
            {t('faq_no_answer')}
          </p>
          <button
            onClick={() => window.open('https://wa.me/905488755461', '_blank')}
            className="inline-flex items-center gap-2 bg-ink-900 text-white px-8 py-3 rounded-full font-medium text-base hover:bg-ink-800 transition-colors"
          >
            {t('faq_whatsapp')}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
