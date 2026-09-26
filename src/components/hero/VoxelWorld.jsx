import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { voxel } from './voxelBus';

/*
 * Küp dünyası — sayfanın arkasında yaşayan tek 3D sahne.
 * Aynı küpler kaydırdıkça bir şekilden diğerine uçarak dönüşür:
 * Ana sayfa: BC logosu → telefon (içerik) → tarayıcı (web) → katmanlı panolar (uygulama/CRM)
 * → yükselen grafik (büyüme) → BC. Menü sayfalarının her birinin kendi şekli var (voxelBus).
 * Sayfadaki [data-voxel-step="i"] bölümleri hangi şeklin görüneceğini belirler.
 * İmleç yakınındaki küpler her aşamada dağılıp yaylanarak geri döner.
 */

const NAVY = 0x1e3a8a, NAVY2 = 0x3d5a9e, LIGHT = 0x7fc0dc, LIGHT2 = 0x5aa9cc, RED = 0xe03c31, WHITE = 0xe9eef7;

// ── Şekil üreticileri: [{x,y,z,c}] ──
const fromRows = (rows, ox, oy, pick) => {
  const out = [];
  rows.forEach((row, r) => [...row].forEach((ch, c) => { if (ch !== '.') out.push({ x: ox + c, y: oy - r, z: 0, c: pick(ch, r, c) }); }));
  return out;
};
// Şekli ortala ve 15x15 birimlik kutuya sığdır (tüm şekiller aynı görsel ölçüde)
const center = (pts, fit = 15) => {
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

// Sıra önemli: 0–5 ana sayfanın kaydırma hikâyesi, sonrakiler menü sayfaları
const SHAPE_DEFS = [
  ['bc', shapeBC], ['phone', shapePhone], ['browser', shapeBrowser], ['layers', shapeLayers], ['chart', shapeChart], ['bc-end', shapeBC],
  ['heart', shapeHeart], ['reels', shapeReels], ['magnifier', shapeMagnifier], ['target', shapeTarget], ['clapper', shapeClapper],
  ['drone', shapeDrone], ['camera', shapeCamera], ['coffee', shapeCoffee], ['pencil', shapePencil], ['chat', shapeChat],
];
const SHAPES = SHAPE_DEFS.map(([, f]) => f());
const SHAPE_INDEX = Object.fromEntries(SHAPE_DEFS.map(([n], i) => [n, i]));

export default function VoxelWorld({ className = '' }) {
  const mount = useRef(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const N = Math.max(...SHAPES.map(s => s.length));

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
    scene.add(new THREE.AmbientLight(0xffffff, 0.95));
    const key = new THREE.DirectionalLight(0xffffff, 1.7); key.position.set(6, 9, 12); scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 0.9); rim.position.set(-9, -5, -8); scene.add(rim);

    const geo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.15 });
    const mesh = new THREE.InstancedMesh(geo, mat, N);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const group = new THREE.Group(); group.add(mesh); scene.add(group);

    // Her şekil için N noktalık hedef listesi; eksik küpler "dağınık bulut"ta küçülerek bekler
    const rnd = (i, k) => { const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return s - Math.floor(s); };
    const targets = SHAPES.map((pts, si) => {
      const order = pts.map((p, i) => ({ p, k: rnd(i, si) })).sort((a, b) => a.k - b.k).map(o => o.p);
      return Array.from({ length: N }, (_, i) => {
        const p = order[i];
        if (p) return { pos: new THREE.Vector3(p.x, p.y, p.z), col: new THREE.Color(p.c), s: p.k ?? 1 };
        const a = rnd(i, si + 9) * Math.PI * 2, r = 14 + rnd(i, si + 3) * 10;
        return { pos: new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r * 0.6, -10 - rnd(i, si) * 10), col: new THREE.Color(NAVY), s: 0 };
      });
    });

    const cur = targets[0].map(t => t.pos.clone());
    const vel = cur.map(() => new THREE.Vector3());
    const colors = targets[0].map(t => t.col.clone());
    const scales = targets[0].map(t => t.s);
    const dummy = new THREE.Object3D();
    const tmpV = new THREE.Vector3(), tmpC = new THREE.Color();

    const pointer = new THREE.Vector2(); let hasPointer = false;
    const ray = new THREE.Raycaster(); const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); const hit = new THREE.Vector3();
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      hasPointer = e.pointerType === 'mouse';
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h;
      // şekil (~18 birim) her en-boy oranında sığsın
      const fitZ = 10 / (Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect);
      camera.position.set(0, 0, Math.max(34, fitZ)); camera.updateProjectionMatrix();
    };
    resize(); const ro = new ResizeObserver(resize); ro.observe(el);

    // Görüntülenen geçiş: A şeklinden B şekline, f oranında
    let dispA = 0, dispB = 0, dispF = 0, opacity = 0;
    const isDesktop = () => window.innerWidth >= 1024;
    let lastLayout = '';
    const applyLayout = (layout) => {
      if (layout === lastLayout) return; lastLayout = layout; lastBox = '';
      const st = el.style; st.position = 'fixed'; st.top = ''; st.bottom = ''; st.left = ''; st.right = ''; st.height = ''; st.width = '';
      st.background = ''; st.zIndex = '';
      if (layout === 'home-desktop') Object.assign(st, { top: '0', bottom: '0', left: '42%', right: '0' });
      else if (layout === 'service-desktop') Object.assign(st, { top: '0', left: '52%', right: '0', height: '100vh' });
      resize();
    };
    // Mobil: küpler yazının üstüne binmesin.
    // Ana sayfa → header'ın altında sabit bir "sahne" şeridi (zemin rengiyle), yazı altından akar.
    // Servis sayfası → hero'daki [data-voxel-anchor] boşluğunu takip eder.
    let lastBox = '';
    const placeMobile = (kind) => {
      applyLayout('mobile-' + kind);
      let top, height, left = 0, width = 0, bg = '', z = '';
      if (kind === 'home') {
        const hb = document.querySelector('header')?.getBoundingClientRect().bottom ?? 64;
        top = Math.max(0, hb); height = window.innerHeight * 0.34;
        bg = 'linear-gradient(to bottom, #f7f6f2 90%, rgba(247,246,242,0))'; z = '30';
      } else {
        const a = [...document.querySelectorAll('[data-voxel-anchor]')].find(n => n.offsetParent !== null);
        if (!a) return false;
        const r = a.getBoundingClientRect(); top = r.top; height = r.height;
        // mobilde tam genişlik (küpler büyük görünsün), masaüstünde ayrılan kutu kadar
        if (isDesktop()) { left = r.left; width = r.width; }
      }
      const key = `${Math.round(top)}|${Math.round(height)}|${Math.round(left)}|${Math.round(width)}`;
      if (key !== lastBox) {
        lastBox = key;
        Object.assign(el.style, width
          ? { left: `${left}px`, right: '', width: `${width}px`, top: `${top}px`, height: `${height}px`, background: bg, zIndex: z }
          : { left: '0', right: '0', width: '', top: `${top}px`, height: `${height}px`, background: bg, zIndex: z });
      }
      return true;
    };
    const readScroll = () => {
      const steps = [...document.querySelectorAll('[data-voxel-step]')];
      if (!steps.length) return null;
      const y = window.scrollY + window.innerHeight * 0.3;
      let p = 0;
      steps.forEach((s, i) => {
        const r = s.getBoundingClientRect(), top = r.top + window.scrollY, h = r.height;
        if (y >= top) {
          const local = Math.min(1, (y - top) / Math.max(1, h));
          p = i + Math.min(1, Math.max(0, (local - 0.45) / 0.55));
        }
      });
      const last = steps[steps.length - 1].getBoundingClientRect();
      const vh = window.innerHeight;
      // mobilde sahne şeridi üstte durduğu için son bölüm biterken daha erken kaybolur
      const fade = isDesktop()
        ? Math.min(1, Math.max(0, (vh * 0.45 - last.bottom) / (vh * 0.45)))
        : Math.min(1, Math.max(0, (vh * 0.7 - last.bottom) / (vh * 0.25)));
      return { p: Math.min(steps.length - 1, p), fade };
    };
    const update = (dt) => {
      let targetOpacity = 0;
      if (voxel.mode === 'scroll') {
        if (isDesktop()) applyLayout('home-desktop'); else placeMobile('home');
        const r = readScroll();
        if (r) { dispA = Math.floor(r.p); dispB = Math.min(SHAPES.length - 1, dispA + 1); dispF = r.p - dispA; targetOpacity = 1 - r.fade; }
      } else if (voxel.mode === 'fixed') {
        // Sayfa her ekranda geçerli bir yer ayırdıysa (data-voxel-anchor="always") oraya, yoksa masaüstünde sağ yarıya
        const always = document.querySelector('[data-voxel-anchor="always"]');
        const placed = isDesktop() && !always ? (applyLayout('service-desktop'), true) : placeMobile('anchor');
        const tgt = SHAPE_INDEX[voxel.target] ?? 0;
        if (dispB !== tgt || (dispF < 1 && dispA !== dispB)) {
          if (dispB !== tgt) { dispA = dispF > 0.5 ? dispB : dispA; dispB = tgt; dispF = dispA === dispB ? 1 : 0; }
          dispF = Math.min(1, dispF + dt * 0.8);
          if (dispF >= 1) { dispA = dispB; }
        }
        const heroFade = Math.min(1, window.scrollY / (window.innerHeight * 0.6));
        targetOpacity = placed ? (1 - heroFade) : 0;
      }
      opacity += (targetOpacity - opacity) * 0.12;
      el.style.opacity = opacity.toFixed(3);
    };

    let raf; const t0 = performance.now(); let prev = t0;
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const t = (now - t0) / 1000, dt = Math.min(0.05, (now - prev) / 1000); prev = now;
      update(dt);
      if (opacity < 0.01) return;

      const i0 = dispA, i1 = dispB;
      let f = dispF;
      f = f < 0.5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2; // easeInOutCubic
      const A = targets[i0], Bt = targets[i1];
      const swirl = Math.sin(f * Math.PI); // geçişin ortasında dağılma

      const tx = hasPointer && !reduce ? pointer.x * 0.5 : Math.sin(t * 0.35) * 0.3;
      const ty = hasPointer && !reduce ? -pointer.y * 0.3 : Math.cos(t * 0.3) * 0.12;
      group.rotation.y += (tx + swirl * 0.6 - group.rotation.y) * 0.05;
      group.rotation.x += (ty - group.rotation.x) * 0.05;

      let local = null;
      if (hasPointer && !reduce) { ray.setFromCamera(pointer, camera); if (ray.ray.intersectPlane(plane, hit)) local = group.worldToLocal(hit.clone()); }

      for (let i = 0; i < N; i++) {
        tmpV.lerpVectors(A[i].pos, Bt[i].pos, f);
        // geçişte hafif patlama: küpler kendi yönlerine savrulur
        tmpV.x += Math.sin(i * 1.7) * swirl * 3; tmpV.y += Math.cos(i * 2.3) * swirl * 3; tmpV.z += Math.sin(i * 0.9) * swirl * 5;
        const p = cur[i], v = vel[i];
        v.x += (tmpV.x - p.x) * 0.09; v.y += (tmpV.y - p.y) * 0.09; v.z += (tmpV.z - p.z) * 0.09;
        if (local) {
          const dx = p.x - local.x, dy = p.y - local.y, d = Math.hypot(dx, dy) + 1e-3, R = 3.4;
          if (d < R) { const k = (R - d) / R; v.x += dx / d * k; v.y += dy / d * k; v.z += k * 1.5; }
        }
        v.multiplyScalar(0.76); p.add(v);
        tmpC.copy(A[i].col).lerp(Bt[i].col, f); colors[i].lerp(tmpC, 0.2);
        const sc = A[i].s + (Bt[i].s - A[i].s) * f; scales[i] += (sc - scales[i]) * 0.2;
        const disp = p.distanceTo(tmpV);
        dummy.position.copy(p);
        dummy.position.z += Math.sin(t * 1.1 + i * 0.37) * 0.05;
        dummy.rotation.set(disp * 0.5 + swirl * i * 0.02, disp * 0.8 + swirl * i * 0.03, 0);
        dummy.scale.setScalar(Math.max(0.0001, scales[i]));
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        mesh.setColorAt(i, colors[i]);
      }
      mesh.instanceMatrix.needsUpdate = true; mesh.instanceColor.needsUpdate = true;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); ro.disconnect();
      geo.dispose(); mat.dispose(); renderer.dispose(); el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} style={{ position: "fixed", opacity: 0 }} className={`[&>canvas]:w-full [&>canvas]:h-full ${className}`} aria-hidden="true" />;
}
