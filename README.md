# Studio Nil Brands — Website

Phase 01: **Header + Hero** (home). Next sections are built one at a time after approval.

## Run

```bash
npm install
npm run dev            # local dev server
npm run build          # production build → /dist
npm run build:single   # one self-contained file → /preview/index.html (double-click to open)
```

Stack: Vite + vanilla ES modules and CSS. No framework or animation library — the motion is
transform/opacity driven by one small rAF loop, so the page stays light (~7 KB JS gzipped).

## Where things live

```
src/
  styles/tokens.css      design tokens: type scale, color, space, grid, motion
  styles/base.css        reset, primitives (.grid, .t-display, .t-meta), focus, utilities
  styles/header.css      header, nav, PT/EN toggle, mobile menu
  styles/hero.css        hero composition, figures, CTAs, hover companions, breakpoints
  styles/motion.css      intro states + prefers-reduced-motion policy
  i18n/en.js, pt.js      all copy (same keys in both files)
  i18n/index.js          t(), setLang(), applyTranslations() — no library
  data/heroImages.js     ← hero images (swap for real projects here)
  data/site.js           studio facts + nav items
  components/            Header, Hero (headline / meta / CTA), HeroMedia (figures)
  motion/intro.js        load choreography — one table sets order and timing
  motion/scroll.js       scroll drift ([data-speed]) + in-frame parallax ([data-parallax])
  motion/reveal.js       hover companions (small images that follow the cursor)
  lib/clock.js           studio local time
```

## Replacing the temporary images

Edit `src/data/heroImages.js` only. For each figure, set `src` to a local file in `/public/work/…`
(and drop `srcset`, or supply your own), update `alt`, and add two `companions`.
The `slot` (a/b/c/d) controls its place in the composition; `speed` its scroll drift.

Temporary photos: Unsplash (Unsplash License), credited in `heroImages.js`.

## Language

Default is English. PT/EN toggle in the header; the choice is remembered, and `?lang=pt` forces Portuguese.
Add any new string to both `en.js` and `pt.js`.

## Logo

The header uses a text placeholder (`STUDIO NIL BRANDS`) in `components/Header.js`.
Replace the `.brand__wordmark` span with the official SVG when supplied.
