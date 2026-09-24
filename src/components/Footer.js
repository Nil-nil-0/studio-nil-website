import { t, LANGS, getLang } from '../i18n/index.js';
import { navItems, site, socials } from '../data/site.js';
import { brandAsset } from '../lib/brand.js';
import { arrowUpRight } from './icons.js';

// Footer as a closing poster: Feature question, one restrained Clash action,
// minimal navigation, and the official white logo at full width — echoing the Hero.
const logo = brandAsset('logotipo', 'white', 'footer__svg') || brandAsset('type', 'white', 'footer__svg');

export function Footer() {
  const year = new Date().getFullYear();
  const primary = site.email ? `mailto:${site.email}` : socials.find((s) => s.label === 'Contra').href;
  return `
  <footer class="site-footer" id="contact">
    <div class="footer__cta">
      <h2 class="footer__statement" data-inview data-i18n="cta.statement">${t('cta.statement')}</h2>
      <a class="footer__action" href="${primary}" ${site.email ? '' : 'target="_blank" rel="noopener"'}>
        <span data-i18n="cta.action">${t('cta.action')}</span>
        <span class="footer__arrow" aria-hidden="true">${arrowUpRight}</span>
      </a>
    </div>

    <div class="footer__row">
      <nav class="footer__nav" data-i18n-attr="aria-label:a11y.footerNav" aria-label="${t('a11y.footerNav')}">
        <ul>${navItems.map((n) => `<li><a href="${n.href}" data-i18n="nav.${n.key}">${t(`nav.${n.key}`)}</a></li>`).join('')}</ul>
      </nav>
      <ul class="footer__social">${socials.map((s) => `<li><a href="${s.href}" target="_blank" rel="noopener">${s.label}</a></li>`).join('')}</ul>
      <div class="lang-toggle footer__lang" role="group" data-i18n-attr="aria-label:a11y.language" aria-label="${t('a11y.language')}">
        ${LANGS.map((l) => `<button type="button" class="lang-toggle__btn" data-lang="${l}" aria-pressed="${l === getLang()}" lang="${l === 'pt' ? 'pt-BR' : 'en'}">${l.toUpperCase()}</button>`).join('')}
      </div>
    </div>

    <a class="footer__logo" href="#top" data-i18n-attr="aria-label:a11y.backToTop" aria-label="${t('a11y.backToTop')}" data-speed="-0.08">
      ${logo ? logo.markup : `<span class="brand__fallback" data-missing-asset="logotipo-white.svg">${site.name}</span>`}
    </a>

    <p class="footer__legal">
      <span data-i18n="footer.est">${t('footer.est')}</span>
      <span>© ${year} ${site.name}. <span data-i18n="footer.rights">${t('footer.rights')}</span></span>
    </p>
  </footer>`;
}
