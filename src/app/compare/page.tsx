'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { SEED_CHADS } from '@/data/seed';
import { Chad } from '@/lib/types';
import { getRandomMatchup } from '@/lib/matchmaking';
import { eloToAudienceScore } from '@/lib/elo';
import { useEloRatings } from '@/lib/useEloRatings';
import MogTierBadge from '@/components/MogTierBadge';
import ArchetypeTag from '@/components/ArchetypeTag';

interface VoteResult {
  winner: { chad_id: string; elo_before: number; elo_after: number; change: number };
  loser: { chad_id: string; elo_before: number; elo_after: number; change: number };
}

function MatchupCard({
  chad,
  side,
  audienceScore,
  onVote,
  result,
  isWinner,
  disabled,
}: {
  chad: Chad;
  side: 'left' | 'right';
  audienceScore: number | null;
  onVote: () => void;
  result: VoteResult | null;
  isWinner: boolean | null;
  disabled: boolean;
}) {
  const eloChange = result
    ? isWinner
      ? result.winner.change
      : result.loser.change
    : null;

  return (
    <button
      onClick={onVote}
      disabled={disabled}
      className={`matchup-card group relative flex flex-1 flex-col items-center gap-3 rounded-xl border p-4 transition-all sm:gap-4 sm:p-6 md:p-8 ${
        result
          ? isWinner
            ? 'border-[#22C55E] bg-[#22C55E]/5'
            : 'border-[#EF4444]/30 bg-[#EF4444]/5'
          : 'border-[#1E293B] bg-[#0F172A] hover:border-[#F59E0B]/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]'
      } ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
    >
      {/* ELO change overlay */}
      {eloChange !== null && (
        <div
          className={`elo-change-anim absolute top-3 sm:top-4 ${side === 'left' ? 'right-3 sm:right-4' : 'left-3 sm:left-4'} font-heading text-xl font-black sm:text-2xl ${
            eloChange >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'
          }`}
        >
          {eloChange >= 0 ? '+' : ''}
          {eloChange.toFixed(1)}
        </div>
      )}

      {/* Profile photo */}
      <Image
        src={chad.image}
        alt={chad.name}
        width={96}
        height={96}
        className={`h-16 w-16 rounded-full border-2 transition-all sm:h-24 sm:w-24 ${
          result
            ? isWinner
              ? 'border-[#22C55E]'
              : 'border-[#EF4444]/40 opacity-60'
            : 'border-[#1E293B] group-hover:border-[#F59E0B]'
        }`}
      />

      {/* Country + Name */}
      <div className="flex flex-col items-center gap-0.5 sm:gap-1">
        <span className="text-xl sm:text-2xl">{chad.country}</span>
        <h2 className="text-center font-heading text-base font-bold text-[#F8FAFC] sm:text-2xl">
          {chad.name}
        </h2>
        <span className="font-mono text-[10px] text-[#64748B] sm:text-xs">{chad.handle}</span>
      </div>

      {/* Tier + Archetypes */}
      <div className="flex flex-col items-center gap-1.5 sm:gap-2">
        <MogTierBadge tier={chad.mogTier} size="md" />
        <div className="flex flex-wrap justify-center gap-1">
          {chad.archetypes.map((a) => (
            <ArchetypeTag key={a} archetypeKey={a} />
          ))}
        </div>
      </div>

      {/* Audience Score */}
      {audienceScore !== null && (
        <div className="flex flex-col items-center">
          <span className="font-mono text-[10px] uppercase text-[#64748B]">
            Audience Score
          </span>
          <span className="font-heading text-xl font-black text-[#3B82F6] sm:text-2xl">
            {audienceScore}
          </span>
        </div>
      )}

      {/* Vote prompt */}
      {!result && !disabled && (
        <span className="mt-auto rounded-md border border-[#1E293B] bg-[#020617] px-3 py-1.5 font-mono text-[10px] text-[#64748B] transition-all group-hover:border-[#F59E0B] group-hover:text-[#F59E0B] sm:px-4 sm:py-2 sm:text-xs">
          THIS ONE MOGS
        </span>
      )}

      {/* Result label */}
      {result && (
        <span
          className={`mt-auto font-heading text-sm font-bold ${
            isWinner ? 'text-[#22C55E]' : 'text-[#EF4444]'
          }`}
        >
          {isWinner ? 'MOGS' : 'MOGGED'}
        </span>
      )}
    </button>
  );
}

export default function WhoMogsWhoPage() {
  const { ratings, refetch } = useEloRatings();
  const [matchup, setMatchup] = useState<[Chad, Chad] | null>(null);
  const [voteResult, setVoteResult] = useState<VoteResult | null>(null);
  const [voting, setVoting] = useState(false);
  const [sessionVotes, setSessionVotes] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const newMatchup = useCallback(() => {
    setVoteResult(null);
    setError(null);
    setMatchup(getRandomMatchup(SEED_CHADS));
  }, []);

  // Load first matchup
  useEffect(() => {
    newMatchup();
  }, [newMatchup]);

  async function handleVote(winnerId: string, loserId: string) {
    if (voting || voteResult) return;
    setVoting(true);
    setError(null);

    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ winnerId, loserId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Vote failed');
        setVoting(false);
        return;
      }

      setVoteResult(data as VoteResult);
      setSessionVotes((prev) => prev + 1);
      await refetch();

      // Auto-advance after 2 seconds
      setTimeout(() => {
        newMatchup();
      }, 2000);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setVoting(false);
    }
  }

  if (!matchup) {
    return (
      <div className="flex items-center justify-center py-24">
        <span className="font-mono text-sm text-[#64748B]">Loading matchup...</span>
      </div>
    );
  }

  const [chadA, chadB] = matchup;
  const scoreA = ratings.get(chadA.id);
  const scoreB = ratings.get(chadB.id);
  const audienceA =
    scoreA && scoreA.total_votes > 0
      ? eloToAudienceScore(scoreA.elo_rating)
      : null;
  const audienceB =
    scoreB && scoreB.total_votes > 0
      ? eloToAudienceScore(scoreB.elo_rating)
      : null;

  return (
    <div className="ambient-glow flex flex-col gap-4 sm:gap-6">
      {/* Header */}
      <div className="relative z-10 text-center">
        <h1 className="font-heading text-2xl font-black tracking-tight text-[#F8FAFC] sm:text-4xl">
          WHO <span className="text-[#F59E0B]">MOGS</span> WHO
        </h1>
        <p className="mt-1.5 font-mono text-xs text-[#64748B] sm:mt-2 sm:text-sm">
          Pick the chad that mogs. Your votes shape the Audience Score.
        </p>
      </div>

      {/* Session stats */}
      <div className="flex justify-center gap-4">
        <span className="rounded-md border border-[#1E293B] bg-[#0F172A] px-3 py-1.5 font-mono text-xs text-[#64748B]">
          Votes this session:{' '}
          <span className="text-[#F59E0B]">{sessionVotes}</span>
        </span>
      </div>

      {/* Matchup area */}
      <div className="relative flex flex-col items-stretch gap-3 sm:flex-row sm:gap-6">
        <MatchupCard
          chad={chadA}
          side="left"
          audienceScore={audienceA}
          onVote={() => handleVote(chadA.id, chadB.id)}
          result={voteResult}
          isWinner={voteResult ? voteResult.winner.chad_id === chadA.id : null}
          disabled={voting || !!voteResult}
        />

        {/* VS divider — desktop */}
        <div className="vs-pulse absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:flex">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#1E293B] bg-[#020617] font-heading text-xl font-black text-[#F59E0B]">
            VS
          </span>
        </div>

        {/* VS divider — mobile */}
        <div className="flex items-center justify-center sm:hidden">
          <span className="font-heading text-lg font-black text-[#F59E0B]">
            VS
          </span>
        </div>

        <MatchupCard
          chad={chadB}
          side="right"
          audienceScore={audienceB}
          onVote={() => handleVote(chadB.id, chadA.id)}
          result={voteResult}
          isWinner={voteResult ? voteResult.winner.chad_id === chadB.id : null}
          disabled={voting || !!voteResult}
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="text-center font-mono text-xs text-[#EF4444]">
          {error}
        </div>
      )}

      {/* Skip button */}
      <div className="flex justify-center">
        <button
          onClick={newMatchup}
          disabled={voting}
          className="rounded-md border border-[#1E293B] bg-[#0F172A] px-4 py-2 font-mono text-xs text-[#64748B] transition-colors hover:border-[#64748B] hover:text-[#F8FAFC] disabled:opacity-50 sm:px-6"
        >
          SKIP — NEW MATCHUP
        </button>
      </div>
    </div>
  );
}
