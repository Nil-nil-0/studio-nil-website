import { t, LANGS, getLang, setLang, onLangChange } from '../i18n/index.js';
import { navItems, site } from '../data/site.js';

// Order in the intro choreography is driven by --i (see motion/intro.js + header.css).
export function Header() {
  const links = navItems
    .map(
      (item, i) => `
      <li data-intro style="--i:${i + 1}">
        <a class="nav-link" href="${item.href}"><span data-i18n="nav.${item.key}">${t(`nav.${item.key}`)}</span></a>
      </li>`
    )
    .join('');

  const langButtons = LANGS.map(
    (lang) => `<button type="button" class="lang-toggle__btn" data-lang="${lang}" aria-pressed="${lang === getLang()}" lang="${lang === 'pt' ? 'pt-BR' : 'en'}">${lang.toUpperCase()}</button>`
  ).join('<span class="lang-toggle__sep" aria-hidden="true">/</span>');

  return `
  <header class="site-header">
    <div class="container site-header__inner">
      <a class="brand" href="#top" data-intro style="--i:0" data-i18n-attr="aria-label:a11y.home" aria-label="${t('a11y.home')}">
        <!-- TEXT PLACEHOLDER — replace with the official logo file when supplied -->
        <span class="brand__wordmark">${site.name}</span>
      </a>

      <nav class="site-nav" data-i18n-attr="aria-label:a11y.primaryNav" aria-label="${t('a11y.primaryNav')}">
        <ul class="site-nav__list">${links}</ul>
      </nav>

      <div class="lang-toggle" role="group" data-intro style="--i:5" data-i18n-attr="aria-label:a11y.language" aria-label="${t('a11y.language')}">
        ${langButtons}
      </div>

      <button type="button" class="menu-toggle" data-intro style="--i:2" aria-expanded="false" aria-controls="mobile-menu">
        <span class="menu-toggle__label" data-i18n="a11y.menuOpen">${t('a11y.menuOpen')}</span>
        <span class="menu-toggle__bars" aria-hidden="true"><i></i><i></i></span>
      </button>
    </div>

    <div class="mobile-menu" id="mobile-menu" hidden>
      <ul class="mobile-menu__list">
        ${navItems
          .map((item) => `<li><a href="${item.href}" data-i18n="nav.${item.key}">${t(`nav.${item.key}`)}</a></li>`)
          .join('')}
      </ul>
      <div class="lang-toggle lang-toggle--menu" role="group" data-i18n-attr="aria-label:a11y.language" aria-label="${t('a11y.language')}">
        ${langButtons}
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
