// Küp dünyası kontrolü: hangi sayfada hangi şeklin, nasıl bir yerleşimde görüneceği.
// mode 'scroll' → ana sayfada [data-voxel-step] bölümleri belirler
// mode 'fixed'  → sayfaya özel sabit bir şekil, hero'yu geçince solar
// mode 'hidden' → sahne görünmez
export const voxel = { mode: 'hidden', target: 'bc' };

// Her menü sayfasının kendi şekli (adlar VoxelWorld'deki SHAPE_DEFS ile aynı)
const ROUTE_SHAPES = [
  [/^\/hizmetler\/sosyal-medya/, 'heart'],
  [/^\/hizmetler\/reels-video-edit/, 'reels'],
  [/^\/hizmetler\/web-tasarim/, 'browser'],
  [/^\/hizmetler\/uygulama-gelistirme/, 'phone'],
  [/^\/hizmetler\/crm-yazilim/, 'layers'],
  [/^\/hizmetler\/seo/, 'magnifier'],
  [/^\/hizmetler\/google-ads/, 'target'],
  [/^\/hizmetler\/produksiyon/, 'clapper'],
  [/^\/hizmetler\/drone-cekim/, 'drone'],
  [/^\/hizmetler\/fotograf-video/, 'camera'],
  [/^\/about\/?$/, 'coffee'],
  [/^\/blog\/?$/, 'pencil'],
  [/^\/contact\/?$/, 'chat'],
];

// Bir yolun küp şekli (menü ikonları için); eşleşme yoksa BC
export const shapeForPath = (path) => ROUTE_SHAPES.find(([re]) => re.test(path))?.[1] ?? 'bc';

export function syncVoxelToRoute(pathname) {
  if (pathname === '/') { voxel.mode = 'scroll'; return; }
  const hit = ROUTE_SHAPES.find(([re]) => re.test(pathname));
  if (hit) { voxel.mode = 'fixed'; voxel.target = hit[1]; return; }
  voxel.mode = 'hidden';
}
