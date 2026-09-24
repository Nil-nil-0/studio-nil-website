import { t } from '../i18n/index.js';

// How we work: one conceptual statement in Feature (words brighten on scroll),
// then the five stages as large editorial blocks entering with restraint.
export function Process() {
  const steps = t('process.steps');
  return `
  <section class="process" aria-labelledby="process-title">
    <div class="section__inner">
      <h2 class="t-meta section__label" id="process-title" data-i18n="process.label">${t('process.label')}</h2>
      <p class="process__statement" data-statement data-i18n="process.statement">${t('process.statement')}</p>
      <ol class="process__steps">
        ${steps
          .map(
            (s, i) => `
          <li class="step step--${i + 1}" data-inview>
            <h3 class="step__title" data-i18n="process.steps.${i}.title">${s.title}</h3>
            <p class="step__text" data-i18n="process.steps.${i}.text">${s.text}</p>
          </li>`
          )
          .join('')}
      </ol>
    </div>
  </section>`;
}
