import React from 'react';
import useSEO from '../hooks/useSEO';

const TermsOfService = () => {
    useSEO({
        title: 'Kullanım Şartları | BC Creative Agency',
        description: 'BC Creative Agency web sitesi kullanım şartları ve koşulları.',
        canonical: 'https://bccreative.agency/kullanim-sartlari',
        noindex: true,
    });

    return (
        <div className="bg-white pt-32 pb-20">
            <div className="container mx-auto px-6 md:px-12 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold text-ink-900 mb-8">Kullanım Şartları</h1>
                <p className="text-ink-400 text-sm mb-12">Son güncelleme: 23 Nisan 2026</p>

                <div className="space-y-8 text-ink-700 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-ink-900 mb-3">1. Kabul</h2>
                        <p>bccreative.agency web sitesini kullanarak bu kullanım şartlarını kabul etmiş sayılırsınız. Bu şartları kabul etmiyorsanız siteyi kullanmayınız.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-ink-900 mb-3">2. Hizmet Tanımı</h2>
                        <p>BC Creative Agency, dijital pazarlama, SEO, Google Ads yönetimi, sosyal medya yönetimi, web tasarım, video prodüksiyon, drone çekim ve fotoğraf hizmetleri sunan bir dijital ajans olarak faaliyet göstermektedir. Bu web sitesi, hizmetlerimiz hakkında bilgi sunmak ve potansiyel müşterilerimizle iletişim kurmak amacıyla işletilmektedir.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-ink-900 mb-3">3. Fikri Mülkiyet</h2>
                        <p>Bu web sitesindeki tüm içerikler (metin, görsel, logo, tasarım, kod) BC Creative Agency'ye aittir ve telif hakkı ile korunmaktadır. İzinsiz kullanım, kopyalama veya dağıtım yasaktır.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-ink-900 mb-3">4. Sorumluluk Sınırı</h2>
                        <p>Web sitemizdeki bilgiler genel bilgilendirme amaçlıdır. İçeriğin doğruluğu ve güncelliği konusunda azami özen gösterilmekle birlikte, bilgilerin eksiksiz ve hatasız olduğu garanti edilmez. BC Creative Agency, sitedeki bilgilerin kullanımından doğabilecek zararlardan sorumlu tutulamaz.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-ink-900 mb-3">5. Dış Bağlantılar</h2>
                        <p>Sitemiz üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin içeriklerinden veya gizlilik uygulamalarından BC Creative Agency sorumlu değildir.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-ink-900 mb-3">6. Değişiklikler</h2>
                        <p>BC Creative Agency, bu kullanım şartlarını önceden bildirim yapmaksızın değiştirme hakkını saklı tutar. Güncellenmiş şartlar sitede yayınlandığı tarihten itibaren geçerli olur.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-ink-900 mb-3">7. Uygulanacak Hukuk</h2>
                        <p>Bu kullanım şartları Kuzey Kıbrıs Türk Cumhuriyeti yasalarına tabidir. Uyuşmazlık halinde Girne mahkemeleri yetkilidir.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-ink-900 mb-3">8. İletişim</h2>
                        <p>Bu şartlarla ilgili sorularınız için:<br />
                        BC Creative Agency<br />
                        E-posta: info@bccreative.agency<br />
                        Telefon: +90 548 875 54 61</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
