'use client';

import { useState, useMemo } from 'react';
import { Chad, ArchetypeKey, SortField } from '@/lib/types';
import { sortChads } from '@/lib/utils';
import { ARCHETYPE_LIST } from '@/lib/archetypes';
import ChadRow from './ChadRow';
import CompareModal from './CompareModal';

interface LeaderboardProps {
  chads: Chad[];
}

export default function Leaderboard({ chads }: LeaderboardProps) {
  const [sortField, setSortField] = useState<SortField>('chadScore');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [filterArchetype, setFilterArchetype] = useState<ArchetypeKey | 'all'>(
    'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [compareList, setCompareList] = useState<Chad[]>([]);
  const [showCompare, setShowCompare] = useState(false);

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

    return sortChads(result, sortField, sortDir);
  }, [chads, filterArchetype, searchQuery, sortField, sortDir]);

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  }

  function handleCompare(chad: Chad) {
    setCompareList((prev) => {
      if (prev.find((c) => c.id === chad.id)) {
        return prev.filter((c) => c.id !== chad.id);
      }
      if (prev.length >= 2) {
        return [prev[1], chad];
      }
      return [...prev, chad];
    });
    if (compareList.length >= 1) {
      setShowCompare(true);
    }
  }

  const sortIndicator = (field: SortField) => {
    if (sortField !== field) return '';
    return sortDir === 'desc' ? ' ↓' : ' ↑';
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <input
          type="text"
          placeholder="Search chads..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-md border border-[#1E293B] bg-[#0F172A] px-3 py-1.5 font-mono text-xs text-[#F8FAFC] placeholder-[#64748B] outline-none focus:border-[#F59E0B]"
        />

        {/* Archetype filter */}
        <select
          value={filterArchetype}
          onChange={(e) =>
            setFilterArchetype(e.target.value as ArchetypeKey | 'all')
          }
          className="rounded-md border border-[#1E293B] bg-[#0F172A] px-3 py-1.5 font-mono text-xs text-[#F8FAFC] outline-none focus:border-[#F59E0B]"
        >
          <option value="all">All Archetypes</option>
          {ARCHETYPE_LIST.map((a) => (
            <option key={a.key} value={a.key}>
              {a.icon} {a.label}
            </option>
          ))}
        </select>

        {/* Compare badge */}
        {compareList.length > 0 && (
          <button
            onClick={() => setShowCompare(true)}
            className="ml-auto rounded-md border border-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1.5 font-mono text-xs text-[#F59E0B] transition-colors hover:bg-[#F59E0B]/20"
          >
            Compare ({compareList.length}/2)
          </button>
        )}
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[40px_1fr_80px_100px_120px_80px_40px] items-center gap-3 px-4 sm:grid-cols-[40px_1.5fr_100px_120px_140px_120px_80px_40px]">
        <button
          onClick={() => handleSort('rank')}
          className="font-mono text-[10px] uppercase text-[#64748B] hover:text-[#F8FAFC]"
        >
          #{sortIndicator('rank')}
        </button>
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
          onClick={() => handleSort('followers')}
          className="hidden text-right font-mono text-[10px] uppercase text-[#64748B] hover:text-[#F8FAFC] sm:block"
        >
          Followers{sortIndicator('followers')}
        </button>
        <span className="text-center font-mono text-[10px] uppercase text-[#64748B]">
          30-Day
        </span>
        <span className="hidden font-mono text-[10px] uppercase text-[#64748B] sm:block">
          Trend
        </span>
        <button
          onClick={() => handleSort('growth')}
          className="hidden font-mono text-[10px] uppercase text-[#64748B] hover:text-[#F8FAFC] sm:block"
        >
          Growth{sortIndicator('growth')}
        </button>
        <span />
      </div>

      {/* Rows */}
      <div className="rounded-lg border border-[#1E293B] bg-[#0F172A]/50">
        {filtered.map((chad, i) => (
          <ChadRow
            key={chad.id}
            chad={chad}
            rank={i + 1}
            onCompare={handleCompare}
          />
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center font-mono text-sm text-[#64748B]">
            No chads found. They must be ascended beyond our tracking.
          </div>
        )}
      </div>

      {/* Compare Modal */}
      {showCompare && compareList.length >= 2 && (
        <CompareModal
          chads={compareList}
          onRemove={(id) =>
            setCompareList((prev) => prev.filter((c) => c.id !== id))
          }
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  );
}
