import { Github, Star, GitBranch } from 'lucide-react';

export interface SoftwareProject {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  language: string;
  license?: string;
  /** "owner/name" — used to pull live stars & last-commit from GitHub. */
  repo?: string;
  stars?: number;
  lastCommit?: string;
  installCommand: string;
  githubUrl: string;
  huggingFaceUrl?: string;
  badges?: string[];
}

interface SoftwareCardProps {
  project: SoftwareProject;
  size?: 'default' | 'large';
}

export function SoftwareCard({ project, size = 'default' }: SoftwareCardProps) {
  return (
    <div className="bg-bg-elev border border-border rounded-[var(--radius-lg)] p-6 space-y-4 h-full flex flex-col">
      <div className="space-y-2 flex-1">
        <a href={`/software/${project.slug}`}>
          <h3 className="text-2xl font-semibold font-mono hover:text-accent transition-colors cursor-pointer">
            {project.name}
          </h3>
        </a>
        <p className="text-fg-muted">{project.tagline}</p>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="px-2 py-1 bg-border/50 rounded-[var(--radius-sm)] text-xs">
          {project.language}
        </span>
        {project.license && (
          <span className="px-2 py-1 bg-border/50 rounded-[var(--radius-sm)] text-xs">
            {project.license}
          </span>
        )}
        {project.stars !== undefined && (
          <span className="px-2 py-1 bg-border/50 rounded-[var(--radius-sm)] text-xs flex items-center gap-1">
            <Star className="w-3 h-3" />
            {project.stars}
          </span>
        )}
        {project.lastCommit && (
          <span className="px-2 py-1 bg-border/50 rounded-[var(--radius-sm)] text-xs flex items-center gap-1">
            <GitBranch className="w-3 h-3" />
            {project.lastCommit}
          </span>
        )}
        {project.huggingFaceUrl ? (
          <a
            href={project.huggingFaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 bg-accent/10 text-accent rounded-[var(--radius-sm)] text-xs hover:bg-accent/20 transition-colors"
          >
            🤗 Hugging Face
          </a>
        ) : (
          project.badges?.map((badge) => (
            <span
              key={badge}
              className="px-2 py-1 bg-accent/10 text-accent rounded-[var(--radius-sm)] text-xs"
            >
              {badge}
            </span>
          ))
        )}
      </div>

      <div className="pt-2">
        <code className="text-sm bg-border/30 px-3 py-1.5 rounded-[var(--radius-md)] inline-block font-mono break-all">
          {project.installCommand}
        </code>
      </div>

      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-accent hover:text-[#2550E6] transition-colors text-sm font-medium pt-2"
      >
        <Github className="w-4 h-4" />
        {project.githubUrl.replace('https://github.com/', '')}
      </a>
    </div>
  );
}
