import { NextResponse } from 'next/server';
import { SEED_CHADS } from '@/data/seed';

export async function GET() {
  return NextResponse.json(SEED_CHADS);
}
