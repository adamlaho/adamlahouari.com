"use client";

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/clipboard';

interface CitationCardProps {
  acs: string;
  apa: string;
  chicago?: string;
  bibtex: string;
  ris?: string;
}

export function CitationCard({ acs, apa, chicago, bibtex, ris }: CitationCardProps) {
  const [activeTab, setActiveTab] = useState<'acs' | 'apa' | 'chicago' | 'bibtex' | 'ris'>('acs');
  const [copied, setCopied] = useState(false);

  const citations = {
    acs,
    apa,
    chicago: chicago || acs,
    bibtex,
    ris: ris || '',
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(citations[activeTab]);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-8 bg-bg-elev border border-border rounded-[var(--radius-lg)] overflow-hidden">
      <div className="border-b border-border">
        <div className="flex items-center flex-wrap">
          {(['acs', 'apa', ...(chicago ? ['chicago' as const] : []), 'bibtex', ...(ris ? ['ris' as const] : [])] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-4 py-3 text-sm font-medium transition-colors border-b-2
                ${
                  activeTab === tab
                    ? 'border-accent text-fg'
                    : 'border-transparent text-fg-muted hover:text-fg'
                }
              `}
            >
              {tab === 'acs' && 'ACS'}
              {tab === 'apa' && 'APA'}
              {tab === 'chicago' && 'Chicago'}
              {tab === 'bibtex' && 'BibTeX'}
              {tab === 'ris' && 'RIS'}
            </button>
          ))}
          <div className="ml-auto px-4">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs text-fg-muted hover:text-accent transition-colors px-3 py-1.5 rounded-[var(--radius-md)] hover:bg-border/30"
              aria-label="Copy citation"
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
        </div>
      </div>
      <div className="p-6">
        <pre className="text-sm font-mono whitespace-pre-wrap break-words text-fg">
          {citations[activeTab]}
        </pre>
      </div>
    </div>
  );
}
