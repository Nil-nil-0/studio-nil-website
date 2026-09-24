// Studio facts used across sections. Edit here, not in components.
export const site = {
  name: 'Studio Nil Brands',
  shortName: 'Nil Brands',
  founder: 'Nil',
  founded: 2013,
  timeZone: 'America/Recife',   // João Pessoa, PB — shown as the studio's local time
  city: 'João Pessoa',
  country: 'Brazil',
  // Public contact e-mail — not confirmed yet. When set, CTA and footer show it.
  email: '',
};

// Confirmed public profiles.
export const socials = [
  { label: 'Behance', href: 'https://www.behance.net/nilbrands' },
  { label: 'Contra', href: 'https://contra.com/nilbrandsco' },
];

// Primary navigation — deliberately short. Labels come from i18n (nav.*).
// Contact is not a nav item: it is the header's call to action (contactCta).
export const navItems = [
  { key: 'work', href: '#work' },
  { key: 'services', href: '#services' },
  { key: 'studio', href: '#studio' },
];

export const contactCta = { key: 'nav.talk', href: '#contact' };
