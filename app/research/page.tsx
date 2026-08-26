import type { Metadata } from 'next';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/breadcrumb';
import { SectionHeading } from '@/components/section-heading';
import { ProjectCard } from '@/components/project-card';
import { PAPERS, formatAuthors } from '@/lib/publications';
import { ExternalLink, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Research areas: machine-learned interatomic potentials, molecular crystal polymorphism, automated MLIP development, and reactive force fields for metallic nanoparticles.',
};

const METHODS = [
  'MACE',
  'ASE',
  'CP2K',
  'VASP',
  'Gaussian',
  'ReaxFF',
  'LAMMPS',
  'Tinker-HP',
  'DFT',
  'Molecular dynamics',
  'Active learning',
  'Foundation-model fine-tuning',
];

function ResearchPage() {
  return (
    <main id="main-content" className="flex-1 pt-16">
      <Container className="pt-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Research' },
          ]}
        />
      </Container>

      <section className="py-12">
        <Container size="prose">
          <SectionHeading
            as="h1"
            eyebrow="Research"
            title="Themes and methods"
            kicker="Three connected directions in computational chemistry and machine learning for chemistry."
            className="mb-8"
          />

          <div className="prose font-serif-display">
            <p className="text-lg leading-relaxed text-fg">
              My work centres on machine-learned interatomic potentials (MLIPs): how to
              build them reliably, how to make them trustworthy for molecular crystals,
              and how to automate the parts of the workflow that normally consume weeks
              of manual effort. The AMLP pipeline handles data set generation, training
              and validation end to end; MolCryst applies it at scale to produce an open
              database of fine-tuned MACE models for polymorphic molecular crystals. That
              line of work grew out of my doctoral research on reactive force fields for
              metallic nanoparticles, where the same question — how far can an empirical
              or learned potential be pushed before it stops describing real chemistry —
              drove the methodology.
            </p>
          </div>
        </Container>
      </section>

      {/* Project Grid */}
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              size="large"
              title="AMLP — Automated MLIP Development"
              description="An LLM-assisted pipeline unifying data set creation, structure preprocessing, MACE training and validation, with an ASE-based analysis suite. Validated on acridine polymorphs at ~1.7 meV/atom and ~7.0 meV/Å."
              tags={['Automation', 'LLM', 'MACE']}
              themeColor="--theme-amlp"
              href="/research/amlp"
              image={
                <div className="w-full h-full bg-gradient-to-br from-orange-500/10 to-orange-600/20 flex items-center justify-center">
                  <span className="text-[var(--theme-amlp)] font-mono text-sm">
                    Automated Pipeline
                  </span>
                </div>
              }
            />

            <ProjectCard
              size="large"
              title="Molecular Crystal Polymorphism"
              description="MolCryst-MLIPs: fine-tuned MACE models for nine molecular crystal systems, benchmarked against foundation models on DFT-labelled polymorph sets and validated by MD stability analysis."
              tags={['Polymorphism', 'MACE', 'Dataset']}
              themeColor="--theme-cryst"
              href="/software/molcryst"
              image={
                <div className="w-full h-full bg-gradient-to-br from-violet-500/10 to-violet-600/20 flex items-center justify-center">
                  <span className="text-[var(--theme-cryst)] font-mono text-sm">
                    Crystal Structure
                  </span>
                </div>
              }
            />

            <ProjectCard
              size="large"
              title="Reactive Force Fields for Nanoparticles"
              description="ReaxFF molecular dynamics of alkanethiolate self-assembled monolayers on Ag(111) surfaces and nanoparticles up to 10 nm, including core restructuring below 4 nm."
              tags={['ReaxFF', 'Nanoparticles', 'MD']}
              themeColor="--theme-mlips"
              image={
                <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-blue-600/20 flex items-center justify-center">
                  <span className="text-[var(--theme-mlips)] font-mono text-sm">
                    Self-Assembled Monolayers
                  </span>
                </div>
              }
            />
          </div>
        </Container>
      </section>

      {/* Methods Strip */}
      <section className="py-12 bg-bg-elev border-y border-border">
        <Container>
          <h2 className="text-lg font-semibold mb-6">Methods &amp; Tools</h2>
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex gap-3 pb-2 min-w-max">
              {METHODS.map((method) => (
                <span
                  key={method}
                  className="px-4 py-2 bg-bg border border-border rounded-[var(--radius-md)] text-sm font-mono whitespace-nowrap"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Related Publications Rail */}
      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-semibold mb-8">Related Publications</h2>
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex gap-4 pb-2 min-w-max">
              {PAPERS.map((pub) => (
                <article
                  key={pub.id}
                  className="w-80 flex-shrink-0 bg-bg-elev border border-border rounded-[var(--radius-lg)] p-5 space-y-3"
                >
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-mono rounded-[var(--radius-sm)] ${
                      pub.venueColor === 'accent'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-fg-muted/10 text-fg-muted'
                    }`}
                  >
                    {pub.venueShort}
                  </span>
                  <h3
                    className="text-base font-semibold leading-snug font-serif-display"
                  >
                    {pub.title}
                  </h3>
                  <p className="text-xs text-fg-muted">{formatAuthors(pub.authors, 3)}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-fg-muted">{pub.year}</span>
                    <div className="flex gap-2">
                      {pub.doiUrl && (
                        <a
                          href={pub.doiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-fg-muted hover:text-accent transition-colors"
                          aria-label={`DOI for ${pub.title}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
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
                          <FileText className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default ResearchPage;
