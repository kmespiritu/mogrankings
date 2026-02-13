'use client';

import { useState } from 'react';
import { SEED_CHADS } from '@/data/seed';
import { Chad } from '@/lib/types';
import { formatNum, totalFollowers } from '@/lib/utils';
import MogTierBadge from '@/components/MogTierBadge';
import ArchetypeTag from '@/components/ArchetypeTag';
import TrendBadge from '@/components/TrendBadge';
import Sparkline from '@/components/Sparkline';
import PlatformBar from '@/components/PlatformBar';

function CompareSlot({
  chad,
  onSelect,
  onClear,
  label,
}: {
  chad: Chad | null;
  onSelect: (chad: Chad) => void;
  onClear: () => void;
  label: string;
}) {
  if (!chad) {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-dashed border-[#1E293B] bg-[#0F172A]/50 p-6">
        <span className="font-mono text-xs text-[#64748B]">{label}</span>
        <select
          onChange={(e) => {
            const c = SEED_CHADS.find((c) => c.id === e.target.value);
            if (c) onSelect(c);
          }}
          className="rounded-md border border-[#1E293B] bg-[#0F172A] px-3 py-2 font-mono text-sm text-[#F8FAFC] outline-none focus:border-[#F59E0B]"
          defaultValue=""
        >
          <option value="" disabled>
            Select a Chad...
          </option>
          {SEED_CHADS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-[#1E293B] bg-[#0F172A] p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{chad.country}</span>
          <span className="font-heading text-lg font-bold text-[#F8FAFC]">
            {chad.name}
          </span>
          <MogTierBadge tier={chad.mogTier} />
        </div>
        <button
          onClick={onClear}
          className="rounded px-2 py-1 font-mono text-xs text-[#64748B] hover:text-[#EF4444]"
        >
          ✕
        </button>
      </div>
      <div className="flex flex-wrap gap-1">
        {chad.archetypes.map((a) => (
          <ArchetypeTag key={a} archetypeKey={a} />
        ))}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase text-[#64748B]">
            Chad Score
          </div>
          <div className="font-heading text-3xl font-black text-[#F59E0B]">
            {chad.score.chadScore}
          </div>
        </div>
        <Sparkline data={chad.sparklineData} trend={chad.score.trend} />
      </div>
      <PlatformBar platforms={chad.platforms} />
      <div className="flex items-center justify-between text-sm">
        <span className="font-mono text-xs text-[#64748B]">
          {formatNum(totalFollowers(chad.platforms))} total
        </span>
        <TrendBadge
          trend={chad.score.trend}
          growth={chad.score.monthlyGrowth}
        />
      </div>
    </div>
  );
}

export default function ComparePage() {
  const [chadA, setChadA] = useState<Chad | null>(null);
  const [chadB, setChadB] = useState<Chad | null>(null);

  const both = chadA && chadB;

  return (
    <div className="ambient-glow flex flex-col gap-6">
      <div className="relative z-10 text-center">
        <h1 className="font-heading text-4xl font-black tracking-tight text-[#F8FAFC]">
          HEAD TO <span className="text-[#F59E0B]">HEAD</span>
        </h1>
        <p className="mt-2 font-mono text-sm text-[#64748B]">
          Select two chads to compare their stats side by side
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <CompareSlot
          chad={chadA}
          onSelect={setChadA}
          onClear={() => setChadA(null)}
          label="CHAD #1"
        />
        <CompareSlot
          chad={chadB}
          onSelect={setChadB}
          onClear={() => setChadB(null)}
          label="CHAD #2"
        />
      </div>

      {/* Comparison table */}
      {both && (
        <div className="rounded-lg border border-[#1E293B] bg-[#0F172A] p-6">
          <h2 className="mb-4 font-heading text-lg font-bold text-[#F8FAFC]">
            BREAKDOWN
          </h2>
          <div className="flex flex-col divide-y divide-[#1E293B]">
            {[
              {
                label: 'Chad Score',
                a: chadA!.score.chadScore,
                b: chadB!.score.chadScore,
              },
              {
                label: 'Total Followers',
                a: totalFollowers(chadA!.platforms),
                b: totalFollowers(chadB!.platforms),
                format: true,
              },
              {
                label: 'Virality',
                a: chadA!.score.viralityScore,
                b: chadB!.score.viralityScore,
              },
              {
                label: 'Monthly Growth',
                a: chadA!.score.monthlyGrowth,
                b: chadB!.score.monthlyGrowth,
                suffix: '%',
              },
              {
                label: 'Platforms',
                a: chadA!.platforms.length,
                b: chadB!.platforms.length,
              },
            ].map((row) => {
              const aWins =
                typeof row.a === 'number' && typeof row.b === 'number'
                  ? row.a > row.b
                  : false;
              const bWins =
                typeof row.a === 'number' && typeof row.b === 'number'
                  ? row.b > row.a
                  : false;

              return (
                <div
                  key={row.label}
                  className="grid grid-cols-3 items-center py-3"
                >
                  <span
                    className={`text-right font-mono text-sm ${
                      aWins ? 'font-bold text-[#F59E0B]' : 'text-[#F8FAFC]'
                    }`}
                  >
                    {row.format ? formatNum(row.a as number) : row.a}
                    {row.suffix || ''}
                  </span>
                  <span className="text-center font-mono text-[10px] uppercase text-[#64748B]">
                    {row.label}
                  </span>
                  <span
                    className={`font-mono text-sm ${
                      bWins ? 'font-bold text-[#F59E0B]' : 'text-[#F8FAFC]'
                    }`}
                  >
                    {row.format ? formatNum(row.b as number) : row.b}
                    {row.suffix || ''}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
