/*
 * #KüpleYaz Story karesi (1080×1920). Aynı çizim hem PNG hem video için kullanılır:
 * üstte etiket ve başlık, ortada küp sahnesinin görüntüsü, altta "Sen de yaz" ve adres.
 * Video: 2D tuval captureStream + MediaRecorder; destekleniyorsa MP4 (Instagram), yoksa WebM.
 */
export const STORY_W = 1080;
export const STORY_H = 1920;
export const STORY_SECONDS = 6.5;
export const KUP_URL = 'bccreative.agency/kup';

const NAVY = '#1B2A5C';
const RED = '#E03C31';
const INK = '#15161b';

let logoImg = null;
const loadLogo = () => new Promise((res) => {
  if (logoImg) return res(logoImg);
  const im = new Image();
  im.onload = () => { logoImg = im; res(im); };
  im.onerror = () => res(null);
  im.src = '/logo-icon.png';
});

const easeOut = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

/** t: saniye (videoda zaman; görselde büyük bir değer = her şey görünür) */
export function drawStory(g, { t = 99, cubes, lang = 'tr' }) {
  const W = STORY_W, H = STORY_H;
  // zemin
  g.fillStyle = '#f7f6f2'; g.fillRect(0, 0, W, H);
  const glow = g.createRadialGradient(W * 0.75, H * 0.3, 40, W * 0.75, H * 0.3, W * 0.9);
  glow.addColorStop(0, 'rgba(168,208,224,0.55)'); glow.addColorStop(1, 'rgba(168,208,224,0)');
  g.fillStyle = glow; g.fillRect(0, 0, W, H);

  const fade = (start, dur = 0.5) => easeOut((t - start) / dur);
  g.textBaseline = 'alphabetic';

  // üst: etiket + başlık
  let a = fade(0.15);
  g.globalAlpha = a;
  g.fillStyle = RED; g.font = '800 44px "DM Sans", Inter, Arial, sans-serif';
  g.textAlign = 'center';
  g.fillText('#KÜPLEYAZ', W / 2, 250 - (1 - a) * 20);
  a = fade(0.35);
  g.globalAlpha = a;
  g.fillStyle = INK; g.font = '800 86px "DM Sans", Inter, Arial, sans-serif';
  const title = lang === 'tr' ? ['Markamı', 'küplerle yazdım.'] : ['I wrote my brand', 'in cubes.'];
  g.fillText(title[0], W / 2, 380 - (1 - a) * 24);
  g.fillText(title[1], W / 2, 478 - (1 - a) * 24);
  g.globalAlpha = 1;

  // orta: küpler (WebGL tuvali kare değilse ortalayarak sığdır)
  if (cubes && cubes.width) {
    const box = { x: 30, y: 560, w: W - 60, h: 820 };
    const k = Math.min(box.w / cubes.width, box.h / cubes.height);
    const w = cubes.width * k, h = cubes.height * k;
    g.drawImage(cubes, box.x + (box.w - w) / 2, box.y + (box.h - h) / 2, w, h);
  }

  // alt: çağrı
  a = fade(3.0, 0.6);
  g.globalAlpha = a;
  const y0 = 1520 + (1 - a) * 30;
  g.fillStyle = INK; g.font = '700 58px "DM Sans", Inter, Arial, sans-serif';
  g.fillText(lang === 'tr' ? 'Sen de yaz →' : 'Try yours →', W / 2, y0);
  // adres kutusu
  g.font = '800 54px "DM Sans", Inter, Arial, sans-serif';
  const tw = g.measureText(KUP_URL).width;
  const bw = tw + 90, bx = (W - bw) / 2, by = y0 + 42;
  g.fillStyle = NAVY; roundRect(g, bx, by, bw, 104, 52); g.fill();
  g.fillStyle = '#ffffff'; g.fillText(KUP_URL, W / 2, by + 71);
  g.fillStyle = RED; g.fillRect(bx + bw - 34, by + 30, 16, 16);
  g.globalAlpha = 1;

  // imza
  a = fade(3.4, 0.6);
  g.globalAlpha = a * 0.8;
  if (logoImg) g.drawImage(logoImg, W / 2 - 200, 1790, 44, 44);
  g.fillStyle = INK; g.font = '600 34px "DM Sans", Inter, Arial, sans-serif'; g.textAlign = 'left';
  g.fillText('@bccreative.agency', W / 2 - 140, 1824);
  g.globalAlpha = 1;
  g.textAlign = 'center';
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
}

const slug = (s) => (s || 'bc').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').toLowerCase() || 'bc';

/** Statik Story görseli (PNG Blob) */
export async function storyPng({ cubes, lang }) {
  await Promise.all([document.fonts?.ready, loadLogo()]);
  const c = document.createElement('canvas'); c.width = STORY_W; c.height = STORY_H;
  drawStory(c.getContext('2d'), { cubes, lang });
  return new Promise((res) => c.toBlob(res, 'image/png'));
}

export function pickVideoType() {
  if (typeof MediaRecorder === 'undefined') return null;
  const types = ['video/mp4;codecs=avc1.42E01E', 'video/mp4;codecs=avc1', 'video/mp4', 'video/webm;codecs=vp9', 'video/webm'];
  return types.find((t) => MediaRecorder.isTypeSupported(t)) || null;
}

/**
 * 6,5 sn'lik Story videosu kaydeder. `replay` küpleri dağıtıp baştan toplatır,
 * `getCubes` her karede WebGL tuvalini verir. onProgress(0..1).
 */
export async function recordStory({ replay, getCubes, lang, onProgress }) {
  const type = pickVideoType();
  if (!type) throw new Error('no-recorder');
  await Promise.all([document.fonts?.ready, loadLogo()]);
  const c = document.createElement('canvas'); c.width = STORY_W; c.height = STORY_H;
  const g = c.getContext('2d');
  const stream = c.captureStream(30);
  const rec = new MediaRecorder(stream, { mimeType: type, videoBitsPerSecond: 10_000_000 });
  const chunks = [];
  rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
  const done = new Promise((res) => { rec.onstop = res; });

  drawStory(g, { t: 0, cubes: getCubes(), lang });
  replay();
  rec.start(250);
  const t0 = performance.now();
  await new Promise((res) => {
    const frame = () => {
      const t = (performance.now() - t0) / 1000;
      drawStory(g, { t, cubes: getCubes(), lang });
      onProgress?.(Math.min(1, t / STORY_SECONDS));
      if (t < STORY_SECONDS) requestAnimationFrame(frame); else res();
    };
    requestAnimationFrame(frame);
  });
  rec.stop();
  await done;
  stream.getTracks().forEach((tr) => tr.stop());
  const mime = type.split(';')[0];
  return { blob: new Blob(chunks, { type: mime }), ext: mime === 'video/mp4' ? 'mp4' : 'webm' };
}

export const fileName = (name, ext) => `kupleyaz-${slug(name)}.${ext}`;
