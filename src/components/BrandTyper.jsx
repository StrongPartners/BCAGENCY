import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Download, Film } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { textShape } from './hero/voxelShapes';

const VoxelMini = lazy(() => import('./hero/VoxelMini'));

/* "Markanı küplerle yaz" — ziyaretçi marka adını yazar, küpler o yazıya dönüşür. */
const MAX = 28;

const BrandTyper = () => {
  const { lang } = useLanguage();
  const tr = lang === 'tr';
  const [value, setValue] = useState('');
  const [shown, setShown] = useState('');
  const mini = useRef(null);

  // yazarken her harfte değil, kısa bir duraksamada şekil değişsin
  useEffect(() => { const id = setTimeout(() => setShown(value), 280); return () => clearTimeout(id); }, [value]);

  const fallback = tr ? 'Markan' : 'Your brand';
  const shape = useMemo(() => textShape(shown || fallback, { multiline: (shown || "").length > 14 }), [shown, fallback]);
  const name = (shown || '').trim();

  const wa = `https://wa.me/905488321919?text=${encodeURIComponent(tr
    ? `Merhaba, ${name || 'markam'} için sizinle görüşmek istiyorum.`
    : `Hi, I'd like to talk about ${name || 'my brand'}.`)}`;

  const download = () => {
    const url = mini.current?.toDataURL();
    if (!url) return;
    // şeffaf kareyi sitenin zemin rengine otur, köşeye küçük imza
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      const g = c.getContext('2d'); g.fillStyle = '#f7f6f2'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0);
      g.fillStyle = '#1B2A5C'; g.font = `600 ${Math.round(c.height * 0.035)}px "DM Sans", Arial, sans-serif`; g.textAlign = 'right';
      g.fillText('bccreative.agency', c.width - c.height * 0.04, c.height * 0.94);
      const a = document.createElement('a');
      a.href = c.toDataURL('image/png'); a.download = `${(name || 'bc').replace(/[^\p{L}\p{N}]+/gu, '-').toLowerCase()}-kupler.png`; a.click();
    };
    img.src = url;
  };

  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50 mb-5">{tr ? 'Küp oyunu' : 'Cube play'}</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.02]">
            {tr ? <>Markanı <span className="text-secondary-300">küplerle</span> yaz.</> : <>Write your brand in <span className="text-secondary-300">cubes</span>.</>}
          </h2>
          <p className="mt-5 text-lg text-white/60">{tr ? 'Adını yaz, küpler toplansın. Gerisini birlikte kuralım.' : 'Type the name, watch the cubes gather. We’ll build the rest together.'}</p>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03]">
          <Suspense fallback={<div className="h-[34svh] md:h-[46vh]" />}>
            <VoxelMini ref={mini} shape={shape} capacity={4000} preserve className="h-[34svh] md:h-[46vh] w-full cursor-crosshair"
              label={tr ? `${name || fallback} yazısı küplerle` : `${name || fallback} in cubes`} />
          </Suspense>
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-3 md:items-center">
          <label className="sr-only" htmlFor="brand-typer">{tr ? 'Marka adı' : 'Brand name'}</label>
          <input id="brand-typer" value={value} maxLength={MAX} onChange={(e) => setValue(e.target.value)}
            placeholder={tr ? 'Markanın adını yaz…' : 'Type your brand name…'} autoComplete="off"
            className="flex-1 min-w-0 rounded-full border border-white/15 bg-transparent px-6 py-4 text-lg outline-none focus:border-secondary-300 transition-colors placeholder:text-white/35" />
          <div className="grid grid-cols-2 md:flex gap-3">
            <Link to={`/kup${name ? `?m=${encodeURIComponent(name)}` : ''}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-4 text-sm font-medium hover:border-white/40 transition-colors">
              <Film size={16} /> {tr ? 'Story yap' : 'Make a Story'}
            </Link>
            <button onClick={download} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-4 text-sm font-medium hover:border-white/40 transition-colors">
              <Download size={16} /> {tr ? 'Görseli indir' : 'Download'}
            </button>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="on-dark col-span-2 md:flex-none inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 hover:bg-accent-600 px-6 py-4 text-sm font-semibold transition-colors">
              {tr ? 'Bunu markam için yapın' : 'Do this for my brand'} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandTyper;
