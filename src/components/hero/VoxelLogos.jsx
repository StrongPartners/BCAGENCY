import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/*
 * İş birliği logoları küplerden: her logo küçük bir ızgaraya örneklenir,
 * dolu pikseller logonun kendi renginde küp olur. Birkaç saniyede bir küpler
 * dağılıp sıradaki logoya dönüşür. İmleç küpleri iter.
 */
const COLS = 44, ROWS = 18;
const proxied = (u) => (u.startsWith('/') ? u : `/api/img?u=${encodeURIComponent(u)}`);

function sampleLogo(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const cv = document.createElement('canvas'); cv.width = COLS; cv.height = ROWS;
        const g = cv.getContext('2d', { willReadFrequently: true });
        const k = Math.min(COLS / img.width, ROWS / img.height);
        const w = img.width * k, h = img.height * k;
        g.drawImage(img, (COLS - w) / 2, (ROWS - h) / 2, w, h);
        const d = g.getImageData(0, 0, COLS, ROWS).data;
        // arka plan rengi: köşe pikselleri (şeffaf değilse)
        const bg = [d[0], d[1], d[2], d[3]];
        const pts = [];
        for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
          const i = (y * COLS + x) * 4, a = d[i + 3];
          if (a < 90) continue;
          const diff = Math.abs(d[i] - bg[0]) + Math.abs(d[i + 1] - bg[1]) + Math.abs(d[i + 2] - bg[2]);
          if (bg[3] > 200 && diff < 60) continue; // opak düz arka planı at
          let r = d[i], gg = d[i + 1], b = d[i + 2];
          const lum = 0.2126 * r + 0.7152 * gg + 0.0722 * b;
          if (lum < 60) { r = 220; gg = 226; b = 238; } // koyu logolar koyu zeminde görünsün
          pts.push({ x: x - COLS / 2, y: ROWS / 2 - y, c: new THREE.Color(`rgb(${r},${gg},${b})`) });
        }
        resolve(pts.length > 8 ? pts : null);
      } catch { resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = proxied(src);
  });
}

export default function VoxelLogos({ partners = [], className = '' }) {
  const mount = useRef(null);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState([]);

  // logoları örnekle
  useEffect(() => {
    let alive = true;
    Promise.all(partners.filter(p => p.logo).map(async (p) => ({ p, pts: await sampleLogo(p.logo) })))
      .then(list => { if (alive) setReady(list.filter(x => x.pts)); });
    return () => { alive = false; };
  }, [partners]);

  useEffect(() => {
    const el = mount.current;
    if (!el || !ready.length) return;
    const N = Math.max(...ready.map(r => r.pts.length));
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200); camera.position.set(0, 0, 60);
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(5, 8, 12); scene.add(key);
    const geo = new THREE.BoxGeometry(0.88, 0.88, 0.88);
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.4, metalness: 0.1 });
    const mesh = new THREE.InstancedMesh(geo, mat, N);
    const group = new THREE.Group(); group.add(mesh); scene.add(group);
    const cur = Array.from({ length: N }, () => new THREE.Vector3((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 30, -20));
    const vel = cur.map(() => new THREE.Vector3());
    const col = Array.from({ length: N }, () => new THREE.Color(0x1e3a8a));
    const scl = new Array(N).fill(0);
    const dummy = new THREE.Object3D();
    let idx = 0, lastSwitch = performance.now();
    const target = (i) => {
      const pts = ready[idx].pts, p = pts[i];
      return p ? { x: p.x, y: p.y, z: 0, c: p.c, s: 1 } : { x: (i % 7 - 3) * 9, y: 20, z: -30, c: col[i], s: 0 };
    };
    const pointer = new THREE.Vector2(); let hasPointer = false;
    const onMove = (e) => { const r = el.getBoundingClientRect(); pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); hasPointer = e.clientY >= r.top && e.clientY <= r.bottom; };
    window.addEventListener('pointermove', onMove, { passive: true });
    const ray = new THREE.Raycaster(); const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); const hit = new THREE.Vector3();
    const resize = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.position.z = Math.max(30, (COLS * 0.62) / (Math.tan(THREE.MathUtils.degToRad(15)) * camera.aspect)); camera.updateProjectionMatrix(); };
    resize(); const ro = new ResizeObserver(resize); ro.observe(el);
    let visible = false; const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(el);
    let raf; const t0 = performance.now();
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (!visible) { lastSwitch = now; return; }
      if (ready.length > 1 && now - lastSwitch > 3800) { idx = (idx + 1) % ready.length; lastSwitch = now; setActive(idx); }
      const t = (now - t0) / 1000;
      group.rotation.y = Math.sin(t * 0.4) * 0.18 + (hasPointer ? pointer.x * 0.2 : 0);
      group.rotation.x = Math.cos(t * 0.3) * 0.06;
      let local = null;
      if (hasPointer) { ray.setFromCamera(pointer, camera); if (ray.ray.intersectPlane(plane, hit)) local = group.worldToLocal(hit.clone()); }
      const since = (now - lastSwitch) / 1000;
      for (let i = 0; i < N; i++) {
        const T = target(i), p = cur[i], v = vel[i];
        const delay = (i % 40) * 0.012; // küpler sırayla gelsin
        const k = since > delay ? 0.07 : 0.01;
        v.x += (T.x - p.x) * k; v.y += (T.y - p.y) * k; v.z += (T.z - p.z) * k;
        if (local) { const dx = p.x - local.x, dy = p.y - local.y, d = Math.hypot(dx, dy) + 1e-3; if (d < 3) { const f = (3 - d) / 3; v.x += dx / d * f; v.y += dy / d * f; v.z += f * 1.5; } }
        v.multiplyScalar(0.8); p.add(v);
        col[i].lerp(T.c, 0.08); scl[i] += (T.s - scl[i]) * 0.1;
        dummy.position.copy(p); dummy.rotation.set(v.y * 0.6, v.x * 0.6, 0); dummy.scale.setScalar(Math.max(0.0001, scl[i]));
        dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix); mesh.setColorAt(i, col[i]);
      }
      mesh.instanceMatrix.needsUpdate = true; mesh.instanceColor.needsUpdate = true;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); ro.disconnect(); io.disconnect(); geo.dispose(); mat.dispose(); renderer.dispose(); el.removeChild(renderer.domElement); };
  }, [ready]);

  if (!ready.length) return null;
  const cur = ready[active]?.p;
  return (
    <div className={className}>
      <div ref={mount} className="w-full h-[220px] md:h-[300px] [&>canvas]:w-full [&>canvas]:h-full" aria-hidden="true" />
      <div className="mt-4 text-center text-sm text-white/50 h-5">{cur?.name}</div>
    </div>
  );
}
