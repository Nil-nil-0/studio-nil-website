import { t } from '../i18n/index.js';
import { site } from '../data/site.js';
import { heroImages } from '../data/heroImages.js';
import { HeroMedia } from './HeroMedia.js';
import { arrowRight } from './icons.js';

// ---- Sub-components ---------------------------------------------------------

function HeroHeadline() {
  const lines = t('hero.headline');
  // Screen readers get one clean sentence; the split lines are visual only.
  return `
  <h1 class="hero__title t-display" id="hero-title">
    <span class="visually-hidden" data-i18n="hero.headlineA11y">${t('hero.headlineA11y')}</span>
    <span aria-hidden="true" class="hero__title-lines" data-speed="0.06">
      ${lines
        .map(
          (_, i) => `<span class="line line--${i + 1}"><span class="line__inner" data-intro style="--i:${i}" data-i18n="hero.headline.${i}">${lines[i]}</span></span>`
        )
        .join('')}
    </span>
  </h1>`;
}

function HeroCTA() {
  return `
  <div class="hero__cta">
    <a class="cta cta--primary" href="#work" data-intro style="--i:0">
      <span class="cta__label" data-i18n="hero.ctaPrimary">${t('hero.ctaPrimary')}</span>
      <span class="cta__icon" aria-hidden="true"><span class="cta__arrow">${arrowRight}</span><span class="cta__arrow cta__arrow--next">${arrowRight}</span></span>
    </a>
    <a class="cta cta--secondary" href="#contact" data-intro style="--i:1">
      <span class="cta__label" data-i18n="hero.ctaSecondary">${t('hero.ctaSecondary')}</span>
    </a>
  </div>`;
}

// Metadata is distributed around the composition rather than grouped:
// each item sits next to the element it qualifies.
function HeroMeta() {
  return `
  <p class="hero__label t-meta" data-intro><span class="hero__label-dot" aria-hidden="true"></span><span data-i18n="hero.label">${t('hero.label')}</span></p>

  <p class="hero__meta hero__meta--studio t-meta" data-intro>
    <span data-i18n="hero.studioType">${t('hero.studioType')}</span>
    <span data-i18n="hero.est">${t('hero.est')}</span>
  </p>

  <div class="hero__meta hero__meta--place t-meta" data-intro>
    <p><span data-i18n="hero.based">${t('hero.based')}</span><span data-i18n="hero.worldwide">${t('hero.worldwide')}</span></p>
    <p class="hero__clock"><span data-i18n="hero.localTime">${t('hero.localTime')}</span> <time class="hero__time" data-clock data-tz="${site.timeZone}">--:--</time></p>
  </div>

  <a class="hero__scroll t-meta" href="#work" data-intro>
    <span class="hero__scroll-line" aria-hidden="true"></span>
    <span data-i18n="hero.scroll">${t('hero.scroll')}</span>
  </a>`;
}

// ---- Hero -------------------------------------------------------------------

export function Hero() {
  return `
  <section class="hero" id="top" aria-labelledby="hero-title">
    <span class="reg-mark reg-mark--br" aria-hidden="true"></span>
    <div class="hero__inner">
      ${HeroMeta()}
      ${HeroHeadline()}
      <div class="hero__body">
        <p class="hero__support" data-intro data-i18n="hero.support">${t('hero.support')}</p>
        ${HeroCTA()}
      </div>
      ${HeroMedia(heroImages)}
    </div>
  </section>`;
}

export { heroImages };
