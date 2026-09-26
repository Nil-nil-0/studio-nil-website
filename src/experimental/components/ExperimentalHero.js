import heroImage from '../assets/nil-portrait.png';
import brandSymbol from '../../assets/brand/symbol-black.svg';

export function ExperimentalHero() {
  return `
    <section class="experimental-hero" id="experimental-hero" aria-labelledby="experimental-hero-title">
      <figure class="hero-photo">
        <img class="hero-photo__media" src="${heroImage}" alt="Nil seated in a dark sweater" fetchpriority="high" />
      </figure>

      <h1 class="hero-welcome" id="experimental-hero-title" data-reveal="welcome" aria-label="Hi, welcome to Studio Nil Brands Co."><span class="hero-welcome__line" data-welcome-line="0"></span><span class="hero-welcome__line" data-welcome-line="1"></span><span class="hero-cursor" aria-hidden="true"></span></h1>

      <img class="hero-symbol" data-reveal="logo" src="${brandSymbol}" alt="" aria-hidden="true" />
      <div class="hero-nil" data-reveal="nil">NIL BRANDS CO.</div>

      <div class="hero-microcopy" data-reveal="micro" aria-label="BRAND STRATEGY, NAMING, VISUAL IDENTITY, PACKAGING, DIGITAL">
        <span>BRAND STRATEGY, NAMING,</span>
        <span>VISUAL IDENTITY, PACKAGING, DIGITAL</span>
      </div>

      <p class="hero-meta" data-reveal="micro">STRATEGY FIRST.<br />DESIGN WITH INTENT.</p>
      <nav class="hero-navigation" aria-label="Primary navigation">
        <a class="hero-nav__work" data-reveal="nav" href="#experimental-hero">WORK</a>
        <a class="hero-nav__services" data-reveal="nav" href="#experimental-hero">SERVICES</a>
        <a class="hero-nav__studio" data-reveal="nav" href="#experimental-hero">STUDIO</a>
        <span class="hero-nav__language" data-reveal="nav">
          <a class="hero-nav__pt" href="#experimental-hero">PT</a>
          <a class="hero-nav__en" href="#experimental-hero">EN</a>
        </span>
      </nav>
      <a class="hero-talk" data-reveal="cta" href="#experimental-hero">LET'S TALK ©</a>
    </section>
  `;
}
