import React, { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/* Showreel — küp dünyasının "gerçek" hali: stüdyoda küplerden kurulan BC. */
const Showreel = () => {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);
  const { lang } = useLanguage();
  const toggle = () => {
    const v = ref.current; if (!v) return;
    v.muted = !v.muted; setMuted(v.muted);
    if (!v.muted) { v.currentTime = 0; v.play(); }
  };
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary-300/80">Showreel</p>
          <p className="text-xs text-white/40">{lang === 'tr' ? 'Higgsfield ile üretildi · Girne stüdyosu' : 'Made with Higgsfield · Kyrenia studio'}</p>
        </div>
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black aspect-video">
          <video ref={ref} src="/showreel.mp4" poster="/showreel-poster.jpg" autoPlay muted loop playsInline preload="metadata"
            className="w-full h-full object-cover" />
          <button onClick={toggle} aria-label={muted ? 'Sesi aç' : 'Sesi kapat'}
            className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-black/55 backdrop-blur px-4 py-2.5 text-sm text-white hover:bg-black/75 transition-colors">
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {muted ? (lang === 'tr' ? 'Sesi aç' : 'Sound on') : (lang === 'tr' ? 'Sesi kapat' : 'Mute')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Showreel;
