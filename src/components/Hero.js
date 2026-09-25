import { t } from '../i18n/index.js';
import { site } from '../data/site.js';
import { heroImages } from '../data/heroImages.js';
import { HeroWordmark } from './HeroLogo.js';
import { arrowRight } from './icons.js';

// Hero hierarchy (top → bottom):
//   symbol (header) · Feature headline in three art-directed rows · image
//   composition (1 large + 2 small) with minimal Clash info · a reserved foot
//   zone holding the full white wordmark, which closes (signs) the Hero.
//
// A headline row is a string or an array of segments. Segments sit on one row
// on desktop and stack on phones, each clipped for the line-by-line intro.
function Segment(text, key) {
  return `<span class="line__seg"><span class="line__inner" data-intro data-i18n="${key}">${text}</span></span>`;
}

function Headline() {
  const rows = t('hero.headline');
  return `
  <h1 class="hero__title" id="hero-title">
    <span class="visually-hidden" data-i18n="hero.headlineA11y">${t('hero.headlineA11y')}</span>
    <span class="hero__lines" aria-hidden="true">
      ${rows
        .map((row, i) => {
          const segs = Array.isArray(row)
            ? row.map((seg, k) => Segment(seg, `hero.headline.${i}.${k}`)).join('')
            : Segment(row, `hero.headline.${i}`);
          return `<span class="line line--${i + 1}">${segs}</span>`;
        })
        .join('')}
    </span>
  </h1>`;
}

function Image(img) {
  return `
  <figure class="hero__img hero__img--${img.role}" data-speed="${img.speed}">
    <span class="hero__frame" data-intro>
      <span class="hero__plx" data-parallax>
        <img src="${img.src}" srcset="${img.srcset}" sizes="(max-width: 767px) 90vw, 50vw"
          alt="${img.alt}" ${img.role === 'large' ? 'fetchpriority="high"' : 'loading="eager"'} decoding="async" width="1600" height="1000" />
      </span>
    </span>
  </figure>`;
}

function Info() {
  return `
  <div class="hero__info" data-intro>
    <p class="hero__label t-meta" data-i18n="hero.label">${t('hero.label')}</p>
    <p class="hero__support" data-i18n="hero.support">${t('hero.support')}</p>
    <a class="hero__cta" href="#work">
      <span data-i18n="hero.ctaPrimary">${t('hero.ctaPrimary')}</span>
      <span class="hero__cta-arrow" aria-hidden="true">${arrowRight}</span>
    </a>
  </div>
  <div class="hero__meta t-meta" data-intro>
    <p><span data-i18n="hero.based">${t('hero.based')}</span></p>
    <p><span data-i18n="hero.worldwide">${t('hero.worldwide')}</span></p>
    <p><span data-i18n="hero.est">${t('hero.est')}</span> · <time class="hero__time" data-clock data-tz="${site.timeZone}">--:--</time></p>
  </div>`;
}

export function Hero() {
  return `
  <section class="hero" id="top" aria-labelledby="hero-title">
    <div class="hero__body">
      ${Headline()}
      <div class="hero__composition">
        ${heroImages.map(Image).join('')}
        ${Info()}
      </div>
    </div>
    ${HeroWordmark()}
  </section>`;
}
