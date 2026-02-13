export type Platform = 'instagram' | 'youtube' | 'tiktok' | 'kick' | 'x';

export type ArchetypeKey =
  | 'prettyboy'
  | 'gigachad'
  | 'mogger'
  | 'pslgod';

export type MogTier = 'S+' | 'S' | 'A' | 'B' | 'C' | '∞';

export type Trend = 'rising' | 'declining' | 'stable' | 'volatile' | 'eternal';

export interface Archetype {
  key: ArchetypeKey;
  label: string;
  color: string;
  icon: string;
}

export interface PlatformMetric {
  platform: Platform;
  username: string;
  followers: number;
}

export interface ChadScore {
  chadScore: number;
  viralityScore: number;
  weeklyGrowth: number;
  monthlyGrowth: number;
  trend: Trend;
}

export interface Chad {
  id: string;
  name: string;
  slug: string;
  handle: string;
  image: string;
  bio: string;
  country: string;
  archetypes: ArchetypeKey[];
  mogTier: MogTier;
  isLegacy: boolean;
  platforms: PlatformMetric[];
  score: ChadScore;
  sparklineData: number[];
}

export interface ScoreInputs {
  totalReach: number;
  engagementRate: number;
  growthVelocity: number;
  viralityScore: number;
  communityVote: number;
}

export type SortField = 'rank' | 'name' | 'chadScore' | 'followers' | 'growth';
export type SortDirection = 'asc' | 'desc';
