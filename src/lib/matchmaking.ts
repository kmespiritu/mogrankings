import { Chad } from './types';

/**
 * Get a random matchup pair from the chad pool.
 * Excludes legacy chads (Zyzz, GigaChad) from matchups.
 */
export function getRandomMatchup(chads: Chad[]): [Chad, Chad] {
  const eligible = chads.filter((c) => !c.isLegacy);

  if (eligible.length < 2) {
    throw new Error('Not enough eligible chads for a matchup');
  }

  // Pick two random distinct chads
  const indexA = Math.floor(Math.random() * eligible.length);
  let indexB = Math.floor(Math.random() * (eligible.length - 1));
  if (indexB >= indexA) indexB += 1;

  return [eligible[indexA], eligible[indexB]];
}
