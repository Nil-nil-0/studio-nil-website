// Official Studio Nil Brands SVG assets — the source of truth for the brand mark.
// Files are inlined exactly as supplied (paths, viewBox and proportions untouched);
// only fixed width/height attributes are dropped so CSS can size them by height.
//
// Expected files (names as supplied):
//   src/assets/brand/logo/logotipo-black.svg · logotipo-white.svg   primary logo
//   src/assets/brand/mark/symbol-black.svg   · symbol-white.svg     symbol / mark
//   src/assets/brand/type/type-black.svg     · type-white.svg       NIL BRANDS CO. type
// Files may also sit directly in src/assets/brand/ — both are found.

const files = import.meta.glob('../assets/brand/**/*.svg', { query: '?raw', import: 'default', eager: true });

function find(name) {
  const key = Object.keys(files).find((k) => k.toLowerCase().endsWith(`/${name}.svg`));
  return key ? files[key] : null;
}

function ratioOf(svg) {
  const vb = svg.match(/viewBox\s*=\s*"([\d.\s,-]+)"/i);
  if (!vb) return null;
  const [, , w, h] = vb[1].trim().split(/[\s,]+/).map(Number);
  return w > 0 && h > 0 ? h / w : null;
}

function prepare(svg, className) {
  return svg
    .replace(/<\?xml[^>]*>/i, '')
    .replace(/<!DOCTYPE[^>]*>/i, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    // editor ids (e.g. "Camada_1-2") repeat across files — drop them so the page has no duplicate ids
    .replace(/\s(id|data-name)="(Camada|Layer)[^"]*"/gi, '')
    .replace(/<svg\b([^>]*)>/i, (m, attrs) => {
      const clean = attrs.replace(/\s(width|height|class|id|data-name)\s*=\s*"[^"]*"/gi, '');
      return `<svg${clean} class="${className}" preserveAspectRatio="xMinYMid meet" focusable="false" aria-hidden="true">`;
    })
    .trim();
}

/** @param {'logotipo'|'symbol'|'type'} kind  @param {'black'|'white'} tone */
export function brandAsset(kind, tone = 'black', className = 'brand-svg') {
  const raw = find(`${kind}-${tone}`);
  if (!raw) return null;
  return { markup: prepare(raw, className), ratio: ratioOf(raw), raw };
}

export const hasBrandAssets = Boolean(find('logotipo-white') || find('logotipo-black'));

/** Favicon from the official symbol, when supplied. */
export function applyFavicon() {
  const raw = find('symbol-white') || find('symbol-black') || find('logotipo-white');
  if (!raw) return;
  const link = document.querySelector('link[rel="icon"]') || Object.assign(document.createElement('link'), { rel: 'icon' });
  link.type = 'image/svg+xml';
  link.href = `data:image/svg+xml,${encodeURIComponent(raw)}`;
  document.head.appendChild(link);
}

if (!hasBrandAssets && import.meta.env.DEV) {
  console.warn('[brand] Official SVG logo files not found in src/assets/brand/. The header shows a temporary text label until they are added.');
}
