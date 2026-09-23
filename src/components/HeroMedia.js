import { t } from '../i18n/index.js';
import { arrowUpRight } from './icons.js';

// One editorial "figure": frame + image + hover caption. Placement comes from
// the slot class; behaviour (scroll drift, hover companions) from data-attrs.
function HeroFigure(image, index) {
  const n = String(index + 1).padStart(2, '0');
  const loading = image.priority ? 'eager' : 'lazy';
  const fetchPriority = image.priority ? 'high' : 'auto';
  const srcset = image.srcset ? `srcset="${image.srcset}"` : '';

  return `
  <figure class="hero-figure hero-figure--${image.slot}" data-intro data-speed="${image.speed ?? 0}" data-figure="${image.id}">
    <a class="hero-figure__link" href="${image.href}" data-reveal="${index}">
      <span class="hero-figure__frame">
        <span class="hero-figure__plx" data-parallax><img class="hero-figure__img"
          src="${image.src}" ${srcset}
          sizes="(max-width: 767px) 90vw, (max-width: 1199px) 40vw, 32vw"
          alt="${image.alt}" loading="${loading}" fetchpriority="${fetchPriority}" decoding="async"
          width="1200" height="1500" /></span>
      </span>
    </a>
    <figcaption class="hero-figure__caption t-meta">
      <span class="hero-figure__index">Fig. ${n}</span>
      <span data-i18n="${image.captionKey}">${t(image.captionKey)}</span>
      <span class="hero-figure__view">${arrowUpRight}</span>
    </figcaption>
  </figure>`;
}

export function HeroMedia(images) {
  return `<div class="hero__media">${images.map(HeroFigure).join('')}</div>`;
}
