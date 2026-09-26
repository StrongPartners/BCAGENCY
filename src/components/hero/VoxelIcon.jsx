import React, { useEffect, useState } from 'react';

/* Küçük, statik küp ikonu (blog kartları). Çizim ilk kullanımda tembel yüklenir. */
const VoxelIcon = ({ name, className = '', title }) => {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    let alive = true;
    import('./voxelIconRenderer').then(({ renderVoxelIcon }) => { if (alive) setSrc(renderVoxelIcon(name)); });
    return () => { alive = false; };
  }, [name]);
  if (!src) return <span className={className} aria-hidden="true" />;
  return <img src={src} alt={title || ''} aria-hidden={title ? undefined : true} className={className} width="36" height="36" />;
};

export default VoxelIcon;
