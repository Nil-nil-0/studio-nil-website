import { t } from '../i18n/index.js';
import { logos, placeholderMarks } from '../data/logos.js';

// Client strip — continuous horizontal movement, faded in and out at both edges.
// Official client SVGs from src/assets/clients/ when listed in data/logos.js;
// until then, neutral placeholder marks (no real client names).
const files = import.meta.glob('../assets/clients/*.svg', { query: '?url', import: 'default', eager: true });

export function Logos() {
  const real = logos
    .map((l) => ({ ...l, url: Object.entries(files).find(([k]) => k.endsWith(`/${l.file}`))?.[1] }))
    .filter((l) => l.url);
  const item = (hidden) => (real.length
    ? real.map((l) => `<li class="clients__item"><img src="${l.url}" alt="${hidden ? '' : l.name}" loading="lazy" decoding="async" /></li>`)
    : placeholderMarks.map((m) => `<li class="clients__item clients__item--placeholder">${m}</li>`)
  ).join('');
  const run = (hidden) => `<ul class="clients__run"${hidden ? ' aria-hidden="true"' : ''}>${item(hidden)}</ul>`;
  return `
  <section class="clients" aria-labelledby="clients-title">
    <h2 class="visually-hidden" id="clients-title" data-i18n="clients.label">${t('clients.label')}</h2>
    <div class="clients__mask"><div class="clients__track">${run(false)}${run(true)}${run(true)}${run(true)}</div></div>
  </section>`;
}
