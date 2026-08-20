import { useEffect } from 'react';

// Corporate palette: alternancia entre #56A9F8 y #0A3554
const CORPORATE_PALETTE = [
  '#56A9F8',
  '#0A3554',
];

/**
 * Alternates the mobile browser header color (<meta name="theme-color">)
 * and `--brand-dynamic-color` without thrashing the main thread.
 * Starts only after page load to preserve 100% initial render performance.
 */
export function useCorporateHeaderColor() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    let metaTag = document.querySelector('meta[name="theme-color"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'theme-color';
      metaTag.content = CORPORATE_PALETTE[0];
      document.head.appendChild(metaTag);
    }

    let currentIndex = 0;
    let timerId = null;

    const switchColor = () => {
      currentIndex = (currentIndex + 1) % CORPORATE_PALETTE.length;
      const nextColor = CORPORATE_PALETTE[currentIndex];
      if (metaTag) {
        metaTag.setAttribute('content', nextColor);
      }
      document.documentElement.style.setProperty('--brand-dynamic-color', nextColor);
    };

    // Delay start until after initial page rendering is completely finished
    const startTimeout = setTimeout(() => {
      timerId = setInterval(switchColor, 3500);
    }, 3000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerId) clearInterval(timerId);
      } else {
        if (timerId) clearInterval(timerId);
        timerId = setInterval(switchColor, 3500);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(startTimeout);
      if (timerId) clearInterval(timerId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
