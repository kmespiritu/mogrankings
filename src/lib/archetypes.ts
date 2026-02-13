import { Archetype, ArchetypeKey } from './types';

export const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  prettyboy: { key: 'prettyboy', label: 'Pretty Boy', color: '#A78BFA', icon: '✦' },
  gigachad: { key: 'gigachad', label: 'Giga Chad', color: '#EF4444', icon: '▲' },
  mogger: { key: 'mogger', label: 'Mogger', color: '#EC4899', icon: '★' },
  pslgod: { key: 'pslgod', label: 'PSL God', color: '#F59E0B', icon: '◆' },
};

export const ARCHETYPE_LIST = Object.values(ARCHETYPES);
