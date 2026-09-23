// Shared motion preferences. Every motion module asks here before moving anything.
const reduceQuery = matchMedia('(prefers-reduced-motion: reduce)');
const finePointerQuery = matchMedia('(hover: hover) and (pointer: fine)');
const mobileQuery = matchMedia('(max-width: 767px)');

export const prefersReducedMotion = () => reduceQuery.matches;
export const hasFinePointer = () => finePointerQuery.matches;
export const isMobile = () => mobileQuery.matches;
export const onMotionPrefChange = (fn) => reduceQuery.addEventListener('change', fn);

export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
