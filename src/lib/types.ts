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

export interface EloRating {
  chad_id: string;
  elo_rating: number;
  wins: number;
  losses: number;
  total_votes: number;
}

export type SortField = 'rank' | 'name' | 'chadScore' | 'followers' | 'growth' | 'audienceScore';
export type SortDirection = 'asc' | 'desc';

// ─── Submissions ─────────────────────────────────────────────────

export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface SubmissionPlatform {
  platform: Platform;
  username: string;
}

export interface Submission {
  id: string;
  name: string;
  handle: string;
  bio: string | null;
  country: string | null;
  archetypes: ArchetypeKey[];
  platforms: SubmissionPlatform[];
  reason: string | null;
  status: SubmissionStatus;
  admin_notes: string | null;
  submitter_ip: string | null;
  created_at: string;
  reviewed_at: string | null;
}

export interface SubmissionFormData {
  name: string;
  handle: string;
  bio: string;
  country: string;
  archetypes: ArchetypeKey[];
  platforms: SubmissionPlatform[];
  reason: string;
}
