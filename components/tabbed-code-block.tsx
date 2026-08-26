"use client";

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/clipboard';

interface CodeTab {
  label: string;
  code: string;
  language?: string;
}

interface TabbedCodeBlockProps {
  tabs: CodeTab[];
}

export function TabbedCodeBlock({ tabs }: TabbedCodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(tabs[activeTab].code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-bg-elev border border-border rounded-[var(--radius-lg)] overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-border/30">
        <div className="flex">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === index
                  ? 'border-accent text-fg'
                  : 'border-transparent text-fg-muted hover:text-fg'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs text-fg-muted hover:text-accent transition-colors px-4"
          aria-label="Copy code"
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
      <div className="p-4">
        <pre className="text-sm font-mono overflow-x-auto">
          <code>{tabs[activeTab].code}</code>
        </pre>
      </div>
    </div>
  );
}
