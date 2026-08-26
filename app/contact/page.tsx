import type { Metadata } from 'next';
import { ContactPage } from './contact-client';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Adam Lahouari for research collaboration, speaking invitations, or general inquiries.',
  openGraph: {
    title: 'Contact — Adam Lahouari',
    description: 'Get in touch for research collaboration, speaking invitations, or general inquiries.',
  },
};

export default function Page() {
  return <ContactPage />;
}
