import { t, LANGS, getLang, setLang, onLangChange } from '../i18n/index.js';
import { navItems, contactCta, site } from '../data/site.js';
import { arrowUpRight } from './icons.js';
import { brandAsset } from '../lib/brand.js';

// Header shows ONLY the official white brand symbol. The full wordmark is kept
// for the lower part of the Hero and the footer.
const mark = brandAsset('symbol', 'white', 'brand__svg brand__svg--mark');

function brandMarkup() {
  if (!mark) return `<span class="brand__fallback" data-missing-asset="symbol-white.svg">${site.name}</span>`;
  return `<span class="brand__mark">${mark.markup}</span>`;
}

// Header: wordmark · three quiet links · language · one clear action.
// Order in the intro choreography is set in motion/intro.js.
function langToggle(extraClass = '') {
  const buttons = LANGS.map(
    (lang) => `<button type="button" class="lang-toggle__btn" data-lang="${lang}" aria-pressed="${lang === getLang()}" lang="${lang === 'pt' ? 'pt-BR' : 'en'}">${lang.toUpperCase()}</button>`
  ).join('');
  return `<div class="lang-toggle ${extraClass}" role="group" data-i18n-attr="aria-label:a11y.language" aria-label="${t('a11y.language')}">${buttons}</div>`;
}

function talkLink(extraClass = '') {
  return `
    <a class="talk-link ${extraClass}" href="${contactCta.href}">
      <span data-i18n="${contactCta.key}">${t(contactCta.key)}</span>
      <span class="talk-link__arrow" aria-hidden="true">${arrowUpRight}</span>
    </a>`;
}

export function Header() {
  const links = navItems
    .map(
      (item) => `
      <li data-intro>
        <a class="nav-link" href="${item.href}" data-i18n="nav.${item.key}">${t(`nav.${item.key}`)}</a>
      </li>`
    )
    .join('');

  return `
  <header class="site-header">
    <div class="container site-header__inner">
      <a class="brand" href="#top" data-intro data-i18n-attr="aria-label:a11y.home" aria-label="${t('a11y.home')}">
        ${brandMarkup()}
      </a>

      <nav class="site-nav" data-i18n-attr="aria-label:a11y.primaryNav" aria-label="${t('a11y.primaryNav')}">
        <ul class="site-nav__list">${links}</ul>
      </nav>

      <div class="site-header__actions" data-intro>
        ${langToggle()}
        ${talkLink()}
      </div>

      <button type="button" class="menu-toggle" data-intro aria-expanded="false" aria-controls="mobile-menu">
        <span class="menu-toggle__label" data-i18n="a11y.menuOpen">${t('a11y.menuOpen')}</span>
      </button>
    </div>

    <div class="mobile-menu" id="mobile-menu" hidden>
      <ul class="mobile-menu__list">
        ${navItems
          .map((item) => `<li><a href="${item.href}" data-i18n="nav.${item.key}">${t(`nav.${item.key}`)}</a></li>`)
          .join('')}
      </ul>
      <div class="mobile-menu__foot">
        ${talkLink('talk-link--menu')}
        ${langToggle('lang-toggle--menu')}
      </div>
    </div>
  </header>`;
}

export function mountHeader(root) {
  const header = root.querySelector('.site-header');
  const toggle = header.querySelector('.menu-toggle');
  const menu = header.querySelector('#mobile-menu');
  const toggleLabel = toggle.querySelector('.menu-toggle__label');

  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    header.classList.toggle('is-menu-open', open);
    document.documentElement.classList.toggle('menu-lock', open);
    menu.hidden = !open;
    const key = open ? 'a11y.menuClose' : 'a11y.menuOpen';
    toggleLabel.dataset.i18n = key;
    toggleLabel.textContent = t(key);
    if (open) menu.querySelector('a')?.focus();
  };

  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
  });
  matchMedia('(min-width: 768px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  header.querySelectorAll('.lang-toggle__btn').forEach((btn) =>
    btn.addEventListener('click', () => setLang(btn.dataset.lang))
  );
  const syncLang = (lang) =>
    header.querySelectorAll('.lang-toggle__btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  onLangChange(syncLang);
}
