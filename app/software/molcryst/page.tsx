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
  title: 'MolCryst',
  description:
    'MolCryst-MLIPs — an open database of MACE interatomic potentials fine-tuned for nine polymorphic molecular crystal systems, with DFT-validated benchmarks.',
  openGraph: {
    title: 'MolCryst — Adam Lahouari',
    description:
      'An open database of MACE interatomic potentials fine-tuned for nine polymorphic molecular crystal systems.',
  },
};

export const revalidate = 21600;

const citation = citationsFor('molcryst-2026');

/** Per-system accuracy, from the MolCryst-MLIPs model table. */
const MODELS = [
  { compound: 'Resorcinol', csd: 'RESORA', energyMae: 1.568, forceMae: 3.903 },
  { compound: 'Durene', csd: 'DURENE', energyMae: 1.647, forceMae: 5.193 },
  { compound: 'Coumarin', csd: 'COUMAR', energyMae: 1.670, forceMae: 4.296 },
  { compound: 'Benzamide', csd: 'BZAMID', energyMae: 0.713, forceMae: 8.786 },
  { compound: 'Niacinamide', csd: 'NICOAM', energyMae: 1.513, forceMae: 7.207 },
  { compound: 'Nicotinamide', csd: 'NICOAC', energyMae: 1.201, forceMae: 5.824 },
  { compound: 'Isonicotinamide', csd: 'EHOWIH', energyMae: 1.912, forceMae: 10.809 },
  { compound: 'Pyrazinamide', csd: 'PYRIZIN', energyMae: 1.634, forceMae: 6.732 },
  { compound: 'Benzoic acid', csd: 'BENZAC', energyMae: 1.329, forceMae: 7.897 },
  { compound: 'Acridine', csd: 'ACRDIN', energyMae: 3.700, forceMae: 8.300 },
];

export default async function SoftwareMolCrystPage() {
  return (
    <main id="main-content" className="flex-1 pt-16">
      <Container className="pt-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Software', href: '/software' },
            { label: 'MolCryst' },
          ]}
        />
      </Container>

      {/* Header Block */}
      <section className="py-12 border-b border-border">
        <Container size="prose">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold font-mono">
              MolCryst
            </h1>
            <p className="text-xl text-fg-muted">
              An open database of MACE potentials fine-tuned for polymorphic molecular
              crystals, built with the AMLP framework.
            </p>

            {/* Badges — stars and last commit come live from GitHub */}
            <RepoBadges repo="adamlaho/MolCryst" language="Python" license="MIT" />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://github.com/adamlaho/MolCryst"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-[var(--radius-md)] hover:bg-[#2550E6] transition-colors text-sm font-medium"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
              <a
                href="https://huggingface.co/adamlaho/MolCryst"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-bg-elev border border-border rounded-[var(--radius-md)] hover:bg-border/30 transition-colors text-sm font-medium"
              >
                <Database className="w-4 h-4" />
                Browse the models
              </a>
              <a
                href="https://arxiv.org/abs/2604.13897"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-bg-elev border border-border rounded-[var(--radius-md)] hover:bg-border/30 transition-colors text-sm font-medium"
              >
                <FileText className="w-4 h-4" />
                Read the preprint
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
                  'git clone https://github.com/adamlaho/MolCryst.git\n' +
                  'cd MolCryst',
              },
              {
                label: 'Hugging Face',
                code:
                  'from huggingface_hub import snapshot_download\n\n' +
                  'snapshot_download(repo_id="adamlaho/MolCryst")',
              },
              {
                label: 'single model',
                code:
                  'from huggingface_hub import hf_hub_download\n\n' +
                  'path = hf_hub_download(\n' +
                  '    repo_id="adamlaho/MolCryst",\n' +
                  '    filename="models/acridine.model",\n' +
                  ')',
              },
            ]}
          />
        </Container>
      </section>

      {/* What it does */}
      <section className="py-16 bg-bg-elev">
        <Container size="prose">
          <SectionHeading title="What it is" className="mb-8" />
          <div className="space-y-6 font-serif-display">
            <p className="text-lg leading-relaxed">
              MolCryst-MLIPs is an open database of machine-learned interatomic potentials
              for molecular crystals. The first release covers nine systems — benzamide,
              benzoic acid, coumarin, durene, isonicotinamide, nicotinamide, niacinamide,
              pyrazinamide and resorcinol — plus acridine, each fine-tuned from the
              MACE-MH-1 foundation model (omol head) using the{' '}
              <a href="/research/amlp" className="text-accent hover:text-[#2550E6]">
                AMLP pipeline
              </a>
              .
            </p>
            <p className="text-lg leading-relaxed">
              Across all systems the models reach a mean energy MAE of 1.689 meV/atom and
              a mean force MAE of 6.895 meV/Å. Benchmarked against three state-of-the-art
              foundation models on the DFT-labelled polymorph set, only the fine-tuned
              models resolve the polymorphic energy landscape — which is the property that
              actually matters for polymorph screening.
            </p>
            <p className="text-lg leading-relaxed">
              Every model is validated for dynamical stability and structural integrity
              through molecular dynamics: NVE energy drift below 10⁻⁵ over 25 ps, with
              radial distribution functions and P₂ orientational order parameters
              preserved. The released models and data sets are ready for production MD of
              molecular crystal polymorphism under varying thermodynamic conditions.
            </p>
          </div>

          {/* Model table */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-4">
              Released models
            </h3>
            <div className="overflow-x-auto border border-border rounded-[var(--radius-lg)]">
              <table className="w-full text-sm">
                <caption className="sr-only">
                  Energy and force mean absolute errors for each released MolCryst model
                </caption>
                <thead className="bg-bg border-b border-border">
                  <tr>
                    <th scope="col" className="text-left font-semibold px-4 py-3">
                      Compound
                    </th>
                    <th scope="col" className="text-left font-semibold px-4 py-3">
                      CSD code
                    </th>
                    <th scope="col" className="text-right font-semibold px-4 py-3">
                      Energy MAE (meV/atom)
                    </th>
                    <th scope="col" className="text-right font-semibold px-4 py-3">
                      Force MAE (meV/Å)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {MODELS.map((model) => (
                    <tr key={model.csd} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5">{model.compound}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-fg-muted">
                        {model.csd}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums">
                        {model.energyMae.toFixed(3)}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums">
                        {model.forceMae.toFixed(3)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-bg font-semibold">
                    <td className="px-4 py-2.5">Mean</td>
                    <td className="px-4 py-2.5" />
                    <td className="px-4 py-2.5 text-right tabular-nums">1.689</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">6.895</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-fg-muted">
              Reference data: DFT (PBE-D4) optimisations and AIMD trajectories at
              25–500 K, computed in VASP with a 650 eV cutoff and EDIFF = 10⁻⁷ eV.
              Two-stage training with SWA from epoch 200, early stopping at patience 75,
              all models in float64.
            </p>
          </div>
        </Container>
      </section>

      {/* Quick Example */}
      <section className="py-16">
        <Container size="prose">
          <SectionHeading title="Quick example" className="mb-8" />
          <CodeBlock
            language="python"
            filename="single_point.py"
            code={`from ase.io import read
from huggingface_hub import hf_hub_download
from mace.calculators import MACECalculator

model_path = hf_hub_download(
    repo_id="adamlaho/MolCryst",
    filename="models/acridine.model",
)

calc = MACECalculator(model_paths=model_path, device="cuda")

atoms = read("acridine_form_I.cif")
atoms.calc = calc

energy = atoms.get_potential_energy()
forces = atoms.get_forces()`}
          />
          <p className="mt-6 mb-4 text-sm text-fg-muted">
            For full simulations the recommended entry point is the AMLP-Analysis module:
          </p>
          <CodeBlock
            language="bash"
            filename="run_md.sh"
            code={`python3 amlpa.py structure.xyz config.yaml

# config.yaml
#   model_paths:
#     - 'path/to/acridine.model'
#   device: 'gpu'
#   gpus: ['cuda:0']`}
          />
        </Container>
      </section>

      {/* Resources */}
      <section className="py-16 bg-bg-elev">
        <Container size="prose">
          <SectionHeading title="Resources" className="mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://github.com/adamlaho/MolCryst#readme"
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
                  Model table, training protocol and usage in the README
                </p>
              </div>
            </a>

            <a
              href="https://github.com/adamlaho/MolCryst"
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
              href="https://huggingface.co/adamlaho/MolCryst"
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
                  Browse and download the fine-tuned models and data sets
                </p>
              </div>
            </a>

            <a
              href="https://arxiv.org/abs/2604.13897"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 bg-bg border border-border rounded-[var(--radius-lg)] hover:border-accent/50 transition-colors group"
            >
              <FileText className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">
                  Preprint
                </h3>
                <p className="text-sm text-fg-muted">arXiv:2604.13897 (2026)</p>
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
