// The Hero's closing signature: the full official WHITE wordmark SVG
// (logotipo-white — symbol + "NIL BRANDS CO."). It lives in the Hero's own
// foot zone (.hero__foot), the last row of the Hero grid, so it always closes
// the Hero regardless of screen size. Inlined as supplied; sized by width.
import { brandAsset } from '../lib/brand.js';

const wordmark = brandAsset('logotipo', 'white', 'hero-wordmark__svg') || brandAsset('type', 'white', 'hero-wordmark__svg');

export const hasHeroWordmark = Boolean(wordmark);

export function HeroWordmark() {
  if (!wordmark) return '';
  return `
  <div class="hero__foot">
    <div class="hero-wordmark" role="img" aria-label="Studio Nil Brands">
      <div class="hero-wordmark__inner" data-intro>${wordmark.markup}</div>
    </div>
  </div>`;
}
