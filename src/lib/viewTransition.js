import { flushSync } from 'react-dom';

// Sayfa değişimini tarayıcının View Transitions API'siyle sarar (rack-focus geçişi).
// Destek yoksa ya da kullanıcı hareketi azaltmayı seçtiyse doğrudan geçer.
export function withViewTransition(update) {
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (typeof document === 'undefined' || !document.startViewTransition || reduce) {
    update();
    return;
  }
  document.startViewTransition(() => {
    flushSync(update);
  });
}
