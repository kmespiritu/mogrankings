'use client';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  trend?: string;
}

export default function Sparkline({
  data,
  width = 120,
  height = 32,
  color,
  trend = 'stable',
}: SparklineProps) {
  if (!data || data.length === 0) return null;

  const trendColor =
    color ||
    (trend === 'rising'
      ? '#10B981'
      : trend === 'declining'
      ? '#EF4444'
      : trend === 'eternal'
      ? '#F59E0B'
      : trend === 'volatile'
      ? '#F97316'
      : '#64748B');

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;

  const points = data
    .map((val, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((val - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
    >
      <defs>
        <linearGradient id={`grad-${trend}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={trendColor} stopOpacity={0.3} />
          <stop offset="100%" stopColor={trendColor} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={trendColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      {data.length > 0 && (
        <circle
          cx={width - padding}
          cy={
            height -
            padding -
            ((data[data.length - 1] - min) / range) * (height - padding * 2)
          }
          r={2.5}
          fill={trendColor}
        />
      )}
    </svg>
  );
}
