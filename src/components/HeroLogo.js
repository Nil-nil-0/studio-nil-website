// The Hero's closing signature: the official WHITE wordmark SVG (type-white —
// "NIL BRANDS CO.", without the symbol, which already sits at the top of the page).
// Inlined as supplied; sized by width, never distorted.
import { brandAsset } from '../lib/brand.js';

const wordmark = brandAsset('type', 'white', 'hero-wordmark__svg') || brandAsset('logotipo', 'white', 'hero-wordmark__svg');

export const hasHeroWordmark = Boolean(wordmark);

export function HeroWordmark() {
  if (!wordmark) return '';
  return `
  <div class="hero-wordmark" role="img" aria-label="Nil Brands Co." data-speed="-0.05">
    <div class="hero-wordmark__inner" data-intro>${wordmark.markup}</div>
  </div>`;
}
