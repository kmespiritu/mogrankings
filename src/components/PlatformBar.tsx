import { PlatformMetric } from '@/lib/types';
import { formatNum, getPlatformColor, getPlatformLabel, totalFollowers } from '@/lib/utils';

interface PlatformBarProps {
  platforms: PlatformMetric[];
  compact?: boolean;
}

export default function PlatformBar({ platforms, compact = false }: PlatformBarProps) {
  const total = totalFollowers(platforms);
  if (total === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      {/* Segmented bar */}
      <div className="flex h-1.5 overflow-hidden rounded-full bg-[#1E293B]">
        {platforms.map((p) => (
          <div
            key={p.platform}
            style={{
              width: `${(p.followers / total) * 100}%`,
              backgroundColor: getPlatformColor(p.platform),
            }}
            className="transition-all duration-500"
          />
        ))}
      </div>

      {/* Labels */}
      {!compact && (
        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
          {platforms.map((p) => (
            <span
              key={p.platform}
              className="flex items-center gap-1 font-mono text-[10px]"
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: getPlatformColor(p.platform) }}
              />
              <span className="text-[#64748B]">{getPlatformLabel(p.platform)}</span>
              <span className="text-[#F8FAFC]">{formatNum(p.followers)}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
