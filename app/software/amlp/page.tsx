import type { Metadata } from 'next';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/breadcrumb';
import { SectionHeading } from '@/components/section-heading';
import { TabbedCodeBlock } from '@/components/tabbed-code-block';
import { CodeBlock } from '@/components/code-block';
import { CitationCard } from '@/components/citation-card';
import { RepoBadges } from '@/components/repo-badges';
import { citationsFor } from '@/lib/citations';
import { Github, FileText, Database } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AMLP',
  description:
    'AMLP — an automated pipeline for machine-learned interatomic potentials, with LLM agents for electronic-structure code selection, input generation and output conversion.',
};

export const revalidate = 21600;

const citation = citationsFor('amlp-2025');

async function SoftwareAMLPPage() {
  return (
    <main id="main-content" className="flex-1 pt-16">
      <Container className="pt-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Software', href: '/software' },
            { label: 'AMLP' },
          ]}
        />
      </Container>

      {/* Header Block */}
      <section className="py-12 border-b border-border">
        <Container size="prose">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold font-mono">
              AMLP
            </h1>
            <p className="text-xl text-fg-muted">
              An automated pipeline for machine-learned interatomic potentials, with LLM
              agents assisting electronic-structure code selection, input preparation and
              output conversion.
            </p>

            {/* Badges — stars and last commit come live from GitHub */}
            <RepoBadges repo="adamlaho/AMLP" language="Python" license="MIT" />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://github.com/adamlaho/AMLP"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-[var(--radius-md)] hover:bg-[#2550E6] transition-colors text-sm font-medium"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
              <a
                href="/publications/lahouari-amlp-2025"
                className="inline-flex items-center gap-2 px-4 py-2 bg-bg-elev border border-border rounded-[var(--radius-md)] hover:bg-border/30 transition-colors text-sm font-medium"
              >
                <FileText className="w-4 h-4" />
                Read the paper
              </a>
              <a
                href="https://github.com/adamlaho/AMLP#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-bg-elev border border-border rounded-[var(--radius-md)] hover:bg-border/30 transition-colors text-sm font-medium"
              >
                <FileText className="w-4 h-4" />
                Documentation
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Install */}
      <section className="py-16">
        <Container size="prose">
          <SectionHeading title="Install" className="mb-8" />
          <TabbedCodeBlock
            tabs={[
              {
                label: 'git',
                code:
                  'git clone https://github.com/adamlaho/AMLP.git\n' +
                  'cd AMLP\n' +
                  'pip install -r requirements.txt',
              },
              {
                label: 'API key',
                code:
                  '# LLM agent features use the OpenAI API\n' +
                  'export OPENAI_API_KEY="your-api-key-here"',
              },
              {
                label: 'run',
                code: 'python3 amlpt.py',
              },
            ]}
          />
        </Container>
      </section>

      {/* What it does */}
      <section className="py-16 bg-bg-elev">
        <Container size="prose">
          <SectionHeading title="What it does" className="mb-8" />
          <div className="space-y-6 font-serif-display">
            <p className="text-lg leading-relaxed">
              AMLP unifies the whole machine-learned interatomic potential workflow —
              data set creation, structure preprocessing, training and validation — into
              one reproducible pipeline, so that building a usable potential no longer
              means stitching together a dozen ad-hoc scripts.
            </p>
            <p className="text-lg leading-relaxed">
              Large-language-model agents assist with the expert-judgement steps:
              selecting an electronic-structure code, preparing its inputs, and converting
              its outputs into MACE-compatible training data. Specialised agents cover
              experimental context, theoretical methodology, and code-specific guidance
              for Gaussian, VASP and CP2K, with supervisor agents integrating their
              reports. Structure files are read as CIF or XYZ, and batch and guided modes
              both generate calculation inputs — including supercell construction and
              AIMD inputs at multiple temperatures.
            </p>
            <p className="text-lg leading-relaxed">
              The analysis module, AMLP-Analysis, is built on ASE and covers single-point
              calculations, geometry and cell optimisation, molecular dynamics across
              ensembles, and structural diagnostics such as radial distribution functions,
              coordination numbers and energy drift.
            </p>
          </div>

          {/* Architecture diagram placeholder */}
          <div className="mt-12">
            <figure className="space-y-4">
              <div className="bg-border/30 rounded-[var(--radius-lg)] overflow-hidden border border-border">
                <div className="aspect-[16/9] bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-yellow-500/20 flex items-center justify-center p-12">
                  <div className="text-center space-y-4">
                    <div className="text-[var(--theme-amlp)] font-mono text-sm">
                      AMLP Architecture: Multi-Agent System
                    </div>
                    <div className="text-xs text-fg-muted max-w-md">
                      Agents → Input generation (CP2K / VASP / Gaussian) → Output processing → MACE HDF5 → AMLP-Analysis
                    </div>
                  </div>
                </div>
              </div>
              <figcaption className="text-sm text-fg-muted text-center">
                High-level architecture: agent layer, DFT input/output handling, data set assembly, and the ASE-based analysis module.
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* Quick Example */}
      <section className="py-16">
        <Container size="prose">
          <SectionHeading title="Quick example" className="mb-8" />
          <CodeBlock
            language="bash"
            filename="session.sh"
            code={`$ python3 amlpt.py

# 1. AI-agent feedback (research summaries & reports)
# 2. Input generation (CP2K/VASP/Gaussian)
# 3. Output processing (extract forces, energies, coordinates)
# 4. ML potential dataset creation (JSON to MACE HDF5)
# 5. AIMD processing (JSON to CP2K AIMD inputs)

Batch-mode: which DFT code? (CP2K/VASP/Gaussian): cp2k
Path to file or directory: ./structures
Output directory: ./cp2k_inputs`}
          />
          <p className="mt-4 text-sm text-fg-muted">
            Outputs are written per code: <code className="font-mono">.inp</code> for
            CP2K; INCAR / POSCAR / KPOINTS / POTCAR for VASP;{' '}
            <code className="font-mono">.com</code> for Gaussian; and{' '}
            <code className="font-mono">.json</code> / <code className="font-mono">.h5</code>{' '}
            for processed training data.
          </p>
        </Container>
      </section>

      {/* Resources */}
      <section className="py-16 bg-bg-elev">
        <Container size="prose">
          <SectionHeading title="Resources" className="mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://github.com/adamlaho/AMLP#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 bg-bg border border-border rounded-[var(--radius-lg)] hover:border-accent/50 transition-colors group"
            >
              <FileText className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">
                  Documentation
                </h3>
                <p className="text-sm text-fg-muted">
                  Installation, configuration and usage guide in the README
                </p>
              </div>
            </a>

            <a
              href="https://github.com/adamlaho/AMLP"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 bg-bg border border-border rounded-[var(--radius-lg)] hover:border-accent/50 transition-colors group"
            >
              <Github className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">
                  GitHub Repository
                </h3>
                <p className="text-sm text-fg-muted">
                  Source code, issues, and contributions
                </p>
              </div>
            </a>

            <a
              href="https://huggingface.co/adamlaho"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 bg-bg border border-border rounded-[var(--radius-lg)] hover:border-accent/50 transition-colors group"
            >
              <Database className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">
                  Hugging Face
                </h3>
                <p className="text-sm text-fg-muted">
                  Pre-trained models and datasets
                </p>
              </div>
            </a>

            <a
              href="/publications/lahouari-amlp-2025"
              className="flex items-start gap-4 p-4 bg-bg border border-border rounded-[var(--radius-lg)] hover:border-accent/50 transition-colors group"
            >
              <FileText className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">
                  Published Paper
                </h3>
                <p className="text-sm text-fg-muted">
                  J. Chem. Theory Comput. 2025
                </p>
              </div>
            </a>
          </div>
        </Container>
      </section>

      {/* Citation */}
      <section className="py-16 mb-16">
        <Container size="prose">
          <SectionHeading title="How to cite" className="mb-8" />
          <CitationCard
            acs={citation.acs}
            apa={citation.apa}
            chicago={citation.chicago}
            bibtex={citation.bibtex}
            ris={citation.ris}
          />
        </Container>
      </section>
    </main>
  );
}

export default SoftwareAMLPPage;
