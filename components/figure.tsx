import { ReactNode } from 'react';

interface FigureProps {
  children: ReactNode;
  caption: string;
  number?: string;
}

export function Figure({ children, caption, number }: FigureProps) {
  return (
    <figure className="my-12 space-y-4">
      <div className="bg-border/30 rounded-[var(--radius-lg)] overflow-hidden border border-border">
        {children}
      </div>
      <figcaption className="text-sm text-fg-muted text-center px-4">
        {number && <strong className="font-semibold">{number}. </strong>}
        {caption}
      </figcaption>
    </figure>
  );
}
