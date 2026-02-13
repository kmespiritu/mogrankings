'use client';

import { Chad } from '@/lib/types';
import { useEloRatings } from '@/lib/useEloRatings';
import Leaderboard from './Leaderboard';

interface LeaderboardWithEloProps {
  chads: Chad[];
}

export default function LeaderboardWithElo({ chads }: LeaderboardWithEloProps) {
  const { ratings } = useEloRatings();

  return <Leaderboard chads={chads} eloRatings={ratings} />;
}
