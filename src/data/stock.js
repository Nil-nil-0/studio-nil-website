// PLACEHOLDER PHOTOGRAPHY — free Unsplash images (Unsplash License), hotlinked
// while the website system is being finalised. No project branding is used.
// Replace with real Studio Nil Brands work later (local files in /public/work/).
const WIDTHS = [640, 1000, 1400, 2000];

export function stock(id, { q = 76 } = {}) {
  const base = `https://images.unsplash.com/${id}?auto=format&fit=crop&q=${q}`;
  return { src: `${base}&w=1600`, srcset: WIDTHS.map((w) => `${base}&w=${w} ${w}w`).join(', ') };
}
