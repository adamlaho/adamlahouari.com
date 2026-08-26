"use client";

import { useState, useEffect } from 'react';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/breadcrumb';
import { SectionHeading } from '@/components/section-heading';
import { TalkCard } from '@/components/talk-card';
import { TALKS_BY_DATE, type TalkRecord } from '@/lib/talks';
import { ChevronDown } from 'lucide-react';

const TALKS = TALKS_BY_DATE;

export function TalksPage() {
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  const availableYears = Array.from(new Set(TALKS.map((t) => t.year))).sort((a, b) => b - a);
  const availableTypes = Array.from(new Set(TALKS.map((t) => t.type))).sort();

  // Close dropdowns on escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setYearDropdownOpen(false);
        setTypeDropdownOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setYearDropdownOpen(false);
        setTypeDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleYear = (year: number) => {
    if (selectedYears.includes(year)) {
      setSelectedYears(selectedYears.filter((y) => y !== year));
    } else {
      setSelectedYears([...selectedYears, year]);
    }
  };

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // Filter talks
  const filteredTalks = TALKS.filter((talk) => {
    if (selectedYears.length > 0 && !selectedYears.includes(talk.year)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(talk.type)) return false;
    return true;
  });

  // Group by year
  const groupedTalks = filteredTalks.reduce((acc, talk) => {
    if (!acc[talk.year]) acc[talk.year] = [];
    acc[talk.year].push(talk);
    return acc;
  }, {} as Record<number, TalkRecord[]>);

  const years = Object.keys(groupedTalks)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <main id="main-content" className="flex-1 pt-16">
      <Container className="pt-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Talks' },
          ]}
        />
      </Container>

      <section className="py-12">
        <Container>
          <SectionHeading
            as="h1"
            title="Talks & Presentations"
            kicker={`${TALKS.length} talks and conference presentations`}
            className="mb-8"
          />
        </Container>
      </section>

      {/* Filter Bar */}
      <section className="py-4 border-y border-border bg-bg-elev">
        <Container>
          <div className="flex flex-wrap gap-3">
            {/* Year Filter */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-bg-elev border border-border rounded-[var(--radius-md)] text-sm hover:bg-border/30 transition-colors min-w-[120px] justify-between"
              >
                <span>
                  {selectedYears.length > 0 ? `Year (${selectedYears.length})` : 'Year'}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {yearDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 bg-bg-elev border border-border rounded-[var(--radius-md)] shadow-[var(--shadow)] overflow-hidden z-50 min-w-[160px]">
                  {availableYears.map((year) => (
                    <label
                      key={year}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-border/30 cursor-pointer text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedYears.includes(year)}
                        onChange={() => toggleYear(year)}
                        className="rounded"
                      />
                      {year}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Type Filter */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-bg-elev border border-border rounded-[var(--radius-md)] text-sm hover:bg-border/30 transition-colors min-w-[120px] justify-between"
              >
                <span>
                  {selectedTypes.length > 0 ? `Type (${selectedTypes.length})` : 'Type'}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {typeDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 bg-bg-elev border border-border rounded-[var(--radius-md)] shadow-[var(--shadow)] overflow-hidden z-50 min-w-[180px]">
                  {availableTypes.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-border/30 cursor-pointer text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="rounded"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Talks List */}
      <section className="py-16">
        <Container>
          {years.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-fg-muted">No talks found matching your filters.</p>
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
                    {groupedTalks[year].map((talk) => (
                      <TalkCard key={talk.id} talk={talk} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}

