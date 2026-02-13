'use client';

import { useEloRatings } from '@/lib/useEloRatings';
import { eloToAudienceScore } from '@/lib/elo';

interface AudienceScoreCardProps {
  chadId: string;
}

export default function AudienceScoreCard({ chadId }: AudienceScoreCardProps) {
  const { ratings, loading } = useEloRatings();
  const rating = ratings.get(chadId);

  if (loading) {
    return (
      <div className="flex flex-col items-center rounded-lg border border-[#1E293B] bg-[#020617] p-5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#64748B]">
          Audience Score
        </span>
        <span className="mt-1 font-mono text-xs text-[#64748B]">
          Loading...
        </span>
      </div>
    );
  }

  if (!rating || rating.total_votes === 0) {
    return (
      <div className="flex flex-col items-center rounded-lg border border-[#1E293B] bg-[#020617] p-5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#64748B]">
          Audience Score
        </span>
        <span className="font-heading text-5xl font-black text-[#3B82F6]/30">
          —
        </span>
        <span className="mt-1 font-mono text-xs text-[#64748B]">
          No votes yet
        </span>
      </div>
    );
  }

  const audienceScore = eloToAudienceScore(rating.elo_rating);
  const winRate =
    rating.total_votes > 0
      ? Math.round((rating.wins / rating.total_votes) * 100)
      : 0;

  return (
    <div className="flex flex-col items-center rounded-lg border border-[#1E293B] bg-[#020617] p-5">
      <span className="font-mono text-[10px] uppercase tracking-wider text-[#64748B]">
        Audience Score
      </span>
      <span className="font-heading text-5xl font-black text-[#3B82F6]">
        {audienceScore}
      </span>
      <div className="mt-2 flex items-center gap-3 font-mono text-xs text-[#64748B]">
        <span>
          <span className="text-[#22C55E]">{rating.wins}W</span>
          {' / '}
          <span className="text-[#EF4444]">{rating.losses}L</span>
        </span>
        <span className="text-[#334155]">|</span>
        <span>{winRate}% win rate</span>
      </div>
      <span className="mt-1 font-mono text-[10px] text-[#334155]">
        ELO: {Math.round(rating.elo_rating)}
      </span>
    </div>
  );
}
