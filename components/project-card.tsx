import { ReactNode } from 'react';
import { Tag } from './tag';

type ProjectCardSize = 'default' | 'large';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  themeColor: string;
  size?: ProjectCardSize;
  image?: ReactNode;
  href?: string;
}

export function ProjectCard({
  title,
  description,
  tags,
  themeColor,
  size = 'default',
  image,
  href,
}: ProjectCardProps) {
  return (
    <article
      className={`
        bg-bg-elev border border-border rounded-[var(--radius-lg)]
        overflow-hidden space-y-4 border-l-4
        ${size === 'large' ? 'h-full flex flex-col' : ''}
      `}
      style={{ borderLeftColor: `var(${themeColor})` }}
    >
      {size === 'large' && image && (
        <div className="w-full aspect-[2/1] bg-border flex items-center justify-center overflow-hidden">
          {image}
        </div>
      )}
      <div className={size === 'large' ? 'p-6 flex-1 flex flex-col' : 'p-6 space-y-4'}>
        <div className="space-y-3">
          <h3 className={size === 'large' ? 'text-2xl font-semibold' : 'text-xl font-semibold'}>
            {title}
          </h3>
          <p className="text-fg-muted">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        {href && (
          <a
            href={href}
            className="inline-flex items-center gap-1 text-accent hover:text-[#2550E6] transition-colors text-sm font-medium mt-auto pt-2"
          >
            Explore <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </article>
  );
}
