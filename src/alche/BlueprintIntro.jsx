import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Açılış: siyah zemin üzerinde "teknik çizim" gibi çizilen kılavuz çizgiler,
 * ortada BC logosu maskeyle beliriyor, altında monospace slogan.
 * ~2.6 sn sonra onDone çağrılır.
 */
const LINES = [
  // dikey / yatay kılavuzlar (x1,y1,x2,y2)
  [300, 0, 300, 900], [1140, 0, 1140, 900], [0, 300, 1440, 300], [0, 600, 1440, 600],
  // çaprazlar
  [420, -40, 1060, 940], [380, -40, 1020, 940], [1020, -40, 380, 940],
  [0, 560, 1440, 560], [0, 580, 1440, 580],
];

const BlueprintIntro = ({ onDone, tagline }) => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 900);
    const t2 = setTimeout(() => setPhase(2), 1700);
    const t3 = setTimeout(onDone, 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <motion.div className="fixed inset-0 z-[9999] bg-[#050506] overflow-hidden" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <g stroke="rgba(255,255,255,.22)" strokeWidth="1" pathLength="1">
          {LINES.map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} pathLength="1" className="bp-draw" style={{ animationDelay: `${i * 90}ms` }} />
          ))}
          <circle cx="720" cy="450" r="170" pathLength="1" className="bp-draw" strokeDasharray="2 6" style={{ animationDelay: '600ms' }} />
          <circle cx="720" cy="450" r="260" pathLength="1" className="bp-draw" strokeDasharray="2 6" style={{ animationDelay: '750ms' }} />
          <line x1="720" y1="250" x2="720" y2="650" pathLength="1" className="bp-draw" strokeDasharray="2 6" style={{ animationDelay: '900ms' }} />
          <line x1="520" y1="450" x2="920" y2="450" pathLength="1" className="bp-draw" strokeDasharray="2 6" style={{ animationDelay: '900ms' }} />
        </g>
        {/* köşe ölçü işaretleri */}
        <g stroke="rgba(255,255,255,.35)" strokeWidth="1">
          {[[300, 300], [1140, 300], [300, 600], [1140, 600]].map(([x, y], i) => (
            <g key={i}><line x1={x - 8} y1={y} x2={x + 8} y2={y} /><line x1={x} y1={y - 8} x2={x} y2={y + 8} /></g>
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.img
          src="/logo-icon.png" alt="BC"
          className="w-28 h-28 md:w-36 md:h-36 object-contain"
          initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          animate={phase >= 1 ? { opacity: 1, clipPath: 'inset(0 0% 0 0)' } : {}}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.2, 1] }}
        />
        <motion.p
          className="bp-mono mt-10 text-[11px] md:text-xs tracking-[0.28em] text-white/70 uppercase"
          initial={{ opacity: 0, y: 6 }} animate={phase >= 2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
        >
          {tagline}
        </motion.p>
      </div>

      <div className="bp-mono absolute bottom-6 left-6 text-[10px] tracking-[0.2em] text-white/30">BC CREATIVE AGENCY — 35°20'N 33°19'E</div>
      <div className="bp-mono absolute bottom-6 right-6 text-[10px] tracking-[0.2em] text-white/30">EST. 2017 / GİRNE</div>
    </motion.div>
  );
};

export default BlueprintIntro;
