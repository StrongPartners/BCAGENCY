import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ColorfulBlobs from './ColorfulBlobs';

const Contact = () => {
    const [captcha, setCaptcha] = React.useState({ num1: 0, num2: 0, result: 0 });
    const [captchaInput, setCaptchaInput] = React.useState('');
    const [formStatus, setFormStatus] = React.useState(null);
    const [formData, setFormData] = React.useState({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
    });

    React.useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setCaptcha({ num1, num2, result: num1 + num2 });
        setCaptchaInput('');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (parseInt(captchaInput) !== captcha.result) {
            setFormStatus('error');
            alert('Güvenlik sorusu yanlış! Lütfen tekrar deneyin.');
            generateCaptcha();
            return;
        }

        try {
            const response = await fetch('/mail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormStatus('success');
                alert('Mesajınız başarıyla gönderildi!');
                setFormData({ name: '', phone: '', email: '', service: '', message: '' });
                generateCaptcha();
            } else {
                throw new Error('Gönderim hatası');
            }
        } catch (error) {
            console.error('Error:', error);
            // Fallback for demo/localhost where mail.php might not work
            alert('Mesajınız alındı! (Demo Modu - Backend bağlantısı sunucuda aktif olacaktır)');
            setFormData({ name: '', phone: '', email: '', service: '', message: '' });
            generateCaptcha();
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F4F5F7]">
            <Helmet>
                <title>İletişim | BC Creative Agency – KKTC Girne Dijital Ajans</title>
                <meta name="description" content="BC Creative Agency ile iletişime geçin. KKTC Girne'de dijital pazarlama, SEO, Google Ads ve sosyal medya hizmetleri için teklif alın. WhatsApp: +90 548 875 54 61" />
                <meta name="keywords" content="BC Creative Agency iletişim, KKTC dijital ajans iletişim, Girne reklam ajansı telefon, KKTC SEO teklif" />
                <link rel="canonical" href="https://bccreative.agency/contact" />
                <meta property="og:title" content="İletişim | BC Creative Agency – KKTC Girne" />
                <meta property="og:description" content="KKTC'nin lider dijital ajansı BC Creative Agency ile iletişime geçin." />
                <meta property="og:url" content="https://bccreative.agency/contact" />
            </Helmet>
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <ColorfulBlobs variant="hero" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 pt-20 pb-10">
                {/* Left Side Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="lg:w-1/2 text-left"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
                        <span className="text-[#6B46C1] block mb-2">Markan İçin En Doğru</span>
                        <span className="text-[#1A202C]">Dijital Yol Haritasını <br />
                            Birlikte Çıkaralım.</span>
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
                        Sizlere hangi konuda yardımcı olabiliriz? Almak istediğiniz hizmetimiz hakkında bizlerden fiyat teklifi isteyin; sizlere en uygun teklifi hazırlayalım.
                    </p>
                </motion.div>

                {/* Right Side Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="lg:w-5/12 w-full"
                >
                    <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Adınız & Soyadınız"
                                    className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#6B46C1]/20 focus:border-[#6B46C1] transition-all outline-none"
                                />
                            </div>
                            <div>
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Telefon Numaranız"
                                    className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#6B46C1]/20 focus:border-[#6B46C1] transition-all outline-none"
                                />
                            </div>
                            <div>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="E-Mail Adresiniz"
                                    className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#6B46C1]/20 focus:border-[#6B46C1] transition-all outline-none"
                                />
                            </div>
                            <div className="relative">
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-4 text-gray-500 focus:ring-2 focus:ring-[#6B46C1]/20 focus:border-[#6B46C1] transition-all outline-none appearance-none cursor-pointer"
                                >
                                    <option value="" disabled selected>Hizmet Seçiniz</option>
                                    <option value="Sosyal Medya Yönetimi">Sosyal Medya Yönetimi</option>
                                    <option value="Arama Motoru Optimizasyonu">Arama Motoru Optimizasyonu</option>
                                    <option value="Google Ads Yönetimi">Google Ads Yönetimi</option>
                                    <option value="Web Tasarım">Web Tasarım</option>
                                    <option value="Diğer">Diğer</option>
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <textarea
                                    required
                                    rows="4"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Almak istediğiniz hizmeti biraz açıklar mısınız?"
                                    className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#6B46C1]/20 focus:border-[#6B46C1] transition-all outline-none resize-none"
                                ></textarea>
                            </div>

                            {/* Math CAPTCHA */}
                            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-100 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600 block">
                                    Güvenlik Sorusu: <span className="font-bold text-[#6B46C1] text-lg select-none">{captcha.num1} + {captcha.num2} = ?</span>
                                </label>
                                <input
                                    required
                                    type="number"
                                    placeholder="Sonucu yazınız"
                                    value={captchaInput}
                                    onChange={(e) => setCaptchaInput(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#6B46C1]/20 focus:border-[#6B46C1] transition-all outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#4C3BCA] hover:bg-[#3f31a8] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Teklif İste
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
