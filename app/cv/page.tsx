import type { Metadata } from 'next';
import { Container } from '@/components/container';
import { Mail, MapPin } from 'lucide-react';
import { PrintButton } from '@/components/print-button';
import { PUBLICATIONS_BY_DATE, formatAuthors, shortLink } from '@/lib/publications';
import { TALKS_BY_DATE } from '@/lib/talks';
import { LINKS, PROFILE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'CV',
  description:
    'Curriculum vitae of Adam Lahouari, postdoctoral researcher at NYU Chemistry (Tuckerman Group).',
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Format a partial ISO date ("2026", "2024-03", "2023-06-06") for print. */
function formatPartialDate(date: string): string {
  const [year, month, day] = date.split('-');
  if (!month) return year;
  const monthName = MONTHS[Number(month) - 1];
  return day ? `${monthName} ${Number(day)}, ${year}` : `${monthName} ${year}`;
}

function CVPage() {
  return (
    <main id="main-content" className="flex-1 pt-16 cv-page">
      <Container className="py-12">
        {/* Header */}
        <header className="mb-12 pb-8 border-b border-border print:border-black">
          <h1 className="text-5xl font-semibold mb-6">
            Adam Lahouari, Ph.D.
          </h1>

          <div className="space-y-2 text-base text-fg-muted print:text-black">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 print:hidden" />
              <a href={LINKS.email} className="hover:text-accent print:text-black">
                {PROFILE.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 print:hidden" />
              <span>{PROFILE.location}</span>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={LINKS.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent print:text-black"
              >
                ORCID: {PROFILE.orcid}
              </a>
              <a
                href={LINKS.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent print:text-black"
              >
                Google Scholar
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent print:text-black"
              >
                GitHub
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent print:text-black"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="mt-6 print:hidden">
            <PrintButton />
          </div>
        </header>

        {/* Education */}
        <section className="mb-10 print:break-inside-avoid">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border print:border-black">
            Education
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-semibold">Ph.D. in Physical Chemistry (Chimie Physique)</h3>
                <span className="text-sm text-fg-muted print:text-black">2021 – 2024</span>
              </div>
              <p className="text-fg-muted print:text-black">Sorbonne Université, Paris, France</p>
              <p className="text-sm text-fg-muted print:text-black mt-1">
                Supervisors: Prof. Jean-Philip Piquemal, Assoc. Prof. Johannes Richardi
              </p>
              <p className="text-sm text-fg-muted print:text-black mt-1">
                Thesis:{' '}
                <a
                  href="https://theses.fr/2024SORUS223"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent print:text-black print:underline"
                >
                  Use of Reactive Force Fields for the Simulation of Metallic Nanoparticles
                </a>{' '}
                (defended 27 September 2024)
              </p>
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-semibold">
                  Double M.Sc. in Chemistry / Theoretical Chemistry
                </h3>
                <span className="text-sm text-fg-muted print:text-black">2019 – 2021</span>
              </div>
              <p className="text-fg-muted print:text-black">
                Université de Lille, France · Jagiellonian University, Kraków, Poland
              </p>
            </div>
          </div>
        </section>

        {/* Positions */}
        <section className="mb-10 print:break-inside-avoid">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border print:border-black">
            Positions
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-semibold">Postdoctoral Researcher</h3>
                <span className="text-sm text-fg-muted print:text-black">2024 – present</span>
              </div>
              <p className="text-fg-muted print:text-black">
                New York University, Department of Chemistry
              </p>
              <p className="text-sm text-fg-muted print:text-black mt-1">
                Tuckerman Research Group — machine-learned interatomic potentials for
                molecular crystals, active learning and foundation-model fine-tuning.
              </p>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border print:border-black">
            Publications
          </h2>
          <ol className="space-y-3 list-decimal list-outside pl-5">
            {PUBLICATIONS_BY_DATE.map((pub) => (
              <li key={pub.id} className="print:break-inside-avoid">
                <span className="text-sm">
                  {formatAuthors(pub.authors, 6)} ({pub.year}). {pub.title}.{' '}
                  <em>{pub.venue}</em>
                  {pub.doiUrl && (
                    <>
                      {' '}
                      <a
                        href={pub.doiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-[#2550E6]"
                      >
                        {/* "Link" reads as nothing on paper; print the URL instead. */}
                        <span className="print:hidden">Link</span>
                        <span className="hidden print:inline cv-url">
                          {shortLink(pub.doiUrl)}
                        </span>
                      </a>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Talks */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border print:border-black">
            Talks &amp; Presentations
          </h2>
          <div className="space-y-3">
            {TALKS_BY_DATE.map((talk) => (
              <div key={talk.id} className="text-sm print:break-inside-avoid">
                <span className="text-fg-muted print:text-black">
                  {formatPartialDate(talk.date)}
                </span>
                {' — '}
                <span className="font-medium">{talk.event}</span>
                {', '}
                <span className="text-fg-muted print:text-black">{talk.location}</span>
                {' · '}
                <span className="text-fg-muted print:text-black">{talk.type}</span>
                <br />
                <span className="italic">{talk.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Teaching & Mentoring */}
        <section className="mb-10 print:break-inside-avoid">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border print:border-black">
            Teaching &amp; Mentoring
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <h3 className="font-semibold mb-1">Workshop Organization</h3>
              <p className="text-fg-muted print:text-black">
                Co-organized a workshop series on DFT, machine learning and molecular
                dynamics at the NYU Simons Center for Computational Physical Chemistry.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Graduate Student Mentoring</h3>
              <p className="text-fg-muted print:text-black">
                Mentoring graduate students in the Tuckerman group on machine-learned
                interatomic potentials for molecular crystals.
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-10 print:break-inside-avoid">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border print:border-black">
            Skills
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <h3 className="font-semibold mb-1">Languages</h3>
              <p className="text-fg-muted print:text-black">French (native), English (fluent)</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Software</h3>
              <p className="text-fg-muted print:text-black">
                Python, PyTorch, MACE, ASE, CP2K, VASP, Gaussian, LAMMPS, Tinker-HP, ReaxFF
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Methods</h3>
              <p className="text-fg-muted print:text-black">
                Density Functional Theory, Molecular Dynamics, Machine-Learned Interatomic Potentials, Reactive Force Fields, Foundation-Model Fine-Tuning, Active Learning, Free Energy Methods, Polymorph Screening
              </p>
            </div>
          </div>
        </section>

        {/* References */}
        <section className="mb-10 print:break-inside-avoid">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border print:border-black">
            References
          </h2>
          <p className="text-sm text-fg-muted print:text-black">Available upon request.</p>
        </section>
      </Container>
    </main>
  );
}

export default CVPage;
