import { t } from '../i18n/index.js';

// Global work: a large Feature statement over a monochrome pixel world map
// (motion/worldmap.js — Natural Earth land, confirmed locations only).
export function Global() {
  const lines = t('global.title');
  return `
  <section class="global" aria-labelledby="global-title">
    <canvas class="global__map" role="img" aria-label="${t('global.mapLabel')}" data-i18n-attr="aria-label:global.mapLabel"></canvas>
    <div class="section__inner global__inner">
      <p class="t-meta section__label" data-i18n="global.label">${t('global.label')}</p>
      <h2 class="global__title" id="global-title">${lines.map((l, i) => `<span class="global__line" data-i18n="global.title.${i}">${l}</span>`).join('')}</h2>
      <p class="global__text" data-i18n="global.text">${t('global.text')}</p>
    </div>
  </section>`;
}
