import { Star, GitFork, GitBranch } from 'lucide-react';
import { getRepoStats } from '@/lib/github';

interface RepoBadgesProps {
  /** "owner/name" */
  repo: string;
  language?: string;
  license?: string;
}

const pill =
  'px-3 py-1.5 bg-bg-elev border border-border rounded-[var(--radius-full)] text-sm font-medium';

/**
 * Language / license pills plus live stars, forks and last-commit from GitHub.
 * When the API is unreachable the live pills are simply omitted rather than
 * showing a stale number.
 */
export async function RepoBadges({ repo, language, license }: RepoBadgesProps) {
  const stats = await getRepoStats(repo);
  const licenseLabel = license ?? stats?.license ?? null;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {licenseLabel && <span className={pill}>{licenseLabel} License</span>}
      {language && <span className={pill}>{language}</span>}
      {stats && (
        <>
          <span className={`${pill} flex items-center gap-1`}>
            <Star className="w-3.5 h-3.5" />
            {stats.stars} {stats.stars === 1 ? 'star' : 'stars'}
          </span>
          {stats.forks > 0 && (
            <span className={`${pill} flex items-center gap-1`}>
              <GitFork className="w-3.5 h-3.5" />
              {stats.forks} {stats.forks === 1 ? 'fork' : 'forks'}
            </span>
          )}
          <span className={`${pill} flex items-center gap-1`}>
            <GitBranch className="w-3.5 h-3.5" />
            updated {stats.lastCommit}
          </span>
        </>
      )}
    </div>
  );
}
