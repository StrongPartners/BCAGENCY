import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const faqData = {
  tr: [
    {
      question: "KKTC'de SEO çalışması ne kadar sürede sonuç verir?",
      answer: "KKTC'de SEO çalışmalarında, rekabet seviyesine ve hedeflenen anahtar kelimelere bağlı olarak genellikle 2–4 ay içinde ilk organik trafik artışı görülür. Kalıcı ve sürdürülebilir üst sıra sonuçları için 4–6 aylık düzenli çalışma gerekmektedir. KKTC pazarı global pazara kıyasla düşük rekabetli olduğundan, doğru stratejiyle bu süreç çok daha kısa olabilir."
    },
    {
      question: "Aylık sosyal medya yönetimi paketleriniz nelerdir?",
      answer: "Sosyal medya yönetimi paketlerimiz işletmenizin büyüklüğüne ve hedeflerine göre kişiselleştirilmektedir. Starter, Pro ve Kurumsal paketlerimiz; içerik üretimi, görsel tasarım, gönderi takvimi, reklam yönetimi ve aylık raporlama içermektedir. Detaylı fiyat teklifi için WhatsApp üzerinden bizimle iletişime geçebilirsiniz."
    },
    {
      question: "Google Ads'te minimum ne kadar bütçe ile başlayabilirim?",
      answer: "KKTC'de Google Ads kampanyasına günlük 50–100 TL gibi düşük bütçelerle başlamak mümkündür. Ancak ölçülebilir ve optimize edilebilir sonuçlar için aylık 1.500–3.000 TL reklam bütçesi öneriyoruz. Ajans yönetim ücreti bu bütçenin dışındadır. İlk ay ücretsiz kampanya analizi sunuyoruz."
    },
    {
      question: "Web sitesi tasarımı ne kadar sürer ve fiyatlar nasıl?",
      answer: "Kurumsal web sitesi projelerimiz genellikle 2–4 hafta içinde teslim edilmektedir. Fiyatlar; site kapsamı, sayfa sayısı, e-ticaret özelliği ve özel entegrasyonlara göre değişmektedir. Tek seferlik tasarım+geliştirme paketi olarak sunulmaktadır. Ücretsiz keşif görüşmesi için bize ulaşın."
    },
    {
      question: "Sadece KKTC'deki işletmelere mi hizmet veriyorsunuz?",
      answer: "Hayır. KKTC merkezli olmakla birlikte, Türkiye ve Avrupa'daki işletmelere de dijital pazarlama hizmetleri sunuyoruz. Özellikle KKTC'yi hedefleyen Türkiyeli işletmeler ve KKTC'de yabancı pazara açılmak isteyen firmalar için özel stratejiler geliştiriyoruz."
    },
    {
      question: "Çalışmaya başlamak için ne yapmalıyım?",
      answer: "Ücretsiz strateji görüşmesi için WhatsApp (+90 548 875 54 61) veya e-posta (info@bccreative.agency) üzerinden bizimle iletişime geçmeniz yeterlidir. İlk görüşmede işletmenizi, hedeflerinizi ve bütçenizi dinleyerek size özel bir dijital pazarlama yol haritası sunuyoruz. Herhangi bir bağlayıcılık olmaksızın ücretsizdir."
    },
    {
      question: "Hangi sektörlerde deneyiminiz var?",
      answer: "BC Creative Agency olarak KKTC'nin önde gelen sektörlerinde geniş deneyime sahibiz: Turizm & Otelcilik, Gayrimenkul & İnşaat, Restoran & F&B, Eğitim & Üniversiteler, Sağlık & Klinikler, Perakende & E-ticaret. Her sektörün kendine özgü dinamiklerini ve KKTC pazarındaki fırsatları çok iyi biliyoruz."
    },
    {
      question: "Yaptığınız çalışmaların raporlamasını nasıl yapıyorsunuz?",
      answer: "Her ay detaylı performans raporu sunuyoruz. Raporlarımızda: Google Analytics trafik verileri, anahtar kelime sıralama değişimleri, sosyal medya etkileşim istatistikleri, Google Ads kampanya sonuçları ve bir sonraki ay için aksiyon planı yer almaktadır. Raporları WhatsApp veya e-posta ile paylaşıyor, talep halinde online görüşme de yapabiliyoruz."
    },
    {
      question: "Google Business Profile kurulumu ve yönetimi yapıyor musunuz?",
      answer: "Evet. Google Business Profile (Google Haritalar) kurulumu, optimizasyonu ve aylık yönetimi sunuyoruz. Profil oluşturma, fotoğraf ekleme, hizmet tanımlamaları, gönderi paylaşımı ve yorum yönetimi dahildir. KKTC'de yerel aramalarda üst sıralara çıkmak için Google Business Profile en kritik araçlardan biridir."
    },
    {
      question: "Sözleşme süresi ne kadar? Kilitli kalır mıyım?",
      answer: "Aylık bazda çalışıyoruz. Minimum 3 aylık başlangıç dönemi öneriyoruz çünkü SEO ve sosyal medya çalışmaları ilk ayda somut sonuç vermez; ancak zorunlu değildir. 3. ayın sonundan itibaren her ay yenilenebilir ya da iptal edilebilir. Uzun dönemli sözleşmeler için özel indirimler mevcuttur."
    }
  ],
  en: [
    {
      question: "How long does SEO take to show results in TRNC?",
      answer: "In Northern Cyprus, you can typically see the first organic traffic increases within 2–4 months, depending on competition level and target keywords. For sustainable top rankings, 4–6 months of consistent work is required. Since the TRNC market has lower competition compared to global markets, the right strategy can yield results much faster."
    },
    {
      question: "What social media management packages do you offer?",
      answer: "Our social media management packages are customized based on your business size and goals. Our Starter, Pro, and Enterprise packages include content creation, visual design, posting schedule, ad management, and monthly reporting. Contact us via WhatsApp for detailed pricing."
    },
    {
      question: "What is the minimum budget to start Google Ads?",
      answer: "In TRNC, it's possible to start a Google Ads campaign with as little as €3–5/day. However, for measurable and optimizable results, we recommend a monthly ad budget of €100–200. Agency management fees are separate. We offer a free campaign analysis for the first month."
    },
    {
      question: "How long does web design take and what are the prices?",
      answer: "Our corporate website projects are generally delivered within 2–4 weeks. Prices vary depending on the scope of the site, number of pages, e-commerce features, and custom integrations. It's offered as a one-time design+development package. Contact us for a free discovery call."
    },
    {
      question: "Do you only serve businesses in TRNC?",
      answer: "No. While we're TRNC-based, we also provide digital marketing services to businesses in Turkey and Europe. We develop special strategies especially for Turkish businesses targeting TRNC and for TRNC companies looking to expand to foreign markets."
    },
    {
      question: "How do I get started?",
      answer: "Simply contact us via WhatsApp (+90 548 875 54 61) or email (info@bccreative.agency) for a free strategy consultation. In the first meeting, we listen to your business, goals, and budget and present a customized digital marketing roadmap. It's free with no obligations."
    },
    {
      question: "What industries do you have experience in?",
      answer: "BC Creative Agency has extensive experience in TRNC's leading sectors: Tourism & Hospitality, Real Estate & Construction, Restaurants & F&B, Education & Universities, Healthcare & Clinics, Retail & E-commerce. We know the unique dynamics of each sector and the opportunities in the TRNC market very well."
    },
    {
      question: "How do you report on your work?",
      answer: "We provide detailed performance reports every month. Our reports include: Google Analytics traffic data, keyword ranking changes, social media engagement statistics, Google Ads campaign results, and an action plan for the next month. Reports are shared via WhatsApp or email, and online meetings can be arranged on request."
    },
    {
      question: "Do you set up and manage Google Business Profile?",
      answer: "Yes. We offer Google Business Profile (Google Maps) setup, optimization, and monthly management. This includes profile creation, photo addition, service descriptions, post sharing, and review management. Google Business Profile is one of the most critical tools for ranking in local searches in TRNC."
    },
    {
      question: "What is the contract duration? Am I locked in?",
      answer: "We work on a monthly basis. We recommend a minimum 3-month starter period because SEO and social media work doesn't yield tangible results in the first month — but it's not mandatory. From the end of the 3rd month, it can be renewed or cancelled every month. Special discounts are available for long-term contracts."
    }
  ]
};

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border border-gray-200 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-[15px] md:text-[16px] pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center"
        >
          <ChevronDown size={18} className="text-brand-600" />
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
            <div className="px-6 pb-6 text-gray-600 text-[15px] leading-relaxed border-t border-gray-100 pt-4">
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
    <section className="py-20 md:py-28 bg-gray-50" id="faq">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-brand-50 text-brand-600 text-sm font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-wider">
            {t('faq_label')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            {t('faq_title')}
          </h2>
          <p className="text-gray-500 text-lg">
            {t('faq_subtitle')}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
        >
          <p className="text-gray-600 mb-4 text-lg">
            {t('faq_no_answer')}
          </p>
          <button
            onClick={() => window.open('https://wa.me/905488755461', '_blank')}
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#20bd5a] transition-colors shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t('faq_whatsapp')}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
