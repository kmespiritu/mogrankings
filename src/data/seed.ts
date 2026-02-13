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

export const SEED_CHADS: Chad[] = [
  {
    id: '1',
    name: 'David Laid',
    slug: 'david-laid',
    handle: '@davidlaid',
    bio: 'Fitness icon. Built different. The modern aesthetic standard.',
    country: '🇺🇸',
    archetypes: ['zyzzcore', 'androgenic', 'mogger'],
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
    id: '2',
    name: 'Chico Lachowski',
    slug: 'chico-lachowski',
    handle: '@chaborz',
    bio: 'The golden ratio personified. Peak male aesthetics.',
    country: '🇧🇷',
    archetypes: ['classic', 'clavicular'],
    mogTier: 'S+',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'chaborz', followers: 580_000 },
      { platform: 'x', username: 'chaborz', followers: 45_000 },
    ],
    score: {
      chadScore: 91.7,
      viralityScore: 82,
      weeklyGrowth: 0.5,
      monthlyGrowth: 2.1,
      trend: 'stable',
    },
    sparklineData: sparkline(580_000, 'flat'),
  },
  {
    id: '3',
    name: 'Francisco Lachowski',
    slug: 'francisco-lachowski',
    handle: '@franciscolachowski',
    bio: 'Supermodel. Face of a generation. The OG genetic lottery winner.',
    country: '🇧🇷',
    archetypes: ['classic', 'clavicular', 'mogger'],
    mogTier: 'S+',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'franciscolachowski', followers: 1_200_000 },
    ],
    score: {
      chadScore: 93.1,
      viralityScore: 79,
      weeklyGrowth: 0.3,
      monthlyGrowth: 1.4,
      trend: 'stable',
    },
    sparklineData: sparkline(1_200_000, 'flat'),
  },
  {
    id: '4',
    name: "Sean O'Pry",
    slug: 'sean-opry',
    handle: '@sfranciscopry',
    bio: 'Highest-paid male model in the world. Hunter eyes that could cut glass.',
    country: '🇺🇸',
    archetypes: ['huntereyes', 'androgenic', 'classic'],
    mogTier: 'S',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'sfranciscopry', followers: 920_000 },
    ],
    score: {
      chadScore: 88.4,
      viralityScore: 71,
      weeklyGrowth: 0.2,
      monthlyGrowth: 0.9,
      trend: 'stable',
    },
    sparklineData: sparkline(920_000, 'flat'),
  },
  {
    id: '5',
    name: 'Jordan Barrett',
    slug: 'jordan-barrett',
    handle: '@jordanbarrett',
    bio: 'Australian supermodel. Cheekbones forged by the gods.',
    country: '🇦🇺',
    archetypes: ['prettyboy', 'clavicular'],
    mogTier: 'S',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'jordanbarrett', followers: 1_500_000 },
      { platform: 'tiktok', username: 'jordanbarrett', followers: 320_000 },
    ],
    score: {
      chadScore: 87.9,
      viralityScore: 74,
      weeklyGrowth: 0.4,
      monthlyGrowth: 1.7,
      trend: 'stable',
    },
    sparklineData: sparkline(1_500_000, 'flat'),
  },
  {
    id: '6',
    name: 'Vinnie Hacker',
    slug: 'vinnie-hacker',
    handle: '@vinniehacker',
    bio: 'TikTok royalty. Gen Z aesthetic standard. Built for the algorithm.',
    country: '🇺🇸',
    archetypes: ['prettyboy', 'huntereyes'],
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
    id: '7',
    name: 'Lucky Blue Smith',
    slug: 'lucky-blue-smith',
    handle: '@luckybluesmith',
    bio: 'Platinum blonde icon. The face that launched a thousand campaigns.',
    country: '🇺🇸',
    archetypes: ['prettyboy', 'clavicular', 'classic'],
    mogTier: 'A',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'luckybluesmith', followers: 3_400_000 },
      { platform: 'tiktok', username: 'luckybluesmith', followers: 650_000 },
    ],
    score: {
      chadScore: 85.3,
      viralityScore: 68,
      weeklyGrowth: 0.1,
      monthlyGrowth: 0.6,
      trend: 'declining',
    },
    sparklineData: sparkline(3_400_000, 'down'),
  },
  {
    id: '8',
    name: 'Dillon Danis',
    slug: 'dillon-danis',
    handle: '@dloedanis',
    bio: 'MMA fighter turned internet menace. Chaos incarnate.',
    country: '🇺🇸',
    archetypes: ['androgenic', 'mogger'],
    mogTier: 'B',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'dloedanis', followers: 3_100_000 },
      { platform: 'x', username: 'dloedanis', followers: 1_800_000 },
      { platform: 'tiktok', username: 'dloedanis', followers: 2_200_000 },
    ],
    score: {
      chadScore: 78.6,
      viralityScore: 92,
      weeklyGrowth: -0.5,
      monthlyGrowth: -1.2,
      trend: 'volatile',
    },
    sparklineData: sparkline(3_100_000, 'volatile'),
  },
  {
    id: '9',
    name: 'Zyzz',
    slug: 'zyzz',
    handle: '@zaborz',
    bio: 'The Godfather. Forever mirin. Son of Zeus, brother of Hercules, father of aesthetics.',
    country: '🇦🇺',
    archetypes: ['zyzzcore', 'androgenic', 'mogger'],
    mogTier: '∞',
    isLegacy: true,
    platforms: [
      { platform: 'instagram', username: 'zaborz', followers: 1_800_000 },
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
  {
    id: '10',
    name: 'Barrett Wilbert',
    slug: 'barrett-wilbert',
    handle: '@barrettwilbert',
    bio: 'British precision. Hunter eyes and androgenic jawline. Underrated mogger.',
    country: '🇬🇧',
    archetypes: ['huntereyes', 'androgenic'],
    mogTier: 'B',
    isLegacy: false,
    platforms: [
      { platform: 'instagram', username: 'barrettwilbert', followers: 180_000 },
      { platform: 'tiktok', username: 'barrettwilbert', followers: 95_000 },
    ],
    score: {
      chadScore: 72.1,
      viralityScore: 45,
      weeklyGrowth: 1.8,
      monthlyGrowth: 7.2,
      trend: 'rising',
    },
    sparklineData: sparkline(180_000, 'up'),
  },
];
