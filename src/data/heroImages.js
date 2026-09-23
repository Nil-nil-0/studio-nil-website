// ==========================================================================
// HERO IMAGES — the only file to edit when real Studio Nil Brands work arrives.
//
// TEMPORARY: all photos below are free Unsplash images (Unsplash License),
// hotlinked from images.unsplash.com as Unsplash's guidelines require.
// They will be replaced by real projects.
//
// To swap in a real project:
//   src: '/work/project-name/cover.jpg'   (put the file in /public/work/...)
//   srcset: optional — omit it for local files, or pass your own string
//   alt: describe what is in the image (read by screen readers)
//   captionKey: i18n key for the small figure caption (src/i18n/*.js → figures)
//   href: where the figure links (a case study later; #work for now)
//   companions: 2 small images revealed on hover (process shots, details, applications)
//
// `slot` decides placement in the composition (see hero.css → .hero-figure--a…d).
// `speed` is the scroll-drift factor (negative = rises faster than the page).
// ==========================================================================

const UNSPLASH_WIDTHS = [480, 800, 1200, 1600];

/** Build an optimised, responsive Unsplash source (auto=format serves AVIF/WebP). */
function unsplash(id, { q = 72 } = {}) {
  const base = `https://images.unsplash.com/${id}?auto=format&fit=crop&q=${q}`;
  return {
    src: `${base}&w=1200`,
    srcset: UNSPLASH_WIDTHS.map((w) => `${base}&w=${w} ${w}w`).join(', '),
  };
}

/** Small companion images only need one modest size. */
function thumb(id) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&q=70&w=520`;
}

export const heroImages = [
  {
    id: 'structure',
    slot: 'b',                       // main image — the largest frame
    ...unsplash('photo-1565626424178-c699f6601afd'),
    alt: 'Black-and-white photograph of stacked concrete volumes casting hard shadows',
    captionKey: 'figures.structure',
    credit: 'uve sanchez / Unsplash',
    href: '#work',
    speed: -0.12,
    priority: true,                  // above the fold, largest → eager + high fetch priority
    companions: [
      { src: thumb('photo-1483366774565-c783b9f70e2c'), alt: 'Upward view of a white curved facade' },
      { src: thumb('photo-1760213928984-1ed0d3556776'), alt: 'Concrete spiral staircase' },
    ],
  },
  {
    id: 'typography',
    slot: 'a',                       // small inset beside the headline
    ...unsplash('photo-1567262439850-1d4dc1fefdd0'),
    alt: 'Printed type specimen with large black numerals on white paper',
    captionKey: 'figures.typography',
    credit: 'St James Studio / Unsplash',
    href: '#work',
    speed: 0.1,
    companions: [
      { src: thumb('photo-1721492134985-1dd5b72a3dd6'), alt: 'Close-up of lettering in an open book' },
      { src: thumb('photo-1617050318658-a9a3175e34cb'), alt: 'Editorial spread with black typographic blocks' },
    ],
  },
  {
    id: 'packaging',
    slot: 'c',                       // overlaps the main frame's edge
    ...unsplash('photo-1686575131650-e02f84970212'),
    alt: 'Kraft paper boxes resting on crumpled white linen',
    captionKey: 'figures.packaging',
    credit: 'Harper Sunday / Unsplash',
    href: '#work',
    speed: -0.2,
    companions: [
      { src: thumb('photo-1717449205271-c2f236fcb63d'), alt: 'Stacked white packaging boxes with a candle jar' },
      { src: thumb('photo-1655388446578-741cb6f55d14'), alt: 'Minimal pink boxes and a small cube on a table' },
    ],
  },
  {
    id: 'direction',
    slot: 'd',                       // low, left — enters from the bottom edge
    ...unsplash('photo-1722407767379-9e8a15e098a0'),
    alt: 'Plaster sphere on a pedestal with soft window shadows',
    captionKey: 'figures.direction',
    credit: 'A Chosen Soul / Unsplash',
    href: '#work',
    speed: -0.2,
    companions: [
      { src: thumb('photo-1691519967237-e6bf344111d0'), alt: 'Sculptural wave object in black and white' },
      { src: thumb('photo-1604782206219-3b9576575203'), alt: 'Geometric paper shapes in black, rust and sand' },
    ],
  },
];
