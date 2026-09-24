# Studio Nil Brands — Website

Home — black editorial system: Header · Hero (Feature statement + photograph + white logo,
difference blend) · Client strip · Selected work · Services · How we work · Global work ·
Recognition* · Footer (CTA + large logo). (*rendered only with verified entries)

## Run

```bash
npm install
npm run dev            # local dev server
npm run build          # production build → /dist
npm run build:single   # one self-contained file → /preview/index.html (double-click to open)
```

Stack: Vite + vanilla ES modules and CSS. No framework, no animation library.

## Brand assets (production)

- Fonts — `src/assets/fonts/clash/` (Clash Display, variable 200–700) and
  `src/assets/fonts/feature/FeatureDisplay-Regular-Web.1abb9ba9.woff2`, registered in `src/styles/fonts.css`.
  Clash = system (structure, information, UI). Feature = voice (editorial statements, used sparingly).
- Logos — official SVGs in `src/assets/brand/` (see README there):
  `logo/logotipo-white.svg` header + large footer logo · `mark/symbol-white.svg` mobile header + favicon ·
  `type/type-white.svg` the NIL BRANDS CO. layer in the Hero (falls back to logotipo-white). Inlined as supplied by `src/lib/brand.js`.

## Where things live

```
src/
  styles/   fonts · tokens · base · header · hero · work · sections · motion
  i18n/     en.js, pt.js (same keys) + index.js
  data/     site · stock · heroImages · projects · countries · landMask · logos · awards
  components/ Header · Hero (+HeroLogo) · Logos · Work · Services · Process · Global · Awards · Footer
  motion/   intro · scroll · inview · statement · worldmap
  lib/      brand (official SVG loader) · clock
```

## Content rules

Photography is PLACEHOLDER (free Unsplash images, `data/stock.js`); project names are
"Project 01…" and the client strip shows neutral placeholder marks. No project branding is used.
Countries and awards stay empty until verified (`data/countries.js`, `data/awards.js`).
The public e-mail is empty in `data/site.js` until confirmed; the CTA uses the Contra profile meanwhile.

## Language

EN default, PT/EN toggle in header, menu and footer; `?lang=pt` forces Portuguese.
