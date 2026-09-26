import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { voxel } from './voxelBus';

/*
 * Küp dünyası — sayfanın arkasında yaşayan tek 3D sahne.
 * Aynı küpler kaydırdıkça bir şekilden diğerine uçarak dönüşür:
 * BC logosu → telefon (içerik) → tarayıcı (web) → katmanlı panolar (uygulama/CRM)
 * → yükselen grafik (büyüme) → BC.
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

const SHAPES = [shapeBC, shapePhone, shapeBrowser, shapeLayers, shapeChart, shapeBC].map(f => f());

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
      if (layout === lastLayout) return; lastLayout = layout;
      const st = el.style; st.position = 'fixed'; st.top = ''; st.bottom = ''; st.left = ''; st.right = ''; st.height = ''; st.width = '';
      if (layout === 'home-desktop') Object.assign(st, { top: '0', bottom: '0', left: '42%', right: '0' });
      else if (layout === 'home-mobile') Object.assign(st, { left: '0', right: '0', bottom: '0', height: '46svh' });
      else if (layout === 'service-desktop') Object.assign(st, { top: '0', left: '52%', right: '0', height: '100vh' });
      else Object.assign(st, { left: '0', right: '0', bottom: '0', height: '40svh' });
      resize();
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
      const fade = Math.min(1, Math.max(0, (window.innerHeight * 0.45 - last.bottom) / (window.innerHeight * 0.45)));
      return { p: Math.min(steps.length - 1, p), fade };
    };
    const update = (dt) => {
      let targetOpacity = 0;
      if (voxel.mode === 'scroll') {
        applyLayout(isDesktop() ? 'home-desktop' : 'home-mobile');
        const r = readScroll();
        if (r) { dispA = Math.floor(r.p); dispB = Math.min(SHAPES.length - 1, dispA + 1); dispF = r.p - dispA; targetOpacity = 1 - r.fade; }
      } else if (voxel.mode === 'fixed') {
        applyLayout(isDesktop() ? 'service-desktop' : 'service-mobile');
        if (dispB !== voxel.target || (dispF < 1 && dispA !== dispB)) {
          if (dispB !== voxel.target) { dispA = dispF > 0.5 ? dispB : dispA; dispB = voxel.target; dispF = dispA === dispB ? 1 : 0; }
          dispF = Math.min(1, dispF + dt * 0.8);
          if (dispF >= 1) { dispA = dispB; }
        }
        const heroFade = Math.min(1, window.scrollY / (window.innerHeight * 0.6));
        targetOpacity = (isDesktop() ? 1 : 0.35) * (1 - heroFade);
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
