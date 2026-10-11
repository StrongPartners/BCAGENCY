import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Instagram, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WA_URL = 'https://wa.me/905488321919?text=Merhaba%2C%20dijital%20pazarlama%20hizmetleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.';

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Sağ altta iletişim dock'u: tek düğme açılınca WhatsApp, telefon ve Instagram sırayla yukarı çıkar.
const ContactDock = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();
  const L = (tr, en) => (lang === 'tr' ? tr : en);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const channels = [
    { key: 'wa', label: 'WhatsApp', href: WA_URL, bg: 'bg-[#25D366]', icon: <WhatsAppIcon className="w-6 h-6 fill-white" /> },
    { key: 'tel', label: L('Hemen ara', 'Call us'), href: 'tel:+905488321919', bg: 'bg-brand-600', icon: <Phone size={22} className="text-white" /> },
    { key: 'ig', label: 'Instagram', href: 'https://www.instagram.com/bccreative.agency/', bg: 'bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]', icon: <Instagram size={22} className="text-white" /> },
  ];
  const n = channels.length;

  if (!isVisible) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <ul className="flex flex-col items-end gap-3" aria-hidden={!open}>
        {channels.map((c, i) => (
          <li
            key={c.key}
            className="flex items-center gap-3 transition-all duration-300"
            style={{
              transitionDelay: open ? `${(n - 1 - i) * 60}ms` : `${i * 40}ms`,
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.6)',
              pointerEvents: open ? 'auto' : 'none',
            }}
          >
            <span className="hidden sm:block bg-white text-ink-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow">{c.label}</span>
            <a
              href={c.href}
              target={c.key === 'tel' ? undefined : '_blank'}
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              aria-label={c.label}
              className={`on-dark w-12 h-12 rounded-full shadow-lg flex items-center justify-center ${c.bg} hover:scale-105 transition-transform`}
            >
              {c.icon}
            </a>
          </li>
        ))}
      </ul>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? L('Kapat', 'Close') : L('Bize ulaşın', 'Contact us')}
        className="on-dark relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-[#25D366] cursor-pointer"
      >
        {!open && <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping motion-reduce:animate-none" />}
        <span className={`relative z-10 transition-transform duration-300 ${open ? 'rotate-[135deg]' : ''}`}>
          {open ? <X size={26} className="text-white -rotate-[135deg]" /> : <MessageCircle size={26} className="text-white" />}
        </span>
      </motion.button>
    </div>
  );
};

export default ContactDock;
