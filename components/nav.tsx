"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor, Menu, X } from 'lucide-react';
import { Button } from './button';

const NAV_LINKS = [
  { name: 'Research', href: '/research' },
  { name: 'Publications', href: '/publications' },
  { name: 'Software', href: '/software' },
  { name: 'Talks', href: '/talks' },
  { name: 'CV', href: '/cv' },
  { name: 'Contact', href: '/contact' },
];

const THEME_OPTIONS = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'System', Icon: Monitor },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // next-themes only knows the resolved theme on the client; rendering the
  // icon before mount would mismatch the server HTML.
  const [mounted, setMounted] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close both menus on Escape or a click outside the theme menu.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setThemeMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    const onPointerDown = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, []);

  // Navigating away should always close the mobile menu.
  useEffect(() => {
    setMobileMenuOpen(false);
    setThemeMenuOpen(false);
  }, [pathname]);

  const ThemeIcon =
    !mounted || theme === 'system'
      ? Monitor
      : theme === 'dark'
        ? Moon
        : Sun;

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          scrolled || mobileMenuOpen
            ? 'bg-bg-elev/95 backdrop-blur-sm border-b border-border shadow-sm'
            : 'bg-transparent'
        }
      `}
      aria-label="Main"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[var(--container-wide)]">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            aria-current={pathname === '/' ? 'page' : undefined}
            className={`text-lg font-semibold transition-colors ${
              pathname === '/' ? 'text-fg' : 'text-fg-muted hover:text-fg'
            }`}
          >
            Home
          </Link>

          <div className="flex items-center gap-4 md:gap-8">
            <ul className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    aria-current={isCurrent(link.href) ? 'page' : undefined}
                    className={`text-base transition-colors ${
                      isCurrent(link.href)
                        ? 'text-fg font-medium'
                        : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative" ref={themeMenuRef}>
                <button
                  type="button"
                  onClick={() => setThemeMenuOpen((open) => !open)}
                  className="p-2 rounded-[var(--radius-md)] hover:bg-border/30 transition-colors"
                  aria-label="Change colour theme"
                  aria-haspopup="menu"
                  aria-expanded={themeMenuOpen}
                >
                  <ThemeIcon className="w-5 h-5" />
                </button>

                {themeMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-36 bg-bg-elev border border-border rounded-[var(--radius-md)] shadow-[var(--shadow)] overflow-hidden"
                  >
                    {THEME_OPTIONS.map(({ value, label, Icon }) => (
                      <button
                        key={value}
                        type="button"
                        role="menuitemradio"
                        aria-checked={mounted && theme === value}
                        onClick={() => {
                          setTheme(value);
                          setThemeMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-border/30 transition-colors flex items-center gap-2"
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/cv" className="hidden sm:block">
                <Button variant="primary" size="sm">
                  View CV
                </Button>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="md:hidden p-2 rounded-[var(--radius-md)] hover:bg-border/30 transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-border py-2">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    aria-current={isCurrent(link.href) ? 'page' : undefined}
                    className={`block px-2 py-3 text-base transition-colors ${
                      isCurrent(link.href)
                        ? 'text-fg font-medium'
                        : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
