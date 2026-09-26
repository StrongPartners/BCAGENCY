import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/*
 * Açılış: showreel oturum başına bir kez oynar; "Siteye devam et" ile ya da video bitince kapanır.
 * Kapanırken o anki kare küplere bölünür ve küpler dağılarak siteyi açar.
 */
const KEY = 'bc_intro_seen';
// Dik tutulan ekranda dikey (9:16) kurgu, yatayda telefonda 720p, masaüstünde 1080p
const isPortrait = () => window.matchMedia('(orientation: portrait) and (max-width: 900px)').matches;
const pickSrc = () => (isPortrait() ? '/showreel-vertical.mp4' : window.matchMedia('(max-width: 820px)').matches ? '/showreel-720.mp4' : '/showreel.mp4');
const pickPoster = () => (isPortrait() ? '/showreel-poster-vertical.jpg' : '/showreel-poster.jpg');

const Intro = () => {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [tiles, setTiles] = useState(null);
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

  const finish = () => {
    try { sessionStorage.setItem(KEY, '1'); } catch { /* yok say */ }
    setOpen(false);
  };

  // O anki kareyi yakala, ekranı küp ızgarasına böl
  const close = () => {
    if (tiles) return;
    const v = ref.current;
    const W = window.innerWidth, H = window.innerHeight;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let url = null;
    try {
      if (!reduce && v && v.videoWidth) {
        const c = document.createElement('canvas'); c.width = W; c.height = H;
        const k = Math.max(W / v.videoWidth, H / v.videoHeight), dw = v.videoWidth * k, dh = v.videoHeight * k;
        c.getContext('2d').drawImage(v, (W - dw) / 2, (H - dh) / 2, dw, dh);
        url = c.toDataURL('image/jpeg', 0.82);
      }
    } catch { url = null; }
    if (!url) { finish(); return; }
    v.pause();
    const cols = W < 700 ? 7 : 14, size = Math.ceil(W / cols), rows = Math.ceil(H / size);
    const list = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const cx = (c + 0.5) / cols - 0.5, cy = (r + 0.5) / rows - 0.5;
      list.push({ id: `${r}-${c}`, x: c * size, y: r * size, delay: Math.hypot(cx, cy) * 0.55 + Math.random() * 0.18, rot: (Math.random() - 0.5) * 90, dy: 60 + Math.random() * 140 });
    }
    setTiles({ url, size, W, H, list });
    setTimeout(finish, 1500);
  };
  const toggleSound = () => {
    const v = ref.current; if (!v) return;
    v.muted = !v.muted; setMuted(v.muted);
    if (!v.muted) v.play();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div key="intro" className={`on-dark fixed inset-0 z-[100] ${tiles ? '' : 'bg-black'}`}
          initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          {tiles ? (
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              {tiles.list.map((t) => (
                <motion.span key={t.id} className="absolute block"
                  style={{ left: t.x, top: t.y, width: tiles.size + 1, height: tiles.size + 1, backgroundImage: `url(${tiles.url})`, backgroundSize: `${tiles.W}px ${tiles.H}px`, backgroundPosition: `-${t.x}px -${t.y}px` }}
                  initial={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
                  animate={{ scale: [1, 0.86, 0], rotate: t.rot, y: t.dy, opacity: [1, 1, 0] }}
                  transition={{ delay: t.delay, duration: 0.7, ease: [0.5, 0, 0.75, 0] }} />
              ))}
            </div>
          ) : (
          <>
          <video ref={ref} src={pickSrc()} poster={pickPoster()} autoPlay muted playsInline preload="auto"
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
          </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Intro;
