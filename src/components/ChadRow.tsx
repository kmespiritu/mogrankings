'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Chad, EloRating } from '@/lib/types';
import { formatNum, totalFollowers } from '@/lib/utils';
import { eloToAudienceScore } from '@/lib/elo';
import MogTierBadge from './MogTierBadge';
import ArchetypeTag from './ArchetypeTag';
import TrendBadge from './TrendBadge';
import Sparkline from './Sparkline';
import PlatformBar from './PlatformBar';
import AudienceScoreBadge from './AudienceScoreBadge';

interface ChadRowProps {
  chad: Chad;
  rank: number;
  eloRating?: EloRating;
}

export default function ChadRow({ chad, rank, eloRating }: ChadRowProps) {
  const total = totalFollowers(chad.platforms);
  const audienceScore =
    eloRating && eloRating.total_votes > 0
      ? eloToAudienceScore(eloRating.elo_rating)
      : null;

  return (
    <Link
      href={`/chad/${chad.slug}`}
      className="group grid grid-cols-[40px_36px_1fr_70px_100px_60px] items-center gap-2 border-b border-[#1E293B] px-4 py-3 transition-colors hover:bg-[#0F172A]/60 sm:grid-cols-[40px_36px_1.5fr_80px_60px_100px_120px_100px_80px]"
    >
      {/* Rank */}
      <div className="font-mono text-sm font-bold text-[#64748B]">
        {chad.isLegacy ? '∞' : `#${rank}`}
      </div>

      {/* Profile Photo */}
      <div className="flex-shrink-0">
        <Image
          src={chad.image}
          alt={chad.name}
          width={36}
          height={36}
          className="rounded-full border border-[#1E293B]"
        />
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

      {/* Mog Score */}
      <div className="text-right font-heading text-lg font-black text-[#F59E0B]">
        {chad.score.chadScore}
      </div>

      {/* Audience Score */}
      <div className="flex justify-center">
        <AudienceScoreBadge score={audienceScore} />
      </div>

      {/* Total followers */}
      <div className="hidden text-right font-mono text-sm text-[#F8FAFC] sm:block">
        {formatNum(total)}
        <div className="mt-0.5">
          <PlatformBar platforms={chad.platforms} compact />
        </div>
      </div>

      {/* Sparkline */}
      <div className="hidden justify-center sm:flex">
        <Sparkline data={chad.sparklineData} trend={chad.score.trend} />
      </div>

      {/* Trend */}
      <div className="hidden sm:block">
        <TrendBadge trend={chad.score.trend} growth={chad.score.monthlyGrowth} />
      </div>

      {/* Growth */}
      <div className="hidden text-right font-mono text-xs text-[#64748B] sm:block">
        {chad.score.monthlyGrowth > 0 ? '+' : ''}
        {chad.score.monthlyGrowth}%
      </div>
    </Link>
  );
}
