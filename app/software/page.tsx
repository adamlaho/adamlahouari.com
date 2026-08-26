import type { Metadata } from 'next';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/breadcrumb';
import { SectionHeading } from '@/components/section-heading';
import { SoftwareCard } from '@/components/software-card';
import { getSoftwareProjects } from '@/lib/software';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Software & Data',
  description:
    'Open-source tools and datasets for machine learning in computational chemistry: the AMLP pipeline and the MolCryst-MLIPs model database.',
};

// Stars and last-commit come live from GitHub.
export const revalidate = 21600;

async function SoftwarePage() {
  const projects = await getSoftwareProjects();

  return (
    <main id="main-content" className="flex-1 pt-16">
      <Container className="pt-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Software' },
          ]}
        />
      </Container>

      <section className="py-12">
        <Container>
          <SectionHeading as="h1" title="Software & Data" className="mb-8" />
          <p className="text-lg text-fg-muted max-w-3xl mb-12">
            Open-source tools and data sets for machine learning in computational
            chemistry. Star counts and last-commit dates below are pulled live from
            GitHub.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {projects.map((project) => (
              <SoftwareCard key={project.id} project={project} />
            ))}
          </div>

          {/* Callout */}
          <div className="bg-accent-soft border-l-4 border-l-accent rounded-[var(--radius-lg)] p-6">
            <h3 className="text-lg font-semibold mb-2">
              Citing these tools
            </h3>
            <p className="text-fg-muted text-sm mb-4">
              If you use these tools in your research, please cite the corresponding papers. Citation information is available on each tool's detail page.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/software/amlp"
                className="inline-flex items-center gap-1 text-accent hover:text-[#2550E6] transition-colors text-sm font-medium"
              >
                AMLP citation <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="/software/molcryst"
                className="inline-flex items-center gap-1 text-accent hover:text-[#2550E6] transition-colors text-sm font-medium"
              >
                MolCryst citation <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default SoftwarePage;
