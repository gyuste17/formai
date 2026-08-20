import { useEffect } from 'react';

// Corporate palette of blues and greens (ajustada un 20% más oscura e intensa)
const CORPORATE_PALETTE = [
  '#1d7281', // Azul turquesa corporativo más profundo
  '#0f5966', // Azul petróleo oscuro
  '#095c54', // Verde azulado / Deep Teal
  '#04724d', // Verde esmeralda corporativo intenso
  '#0a6e62', // Verde azulado marino intenso
  '#025c8a', // Azul cerúleo tecnológico oscuro
  '#0b4d59', // Azul verdoso corporativo profundo
];

// Helper to convert hex to RGB
function hexToRgb(hex) {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

// Helper to convert RGB to hex
function rgbToHex(r, g, b) {
  return '#' + [r, g, b]
    .map(x => Math.round(Math.max(0, Math.min(255, x))).toString(16).padStart(2, '0'))
    .join('');
}

// Interpolate between two RGB colors
function interpolateColor(colorA, colorB, factor) {
  const rgbA = hexToRgb(colorA);
  const rgbB = hexToRgb(colorB);
  return rgbToHex(
    rgbA.r + (rgbB.r - rgbA.r) * factor,
    rgbA.g + (rgbB.g - rgbA.g) * factor,
    rgbA.b + (rgbB.b - rgbA.b) * factor
  );
}

/**
 * Alternates the mobile browser header color (<meta name="theme-color">)
 * smoothly between corporate blues and greens.
 * Also sets CSS variable `--brand-dynamic-color` for UI elements.
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

    const stepDuration = 1750; // 50% más rápida (1.75s por tono)
    const totalSteps = CORPORATE_PALETTE.length;
    let startTime = performance.now();
    let animFrameId = null;
    let isPaused = false;
    let lastColor = '';

    const updateColor = (now) => {
      if (isPaused) return;

      const elapsed = (now - startTime) % (stepDuration * totalSteps);
      const stepIndex = Math.floor(elapsed / stepDuration);
      const nextIndex = (stepIndex + 1) % totalSteps;
      const progressInStep = (elapsed % stepDuration) / stepDuration;

      // Smooth ease-in-out easing for gradual transition between palette tones
      const easeFactor = progressInStep < 0.5
        ? 2 * progressInStep * progressInStep
        : 1 - Math.pow(-2 * progressInStep + 2, 2) / 2;

      const currentColor = interpolateColor(
        CORPORATE_PALETTE[stepIndex],
        CORPORATE_PALETTE[nextIndex],
        easeFactor
      );

      if (currentColor !== lastColor) {
        lastColor = currentColor;
        metaTag.setAttribute('content', currentColor);
        document.documentElement.style.setProperty('--brand-dynamic-color', currentColor);
      }

      animFrameId = requestAnimationFrame(updateColor);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true;
        if (animFrameId) cancelAnimationFrame(animFrameId);
      } else {
        isPaused = false;
        startTime = performance.now();
        animFrameId = requestAnimationFrame(updateColor);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animFrameId = requestAnimationFrame(updateColor);

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
