import { allBibtex } from '@/lib/publications';

/**
 * Serves the full publication list as a .bib file for the "Download full
 * BibTeX" button on /publications.
 */
export function GET() {
  return new Response(`${allBibtex()}\n`, {
    headers: {
      'content-type': 'application/x-bibtex; charset=utf-8',
      'content-disposition': 'attachment; filename="lahouari-publications.bib"',
      'cache-control': 'public, max-age=3600',
    },
  });
}
