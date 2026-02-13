import { SEED_CHADS } from '@/data/seed';
import StatsBar from '@/components/StatsBar';
import Leaderboard from '@/components/Leaderboard';

export default function HomePage() {
  const chads = SEED_CHADS;

  return (
    <div className="ambient-glow flex flex-col gap-6">
      {/* Hero */}
      <div className="relative z-10 text-center">
        <h1 className="font-heading text-4xl font-black tracking-tight text-[#F8FAFC] sm:text-5xl">
          THE <span className="text-[#F59E0B]">CHAD</span> LEADERBOARD
        </h1>
        <p className="mt-2 font-mono text-sm text-[#64748B]">
          Real-time rankings of the internet&apos;s most aesthetic individuals
        </p>
      </div>

      {/* Stats */}
      <StatsBar chads={chads} />

      {/* Leaderboard */}
      <Leaderboard chads={chads} />
    </div>
  );
}
