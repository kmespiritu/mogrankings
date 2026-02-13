import { MogTier } from '@/lib/types';

interface MogTierBadgeProps {
  tier: MogTier;
  size?: 'sm' | 'md' | 'lg';
}

const TIER_STYLES: Record<MogTier, { bg: string; text: string; glow: string }> = {
  '∞': { bg: '#F59E0B', text: '#000', glow: '0 0 12px rgba(245,158,11,0.6)' },
  'S+': { bg: '#F59E0B', text: '#000', glow: '0 0 8px rgba(245,158,11,0.4)' },
  S: { bg: '#A78BFA', text: '#000', glow: '0 0 8px rgba(167,139,250,0.4)' },
  A: { bg: '#3B82F6', text: '#FFF', glow: 'none' },
  B: { bg: '#64748B', text: '#FFF', glow: 'none' },
  C: { bg: '#334155', text: '#94A3B8', glow: 'none' },
};

export default function MogTierBadge({ tier, size = 'sm' }: MogTierBadgeProps) {
  const style = TIER_STYLES[tier] || TIER_STYLES.B;

  const sizeClasses = {
    sm: 'h-5 w-7 text-[10px]',
    md: 'h-6 w-9 text-xs',
    lg: 'h-8 w-12 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded font-heading font-black ${sizeClasses[size]}`}
      style={{
        backgroundColor: style.bg,
        color: style.text,
        boxShadow: style.glow,
      }}
    >
      {tier}
    </span>
  );
}
