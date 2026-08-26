import type { Metadata } from 'next';
import { Container } from '@/components/container';
import { Button } from '@/components/button';
import { Tag } from '@/components/tag';
import { SectionHeading } from '@/components/section-heading';
import { SoftwareCard } from '@/components/software-card';
import { ScholarStats } from '@/components/scholar-stats';
import { Portrait } from '@/components/portrait';
import { getSoftwareProjects } from '@/lib/software';
import { PAPERS, formatAuthors } from '@/lib/publications';
import { LINKS } from '@/lib/site';
import { Mail, Github, Linkedin, ExternalLink, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Adam Lahouari — Research Portfolio',
  description:
    'Postdoctoral researcher at NYU Chemistry (Tuckerman Group) developing machine-learned interatomic potentials for molecular crystals and metallic nanoparticles.',
  openGraph: {
    title: 'Adam Lahouari — Research Portfolio',
    description:
      'Postdoctoral researcher at NYU Chemistry (Tuckerman Group) developing machine-learned interatomic potentials for molecular crystals and metallic nanoparticles.',
    type: 'website',
  },
};

// Re-fetch live Scholar / GitHub numbers twice a day.
export const revalidate = 43200;

async function HomePage() {
  const softwareProjects = await getSoftwareProjects();
  const recentPapers = PAPERS.slice(0, 3);

  return (
    <main id="main-content" className="flex-1">
      {/* Hero Section */}
      <section className="min-h-[70vh] md:min-h-[85vh] flex items-center pt-16">
        <Container className="py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl">
                  Adam Lahouari
                </h1>
                <p className="text-lg text-fg-muted">
                  Postdoctoral Researcher · NYU Chemistry · Tuckerman Group
                </p>
              </div>

              <p className="text-lg max-w-2xl font-serif-display">
                I build machine-learned interatomic potentials for molecular crystals, and automate the workflow that produces them. My work spans LLM-assisted pipeline development, polymorph prediction, and reactive force fields for metallic nanoparticles.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href="/research">
                  <Button variant="primary" size="md">
                    View Research
                  </Button>
                </a>
                <a href="/cv">
                  <Button variant="secondary" size="md" icon={<FileText className="w-4 h-4" />}>
                    View CV
                  </Button>
                </a>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <a
                  href={LINKS.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg-muted hover:text-accent transition-colors"
                  aria-label="ORCID"
                >
                  <span className="text-xs font-mono font-medium">OR</span>
                </a>
                <a
                  href={LINKS.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg-muted hover:text-accent transition-colors"
                  aria-label="Google Scholar"
                >
                  <span className="text-xs font-mono font-medium">GS</span>
                </a>
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg-muted hover:text-accent transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg-muted hover:text-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={LINKS.email}
                  className="text-fg-muted hover:text-accent transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <a
                href="/about"
                className="block max-w-sm mx-auto hover:opacity-90 transition-opacity"
                aria-label="About Adam Lahouari"
              >
                <Portrait priority sizes="(max-width: 1024px) 90vw, 384px" />
              </a>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-bg-elev border border-border rounded-[var(--radius-md)] text-sm">
                  NYU Chemistry
                </span>
                <span className="px-3 py-1.5 bg-bg-elev border border-border rounded-[var(--radius-md)] text-sm">
                  Tuckerman Group
                </span>
                <span className="px-3 py-1.5 bg-bg-elev border border-border rounded-[var(--radius-md)] text-sm">
                  MACE · MLIPs
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Metrics Strip — live Google Scholar numbers */}
      <ScholarStats />

      {/* Selected Research */}
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Themes"
            title="Selected Research"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-bg-elev border border-border rounded-[var(--radius-lg)] p-6 space-y-4 border-l-4 border-l-[var(--theme-amlp)]">
              <h3 className="text-xl font-semibold">
                AMLP Framework
              </h3>
              <p className="text-fg-muted">
                An LLM-assisted pipeline that automates data set generation for
                machine-learned interatomic potentials.
              </p>
              <div className="flex flex-wrap gap-2">
                <Tag>Automation</Tag>
                <Tag>LLM</Tag>
                <Tag>MACE</Tag>
              </div>
              <a
                href="/research/amlp"
                className="inline-flex items-center gap-1 text-accent hover:text-[#2550E6] transition-colors text-sm font-medium mt-2"
              >
                Explore <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="bg-bg-elev border border-border rounded-[var(--radius-lg)] p-6 space-y-4 border-l-4 border-l-[var(--theme-cryst)]">
              <h3 className="text-xl font-semibold">
                Molecular Crystals &amp; Polymorphism
              </h3>
              <p className="text-fg-muted">
                Fine-tuned foundation models and a public database of MLIPs for
                polymorphic molecular crystals.
              </p>
              <div className="flex flex-wrap gap-2">
                <Tag>Polymorphism</Tag>
                <Tag>MACE</Tag>
                <Tag>Dataset</Tag>
              </div>
              <a
                href="/software/molcryst"
                className="inline-flex items-center gap-1 text-accent hover:text-[#2550E6] transition-colors text-sm font-medium mt-2"
              >
                Explore <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="bg-bg-elev border border-border rounded-[var(--radius-lg)] p-6 space-y-4 border-l-4 border-l-[var(--theme-mlips)]">
              <h3 className="text-xl font-semibold">
                Reactive Force Fields for Nanoparticles
              </h3>
              <p className="text-fg-muted">
                ReaxFF and machine-learned models for self-assembled monolayers
                on silver and gold nanocrystals.
              </p>
              <div className="flex flex-wrap gap-2">
                <Tag>ReaxFF</Tag>
                <Tag>Nanoparticles</Tag>
                <Tag>MD</Tag>
              </div>
              <a
                href="/research"
                className="inline-flex items-center gap-1 text-accent hover:text-[#2550E6] transition-colors text-sm font-medium mt-2"
              >
                Explore <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Recent Publications */}
      <section className="py-24 bg-bg-elev">
        <Container>
          <div className="flex items-end justify-between mb-12">
            <SectionHeading title="Recent Publications" />
            <a
              href="/publications"
              className="text-accent hover:text-[#2550E6] transition-colors text-sm font-medium inline-flex items-center gap-1"
            >
              See all <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div className="space-y-4">
            {recentPapers.map((pub) => (
              <article
                key={pub.id}
                className="bg-bg border border-border rounded-[var(--radius-lg)] p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-mono rounded-[var(--radius-sm)] self-start ${
                      pub.venueColor === 'accent'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-fg-muted/10 text-fg-muted'
                    }`}
                  >
                    {pub.venueShort}
                  </span>
                  <div className="flex-1 space-y-2">
                    {pub.slug ? (
                      <a href={`/publications/${pub.slug}`}>
                        <h3
                          className="text-lg font-semibold hover:text-accent transition-colors font-serif-display"
                        >
                          {pub.title}
                        </h3>
                      </a>
                    ) : (
                      <h3
                        className="text-lg font-semibold font-serif-display"
                      >
                        {pub.title}
                      </h3>
                    )}
                    <p className="text-sm text-fg-muted">
                      {formatAuthors(pub.authors, 4)}
                    </p>
                    <p className="text-sm text-fg-muted italic">{pub.venue}</p>
                  </div>
                  <div className="flex md:flex-col gap-3 md:items-end">
                    <span className="text-sm text-fg-muted">{pub.year}</span>
                    <div className="flex gap-2">
                      {pub.doiUrl && (
                        <a
                          href={pub.doiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-fg-muted hover:text-accent transition-colors"
                          aria-label={`DOI for ${pub.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {pub.pdfUrl && (
                        <a
                          href={pub.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-fg-muted hover:text-accent transition-colors"
                          aria-label={`PDF for ${pub.title}`}
                        >
                          <FileText className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Software & Data */}
      <section className="py-24">
        <Container>
          <SectionHeading title="Software & Data" className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {softwareProjects.map((project) => (
              <SoftwareCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </section>

      {/* News Strip */}
      <section className="py-24 bg-bg-elev">
        <Container>
          <SectionHeading title="Latest" className="mb-12" />
          <div className="space-y-6">
            <div className="flex gap-6 pb-6 border-b border-border">
              <time className="text-sm text-fg-muted font-mono min-w-[6rem]" dateTime="2026-04">
                Apr 2026
              </time>
              <p className="text-fg">
                <em>MolCryst-MLIPs</em>, a machine-learned interatomic potentials
                database for molecular crystals, posted to arXiv.
              </p>
            </div>
            <div className="flex gap-6 pb-6 border-b border-border">
              <time className="text-sm text-fg-muted font-mono min-w-[6rem]" dateTime="2025-12">
                Dec 2025
              </time>
              <p className="text-fg">
                The AMLP paper published in <em>J. Chem. Theory Comput.</em>{' '}
                <strong>22</strong> (1), 305–317.
              </p>
            </div>
            <div className="flex gap-6 pb-6 border-b border-border">
              <time className="text-sm text-fg-muted font-mono min-w-[6rem]" dateTime="2024-09">
                Sep 2024
              </time>
              <p className="text-fg">
                Ph.D. defended at Sorbonne Université on reactive force fields for
                metallic nanoparticles.
              </p>
            </div>
          </div>
        </Container>
      </section>

    </main>
  );
}

export default HomePage;
