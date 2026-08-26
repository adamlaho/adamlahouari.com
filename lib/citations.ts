import { PUBLICATIONS } from './publications';

export interface CitationFormats {
  acs: string;
  apa: string;
  chicago: string;
  bibtex: string;
  ris: string;
}

/**
 * Pre-formatted citation strings, keyed by publication id. Kept next to the
 * publication data so every page that offers "cite this" shows the same text.
 */
const FORMATS: Record<string, Omit<CitationFormats, 'bibtex'>> = {
  'amlp-2025': {
    acs: 'Lahouari, A.; Rogal, J.; Tuckerman, M. E. Automated Machine Learning Pipeline: Large Language Models-Assisted Automated Data Set Generation for Training Machine-Learned Interatomic Potentials. J. Chem. Theory Comput. 2025, 22 (1), 305–317. DOI: 10.1021/acs.jctc.5c01610',
    apa: 'Lahouari, A., Rogal, J., & Tuckerman, M. E. (2025). Automated machine learning pipeline: Large language models-assisted automated data set generation for training machine-learned interatomic potentials. Journal of Chemical Theory and Computation, 22(1), 305–317. https://doi.org/10.1021/acs.jctc.5c01610',
    chicago:
      'Lahouari, Adam, Jutta Rogal, and Mark E. Tuckerman. 2025. “Automated Machine Learning Pipeline: Large Language Models-Assisted Automated Data Set Generation for Training Machine-Learned Interatomic Potentials.” Journal of Chemical Theory and Computation 22 (1): 305–17. https://doi.org/10.1021/acs.jctc.5c01610.',
    ris: `TY  - JOUR
TI  - Automated Machine Learning Pipeline: Large Language Models-Assisted Automated Data Set Generation for Training Machine-Learned Interatomic Potentials
AU  - Lahouari, Adam
AU  - Rogal, Jutta
AU  - Tuckerman, Mark E.
T2  - Journal of Chemical Theory and Computation
DA  - 2025/12/26
PY  - 2025
VL  - 22
IS  - 1
SP  - 305
EP  - 317
PB  - American Chemical Society
DO  - 10.1021/acs.jctc.5c01610
ER  -`,
  },
  'molcryst-2026': {
    acs: 'Lahouari, A.; Ai, S.; Han, J.; Hoffstadt, J.; Hoellmer, P.; Infante, C.; et al. MolCryst-MLIPs: A Machine-Learned Interatomic Potentials Database for Molecular Crystals. arXiv 2026, arXiv:2604.13897. DOI: 10.48550/arXiv.2604.13897',
    apa: 'Lahouari, A., Ai, S., Han, J., Hoffstadt, J., Hoellmer, P., Infante, C., … Tuckerman, M. E. (2026). MolCryst-MLIPs: A machine-learned interatomic potentials database for molecular crystals. arXiv. https://doi.org/10.48550/arXiv.2604.13897',
    chicago:
      'Lahouari, Adam, Shen Ai, Jihye Han, Jillian Hoffstadt, Philipp Hoellmer, Charlotte Infante, et al. 2026. “MolCryst-MLIPs: A Machine-Learned Interatomic Potentials Database for Molecular Crystals.” arXiv. https://doi.org/10.48550/arXiv.2604.13897.',
    ris: `TY  - PREPRINT
TI  - MolCryst-MLIPs: A Machine-Learned Interatomic Potentials Database for Molecular Crystals
AU  - Lahouari, Adam
AU  - Rogal, Jutta
AU  - Tuckerman, Mark E.
PY  - 2026
PB  - arXiv
DO  - 10.48550/arXiv.2604.13897
ER  -`,
  },
  'reaxff-sam-2024': {
    acs: 'Lahouari, A.; Piquemal, J.-P.; Richardi, J. ReaxFF Simulations of Self-Assembled Monolayers on Silver Surfaces and Nanocrystals. J. Phys. Chem. C 2024, 128 (3), 1193–1201. DOI: 10.1021/acs.jpcc.3c07098',
    apa: 'Lahouari, A., Piquemal, J.-P., & Richardi, J. (2024). ReaxFF simulations of self-assembled monolayers on silver surfaces and nanocrystals. The Journal of Physical Chemistry C, 128(3), 1193–1201. https://doi.org/10.1021/acs.jpcc.3c07098',
    chicago:
      'Lahouari, Adam, Jean-Philip Piquemal, and Johannes Richardi. 2024. “ReaxFF Simulations of Self-Assembled Monolayers on Silver Surfaces and Nanocrystals.” The Journal of Physical Chemistry C 128 (3): 1193–1201. https://doi.org/10.1021/acs.jpcc.3c07098.',
    ris: `TY  - JOUR
TI  - ReaxFF Simulations of Self-Assembled Monolayers on Silver Surfaces and Nanocrystals
AU  - Lahouari, Adam
AU  - Piquemal, Jean-Philip
AU  - Richardi, Johannes
T2  - The Journal of Physical Chemistry C
PY  - 2024
VL  - 128
IS  - 3
SP  - 1193
EP  - 1201
PB  - American Chemical Society
DO  - 10.1021/acs.jpcc.3c07098
ER  -`,
  },
};

export function citationsFor(id: string): CitationFormats {
  const formats = FORMATS[id];
  const pub = PUBLICATIONS.find((p) => p.id === id);
  if (!formats || !pub) {
    throw new Error(`No citation formats registered for publication "${id}"`);
  }
  return { ...formats, bibtex: pub.bibtex };
}
