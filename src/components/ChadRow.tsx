'use client';

import Link from 'next/link';
import { Chad } from '@/lib/types';
import { formatNum, totalFollowers } from '@/lib/utils';
import MogTierBadge from './MogTierBadge';
import ArchetypeTag from './ArchetypeTag';
import TrendBadge from './TrendBadge';
import Sparkline from './Sparkline';
import PlatformBar from './PlatformBar';

interface ChadRowProps {
  chad: Chad;
  rank: number;
  onCompare?: (chad: Chad) => void;
}

export default function ChadRow({ chad, rank, onCompare }: ChadRowProps) {
  const total = totalFollowers(chad.platforms);

  return (
    <Link
      href={`/chad/${chad.slug}`}
      className="group grid grid-cols-[40px_1fr_80px_100px_120px_80px_40px] items-center gap-3 border-b border-[#1E293B] px-4 py-3 transition-colors hover:bg-[#0F172A]/60 sm:grid-cols-[40px_1.5fr_100px_120px_140px_120px_80px_40px]"
    >
      {/* Rank */}
      <div className="font-mono text-sm font-bold text-[#64748B]">
        {chad.isLegacy ? '∞' : `#${rank}`}
      </div>

      {/* Name + handle + archetypes */}
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-heading text-sm font-bold text-[#F8FAFC]">
            {chad.name}
          </span>
          <span className="text-lg leading-none">{chad.country}</span>
          <MogTierBadge tier={chad.mogTier} />
          {chad.isLegacy && (
            <span className="rounded bg-[#F59E0B]/10 px-1.5 py-0.5 font-mono text-[9px] text-[#F59E0B]">
              LEGACY
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[11px] text-[#64748B]">
            {chad.handle}
          </span>
          <span className="hidden gap-1 sm:flex">
            {chad.archetypes.map((a) => (
              <ArchetypeTag key={a} archetypeKey={a} />
            ))}
          </span>
        </div>
      </div>

      {/* Chad Score */}
      <div className="text-right font-heading text-lg font-black text-[#F59E0B]">
        {chad.score.chadScore}
      </div>

      {/* Total followers */}
      <div className="hidden text-right font-mono text-sm text-[#F8FAFC] sm:block">
        {formatNum(total)}
        <div className="mt-0.5">
          <PlatformBar platforms={chad.platforms} compact />
        </div>
      </div>

      {/* Sparkline */}
      <div className="flex justify-center">
        <Sparkline data={chad.sparklineData} trend={chad.score.trend} />
      </div>

      {/* Trend */}
      <div className="hidden sm:block">
        <TrendBadge trend={chad.score.trend} growth={chad.score.monthlyGrowth} />
      </div>

      {/* Compare button */}
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onCompare?.(chad);
          }}
          className="rounded border border-[#1E293B] p-1.5 font-mono text-[10px] text-[#64748B] transition-colors hover:border-[#F59E0B] hover:text-[#F59E0B]"
          title="Add to compare"
        >
          VS
        </button>
      </div>
    </Link>
  );
}
