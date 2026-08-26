import { ReactNode } from 'react';
import { Container } from './container';
import { Breadcrumb } from './breadcrumb';
import { ExternalLink, FileText } from 'lucide-react';

export interface PublicationAuthor {
  name: string;
  orcid?: string;
  isMainAuthor?: boolean;
}

export interface PublicationMeta {
  venue: string;
  venueShort: string;
  venueColor?: 'accent' | 'muted';
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  publishedDate?: string;
  openAccess?: boolean;
  status: 'published' | 'preprint' | 'in-press' | 'in-prep';
  doi?: string;
  pdfUrl?: string;
  arxivUrl?: string;
}

interface PublicationLayoutProps {
  slug: string;
  title: string;
  authors: PublicationAuthor[];
  meta: PublicationMeta;
  jsonLd: Record<string, any>;
  children: ReactNode;
}

export function PublicationLayout({
  slug,
  title,
  authors,
  meta,
  jsonLd,
  children,
}: PublicationLayoutProps) {
  const statusBadges = {
    published: { text: 'Published', color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20' },
    preprint: { text: 'Preprint', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20' },
    'in-press': { text: 'In Press', color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20' },
    'in-prep': { text: 'In Preparation', color: 'bg-fg-muted/10 text-fg-muted border-fg-muted/20' },
  };

  const badge = statusBadges[meta.status];

  const truncatedTitle = title.length > 50 ? title.substring(0, 50) + '...' : title;

  return (
    <main id="main-content" className="flex-1 pt-16">
      {/* Rendered into the markup rather than injected on mount, so crawlers see it. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="pt-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Publications', href: '/publications' },
            { label: truncatedTitle },
          ]}
        />
      </Container>

      {/* Header Block */}
      <section className="py-12 border-b border-border">
        <Container size="prose">
          <div className="space-y-6">
            {/* Top row: venue, year, status */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center px-2 py-1 text-xs font-mono rounded-[var(--radius-sm)] ${
                  meta.venueColor === 'accent'
                    ? 'bg-accent/10 text-accent'
                    : 'bg-fg-muted/10 text-fg-muted'
                }`}
              >
                {meta.venueShort}
              </span>
              <span className="text-sm text-fg-muted">{meta.year}</span>
              <span className={`px-3 py-1 rounded-[var(--radius-full)] text-xs font-medium border ${badge.color}`}>
                {badge.text}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              {title}
            </h1>

            {/* Authors */}
            <div className="text-base text-fg-muted">
              {authors.map((author, index) => (
                <span key={index}>
                  {author.orcid ? (
                    <a
                      href={author.orcid}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`hover:text-accent transition-colors ${
                        author.isMainAuthor ? 'font-semibold text-fg' : ''
                      }`}
                    >
                      {author.name}
                    </a>
                  ) : (
                    <span className={author.isMainAuthor ? 'font-semibold text-fg' : ''}>
                      {author.name}
                    </span>
                  )}
                  {index < authors.length - 1 && '; '}
                </span>
              ))}
            </div>

            {/* Metadata line */}
            <p className="text-sm text-fg-muted">
              <em>{meta.venue}</em> {meta.year}
              {meta.volume && `, ${meta.volume}`}
              {meta.issue && ` (${meta.issue})`}
              {meta.pages && `, ${meta.pages}`}
              {meta.publishedDate && ` · Published ${meta.publishedDate}`}
              {meta.openAccess && ' · Open access'}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {meta.doi && (
                <a
                  href={meta.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-[var(--radius-md)] hover:bg-[#2550E6] transition-colors text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on publisher
                </a>
              )}
              {meta.pdfUrl && (
                <a
                  href={meta.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-bg-elev border border-border rounded-[var(--radius-md)] hover:bg-border/30 transition-colors text-sm font-medium"
                >
                  <FileText className="w-4 h-4" />
                  PDF
                </a>
              )}
              {meta.arxivUrl && (
                <a
                  href={meta.arxivUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-bg-elev border border-border rounded-[var(--radius-md)] hover:bg-border/30 transition-colors text-sm font-medium"
                >
                  arXiv
                </a>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16">
        <Container size="prose">
          {children}
        </Container>
      </section>
    </main>
  );
}
