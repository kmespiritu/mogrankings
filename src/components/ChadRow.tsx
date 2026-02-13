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
      className="group block border-b border-[#1E293B] transition-colors hover:bg-[#0F172A]/60"
    >
      {/* Desktop layout */}
      <div className="hidden items-center gap-2 px-4 py-3 sm:grid sm:grid-cols-[40px_36px_1.5fr_80px_60px_100px_120px_100px_80px]">
        <div className="font-mono text-sm font-bold text-[#64748B]">
          {chad.isLegacy ? '\u221E' : `#${rank}`}
        </div>
        <div className="flex-shrink-0">
          <Image src={chad.image} alt={chad.name} width={36} height={36} className="rounded-full border border-[#1E293B]" />
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-heading text-sm font-bold text-[#F8FAFC]">{chad.name}</span>
            <span className="text-lg leading-none">{chad.country}</span>
            <MogTierBadge tier={chad.mogTier} />
            {chad.isLegacy && (
              <span className="rounded bg-[#F59E0B]/10 px-1.5 py-0.5 font-mono text-[9px] text-[#F59E0B]">LEGACY</span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[11px] text-[#64748B]">{chad.handle}</span>
            <span className="flex gap-1">
              {chad.archetypes.map((a) => (
                <ArchetypeTag key={a} archetypeKey={a} />
              ))}
            </span>
          </div>
        </div>
        <div className="text-right font-heading text-lg font-black text-[#F59E0B]">{chad.score.chadScore}</div>
        <div className="flex justify-center"><AudienceScoreBadge score={audienceScore} /></div>
        <div className="text-right font-mono text-sm text-[#F8FAFC]">
          {formatNum(total)}
          <div className="mt-0.5"><PlatformBar platforms={chad.platforms} compact /></div>
        </div>
        <div className="flex justify-center"><Sparkline data={chad.sparklineData} trend={chad.score.trend} /></div>
        <div><TrendBadge trend={chad.score.trend} growth={chad.score.monthlyGrowth} /></div>
        <div className="text-right font-mono text-xs text-[#64748B]">
          {chad.score.monthlyGrowth > 0 ? '+' : ''}{chad.score.monthlyGrowth}%
        </div>
      </div>

      {/* Mobile layout */}
      <div className="grid grid-cols-[28px_28px_1fr_50px_40px] items-center gap-1.5 px-3 py-2.5 sm:hidden">
        <div className="font-mono text-xs font-bold text-[#64748B]">
          {chad.isLegacy ? '\u221E' : `#${rank}`}
        </div>
        <div className="flex-shrink-0">
          <Image src={chad.image} alt={chad.name} width={28} height={28} className="rounded-full border border-[#1E293B]" />
        </div>
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-1">
            <span className="truncate font-heading text-xs font-bold text-[#F8FAFC]">{chad.name}</span>
            <span className="text-sm leading-none">{chad.country}</span>
            <MogTierBadge tier={chad.mogTier} />
          </div>
          <span className="truncate font-mono text-[10px] text-[#64748B]">{chad.handle}</span>
        </div>
        <div className="text-right font-heading text-sm font-black text-[#F59E0B]">{chad.score.chadScore}</div>
        <div className="flex justify-center"><AudienceScoreBadge score={audienceScore} size="sm" /></div>
      </div>
    </Link>
  );
}
