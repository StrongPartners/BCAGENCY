import React, { useEffect, useState } from 'react';

/* Blog yazısında okuma ilerlemesi: sayfanın üstünde dolan küp sırası, en öndeki küp kırmızı. */
const COLORS = ['#1e3a8a', '#3d5a9e', '#5aa9cc', '#7fc0dc'];

const ReadProgress = ({ target }) => {
  const [p, setP] = useState(0);
  const [count, setCount] = useState(40);

  useEffect(() => {
    const onResize = () => setCount(Math.max(20, Math.floor(window.innerWidth / 14)));
    const onScroll = () => {
      const el = target?.current;
      const top = el ? el.getBoundingClientRect().top + window.scrollY : 0;
      const h = el ? el.offsetHeight : document.body.scrollHeight;
      const v = (window.scrollY - top + window.innerHeight * 0.5) / Math.max(1, h);
      setP(Math.min(1, Math.max(0, v)));
    };
    onResize(); onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, [target]);

  const filled = Math.round(p * count);
  return (
    <div className="fixed top-0 inset-x-0 z-[60] flex gap-[2px] px-[2px] pt-[2px] pointer-events-none" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="flex-1 h-[6px] rounded-[1px] transition-all duration-300"
          style={{
            background: i < filled ? (i === filled - 1 ? '#e03c31' : COLORS[i % COLORS.length]) : 'transparent',
            transform: i < filled ? 'scaleY(1)' : 'scaleY(0)',
          }} />
      ))}
    </div>
  );
};

export default ReadProgress;
