import { Chad, Platform, PlatformMetric } from './types';

export function formatNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}

export function totalFollowers(platforms: PlatformMetric[]): number {
  return platforms.reduce((sum, p) => sum + p.followers, 0);
}

export function getPlatformColor(platform: Platform): string {
  const colors: Record<Platform, string> = {
    instagram: '#E1306C',
    youtube: '#FF0000',
    tiktok: '#00f2ea',
    kick: '#53FC18',
    x: '#9CA3AF',
  };
  return colors[platform];
}

export function getPlatformLabel(platform: Platform): string {
  const labels: Record<Platform, string> = {
    instagram: 'IG',
    youtube: 'YT',
    tiktok: 'TT',
    kick: 'Kick',
    x: '𝕏',
  };
  return labels[platform];
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getChadBySlug(chads: Chad[], slug: string): Chad | undefined {
  return chads.find((c) => c.slug === slug);
}

export function sortChads(
  chads: Chad[],
  field: string,
  direction: 'asc' | 'desc'
): Chad[] {
  const sorted = [...chads].sort((a, b) => {
    let aVal: number;
    let bVal: number;

    switch (field) {
      case 'name':
        return direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case 'chadScore':
        aVal = a.score.chadScore;
        bVal = b.score.chadScore;
        break;
      case 'followers':
        aVal = totalFollowers(a.platforms);
        bVal = totalFollowers(b.platforms);
        break;
      case 'growth':
        aVal = a.score.monthlyGrowth;
        bVal = b.score.monthlyGrowth;
        break;
      default:
        aVal = a.score.chadScore;
        bVal = b.score.chadScore;
    }

    return direction === 'asc' ? aVal - bVal : bVal - aVal;
  });

  return sorted;
}
