import { t } from '../i18n/index.js';

// Services: each one a large Feature statement with a short Clash description.
// Read by scrolling, not scanned as a grid. No icons, no cards.
export function Services() {
  const items = t('services.items');
  return `
  <section class="services" id="services" aria-labelledby="services-title">
    <div class="section__inner">
      <h2 class="t-meta section__label" id="services-title" data-i18n="services.label">${t('services.label')}</h2>
      <ol class="services__list">
        ${items
          .map(
            (item, i) => `
          <li class="service service--${i % 2 ? 'b' : 'a'}" data-inview>
            <h3 class="service__title" data-i18n="services.items.${i}.title">${item.title}</h3>
            <p class="service__text" data-i18n="services.items.${i}.text">${item.text}</p>
          </li>`
          )
          .join('')}
      </ol>
    </div>
  </section>`;
}
