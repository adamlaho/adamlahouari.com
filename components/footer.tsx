import { Mail, Github, Linkedin } from 'lucide-react';
import { LINKS, PROFILE } from '@/lib/site';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const buildDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const socialLinks = [
    { name: 'ORCID', href: LINKS.orcid, icon: 'OR' },
    { name: 'Google Scholar', href: LINKS.scholar, icon: 'GS' },
    { name: 'GitHub', href: LINKS.github, icon: Github },
    { name: 'LinkedIn', href: LINKS.linkedin, icon: Linkedin },
    { name: 'Email', href: LINKS.email, icon: Mail },
  ];

  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[var(--container-wide)]">
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-fg-muted">
            <span>© {currentYear} {PROFILE.name}</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-xs">Last updated {buildDate}</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="text-fg-muted hover:text-accent transition-colors"
                aria-label={link.name}
              >
                {typeof link.icon === 'string' ? (
                  <span className="text-xs font-mono font-medium">{link.icon}</span>
                ) : (
                  <link.icon className="w-5 h-5" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
