import { Chad } from '@/lib/types';
import { totalFollowers, formatNum } from '@/lib/utils';

interface StatsBarProps {
  chads: Chad[];
}

export default function StatsBar({ chads }: StatsBarProps) {
  const totalChads = chads.length;
  const totalReach = chads.reduce(
    (sum, c) => sum + totalFollowers(c.platforms),
    0
  );
  const avgScore =
    chads.reduce((sum, c) => sum + c.score.chadScore, 0) / totalChads;
  const risingCount = chads.filter((c) => c.score.trend === 'rising').length;

  const stats = [
    { label: 'CHADS TRACKED', value: totalChads.toString() },
    { label: 'TOTAL REACH', value: formatNum(totalReach) },
    { label: 'AVG CHAD SCORE', value: avgScore.toFixed(1) },
    { label: 'CURRENTLY RISING', value: risingCount.toString() },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-[#1E293B] bg-[#0F172A] px-3 py-2.5 sm:px-4 sm:py-3"
        >
          <div className="font-mono text-[9px] uppercase tracking-wider text-[#64748B] sm:text-[10px]">
            {stat.label}
          </div>
          <div className="mt-0.5 font-heading text-lg font-bold text-[#F8FAFC] sm:mt-1 sm:text-xl">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
