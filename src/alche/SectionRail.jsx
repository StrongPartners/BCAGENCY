import React, { useEffect, useState } from 'react';

/** Sağda sabit bölüm göstergesi: aktif bölümün çizgisi uzar, etiketi parlar. */
const SectionRail = ({ sections }) => {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map(s => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-5" aria-label="Bölümler">
      {sections.map((s, i) => {
        const on = s.id === active;
        return (
          <button key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center justify-end gap-3 text-right">
            <span className={`bp-mono text-[10px] tracking-[0.22em] transition-colors ${on ? 'text-white' : 'text-white/30 group-hover:text-white/70'}`}>
              {String(i + 1).padStart(2, '0')} {s.label}
            </span>
            <span className={`h-px bg-white transition-all duration-500 ${on ? 'w-10 opacity-100' : 'w-4 opacity-30 group-hover:opacity-70'}`} />
          </button>
        );
      })}
    </nav>
  );
};

export default SectionRail;
