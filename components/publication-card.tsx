"use client";

import { useState } from 'react';
import { ExternalLink, FileText, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/clipboard';
import type { PublicationRecord } from '@/lib/publications';

export type Publication = PublicationRecord;

interface PublicationCardProps {
  publication: Publication;
  /** Live Google Scholar citation count, when the work is indexed. */
  citations?: number;
}

export function PublicationCard({ publication, citations }: PublicationCardProps) {
  const [bibCopied, setBibCopied] = useState(false);

  const handleCopyBibtex = async () => {
    if (!publication.bibtex) return;

    const success = await copyToClipboard(publication.bibtex);
    if (success) {
      setBibCopied(true);
      setTimeout(() => setBibCopied(false), 2000);
    }
  };

  // Long author lists (the MolCryst preprint has 19) are truncated for legibility.
  const MAX_AUTHORS = 8;

  const renderAuthors = (authors: string[]) => {
    const shown = authors.slice(0, MAX_AUTHORS);
    const truncated = authors.length > MAX_AUTHORS;

    return shown.map((author, index) => {
      const isLahouari = author.includes('Lahouari');
      const isLast = index === shown.length - 1;
      return (
        <span key={index}>
          {isLahouari ? <strong>{author}</strong> : author}
          {!isLast && '; '}
          {isLast && truncated && ` et al. (${authors.length} authors)`}
        </span>
      );
    });
  };

  return (
    <article className="bg-bg-elev border border-border rounded-[var(--radius-lg)] p-6 hover:border-accent/30 transition-colors">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <span
          className={`inline-flex items-center px-2 py-1 text-xs font-mono rounded-[var(--radius-sm)] self-start ${
            publication.venueColor === 'accent'
              ? 'bg-accent/10 text-accent'
              : 'bg-fg-muted/10 text-fg-muted'
          }`}
        >
          {publication.venueShort}
        </span>
        <div className="flex-1 space-y-2">
          {publication.slug ? (
            <a href={`/publications/${publication.slug}`}>
              <h3
                className="text-lg font-semibold leading-snug hover:text-accent transition-colors cursor-pointer font-serif-display"
              >
                {publication.title}
              </h3>
            </a>
          ) : (
            <h3
              className="text-lg font-semibold leading-snug font-serif-display"
            >
              {publication.title}
            </h3>
          )}
          <p className="text-sm text-fg-muted">
            {renderAuthors(publication.authors)}
          </p>
          <p className="text-sm text-fg-muted italic">
            {publication.venue}
          </p>
        </div>
        <div className="flex md:flex-col gap-3 md:items-end">
          <span className="text-sm text-fg-muted whitespace-nowrap">{publication.year}</span>
          {citations !== undefined && citations > 0 && (
            <span
              className="text-xs text-fg-muted whitespace-nowrap tabular-nums"
              title="Citations (Google Scholar)"
            >
              {citations} {citations === 1 ? 'citation' : 'citations'}
            </span>
          )}
          <div className="flex gap-2">
            {publication.doiUrl && (
              <a
                href={publication.doiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted hover:text-accent transition-colors"
                aria-label={`DOI for ${publication.title}`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {publication.arxivUrl && publication.arxivUrl !== publication.pdfUrl && (
              <a
                href={publication.arxivUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted hover:text-accent transition-colors font-mono text-xs"
                aria-label={`arXiv page for ${publication.title}`}
              >
                arXiv
              </a>
            )}
            {publication.pdfUrl && (
              <a
                href={publication.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted hover:text-accent transition-colors"
                aria-label={`PDF for ${publication.title}`}
              >
                <FileText className="w-4 h-4" />
              </a>
            )}
            {publication.bibtex && (
              <button
                onClick={handleCopyBibtex}
                className="text-fg-muted hover:text-accent transition-colors relative group"
                aria-label={`Copy BibTeX for ${publication.title}`}
                title="Copy BibTeX"
              >
                {bibCopied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <span className="font-mono text-xs">bib</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
