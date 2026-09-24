// Page-load choreography. The rhythm lives here, in one table:
// brand → nav → label → headline lines → copy → CTAs → figures → metadata.
import { prefersReducedMotion } from './prefs.js';

const SEQUENCE = [
  // [selector, start (s), stagger between matches (s)]
  ['.site-header .brand', 0.0, 0],                 // the symbol
  ['.site-header .menu-toggle', 0.08, 0],
  ['.site-nav__list > li', 0.1, 0.05],
  ['.site-header__actions', 0.3, 0],
  ['.hero__title .line__inner', 0.35, 0.08],       // headline, line by line
  ['.hero__frame', 0.8, 0.12],                     // large, then the two small images
  ['.hero__info', 1.1, 0],
  ['.hero__meta', 1.2, 0],
  ['.hero-wordmark__inner', 1.25, 0],              // the wordmark closes the Hero
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
