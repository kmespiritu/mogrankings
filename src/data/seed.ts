import { Chad } from '@/lib/types';

function sparkline(base: number, trend: 'up' | 'down' | 'flat' | 'volatile'): number[] {
  const data: number[] = [];
  let val = base;
  for (let i = 0; i < 30; i++) {
    const noise = (Math.random() - 0.5) * base * 0.02;
    switch (trend) {
      case 'up':
        val += base * 0.005 + noise;
        break;
      case 'down':
        val -= base * 0.003 + noise;
        break;
      case 'volatile':
        val += (Math.random() - 0.5) * base * 0.04;
        break;
      default:
        val += noise;
    }
    data.push(Math.round(Math.max(0, val)));
  }
  return data;
}

function avatar(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1E293B&color=F59E0B&size=128&bold=true&format=png`;
}

function photo(slug: string, ext: string = 'jpg'): string {
  return `/photos/${slug}.${ext}`;
}

export const SEED_CHADS: Chad[] = [
  // ─── LEGACY ────────────────────────────────────────────────
  {
    id: '1',
    name: 'Zyzz',
    slug: 'zyzz',
    handle: '@zyzz',
    image: photo('zyzz'),
    bio: 'The Godfather. Forever mirin. Son of Zeus, brother of Hercules, father of aesthetics.',
    country: '🇦🇺',
    archetypes: ['mogger', 'gigachad'],
    mogTier: '∞',
    isLegacy: true,
    platforms: [
      { platform: 'instagram', username: 'zyzz', followers: 1_800_000 },
      { platform: 'youtube', username: 'Zyzz', followers: 850_000 },
    ],
    score: {
      chadScore: 99.9,
      viralityScore: 100,
      weeklyGrowth: 0,
      monthlyGrowth: 0,
      trend: 'eternal',
    },
    sparklineData: Array(30).fill(99.9),
  },

  // ─── PSL GODS / SUPERMODELS ────────────────────────────────
  {
    id: '2',
    name: 'Francisco "Chico" Lachowski',
    slug: 'chico-lachowski',
    handle: '@chico_lachowski',
    image: photo('chico-lachowski'),
    bio: 'Ford Supermodel of the World. The golden ratio personified. One of the PSL Holy Trinity.',
    country: '🇧🇷',
    archetypes: ['prettyboy', 'pslgod'],
    mogTier: 'S+',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'chico_lachowski', followers: 3_000_000 },
    ],
    score: {
      chadScore: 96.5,
      viralityScore: 82,
      weeklyGrowth: 0.3,
      monthlyGrowth: 1.4,
      trend: 'stable',
    },
    sparklineData: sparkline(3_000_000, 'flat'),
  },
  {
    id: '3',
    name: "Sean O'Pry",
    slug: 'sean-opry',
    handle: '@seanopry55',
    image: photo('sean-opry'),
    bio: "World's highest-paid male model. The ultimate PSL God. Blank Space face.",
    country: '🇺🇸',
    archetypes: ['pslgod', 'mogger'],
    mogTier: 'S+',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'seanopry55', followers: 784_000 },
    ],
    score: {
      chadScore: 95.8,
      viralityScore: 71,
      weeklyGrowth: 0.2,
      monthlyGrowth: 0.9,
      trend: 'stable',
    },
    sparklineData: sparkline(784_000, 'flat'),
  },
  {
    id: '4',
    name: 'Jordan Barrett',
    slug: 'jordan-barrett',
    handle: '@iblamejordan',
    image: photo('jordan-barrett'),
    bio: 'Australian supermodel. Cheekbones forged by the gods. Completes the PSL Holy Trinity.',
    country: '🇦🇺',
    archetypes: ['prettyboy', 'pslgod'],
    mogTier: 'S+',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'iblamejordan', followers: 4_200_000 },
      { platform: 'tiktok', username: 'jordanbarrett', followers: 320_000 },
    ],
    score: {
      chadScore: 95.1,
      viralityScore: 79,
      weeklyGrowth: 0.4,
      monthlyGrowth: 1.7,
      trend: 'stable',
    },
    sparklineData: sparkline(4_200_000, 'flat'),
  },
  {
    id: '5',
    name: 'David Gandy',
    slug: 'david-gandy',
    handle: '@davidgandy_official',
    image: photo('david-gandy'),
    bio: 'Highest-grossing male model in history. Dolce & Gabbana icon. The definition of maesthetic.',
    country: '🇬🇧',
    archetypes: ['gigachad', 'pslgod'],
    mogTier: 'S',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'davidgandy_official', followers: 1_000_000 },
    ],
    score: {
      chadScore: 90.2,
      viralityScore: 65,
      weeklyGrowth: 0.1,
      monthlyGrowth: 0.5,
      trend: 'stable',
    },
    sparklineData: sparkline(1_000_000, 'flat'),
  },
  {
    id: '6',
    name: 'Matt Bomer',
    slug: 'matt-bomer',
    handle: '@mattbomer',
    image: photo('matt-bomer', 'webp'),
    bio: 'White Collar. Golden Globe winner. Closest living actor to 7.5 PSL per community consensus.',
    country: '🇺🇸',
    archetypes: ['prettyboy', 'pslgod'],
    mogTier: 'S',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'mattbomer', followers: 2_000_000 },
    ],
    score: {
      chadScore: 89.5,
      viralityScore: 62,
      weeklyGrowth: 0.1,
      monthlyGrowth: 0.4,
      trend: 'stable',
    },
    sparklineData: sparkline(2_000_000, 'flat'),
  },
  {
    id: '7',
    name: 'Ian Somerhalder',
    slug: 'ian-somerhalder',
    handle: '@iansomerhalder',
    image: photo('ian-somerhalder', 'webp'),
    bio: 'Damon Salvatore. One of the most symmetrical faces in entertainment history.',
    country: '🇺🇸',
    archetypes: ['prettyboy', 'pslgod'],
    mogTier: 'S',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'iansomerhalder', followers: 25_000_000 },
    ],
    score: {
      chadScore: 88.7,
      viralityScore: 70,
      weeklyGrowth: 0.05,
      monthlyGrowth: 0.2,
      trend: 'stable',
    },
    sparklineData: sparkline(25_000_000, 'flat'),
  },
  {
    id: '8',
    name: 'Marlon Teixeira',
    slug: 'marlon-teixeira',
    handle: '@marlontx',
    image: photo('marlon-teixeira'),
    bio: 'Brazilian model. Chanel, Balmain, Dolce & Gabbana, Armani. Chad-tier bone structure.',
    country: '🇧🇷',
    archetypes: ['mogger', 'pslgod'],
    mogTier: 'A',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'marlontx', followers: 559_000 },
    ],
    score: {
      chadScore: 86.3,
      viralityScore: 55,
      weeklyGrowth: 0.1,
      monthlyGrowth: 0.3,
      trend: 'stable',
    },
    sparklineData: sparkline(559_000, 'flat'),
  },

  // ─── FITNESS / AESTHETICS ─────────────────────────────────
  {
    id: '9',
    name: 'David Laid',
    slug: 'david-laid',
    handle: '@davidlaid',
    image: photo('david-laid'),
    bio: 'Fitness icon. Built different. The modern aesthetic standard. Gymshark Creative Director of Lifting.',
    country: '🇺🇸',
    archetypes: ['mogger', 'gigachad'],
    mogTier: 'S+',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'davidlaid', followers: 6_200_000 },
      { platform: 'youtube', username: 'DavidLaid', followers: 2_100_000 },
      { platform: 'tiktok', username: 'davidlaid', followers: 4_500_000 },
    ],
    score: {
      chadScore: 94.2,
      viralityScore: 88,
      weeklyGrowth: 1.2,
      monthlyGrowth: 4.8,
      trend: 'rising',
    },
    sparklineData: sparkline(6_200_000, 'up'),
  },
  {
    id: '10',
    name: 'Jeff Seid',
    slug: 'jeff-seid',
    handle: '@jeff_seid',
    image: photo('jeff-seid'),
    bio: "Youngest IFBB Pro ever. Defined the aesthetic era of bodybuilding. Zyzz's spiritual successor.",
    country: '🇺🇸',
    archetypes: ['gigachad', 'mogger'],
    mogTier: 'A',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'jeff_seid', followers: 5_000_000 },
      { platform: 'youtube', username: 'JeffSeid', followers: 1_200_000 },
    ],
    score: {
      chadScore: 85.8,
      viralityScore: 72,
      weeklyGrowth: 0.2,
      monthlyGrowth: 0.8,
      trend: 'stable',
    },
    sparklineData: sparkline(5_000_000, 'flat'),
  },

  // ─── SOCIAL MEDIA / GEN Z ─────────────────────────────────
  {
    id: '11',
    name: 'Vinnie Hacker',
    slug: 'vinnie-hacker',
    handle: '@vinniehacker',
    image: photo('vinnie-hacker'),
    bio: 'TikTok royalty. Gen Z aesthetic standard. Built for the algorithm.',
    country: '🇺🇸',
    archetypes: ['prettyboy', 'mogger'],
    mogTier: 'A',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'vinniehacker', followers: 5_800_000 },
      { platform: 'tiktok', username: 'vinniehacker', followers: 14_200_000 },
      { platform: 'youtube', username: 'VinnieHacker', followers: 980_000 },
      { platform: 'x', username: 'vinniehacker', followers: 420_000 },
    ],
    score: {
      chadScore: 92.5,
      viralityScore: 95,
      weeklyGrowth: 0.8,
      monthlyGrowth: 3.2,
      trend: 'rising',
    },
    sparklineData: sparkline(14_200_000, 'up'),
  },
  {
    id: '12',
    name: 'Lucky Blue Smith',
    slug: 'lucky-blue-smith',
    handle: '@luckybsmith',
    image: photo('lucky-blue-smith'),
    bio: 'Platinum blonde icon. The face that launched a thousand campaigns. Husband of Nara Smith.',
    country: '🇺🇸',
    archetypes: ['prettyboy'],
    mogTier: 'A',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'luckybsmith', followers: 3_000_000 },
      { platform: 'tiktok', username: 'luckybluesmith', followers: 650_000 },
    ],
    score: {
      chadScore: 85.3,
      viralityScore: 68,
      weeklyGrowth: 0.1,
      monthlyGrowth: 0.6,
      trend: 'declining',
    },
    sparklineData: sparkline(3_000_000, 'down'),
  },
  {
    id: '13',
    name: 'Henry Cavill',
    slug: 'henry-cavill',
    handle: '@henrycavill',
    image: photo('henry-cavill'),
    bio: 'Superman. The Witcher. The jawline that broke the internet.',
    country: '🇬🇧',
    archetypes: ['gigachad', 'mogger'],
    mogTier: 'S',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'henrycavill', followers: 29_000_000 },
    ],
    score: {
      chadScore: 91.1,
      viralityScore: 85,
      weeklyGrowth: 0.3,
      monthlyGrowth: 1.1,
      trend: 'stable',
    },
    sparklineData: sparkline(29_000_000, 'flat'),
  },
  {
    id: '14',
    name: 'Nick Bateman',
    slug: 'nick-bateman',
    handle: '@nick__bateman',
    image: photo('nick-bateman'),
    bio: 'Instagram model pioneer. 4x world karate champion. Jawline could cut diamonds.',
    country: '🇨🇦',
    archetypes: ['gigachad', 'mogger'],
    mogTier: 'A',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'nick__bateman', followers: 6_500_000 },
    ],
    score: {
      chadScore: 84.7,
      viralityScore: 63,
      weeklyGrowth: 0.05,
      monthlyGrowth: 0.3,
      trend: 'stable',
    },
    sparklineData: sparkline(6_500_000, 'flat'),
  },
  {
    id: '15',
    name: 'Toni Mahfud',
    slug: 'toni-mahfud',
    handle: '@tonimahfud',
    image: avatar('Toni Mahfud'),
    bio: 'Model, artist, photographer. Tommy Hilfiger, Gillette. The Renaissance mogger.',
    country: '🇩🇪',
    archetypes: ['prettyboy', 'mogger'],
    mogTier: 'A',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'tonimahfud', followers: 3_000_000 },
      { platform: 'youtube', username: 'ToniMahfud', followers: 500_000 },
    ],
    score: {
      chadScore: 83.9,
      viralityScore: 60,
      weeklyGrowth: 0.1,
      monthlyGrowth: 0.4,
      trend: 'stable',
    },
    sparklineData: sparkline(3_000_000, 'flat'),
  },

  // ─── MEME TIER ─────────────────────────────────────────────
  {
    id: '17',
    name: 'GigaChad',
    slug: 'gigachad',
    handle: '@berlin.1969',
    image: photo('gigachad'),
    bio: 'Ernest Khalimov. The meme. The myth. The jawline. Sleek\'N\'Tears art project turned cultural icon.',
    country: '🇷🇺',
    archetypes: ['gigachad'],
    mogTier: '∞',
    isLegacy: true,
    platforms: [
      { platform: 'instagram', username: 'berlin.1969', followers: 1_000_000 },
    ],
    score: {
      chadScore: 99.0,
      viralityScore: 100,
      weeklyGrowth: 0,
      monthlyGrowth: 0,
      trend: 'eternal',
    },
    sparklineData: Array(30).fill(99.0),
  },

  // ─── LOOKSMAXXING INFLUENCERS ──────────────────────────────
  {
    id: '18',
    name: 'Clavicular',
    slug: 'clavicular',
    handle: '@clavicular0',
    image: photo('clavicular'),
    bio: 'Braden Eric Peters. Most recognizable face of the looksmaxxing movement. Hardmaxxing pioneer.',
    country: '🇺🇸',
    archetypes: ['mogger'],
    mogTier: 'A',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'clavicular', followers: 163_000 },
      { platform: 'tiktok', username: 'kingclavicular', followers: 700_000 },
      { platform: 'x', username: 'clavicular0', followers: 30_000 },
      { platform: 'kick', username: 'clavicular', followers: 15_000 },
    ],
    score: {
      chadScore: 82.4,
      viralityScore: 78,
      weeklyGrowth: 2.1,
      monthlyGrowth: 8.5,
      trend: 'rising',
    },
    sparklineData: sparkline(700_000, 'up'),
  },
  {
    id: '19',
    name: 'Dragomaxxer',
    slug: 'dragomaxxer',
    handle: '@dragomaxxer',
    image: photo('dragomaxxer'),
    bio: 'Looksmaxxing streamer. Kick grinder. "It\'s never over." Reta House founder.',
    country: '🇪🇸',
    archetypes: ['mogger'],
    mogTier: 'C',
    isLegacy: false,
    platforms: [
      { platform: 'kick', username: 'dragomaxxer', followers: 2_393 },
      { platform: 'x', username: 'dragomaxxer', followers: 5_000 },
      { platform: 'tiktok', username: 'dragomaxxer', followers: 8_000 },
    ],
    score: {
      chadScore: 58.2,
      viralityScore: 32,
      weeklyGrowth: 3.5,
      monthlyGrowth: 12.1,
      trend: 'rising',
    },
    sparklineData: sparkline(8_000, 'up'),
  },
  {
    id: '20',
    name: 'Androgenic',
    slug: 'androgenic',
    handle: '@androgen.ic',
    image: photo('androgenic'),
    bio: 'Framepill pioneer. Non-invasive skeletal development. Transformation king. Looksmaxxing coach.',
    country: '🇺🇸',
    archetypes: ['mogger'],
    mogTier: 'B',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'androgen.ic', followers: 87_000 },
      { platform: 'tiktok', username: 'androgenic_', followers: 22_000 },
    ],
    score: {
      chadScore: 71.5,
      viralityScore: 55,
      weeklyGrowth: 1.5,
      monthlyGrowth: 6.2,
      trend: 'rising',
    },
    sparklineData: sparkline(87_000, 'up'),
  },
  {
    id: '21',
    name: 'Syrian Psycho',
    slug: 'syrian-psycho',
    handle: '@syrianpsycho',
    image: photo('syrian-psycho'),
    bio: 'Kareem Shami. Mogwarts Academy founder. ASCENDED.CLUB. Pioneer of looksmaxxing culture.',
    country: '🇸🇾',
    archetypes: ['mogger'],
    mogTier: 'A',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'syrianpsycho', followers: 250_000 },
      { platform: 'tiktok', username: 'syrianpsycho', followers: 1_800_000 },
    ],
    score: {
      chadScore: 80.3,
      viralityScore: 82,
      weeklyGrowth: 1.8,
      monthlyGrowth: 7.0,
      trend: 'rising',
    },
    sparklineData: sparkline(1_800_000, 'up'),
  },
];
