import './styles/experimental-hero.css';
import { ExperimentalHero } from './components/ExperimentalHero.js';

const app = document.querySelector('#experimental-app');

if (!app) {
  throw new Error('Experimental app mount not found.');
}

app.innerHTML = `
  <main class="experimental-site">
    ${ExperimentalHero()}
  </main>
`;

const hero = app.querySelector('.experimental-hero');
const photo = app.querySelector('.hero-photo__media');
const welcomeLines = ['Hi, welcome to ', 'Studio Nil Brands Co.'];
const welcomeText = welcomeLines.join('');
const welcomeNodes = [...app.querySelectorAll('.hero-welcome__line')];
const cursorNode = app.querySelector('.hero-cursor');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const showFinalState = () => {
  welcomeNodes.forEach((node, index) => { node.textContent = welcomeLines[index]; });
  cursorNode.textContent = '';
  cursorNode.hidden = true;
  hero.classList.add('is-photo-final', 'is-welcome-complete', 'is-composition-ready');
};

if (reducedMotion) {
  showFinalState();
} else {
  window.setTimeout(() => hero.classList.add('is-photo-final'), 350);
  window.setTimeout(() => {
    hero.classList.add('is-typing');
    cursorNode.textContent = '|';
    let index = 0;
    const typeNextCharacter = () => {
      let remaining = index + 1;
      welcomeNodes.forEach((node, lineIndex) => {
        const line = welcomeLines[lineIndex];
        node.textContent = line.slice(0, Math.max(0, Math.min(remaining, line.length)));
        remaining -= line.length;
      });
      index += 1;
      if (index < welcomeText.length) {
        window.setTimeout(typeNextCharacter, 90);
        return;
      }

      hero.classList.add('is-welcome-complete');
      cursorNode.textContent = '';
      window.setTimeout(() => hero.classList.add('is-composition-ready'), 180);
    };
    typeNextCharacter();
  }, 750);
}

photo.addEventListener('error', () => {
  photo.closest('.hero-photo').classList.add('hero-photo--unavailable');
}, { once: true });
