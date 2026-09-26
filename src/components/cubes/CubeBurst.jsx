import { useEffect } from 'react';

/*
 * Tıklanan yerden küçük küpler saçılır. DOM + Web Animations API; her tıkta ~11 küp,
 * 0.8 sn sonra silinir. Hareket azaltma tercihinde kapalı.
 */
const COLORS = ['#1e3a8a', '#3d5a9e', '#7fc0dc', '#5aa9cc', '#e03c31'];

export default function CubeBurst() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const layer = document.createElement('div');
    layer.setAttribute('aria-hidden', 'true');
    Object.assign(layer.style, { position: 'fixed', inset: '0', pointerEvents: 'none', zIndex: '90', overflow: 'hidden' });
    document.body.appendChild(layer);

    const onDown = (e) => {
      if (e.button !== 0) return;
      const n = 11;
      for (let i = 0; i < n; i++) {
        const s = 8 + Math.random() * 8;
        const el = document.createElement('span');
        const c = COLORS[i === 0 ? 4 : Math.floor(Math.random() * 4)];
        Object.assign(el.style, {
          position: 'absolute', left: `${e.clientX - s / 2}px`, top: `${e.clientY - s / 2}px`, width: `${s}px`, height: `${s}px`,
          background: c, borderRadius: '2px', boxShadow: 'inset -2px -2px 0 rgba(0,0,0,.22), inset 1px 1px 0 rgba(255,255,255,.35)',
        });
        layer.appendChild(el);
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.6, d = 40 + Math.random() * 60;
        const dx = Math.cos(a) * d, dy = Math.sin(a) * d - 18;
        const ease = 'cubic-bezier(.2,.8,.2,1)';
        // easing her kareye ayrı verilir; tüm animasyona verilince küpler görünmeden soluyor
        el.animate(
          [
            { transform: 'translate(0,0) rotate(0deg) scale(.3)', opacity: 1, easing: ease },
            { transform: `translate(${dx * 0.85}px,${dy * 0.85}px) rotate(${(Math.random() - 0.5) * 120}deg) scale(1)`, opacity: 1, offset: 0.4, easing: 'ease-in' },
            { transform: `translate(${dx}px,${dy + 20}px) rotate(${(Math.random() - 0.5) * 200}deg) scale(.9)`, opacity: 1, offset: 0.7 },
            { transform: `translate(${dx * 1.05}px,${dy + 44}px) rotate(${(Math.random() - 0.5) * 260}deg) scale(.5)`, opacity: 0 },
          ],
          { duration: 750 + Math.random() * 200 },
        ).onfinish = () => el.remove();
      }
    };
    window.addEventListener('pointerdown', onDown, { passive: true });
    return () => { window.removeEventListener('pointerdown', onDown); layer.remove(); };
  }, []);
  return null;
}
