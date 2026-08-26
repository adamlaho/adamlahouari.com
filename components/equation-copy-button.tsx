"use client";

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/clipboard';

/**
 * Copy affordance for <Equation>. Split out so the equation itself can stay a
 * server component and keep KaTeX out of the client bundle.
 */
export function EquationCopyButton({ latex }: { latex: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (await copyToClipboard(latex)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute top-3 right-3 inline-flex items-center gap-1.5 text-xs text-fg-muted bg-bg border border-border px-2 py-1 rounded-[var(--radius-sm)] opacity-0 focus-visible:opacity-100 group-hover:opacity-100 transition-opacity hover:text-accent"
      aria-label="Copy LaTeX source"
    >
      {copied ? (
        <>
          <Check className="w-3 h-3" />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          Copy LaTeX
        </>
      )}
    </button>
  );
}
