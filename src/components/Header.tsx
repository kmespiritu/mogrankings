'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: 'Leaderboard' },
  { href: '/archetypes', label: 'Archetypes' },
  { href: '/compare', label: 'Who Mogs Who' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/submit', label: 'Submit' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1E293B] bg-[#020617]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3">
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2">
          <span className="font-heading text-xl font-black tracking-tight text-[#F59E0B] sm:text-2xl">
            MOG
          </span>
          <span className="font-heading text-xl font-black tracking-tight text-[#F8FAFC] sm:text-2xl">
            RANKINGS
          </span>
          <span className="ml-0.5 hidden rounded bg-[#F59E0B]/10 px-1.5 py-0.5 font-mono text-[10px] text-[#F59E0B] sm:inline">
            v1.0
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                    : 'text-[#64748B] hover:text-[#F8FAFC]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-[#64748B] transition-colors hover:text-[#F8FAFC] sm:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4H16M2 9H16M2 14H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <nav className="border-t border-[#1E293B] bg-[#020617]/95 px-3 pb-3 pt-2 backdrop-blur-xl sm:hidden">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-md px-3 py-2.5 font-mono text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                    : 'text-[#64748B] hover:text-[#F8FAFC]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
