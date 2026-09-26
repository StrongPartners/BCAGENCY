import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import * as THREE from 'three';
import { NAVY, NAVY2 } from './voxelShapes';

/*
 * Sayfa içi küçük küp sahnesi. Verilen şekli (points) yaylı fizikle kurar:
 * görünür olunca küpler dağınık halden uçarak toplanır, şekil değişince yeni şekle akar,
 * imleç/parmak yakınındaki küpler itilip geri döner.
 *
 * mode="crumble" → şekil kurulur, bir süre durur, yerçekimiyle dökülür, tekrar toplanır (404).
 * palette="dark" → koyu zemin (lacivert footer, fotoğraf) için lacivertleri açık tona çevirir.
 */

const CAP_DEFAULT = 900;
const DARK_MAP = { [NAVY]: 0xdbe6f7, [NAVY2]: 0xa9bde6 };

const VoxelMini = forwardRef(function VoxelMini(
  { shape, palette = 'light', mode = 'assemble', capacity = CAP_DEFAULT, preserve = false, className = '', label },
  ref,
) {
  const mount = useRef(null);
  const api = useRef({});

  useImperativeHandle(ref, () => ({
    toDataURL: () => api.current.snapshot?.(),
  }));

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const CAP = capacity;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: preserve });
    } catch { return undefined; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%'; renderer.domElement.style.height = '100%';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 400);
    scene.add(new THREE.AmbientLight(0xffffff, palette === 'dark' ? 0.8 : 0.95));
    const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(6, 9, 12); scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 0.8); rim.position.set(-9, -5, -8); scene.add(rim);

    const mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.9, 0.9, 0.9), new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.15 }), CAP);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const group = new THREE.Group(); group.add(mesh); scene.add(group);

    const pos = [], vel = [], tgt = [], col = [], tcol = [], scl = new Float32Array(CAP), tscl = new Float32Array(CAP);
    for (let i = 0; i < CAP; i++) {
      const a = Math.random() * Math.PI * 2, b = Math.acos(2 * Math.random() - 1), r = 30 + Math.random() * 25;
      pos.push(new THREE.Vector3(Math.sin(b) * Math.cos(a) * r, Math.sin(b) * Math.sin(a) * r, Math.cos(b) * r - 20));
      vel.push(new THREE.Vector3()); tgt.push(new THREE.Vector3());
      col.push(new THREE.Color(0x1e3a8a)); tcol.push(new THREE.Color(0x1e3a8a));
    }
    let bounds = { w: 16, h: 16 }, count = 0;

    const setShape = (pts) => {
      const list = (pts || []).slice(0, CAP);
      count = list.length;
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      list.forEach((p, i) => {
        tgt[i].set(p.x, p.y, p.z || 0);
        const c = palette === 'dark' ? (DARK_MAP[p.c] ?? p.c) : p.c;
        tcol[i].setHex(c); tscl[i] = p.k ?? 1;
        minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x); minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
      });
      for (let i = count; i < CAP; i++) { tscl[i] = 0; tgt[i].copy(pos[i]).multiplyScalar(1.05); }
      if (count) bounds = { w: maxX - minX + 2, h: maxY - minY + 2 };
    };
    api.current.setShape = setShape;
    setShape(shape);

    const pointer = new THREE.Vector2(), ray = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), hit = new THREE.Vector3();
    let hasPointer = false;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      hasPointer = Math.abs(pointer.x) < 1.3 && Math.abs(pointer.y) < 1.3;
    };
    const onLeave = () => { hasPointer = false; };
    window.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);

    let camZ = 60;
    const resize = () => {
      const w = el.clientWidth || 1, h = el.clientHeight || 1;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(el);

    let visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(el);

    // crumble döngüsü
    let phase = 'build', phaseT = 0;
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), sv = new THREE.Vector3(), tmp = new THREE.Vector3();
    let raf, prev = performance.now(), t = 0;

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - prev) / 1000); prev = now;
      if (!visible) return;
      t += dt; phaseT += dt;
      const f = dt * 60;

      if (mode === 'crumble') {
        if (phase === 'build' && phaseT > 3.2) { phase = 'fall'; phaseT = 0; for (let i = 0; i < count; i++) vel[i].set((Math.random() - 0.5) * 0.25, Math.random() * 0.2, (Math.random() - 0.5) * 0.3); }
        else if (phase === 'fall' && phaseT > 2.6) { phase = 'build'; phaseT = 0; }
      }

      const pad = 1.5 + Math.max(bounds.w, bounds.h) * 0.06;
      const fitH = (bounds.h / 2 + pad) / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const fitW = (bounds.w / 2 + pad) / (Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect);
      camZ += (Math.max(fitH, fitW, 14) - camZ) * 0.08;
      camera.position.set(0, 0, camZ);

      const tx = hasPointer && !reduce ? pointer.x * 0.35 : Math.sin(t * 0.4) * 0.18;
      const ty = hasPointer && !reduce ? -pointer.y * 0.25 : Math.cos(t * 0.33) * 0.08;
      group.rotation.y += (tx - group.rotation.y) * 0.06;
      group.rotation.x += (ty - group.rotation.x) * 0.06;

      let local = null;
      if (hasPointer && !reduce) { ray.setFromCamera(pointer, camera); if (ray.ray.intersectPlane(plane, hit)) local = group.worldToLocal(hit.clone()); }
      const R = Math.max(2.5, bounds.h * 0.22);
      const floor = -bounds.h / 2 - 1;

      for (let i = 0; i < CAP; i++) {
        const p = pos[i], v = vel[i];
        if (mode === 'crumble' && phase === 'fall' && i < count) {
          v.y -= 0.018 * f; v.multiplyScalar(0.985);
          p.addScaledVector(v, f);
          if (p.y < floor) { p.y = floor; v.y *= -0.3; v.x *= 0.8; v.z *= 0.8; }
        } else {
          tmp.subVectors(tgt[i], p);
          v.multiplyScalar(Math.pow(0.84, f)).addScaledVector(tmp, 0.055 * f);
          if (local && i < count) {
            const dx = p.x - local.x, dy = p.y - local.y, d = Math.hypot(dx, dy);
            if (d < R && d > 0.001) { const k = (R - d) / R * 0.9 * f; v.x += dx / d * k; v.y += dy / d * k; v.z += k * 1.4; }
          }
          p.addScaledVector(v, 0.5 * f);
        }
        scl[i] += (tscl[i] - scl[i]) * 0.12 * f;
        col[i].lerp(tcol[i], 0.1 * Math.min(1, f));
        const s = Math.max(0.0001, scl[i]);
        m.compose(p, q, sv.set(s, s, s));
        mesh.setMatrixAt(i, m); mesh.setColorAt(i, col[i]);
      }
      mesh.instanceMatrix.needsUpdate = true; mesh.instanceColor.needsUpdate = true;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    api.current.snapshot = () => { renderer.render(scene, camera); return renderer.domElement.toDataURL('image/png'); };

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave);
      mesh.geometry.dispose(); mesh.material.dispose(); renderer.dispose();
      renderer.domElement.remove(); api.current = {};
    };
    // palette/mode/capacity değişimi sahneyi yeniden kurar; şekil değişimi aşağıdaki efektle akar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palette, mode, capacity, preserve]);

  useEffect(() => { api.current.setShape?.(shape); }, [shape]);

  return <div ref={mount} className={className} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} />;
});

export default VoxelMini;
