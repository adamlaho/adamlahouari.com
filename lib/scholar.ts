/**
 * Live Google Scholar metrics.
 *
 * Google Scholar has no official API and actively blocks datacenter traffic,
 * so this resolves through a fallback chain and never throws:
 *
 *   1. SerpApi  — reliable, needs SERPAPI_API_KEY (free tier: 100 searches/mo)
 *   2. Scholar  — direct HTML parse of the public profile (works from many
 *                 IPs, gets a CAPTCHA from others)
 *   3. OpenAlex — free, no key, no rate limit worth worrying about; its counts
 *                 are lower than Scholar's because it indexes fewer sources
 *   4. SNAPSHOT — hand-checked numbers below, so the page never renders blank
 *
 * Results are cached by Next's data cache for SCHOLAR_TTL_SECONDS, so pages
 * that call getScholarMetrics() refresh themselves on that cadence without a
 * rebuild.
 */

import { PROFILE } from './site';

export const SCHOLAR_TTL_SECONDS = 60 * 60 * 12; // twice a day

export type ScholarSource = 'serpapi' | 'scholar' | 'openalex' | 'snapshot';

export interface ScholarArticle {
  title: string;
  authors: string;
  venue: string;
  year: number | null;
  citations: number;
}

export interface ScholarMetrics {
  citations: number;
  hIndex: number;
  i10Index: number;
  /** Number of indexed works (papers + conference entries) on the profile. */
  worksIndexed: number;
  articles: ScholarArticle[];
  source: ScholarSource;
  fetchedAt: string;
}

/**
 * Last hand-verified numbers. Only used when every live source fails; update
 * occasionally so a long outage still shows something close to the truth.
 */
const SNAPSHOT: Omit<ScholarMetrics, 'source' | 'fetchedAt'> = {
  citations: 18,
  hIndex: 2,
  i10Index: 1,
  worksIndexed: 14,
  articles: [],
};

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

function decodeEntities(s: string): string {
  return s
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/** Derive h-index / i10 from a citation list, for sources that omit them. */
function deriveIndices(counts: number[]) {
  const sorted = [...counts].sort((a, b) => b - a);
  let h = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] >= i + 1) h = i + 1;
    else break;
  }
  return { hIndex: h, i10Index: sorted.filter((c) => c >= 10).length };
}

async function fetchFromSerpApi(): Promise<ScholarMetrics | null> {
  const key = process.env.SERPAPI_API_KEY;
  if (!key) return null;

  const url =
    `https://serpapi.com/search.json?engine=google_scholar_author` +
    `&author_id=${PROFILE.scholarId}&hl=en&num=100&api_key=${key}`;

  const res = await fetch(url, { next: { revalidate: SCHOLAR_TTL_SECONDS } });
  if (!res.ok) return null;

  const data: any = await res.json();
  const table: any[] = data?.cited_by?.table ?? [];
  const pick = (name: string) =>
    Number(table.find((row) => row?.[name])?.[name]?.all ?? 0);

  const articles: ScholarArticle[] = (data?.articles ?? []).map((a: any) => ({
    title: a.title ?? '',
    authors: a.authors ?? '',
    venue: a.publication ?? '',
    year: a.year ? Number(a.year) : null,
    citations: Number(a.cited_by?.value ?? 0),
  }));

  const citations = pick('citations');
  if (!citations && articles.length === 0) return null;

  return {
    citations,
    hIndex: pick('h_index'),
    i10Index: pick('i10_index'),
    worksIndexed: articles.length,
    articles,
    source: 'serpapi',
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchFromScholar(): Promise<ScholarMetrics | null> {
  const url =
    `https://scholar.google.com/citations?user=${PROFILE.scholarId}` +
    `&hl=en&pagesize=100`;

  const res = await fetch(url, {
    headers: { 'user-agent': UA, 'accept-language': 'en-US,en;q=0.9' },
    next: { revalidate: SCHOLAR_TTL_SECONDS },
  });
  if (!res.ok) return null;

  const html = await res.text();
  // Blocked / CAPTCHA page — bail out so the next source gets a turn.
  if (/id="gs_captcha|please show you're not a robot/i.test(html)) return null;

  // The metrics table renders "all time" and "since <year>" columns in pairs.
  const stats = [...html.matchAll(/<td class="gsc_rsb_std">(\d+)<\/td>/g)].map((m) =>
    Number(m[1]),
  );
  if (stats.length < 6) return null;

  const rows = [...html.matchAll(/<tr class="gsc_a_tr">([\s\S]*?)<\/tr>/g)].map((m) => m[1]);
  const articles: ScholarArticle[] = rows.map((row) => {
    const title = row.match(/class="gsc_a_at"[^>]*>([\s\S]*?)<\/a>/);
    const grey = [...row.matchAll(/class="gs_gray">([\s\S]*?)<\/div>/g)].map((m) => m[1]);
    const cites = row.match(/class="gsc_a_ac[^"]*"[^>]*>([\s\S]*?)<\/a>/);
    const year = row.match(/class="gsc_a_h[^"]*"[^>]*>([\s\S]*?)<\/span>/);
    return {
      title: title ? decodeEntities(title[1]) : '',
      authors: grey[0] ? decodeEntities(grey[0]) : '',
      venue: grey[1] ? decodeEntities(grey[1]) : '',
      year: year && year[1].trim() ? Number(year[1].trim()) : null,
      citations: cites && cites[1].trim() ? Number(cites[1].trim()) : 0,
    };
  });

  return {
    citations: stats[0],
    hIndex: stats[2],
    i10Index: stats[4],
    worksIndexed: articles.length,
    articles,
    source: 'scholar',
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchFromOpenAlex(): Promise<ScholarMetrics | null> {
  const base = 'https://api.openalex.org';
  const mail = `mailto=${encodeURIComponent(PROFILE.email)}`;

  const authorRes = await fetch(
    `${base}/authors/https://orcid.org/${PROFILE.orcid}?${mail}`,
    { next: { revalidate: SCHOLAR_TTL_SECONDS } },
  );
  if (!authorRes.ok) return null;
  const author: any = await authorRes.json();

  const worksRes = await fetch(
    `${base}/works?filter=author.id:${author.id.split('/').pop()}&per-page=100&${mail}`,
    { next: { revalidate: SCHOLAR_TTL_SECONDS } },
  );
  const works: any[] = worksRes.ok ? (await worksRes.json()).results ?? [] : [];

  const articles: ScholarArticle[] = works.map((w) => ({
    title: w.title ?? '',
    authors: (w.authorships ?? [])
      .map((a: any) => a.author?.display_name)
      .filter(Boolean)
      .join(', '),
    venue: w.primary_location?.source?.display_name ?? '',
    year: w.publication_year ?? null,
    citations: w.cited_by_count ?? 0,
  }));

  const derived = deriveIndices(articles.map((a) => a.citations));

  return {
    citations: author.cited_by_count ?? 0,
    hIndex: author.summary_stats?.h_index ?? derived.hIndex,
    i10Index: author.summary_stats?.i10_index ?? derived.i10Index,
    worksIndexed: author.works_count ?? articles.length,
    articles,
    source: 'openalex',
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Never throws and never returns null — falls through to SNAPSHOT.
 * Safe to call from any server component or route handler.
 */
export async function getScholarMetrics(): Promise<ScholarMetrics> {
  const sources = [fetchFromSerpApi, fetchFromScholar, fetchFromOpenAlex];

  for (const source of sources) {
    try {
      const result = await source();
      if (result && result.citations >= 0 && result.worksIndexed > 0) return result;
    } catch (err) {
      console.warn(`[scholar] ${source.name} failed:`, (err as Error).message);
    }
  }

  return { ...SNAPSHOT, source: 'snapshot', fetchedAt: new Date().toISOString() };
}

function normalizeTitle(t: string): string {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

/**
 * Citation count for one publication, matched on title. Returns undefined when
 * the work isn't on the profile yet (e.g. a brand-new preprint).
 */
export function citationsFor(
  metrics: ScholarMetrics,
  title: string,
): number | undefined {
  const target = normalizeTitle(title);
  const hit = metrics.articles.find((a) => normalizeTitle(a.title) === target);
  return hit?.citations;
}
