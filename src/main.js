import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/work.css';
import './styles/sections.css';
import './styles/motion.css';

import { initLang, applyTranslations, setLang, onLangChange, getLang, t } from './i18n/index.js';
import { Header, mountHeader } from './components/Header.js';
import { Hero } from './components/Hero.js';
import { Logos } from './components/Logos.js';
import { Work } from './components/Work.js';
import { Services } from './components/Services.js';
import { Process } from './components/Process.js';
import { Global } from './components/Global.js';
import { Awards } from './components/Awards.js';
import { Footer } from './components/Footer.js';

import { runIntro } from './motion/intro.js';
import { initScrollMotion } from './motion/scroll.js';
import { initInView } from './motion/inview.js';
import { initStatement } from './motion/statement.js';
import { initWorldMap } from './motion/worldmap.js';
import { initClock } from './lib/clock.js';
import { applyFavicon } from './lib/brand.js';

initLang();
applyFavicon();

const app = document.getElementById('app');
app.innerHTML = `
  <a class="skip-link" href="#main" data-i18n="a11y.skip">${t('a11y.skip')}</a>
  ${Header()}
  <main id="main">
    ${Hero()}
    ${Logos()}
    ${Work()}
    ${Services()}
    ${Process()}
    ${Global()}
    ${Awards()}
  </main>
  ${Footer()}
`;

applyTranslations();
mountHeader(app);
initClock(app);

// Every PT/EN control on the page drives one state.
app.querySelectorAll('.lang-toggle__btn').forEach((btn) => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
onLangChange((lang) => {
  app.querySelectorAll('.lang-toggle__btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  document.querySelector('meta[property="og:locale"]')?.setAttribute('content', t('meta.ogLocale'));
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', t('meta.title'));
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', t('meta.description'));
});

runIntro(app);
initScrollMotion(app.querySelector('.hero'));
initScrollMotion(app.querySelector('.work'));
initScrollMotion(app.querySelector('.site-footer'));
initInView(app.querySelectorAll('.work-item, [data-inview]'));
initStatement(app.querySelector('[data-statement]'));
initWorldMap(app.querySelector('.global__map'));

document.documentElement.lang = getLang() === 'pt' ? 'pt-BR' : 'en';
