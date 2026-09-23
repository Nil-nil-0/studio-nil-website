// Scroll response — deliberately subtle.
//  [data-speed]    element drifts at a different rate from the page
//                  (+ lags behind / feels further away, − rises faster / nearer)
//  [data-parallax] image inside its frame shifts against the frame's travel,
//                  so each figure reads as a window with depth
// Transform-only, one rAF loop, runs only while the hero is on screen.
import { prefersReducedMotion, isMobile, lerp, clamp } from './prefs.js';

const EASE = 0.14;      // smoothing per frame (lower = softer)
const INNER_RANGE = 5;  // % of the image wrapper's height

export function initScrollMotion(section) {
  if (!section) return;
  const drifters = [...section.querySelectorAll('[data-speed]')].map((el) => ({
    el, speed: parseFloat(el.dataset.speed) || 0, y: 0,
  }));
  const layers = [...section.querySelectorAll('[data-parallax]')].map((el) => ({
    el, frame: el.parentElement, y: 0,
  }));

  let visible = true;
  let running = false;

  const reset = () => {
    drifters.forEach((d) => { d.y = 0; d.el.style.transform = ''; });
    layers.forEach((l) => { l.y = 0; l.el.style.transform = ''; });
  };

  const frame = () => {
    running = false;
    if (prefersReducedMotion()) return reset();

    const vh = window.innerHeight;
    const sy = window.scrollY;
    const driftOn = !isMobile();
    let moving = false;

    drifters.forEach((d) => {
      const target = driftOn ? sy * d.speed : 0;
      d.y = lerp(d.y, target, EASE);
      if (Math.abs(target - d.y) > 0.1) moving = true; else d.y = target;
      d.el.style.transform = d.y ? `translate3d(0, ${d.y.toFixed(2)}px, 0)` : '';
    });

    layers.forEach((l) => {
      const r = l.frame.getBoundingClientRect();
      const progress = clamp((r.top + r.height / 2 - vh / 2) / vh, -1, 1); // −1 top … 1 bottom
      const target = progress * INNER_RANGE;
      l.y = lerp(l.y, target, EASE);
      if (Math.abs(target - l.y) > 0.01) moving = true; else l.y = target;
      l.el.style.transform = `translate3d(0, ${l.y.toFixed(3)}%, 0)`;
    });

    if (moving) request();
  };

  const request = () => {
    if (running || !visible) return;
    running = true;
    requestAnimationFrame(frame);
  };

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) request();
  }).observe(section);

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request, { passive: true });
  request();
}
