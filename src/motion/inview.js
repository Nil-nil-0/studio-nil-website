// Marks elements as they enter the viewport (once), so CSS can bring them in.
// Without IntersectionObserver or with reduced motion, everything is shown at once.
import { prefersReducedMotion } from './prefs.js';

export function initInView(elements, { rootMargin = '0px 0px -12% 0px' } = {}) {
  const list = [...elements];
  if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
    list.forEach((el) => el.classList.add('is-inview'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-inview');
      io.unobserve(entry.target);
    });
  }, { rootMargin, threshold: 0.08 });
  list.forEach((el) => io.observe(el));
}
