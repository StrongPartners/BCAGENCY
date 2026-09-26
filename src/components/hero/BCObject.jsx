import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/*
 * İmleci takip eden 3D "BC" — logonun renkleriyle küplerden oluşur.
 * - Fare: obje imlece doğru eğilir, imlecin yakınındaki küpler dağılıp yaylanarak geri döner.
 * - Dokunmatik / fare yok: yavaş otomatik salınım.
 * - Görünür değilken render durur; "azaltılmış hareket" tercihinde sabit kalır.
 */
const B = ['11110', '10001', '10001', '11110', '10001', '10001', '11110'];
const C = ['01111', '10000', '10000', '10000', '10000', '10000', '01111'];
const NAVY = 0x1e3a8a, NAVY2 = 0x3d5a9e, LIGHT = 0xa8d0e0, RED = 0xe03c31;

export default function BCObject({ className = '' }) {
  const mount = useRef(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 26);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(6, 8, 10); scene.add(key);
    const rim = new THREE.DirectionalLight(0xa8d0e0, 1.2); rim.position.set(-8, -4, -6); scene.add(rim);

    // Küp konumları
    const cells = [];
    const addLetter = (rows, ox, colorA, colorB) => rows.forEach((row, r) => [...row].forEach((ch, c) => {
      if (ch === '1') cells.push({ x: ox + c, y: 3 - r, color: (r + c) % 2 ? colorA : colorB });
    }));
    addLetter(B, -6, NAVY, NAVY2);
    addLetter(C, 1, LIGHT, 0x8fc1d6);
    cells.push({ x: 6.2, y: -3, color: RED }); // logodaki kırmızı kare

    const geo = new THREE.BoxGeometry(0.92, 0.92, 0.92);
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.15 });
    const mesh = new THREE.InstancedMesh(geo, mat, cells.length);
    const group = new THREE.Group(); group.add(mesh); scene.add(group);
    const col = new THREE.Color();
    const home = cells.map((c) => new THREE.Vector3(c.x, c.y, 0));
    const cur = home.map((v) => v.clone());
    const vel = home.map(() => new THREE.Vector3());
    const spin = cells.map(() => new THREE.Euler());
    cells.forEach((c, i) => mesh.setColorAt(i, col.setHex(c.color)));

    const dummy = new THREE.Object3D();
    const pointer = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    let hasPointer = false;
    const ray = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const hit = new THREE.Vector3();

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      hasPointer = true;
    };
    const onLeave = () => { hasPointer = false; };
    window.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = w < 500 ? 34 : 26;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(el);

    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0 });
    io.observe(el);

    let raf, t0 = performance.now();
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = (now - t0) / 1000;

      // Eğilme: imleç varsa ona doğru, yoksa yavaş salınım
      if (hasPointer && !reduce) target.copy(pointer);
      else target.set(Math.sin(t * 0.5) * 0.35, Math.cos(t * 0.4) * 0.2);
      group.rotation.y += ((target.x * 0.55) - group.rotation.y) * 0.06;
      group.rotation.x += ((-target.y * 0.35) - group.rotation.x) * 0.06;

      // İmlecin dünya konumu (z=0 düzlemi, grubun yerel uzayında)
      let local = null;
      if (hasPointer && !reduce) {
        ray.setFromCamera(pointer, camera);
        if (ray.ray.intersectPlane(plane, hit)) local = group.worldToLocal(hit.clone());
      }

      for (let i = 0; i < cells.length; i++) {
        const h = home[i], p = cur[i], v = vel[i];
        // yay kuvveti eve doğru
        v.x += (h.x - p.x) * 0.08; v.y += (h.y - p.y) * 0.08; v.z += (h.z - p.z) * 0.08;
        if (local) {
          const dx = p.x - local.x, dy = p.y - local.y, d = Math.hypot(dx, dy) + 0.001;
          const R = 3.2;
          if (d < R) {
            const f = (R - d) / R;
            v.x += (dx / d) * f * 0.9; v.y += (dy / d) * f * 0.9; v.z += f * 1.4;
          }
        }
        v.multiplyScalar(0.78);
        p.add(v);
        const disp = p.distanceTo(h);
        spin[i].set(disp * 0.6, disp * 0.9, 0);
        dummy.position.copy(p);
        dummy.rotation.copy(spin[i]);
        dummy.position.z += Math.sin(t * 1.2 + i * 0.37) * 0.06; // hafif nefes
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      ro.disconnect(); io.disconnect();
      geo.dispose(); mat.dispose(); renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} className={`relative [&>canvas]:w-full [&>canvas]:h-full ${className}`} aria-hidden="true" />;
}
