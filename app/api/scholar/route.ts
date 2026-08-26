import { NextResponse } from 'next/server';
import { getScholarMetrics, SCHOLAR_TTL_SECONDS } from '@/lib/scholar';

// Next requires a literal here; keep it in step with SCHOLAR_TTL_SECONDS.

/**
 * Public JSON view of the live Google Scholar metrics.
 * Useful for debugging which source won, and for any client-side widget.
 *   GET /api/scholar
 */
export const revalidate = 43200;

export async function GET() {
  const metrics = await getScholarMetrics();

  return NextResponse.json(metrics, {
    headers: {
      'cache-control': `public, s-maxage=${SCHOLAR_TTL_SECONDS}, stale-while-revalidate=86400`,
    },
  });
}
