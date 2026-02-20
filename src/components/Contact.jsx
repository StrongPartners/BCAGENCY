import React from 'react';
import useSEO from '../hooks/useSEO';
import { motion } from 'framer-motion';
import ColorfulBlobs from './ColorfulBlobs';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { t } = useLanguage();
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
            alert(t('contact_captcha_error'));
            generateCaptcha();
            return;
        }

        try {
            const response = await fetch('/mail.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormStatus('success');
                alert(t('contact_success'));
                setFormData({ name: '', phone: '', email: '', service: '', message: '' });
                generateCaptcha();
            } else {
                throw new Error('Submit error');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(t('contact_demo'));
            setFormData({ name: '', phone: '', email: '', service: '', message: '' });
            generateCaptcha();
        }
    };

    useSEO({
        title: 'İletişim | BC Creative Agency - KKTC Girne Dijital Ajans',
        description: 'BC Creative Agency ile iletişime geçin. KKTC Girne\'de dijital pazarlama, SEO, Google Ads ve sosyal medya hizmetleri için teklif alın. WhatsApp: +90 548 875 54 61',
        keywords: 'BC Creative Agency iletişim, KKTC dijital ajans iletişim, Girne reklam ajansı telefon, KKTC SEO teklif',
        canonical: 'https://bccreative.agency/contact',
        ogTitle: 'İletişim | BC Creative Agency - KKTC Girne',
        ogDescription: 'KKTC\'nin lider dijital ajansı BC Creative Agency ile iletişime geçin.',
        ogUrl: 'https://bccreative.agency/contact',
    });

    const contactServices = t('contact_services');

    return (
        <>
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F4F5F7]">
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
                        <span className="text-[#6B46C1] block mb-2">{t('contact_heading_1')}</span>
                        <span className="text-[#1A202C]">{t('contact_heading_2')} <br />
                            {t('contact_heading_3')}</span>
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
                        {t('contact_sub')}
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
                                    placeholder={t('contact_name')}
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
                                    placeholder={t('contact_phone')}
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
                                    placeholder={t('contact_email')}
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
                                    <option value="" disabled>{t('contact_service_placeholder')}</option>
                                    {contactServices.map((svc, i) => (
                                        <option key={i} value={svc}>{svc}</option>
                                    ))}
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
                                    placeholder={t('contact_message')}
                                    className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#6B46C1]/20 focus:border-[#6B46C1] transition-all outline-none resize-none"
                                ></textarea>
                            </div>

                            {/* Math CAPTCHA */}
                            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-100 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600 block">
                                    {t('contact_captcha')} <span className="font-bold text-[#6B46C1] text-lg select-none">{captcha.num1} + {captcha.num2} = ?</span>
                                </label>
                                <input
                                    required
                                    type="number"
                                    placeholder={t('contact_captcha_placeholder')}
                                    value={captchaInput}
                                    onChange={(e) => setCaptchaInput(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#6B46C1]/20 focus:border-[#6B46C1] transition-all outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#4C3BCA] hover:bg-[#3f31a8] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                {t('contact_submit')}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>

        {/* Map + Address Section */}
        <div className="w-full bg-white py-16 px-4 md:px-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Address Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">
                            {t('contact_visit')} <span className="text-brand-600">{t('contact_visit_2')}</span>
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-brand-600/10 rounded-xl flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">{t('contact_address_label')}</h3>
                                    <p className="text-gray-600">{t('contact_address_val')}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-brand-600/10 rounded-xl flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">{t('contact_phone_label')}</h3>
                                    <a href="tel:+905488755461" className="text-gray-600 hover:text-brand-600 transition-colors">+90 548 875 54 61</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-brand-600/10 rounded-xl flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">{t('contact_email_label')}</h3>
                                    <a href="mailto:info@bccreative.agency" className="text-gray-600 hover:text-brand-600 transition-colors">info@bccreative.agency</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-brand-600/10 rounded-xl flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">{t('contact_hours_label')}</h3>
                                    <p className="text-gray-600">{t('contact_hours_val')}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => window.open(t('contact_map_url'), '_blank')}
                            className="mt-8 bg-brand-600 text-white font-bold px-8 py-3 rounded-full hover:bg-brand-700 transition-all shadow-lg hover:-translate-y-0.5"
                        >
                            {t('contact_maps_btn')}
                        </button>
                    </motion.div>

                    {/* Map Embed — Fatih Sk, Aşağı Girne Mah. Ardem 11 Apt. Kat:3 No:14 */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 h-80 lg:h-96"
                    >
                        <iframe
                            title={t('contact_map_title')}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.8!2d33.3184!3d35.3421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de1763498dfb09%3A0x0!2sFatih+Sk%2C+A%C5%9Fa%C4%9F%C4%B1+Girne+Mahallesi%2C+Girne!5e0!3m2!1str!2str!4v1700000000001"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Contact;
