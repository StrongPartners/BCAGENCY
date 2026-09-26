import * as THREE from 'three';
import { getShape, NAVY, NAVY2 } from './voxelShapes';

const DARK_MAP = { [NAVY]: 0xdbe6f7, [NAVY2]: 0xa9bde6 };

/*
 * Küp ikonları: tek bir gizli WebGL sahnesinde şekli bir kez çizip PNG'ye çevirir.
 * Onlarca blog kartı için onlarca canlı sahne açmak yerine resim kullanılır.
 */
const cache = new Map();
let ctx = null;

function setup() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1); renderer.setSize(192, 192, false);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
  scene.add(new THREE.AmbientLight(0xffffff, 0.95));
  const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(6, 9, 12); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 0.8); rim.position.set(-9, -5, -8); scene.add(rim);
  const group = new THREE.Group(); scene.add(group);
  return { renderer, scene, camera, group, geo: new THREE.BoxGeometry(0.9, 0.9, 0.9), mat: new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.15 }) };
}

export function renderVoxelIcon(name, points, palette = 'light') {
  const key = `${name}|${palette}`;
  if (cache.has(key)) return cache.get(key);
  try {
    if (!ctx) ctx = setup();
    const { renderer, scene, camera, group, geo, mat } = ctx;
    const pts = points || getShape(name);
    const mesh = new THREE.InstancedMesh(geo, mat, pts.length);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), c = new THREE.Color();
    let ext = 0;
    pts.forEach((p, i) => {
      const s = p.k ?? 1;
      m.compose(new THREE.Vector3(p.x, p.y, p.z || 0), q, new THREE.Vector3(s, s, s));
      mesh.setMatrixAt(i, m); mesh.setColorAt(i, c.setHex(palette === 'dark' ? (DARK_MAP[p.c] ?? p.c) : p.c));
      ext = Math.max(ext, Math.abs(p.x), Math.abs(p.y));
    });
    group.clear(); group.add(mesh);
    group.rotation.set(-0.12, points ? 0.22 : 0.35, 0);
    camera.position.set(0, 0, (ext + 1.5) / Math.tan(THREE.MathUtils.degToRad(15)));
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    const url = renderer.domElement.toDataURL('image/png');
    mesh.dispose();
    cache.set(key, url);
    return url;
  } catch {
    return null;
  }
}
