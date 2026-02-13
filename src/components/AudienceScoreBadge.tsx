interface AudienceScoreBadgeProps {
  score: number | null;
  size?: 'sm' | 'md' | 'lg';
}

export default function AudienceScoreBadge({
  score,
  size = 'sm',
}: AudienceScoreBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-lg px-3 py-1.5 font-bold',
  };

  if (score === null) {
    return (
      <span
        className={`inline-flex items-center rounded font-mono ${sizeClasses[size]} bg-[#3B82F6]/10 text-[#64748B]`}
      >
        —
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded font-mono ${sizeClasses[size]} bg-[#3B82F6]/10 text-[#3B82F6]`}
    >
      {score}
    </span>
  );
}
