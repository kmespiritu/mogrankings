import { ArchetypeKey } from '@/lib/types';
import { ARCHETYPES } from '@/lib/archetypes';

interface ArchetypeTagProps {
  archetypeKey: ArchetypeKey;
  size?: 'sm' | 'md';
}

export default function ArchetypeTag({ archetypeKey, size = 'sm' }: ArchetypeTagProps) {
  const archetype = ARCHETYPES[archetypeKey];
  if (!archetype) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-mono font-medium ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
      }`}
      style={{
        color: archetype.color,
        borderColor: archetype.color + '33',
        backgroundColor: archetype.color + '11',
      }}
    >
      <span>{archetype.icon}</span>
      <span>{archetype.label}</span>
    </span>
  );
}
