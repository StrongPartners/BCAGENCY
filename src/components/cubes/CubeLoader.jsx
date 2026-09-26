import React from 'react';

/* Sayfa yüklenirken: 3x3 küp ızgarası sırayla belirip kaybolur (CSS, three.js gerektirmez). */
const COLORS = ['#1e3a8a', '#3d5a9e', '#7fc0dc', '#3d5a9e', '#5aa9cc', '#1e3a8a', '#7fc0dc', '#1e3a8a', '#e03c31'];

const CubeLoader = ({ className = '' }) => (
  <div className={`grid grid-cols-3 gap-1 w-12 h-12 ${className}`} role="status" aria-label="Yükleniyor">
    {COLORS.map((c, i) => (
      <span key={i} className="cube-loader-cell rounded-[2px]" style={{ background: c, animationDelay: `${((i % 3) + Math.floor(i / 3)) * 0.12}s` }} />
    ))}
  </div>
);

export default CubeLoader;
