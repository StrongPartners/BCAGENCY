import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Download, Film, Image as ImageIcon, Link2, Share2 } from 'lucide-react';
import useSEO from '../../hooks/useSEO';
import { useLanguage } from '../../context/LanguageContext';
import { textShape } from '../hero/voxelShapes';
import { fileName, KUP_URL, pickVideoType, recordStory, storyPng } from './story';

const VoxelMini = lazy(() => import('../hero/VoxelMini'));

/*
 * #KüpleYaz kampanya sayfası: marka adını yaz, küpler toplansın, 9:16 Story videosu ya da
 * görseli al, Instagram'da paylaş. Link marka adını taşır (?m=), görenler kendi markasını yazar.
 */
const MAX = 28;
const readParam = () => {
  try { return (new URLSearchParams(window.location.search).get('m') || '').slice(0, MAX); } catch { return ''; }
};

const KupPage = () => {
  const { lang } = useLanguage();
  const tr = lang === 'tr';
  const [value, setValue] = useState('');
  const [shown, setShown] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [video, setVideo] = useState(null); // { url, file }
  const [note, setNote] = useState('');
  const mini = useRef(null);

  useSEO({
    title: tr ? '#KüpleYaz — Markanı küplerle yaz, Story’de paylaş | BC Creative' : '#KüpleYaz — Write your brand in cubes | BC Creative',
    description: tr ? 'Markanın adını yaz, küpler toplansın. 9:16 Story videosunu indir, Instagram’da #KüpleYaz ile paylaş.' : 'Type your brand, watch the cubes gather, share the 9:16 Story with #KüpleYaz.',
    canonical: 'https://bccreative.agency/kup',
  });

  useEffect(() => { const m = readParam(); setValue(m); setShown(m); }, []);
  useEffect(() => { const id = setTimeout(() => setShown(value), 280); return () => clearTimeout(id); }, [value]);
  useEffect(() => {
    // paylaşılan link o markayla açılsın
    try {
      const u = new URL(window.location.href);
      if (shown.trim()) u.searchParams.set('m', shown.trim()); else u.searchParams.delete('m');
      window.history.replaceState(null, '', u.pathname + u.search);
    } catch { /* yok say */ }
    setVideo((v) => { if (v) URL.revokeObjectURL(v.url); return null; });
  }, [shown]);

  const fallback = tr ? 'Markan' : 'Your brand';
  const name = shown.trim() || fallback;
  const shape = useMemo(() => textShape(name, { multiline: true }), [name]);
  const shareUrl = `https://${KUP_URL}${shown.trim() ? `?m=${encodeURIComponent(shown.trim())}` : ''}`;
  const caption = tr
    ? `Markamı küplerle yazdım 🧊 Sen de yaz: ${shareUrl} #KüpleYaz @bccreative.agency`
    : `I wrote my brand in cubes 🧊 Try yours: ${shareUrl} #KüpleYaz @bccreative.agency`;

  const save = (blob, fname) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = fname; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 60000);
  };
  const canShareFile = (file) => { try { return !!navigator.canShare?.({ files: [file] }); } catch { return false; } };

  const makeVideo = async () => {
    if (busy || !mini.current) return;
    setBusy(true); setNote(''); setProgress(0);
    try {
      const { blob, ext } = await recordStory({
        replay: () => mini.current?.replay(),
        getCubes: () => mini.current?.canvas(),
        lang, onProgress: setProgress,
      });
      const file = new File([blob], fileName(name, ext), { type: blob.type });
      setVideo({ url: URL.createObjectURL(blob), file });
      if (ext === 'webm') setNote(tr ? 'Tarayıcın WebM kaydetti. Instagram için telefondan (Safari/Chrome) oluşturman daha iyi olur ya da görseli kullan.' : 'Your browser recorded WebM. For Instagram, create it on your phone or use the image.');
    } catch {
      setNote(tr ? 'Bu tarayıcı video kaydedemiyor; görsel olarak indir.' : 'This browser cannot record video; download the image instead.');
    } finally { setBusy(false); }
  };

  const shareVideo = async () => {
    if (!video) return;
    if (canShareFile(video.file)) {
      try { await navigator.share({ files: [video.file], text: caption }); return; } catch { /* iptal */ }
    }
    save(video.file, video.file.name);
  };

  const downloadImage = async () => {
    const blob = await storyPng({ cubes: mini.current?.canvas(), lang });
    if (!blob) return;
    const file = new File([blob], fileName(name, 'png'), { type: 'image/png' });
    if (canShareFile(file) && window.matchMedia('(pointer: coarse)').matches) {
      try { await navigator.share({ files: [file], text: caption }); return; } catch { /* iptal */ }
    }
    save(blob, file.name);
  };

  const shareLink = async () => {
    try { if (navigator.share) { await navigator.share({ url: shareUrl, text: caption }); return; } } catch { /* iptal */ }
    try { await navigator.clipboard.writeText(`${caption}`); setNote(tr ? 'Paylaşım metni kopyalandı.' : 'Caption copied.'); } catch { /* yok */ }
  };

  return (
    <main className="bg-ink-900 text-white min-h-screen pt-24 md:pt-32 pb-20">
      <div className="container mx-auto px-5 md:px-12 grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-x-16 gap-y-8 items-start">
        {/* Canlı Story önizlemesi */}
        <div className="order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2 mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[420px] lg:sticky lg:top-28">
          <div className="relative aspect-[9/16] rounded-[28px] overflow-hidden border border-white/10 shadow-2xl bg-ink-900">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_28%,rgba(168,208,224,0.55),transparent_60%)]" />
            <div className="absolute inset-x-0 top-[9%] text-center px-4">
              <p className="text-[11px] font-extrabold tracking-[0.2em] text-accent-500">#KÜPLEYAZ</p>
              <p className="mt-3 text-[26px] leading-[1.1] font-extrabold">{tr ? <>Markamı<br />küplerle yazdım.</> : <>I wrote my brand<br />in cubes.</>}</p>
            </div>
            <div className="absolute inset-x-[3%] top-[29%] h-[43%]">
              <Suspense fallback={null}>
                <VoxelMini ref={mini} shape={shape} capacity={4000} preserve className="w-full h-full" label={`${name} ${tr ? 'küplerle' : 'in cubes'}`} />
              </Suspense>
            </div>
            <div className="absolute inset-x-0 bottom-[7%] text-center px-4">
              <p className="text-lg font-bold">{tr ? 'Sen de yaz →' : 'Try yours →'}</p>
              <p className="on-dark mt-2 inline-block rounded-full bg-brand-600 px-4 py-2 text-sm font-extrabold">{KUP_URL}</p>
              <p className="mt-3 text-xs text-white/60">@bccreative.agency</p>
            </div>
            {busy && (
              <div className="absolute inset-x-0 top-0 h-1 bg-white/10"><div className="h-full bg-accent-500 transition-[width]" style={{ width: `${progress * 100}%` }} /></div>
            )}
          </div>
        </div>

        {/* Başlık */}
        <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-accent-500">#KüpleYaz</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight leading-[1.02]">
            {tr ? <>Markanı küplerle yaz, <span className="text-secondary-300">Story’de paylaş.</span></> : <>Write your brand in cubes, <span className="text-secondary-300">share it.</span></>}
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-xl">
            {tr ? 'Adını yaz, küpler toplansın. 6 saniyelik Story videosunu al, @bccreative.agency’yi etiketle, #KüpleYaz ile paylaş. Sıra arkadaşında.' : 'Type the name, the cubes gather. Grab the 6-second Story, tag @bccreative.agency and share with #KüpleYaz.'}
          </p>
        </div>

        {/* Kontroller */}
        <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2">
          <label className="sr-only" htmlFor="kup-input">{tr ? 'Marka adı' : 'Brand name'}</label>
          <input id="kup-input" value={value} maxLength={MAX} onChange={(e) => setValue(e.target.value)} autoComplete="off"
            placeholder={tr ? 'Markanın adını yaz…' : 'Type your brand name…'}
            className="w-full rounded-2xl border-2 border-white/15 bg-transparent px-6 py-5 text-2xl font-bold outline-none focus:border-secondary-300 transition-colors placeholder:text-white/30" />

          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {!video ? (
              <button onClick={makeVideo} disabled={busy || !pickVideoTypeSafe()} className="on-dark sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 hover:bg-accent-600 disabled:opacity-60 px-6 py-4 font-bold transition-colors">
                <Film size={18} /> {busy ? `${tr ? 'Video hazırlanıyor' : 'Recording'} %${Math.round(progress * 100)}` : (tr ? 'Story videosu oluştur' : 'Create Story video')}
              </button>
            ) : (
              <button onClick={shareVideo} className="on-dark sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 hover:bg-accent-600 px-6 py-4 font-bold transition-colors">
                {canShareFile(video.file) ? <><Share2 size={18} /> {tr ? 'Instagram’da paylaş' : 'Share'}</> : <><Download size={18} /> {tr ? 'Videoyu indir' : 'Download video'}</>}
              </button>
            )}
            <button onClick={downloadImage} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3.5 font-semibold hover:border-white/40 transition-colors">
              <ImageIcon size={17} /> {tr ? 'Görsel olarak al' : 'Get image'}
            </button>
            <button onClick={shareLink} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3.5 font-semibold hover:border-white/40 transition-colors">
              <Link2 size={17} /> {tr ? 'Linki paylaş' : 'Share link'}
            </button>
          </div>
          {video && (
            <div className="mt-4 flex items-center gap-4">
              <video src={video.url} autoPlay muted loop playsInline className="w-24 aspect-[9/16] rounded-xl border border-white/10 object-cover" />
              <div className="text-sm text-white/60">
                {tr ? 'Videon hazır. Paylaşırken @bccreative.agency’yi etiketlemeyi unutma.' : 'Your video is ready. Tag @bccreative.agency when you share.'}
                <button onClick={() => save(video.file, video.file.name)} className="block mt-1 underline hover:text-white">{tr ? 'Bilgisayara indir' : 'Download'}</button>
              </div>
            </div>
          )}
          {note && <p className="mt-3 text-sm text-white/55">{note}</p>}

          <ol className="mt-10 grid sm:grid-cols-3 gap-3 text-sm">
            {(tr
              ? [['01', 'Markanı yaz'], ['02', 'Story videosunu al'], ['03', '#KüpleYaz ile paylaş, @bccreative.agency’yi etiketle']]
              : [['01', 'Type your brand'], ['02', 'Grab the Story'], ['03', 'Share with #KüpleYaz, tag @bccreative.agency']]
            ).map(([n, t]) => (
              <li key={n} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <span className="font-mono text-secondary-300">{n}</span>
                <p className="mt-1 font-semibold">{t}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-white/50">{tr ? 'Beğendiklerimizi kendi hesabımızda paylaşıyoruz. Markanı gerçekten büyütmek istersen: ' : 'We repost our favourites. Want to grow the brand for real? '}
            <a className="underline hover:text-white" href={`https://wa.me/905488321919?text=${encodeURIComponent(tr ? `Merhaba, #KüpleYaz'dan geliyorum; ${name} için görüşmek istiyorum.` : `Hi, I came from #KüpleYaz; let's talk about ${name}.`)}`} target="_blank" rel="noopener noreferrer">{tr ? 'bir kahve içelim' : 'let’s talk'}</a>.
          </p>
        </div>
      </div>
    </main>
  );
};

function pickVideoTypeSafe() {
  try { return !!pickVideoType(); } catch { return false; }
}

export default KupPage;
