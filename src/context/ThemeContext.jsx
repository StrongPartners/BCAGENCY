import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = [
  {
    id: 'playground',
    name: { tr: 'Renkli', en: 'Colorful' },
    description: { tr: 'Canli renkler, yumusak golgeler', en: 'Vibrant colors, soft shadows' },
    preview: 'bg-gradient-to-br from-brand-400 via-coral-400 to-mint-400',
  },
  {
    id: 'midnight',
    name: { tr: 'Gece', en: 'Midnight' },
    description: { tr: 'Koyu tema, neon vurgular', en: 'Dark theme, neon accents' },
    preview: 'bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-brand-900',
  },
  {
    id: 'minimal',
    name: { tr: 'Minimal', en: 'Minimal' },
    description: { tr: 'Sade, monokrom, temiz', en: 'Clean, monochrome, pure' },
    preview: 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300',
  },
  {
    id: 'corporate',
    name: { tr: 'Kurumsal', en: 'Corporate' },
    description: { tr: 'Lacivert, gold, profesyonel', en: 'Navy, gold, professional' },
    preview: 'bg-gradient-to-br from-[#0c3b8f] via-[#1a56db] to-[#f59e0b]',
  },
];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bc-theme') || 'playground';
    }
    return 'playground';
  });

  useEffect(() => {
    const root = document.documentElement;
    // Remove all theme attributes
    root.removeAttribute('data-theme');
    // Apply theme (playground is default/no attribute)
    if (theme !== 'playground') {
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
