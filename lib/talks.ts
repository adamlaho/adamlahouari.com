/**
 * Talks and conference presentations, taken from the public Google Scholar
 * profile (which lists conference entries alongside papers).
 */

export type TalkType = 'Invited' | 'Contributed' | 'Poster' | 'Seminar';

export interface TalkRecord {
  id: string;
  /**
   * Partial ISO date — "2026", "2024-03" or "2023-06-06". Only the precision
   * that is actually documented is stored, and the card renders accordingly,
   * so a year-only entry never invents a day.
   */
  date: string;
  year: number;
  type: TalkType;
  event: string;
  venue: string;
  location: string;
  title: string;
  paperUrl?: string;
  doiUrl?: string;
}

export const TALKS: TalkRecord[] = [
  {
    id: 'chemai-nyc-2026',
    date: '2026',
    year: 2026,
    type: 'Invited',
    event: 'ChemAI NYC',
    venue: 'ChemAI NYC',
    location: 'New York, NY, USA',
    title:
      'From Foundation Models to Free Energies: An Automated Pipeline for Machine Learning Interatomic Potentials',
    paperUrl: '/publications/lahouari-amlp-2025',
  },
  {
    id: 'tinker-2026',
    date: '2026',
    year: 2026,
    type: 'Invited',
    event: 'Tinker User Meeting',
    venue: 'Tinker User Meeting',
    location: 'France',
    title:
      'AMLP: A Large Language Model-Based Pipeline for Machine Learning Potential Development',
    paperUrl: '/publications/lahouari-amlp-2025',
  },
  {
    id: 'qscp-acridine-2025',
    date: '2025',
    year: 2025,
    type: 'Contributed',
    event: 'QSCP-XXVII',
    venue: 'Quantum Systems in Chemistry, Physics and Biology',
    location: 'Europe',
    title:
      'Automated Machine Learning Potential Generation Using Language Models: A Case Study on Acridine Polymorphs',
    paperUrl: '/publications/lahouari-amlp-2025',
  },
  {
    id: 'qscp-reaxff-2025',
    date: '2025',
    year: 2025,
    type: 'Contributed',
    event: 'QSCP-XXVII',
    venue: 'Quantum Systems in Chemistry, Physics and Biology',
    location: 'Europe',
    title: 'Reactive Force Fields for Nanoparticle Simulations',
  },
  {
    id: 'cecam-2025',
    date: '2025',
    year: 2025,
    type: 'Contributed',
    event: 'CECAM Workshop',
    venue: 'Advanced force fields in multiscale approaches to computational chemistry',
    location: 'Europe',
    title:
      'Reactive Force Fields for Nanoparticle Simulations and Use of Machine Learning Potential',
  },
  {
    id: 'themosia-rctf-2024',
    date: '2024',
    year: 2024,
    type: 'Contributed',
    event: 'TheMoSiA–RCTF 2024',
    venue: 'Rencontre des Chimistes Théoriciens Francophones',
    location: 'France',
    title:
      'Investigation of Gold and Silver Clusters Using Reactive Force Fields and Machine Learning Potential',
  },
  {
    id: 'acs-spring-2024',
    date: '2024-03',
    year: 2024,
    type: 'Poster',
    event: 'ACS Spring 2024',
    venue: 'Many Flavors of Chemistry',
    location: 'New Orleans, LA, USA',
    title:
      'Investigating Surface Restructuring Phenomena in Gold and Silver Nanoparticles Capped with Alkylthiolates: A Theoretical Study',
    doiUrl: 'https://doi.org/10.1021/scimeetings.4c10535',
  },
  {
    id: 'themosia-2023',
    date: '2023-06-06',
    year: 2023,
    type: 'Contributed',
    event: 'Journées scientifiques ThéMoSiA Nord Île-de-France',
    venue: 'ThéMoSiA',
    location: 'France',
    title:
      'Simulation of Self-Assembled Monolayers on Silver Surfaces and Nanoparticles Using Reactive Force Fields',
  },
  {
    id: 'rctf-2022',
    date: '2022',
    year: 2022,
    type: 'Contributed',
    event: '17ème Rencontre des Chimistes Théoriciens Francophones',
    venue: 'RCTF',
    location: 'France',
    title:
      'Simulations des monocouches auto-assemblées sur l’argent utilisant des champs de forces réactifs',
  },
  {
    id: 'gdr-nanostructures-2022',
    date: '2022',
    year: 2022,
    type: 'Contributed',
    event: 'GDR « Nanostructures inorganiques par chimie en solution »',
    venue: 'Réunion de lancement',
    location: 'France',
    title:
      'Simulations des monocouches auto-assemblées sur l’argent utilisant des champs de forces réactifs',
  },
];

/** Newest first; year-only entries sort after dated ones in the same year. */
export const TALKS_BY_DATE = [...TALKS].sort((a, b) =>
  b.date.padEnd(10, '0').localeCompare(a.date.padEnd(10, '0')),
);
