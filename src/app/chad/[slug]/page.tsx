import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SEED_CHADS } from '@/data/seed';
import { getChadBySlug, formatNum, totalFollowers } from '@/lib/utils';
import MogTierBadge from '@/components/MogTierBadge';
import ArchetypeTag from '@/components/ArchetypeTag';
import TrendBadge from '@/components/TrendBadge';
import Sparkline from '@/components/Sparkline';
import PlatformBar from '@/components/PlatformBar';

interface ChadPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SEED_CHADS.map((chad) => ({ slug: chad.slug }));
}

export async function generateMetadata({ params }: ChadPageProps) {
  const { slug } = await params;
  const chad = getChadBySlug(SEED_CHADS, slug);
  if (!chad) return { title: 'Chad Not Found' };

  return {
    title: `${chad.name} — ChadBlade Stats & Rankings`,
    description: `${chad.name} stats, social media metrics, Chad Score, and archetype analysis on ChadBlade.`,
  };
}

export default async function ChadProfilePage({ params }: ChadPageProps) {
  const { slug } = await params;
  const chad = getChadBySlug(SEED_CHADS, slug);

  if (!chad) {
    notFound();
  }

  const total = totalFollowers(chad.platforms);
  const rank =
    SEED_CHADS.filter((c) => !c.isLegacy)
      .sort((a, b) => b.score.chadScore - a.score.chadScore)
      .findIndex((c) => c.id === chad.id) + 1;

  return (
    <div className="ambient-glow flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-mono text-xs text-[#64748B]">
        <Link href="/" className="hover:text-[#F8FAFC]">
          Leaderboard
        </Link>
        <span>/</span>
        <span className="text-[#F8FAFC]">{chad.name}</span>
      </nav>

      {/* Profile header */}
      <div className="relative z-10 rounded-xl border border-[#1E293B] bg-[#0F172A] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{chad.country}</span>
              <h1 className="font-heading text-3xl font-black text-[#F8FAFC]">
                {chad.name}
              </h1>
              <MogTierBadge tier={chad.mogTier} size="lg" />
              {chad.isLegacy && (
                <span className="rounded bg-[#F59E0B]/10 px-2 py-1 font-mono text-xs text-[#F59E0B]">
                  LEGACY
                </span>
              )}
            </div>
            <span className="font-mono text-sm text-[#64748B]">
              {chad.handle}
            </span>
            <p className="max-w-lg text-sm text-[#94A3B8]">{chad.bio}</p>
            <div className="flex flex-wrap gap-1.5">
              {chad.archetypes.map((a) => (
                <ArchetypeTag key={a} archetypeKey={a} size="md" />
              ))}
            </div>
          </div>

          {/* Score card */}
          <div className="flex flex-col items-center rounded-lg border border-[#1E293B] bg-[#020617] p-5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#64748B]">
              Chad Score
            </span>
            <span className="font-heading text-5xl font-black text-[#F59E0B]">
              {chad.score.chadScore}
            </span>
            <span className="mt-1 font-mono text-xs text-[#64748B]">
              Rank #{chad.isLegacy ? '∞' : rank}
            </span>
            <div className="mt-2">
              <TrendBadge
                trend={chad.score.trend}
                growth={chad.score.monthlyGrowth}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-[#1E293B] bg-[#0F172A] p-4">
          <div className="font-mono text-[10px] uppercase text-[#64748B]">
            Total Reach
          </div>
          <div className="mt-1 font-heading text-2xl font-bold text-[#F8FAFC]">
            {formatNum(total)}
          </div>
        </div>
        <div className="rounded-lg border border-[#1E293B] bg-[#0F172A] p-4">
          <div className="font-mono text-[10px] uppercase text-[#64748B]">
            Virality Score
          </div>
          <div className="mt-1 font-heading text-2xl font-bold text-[#F8FAFC]">
            {chad.score.viralityScore}
          </div>
        </div>
        <div className="rounded-lg border border-[#1E293B] bg-[#0F172A] p-4">
          <div className="font-mono text-[10px] uppercase text-[#64748B]">
            Weekly Growth
          </div>
          <div className="mt-1 font-heading text-2xl font-bold text-[#F8FAFC]">
            {chad.score.weeklyGrowth > 0 ? '+' : ''}
            {chad.score.weeklyGrowth}%
          </div>
        </div>
        <div className="rounded-lg border border-[#1E293B] bg-[#0F172A] p-4">
          <div className="font-mono text-[10px] uppercase text-[#64748B]">
            Platforms
          </div>
          <div className="mt-1 font-heading text-2xl font-bold text-[#F8FAFC]">
            {chad.platforms.length}
          </div>
        </div>
      </div>

      {/* 30-day trend */}
      <div className="rounded-lg border border-[#1E293B] bg-[#0F172A] p-6">
        <h2 className="mb-4 font-heading text-lg font-bold text-[#F8FAFC]">
          30-DAY TREND
        </h2>
        <Sparkline
          data={chad.sparklineData}
          trend={chad.score.trend}
          width={800}
          height={120}
        />
      </div>

      {/* Platform breakdown */}
      <div className="rounded-lg border border-[#1E293B] bg-[#0F172A] p-6">
        <h2 className="mb-4 font-heading text-lg font-bold text-[#F8FAFC]">
          PLATFORM BREAKDOWN
        </h2>
        <PlatformBar platforms={chad.platforms} />
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {chad.platforms.map((p) => (
            <div
              key={p.platform}
              className="flex items-center justify-between rounded-md border border-[#1E293B] bg-[#020617] px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs capitalize text-[#64748B]">
                  {p.platform}
                </span>
                <span className="font-mono text-[10px] text-[#334155]">
                  @{p.username}
                </span>
              </div>
              <span className="font-heading text-lg font-bold text-[#F8FAFC]">
                {formatNum(p.followers)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
