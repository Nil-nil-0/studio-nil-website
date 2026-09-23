// Hover companions — the exploratory layer.
// Hovering a figure brings two small related images (details, applications,
// process) next to the cursor. They trail it at different rates, which reads
// as depth. Arrangement changes on every visit, from a fixed set of presets:
// unpredictable, but always composed.
import { prefersReducedMotion, hasFinePointer, lerp, clamp } from './prefs.js';

const PRESETS = [
  [{ x: 0.95, y: -1.05 }, { x: -1.35, y: 0.45 }],
  [{ x: -1.15, y: -0.95 }, { x: 1.05, y: 0.75 }],
  [{ x: 1.2, y: 0.1 }, { x: -0.55, y: -1.45 }],
];
const ITEMS = [
  { width: '9.5rem', ratio: '4 / 5', follow: 0.16 },
  { width: '7rem', ratio: '1 / 1', follow: 0.09 },
];
const UNIT = 110; // px — preset offsets are multiples of this

export function initHoverReveal(section, images) {
  if (!section || !images?.length) return;

  const layer = document.createElement('div');
  layer.className = 'reveal-layer';
  layer.setAttribute('aria-hidden', 'true');
  const items = ITEMS.map((cfg) => {
    const el = document.createElement('div');
    el.className = 'reveal-layer__item';
    el.style.setProperty('--w', cfg.width);
    el.style.setProperty('--ratio', cfg.ratio);
    const img = document.createElement('img');
    img.alt = '';
    img.decoding = 'async';
    el.appendChild(img);
    layer.appendChild(el);
    return { el, img, cfg, x: 0, y: 0, tx: 0, ty: 0 };
  });
  document.body.appendChild(layer);

  let active = null;
  let preset = PRESETS[0];
  let lastPreset = -1;
  let raf = 0;

  const pickPreset = () => {
    let i;
    do { i = Math.floor(Math.random() * PRESETS.length); } while (i === lastPreset && PRESETS.length > 1);
    lastPreset = i;
    preset = PRESETS[i];
  };

  const setTargets = (px, py) => {
    items.forEach((it, i) => {
      const w = it.el.offsetWidth;
      const h = it.el.offsetHeight;
      const tx = px + preset[i].x * UNIT - w / 2;
      const ty = py + preset[i].y * UNIT - h / 2;
      it.tx = clamp(tx, 8, window.innerWidth - w - 8);
      it.ty = clamp(ty, 8, window.innerHeight - h - 8);
    });
  };

  const tick = () => {
    let moving = false;
    items.forEach((it) => {
      const k = prefersReducedMotion() ? 1 : it.cfg.follow;
      it.x = lerp(it.x, it.tx, k);
      it.y = lerp(it.y, it.ty, k);
      if (Math.abs(it.tx - it.x) > 0.2 || Math.abs(it.ty - it.y) > 0.2) moving = true;
      it.el.style.transform = `translate3d(${it.x.toFixed(1)}px, ${it.y.toFixed(1)}px, 0)`;
    });
    raf = moving ? requestAnimationFrame(tick) : 0;
  };
  const loop = () => { if (!raf) raf = requestAnimationFrame(tick); };

  const show = (index, px, py) => {
    const data = images[index];
    if (!data?.companions?.length) return;
    active = index;
    pickPreset();
    items.forEach((it, i) => {
      const c = data.companions[i % data.companions.length];
      if (it.img.src !== c.src) it.img.src = c.src;
    });
    setTargets(px, py);
    // Enter from the cursor point itself, then spread out to the preset.
    items.forEach((it) => {
      it.x = prefersReducedMotion() ? it.tx : px - it.el.offsetWidth / 2;
      it.y = prefersReducedMotion() ? it.ty : py - it.el.offsetHeight / 2;
    });
    items.forEach((it, i) => setTimeout(() => active === index && it.el.classList.add('is-visible'), i * 60));
    loop();
  };

  const hide = () => {
    active = null;
    items.forEach((it) => it.el.classList.remove('is-visible'));
  };

  section.querySelectorAll('[data-reveal]').forEach((link) => {
    const index = Number(link.dataset.reveal);

    link.addEventListener('pointerenter', (e) => {
      if (!hasFinePointer() || e.pointerType !== 'mouse') return;
      show(index, e.clientX, e.clientY);
    });
    link.addEventListener('pointermove', (e) => {
      if (active !== index) return;
      setTargets(e.clientX, e.clientY);
      loop();
    });
    link.addEventListener('pointerleave', hide);

    // Keyboard: companions sit around the focused figure instead of a cursor.
    link.addEventListener('focus', () => {
      if (!link.matches(':focus-visible')) return;
      const r = link.getBoundingClientRect();
      show(index, r.left + r.width / 2, r.top + r.height / 2);
    });
    link.addEventListener('blur', hide);
  });

  window.addEventListener('scroll', () => active !== null && hide(), { passive: true });

  // Warm the cache after the page is idle so the first hover is instant.
  const preload = () => images.forEach((img) => img.companions?.forEach((c) => { new Image().src = c.src; }));
  if (hasFinePointer()) ('requestIdleCallback' in window ? requestIdleCallback(preload, { timeout: 3000 }) : setTimeout(preload, 2000));
}
