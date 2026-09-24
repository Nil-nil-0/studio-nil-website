// ==========================================================================
// SELECTED WORK — layout system test with placeholder photography.
// Names are neutral placeholders ("Project 01"…); real cases replace them later.
//   discipline  i18n key under `disciplines`
//   layout      position in the editorial sequence (styles/work.css)
//   ratio       frame proportion — varies on purpose, it sets the rhythm
//   speed       optional scroll drift for offset items
// ==========================================================================
import { stock } from './stock.js';

export const projects = [
  { id: 'p1', discipline: 'brandIdentity', layout: 'lead', ratio: '16 / 10', ...stock('photo-1546414701-81cc6963c67f'), alt: 'Brutalist concrete building against a pale sky', href: '#work' },
  { id: 'p2', discipline: 'packagingIdentity', layout: 'aside', ratio: '4 / 5', speed: -0.06, ...stock('photo-1717449205271-c2f236fcb63d'), alt: 'Stacked white boxes and a glass jar on a table', href: '#work' },
  { id: 'p3', discipline: 'visualIdentity', layout: 'wide', ratio: '21 / 10', ...stock('photo-1483366774565-c783b9f70e2c'), alt: 'Curved white facade seen from below', href: '#work' },
  { id: 'p4', discipline: 'rebranding', layout: 'small', ratio: '4 / 5', ...stock('photo-1604782206219-3b9576575203'), alt: 'Geometric paper shapes in black, rust and sand', href: '#work' },
  { id: 'p5', discipline: 'strategicIdentity', layout: 'feature', ratio: '4 / 3', speed: -0.05, ...stock('photo-1722407767379-9e8a15e098a0'), alt: 'Plaster sphere on a pedestal in soft light', href: '#work' },
];
