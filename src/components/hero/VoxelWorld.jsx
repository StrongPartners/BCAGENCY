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

import { SHAPES, SHAPE_INDEX, NAVY } from './voxelShapes';

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
