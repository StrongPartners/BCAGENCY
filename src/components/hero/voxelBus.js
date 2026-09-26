// Küp dünyası kontrolü: hangi sayfada hangi şeklin, nasıl bir yerleşimde görüneceği.
// mode 'scroll' → ana sayfada [data-voxel-step] bölümleri belirler
// mode 'fixed'  → sabit bir şekil (hizmet sayfaları), hero'yu geçince solar
// mode 'hidden' → sahne görünmez
export const voxel = { mode: 'hidden', target: 0 };

// Şekil sırası VoxelWorld'deki SHAPES ile aynı: 0 BC, 1 telefon, 2 tarayıcı, 3 katmanlar, 4 grafik, 5 BC
const ROUTE_SHAPES = [
  [/^\/hizmetler\/(sosyal-medya|reels-video-edit|produksiyon|fotograf-video|drone-cekim)/, 1],
  [/^\/hizmetler\/web-tasarim/, 2],
  [/^\/hizmetler\/(uygulama-gelistirme|crm-yazilim)/, 3],
  [/^\/hizmetler\/(seo|google-ads)/, 4],
];

export function syncVoxelToRoute(pathname) {
  if (pathname === '/') { voxel.mode = 'scroll'; return; }
  const hit = ROUTE_SHAPES.find(([re]) => re.test(pathname));
  if (hit) { voxel.mode = 'fixed'; voxel.target = hit[1]; return; }
  voxel.mode = 'hidden';
}
