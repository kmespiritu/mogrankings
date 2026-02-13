/**
 * ELO Rating System for "Who Mogs Who"
 *
 * Standard ELO with K-factor 32 (chess rapid).
 * Initial rating: 1500
 * Audience Score: maps ELO [1200, 1800] → [0, 100]
 */

const K_FACTOR = 32;

/** Calculate expected score (probability of winning) */
function expectedScore(ratingA: number, ratingB: number): number {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

/** Calculate new ELO ratings after a match */
export function calculateElo(
  winnerRating: number,
  loserRating: number
): { newWinner: number; newLoser: number } {
  const expectedWinner = expectedScore(winnerRating, loserRating);
  const expectedLoser = expectedScore(loserRating, winnerRating);

  const newWinner = winnerRating + K_FACTOR * (1 - expectedWinner);
  const newLoser = loserRating + K_FACTOR * (0 - expectedLoser);

  return {
    newWinner: Math.round(newWinner * 100) / 100,
    newLoser: Math.round(newLoser * 100) / 100,
  };
}

/** Map ELO rating to Audience Score (0-100 scale) */
export function eloToAudienceScore(elo: number): number {
  // Map [1200, 1800] → [0, 100], clamped
  const MIN_ELO = 1200;
  const MAX_ELO = 1800;
  const score = ((elo - MIN_ELO) / (MAX_ELO - MIN_ELO)) * 100;
  return Math.round(Math.max(0, Math.min(100, score)));
}
