"use client";

import { Printer } from 'lucide-react';
import { Button } from './button';

/**
 * The CV has print styles in styles/globals.css; this hands the page to the
 * browser's print dialog, where "Save as PDF" produces the downloadable copy.
 */
export function PrintButton({ label = 'Print / Save as PDF' }: { label?: string }) {
  return (
    <Button variant="primary" size="md" onClick={() => window.print()}>
      <Printer className="w-4 h-4" />
      {label}
    </Button>
  );
}
