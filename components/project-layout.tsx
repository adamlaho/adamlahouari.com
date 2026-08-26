import { ReactNode } from 'react';
import { Container } from './container';
import { Breadcrumb } from './breadcrumb';
import { Tag } from './tag';
import { ExternalLink, Github } from 'lucide-react';

export interface ProjectLayoutProps {
  slug: string;
  themeColor: string;
  eyebrow: string;
  title: string;
  description: string;
  status: string;
  tags: string[];
  paperUrl?: string;
  githubUrl?: string;
  meta: {
    status: string;
    started: string;
    pi: string;
    collaborators?: string;
    funding?: string;
    license: string;
    language: string;
  };
  children: ReactNode;
}

export function ProjectLayout({
  slug,
  themeColor,
  eyebrow,
  title,
  description,
  status,
  tags,
  paperUrl,
  githubUrl,
  meta,
  children,
}: ProjectLayoutProps) {
  return (
    <main id="main-content" className="flex-1 pt-16">
      <Container className="pt-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Research', href: '/research' },
            { label: title },
          ]}
        />
      </Container>

      {/* Project Hero Band */}
      <section
        className="py-16 border-b-4 mt-6"
        style={{
          backgroundColor: `color-mix(in srgb, var(${themeColor}) 5%, var(--bg))`,
          borderBottomColor: `var(${themeColor})`,
        }}
      >
        <Container>
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-wider text-fg-muted font-medium">
              {eyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold">
              {title}
            </h1>
            <p className="text-xl text-fg-muted max-w-3xl">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1.5 bg-green-500/10 text-green-700 dark:text-green-400 rounded-[var(--radius-full)] text-sm font-medium border border-green-500/20">
                {status}
              </span>
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {paperUrl && (
                <a
                  href={paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-[var(--radius-md)] hover:bg-[#2550E6] transition-colors font-medium text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Read the paper
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-bg-elev text-fg border border-border rounded-[var(--radius-md)] hover:bg-border/30 transition-colors font-medium text-sm"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Two-column body */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-12">
            {/* Left column - content */}
            <div className="prose-content">
              {children}
            </div>

            {/* Right column - sticky meta panel */}
            <aside className="lg:sticky lg:top-24 h-fit">
              <div className="bg-bg-elev border border-border rounded-[var(--radius-lg)] p-6 space-y-4">
                <h3 className="text-lg font-semibold">Project info</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt className="text-fg-muted">Status</dt>
                    <dd className="font-medium text-right">{meta.status}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt className="text-fg-muted">Started</dt>
                    <dd className="font-medium text-right">{meta.started}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt className="text-fg-muted">PI</dt>
                    <dd className="font-medium text-right">{meta.pi}</dd>
                  </div>
                  {meta.collaborators && (
                    <div className="flex justify-between gap-4 border-b border-border pb-2">
                      <dt className="text-fg-muted">Collaborators</dt>
                      <dd className="font-medium text-right">{meta.collaborators}</dd>
                    </div>
                  )}
                  {meta.funding && (
                    <div className="flex justify-between gap-4 border-b border-border pb-2">
                      <dt className="text-fg-muted">Funding</dt>
                      <dd className="font-medium text-right">{meta.funding}</dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-4 border-b border-border pb-2">
                    <dt className="text-fg-muted">License</dt>
                    <dd className="font-medium text-right">{meta.license}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-fg-muted">Language</dt>
                    <dd className="font-medium text-right">{meta.language}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
