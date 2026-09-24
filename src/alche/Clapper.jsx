import React, { useEffect, useRef } from 'react';

/**
 * Hero objesi: fareyle eğilen 3D film klaketi (Lisovskiy'nin disketi gibi
 * "elle tutulur" bir nesne). Saf CSS 3D, WebGL yok.
 */
const Clapper = ({ scene, take, title, sub }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `rotateX(${(-y * 14).toFixed(2)}deg) rotateY(${(x * 18).toFixed(2)}deg)`;
    };
    const leave = () => { el.style.transform = 'rotateX(6deg) rotateY(-10deg)'; };
    leave();
    window.addEventListener('mousemove', move); el.addEventListener('mouseleave', leave);
    return () => { window.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, []);

  return (
    <div className="bp-3d w-full max-w-[560px] mx-auto select-none">
      <div ref={ref} className="bp-3d-inner relative">
        {/* üst çene */}
        <div className="bp-stripes h-12 md:h-14 rounded-t-md shadow-[0_20px_60px_rgba(0,0,0,.6)] origin-bottom-left -rotate-[7deg] translate-y-3 relative z-10" style={{ transform: 'translateZ(24px) rotate(-7deg) translateY(10px)' }} />
        <div className="bp-stripes h-12 md:h-14" style={{ transform: 'translateZ(12px)' }} />
        {/* gövde */}
        <div className="bg-[#101014] border border-white/10 rounded-b-md p-6 md:p-8 shadow-[0_40px_80px_rgba(0,0,0,.7)]" style={{ transform: 'translateZ(0)' }}>
          <div className="grid grid-cols-3 gap-3 bp-mono text-[10px] md:text-[11px] tracking-[0.18em] text-white/50 uppercase">
            <div className="border border-white/15 p-3"><div className="mb-2">SCENE</div><div className="text-2xl md:text-3xl text-white bp-display">{scene}</div></div>
            <div className="border border-white/15 p-3"><div className="mb-2">TAKE</div><div className="text-2xl md:text-3xl text-white bp-display">{take}</div></div>
            <div className="border border-white/15 p-3"><div className="mb-2">FPS</div><div className="text-2xl md:text-3xl text-white bp-display">24</div></div>
          </div>
          <div className="mt-5 border-t border-dotted border-white/25 pt-4">
            <div className="bp-mono text-[10px] tracking-[0.18em] text-white/50 uppercase mb-1">PROD.</div>
            <div className="bp-display text-2xl md:text-4xl text-white leading-none">{title}</div>
          </div>
          <div className="mt-4 border-t border-dotted border-white/25 pt-3 flex justify-between bp-mono text-[10px] md:text-[11px] tracking-[0.18em] text-white/50 uppercase">
            <span>DIR. BC CREATIVE</span><span>{sub}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clapper;
