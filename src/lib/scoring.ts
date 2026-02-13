import { ScoreInputs } from './types';

export function computeChadScore(inputs: ScoreInputs): number {
  const reachScore = Math.min(100, Math.log10(inputs.totalReach) * 15);
  const engagementScore = Math.min(100, inputs.engagementRate * 10);
  const growthScore = Math.min(100, Math.max(0, inputs.growthVelocity * 3 + 50));
  const viralityScore = inputs.viralityScore;
  const communityScore = inputs.communityVote;

  const weighted =
    reachScore * 0.25 +
    engagementScore * 0.25 +
    growthScore * 0.20 +
    viralityScore * 0.15 +
    communityScore * 0.15;

  return Math.round(weighted * 10) / 10;
}
