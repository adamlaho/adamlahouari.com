"use client";

import { useState, useEffect } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/clipboard';

// Register only the grammars the site actually uses. Importing `Prism`
// instead of `PrismLight` would bundle every language Prism ships with,
// which is several hundred kB of JavaScript for three code samples.
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('yaml', yaml);

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  // The resolved theme is unknown during SSR; render the light palette both
  // server- and first-client-side so the markup matches, then swap.
  useEffect(() => setMounted(true), []);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-8 bg-bg-elev border border-border rounded-[var(--radius-lg)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-border/30">
        <span className="text-xs font-mono text-fg-muted">{filename ?? language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs text-fg-muted hover:text-accent transition-colors"
          aria-label={`Copy ${filename ?? language} code`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={mounted && resolvedTheme === 'dark' ? oneDark : oneLight}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          background: 'transparent',
          fontSize: '0.875rem',
        }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
