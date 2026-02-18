import React from 'react';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0A0A0A] text-gray-400 py-16 text-sm">
            <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Brand Column */}
                <div>
                    <div className="mb-6">
                        <img
                            src="/logo-white.png"
                            alt="BC MEDYA"
                            className="h-10 w-auto object-contain"
                        />
                    </div>
                    <p className="leading-relaxed mb-6 max-w-xs text-gray-400 font-normal tracking-normal">
                        BC Medya, dijital pazarlama ve reklam alanında öncü bir ajansdır. Yaratıcı yaklaşımı ve uzman ekibiyle markanızı dijital dünyada öne çıkarmak için en etkili stratejileri sunar. Dijitalin dalgalarında sıçrayın, BC Medya ile başarıya ulaşın.
                    </p>
                </div>

                {/* Contact Column */}
                <div>
                    <h3 className="text-white text-lg font-bold mb-6">Bize Ulaşın</h3>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                            <Phone size={18} className="text-white shrink-0" />
                            <a href="tel:+905488755461" className="hover:text-white transition-colors cursor-pointer">+90 548 875 54 61</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail size={18} className="text-white shrink-0" />
                            <a href="mailto:info@bcmedya.com" className="hover:text-white transition-colors">info@bcmedya.com</a>
                        </li>
                    </ul>
                </div>

                {/* Addresses Column */}
                <div>
                    <h3 className="text-white text-lg font-bold mb-6">Adres</h3>
                    <ul className="space-y-6">
                        <li className="flex gap-3">
                            <MapPin size={20} className="text-white shrink-0 mt-1" />
                            <span>Kıbrıs / Girne</span>
                        </li>
                    </ul>
                </div>

                {/* Social Media Column */}
                <div>
                    <h3 className="text-white text-lg font-bold mb-6">Sosyal Medya</h3>
                    <a href="#" className="flex items-center gap-3 hover:text-white transition-colors group">
                        <Instagram size={20} className="text-white group-hover:text-brand-400 transition-colors" />
                        <span>Instagram'da takip edin</span>
                    </a>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
                © 2017 – 2026 BC Medya Dijital Reklam Pazarlama İç ve Dış Tic. LTD. ŞTİ.
            </div>
        </footer>
    );
};

export default Footer;
