import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PublicationsPage } from './publications-client';
import { PUBLICATIONS } from '@/lib/publications';
import { getScholarMetrics, citationsFor } from '@/lib/scholar';

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Peer-reviewed publications and preprints by Adam Lahouari on machine-learned interatomic potentials, molecular crystals, and reactive force fields for metallic nanoparticles.',
  openGraph: {
    title: 'Publications — Adam Lahouari',
    description:
      'Peer-reviewed publications and preprints on machine-learned interatomic potentials, molecular crystals, and reactive force fields.',
  },
};

// Literal required by Next; keep in step with SCHOLAR_TTL_SECONDS in lib/scholar.ts.
export const revalidate = 43200;

export default async function Page() {
  const metrics = await getScholarMetrics();

  // Resolve live citation counts server-side and hand the client a plain map.
  const citations: Record<string, number> = {};
  for (const pub of PUBLICATIONS) {
    const count = citationsFor(metrics, pub.scholarTitle ?? pub.title);
    if (count !== undefined) citations[pub.id] = count;
  }

  return (
    <Suspense fallback={null}>
      <PublicationsPage citations={citations} />
    </Suspense>
  );
}
