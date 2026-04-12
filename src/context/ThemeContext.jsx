import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

/**
 * Themes inspired by the design systems cataloged in
 * github.com/alexpate/awesome-design-systems:
 *
 * 1. Material  — Google Material Design 3
 * 2. Carbon    — IBM Carbon Design System
 * 3. Polaris   — Shopify Polaris
 * 4. Primer    — GitHub Primer
 */
export const THEMES = [
  {
    id: 'material',
    name: { tr: 'Material', en: 'Material' },
    description: { tr: 'Google Material Design 3', en: 'Google Material Design 3' },
    preview: 'bg-gradient-to-br from-[#6750A4] via-[#D0BCFF] to-[#EADDFF]',
  },
  {
    id: 'carbon',
    name: { tr: 'Carbon', en: 'Carbon' },
    description: { tr: 'IBM Carbon — koyu, yapısal', en: 'IBM Carbon — dark, structural' },
    preview: 'bg-gradient-to-br from-[#161616] via-[#262626] to-[#0f62fe]',
  },
  {
    id: 'polaris',
    name: { tr: 'Polaris', en: 'Polaris' },
    description: { tr: 'Shopify Polaris — temiz, pratik', en: 'Shopify Polaris — clean, practical' },
    preview: 'bg-gradient-to-br from-[#f6f6f7] via-[#ffffff] to-[#008060]',
  },
  {
    id: 'primer',
    name: { tr: 'Primer', en: 'Primer' },
    description: { tr: 'GitHub Primer — minimal, compact', en: 'GitHub Primer — minimal, compact' },
    preview: 'bg-gradient-to-br from-[#f6f8fa] via-[#ffffff] to-[#0969da]',
  },
];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bc-theme') || 'material';
    }
    return 'material';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.removeAttribute('data-theme');
    if (theme !== 'material') {
      root.setAttribute('data-theme', theme);
    }
    localStorage.setItem('bc-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;
