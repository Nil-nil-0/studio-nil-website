import { awards } from '../data/awards.js';

// Recognition — verified entries only. Renders nothing while the list is empty.
export function Awards() {
  if (!awards.length) return '';
  return `
  <section class="awards section" aria-label="Recognition">
    <ul class="section__inner awards__list">
      ${awards.map((a) => `<li><a href="${a.href}" target="_blank" rel="noopener"><span>${a.award}</span><span>${a.project}</span><span>${a.year}</span></a></li>`).join('')}
    </ul>
  </section>`;
}
