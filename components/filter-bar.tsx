"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Tag } from './tag';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedYears: number[];
  onYearsChange: (years: number[]) => void;
  selectedVenues: string[];
  onVenuesChange: (venues: string[]) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  sortBy: 'newest' | 'oldest' | 'cited';
  onSortChange: (sort: 'newest' | 'oldest' | 'cited') => void;
  availableYears: number[];
  availableVenues: string[];
  availableTags: string[];
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedYears,
  onYearsChange,
  selectedVenues,
  onVenuesChange,
  selectedTags,
  onTagsChange,
  sortBy,
  onSortChange,
  availableYears,
  availableVenues,
  availableTags,
}: FilterBarProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [venueDropdownOpen, setVenueDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (filterBarRef.current) {
        const rect = filterBarRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 64); // 64px is the nav height
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }

      if (e.key === 'Escape') {
        setYearDropdownOpen(false);
        setVenueDropdownOpen(false);
        setSortDropdownOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setYearDropdownOpen(false);
        setVenueDropdownOpen(false);
        setSortDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleYear = (year: number) => {
    if (selectedYears.includes(year)) {
      onYearsChange(selectedYears.filter((y) => y !== year));
    } else {
      onYearsChange([...selectedYears, year]);
    }
  };

  const toggleVenue = (venue: string) => {
    if (selectedVenues.includes(venue)) {
      onVenuesChange(selectedVenues.filter((v) => v !== venue));
    } else {
      onVenuesChange([...selectedVenues, venue]);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div
      ref={filterBarRef}
      className={`
        bg-bg border-y border-border py-4 transition-all z-40
        ${isSticky ? 'sticky top-16 shadow-sm' : ''}
      `}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[var(--container-default)]">
        <div className="space-y-4">
          {/* Top Row: Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-muted pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search title, author, venue…"
                className="w-full pl-10 pr-16 py-2 bg-bg-elev border border-border rounded-[var(--radius-md)] text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-fg-muted font-mono pointer-events-none">
                ⌘K
              </span>
            </div>

            {/* Year Filter */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
                className="w-full sm:w-auto inline-flex items-center gap-2 px-4 py-2 bg-bg-elev border border-border rounded-[var(--radius-md)] text-sm hover:bg-border/30 transition-colors min-w-[120px] justify-between"
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

            {/* Venue Filter */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setVenueDropdownOpen(!venueDropdownOpen)}
                className="w-full sm:w-auto inline-flex items-center gap-2 px-4 py-2 bg-bg-elev border border-border rounded-[var(--radius-md)] text-sm hover:bg-border/30 transition-colors min-w-[120px] justify-between"
              >
                <span>
                  {selectedVenues.length > 0 ? `Venue (${selectedVenues.length})` : 'Venue'}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {venueDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 bg-bg-elev border border-border rounded-[var(--radius-md)] shadow-[var(--shadow)] overflow-hidden z-50 min-w-[200px] max-h-64 overflow-y-auto">
                  {availableVenues.map((venue) => (
                    <label
                      key={venue}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-border/30 cursor-pointer text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedVenues.includes(venue)}
                        onChange={() => toggleVenue(venue)}
                        className="rounded"
                      />
                      {venue}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative dropdown-container sm:ml-auto">
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="w-full sm:w-auto inline-flex items-center gap-2 px-4 py-2 bg-bg-elev border border-border rounded-[var(--radius-md)] text-sm hover:bg-border/30 transition-colors min-w-[140px] justify-between"
              >
                <span>
                  {sortBy === 'newest' && 'Newest first'}
                  {sortBy === 'oldest' && 'Oldest first'}
                  {sortBy === 'cited' && 'Most cited'}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {sortDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 bg-bg-elev border border-border rounded-[var(--radius-md)] shadow-[var(--shadow)] overflow-hidden z-50 min-w-[140px]">
                  <button
                    onClick={() => {
                      onSortChange('newest');
                      setSortDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-border/30 transition-colors"
                  >
                    Newest first
                  </button>
                  <button
                    onClick={() => {
                      onSortChange('oldest');
                      setSortDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-border/30 transition-colors"
                  >
                    Oldest first
                  </button>
                  <button
                    onClick={() => {
                      onSortChange('cited');
                      setSortDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-border/30 transition-colors"
                  >
                    Most cited
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Row: Tag Chips */}
          <div className="flex flex-wrap gap-2 items-center">
            {availableTags.map((tag) => (
              <Tag
                key={tag}
                active={selectedTags.includes(tag)}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
