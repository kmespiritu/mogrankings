'use client';

import { Chad } from '@/lib/types';
import { formatNum, totalFollowers } from '@/lib/utils';
import MogTierBadge from './MogTierBadge';
import Sparkline from './Sparkline';
import PlatformBar from './PlatformBar';
import ArchetypeTag from './ArchetypeTag';

interface CompareModalProps {
  chads: Chad[];
  onRemove: (id: string) => void;
  onClose: () => void;
}

function StatRow({
  label,
  values,
}: {
  label: string;
  values: (string | number)[];
}) {
  const numValues = values.map((v) => (typeof v === 'number' ? v : parseFloat(v)));
  const maxIdx = numValues.indexOf(Math.max(...numValues));

  return (
    <div className="grid grid-cols-[120px_1fr_1fr] items-center gap-2 border-b border-[#1E293B] py-2">
      <span className="font-mono text-[10px] uppercase text-[#64748B]">
        {label}
      </span>
      {values.map((val, i) => (
        <span
          key={i}
          className={`text-right font-mono text-sm ${
            i === maxIdx ? 'font-bold text-[#F59E0B]' : 'text-[#F8FAFC]'
          }`}
        >
          {val}
        </span>
      ))}
    </div>
  );
}

export default function CompareModal({
  chads,
  onRemove,
  onClose,
}: CompareModalProps) {
  if (chads.length < 2) return null;

  const [a, b] = chads;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-xl border border-[#1E293B] bg-[#0F172A] p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-[#F8FAFC]">
            HEAD TO HEAD
          </h2>
          <button
            onClick={onClose}
            className="rounded-md px-3 py-1 font-mono text-xs text-[#64748B] transition-colors hover:text-[#F8FAFC]"
          >
            ✕ Close
          </button>
        </div>

        {/* Names row */}
        <div className="mb-4 grid grid-cols-[120px_1fr_1fr] gap-2">
          <span />
          {[a, b].map((chad) => (
            <div key={chad.id} className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">{chad.country}</span>
                <span className="font-heading text-sm font-bold text-[#F8FAFC]">
                  {chad.name}
                </span>
                <MogTierBadge tier={chad.mogTier} />
                <button
                  onClick={() => onRemove(chad.id)}
                  className="ml-1 font-mono text-[10px] text-[#64748B] hover:text-[#EF4444]"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-wrap justify-end gap-1">
                {chad.archetypes.map((arch) => (
                  <ArchetypeTag key={arch} archetypeKey={arch} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats comparison */}
        <div className="flex flex-col">
          <StatRow
            label="Chad Score"
            values={[a.score.chadScore, b.score.chadScore]}
          />
          <StatRow
            label="Total Followers"
            values={[
              formatNum(totalFollowers(a.platforms)),
              formatNum(totalFollowers(b.platforms)),
            ]}
          />
          <StatRow
            label="Virality"
            values={[a.score.viralityScore, b.score.viralityScore]}
          />
          <StatRow
            label="Monthly Growth"
            values={[
              `${a.score.monthlyGrowth > 0 ? '+' : ''}${a.score.monthlyGrowth}%`,
              `${b.score.monthlyGrowth > 0 ? '+' : ''}${b.score.monthlyGrowth}%`,
            ]}
          />
          <StatRow
            label="Platforms"
            values={[a.platforms.length, b.platforms.length]}
          />
        </div>

        {/* Sparklines */}
        <div className="mt-4 grid grid-cols-[120px_1fr_1fr] items-center gap-2">
          <span className="font-mono text-[10px] uppercase text-[#64748B]">
            30-Day Trend
          </span>
          {[a, b].map((chad) => (
            <div key={chad.id} className="flex justify-end">
              <Sparkline
                data={chad.sparklineData}
                trend={chad.score.trend}
                width={180}
                height={40}
              />
            </div>
          ))}
        </div>

        {/* Platform bars */}
        <div className="mt-4 grid grid-cols-[120px_1fr_1fr] items-start gap-2">
          <span className="font-mono text-[10px] uppercase text-[#64748B]">
            Platforms
          </span>
          {[a, b].map((chad) => (
            <div key={chad.id}>
              <PlatformBar platforms={chad.platforms} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
