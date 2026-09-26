import React, { useEffect, useState } from 'react';
import VoxelIcon from '../hero/VoxelIcon';

/* Uzun sayfalarda sol altta beliren küp ok: tıklayınca en üste döner. */
const ScrollTopCube = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Yukarı çık"
      className={`group fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-white/80 backdrop-blur border border-black/5 shadow-lg flex items-center justify-center transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      style={{ background: 'rgba(255,255,255,.85)' }}>
      <VoxelIcon name="arrow-up" className="w-10 h-10 transition-transform duration-300 group-hover:-translate-y-1" />
    </button>
  );
};

export default ScrollTopCube;
