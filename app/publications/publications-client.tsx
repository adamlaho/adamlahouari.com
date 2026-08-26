"use client";

import { useState, useEffect } from 'react';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/breadcrumb';
import { SectionHeading } from '@/components/section-heading';
import { FilterBar } from '@/components/filter-bar';
import { PublicationCard } from '@/components/publication-card';
import { PUBLICATIONS_BY_DATE, type PublicationRecord } from '@/lib/publications';
import { LINKS } from '@/lib/site';
import { Download, Rss } from 'lucide-react';

interface PublicationsPageProps {
  /** publication id -> live Google Scholar citation count. */
  citations: Record<string, number>;
}

export function PublicationsPage({ citations }: PublicationsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'cited'>('newest');

  const publications = PUBLICATIONS_BY_DATE;

  // Filter option lists, derived from the data rather than hard-coded.
  const availableYears = Array.from(new Set(publications.map((p) => p.year))).sort(
    (a, b) => b - a,
  );
  const availableVenues = Array.from(
    new Set(publications.map((p) => p.venueShort)),
  ).sort();
  const availableTags = Array.from(
    new Set(publications.flatMap((p) => p.tags)),
  ).sort();

  // Read filters from the URL on mount.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const q = params.get('q');
    if (q) setSearchQuery(q);

    const years = params.get('years');
    if (years) {
      setSelectedYears(
        years.split(',').map(Number).filter((n) => Number.isFinite(n)),
      );
    }

    const venues = params.get('venues');
    if (venues) setSelectedVenues(venues.split(','));

    const tags = params.get('tags');
    if (tags) setSelectedTags(tags.split(','));

    const sort = params.get('sort');
    if (sort === 'oldest' || sort === 'cited' || sort === 'newest') setSortBy(sort);
  }, []);

  // Mirror filters back into the URL so views are shareable.
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) params.set('q', searchQuery);
    if (selectedYears.length > 0) params.set('years', selectedYears.join(','));
    if (selectedVenues.length > 0) params.set('venues', selectedVenues.join(','));
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
    if (sortBy !== 'newest') params.set('sort', sortBy);

    const query = params.toString();
    window.history.replaceState(null, '', `/publications${query ? `?${query}` : ''}`);
  }, [searchQuery, selectedYears, selectedVenues, selectedTags, sortBy]);

  const filtered = publications.filter((pub) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const haystack = [
        pub.title,
        pub.venue,
        pub.venueShort,
        ...pub.authors,
        ...pub.tags,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    if (selectedYears.length > 0 && !selectedYears.includes(pub.year)) return false;
    if (selectedVenues.length > 0 && !selectedVenues.includes(pub.venueShort)) return false;
    if (selectedTags.length > 0 && !selectedTags.some((tag) => pub.tags.includes(tag))) {
      return false;
    }

    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'oldest') return a.date.localeCompare(b.date);
    if (sortBy === 'cited') {
      return (citations[b.id] ?? 0) - (citations[a.id] ?? 0);
    }
    return b.date.localeCompare(a.date);
  });

  // Group by year, preserving the sorted order within each group.
  const grouped = sorted.reduce<Record<number, PublicationRecord[]>>((acc, pub) => {
    (acc[pub.year] ??= []).push(pub);
    return acc;
  }, {});

  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => (sortBy === 'oldest' ? a - b : b - a));

  const peerReviewed = publications.filter((p) => p.type === 'journal').length;
  const preprints = publications.filter((p) => p.type === 'preprint').length;
  const theses = publications.filter((p) => p.type === 'thesis').length;

  const kicker = [
    `${publications.length} entries`,
    `${peerReviewed} peer-reviewed`,
    preprints > 0 ? `${preprints} preprint${preprints === 1 ? '' : 's'}` : null,
    theses > 0 ? `${theses} thesis` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <main id="main-content" className="flex-1 pt-16">
      <Container className="pt-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Publications' },
          ]}
        />
      </Container>

      <section className="py-12">
        <Container>
          <SectionHeading as="h1" eyebrow="Publications" title="Publications" kicker={kicker} />
        </Container>
      </section>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedYears={selectedYears}
        onYearsChange={setSelectedYears}
        selectedVenues={selectedVenues}
        onVenuesChange={setSelectedVenues}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        sortBy={sortBy}
        onSortChange={setSortBy}
        availableYears={availableYears}
        availableVenues={availableVenues}
        availableTags={availableTags}
      />

      <section className="py-16">
        <Container>
          {years.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-fg-muted">No publications match your filters.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {years.map((year) => (
                <div key={year}>
                  <div className="mb-6">
                    <h2 className="text-4xl font-semibold mb-4">{year}</h2>
                    <hr className="border-border" />
                  </div>
                  <div className="space-y-4">
                    {grouped[year].map((pub) => (
                      <PublicationCard
                        key={pub.id}
                        publication={pub}
                        citations={citations[pub.id]}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <a
              href="/publications.bib"
              download="lahouari-publications.bib"
              className="inline-flex items-center gap-2 px-6 py-3 bg-bg-elev border border-border rounded-[var(--radius-md)] hover:bg-border/30 transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              Download full BibTeX
            </a>
            <a
              href={LINKS.scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-[#2550E6] transition-colors font-medium"
            >
              <Rss className="w-4 h-4" />
              Google Scholar profile
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
