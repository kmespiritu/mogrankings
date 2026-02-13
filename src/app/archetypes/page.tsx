import { SEED_CHADS } from '@/data/seed';
import { ARCHETYPE_LIST } from '@/lib/archetypes';
import { ArchetypeKey } from '@/lib/types';
import ChadCard from '@/components/ChadCard';

export const metadata = {
  title: 'Archetype Leaderboards — Mog Rankings',
  description: 'Browse ranked individuals by aesthetic archetype: Pretty Boy, Giga Chad, Mogger, and PSL God.',
};

function getChadsByArchetype(archetypeKey: ArchetypeKey) {
  return SEED_CHADS
    .filter((c) => c.archetypes.includes(archetypeKey))
    .sort((a, b) => b.score.chadScore - a.score.chadScore);
}

export default function ArchetypesPage() {
  return (
    <div className="ambient-glow flex flex-col gap-8">
      <div className="relative z-10 text-center">
        <h1 className="font-heading text-4xl font-black tracking-tight text-[#F8FAFC]">
          ARCHETYPE <span className="text-[#F59E0B]">LEADERBOARDS</span>
        </h1>
        <p className="mt-2 font-mono text-sm text-[#64748B]">
          Every chad classified. Every aesthetic quantified.
        </p>
      </div>

      {ARCHETYPE_LIST.map((archetype) => {
        const chads = getChadsByArchetype(archetype.key);
        if (chads.length === 0) return null;

        return (
          <section key={archetype.key}>
            <div className="mb-4 flex items-center gap-3">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg text-lg"
                style={{
                  backgroundColor: archetype.color + '22',
                  color: archetype.color,
                }}
              >
                {archetype.icon}
              </span>
              <h2
                className="font-heading text-xl font-bold"
                style={{ color: archetype.color }}
              >
                {archetype.label.toUpperCase()}
              </h2>
              <span className="font-mono text-xs text-[#64748B]">
                {chads.length} chad{chads.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="animate-stagger grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {chads.map((chad, i) => (
                <ChadCard key={chad.id} chad={chad} rank={i + 1} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
