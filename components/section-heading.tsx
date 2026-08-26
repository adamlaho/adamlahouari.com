import { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  kicker?: string | ReactNode;
  className?: string;
  /**
   * Heading level. Pass "h1" for the single page-level heading; every other
   * use should stay at the default so the document outline is well formed.
   */
  as?: 'h1' | 'h2' | 'h3';
}

export function SectionHeading({
  eyebrow,
  title,
  kicker,
  className = '',
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {eyebrow && (
        <p className="text-sm uppercase tracking-wider text-fg-muted font-medium">
          {eyebrow}
        </p>
      )}
      <Heading className="text-3xl font-semibold">{title}</Heading>
      {kicker && (
        <div className="text-lg text-fg-muted max-w-2xl">
          {kicker}
        </div>
      )}
    </div>
  );
}
