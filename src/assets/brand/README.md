# Official brand assets (source of truth)

Official Studio Nil Brands SVGs, exactly as supplied:

    logotipo-white.svg / logotipo-black.svg   primary logo — header (white) and large footer logo (white)
    symbol-white.svg   / symbol-black.svg     symbol — mobile header and favicon
    type-white.svg     / type-black.svg       NIL BRANDS CO. — the layer crossing the Hero photograph

src/lib/brand.js inlines them as-is (paths, viewBox and proportions untouched). Only
non-visual attributes are dropped: fixed width/height (so CSS can size them without
distortion) and editor ids like "Camada_1-2" (they repeat across files).
The site is black, so the white versions are the ones in use.
