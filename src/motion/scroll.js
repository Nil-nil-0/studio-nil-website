// Scroll response — deliberately subtle.
//  [data-speed]    element drifts at a different rate from the page
//                  (+ lags behind / feels further away, − rises faster / nearer)
//  [data-parallax] image inside its frame shifts against the frame's travel,
//                  so each figure reads as a window with depth
// Transform-only, one rAF loop, runs only while the hero is on screen.
import { prefersReducedMotion, isMobile, lerp, clamp } from './prefs.js';

const EASE = 0.1;       // smoothing per frame (lower = softer, more continuous)
const INNER_RANGE = 5;  // % of the image wrapper's height

export function initScrollMotion(section) {
  if (!section) return;
  // data-speed: vertical drift · data-speed-x: horizontal drift (optional)
  // data-drift-mobile: keep a softened drift on phones (default: none there)
  const drifters = [...section.querySelectorAll('[data-speed]')].map((el) => ({
    el,
    speed: parseFloat(el.dataset.speed) || 0,
    speedX: parseFloat(el.dataset.speedX) || 0,
    mobile: parseFloat(el.dataset.driftMobile) || 0,
    x: 0, y: 0,
  }));
  const layers = [...section.querySelectorAll('[data-parallax]')].map((el) => ({
    el, frame: el.parentElement, y: 0,
  }));

  let visible = true;
  let running = false;
  // Drift starts counting when the section begins to enter the viewport,
  // so a section far down the page doesn't arrive already displaced.
  let origin = 0;
  const measure = () => {
    origin = Math.max(0, section.getBoundingClientRect().top + window.scrollY - window.innerHeight);
  };
  measure();

  const reset = () => {
    drifters.forEach((d) => { d.x = 0; d.y = 0; d.el.style.transform = ''; });
    layers.forEach((l) => { l.y = 0; l.el.style.transform = ''; });
  };

  const frame = () => {
    running = false;
    if (prefersReducedMotion()) return reset();

    const vh = window.innerHeight;
    const sy = window.scrollY;
    const driftOn = !isMobile();
    let moving = false;

    // READ phase — all geometry first, so writes below never force a re-layout.
    const frames = layers.map((l) => l.frame.getBoundingClientRect());

    // WRITE phase
    drifters.forEach((d) => {
      const k = driftOn ? 1 : d.mobile;           // phones: 0, or the element's softened factor
      const travel = Math.max(0, sy - origin) * k;
      const ty = travel * d.speed;
      const tx = travel * d.speedX;
      d.y = lerp(d.y, ty, EASE);
      d.x = lerp(d.x, tx, EASE);
      if (Math.abs(ty - d.y) > 0.1 || Math.abs(tx - d.x) > 0.1) moving = true;
      else { d.y = ty; d.x = tx; }
      d.el.style.transform = d.x || d.y ? `translate3d(${d.x.toFixed(2)}px, ${d.y.toFixed(2)}px, 0)` : '';
    });

    layers.forEach((l, i) => {
      const r = frames[i];
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
  window.addEventListener('resize', () => { measure(); request(); }, { passive: true });
  request();
}
