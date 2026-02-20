import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // 2 saniye sonra göster
    const timer = setTimeout(() => setIsVisible(true), 2000);
    // 5 saniye sonra tooltip göster
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
      // 4 saniye sonra tooltip'i gizle
      setTimeout(() => setShowTooltip(false), 4000);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 max-w-[200px] text-right"
              >
                <p className="text-gray-800 font-semibold text-sm">Merhaba! 👋</p>
                <p className="text-gray-500 text-xs mt-0.5">Ücretsiz danışmanlık için yazın</p>
                {/* Sağ ok */}
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ana buton */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200 }}
            onClick={() => window.open('https://wa.me/905488755461?text=Merhaba%2C%20dijital%20pazarlama%20hizmetleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.', '_blank')}
            className="w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center cursor-pointer relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {/* Ping animasyonu */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white relative z-10">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppButton;
