// Statement: words brighten in reading order as the section moves through the
// viewport. Re-splits after a language change. Reduced motion: all words lit.
import { prefersReducedMotion, clamp } from './prefs.js';
import { onLangChange } from '../i18n/index.js';

export function initStatement(el) {
  if (!el) return;
  let words = [];
  const split = () => {
    const text = el.textContent;
    el.innerHTML = text.split(/(\s+)/).map((w) => (w.trim() ? `<span class="w">${w}</span>` : w)).join('');
    words = [...el.querySelectorAll('.w')];
    update();
  };
  let raf = 0;
  const update = () => {
    raf = 0;
    if (prefersReducedMotion()) { words.forEach((w) => w.classList.remove('is-dim')); return; }
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0, 1);
    const lit = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle('is-dim', i >= lit));
  };
  window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  onLangChange(() => requestAnimationFrame(split));
  split();
}
