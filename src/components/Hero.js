import { t } from '../i18n/index.js';
import { site } from '../data/site.js';
import { heroImage } from '../data/heroImages.js';
import { HeroLogo, hasHeroLogo, heroLogoRatio } from './HeroLogo.js';
import { arrowRight } from './icons.js';

// Hero — layered: oversized Feature statement → large photograph → the white
// logo crossing the photograph (difference blend) → minimal Clash information.
// Lines are set manually (hero.headline in i18n): the browser never wraps them.
function Statement() {
  const lines = t('hero.headline');
  return `
  <h1 class="hero__title" id="hero-title">
    <span class="visually-hidden" data-i18n="hero.headlineA11y">${t('hero.headlineA11y')}</span>
    <span class="hero__lines" aria-hidden="true">
      ${lines
        .map(
          (line, i) => `<span class="line line--${i + 1}" data-speed="${(-0.02 * i).toFixed(2)}"><span class="line__inner" data-intro data-i18n="hero.headline.${i}">${line}</span></span>`
        )
        .join('')}
    </span>
  </h1>`;
}

function Media() {
  return `
  <figure class="hero__media" data-speed="0.06">
    <span class="hero__frame" data-intro>
      <span class="hero__plx" data-parallax>
        <img class="hero__img" src="${heroImage.src}" srcset="${heroImage.srcset}" sizes="(max-width: 767px) 100vw, 86vw"
          alt="${heroImage.alt}" fetchpriority="high" decoding="async" width="1600" height="1000" />
      </span>
    </span>
  </figure>`;
}

function Info() {
  return `
  <p class="hero__label t-meta" data-intro data-i18n="hero.label">${t('hero.label')}</p>
  <div class="hero__info" data-intro>
    <p class="hero__support" data-i18n="hero.support">${t('hero.support')}</p>
    <a class="hero__cta" href="#work">
      <span data-i18n="hero.ctaPrimary">${t('hero.ctaPrimary')}</span>
      <span class="hero__cta-arrow" aria-hidden="true">${arrowRight}</span>
    </a>
  </div>
  <div class="hero__meta t-meta" data-intro>
    <p><span data-i18n="hero.based">${t('hero.based')}</span> — <span data-i18n="hero.worldwide">${t('hero.worldwide')}</span></p>
    <p><span data-i18n="hero.est">${t('hero.est')}</span> · <span data-i18n="hero.localTime">${t('hero.localTime')}</span> <time class="hero__time" data-clock data-tz="${site.timeZone}">--:--</time></p>
  </div>`;
}

export function Hero() {
  return `
  <section class="hero${hasHeroLogo ? ' hero--logo' : ''}" id="top" aria-labelledby="hero-title" style="--logo-ratio:${heroLogoRatio.toFixed(5)}">
    ${Info()}
    ${Statement()}
    <div class="hero__stage">
      ${Media()}
      ${HeroLogo()}
    </div>
  </section>`;
}
