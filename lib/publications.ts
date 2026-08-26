/**
 * Real publication record, verified against Google Scholar, Crossref and arXiv.
 * Live citation counts come from lib/scholar.ts and are matched to these
 * entries by `scholarTitle` (see matchScholarCitations below).
 */

export type PublicationType = 'journal' | 'preprint' | 'thesis' | 'in-prep';

export interface PublicationRecord {
  id: string;
  /** Set when a dedicated detail page exists at /publications/<slug>. */
  slug?: string;
  title: string;
  /** Display form, e.g. "Lahouari, A." */
  authors: string[];
  /** Full citation line. */
  venue: string;
  /** Badge label. */
  venueShort: string;
  year: number;
  /** ISO date used for sorting. */
  date: string;
  venueColor: 'accent' | 'muted';
  type: PublicationType;
  tags: string[];
  doiUrl?: string;
  arxivUrl?: string;
  pdfUrl?: string;
  /** Title as it appears on Google Scholar, for citation-count matching. */
  scholarTitle?: string;
  bibtex: string;
}

export const PUBLICATIONS: PublicationRecord[] = [
  {
    id: 'molcryst-2026',
    title:
      'MolCryst-MLIPs: A Machine-Learned Interatomic Potentials Database for Molecular Crystals',
    authors: [
      'Lahouari, A.',
      'Ai, S.',
      'Han, J.',
      'Hoffstadt, J.',
      'Hoellmer, P.',
      'Infante, C.',
      'Jain, P.',
      'Kadam, S.',
      'Martirossyan, M. M.',
      'McCune, A.',
      'Newton, H.',
      'Paul, S. J.',
      'Pena, W.',
      'Raghoonanan, J.',
      'Sahu, S.',
      'Tan, O.',
      'Vergara, A.',
      'Rogal, J.',
      'Tuckerman, M. E.',
    ],
    venue: 'arXiv:2604.13897, 2026.',
    venueShort: 'arXiv',
    year: 2026,
    date: '2026-04-15',
    venueColor: 'muted',
    type: 'preprint',
    tags: ['MLIP', 'MACE', 'Molecular crystals', 'Dataset'],
    arxivUrl: 'https://arxiv.org/abs/2604.13897',
    doiUrl: 'https://doi.org/10.48550/arXiv.2604.13897',
    pdfUrl: 'https://arxiv.org/pdf/2604.13897',
    scholarTitle:
      'MolCryst-MLIPs: A Machine-Learned Interatomic Potentials Database for Molecular Crystals',
    bibtex: `@misc{lahouari2026molcryst,
  title        = {MolCryst-MLIPs: A Machine-Learned Interatomic Potentials Database for Molecular Crystals},
  author       = {Lahouari, Adam and Ai, Shen and Han, Jihye and Hoffstadt, Jillian and Hoellmer, Philipp and Infante, Charlotte and Jain, Pulkita and Kadam, Sangram and Martirossyan, Maya M. and McCune, Amara and Newton, Hypatia and Paul, Shlok J. and Pena, Willmor and Raghoonanan, Jonathan and Sahu, Sumon and Tan, Oliver and Vergara, Andrea and Rogal, Jutta and Tuckerman, Mark E.},
  year         = {2026},
  eprint       = {2604.13897},
  archivePrefix= {arXiv},
  primaryClass = {cond-mat.mtrl-sci},
  doi          = {10.48550/arXiv.2604.13897}
}`,
  },
  {
    id: 'amlp-2025',
    slug: 'lahouari-amlp-2025',
    title:
      'Automated Machine Learning Pipeline: Large Language Models-Assisted Automated Data Set Generation for Training Machine-Learned Interatomic Potentials',
    authors: ['Lahouari, A.', 'Rogal, J.', 'Tuckerman, M. E.'],
    venue: 'Journal of Chemical Theory and Computation 2025, 22 (1), 305–317.',
    venueShort: 'JCTC',
    // Published online 26 Dec 2025; the print issue (vol 22, iss 1) is dated
    // 13 Jan 2026. Crossref's canonical `issued` date is the 2025 one.
    year: 2025,
    date: '2025-12-26',
    venueColor: 'accent',
    type: 'journal',
    tags: ['Automation', 'LLM', 'MACE', 'DFT', 'MLIP'],
    doiUrl: 'https://doi.org/10.1021/acs.jctc.5c01610',
    arxivUrl: 'https://arxiv.org/abs/2509.21647',
    pdfUrl: 'https://arxiv.org/pdf/2509.21647',
    scholarTitle:
      'Automated machine learning pipeline: Large language models-assisted automated data set generation for training machine-learned interatomic potentials',
    bibtex: `@article{lahouari2025amlp,
  title   = {Automated Machine Learning Pipeline: Large Language Models-Assisted Automated Data Set Generation for Training Machine-Learned Interatomic Potentials},
  author  = {Lahouari, Adam and Rogal, Jutta and Tuckerman, Mark E.},
  journal = {Journal of Chemical Theory and Computation},
  volume  = {22},
  number  = {1},
  pages   = {305--317},
  year    = {2025},
  publisher = {American Chemical Society},
  doi     = {10.1021/acs.jctc.5c01610}
}`,
  },
  {
    id: 'reaxff-sam-2024',
    title:
      'ReaxFF Simulations of Self-Assembled Monolayers on Silver Surfaces and Nanocrystals',
    authors: ['Lahouari, A.', 'Piquemal, J.-P.', 'Richardi, J.'],
    venue: 'The Journal of Physical Chemistry C 2024, 128 (3), 1193–1201.',
    venueShort: 'JPC C',
    year: 2024,
    date: '2024-01-10',
    venueColor: 'accent',
    type: 'journal',
    tags: ['ReaxFF', 'Nanoparticles', 'Self-assembled monolayers', 'MD'],
    doiUrl: 'https://doi.org/10.1021/acs.jpcc.3c07098',
    arxivUrl: 'https://arxiv.org/abs/2307.10858',
    pdfUrl: 'https://arxiv.org/pdf/2307.10858',
    scholarTitle:
      'ReaxFF Simulations of Self-Assembled Monolayers On Silver Surfaces and Nanocrystals',
    bibtex: `@article{lahouari2024reaxff,
  title   = {ReaxFF Simulations of Self-Assembled Monolayers on Silver Surfaces and Nanocrystals},
  author  = {Lahouari, A. and Piquemal, J.-P. and Richardi, J.},
  journal = {The Journal of Physical Chemistry C},
  volume  = {128},
  number  = {3},
  pages   = {1193--1201},
  year    = {2024},
  publisher = {American Chemical Society},
  doi     = {10.1021/acs.jpcc.3c07098}
}`,
  },
  {
    id: 'thesis-2024',
    title: 'Use of Reactive Force Fields for the Simulation of Metallic Nanoparticles',
    authors: ['Lahouari, A.'],
    venue: 'Ph.D. thesis, Sorbonne Université, Paris, 2024.',
    venueShort: 'Thesis',
    year: 2024,
    date: '2024-09-27',
    venueColor: 'muted',
    type: 'thesis',
    tags: ['ReaxFF', 'Nanoparticles', 'MD'],
    doiUrl: 'https://theses.fr/2024SORUS223',
    scholarTitle: 'Use of reactive force fields for the simulation of metallic nanoparticles',
    bibtex: `@phdthesis{lahouari2024thesis,
  title  = {Use of Reactive Force Fields for the Simulation of Metallic Nanoparticles},
  author = {Lahouari, Adam},
  school = {Sorbonne Universit\\'e},
  year   = {2024}
}`,
  },
];

/** Newest first. */
export const PUBLICATIONS_BY_DATE = [...PUBLICATIONS].sort((a, b) =>
  b.date.localeCompare(a.date),
);

/** Everything except the thesis — what "publications" normally means on a CV. */
export const PAPERS = PUBLICATIONS_BY_DATE.filter((p) => p.type !== 'thesis');

export const PEER_REVIEWED = PAPERS.filter((p) => p.type === 'journal');

/** "Lahouari, A.; Rogal, J.; Tuckerman, M. E." with et-al truncation. */
export function formatAuthors(authors: string[], max = 8): string {
  if (authors.length <= max) return authors.join('; ');
  return `${authors.slice(0, max).join('; ')}; et al.`;
}

/** "doi.org/10.1021/…" — a URL short enough to print inside a CV entry. */
export function shortLink(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

export function allBibtex(): string {
  return PUBLICATIONS_BY_DATE.map((p) => p.bibtex).join('\n\n');
}
