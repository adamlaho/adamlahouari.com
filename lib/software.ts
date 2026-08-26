import type { SoftwareProject } from '@/components/software-card';
import { getRepoStats } from './github';

/** Static description of each project; stars/last-commit are fetched live. */
export const SOFTWARE_PROJECTS: SoftwareProject[] = [
  {
    id: 'amlp',
    slug: 'amlp',
    name: 'AMLP',
    tagline:
      'LLM-assisted pipeline for generating and analysing training data for machine-learned interatomic potentials.',
    language: 'Python',
    license: 'MIT',
    repo: 'adamlaho/AMLP',
    installCommand: 'git clone https://github.com/adamlaho/AMLP.git',
    githubUrl: 'https://github.com/adamlaho/AMLP',
  },
  {
    id: 'molcryst',
    slug: 'molcryst',
    name: 'MolCryst',
    tagline:
      'Molecular-crystal database and fine-tuned foundation models for machine-learned interatomic potentials.',
    language: 'Python',
    repo: 'adamlaho/MolCryst',
    installCommand: 'git clone https://github.com/adamlaho/MolCryst.git',
    githubUrl: 'https://github.com/adamlaho/MolCryst',
    huggingFaceUrl: 'https://huggingface.co/adamlaho/MolCryst',
  },
];

/** Merge in live GitHub numbers; missing stats simply stay undefined. */
export async function getSoftwareProjects(): Promise<SoftwareProject[]> {
  return Promise.all(
    SOFTWARE_PROJECTS.map(async (project) => {
      if (!project.repo) return project;
      const stats = await getRepoStats(project.repo);
      if (!stats) return project;
      return {
        ...project,
        stars: stats.stars,
        lastCommit: stats.lastCommit,
        license: project.license ?? stats.license ?? undefined,
      };
    }),
  );
}

export async function getSoftwareProject(slug: string) {
  return (await getSoftwareProjects()).find((p) => p.slug === slug);
}
