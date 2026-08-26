import type { Metadata } from 'next';
import { PublicationLayout } from '@/components/publication-layout';
import { AbstractBlock } from '@/components/abstract-block';
import { SectionHeading } from '@/components/section-heading';
import { CitationCard } from '@/components/citation-card';
import { ProjectCard } from '@/components/project-card';
import { PublicationCard } from '@/components/publication-card';
import { PUBLICATIONS } from '@/lib/publications';
import { citationsFor } from '@/lib/citations';
import { LINKS } from '@/lib/site';

const TITLE =
  'Automated Machine Learning Pipeline: Large Language Models-Assisted Automated Data Set Generation for Training Machine-Learned Interatomic Potentials';

const ABSTRACT = `Machine learning interatomic potentials (MLIPs) have become powerful tools to extend molecular simulations beyond the limits of quantum methods, offering near-quantum accuracy at much lower computational cost. Yet, developing reliable MLIPs remains difficult because it requires generating high-quality datasets, preprocessing atomic structures, and carefully training and validating models. In this work, we introduce an Automated Machine Learning Pipeline (AMLP) that unifies the entire workflow from dataset creation to model validation. AMLP employs large-language-model agents to assist with electronic-structure code selection, input preparation, and output conversion, while its analysis suite (AMLP-Analysis), based on ASE, supports a range of molecular simulations. The pipeline is built on the MACE architecture and validated on acridine polymorphs, where, with a straightforward fine-tuning of a foundation model, mean absolute errors of ~1.7 meV/atom in energies and ~7.0 meV/Å in forces are achieved. The fitted MLIP reproduces DFT geometries with sub-Å accuracy and demonstrates stability during molecular dynamics simulations in the microcanonical and canonical ensembles.`;

export const metadata: Metadata = {
  title: 'Automated Machine Learning Pipeline (AMLP)',
  description:
    'Journal of Chemical Theory and Computation 2025, 22 (1), 305–317. An LLM-assisted pipeline that automates data set generation, training and validation of machine-learned interatomic potentials.',
};

const citation = citationsFor('amlp-2025');
const relatedIds = ['molcryst-2026', 'reaxff-sam-2024'];
const related = PUBLICATIONS.filter((p) => relatedIds.includes(p.id));

function PublicationAMLPPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: TITLE,
    author: [
      { '@type': 'Person', name: 'Adam Lahouari', identifier: LINKS.orcid },
      { '@type': 'Person', name: 'Jutta Rogal' },
      { '@type': 'Person', name: 'Mark E. Tuckerman' },
    ],
    datePublished: '2025-12-26',
    isPartOf: {
      '@type': 'Periodical',
      name: 'Journal of Chemical Theory and Computation',
      issn: '1549-9618',
    },
    identifier: 'https://doi.org/10.1021/acs.jctc.5c01610',
    abstract: ABSTRACT,
  };

  return (
    <PublicationLayout
      slug="lahouari-amlp-2025"
      title={TITLE}
      authors={[
        { name: 'Lahouari, A.', isMainAuthor: true, orcid: LINKS.orcid },
        { name: 'Rogal, J.' },
        { name: 'Tuckerman, M. E.' },
      ]}
      meta={{
        venue: 'Journal of Chemical Theory and Computation',
        venueShort: 'JCTC',
        venueColor: 'accent',
        year: 2025,
        volume: '22',
        issue: '1',
        pages: '305–317',
        publishedDate: 'December 26, 2025',
        status: 'published',
        doi: 'https://doi.org/10.1021/acs.jctc.5c01610',
        pdfUrl: 'https://arxiv.org/pdf/2509.21647',
        arxivUrl: 'https://arxiv.org/abs/2509.21647',
      }}
      jsonLd={jsonLd}
    >
      <AbstractBlock abstract={ABSTRACT} collapsible />

      {/* Citation */}
      <div className="mt-16">
        <SectionHeading title="Cite this paper" className="mb-8" />
        <CitationCard
          acs={citation.acs}
          apa={citation.apa}
          chicago={citation.chicago}
          bibtex={citation.bibtex}
          ris={citation.ris}
        />
      </div>

      {/* Linked Project */}
      <div className="mt-16">
        <SectionHeading title="Project" className="mb-8" />
        <ProjectCard
          size="large"
          title="AMLP — Automated Machine Learning Pipeline"
          description="LLM-assisted pipeline covering data set generation, structure preprocessing, MACE training and validation, plus the ASE-based AMLP-Analysis suite."
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
      </div>

      {/* Related Publications */}
      <div className="mt-16 mb-16">
        <SectionHeading title="Related" className="mb-8" />
        <div className="space-y-4">
          {related.map((pub) => (
            <PublicationCard key={pub.id} publication={pub} />
          ))}
        </div>
      </div>
    </PublicationLayout>
  );
}

export default PublicationAMLPPage;
