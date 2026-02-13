'use client';

import { useState, useMemo } from 'react';
import {
  GLOSSARY_TERMS,
  GLOSSARY_CATEGORIES,
  type GlossaryCategory,
  type GlossaryTerm,
} from '@/data/glossary';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function getCategoryMeta(key: GlossaryCategory) {
  return GLOSSARY_CATEGORIES.find((c) => c.key === key)!;
}

function TermCard({ term }: { term: GlossaryTerm }) {
  const cat = getCategoryMeta(term.category);

  return (
    <div
      id={term.id}
      className="scroll-mt-32 rounded-lg border border-[#1E293B] bg-[#0F172A] p-3 sm:p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-heading text-base font-bold text-[#F8FAFC] sm:text-lg">
          {term.term}
        </h3>
        <span
          className="flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9px] font-medium sm:text-[10px]"
          style={{
            backgroundColor: cat.color + '15',
            color: cat.color,
          }}
        >
          <span>{cat.icon}</span>
          <span className="hidden sm:inline">{cat.label}</span>
        </span>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-[#94A3B8]">
        {term.definition}
      </p>
      {term.aliases && term.aliases.length > 0 && (
        <div className="mt-2 font-mono text-[10px] text-[#334155]">
          Also: {term.aliases.join(', ')}
        </div>
      )}
    </div>
  );
}

export default function GlossaryClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<
    GlossaryCategory | 'all'
  >('all');

  // Filter terms
  const filteredTerms = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return GLOSSARY_TERMS.filter((term) => {
      // Category filter
      if (activeCategory !== 'all' && term.category !== activeCategory) {
        return false;
      }
      // Search filter
      if (q) {
        const matchesTerm = term.term.toLowerCase().includes(q);
        const matchesDef = term.definition.toLowerCase().includes(q);
        const matchesAliases = term.aliases?.some((a) =>
          a.toLowerCase().includes(q)
        );
        return matchesTerm || matchesDef || matchesAliases;
      }
      return true;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, activeCategory]);

  // Group by first letter
  const grouped = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    for (const term of filteredTerms) {
      // Get first alphabetical character
      const firstChar = term.term.replace(/^[^a-zA-Z]/, '').charAt(0).toUpperCase();
      const letter = firstChar && /[A-Z]/.test(firstChar) ? firstChar : '#';
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    }
    return groups;
  }, [filteredTerms]);

  const activeLetters = new Set(Object.keys(grouped));

  return (
    <div className="ambient-glow flex flex-col gap-4 sm:gap-6">
      {/* Hero */}
      <div className="relative z-10 text-center">
        <h1 className="font-heading text-2xl font-black tracking-tight text-[#F8FAFC] sm:text-4xl">
          LOOKSMAXXING <span className="text-[#F59E0B]">GLOSSARY</span>
        </h1>
        <p className="mt-1.5 font-mono text-xs text-[#64748B] sm:mt-2 sm:text-sm">
          {GLOSSARY_TERMS.length} terms decoded. Know the lingo.
        </p>
      </div>

      {/* Sticky search bar */}
      <div className="sticky top-[49px] z-40 -mx-3 border-b border-[#1E293B] bg-[#020617]/95 px-3 py-2.5 backdrop-blur-xl sm:top-[53px] sm:-mx-4 sm:px-4 sm:py-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#334155]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search terms..."
              className="w-full rounded-lg border border-[#1E293B] bg-[#0F172A] py-2 pl-10 pr-3 font-mono text-sm text-[#F8FAFC] placeholder-[#334155] outline-none transition-colors focus:border-[#F59E0B]"
            />
          </div>
          <span className="shrink-0 font-mono text-[10px] text-[#64748B] sm:text-xs">
            {filteredTerms.length} result{filteredTerms.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:gap-2 sm:overflow-visible">
        <button
          onClick={() => setActiveCategory('all')}
          className="shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium transition-all sm:px-3 sm:text-xs"
          style={{
            borderColor:
              activeCategory === 'all' ? '#F59E0B' : '#1E293B',
            backgroundColor:
              activeCategory === 'all' ? '#F59E0B15' : 'transparent',
            color: activeCategory === 'all' ? '#F59E0B' : '#64748B',
          }}
        >
          All
        </button>
        {GLOSSARY_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() =>
              setActiveCategory(
                activeCategory === cat.key ? 'all' : cat.key
              )
            }
            className="shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium transition-all sm:px-3 sm:text-xs"
            style={{
              borderColor:
                activeCategory === cat.key ? cat.color : '#1E293B',
              backgroundColor:
                activeCategory === cat.key ? cat.color + '15' : 'transparent',
              color: activeCategory === cat.key ? cat.color : '#64748B',
            }}
          >
            <span className="mr-0.5">{cat.icon}</span> {cat.label}
          </button>
        ))}
      </div>

      {/* Alphabet jump bar */}
      <div className="flex flex-wrap gap-1 sm:gap-1.5">
        {LETTERS.map((letter) => {
          const isActive = activeLetters.has(letter);
          return (
            <a
              key={letter}
              href={isActive ? `#letter-${letter}` : undefined}
              className={`flex h-7 w-7 items-center justify-center rounded font-mono text-[10px] font-bold transition-colors sm:h-8 sm:w-8 sm:text-xs ${
                isActive
                  ? 'border border-[#1E293B] bg-[#0F172A] text-[#F8FAFC] hover:border-[#F59E0B] hover:text-[#F59E0B]'
                  : 'text-[#1E293B]'
              }`}
              onClick={(e) => {
                if (!isActive) {
                  e.preventDefault();
                  return;
                }
                e.preventDefault();
                const el = document.getElementById(`letter-${letter}`);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {letter}
            </a>
          );
        })}
      </div>

      {/* Terms grouped by letter */}
      {Object.keys(grouped)
        .sort()
        .map((letter) => (
          <section key={letter} id={`letter-${letter}`} className="scroll-mt-32">
            <h2 className="mb-2 font-heading text-xl font-black text-[#F59E0B] sm:mb-3 sm:text-2xl">
              {letter}
            </h2>
            <div className="animate-stagger flex flex-col gap-2 sm:gap-3">
              {grouped[letter].map((term) => (
                <TermCard key={term.id} term={term} />
              ))}
            </div>
          </section>
        ))}

      {/* Empty state */}
      {filteredTerms.length === 0 && (
        <div className="py-12 text-center">
          <div className="text-4xl">&#x1F50D;</div>
          <p className="mt-3 font-heading text-lg font-bold text-[#64748B]">
            NO MATCHES
          </p>
          <p className="mt-1 font-mono text-xs text-[#334155]">
            Try a different search term or clear your filters.
          </p>
        </div>
      )}
    </div>
  );
}
