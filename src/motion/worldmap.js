// Pixel world map — Natural Earth land (data/landMask.js) regrouped into 4° cells
// and drawn as white squares at low opacity on black. Only confirmed places
// (data/countries.js) are marked. Redrawn on resize; the marker breathes slowly.
// Reduced motion: a still map.
import { LAND_W, LAND_H, LAND_HEX } from '../data/landMask.js';
import { countries } from '../data/countries.js';
import { prefersReducedMotion } from './prefs.js';

const GROUP = 2;                 // 2 × 2° mask cells → 4° map pixels
const LAT_TOP = 80, LAT_BOTTOM = -58;

function landAt(r, c) {
  const i = r * LAND_W + c;
  return (parseInt(LAND_HEX[i >> 2], 16) >> (3 - (i & 3))) & 1;
}

function buildCells() {
  const cols = LAND_W / GROUP, rows = LAND_H / GROUP;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    const lat = 90 - (r + 0.5) * (180 / rows);
    if (lat > LAT_TOP || lat < LAT_BOTTOM) continue;
    for (let c = 0; c < cols; c++) {
      let n = 0;
      for (let dr = 0; dr < GROUP; dr++) for (let dc = 0; dc < GROUP; dc++) n += landAt(r * GROUP + dr, c * GROUP + dc);
      if (n >= 2) cells.push([c, lat]);
    }
  }
  return { cells, cols };
}

export function initWorldMap(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const { cells, cols } = buildCells();
  let w = 0, h = 0, dpr = 1, visible = false, raf = 0;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  };

  const draw = (now) => {
    const W = canvas.width, H = canvas.height;
    const step = W / cols;
    const size = step * 0.62;
    const mapH = ((LAT_TOP - LAT_BOTTOM) / 4) * step;
    const top = (H - mapH) / 2;
    const y = (lat) => top + ((LAT_TOP - lat) / 4) * step;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = 0.16;
    for (const [c, lat] of cells) ctx.fillRect(c * step + (step - size) / 2, y(lat) - size / 2, size, size);
    const pulse = prefersReducedMotion() ? 0.5 : (Math.sin(now / 900) + 1) / 2;
    for (const m of countries) {
      const x = ((m.lon + 180) / 360) * W;
      const my = y(m.lat);
      ctx.globalAlpha = 0.12 + 0.18 * pulse;
      const halo = size * (2.2 + pulse * 0.8);
      ctx.fillRect(x - halo / 2, my - halo / 2, halo, halo);
      ctx.globalAlpha = 1;
      ctx.fillRect(x - size * 0.7, my - size * 0.7, size * 1.4, size * 1.4);
    }
    ctx.globalAlpha = 1;
  };

  const loop = (now) => {
    raf = 0;
    draw(now);
    if (visible && !prefersReducedMotion()) raf = requestAnimationFrame(loop);
  };

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) { resize(); raf = requestAnimationFrame(loop); }
  }).observe(canvas);
  window.addEventListener('resize', () => { resize(); draw(performance.now()); }, { passive: true });
  resize();
  draw(0);
}
