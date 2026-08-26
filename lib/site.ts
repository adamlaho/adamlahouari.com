/**
 * Canonical identity + external profile links.
 * Single source of truth — every page imports from here instead of
 * hard-coding URLs, so there is exactly one place to update.
 */

/**
 * Canonical origin — feeds metadataBase, the sitemap, robots.txt and the
 * schema.org JSON-LD.
 *
 * Override per-deployment with NEXT_PUBLIC_SITE_URL (set it in Vercel's
 * environment variables) so moving between a *.vercel.app URL and the real
 * domain needs no code change. Delete that variable once adamlahouari.com
 * is live and this default takes over again.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://adamlahouari.com';

export const PROFILE = {
  name: 'Adam Lahouari',
  fullName: 'Adam Lahouari, Ph.D.',
  jobTitle: 'Postdoctoral Researcher',
  tagline: 'Postdoctoral Researcher · NYU Chemistry · Tuckerman Group',
  location: 'New York, NY',
  email: 'adam.lahouari@nyu.edu',

  /** Google Scholar profile id — used by lib/scholar.ts to fetch live metrics. */
  scholarId: 'AzbAZh4AAAAJ',
  orcid: '0000-0001-5857-1066',
  githubUser: 'adamlaho',
  linkedinUser: 'adam-lahouari-970a8a147',
  twitterUser: 'AdamLahouari',

  /**
   * Portrait shown on the home page and /about.
   *
   * To add one: put the file in `public/` (e.g. public/portrait.jpg) and set
   * this to its path from the site root, "/portrait.jpg". A portrait roughly
   * 3:4 and at least 800x1066 looks right on retina screens. Leave it null
   * and both pages fall back to a placeholder block.
   */
  portrait: '/portrait.jpg' as string | null,
  portraitAlt: 'Adam Lahouari',
};

export const LINKS = {
  orcid: `https://orcid.org/${PROFILE.orcid}`,
  scholar: `https://scholar.google.com/citations?user=${PROFILE.scholarId}&hl=en`,
  github: `https://github.com/${PROFILE.githubUser}`,
  linkedin: `https://www.linkedin.com/in/${PROFILE.linkedinUser}`,
  twitter: `https://x.com/${PROFILE.twitterUser}`,
  email: `mailto:${PROFILE.email}`,
  groupPage: 'https://wp.nyu.edu/tuckerman_group/current/dr-adam-lahouari/',
} as const;

export const AFFILIATIONS = [
  {
    name: 'NYU Chemistry',
    detail: 'Tuckerman Research Group',
    blurb: 'Computational chemistry and molecular dynamics',
    long: 'New York University, Department of Chemistry',
  },
] as const;
