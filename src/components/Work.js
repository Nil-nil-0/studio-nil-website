import { t } from '../i18n/index.js';
import { projects } from '../data/projects.js';
import { arrowUpRight } from './icons.js';

// Selected work: large photographs at different widths and heights on the grid,
// one quiet line of Clash beneath each. No cards, borders, radii or shadows.
function WorkItem(p, index) {
  const n = String(index + 1).padStart(2, '0');
  const speed = p.speed ? `data-speed="${p.speed}"` : '';
  return `
  <article class="work-item work-item--${p.layout}" ${speed} style="--ratio:${p.ratio}">
    <a class="work-item__link" href="${p.href}">
      <span class="work-item__frame">
        <span class="work-item__plx" data-parallax>
          <img class="work-item__img" src="${p.src}" srcset="${p.srcset}" sizes="(max-width: 767px) 100vw, 75vw"
            alt="${p.alt}" loading="lazy" decoding="async" width="1600" height="1000" />
        </span>
      </span>
      <span class="work-item__caption">
        <span class="work-item__title"><span data-i18n="placeholder.project">${t('placeholder.project')}</span> ${n}<span class="work-item__arrow" aria-hidden="true">${arrowUpRight}</span></span>
        <span class="work-item__discipline" data-i18n="disciplines.${p.discipline}">${t(`disciplines.${p.discipline}`)}</span>
      </span>
    </a>
  </article>`;
}

export function Work() {
  return `
  <section class="work" id="work" aria-labelledby="work-title">
    <div class="work__inner">
      <header class="work__head">
        <p class="t-meta work__label" data-i18n="work.label">${t('work.label')}</p>
        <h2 class="work__title" id="work-title" data-i18n="work.title">${t('work.title')}</h2>
      </header>
      <div class="work__list">${projects.map(WorkItem).join('')}</div>
    </div>
  </section>`;
}
