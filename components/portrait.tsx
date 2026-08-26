import Image from 'next/image';
import { PROFILE } from '@/lib/site';

interface PortraitProps {
  /** Classes for the 3:4 frame. */
  className?: string;
  /** Responsive `sizes` hint so the browser downloads an appropriately sized file. */
  sizes?: string;
  /** Set on the home hero, which is above the fold. */
  priority?: boolean;
}

/**
 * Renders PROFILE.portrait when one is configured, and a neutral placeholder
 * block otherwise — so the site looks intentional before a photo is added.
 *
 * next/image handles the resizing and the AVIF/WebP conversion (see
 * `images.formats` in next.config.ts); the source file can be a plain JPEG.
 */
export function Portrait({
  className = '',
  sizes = '(max-width: 1024px) 100vw, 384px',
  priority = false,
}: PortraitProps) {
  const frame = `relative aspect-[3/4] overflow-hidden rounded-[var(--radius-lg)] ${className}`;

  if (!PROFILE.portrait) {
    return (
      <div
        className={`${frame} bg-gradient-to-br from-accent/20 via-border/30 to-accent/10 border border-border flex items-center justify-center`}
      >
        <span className="text-fg-muted text-sm">Portrait</span>
      </div>
    );
  }

  return (
    <div className={`${frame} border border-border bg-bg-elev`}>
      <Image
        src={PROFILE.portrait}
        alt={PROFILE.portraitAlt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
