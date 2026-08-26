import type { Metadata } from 'next';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/breadcrumb';
import { SectionHeading } from '@/components/section-heading';
import { LINKS } from '@/lib/site';
import { Portrait } from '@/components/portrait';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Background and research trajectory of Adam Lahouari, postdoctoral researcher at NYU Chemistry working on machine-learned interatomic potentials.',
};

function AboutPage() {
  return (
    <main id="main-content" className="flex-1 pt-16">
      <Container className="pt-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'About' },
          ]}
        />
      </Container>

      <section className="py-12">
        <Container>
          <SectionHeading as="h1" title="About" className="mb-12" />

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
            {/* Left column - 40% */}
            <div className="lg:col-span-2 space-y-6">
              <Portrait sizes="(max-width: 1024px) 90vw, 340px" />

              {/* Affiliations */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-fg-muted">
                  Affiliations
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>
                      <a
                        href={LINKS.groupPage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors"
                      >
                        New York University, Department of Chemistry — Tuckerman Group
                      </a>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Alumnus, Sorbonne Université, Paris</span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-fg-muted pt-2">
                <MapPin className="w-4 h-4" />
                <span>Based in New York City</span>
              </div>
            </div>

            {/* Right column - 60% */}
            <div className="lg:col-span-3 space-y-6 text-lg leading-relaxed font-serif-display">
              <p>
                I'm drawn to chemistry because it sits at this remarkable intersection of the tangible and the abstract—molecules you can almost see, forces you have to imagine. What excites me most is building tools that let us predict and understand molecular behavior without having to run thousands of expensive quantum calculations. Machine learning potentials are changing how we approach this: they let us capture the accuracy of quantum mechanics but apply it at scales that were impossible before. My work focuses on automating the entire pipeline—from selecting which structures to calculate, to training models, to validating that they actually work for the chemistry we care about.
              </p>

              <p>
                Most of my time is spent writing code that orchestrates molecular simulations: setting up density functional theory calculations in CP2K or VASP, training graph neural network potentials like MACE, running path integral molecular dynamics to capture quantum nuclear effects, and designing active learning strategies that figure out which data points will teach the model the most. I think a lot about how to make these workflows reliable enough that other researchers can use them without needing to become experts in every piece of the stack.
              </p>

              <p>
                I did my PhD at Sorbonne Université in Paris with Jean-Philip Piquemal and Johannes Richardi, on reactive force fields for metallic nanoparticles—how alkanethiolate monolayers assemble on silver surfaces and nanocrystals, and where the metallic core starts to restructure. Before that I did a double master's between the University of Lille and Jagiellonian University in Kraków, working on symmetry functions and self-assembled monolayers on gold. After defending in 2024 I moved to New York for a postdoc in Mark Tuckerman's group at NYU. The move shifted my research in unexpected ways—being embedded in a group that spans chemistry, physics, and computational methods has pushed me toward problems I wouldn't have encountered otherwise.
              </p>

              <p>
                I'm French, originally from outside Paris, and I've been based in New York for the past couple of years. Outside of research, I train Brazilian Jiu-Jitsu most evenings—it's one of the few things that completely takes me out of my head. I also have a long-running interest in Japan—its literature, aesthetics, and approach to craft—that I've been slowly exploring through reading and, eventually, travel.
              </p>
            </div>
          </div>

          {/* Affiliations row */}
          <div className="border-t border-border pt-12">
            <h3 className="text-xl font-semibold mb-8 text-center">
              Research Affiliation
            </h3>
            <div className="max-w-md mx-auto text-center">
              <a
                href={LINKS.groupPage}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-bg-elev border border-border rounded-[var(--radius-lg)] p-6 mb-3 hover:border-accent/50 transition-colors"
              >
                <h4 className="font-semibold text-lg mb-2">NYU Chemistry</h4>
                <p className="text-sm text-fg-muted">Tuckerman Research Group</p>
              </a>
              <p className="text-sm text-fg-muted">
                Computational chemistry, molecular dynamics and machine-learned
                interatomic potentials
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default AboutPage;
