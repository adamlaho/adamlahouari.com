import type { Metadata } from 'next';
import { TalksPage } from './talks-client';

export const metadata: Metadata = {
  title: 'Talks',
  description: 'Invited talks, conference presentations, and seminars by Adam Lahouari on machine learning interatomic potentials and molecular crystal simulation.',
  openGraph: {
    title: 'Talks — Adam Lahouari',
    description: 'Invited talks, conference presentations, and seminars on machine learning interatomic potentials and molecular crystal simulation.',
  },
};

export default function Page() {
  return <TalksPage />;
}
