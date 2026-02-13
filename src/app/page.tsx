import { SEED_CHADS } from '@/data/seed';
import StatsBar from '@/components/StatsBar';
import LeaderboardWithElo from '@/components/LeaderboardWithElo';

export default function HomePage() {
  const chads = SEED_CHADS;

  return (
    <div className="ambient-glow flex flex-col gap-4 sm:gap-6">
      {/* Hero */}
      <div className="relative z-10 text-center">
        <h1 className="font-heading text-2xl font-black tracking-tight text-[#F8FAFC] sm:text-4xl md:text-5xl">
          THE <span className="text-[#F59E0B]">MOG</span> LEADERBOARD
        </h1>
        <p className="mt-1.5 font-mono text-xs text-[#64748B] sm:mt-2 sm:text-sm">
          Real-time rankings of the internet&apos;s most aesthetic individuals
        </p>
      </div>

      {/* Stats */}
      <StatsBar chads={chads} />

      {/* Leaderboard */}
      <LeaderboardWithElo chads={chads} />
    </div>
  );
}
