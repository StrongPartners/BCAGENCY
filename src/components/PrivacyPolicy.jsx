import React from 'react';
import useSEO from '../hooks/useSEO';

const PrivacyPolicy = () => {
    useSEO({
        title: 'Gizlilik Politikası | BC Creative Agency',
        description: 'BC Creative Agency gizlilik politikası. Kişisel verilerinizin korunması hakkında bilgi.',
        canonical: 'https://bccreative.agency/gizlilik-politikasi',
        noindex: true,
    });

    return (
        <div className="bg-white pt-32 pb-20">
            <div className="container mx-auto px-6 md:px-12 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold text-ink-900 mb-8">Gizlilik Politikası</h1>
                <p className="text-ink-400 text-sm mb-12">Son güncelleme: 23 Nisan 2026</p>

                <div className="space-y-8 text-ink-700 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-ink-900 mb-3">1. Genel Bilgi</h2>
                        <p>BC Creative Agency ("Şirket"), bccreative.agency web sitesini ziyaret eden kullanıcıların gizliliğini korumayı taahhüt eder. Bu politika, topladığımız bilgileri, bunları nasıl kullandığımızı ve koruduğumuzu açıklar.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-ink-900 mb-3">2. Toplanan Bilgiler</h2>
                        <p>Sitemizi ziyaret ettiğinizde aşağıdaki bilgiler otomatik olarak toplanabilir:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>IP adresi ve tarayıcı bilgileri</li>
                            <li>Ziyaret edilen sayfalar ve ziyaret süresi</li>
                            <li>Yönlendiren web sitesi adresi</li>
                            <li>Google Analytics 4 aracılığıyla anonim kullanım verileri</li>
                        </ul>
                        <p className="mt-3">İletişim formları veya WhatsApp üzerinden bize ulaştığınızda paylaştığınız ad, e-posta, telefon numarası gibi kişisel bilgiler yalnızca talebinizi yanıtlamak amacıyla kullanılır.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-ink-900 mb-3">3. Çerezler (Cookies)</h2>
                        <p>Sitemiz, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek için çerezler kullanır. Google Analytics 4 çerezleri, anonim kullanım istatistikleri toplamak amacıyla kullanılmaktadır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-ink-900 mb-3">4. Verilerin Kullanımı</h2>
                        <p>Toplanan veriler aşağıdaki amaçlarla kullanılır:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Hizmet taleplerinizi yanıtlamak</li>
                            <li>Web sitemizi iyileştirmek</li>
                            <li>Site trafiğini analiz etmek</li>
                            <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-ink-900 mb-3">5. Üçüncü Taraflarla Paylaşım</h2>
                        <p>Kişisel verileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz. Google Analytics, anonim ve toplu istatistik verileri toplamak için kullanılmaktadır.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-ink-900 mb-3">6. Veri Güvenliği</h2>
                        <p>Sitemiz SSL sertifikası ile korunmaktadır. Kişisel verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemleri uygulanmaktadır.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-ink-900 mb-3">7. Haklarınız</h2>
                        <p>KVKK ve GDPR kapsamında kişisel verilerinizle ilgili erişim, düzeltme, silme ve itiraz haklarına sahipsiniz. Bu haklarınızı kullanmak için info@bccreative.agency adresine başvurabilirsiniz.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-ink-900 mb-3">8. İletişim</h2>
                        <p>BC Creative Agency<br />
                        Alsancak, Emtan West Park No:4, Girne, KKTC<br />
                        E-posta: info@bccreative.agency<br />
                        Telefon: +90 548 875 54 61</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
