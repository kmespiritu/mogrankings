import { Archetype, ArchetypeKey } from './types';

export const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  clavicular: { key: 'clavicular', label: 'Clavicular', color: '#F59E0B', icon: '◆' },
  androgenic: { key: 'androgenic', label: 'Androgenic', color: '#EF4444', icon: '▲' },
  prettyboy: { key: 'prettyboy', label: 'Pretty Boy', color: '#A78BFA', icon: '✦' },
  classic: { key: 'classic', label: 'Classic', color: '#3B82F6', icon: '■' },
  zyzzcore: { key: 'zyzzcore', label: 'Zyzz-core', color: '#10B981', icon: '⚡' },
  huntereyes: { key: 'huntereyes', label: 'Hunter Eyes', color: '#F97316', icon: '◈' },
  mogger: { key: 'mogger', label: 'Mogger', color: '#EC4899', icon: '★' },
};

export const ARCHETYPE_LIST = Object.values(ARCHETYPES);
