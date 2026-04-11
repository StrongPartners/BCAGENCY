/**
 * BC Creative Agency — Design Tokens
 *
 * A single, canonical source-of-truth for design decisions shared by
 * every UI primitive and page. Token categories and naming conventions
 * are inspired by the design systems catalogued in
 * alexpate/awesome-design-systems, specifically:
 *
 *   - IBM Carbon (spacing + motion scales)
 *   - Material Design 3 (elevation + state layers)
 *   - Shopify Polaris (semantic color roles)
 *   - GitHub Primer (radius + typography scale)
 *   - Atlassian Design System (z-index layers)
 *
 * The tokens are plain JS objects so they can be consumed from React
 * components, tests, or Storybook. They do NOT replace Tailwind — they
 * complement it by giving JS-land access to the same values that
 * `@theme` exposes in `src/index.css`.
 */

export const color = Object.freeze({
  brand: {
    50:  '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  coral: {
    50:  '#fff1f0',
    400: '#ff7a6e',
    500: '#ff6b6b',
    600: '#ee5a5a',
  },
  mint: {
    50:  '#effefa',
    400: '#4ecdc4',
    500: '#2bbab0',
    600: '#1f9691',
  },
  sun: {
    50:  '#fffdeb',
    400: '#ffd93d',
    500: '#fbc71a',
  },
  ink: {
    50:  '#f7f7f8',
    100: '#eeeef0',
    400: '#8c8c95',
    700: '#35353b',
    800: '#222226',
    900: '#101014',
  },
  neutral: {
    0:   '#ffffff',
    50:  '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    500: '#6b7280',
    700: '#374151',
    900: '#111827',
    1000:'#000000',
  },
  // Semantic roles (Polaris-inspired)
  semantic: {
    success: '#4ecdc4',
    warning: '#ffd93d',
    danger:  '#ff6b6b',
    info:    '#6366f1',
  },
});

/** Spacing scale — 4px baseline, Carbon-style tokens. */
export const space = Object.freeze({
  0:   '0',
  1:   '0.25rem', // 4px
  2:   '0.5rem',  // 8px
  3:   '0.75rem', // 12px
  4:   '1rem',    // 16px
  5:   '1.25rem', // 20px
  6:   '1.5rem',  // 24px
  8:   '2rem',    // 32px
  10:  '2.5rem',  // 40px
  12:  '3rem',    // 48px
  16:  '4rem',    // 64px
  20:  '5rem',    // 80px
  24:  '6rem',    // 96px
  32:  '8rem',    // 128px
});

/** Border radius scale (Primer-inspired). */
export const radius = Object.freeze({
  none:  '0',
  sm:    '0.25rem',
  md:    '0.5rem',
  lg:    '1rem',
  xl:    '1.5rem',
  '2xl': '2rem',
  '3xl': '3rem',
  full:  '9999px',
});

/** Elevation / shadow scale (Material 3 inspired). */
export const elevation = Object.freeze({
  0: 'none',
  1: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  2: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  3: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  4: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  5: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  6: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
});

/** Typography scale — font families, sizes, weights, line heights. */
export const typography = Object.freeze({
  fontFamily: {
    sans: '"DM Sans", "Inter", sans-serif',
    mono: '"JetBrains Mono", "Menlo", monospace',
  },
  fontSize: {
    xs:   '0.75rem',
    sm:   '0.875rem',
    base: '1rem',
    lg:   '1.125rem',
    xl:   '1.25rem',
    '2xl':'1.5rem',
    '3xl':'1.875rem',
    '4xl':'2.25rem',
    '5xl':'3rem',
    '6xl':'3.75rem',
    '7xl':'4.5rem',
    '8xl':'6rem',
  },
  fontWeight: {
    regular: 400,
    medium:  500,
    semibold:600,
    bold:    700,
    black:   900,
  },
  lineHeight: {
    tight:   '1.1',
    snug:    '1.25',
    normal:  '1.5',
    relaxed: '1.625',
    loose:   '2',
  },
});

/** Motion tokens — durations and easings (Material 3 inspired). */
export const motion = Object.freeze({
  duration: {
    instant: '0ms',
    fast:    '150ms',
    normal:  '250ms',
    slow:    '400ms',
    slower:  '600ms',
  },
  easing: {
    standard:    'cubic-bezier(0.2, 0, 0, 1)',
    emphasized:  'cubic-bezier(0.2, 0, 0, 1)',
    decelerated: 'cubic-bezier(0, 0, 0, 1)',
    accelerated: 'cubic-bezier(0.3, 0, 1, 1)',
  },
});

/** Z-index scale (Atlassian-inspired). */
export const zIndex = Object.freeze({
  base:      0,
  raised:    10,
  dropdown:  100,
  sticky:    200,
  overlay:   300,
  modal:     400,
  toast:     500,
  tooltip:   600,
});

/** Responsive breakpoints (matches Tailwind defaults). */
export const breakpoint = Object.freeze({
  sm:  '640px',
  md:  '768px',
  lg:  '1024px',
  xl:  '1280px',
  '2xl':'1536px',
});

/**
 * A convenience bundle so consumers can do:
 *   import { tokens } from './designSystem';
 */
export const tokens = Object.freeze({
  color,
  space,
  radius,
  elevation,
  typography,
  motion,
  zIndex,
  breakpoint,
});

export default tokens;
