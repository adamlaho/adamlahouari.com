/**
 * Live repository stats (stars, forks, license, last push) from the public
 * GitHub REST API. Unauthenticated requests are limited to 60/hour per IP;
 * set GITHUB_TOKEN to raise that to 5000/hour. Failures degrade to `null`,
 * which callers render as "stat hidden" rather than a wrong number.
 */

export const GITHUB_TTL_SECONDS = 60 * 60 * 6;

export interface RepoStats {
  stars: number;
  forks: number;
  license: string | null;
  pushedAt: string;
  /** e.g. "3 days ago" */
  lastCommit: string;
}

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const day = 86_400_000;
  const days = Math.floor(diffMs / day);

  if (days < 1) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) {
    const w = Math.floor(days / 7);
    return w === 1 ? '1 week ago' : `${w} weeks ago`;
  }
  if (days < 365) {
    const m = Math.floor(days / 30);
    return m === 1 ? '1 month ago' : `${m} months ago`;
  }
  const y = Math.floor(days / 365);
  return y === 1 ? '1 year ago' : `${y} years ago`;
}

export async function getRepoStats(fullName: string): Promise<RepoStats | null> {
  try {
    const headers: Record<string, string> = {
      accept: 'application/vnd.github+json',
      'user-agent': 'adamlahouari.com',
    };
    if (process.env.GITHUB_TOKEN) {
      headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(`https://api.github.com/repos/${fullName}`, {
      headers,
      next: { revalidate: GITHUB_TTL_SECONDS },
    });
    if (!res.ok) return null;

    const repo: any = await res.json();
    return {
      stars: repo.stargazers_count ?? 0,
      forks: repo.forks_count ?? 0,
      license: repo.license?.spdx_id && repo.license.spdx_id !== 'NOASSERTION'
        ? repo.license.spdx_id
        : null,
      pushedAt: repo.pushed_at,
      lastCommit: repo.pushed_at ? relativeTime(repo.pushed_at) : '',
    };
  } catch {
    return null;
  }
}
