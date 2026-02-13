'use client';

import { useState, useMemo } from 'react';
import { Chad, ArchetypeKey, EloRating, SortField } from '@/lib/types';
import { sortChads } from '@/lib/utils';
import { ARCHETYPE_LIST } from '@/lib/archetypes';
import ChadRow from './ChadRow';

interface LeaderboardProps {
  chads: Chad[];
  eloRatings?: Map<string, EloRating>;
}

export default function Leaderboard({ chads, eloRatings }: LeaderboardProps) {
  const [sortField, setSortField] = useState<SortField>('chadScore');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [filterArchetype, setFilterArchetype] = useState<ArchetypeKey | 'all'>(
    'all'
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = chads;

    if (filterArchetype !== 'all') {
      result = result.filter((c) => c.archetypes.includes(filterArchetype));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.handle.toLowerCase().includes(q)
      );
    }

    return sortChads(result, sortField, sortDir, eloRatings);
  }, [chads, filterArchetype, searchQuery, sortField, sortDir, eloRatings]);

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  }

  const sortIndicator = (field: SortField) => {
    if (sortField !== field) return '';
    return sortDir === 'desc' ? ' \u2193' : ' \u2191';
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* Controls */}
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <input
          type="text"
          placeholder="Search chads..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md border border-[#1E293B] bg-[#0F172A] px-3 py-2 font-mono text-xs text-[#F8FAFC] placeholder-[#64748B] outline-none focus:border-[#F59E0B] sm:w-auto sm:py-1.5"
        />
        <select
          value={filterArchetype}
          onChange={(e) =>
            setFilterArchetype(e.target.value as ArchetypeKey | 'all')
          }
          className="w-full rounded-md border border-[#1E293B] bg-[#0F172A] px-3 py-2 font-mono text-xs text-[#F8FAFC] outline-none focus:border-[#F59E0B] sm:w-auto sm:py-1.5"
        >
          <option value="all">All Archetypes</option>
          {ARCHETYPE_LIST.map((a) => (
            <option key={a.key} value={a.key}>
              {a.icon} {a.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop table header */}
      <div className="hidden items-center gap-2 px-4 sm:grid sm:grid-cols-[40px_36px_1.5fr_80px_60px_100px_120px_100px_80px]">
        <button
          onClick={() => handleSort('rank')}
          className="font-mono text-[10px] uppercase text-[#64748B] hover:text-[#F8FAFC]"
        >
          #{sortIndicator('rank')}
        </button>
        <span />
        <button
          onClick={() => handleSort('name')}
          className="text-left font-mono text-[10px] uppercase text-[#64748B] hover:text-[#F8FAFC]"
        >
          Name{sortIndicator('name')}
        </button>
        <button
          onClick={() => handleSort('chadScore')}
          className="text-right font-mono text-[10px] uppercase text-[#64748B] hover:text-[#F8FAFC]"
        >
          Score{sortIndicator('chadScore')}
        </button>
        <button
          onClick={() => handleSort('audienceScore')}
          className="text-center font-mono text-[10px] uppercase text-[#3B82F6] hover:text-[#60A5FA]"
        >
          Aud.{sortIndicator('audienceScore')}
        </button>
        <button
          onClick={() => handleSort('followers')}
          className="text-right font-mono text-[10px] uppercase text-[#64748B] hover:text-[#F8FAFC]"
        >
          Followers{sortIndicator('followers')}
        </button>
        <span className="text-center font-mono text-[10px] uppercase text-[#64748B]">
          30-Day
        </span>
        <span className="font-mono text-[10px] uppercase text-[#64748B]">
          Trend
        </span>
        <button
          onClick={() => handleSort('growth')}
          className="font-mono text-[10px] uppercase text-[#64748B] hover:text-[#F8FAFC]"
        >
          Growth{sortIndicator('growth')}
        </button>
      </div>

      {/* Mobile table header */}
      <div className="grid grid-cols-[28px_28px_1fr_50px_40px] items-center gap-1.5 px-3 sm:hidden">
        <button
          onClick={() => handleSort('rank')}
          className="font-mono text-[9px] uppercase text-[#64748B]"
        >
          #
        </button>
        <span />
        <button
          onClick={() => handleSort('name')}
          className="text-left font-mono text-[9px] uppercase text-[#64748B]"
        >
          Name
        </button>
        <button
          onClick={() => handleSort('chadScore')}
          className="text-right font-mono text-[9px] uppercase text-[#64748B]"
        >
          Score
        </button>
        <button
          onClick={() => handleSort('audienceScore')}
          className="text-center font-mono text-[9px] uppercase text-[#3B82F6]"
        >
          Aud.
        </button>
      </div>

      {/* Rows */}
      <div className="rounded-lg border border-[#1E293B] bg-[#0F172A]/50">
        {filtered.map((chad, i) => (
          <ChadRow
            key={chad.id}
            chad={chad}
            rank={i + 1}
            eloRating={eloRatings?.get(chad.id)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center font-mono text-sm text-[#64748B]">
            No chads found. They must be ascended beyond our tracking.
          </div>
        )}
      </div>
    </div>
  );
}
