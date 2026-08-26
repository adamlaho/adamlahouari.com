"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AbstractBlockProps {
  abstract: string;
  collapsible?: boolean;
  lineLimit?: number;
}

export function AbstractBlock({ abstract, collapsible = true, lineLimit = 6 }: AbstractBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Simple heuristic: if text is longer than ~600 chars, consider it long
  const isLong = collapsible && abstract.length > 600;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Abstract</h2>
      <div
        className={`prose text-base leading-relaxed ${
          isLong && !isExpanded ? 'line-clamp-6' : ''
        } font-serif-display`}
      >
        <p>{abstract}</p>
      </div>
      {isLong && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 text-accent hover:text-[#2550E6] transition-colors text-sm font-medium"
        >
          {isExpanded ? (
            <>
              Show less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show more <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
