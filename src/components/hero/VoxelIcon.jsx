import React, { useEffect, useState } from 'react';

/*
 * Küçük, statik küp ikonu (menüler, blog kartları, süreç adımları).
 * name → hazır şekil; points + name → özel şekil (name önbellek anahtarı olur).
 * Çizim ilk kullanımda tembel yüklenir, her şekil bir kez çizilip önbelleğe alınır.
 */
const VoxelIcon = ({ name, points, palette = 'light', className = '', title }) => {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    let alive = true;
    import('./voxelIconRenderer').then(({ renderVoxelIcon }) => {
      const make = () => { if (alive) setSrc(renderVoxelIcon(name, typeof points === 'function' ? points() : points, palette)); };
      // ilk boyamayı bekletmesin
      if ('requestIdleCallback' in window) window.requestIdleCallback(make, { timeout: 600 }); else setTimeout(make, 0);
    });
    return () => { alive = false; };
    // points name ile eşleşir (önbellek anahtarı); her render'da yeni fonksiyon gelmesi yeniden çizdirmesin
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, palette]);
  if (!src) return <span className={`inline-block ${className}`} aria-hidden="true" />;
  return <img src={src} alt={title || ''} aria-hidden={title ? undefined : true} className={className} width="36" height="36" draggable="false" />;
};

export default VoxelIcon;
