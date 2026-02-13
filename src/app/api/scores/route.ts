import { NextResponse } from 'next/server';
import { SEED_CHADS } from '@/data/seed';

export async function GET() {
  const scores = SEED_CHADS.map((chad) => ({
    id: chad.id,
    name: chad.name,
    slug: chad.slug,
    ...chad.score,
  }));

  return NextResponse.json(scores);
}
