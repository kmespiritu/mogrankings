import Link from 'next/link';
import Image from 'next/image';
import { Chad } from '@/lib/types';
import { formatNum, totalFollowers } from '@/lib/utils';
import MogTierBadge from './MogTierBadge';
import ArchetypeTag from './ArchetypeTag';
import TrendBadge from './TrendBadge';
import Sparkline from './Sparkline';
import PlatformBar from './PlatformBar';

interface ChadCardProps {
  chad: Chad;
  rank: number;
}

export default function ChadCard({ chad, rank }: ChadCardProps) {
  const total = totalFollowers(chad.platforms);

  return (
    <Link
      href={`/chad/${chad.slug}`}
      className="group flex flex-col gap-3 rounded-lg border border-[#1E293B] bg-[#0F172A] p-4 transition-all hover:border-[#F59E0B]/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.05)]"
    >
      {/* Top row: rank + photo + name + tier */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#64748B]">
            {chad.isLegacy ? '∞' : `#${rank}`}
          </span>
          <Image
            src={chad.image}
            alt={chad.name}
            width={32}
            height={32}
            className="rounded-full border border-[#1E293B]"
          />
          <span className="text-lg leading-none">{chad.country}</span>
        </div>
        <MogTierBadge tier={chad.mogTier} size="md" />
      </div>

      {/* Name */}
      <div>
        <h3 className="font-heading text-lg font-bold text-[#F8FAFC]">
          {chad.name}
        </h3>
        <span className="font-mono text-xs text-[#64748B]">{chad.handle}</span>
      </div>

      {/* Archetypes */}
      <div className="flex flex-wrap gap-1">
        {chad.archetypes.map((a) => (
          <ArchetypeTag key={a} archetypeKey={a} />
        ))}
      </div>

      {/* Score + sparkline */}
      <div className="flex items-end justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase text-[#64748B]">
            Mog Score
          </div>
          <div className="font-heading text-2xl font-black text-[#F59E0B]">
            {chad.score.chadScore}
          </div>
        </div>
        <Sparkline
          data={chad.sparklineData}
          trend={chad.score.trend}
          width={80}
          height={28}
        />
      </div>

      {/* Followers */}
      <div className="flex items-center justify-between border-t border-[#1E293B] pt-2">
        <span className="font-mono text-xs text-[#64748B]">
          {formatNum(total)} followers
        </span>
        <TrendBadge trend={chad.score.trend} growth={chad.score.monthlyGrowth} />
      </div>

      {/* Platform bar */}
      <PlatformBar platforms={chad.platforms} />
    </Link>
  );
}
