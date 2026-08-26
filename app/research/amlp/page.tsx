import type { Metadata } from 'next';
import { ProjectLayout } from '@/components/project-layout';
import { SectionHeading } from '@/components/section-heading';
import { Figure } from '@/components/figure';
import { Equation } from '@/components/equation';
import { CodeBlock } from '@/components/code-block';
import { CitationCard } from '@/components/citation-card';
import { PublicationCard } from '@/components/publication-card';
import { PUBLICATIONS } from '@/lib/publications';
import { citationsFor } from '@/lib/citations';

export const metadata: Metadata = {
  title: 'AMLP — Automated Machine Learning Pipeline',
  description:
    'AMLP unifies data set creation, training and validation for machine-learned interatomic potentials, using LLM agents for electronic-structure code selection and input preparation.',
};

const citation = citationsFor('amlp-2025');
const related = PUBLICATIONS.filter((p) => p.id === 'amlp-2025' || p.id === 'molcryst-2026');

function ResearchAMLPPage() {
  return (
    <ProjectLayout
      slug="amlp"
      themeColor="--theme-amlp"
      eyebrow="Automation Framework"
      title="AMLP — Automated Machine Learning Pipeline"
      description="An automated pipeline for machine-learned interatomic potentials, using LLM agents to assist with electronic-structure code selection, input preparation and output conversion. Supports Gaussian, VASP and CP2K."
      status="Active"
      tags={['Automation', 'LLM', 'MACE', 'DFT']}
      paperUrl="https://doi.org/10.1021/acs.jctc.5c01610"
      githubUrl="https://github.com/adamlaho/AMLP"
      meta={{
        status: 'Active',
        started: '2024',
        pi: 'Mark E. Tuckerman',
        license: 'MIT',
        language: 'Python',
      }}
    >
      {/* Overview */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Overview</h2>
        <div
          className="prose space-y-6 font-serif-display"
        >
          <p className="text-lg leading-relaxed">
            Machine-learned interatomic potentials (MLIPs) extend molecular simulation
            well beyond the reach of quantum methods, offering near-quantum accuracy at a
            fraction of the cost. Building a reliable one is still awkward in practice:
            it means generating a high-quality reference data set, preprocessing atomic
            structures, and then training and validating a model carefully enough to
            trust the result. AMLP unifies that whole workflow, from data set creation
            through to model validation, in a single reproducible pipeline.
          </p>
          <p className="text-lg leading-relaxed">
            Large-language-model agents handle the parts of the process that normally
            demand expert judgement and a lot of clicking: choosing an appropriate
            electronic-structure code, preparing its input files, and converting its
            output into a MACE-compatible training set. Specialised agents cover
            experimental context, theoretical methodology, and code-specific advice for
            Gaussian, VASP and CP2K, with supervisor agents integrating their reports.
          </p>
          <p className="text-lg leading-relaxed">
            The analysis side, AMLP-Analysis, is built on ASE and covers single-point
            calculations, geometry and cell optimisation, molecular dynamics in several
            ensembles, and structural diagnostics — radial distribution functions,
            coordination numbers, and energy drift — so a fitted potential can be
            evaluated systematically rather than anecdotally.
          </p>
          <p className="text-lg leading-relaxed">
            The pipeline is built on the MACE architecture and was validated on acridine
            polymorphs. A straightforward fine-tuning of a foundation model reached mean
            absolute errors of about 1.7 meV/atom in energies and 7.0 meV/Å in forces;
            the fitted MLIP reproduces DFT geometries to sub-Å accuracy and stays stable
            through molecular dynamics in both the microcanonical and canonical
            ensembles.
          </p>
        </div>
      </section>

      {/* Method Figure */}
      <Figure
        number="Figure 1"
        caption="AMLP workflow: LLM agents assist with code selection and input generation; DFT outputs are converted to MACE-compatible data sets; AMLP-Analysis validates the fitted potential."
      >
        <div className="aspect-[16/9] bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-yellow-500/20 flex items-center justify-center p-12">
          <div className="text-center space-y-4">
            <div className="text-[var(--theme-amlp)] font-mono text-sm">
              Pipeline Architecture Diagram
            </div>
            <div className="text-xs text-fg-muted max-w-md">
              Agent layer (research, theory, DFT experts, supervisor) → input generation
              (CP2K / VASP / Gaussian) → output processing → MACE training → AMLP-Analysis
            </div>
          </div>
        </div>
      </Figure>

      {/* Selected Results */}
      <section className="mt-16">
        <SectionHeading title="Selected results" className="mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Figure
            number="Figure 2"
            caption="Accuracy on acridine polymorphs after fine-tuning a MACE foundation model: ~1.7 meV/atom for energies and ~7.0 meV/Å for forces."
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center p-8">
              <div className="text-center text-xs text-fg-muted">
                Energy and force MAE
              </div>
            </div>
          </Figure>

          <Figure
            number="Figure 3"
            caption="Molecular dynamics stability in the microcanonical and canonical ensembles, assessed through energy conservation and structural integrity."
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center p-8">
              <div className="text-center text-xs text-fg-muted">
                Energy drift over MD trajectory
              </div>
            </div>
          </Figure>
        </div>
      </section>

      {/* Equations */}
      <section className="mt-16">
        <SectionHeading title="Key formulae" className="mb-8" />
        <Equation
          latex="\mathcal{L} = \frac{1}{N} \sum_{i=1}^{N} \left[ \lambda_E (E_i^{\text{DFT}} - E_i^{\text{MLIP}})^2 + \lambda_F \|\mathbf{F}_i^{\text{DFT}} - \mathbf{F}_i^{\text{MLIP}}\|^2 \right]"
          caption="Training loss balancing energy and force errors, weighted by λ_E and λ_F"
        />
        <Equation
          latex="\text{MAE}_E = \frac{1}{N} \sum_{i=1}^{N} \left| E_i^{\text{DFT}} - E_i^{\text{MLIP}} \right| \Big/ N_{\text{atoms}}"
          caption="Per-atom energy mean absolute error, the primary accuracy metric reported for the fitted potentials"
        />
      </section>

      {/* Code Snippet */}
      <section className="mt-16">
        <SectionHeading title="Usage" className="mb-8" />
        <CodeBlock
          language="bash"
          filename="quickstart.sh"
          code={`git clone https://github.com/adamlaho/AMLP.git
cd AMLP
pip install -r requirements.txt

# LLM agent features need an OpenAI key
export OPENAI_API_KEY="your-api-key-here"

# Launch the interactive pipeline
python3 amlpt.py`}
        />
        <p className="mt-4 text-sm text-fg-muted">
          The interactive menu covers AI-agent research summaries, input generation for
          CP2K / VASP / Gaussian, DFT output processing, MACE HDF5 data set creation, and
          AIMD input generation.
        </p>
      </section>

      {/* Related Publications */}
      <section className="mt-16">
        <SectionHeading title="Related work" className="mb-8" />
        <div className="space-y-4">
          {related.map((pub) => (
            <PublicationCard key={pub.id} publication={pub} />
          ))}
        </div>
      </section>

      {/* Citation */}
      <section className="mt-16 mb-16">
        <SectionHeading title="Cite" className="mb-8" />
        <CitationCard
          acs={citation.acs}
          apa={citation.apa}
          chicago={citation.chicago}
          bibtex={citation.bibtex}
          ris={citation.ris}
        />
      </section>
    </ProjectLayout>
  );
}

export default ResearchAMLPPage;
