// Page-load choreography. The rhythm lives here, in one table:
// brand → nav → label → headline lines → copy → CTAs → figures → metadata.
import { prefersReducedMotion } from './prefs.js';

const SEQUENCE = [
  // [selector, start (s), stagger between matches (s)]
  ['.site-header .brand', 0.0, 0],
  ['.site-header .menu-toggle', 0.12, 0],
  ['.site-nav__list > li', 0.12, 0.06],
  ['.site-header__inner > .lang-toggle', 0.4, 0],
  ['.hero__label', 0.3, 0],
  ['.hero__meta--studio', 0.4, 0],
  ['.hero__title .line__inner', 0.36, 0.09],
  ['.hero__support', 0.72, 0],
  ['.hero__cta .cta', 0.82, 0.07],
  ['.hero-figure--b', 0.7, 0],
  ['.hero-figure--a', 0.82, 0],
  ['.hero-figure--c', 0.94, 0],
  ['.hero-figure--d', 1.06, 0],
  ['.hero__meta--place', 1.1, 0],
  ['.hero__scroll', 1.2, 0],
];

const FONT_WAIT_MAX = 900; // ms — never hold the page hostage to a slow font

export async function runIntro(root = document) {
  const html = document.documentElement;
  const compress = prefersReducedMotion() ? 0.25 : 1;
  let last = 0;

  SEQUENCE.forEach(([selector, start, stagger]) => {
    root.querySelectorAll(selector).forEach((el, i) => {
      const d = (start + i * stagger) * compress;
      el.style.setProperty('--d', `${d.toFixed(3)}s`);
      last = Math.max(last, d);
    });
  });

  // Start once display fonts are ready so lines don't reflow mid-reveal.
  await Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, FONT_WAIT_MAX))]);
  requestAnimationFrame(() => requestAnimationFrame(() => html.classList.add('is-ready')));

  // Hand elements back to their normal styles (hover, scroll) once settled.
  setTimeout(() => {
    root.querySelectorAll('[data-intro]').forEach((el) => {
      el.removeAttribute('data-intro');
      el.style.removeProperty('--d');
    });
    html.classList.add('intro-done');
  }, (last + 1.4) * 1000);
}
