import { Trend } from '@/lib/types';

interface TrendBadgeProps {
  trend: Trend;
  growth?: number;
}

const TREND_CONFIG: Record<Trend, { label: string; icon: string; color: string }> = {
  rising: { label: 'Rising', icon: '↑', color: '#10B981' },
  declining: { label: 'Declining', icon: '↓', color: '#EF4444' },
  stable: { label: 'Stable', icon: '→', color: '#64748B' },
  volatile: { label: 'Volatile', icon: '↕', color: '#F97316' },
  eternal: { label: 'Eternal', icon: '∞', color: '#F59E0B' },
};

export default function TrendBadge({ trend, growth }: TrendBadgeProps) {
  const config = TREND_CONFIG[trend];

  return (
    <span
      className="inline-flex items-center gap-1 font-mono text-[11px] font-medium"
      style={{ color: config.color }}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
      {growth !== undefined && (
        <span className="opacity-70">
          {growth > 0 ? '+' : ''}
          {growth.toFixed(1)}%
        </span>
      )}
    </span>
  );
}
