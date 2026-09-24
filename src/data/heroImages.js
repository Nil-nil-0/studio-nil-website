// HERO IMAGES — placeholder photography (see data/stock.js).
// One dominant image and two smaller supporting images, each with its own crop.
//   role   large | small-a (upper right, beside the headline) | small-b (overlaps the large image, low)
//   speed  scroll drift — each image moves at its own rate
import { stock } from './stock.js';

export const heroImages = [
  { role: 'large', speed: 0.04, ...stock('photo-1779641774851-9bd6c763e4e1'), alt: 'Sunlight falling through a high window into a raw concrete room', credit: 'Zac Taheriyan / Unsplash' },
  { role: 'small-a', speed: -0.1, ...stock('photo-1722407767379-9e8a15e098a0'), alt: 'Plaster sphere on a pedestal in soft light', credit: 'A Chosen Soul / Unsplash' },
  { role: 'small-b', speed: -0.16, ...stock('photo-1565626424178-c699f6601afd'), alt: 'Black-and-white stacked concrete volumes with hard shadows', credit: 'uve sanchez / Unsplash' },
];
