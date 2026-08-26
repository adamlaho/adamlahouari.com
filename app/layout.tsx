import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { SkipToContent } from '@/components/skip-to-content';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { LINKS, PROFILE, SITE_URL } from '@/lib/site';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PROFILE.name} — Research Portfolio`,
    template: `%s — ${PROFILE.name}`,
  },
  description:
    'Postdoctoral researcher at NYU Chemistry (Tuckerman Group) developing machine-learned interatomic potentials for molecular crystals and metallic nanoparticles.',
  openGraph: {
    siteName: PROFILE.name,
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PROFILE.name,
  jobTitle: PROFILE.jobTitle,
  email: PROFILE.email,
  affiliation: [
    {
      '@type': 'Organization',
      name: 'New York University, Department of Chemistry',
    },
  ],
  alumniOf: [{ '@type': 'Organization', name: 'Sorbonne Université' }],
  identifier: LINKS.orcid,
  url: SITE_URL,
  sameAs: [LINKS.orcid, LINKS.scholar, LINKS.github, LINKS.linkedin, LINKS.groupPage],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      {/*
        Browser extensions inject attributes onto <body> before React
        hydrates (e.g. wd-tech="true"), which React reports as a hydration
        mismatch. This suppresses the warning for this element's own
        attributes only — one level deep — so genuine mismatches in the tree
        below are still reported.
      */}
      <body suppressHydrationWarning>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <SkipToContent />
            <Nav />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
