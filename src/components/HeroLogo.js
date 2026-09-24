// The Hero's brand statement: the official WHITE logo SVG, inlined as supplied.
// Preference: type-white (NIL BRANDS CO.) → logotipo-white. With
// mix-blend-mode: difference it stays white over black and turns into the
// negative of the photograph where it crosses it.
import { brandAsset } from '../lib/brand.js';

const logo = brandAsset('type', 'white', 'hero-logo__svg') || brandAsset('logotipo', 'white', 'hero-logo__svg');

export const hasHeroLogo = Boolean(logo);
export const heroLogoRatio = logo?.ratio ?? 0.12;

export function HeroLogo() {
  if (!logo) return '';
  return `
  <div class="hero-logo" role="img" aria-label="Nil Brands Co." data-speed="-0.14" data-speed-x="-0.04" data-drift-mobile="0.5">
    <div class="hero-logo__inner" data-intro>${logo.markup}</div>
  </div>`;
}
