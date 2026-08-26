import { Presentation, Video, FileText, ExternalLink } from 'lucide-react';

export interface Talk {
  id: string;
  /** Partial ISO date: "2026", "2024-03" or "2023-06-06". */
  date: string;
  type: 'Invited' | 'Contributed' | 'Poster' | 'Seminar';
  event: string;
  location: string;
  venue?: string;
  title: string;
  slidesUrl?: string;
  videoUrl?: string;
  paperUrl?: string;
  doiUrl?: string;
  year: number;
}

interface TalkCardProps {
  talk: Talk;
}

const typeColors = {
  Invited: 'bg-accent/10 text-accent border-accent/20',
  Contributed: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  Poster: 'bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20',
  Seminar: 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20',
};

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function TalkCard({ talk }: TalkCardProps) {
  // Render only the precision the record actually carries.
  const [yearPart, monthPart, dayPart] = talk.date.split('-');
  const year = yearPart;
  const month = monthPart ? MONTHS[Number(monthPart) - 1] : null;
  const day = dayPart ? String(Number(dayPart)) : null;

  return (
    <article className="bg-bg-elev border border-border rounded-[var(--radius-lg)] p-6 hover:border-accent/30 transition-colors">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Date stamp */}
        <div className="flex md:flex-col items-center gap-2 md:gap-0 min-w-[4rem]">
          {day ? (
            <>
              <div className="text-3xl font-semibold leading-none">{day}</div>
              <div className="text-xs text-fg-muted uppercase tracking-wider text-center">
                <div>{month}</div>
                <div>{year}</div>
              </div>
            </>
          ) : month ? (
            <>
              <div className="text-xl font-semibold leading-none">{month}</div>
              <div className="text-xs text-fg-muted uppercase tracking-wider">{year}</div>
            </>
          ) : (
            <div className="text-2xl font-semibold leading-none">{year}</div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-3 py-1 rounded-[var(--radius-full)] text-xs font-medium border ${typeColors[talk.type]}`}>
              {talk.type}
            </span>
            <h3 className="font-semibold text-lg">{talk.event}</h3>
          </div>

          <p className="text-sm text-fg-muted">
            {talk.location}
            {talk.venue && ` · ${talk.venue}`}
          </p>

          <p
            className="text-base leading-relaxed font-serif-display"
          >
            {talk.title}
          </p>
        </div>

        {/* Actions */}
        <div className="flex md:flex-col gap-3 md:items-end justify-start md:justify-start">
          {talk.slidesUrl && (
            <a
              href={talk.slidesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-[#2550E6] transition-colors"
            >
              <Presentation className="w-4 h-4" />
              Slides
            </a>
          )}
          {talk.videoUrl && (
            <a
              href={talk.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-[#2550E6] transition-colors"
            >
              <Video className="w-4 h-4" />
              Video
            </a>
          )}
          {talk.paperUrl && (
            <a
              href={talk.paperUrl}
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-[#2550E6] transition-colors"
            >
              <FileText className="w-4 h-4" />
              Paper
            </a>
          )}
          {talk.doiUrl && (
            <a
              href={talk.doiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-[#2550E6] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Abstract
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
