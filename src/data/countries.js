// ==========================================================================
// GLOBAL WORK — only confirmed locations. Nothing here is estimated.
//
// kind: 'base'   the studio's own location (confirmed)
//       'client' a country where a confirmed client is based
//
// Add client countries only when confirmed, e.g.
//   { id: 'pt', name: { en: 'Portugal', pt: 'Portugal' }, lat: 38.72, lon: -9.14, kind: 'client' },
// ==========================================================================
export const countries = [
  { id: 'br', name: { en: 'João Pessoa, Brazil', pt: 'João Pessoa, Brasil' }, lat: -7.12, lon: -34.86, kind: 'base' },
];
