// Self-hosted fonts (same Inter Tight / Inter families as Google Fonts, latin subset only):
// no third-party request, no layout jump from a late stylesheet.
import '@fontsource/inter-tight/latin-400.css';
import '@fontsource/inter-tight/latin-500.css';
import '@fontsource/inter-tight/latin-600.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';

import './styles/tokens.css';
import './styles/base.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/motion.css';

import { initLang, applyTranslations, t } from './i18n/index.js';
import { Header, mountHeader } from './components/Header.js';
import { Hero, heroImages } from './components/Hero.js';
import { runIntro } from './motion/intro.js';
import { initScrollMotion } from './motion/scroll.js';
import { initHoverReveal } from './motion/reveal.js';
import { initClock } from './lib/clock.js';

initLang();

const app = document.getElementById('app');
app.innerHTML = `
  <a class="skip-link" href="#main" data-i18n="a11y.skip">${t('a11y.skip')}</a>
  ${Header()}
  <main id="main">
    ${Hero()}
    <!-- PHASE PLACEHOLDER: only here so the hero can be scrolled. Replaced in phase 02. -->
    <section class="phase-placeholder" id="work" aria-label="Upcoming">
      <p class="t-meta" data-i18n="placeholder.next">${t('placeholder.next')}</p>
    </section>
  </main>
`;

applyTranslations();
mountHeader(app);
initClock(app);

const hero = app.querySelector('.hero');
runIntro(app);
initScrollMotion(hero);
initHoverReveal(hero, heroImages);
