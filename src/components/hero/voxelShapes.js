/*
 * Küp şekilleri — VoxelWorld (sayfa arkası) ve VoxelMini (sayfa içi küçük sahneler) ortak kullanır.
 * Her şekil [{x,y,z,c,k}] listesi; center() ile ortalanıp ~15 birimlik kutuya sığdırılır.
 */
export const NAVY = 0x1e3a8a, NAVY2 = 0x3d5a9e, LIGHT = 0x7fc0dc, LIGHT2 = 0x5aa9cc, RED = 0xe03c31, WHITE = 0xe9eef7;

// ── Şekil üreticileri: [{x,y,z,c}] ──
const fromRows = (rows, ox, oy, pick) => {
  const out = [];
  rows.forEach((row, r) => [...row].forEach((ch, c) => { if (ch !== '.') out.push({ x: ox + c, y: oy - r, z: 0, c: pick(ch, r, c) }); }));
  return out;
};
// Şekli ortala ve 15x15 birimlik kutuya sığdır (tüm şekiller aynı görsel ölçüde)
export const center = (pts, fit = 15) => {
  const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  const k = Math.min(1, fit / (maxX - minX + 1), fit / (maxY - minY + 1));
  return pts.map(p => ({ ...p, x: (p.x - cx) * k, y: (p.y - cy) * k, z: p.z * k, k }));
};

function shapeBC() {
  const B = ['BBBB.', 'B...B', 'B...B', 'BBBB.', 'B...B', 'B...B', 'BBBB.'];
  const C = ['.CCCC', 'C....', 'C....', 'C....', 'C....', 'C....', '.CCCC'];
  const pts = [
    ...fromRows(B, 0, 6, (ch, r, c) => ((r + c) % 2 ? NAVY : NAVY2)),
    ...fromRows(C, 7, 6, (ch, r, c) => ((r + c) % 2 ? LIGHT : LIGHT2)),
    { x: 12.4, y: 0, z: 0, c: RED },
  ];
  // biraz kalınlık: arka katman
  return center([...pts, ...pts.map(p => ({ ...p, z: -1 }))], 16);
}

function shapePhone() {
  const rows = [
    'FFFFFFFFF',
    'F...N...F',
    'F.......F',
    'F.......F',
    'F..P....F',
    'F..PP...F',
    'F..PPP..F',
    'F..PPPP.F',
    'F..PPP..F',
    'F..PP...F',
    'F..P....F',
    'F.......F',
    'F.HHH.L.F',
    'F.......F',
    'FFFFFFFFF',
  ];
  return center(fromRows(rows, 0, 7, (ch) => ({ F: NAVY2, N: NAVY, P: RED, H: LIGHT, L: WHITE }[ch])))
    .flatMap(p => (p.c === NAVY2 ? [p, { ...p, z: -1 }] : [p]));
}

function shapeBrowser() {
  const rows = [
    'TTTTTTTTTTTTTTTTT',
    'TRLWTTTTTTTTTTTTT',
    'F...............F',
    'F.HHHHHHHHHHHHH.F',
    'F.HHHHHHHHHHHHH.F',
    'F.HHHHHHHHHHHHH.F',
    'F...............F',
    'F.AAA..BBB..AAA.F',
    'F.AAA..BBB..AAA.F',
    'F...............F',
    'FFFFFFFFFFFFFFFFF',
  ];
  return center(fromRows(rows, 0, 5, (ch) => ({ T: NAVY, R: RED, L: LIGHT, W: WHITE, F: NAVY2, H: LIGHT2, A: LIGHT, B: RED }[ch])));
}

function shapeLayers() {
  const out = [];
  const slab = (w, h, ox, oy, z, a, b) => {
    for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) {
      const edge = x === 0 || y === 0 || x === w - 1 || y === h - 1;
      if (edge || (y === h - 2 && x > 1 && x < w - 2) || (x === 2 && y > 1 && y < h - 2)) out.push({ x: ox + x, y: oy - y, z, c: edge ? a : b });
    }
  };
  slab(11, 7, 0, 7, -4, NAVY, NAVY2);
  slab(11, 7, 2.5, 5, 0, NAVY2, LIGHT2);
  slab(11, 7, 5, 3, 4, LIGHT, RED);
  return center(out);
}

function shapeChart() {
  const out = [];
  const bars = [2, 4, 3, 6, 8, 11];
  bars.forEach((h, i) => {
    for (let y = 0; y < h; y++) for (let w = 0; w < 2; w++) out.push({ x: i * 3 + w, y, z: 0, c: i === bars.length - 1 ? RED : (y % 2 ? LIGHT : LIGHT2) });
  });
  for (let x = 0; x <= 17; x++) out.push({ x, y: -1, z: 0, c: NAVY }); // eksen
  // yükselen ok
  const arrow = [[0, 4], [2, 6], [4, 6], [6, 8], [8, 9], [10, 11], [12, 12], [14, 14], [16, 15], [15, 16], [17, 16], [16, 17]];
  arrow.forEach(([x, y]) => out.push({ x, y, z: 1, c: WHITE }));
  return center(out);
}

// ── Menü sayfalarının şekilleri ──
const RED2 = 0xf04e42, WOOD = 0xf0d9b5;
const disc = (cx, cy, r0, r1, c, z = 0) => {
  const out = [];
  for (let x = Math.floor(cx - r1); x <= Math.ceil(cx + r1); x++) for (let y = Math.floor(cy - r1); y <= Math.ceil(cy + r1); y++) {
    const d = Math.hypot(x - cx, y - cy);
    if (d >= r0 && d <= r1) out.push({ x, y, z, c: typeof c === 'function' ? c(x, y, d) : c });
  }
  return out;
};
// Döndür ve tekrar ızgaraya oturt (küpler üst üste binmesin)
const rotSnap = (pts, ang, cx = 0, cy = 0) => {
  const cs = Math.cos(ang), sn = Math.sin(ang), seen = new Set(), out = [];
  pts.forEach(p => {
    const x = Math.round(cx + (p.x - cx) * cs - (p.y - cy) * sn), y = Math.round(cy + (p.x - cx) * sn + (p.y - cy) * cs);
    const k = `${x},${y},${p.z}`; if (!seen.has(k)) { seen.add(k); out.push({ ...p, x, y }); }
  });
  return out;
};
const thick = (pts, pred = () => true) => pts.flatMap(p => (pred(p) ? [p, { ...p, z: p.z - 1 }] : [p]));

function shapeHeart() { // Sosyal medya — beğeni
  const rows = [
    '..HHH...HHH..',
    '.HWHHH.HHHHH.',
    'HWHHHHHHHHHHH',
    'HHHHHHHHHHHHH',
    'HHHHHHHHHHHHH',
    '.HHHHHHHHHHH.',
    '..HHHHHHHHH..',
    '...HHHHHHH...',
    '....HHHHH....',
    '.....HHH.....',
    '......H......',
  ];
  return center(thick(fromRows(rows, 0, 5, (ch, r, c) => (ch === 'W' ? WHITE : (r + c) % 2 ? RED : RED2))), 14);
}

function shapeReels() { // Reels ve video edit — kıvrılan film şeridi
  const strip = ['NNNNNNNNNNNNNNNNN', 'N.N.N.N.N.N.N.N.N', 'NNNNNNNNNNNNNNNNN'];
  const body = [
    'NHHHHNLLLLLNHHHHN',
    'NHHHHNLPLLLNHHHHN',
    'NHHHHNLPPLLNHHHHN',
    'NHHHHNLPPPLNHHHHN',
    'NHHHHNLPPLLNHHHHN',
    'NHHHHNLPLLLNHHHHN',
    'NHHHHNLLLLLNHHHHN',
  ];
  const rows = [...strip, ...body, ...strip];
  return center(fromRows(rows, 0, 6, (ch) => ({ N: NAVY, H: LIGHT2, L: LIGHT, P: RED }[ch])).map(p => ({ ...p, z: -Math.pow(p.x - 8, 2) * 0.09 })));
}

function shapeMagnifier() { // SEO — büyüteç ve yükselen sıralama
  const out = [
    ...disc(0, 0, 3.6, 5.1, (x, y) => ((x + y) % 2 ? NAVY : NAVY2)),
    { x: -2, y: -2, z: 0, c: LIGHT }, { x: 0, y: -2, z: 0, c: LIGHT }, { x: 0, y: -1, z: 0, c: LIGHT },
    { x: 2, y: -2, z: 0, c: RED }, { x: 2, y: -1, z: 0, c: RED }, { x: 2, y: 0, z: 0, c: RED }, { x: 2, y: 1, z: 0, c: RED },
  ];
  for (let i = 0; i < 6; i++) for (let w = 0; w < 2; w++) out.push({ x: 4 + i + w, y: -4 - i, z: 0, c: i < 1 ? LIGHT2 : RED });
  return center(thick(out, p => p.c === NAVY || p.c === NAVY2 || p.c === RED));
}

function shapeTarget() { // Google Ads — hedef ve ok
  const out = disc(0, 0, 0, 6.2, (x, y, d) => (d < 1.6 ? RED : d < 3.1 ? LIGHT : d < 4.6 ? RED : NAVY));
  for (let i = 1; i <= 7; i++) out.push({ x: i, y: i, z: i * 0.9, c: NAVY2 });
  [[7, 8], [8, 7], [8, 8], [8, 9], [9, 8]].forEach(([x, y]) => out.push({ x, y, z: 7, c: RED2 }));
  return center(out);
}

function shapeClapper() { // Prodüksiyon — klaket
  const out = [];
  for (let x = 0; x < 15; x++) for (let y = 0; y < 8; y++) {
    const line = (y === 2 || y === 4 || y === 6) && x > 1 && x < 13 && !(y === 6 && x > 7);
    out.push({ x, y: -y, z: 0, c: line ? LIGHT : NAVY });
  }
  for (let x = 0; x < 15; x++) out.push({ x, y: 1, z: 0, c: Math.floor(x / 2) % 2 ? NAVY2 : WHITE });
  const arm = [];
  for (let x = 0; x < 15; x++) for (let y = 2; y < 4; y++) arm.push({ x, y, z: 0, c: Math.floor((x + y) / 2) % 2 ? NAVY2 : WHITE });
  out.push(...rotSnap(arm, 0.32, 0, 2), { x: 13, y: -6, z: 1, c: RED });
  return center(thick(out, p => p.c === NAVY));
}

function shapeDrone() { // Drone — üstten görünüş, eğik
  const out = [];
  for (let x = -1; x <= 1; x++) for (let y = -2; y <= 2; y++) out.push({ x, y, z: 0, c: NAVY });
  [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([sx, sy]) => {
    for (let i = 2; i <= 5; i++) out.push({ x: sx * i, y: sy * i, z: 0, c: NAVY2 });
    out.push(...disc(sx * 6, sy * 6, 2.2, 3.3, LIGHT, 0.5), { x: sx * 6, y: sy * 6, z: 1, c: sy > 0 ? RED : NAVY });
  });
  out.push({ x: 0, y: -3, z: -1, c: RED }, { x: 0, y: 3, z: 0, c: WHITE });
  const a = 0.95; // eğim
  return center(out.map(p => ({ ...p, y: p.y * Math.cos(a), z: p.z + p.y * Math.sin(a) })), 16);
}

function shapeCamera() { // Fotoğraf ve video — fotoğraf makinesi
  const out = [];
  for (let x = 0; x < 15; x++) for (let y = 0; y < 9; y++) out.push({ x: x - 7, y: y - 4, z: 0, c: y === 8 || y === 0 ? NAVY2 : NAVY });
  for (let x = -5; x <= -2; x++) for (let y = 5; y <= 6; y++) out.push({ x, y, z: 0, c: NAVY2 });
  out.push({ x: 5, y: 5, z: 0, c: RED }, { x: 6, y: 5, z: 0, c: RED });
  out.push(...disc(0, 0, 2.6, 3.6, LIGHT, 1), ...disc(0, 0, 1.4, 2.6, LIGHT2, 2), ...disc(0, 0, 0, 1.4, NAVY2, 2), { x: -1, y: 1, z: 3, c: WHITE });
  return center(thick(out, p => p.z === 0));
}

function shapeCoffee() { // Hakkımızda — "bir kahve içelim"
  const rows = [
    '..L...L...L....',
    '...L...L...L...',
    '..L...L...L....',
    '...............',
    'NNNNNNNNNNN....',
    'NNNNNNNNNNNHHH.',
    'NNNNNNNNNNN..H.',
    'NNNNRNRNNNN..H.',
    'NNNNNRNNNNNHHH.',
    '.NNNNNNNNN.....',
    '..NNNNNNN......',
    'SSSSSSSSSSSSS..',
  ];
  const pts = fromRows(rows, 0, 6, (ch, r, c) => ({ L: LIGHT, N: (r + c) % 2 ? NAVY : NAVY2, H: NAVY2, R: RED, S: LIGHT2 }[ch]))
    .map(p => (p.c === LIGHT ? { ...p, z: Math.sin(p.y + p.x) * 1.2 } : p))
    .map(p => (p.c === LIGHT2 ? { ...p, x: p.x - 1 } : p));
  return center(thick(pts, p => p.c !== LIGHT));
}

function shapePencil() { // Blog — kalem ve yazdığı satır
  const bar = [];
  for (let x = 0; x < 17; x++) for (let y = -1; y <= 1; y++) {
    const c = x < 2 ? RED : x < 3 ? LIGHT : x < 13 ? (y === 0 ? NAVY : NAVY2) : x < 16 ? (Math.abs(y) <= 16 - x - 1 ? WOOD : null) : (y === 0 ? NAVY : null);
    if (c !== null) bar.push({ x, y, z: 0, c });
  }
  const pencil = rotSnap(bar, -0.7, 16, 0);
  const line = [];
  for (let x = -2; x <= 16; x++) line.push({ x, y: Math.round(Math.sin(x * 0.7) * 0.8) - 1, z: 0, c: x % 5 === 4 ? RED : LIGHT2 });
  return center([...thick(pencil), ...line]);
}

function shapeChat() { // İletişim — sohbet balonları
  const out = [];
  const bubble = (w, h, ox, oy, z, fill, edge, tail) => {
    for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) {
      const corner = (x === 0 || x === w - 1) && (y === 0 || y === h - 1);
      if (!corner) out.push({ x: ox + x, y: oy - y, z, c: x === 0 || y === 0 || x === w - 1 || y === h - 1 ? edge : fill });
    }
    tail.forEach(([x, y]) => out.push({ x: ox + x, y: oy - y, z, c: edge }));
  };
  bubble(11, 7, 6, 9, -3, LIGHT2, LIGHT, [[9, 7], [10, 8]]);
  bubble(13, 8, 0, 5, 0, NAVY, NAVY2, [[1, 8], [0, 9]]);
  [3, 6, 9].forEach(x => out.push({ x, y: 1, z: 1, c: x === 9 ? RED : WHITE }));
  return center(thick(out, p => p.z === 0));
}

// ── İkon şekilleri (değerler, iletişim kanalları, yardımcı düğmeler) ──
function shapeEye() {
  const out = [];
  for (let x = -7; x <= 7; x++) {
    const h = Math.round(Math.sqrt(Math.max(0, 1 - (x / 7.5) ** 2)) * 4);
    out.push({ x, y: h, z: 0, c: NAVY }, { x, y: -h, z: 0, c: NAVY });
  }
  out.push(...disc(0, 0, 1.6, 2.6, LIGHT2, 0.5), ...disc(0, 0, 0, 1.4, NAVY2, 1), { x: -1, y: 1, z: 2, c: WHITE });
  return center(thick(out, p => p.c === NAVY));
}
function shapeBolt() {
  const rows = [
    '.....RRRR',
    '....RRRR.',
    '...RRRR..',
    '..RRRR...',
    '.RRRRRRRR',
    'RRRRRRRR.',
    '....RRR..',
    '...RRR...',
    '..RRR....',
    '.RR......',
    'R........',
  ];
  return center(thick(fromRows(rows, 0, 5, (ch, r, c) => ((r + c) % 3 ? RED : RED2))));
}
function shapeQuote() {
  const one = ['.QQ', 'QQ.', 'QQQ', 'QQQ', 'QQQ'];
  return center(thick([...fromRows(one, 0, 2, () => NAVY2), ...fromRows(one, 4, 2, () => LIGHT)]), 10);
}
function shapePin() {
  const out = disc(0, 2, 0, 4.6, (x, y, d) => (d < 1.8 ? WHITE : RED));
  for (let y = -1; y >= -6; y--) { const w = Math.max(0, Math.round((y + 6) * 0.6)); for (let x = -w; x <= w; x++) out.push({ x, y, z: 0, c: RED2 }); }
  out.push(...disc(0, -7, 2.2, 3.2, LIGHT2, -1));
  return center(thick(out, p => p.c !== LIGHT2));
}
function shapeClock() {
  const out = [...disc(0, 0, 5, 6.2, NAVY), ...disc(0, 0, 0, 5, LIGHT, -0.5)];
  for (let y = 1; y <= 4; y++) out.push({ x: 0, y, z: 0.6, c: NAVY2 });
  for (let x = 1; x <= 3; x++) out.push({ x, y: 0, z: 0.6, c: RED });
  [[0, 5], [5, 0], [0, -5], [-5, 0]].forEach(([x, y]) => out.push({ x: x * 0.8, y: y * 0.8, z: 0.6, c: NAVY2 }));
  return center(thick(out, p => p.c === NAVY));
}
function shapeMail() {
  const out = [];
  const W = 15, H = 10;
  for (let x = 0; x < W; x++) for (let y = 0; y < H; y++) {
    const edge = x === 0 || y === 0 || x === W - 1 || y === H - 1;
    const flap = Math.abs(y - Math.round(Math.abs(x - 7) * 0.72)) === 0 && y < 6;
    if (edge || flap) out.push({ x, y: -y, z: 0, c: flap ? RED : NAVY });
    else out.push({ x, y: -y, z: -0.6, c: LIGHT });
  }
  return center(thick(out, p => p.c === NAVY));
}
function shapeInsta() {
  const out = [];
  for (let x = 0; x < 13; x++) for (let y = 0; y < 13; y++) {
    const corner = (x < 2 || x > 10) && (y < 2 || y > 10) && !((x === 1 || x === 11) && (y === 1 || y === 11));
    const edge = x === 0 || y === 0 || x === 12 || y === 12 || ((x === 1 || x === 11) && (y === 1 || y === 11));
    if (edge && !corner) out.push({ x, y: -y, z: 0, c: (x + y) % 2 ? RED : RED2 });
  }
  out.push(...disc(6, -6, 2.4, 3.5, NAVY2), { x: 9, y: -3, z: 0, c: NAVY });
  return center(thick(out));
}
function shapeArrowUp() {
  const rows = ['...A...', '..AAA..', '.AAAAA.', 'AAAAAAA', '..AAA..', '..AAA..', '..AAA..', '..AAA..'];
  return center(thick(fromRows(rows, 0, 4, (ch, r) => (r < 4 ? RED : r % 2 ? NAVY : NAVY2))));
}
function shapeQuestion() {
  const rows = ['.QQQQ.', 'QQ..QQ', '....QQ', '...QQ.', '..QQ..', '..QQ..', '......', '..RR..'];
  return center(thick(fromRows(rows, 0, 4, (ch, r) => (ch === 'R' ? RED : r % 2 ? NAVY : NAVY2))));
}

// Sıra önemli: 0–5 ana sayfanın kaydırma hikâyesi, sonrakiler menü sayfaları
export const SHAPE_DEFS = [
  ['bc', shapeBC], ['phone', shapePhone], ['browser', shapeBrowser], ['layers', shapeLayers], ['chart', shapeChart], ['bc-end', shapeBC],
  ['heart', shapeHeart], ['reels', shapeReels], ['magnifier', shapeMagnifier], ['target', shapeTarget], ['clapper', shapeClapper],
  ['drone', shapeDrone], ['camera', shapeCamera], ['coffee', shapeCoffee], ['pencil', shapePencil], ['chat', shapeChat],
  ['eye', shapeEye], ['bolt', shapeBolt], ['quote', shapeQuote], ['pin', shapePin], ['clock', shapeClock], ['mail', shapeMail],
  ['insta', shapeInsta], ['arrow-up', shapeArrowUp], ['question', shapeQuestion],
];
export const SHAPES = SHAPE_DEFS.map(([, f]) => f());
export const SHAPE_INDEX = Object.fromEntries(SHAPE_DEFS.map(([n], i) => [n, i]));

// Şekli adıyla al (yoksa BC)
export const getShape = (name) => SHAPES[SHAPE_INDEX[name] ?? 0];

// Onay işareti — form gönderildiğinde
export function shapeCheck() {
  const out = [];
  const path = [[0, 4], [1, 3], [2, 2], [3, 1], [4, 2], [5, 3], [6, 4], [7, 5], [8, 6], [9, 7], [10, 8], [11, 9]];
  path.forEach(([x, y], i) => { for (let t = 0; t < 2; t++) out.push({ x: x + t, y: y - 4, z: 0, c: i < 3 ? RED : i % 2 ? NAVY : NAVY2 }); });
  return center(thick(out), 12);
}

// Yazıyı küplere çevir: her harf kendi renginde, sonunda BC'nin kırmızı karesi
const TEXT_COLORS = [NAVY, LIGHT2, NAVY2, LIGHT];

// Firma renkleri: iki ana renkten harf harf değişen dört ton (ana, ikinci, ana açık, ikinci koyu)
const shade = (hex, k) => {
  const r = (hex >> 16) & 255, g = (hex >> 8) & 255, b = hex & 255;
  const f = (v) => Math.round(k > 0 ? v + (255 - v) * k : v * (1 + k));
  return (f(r) << 16) | (f(g) << 8) | f(b);
};
export function brandPalette(c1, c2, all = null) {
  // 3+ renk: harfler sırayla bu renklerde, nokta son renkte
  if (all && all.length > 2) return { letters: all, dot: all[all.length - 1] };
  if (c1 == null) return { letters: TEXT_COLORS, dot: RED };
  const b = c2 ?? shade(c1, 0.35);
  return { letters: [c1, b, shade(c1, 0.22), shade(b, -0.18)], dot: c2 != null ? shade(c2, -0.1) : RED };
}
export const PRESETS = [
  { id: 'bc', label: 'BC', c: null },
  { id: 'kirmizi', label: 'Kırmızı', c: [0xd7141a, 0x1c1c1c] },
  { id: 'bordo', label: 'Bordo', c: [0x7a1c2b, 0xd9a86c] },
  { id: 'turuncu', label: 'Turuncu', c: [0xf26b1d, 0x2b2b2b] },
  { id: 'sari', label: 'Sarı', c: [0xf2c200, 0x1a1a1a] },
  { id: 'altin', label: 'Altın', c: [0xc9a227, 0x1a1a1a] },
  { id: 'yesil', label: 'Yeşil', c: [0x1f8a4c, 0xa7d676] },
  { id: 'zeytin', label: 'Zeytin', c: [0x5d6b2e, 0xd8c99b] },
  { id: 'turkuaz', label: 'Turkuaz', c: [0x00a3a3, 0x0c3d4a] },
  { id: 'deniz', label: 'Deniz', c: [0x0077b6, 0x90e0ef] },
  { id: 'lacivert', label: 'Lacivert', c: [0x0b1f4b, 0xc9a227] },
  { id: 'mor', label: 'Mor', c: [0x5b2a86, 0xe0a3ff] },
  { id: 'lila', label: 'Lila', c: [0x9d7bd8, 0x3b2a5c] },
  { id: 'pembe', label: 'Pembe', c: [0xe8457c, 0xffc2d6] },
  { id: 'fusya', label: 'Fuşya', c: [0xc2187a, 0x1a1a1a] },
  { id: 'kahve', label: 'Kahve', c: [0x5c3a21, 0xc89f73] },
  { id: 'siyah', label: 'Siyah', c: [0x111111, 0x8a8a8a] },
  { id: 'gri', label: 'Gri', c: [0x6b7078, 0xc9ccd1] },
  { id: 'gokkusagi', label: 'Gökkuşağı', c: [0xe53935, 0xfb8c00, 0xfdd835, 0x43a047, 0x1e88e5, 0x8e24aa] },
  { id: 'pastel', label: 'Pastel', c: [0xf4a6b8, 0xf9d5a7, 0xb8e0d2, 0xa8c8f0, 0xcdb4f0] },
  { id: 'neon', label: 'Neon', c: [0xff2bd6, 0x00e5ff, 0x39ff14, 0xfff200] },
  { id: 'gunbatimi', label: 'Gün batımı', c: [0xff5e62, 0xff9966, 0xffc371, 0x8e2de2] },
  { id: 'okyanus', label: 'Okyanus', c: [0x023e8a, 0x0096c7, 0x48cae4, 0xade8f4] },
  { id: 'orman', label: 'Orman', c: [0x1b4332, 0x2d6a4f, 0x52b788, 0xb7e4c7] },
];
export const hexToInt = (h) => parseInt(String(h).replace('#', ''), 16);
export const intToHex = (n) => '#' + n.toString(16).padStart(6, '0');

export function textShape(str, { rows = 15, dot = true, multiline = false, colors = null } = {}) {
  const pal = brandPalette(colors?.[0] ?? null, colors?.[1] ?? null, colors);
  const text = (str || '').trim() || 'BC';
  // Dikey kareler (Story) için çok kelimeli adlar alt alta: her satır ayrı yazılıp üst üste dizilir
  const words = text.split(/\s+/);
  if (multiline && words.length > 1 && text.length > 8) {
    // kısa kelimeleri aynı satırda topla (en fazla ~11 karakter/satır)
    const rowsTxt = [];
    words.forEach((w) => {
      const last = rowsTxt[rowsTxt.length - 1];
      if (last && (last + ' ' + w).length <= 11) rowsTxt[rowsTxt.length - 1] = last + ' ' + w; else rowsTxt.push(w);
    });
    const lines = rowsTxt.map((w) => textShape(w, { rows, dot: false, colors }));
    const gap = rows * 0.35, out = [];
    const heights = lines.map((l) => Math.max(...l.map((p) => p.y)) - Math.min(...l.map((p) => p.y)) + 1);
    let y = 0;
    lines.forEach((l, i) => {
      const top = Math.max(...l.map((p) => p.y));
      l.forEach((p) => out.push({ ...p, y: p.y - top + y }));
      y -= heights[i] + gap;
    });
    if (dot) {
      const last = out.filter((p) => p.y <= y + heights[heights.length - 1] + gap + 1);
      const maxX = Math.max(...last.map((p) => p.x)), minY = Math.min(...last.map((p) => p.y));
      [[2, 1], [3, 1], [2, 2], [3, 2]].forEach(([dx, dy]) => out.push({ x: maxX + dx, y: minY + dy, z: 0, c: pal.dot }));
    }
    return center(out, 1e9);
  }
  if (typeof document === 'undefined') return shapeBC();
  const fs = rows * 4, cv = document.createElement('canvas'), g = cv.getContext('2d');
  const font = `900 ${fs}px "DM Sans", Inter, Arial, sans-serif`;
  g.font = font;
  const w = Math.ceil(g.measureText(text).width) + 8, h = Math.ceil(fs * 1.25);
  cv.width = w; cv.height = h; g.font = font; g.textBaseline = 'middle'; g.fillStyle = '#000';
  // harf sınırları (renk için)
  const bounds = []; let acc = 4;
  for (const ch of text) { const cw = g.measureText(ch).width; bounds.push([acc, acc + cw, ch]); acc += cw; }
  g.fillText(text, 4, h / 2);
  const d = g.getImageData(0, 0, w, h).data, step = 4, out = [];
  let ci = -1;
  const colorAt = (px) => bounds.findIndex(([x0, x1]) => px >= x0 && px < x1);
  const letterColor = []; bounds.forEach(([, , ch]) => { if (ch.trim()) ci++; letterColor.push(pal.letters[Math.max(0, ci) % pal.letters.length]); });
  for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) {
    if (d[((y + 2) * w + (x + 2)) * 4 + 3] > 110) {
      const b = colorAt(x + 2);
      out.push({ x: x / step, y: -y / step, z: 0, c: letterColor[b] ?? pal.letters[0] });
    }
  }
  if (!out.length) return shapeBC();
  if (dot) {
    const maxX = Math.max(...out.map(p => p.x)), minY = Math.min(...out.map(p => p.y));
    [[2, 1], [3, 1], [2, 2], [3, 2]].forEach(([dx, dy]) => out.push({ x: maxX + dx, y: minY + dy, z: 0, c: pal.dot }));
  }
  return center(out, 1e9);
}

// Blog kategorisi → şekil
export const categoryShape = (cat = '') => {
  const c = cat.toLowerCase();
  if (c.includes('seo')) return 'magnifier';
  if (c.includes('google') || c.includes('reklam')) return 'target';
  if (c.includes('sosyal')) return 'heart';
  if (c.includes('web')) return 'browser';
  if (c.includes('fotoğraf')) return 'camera';
  if (c.includes('video')) return 'clapper';
  if (c.includes('grafik')) return 'pencil';
  return 'chart';
};
