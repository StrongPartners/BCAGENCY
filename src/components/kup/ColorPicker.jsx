import React from 'react';
import { PRESETS, brandPalette, intToHex, hexToInt } from '../hero/voxelShapes';

/*
 * Küp renkleri: hazır paletler + firmanın kendi iki rengi.
 * value: null (BC renkleri) ya da [ana, ikinci] (sayı).
 */
const swatch = (c) => {
  const p = brandPalette(c?.[0] ?? null, c?.[1] ?? null, c);
  if (c && c.length > 2) return `conic-gradient(${c.map((x, i) => `${intToHex(x)} ${(i / c.length) * 360}deg ${((i + 1) / c.length) * 360}deg`).join(', ')})`;
  return `linear-gradient(135deg, ${intToHex(p.letters[0])} 0 50%, ${intToHex(p.letters[1])} 50% 100%)`;
};
const same = (a, b) => (a == null && b == null) || (a && b && a.length === b.length && a.every((x, i) => x === b[i]));

export default function ColorPicker({ value, onChange, tr = true }) {
  const c1 = value?.[0] ?? 0x1e3a8a, c2 = value?.[1] ?? 0x5aa9cc;
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-2">{tr ? 'Renkler' : 'Colours'}</p>
      <div className="flex flex-wrap items-center gap-2">
        {PRESETS.map((p) => (
          <button key={p.id} type="button" onClick={() => onChange(p.c)} aria-pressed={same(value, p.c)} title={p.label} aria-label={p.label}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transition-transform hover:scale-110 ${same(value, p.c) ? 'border-accent-500 scale-110' : 'border-white/15'}`}
            style={{ background: swatch(p.c) }} />
        ))}
        <span className="basis-full h-0" aria-hidden="true" />
        <label className="inline-flex items-center gap-2 rounded-full border border-white/15 pl-1.5 pr-3 py-1 text-sm cursor-pointer hover:border-white/40">
          <input type="color" value={intToHex(c1)} onChange={(e) => onChange([hexToInt(e.target.value), c2])} className="w-7 h-7 rounded-full border-0 bg-transparent p-0 cursor-pointer" aria-label={tr ? 'Ana renk' : 'Main colour'} />
          {tr ? 'Ana renk' : 'Main'}
        </label>
        <label className="inline-flex items-center gap-2 rounded-full border border-white/15 pl-1.5 pr-3 py-1 text-sm cursor-pointer hover:border-white/40">
          <input type="color" value={intToHex(c2)} onChange={(e) => onChange([c1, hexToInt(e.target.value)])} className="w-7 h-7 rounded-full border-0 bg-transparent p-0 cursor-pointer" aria-label={tr ? 'İkinci renk' : 'Second colour'} />
          {tr ? 'İkinci renk' : 'Second'}
        </label>
      </div>
    </div>
  );
}

/** URL ?c=RRGGBB-RRGGBB ↔ renk dizisi */
export const colorsToParam = (c) => (c ? c.map((x) => intToHex(x).slice(1)).join('-') : '');
export const paramToColors = (s) => {
  if (!/^[0-9a-f]{6}(-[0-9a-f]{6}){1,7}$/i.test(s || '')) return null;
  return s.split('-').map((h) => parseInt(h, 16));
};
