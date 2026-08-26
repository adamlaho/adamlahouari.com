import { getScholarMetrics, type ScholarSource } from '@/lib/scholar';
import { PAPERS } from '@/lib/publications';
import { LINKS, PROFILE } from '@/lib/site';

interface Stat {
  value: string | number;
  label: string;
}

/**
 * Metrics strip backed by live Google Scholar data (see lib/scholar.ts).
 * Rendered on the server and revalidated on the page's ISR cadence, so the
 * numbers track the profile without a redeploy.
 */
/**
 * Name the source the numbers actually came from. Scholar blocks datacenter
 * IPs, so a deployment without SERPAPI_API_KEY falls back to OpenAlex — whose
 * counts are lower because it indexes fewer venues. Crediting Scholar for
 * OpenAlex figures would misstate where the data came from.
 */
function attributionFor(source: ScholarSource, scholarUrl: string) {
  switch (source) {
    case 'serpapi':
    case 'scholar':
      return { name: 'Google Scholar', href: scholarUrl };
    case 'openalex':
      return { name: 'OpenAlex', href: `https://openalex.org/works?filter=author.orcid:${PROFILE.orcid}` };
    case 'snapshot':
      return { name: 'Google Scholar', href: scholarUrl };
  }
}

export async function ScholarStats() {
  const metrics = await getScholarMetrics();
  const attribution = attributionFor(metrics.source, LINKS.scholar);

  const stats: Stat[] = [
    { value: PAPERS.length, label: 'Publications & preprints' },
    { value: metrics.citations, label: 'Citations' },
    { value: metrics.hIndex, label: 'h-index' },
    { value: metrics.i10Index, label: 'i10-index' },
  ];

  return (
    <section className="py-16 bg-bg-elev border-y border-border">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[var(--container-wide)]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <div className="text-4xl font-semibold tabular-nums">
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-wider text-fg-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-fg-muted">
          Citation metrics from{' '}
          <a
            href={attribution.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-[#2550E6] transition-colors"
          >
            {attribution.name}
          </a>
          , updated{' '}
          <time dateTime={metrics.fetchedAt}>
            {new Date(metrics.fetchedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC',
            })}
          </time>
          .
        </p>
      </div>
    </section>
  );
}
