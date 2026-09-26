import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/* Açılış: showreel oturum başına bir kez oynar; "Siteye devam et" ile ya da video bitince kapanır. */
const KEY = 'bc_intro_seen';
// Telefonda 720p, masaüstünde 1080p yüksek bitrate
const pickSrc = () => (window.matchMedia('(max-width: 820px)').matches ? '/showreel-720.mp4' : '/showreel.mp4');

const Intro = () => {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const ref = useRef(null);
  const { lang } = useLanguage();

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(KEY) === '1'; } catch { /* storage kapalı */ }
    if (!seen && !navigator.webdriver) setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const close = () => {
    try { sessionStorage.setItem(KEY, '1'); } catch { /* yok say */ }
    setOpen(false);
  };
  const toggleSound = () => {
    const v = ref.current; if (!v) return;
    v.muted = !v.muted; setMuted(v.muted);
    if (!v.muted) v.play();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div key="intro" className="on-dark fixed inset-0 z-[100] bg-black"
          initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}>
          <video ref={ref} src={pickSrc()} poster="/showreel-poster.jpg" autoPlay muted playsInline preload="auto"
            onEnded={close} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-8 md:bottom-12 flex flex-col items-center gap-4 px-6">
            <motion.button onClick={close} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }}
              className="group inline-flex items-center gap-3 rounded-full bg-white text-ink-900 font-semibold px-8 py-4 shadow-2xl hover:bg-secondary-100 transition-colors">
              {lang === 'tr' ? 'Siteye devam et' : 'Continue to site'}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
          <button onClick={toggleSound} aria-label={muted ? 'Sesi aç' : 'Sesi kapat'}
            className="absolute top-5 right-5 md:top-8 md:right-8 inline-flex items-center gap-2 rounded-full bg-black/50 backdrop-blur px-4 py-2.5 text-sm text-white hover:bg-black/70 transition-colors">
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {muted ? (lang === 'tr' ? 'Sesi aç' : 'Sound on') : (lang === 'tr' ? 'Sesi kapat' : 'Mute')}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Intro;
