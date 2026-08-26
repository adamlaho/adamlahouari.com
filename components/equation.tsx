import katex from 'katex';
import 'katex/dist/katex.min.css';
import { EquationCopyButton } from './equation-copy-button';

interface EquationProps {
  latex: string;
  caption?: string;
}

/**
 * Server component: KaTeX renders to HTML at build time, so the ~100 kB
 * library never reaches the browser. KaTeX emits MathML alongside the visual
 * output, which is what screen readers read.
 */
export function Equation({ latex, caption }: EquationProps) {
  const html = katex.renderToString(latex, {
    displayMode: true,
    throwOnError: false,
  });

  return (
    <figure className="my-8">
      <div className="relative bg-bg-elev border border-border rounded-[var(--radius-lg)] p-8 overflow-x-auto hover:border-accent/50 transition-colors group">
        <div dangerouslySetInnerHTML={{ __html: html }} className="text-center text-lg" />
        <EquationCopyButton latex={latex} />
      </div>
      {caption && (
        <figcaption className="text-sm text-fg-muted text-center mt-3">{caption}</figcaption>
      )}
    </figure>
  );
}
