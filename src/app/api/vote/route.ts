import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { calculateElo } from '@/lib/elo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { winnerId, loserId } = body;

    if (!winnerId || !loserId || winnerId === loserId) {
      return NextResponse.json(
        { error: 'Invalid winnerId or loserId' },
        { status: 400 }
      );
    }

    // Get voter IP for rate limiting
    const voterIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Rate limit: 1 vote per matchup pair per IP per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: recentVotes } = await supabase
      .from('votes')
      .select('id')
      .eq('voter_ip', voterIp)
      .gte('created_at', oneHourAgo)
      .or(
        `and(winner_id.eq.${winnerId},loser_id.eq.${loserId}),and(winner_id.eq.${loserId},loser_id.eq.${winnerId})`
      )
      .limit(1);

    if (recentVotes && recentVotes.length > 0) {
      return NextResponse.json(
        { error: 'Rate limited: you already voted on this matchup recently' },
        { status: 429 }
      );
    }

    // Fetch current ELO ratings for both chads
    const { data: winnerData } = await supabase
      .from('elo_ratings')
      .select('*')
      .eq('chad_id', winnerId)
      .single();

    const { data: loserData } = await supabase
      .from('elo_ratings')
      .select('*')
      .eq('chad_id', loserId)
      .single();

    if (!winnerData || !loserData) {
      return NextResponse.json(
        { error: 'Chad not found in ELO ratings' },
        { status: 404 }
      );
    }

    const winnerEloBefore = Number(winnerData.elo_rating);
    const loserEloBefore = Number(loserData.elo_rating);

    // Calculate new ELO
    const { newWinner, newLoser } = calculateElo(winnerEloBefore, loserEloBefore);

    // Update winner ELO
    await supabase
      .from('elo_ratings')
      .update({
        elo_rating: newWinner,
        wins: winnerData.wins + 1,
        total_votes: winnerData.total_votes + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('chad_id', winnerId);

    // Update loser ELO
    await supabase
      .from('elo_ratings')
      .update({
        elo_rating: newLoser,
        losses: loserData.losses + 1,
        total_votes: loserData.total_votes + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('chad_id', loserId);

    // Record the vote
    await supabase.from('votes').insert({
      winner_id: winnerId,
      loser_id: loserId,
      winner_elo_before: winnerEloBefore,
      loser_elo_before: loserEloBefore,
      winner_elo_after: newWinner,
      loser_elo_after: newLoser,
      voter_ip: voterIp,
    });

    return NextResponse.json({
      winner: {
        chad_id: winnerId,
        elo_before: winnerEloBefore,
        elo_after: newWinner,
        change: Math.round((newWinner - winnerEloBefore) * 100) / 100,
      },
      loser: {
        chad_id: loserId,
        elo_before: loserEloBefore,
        elo_after: newLoser,
        change: Math.round((newLoser - loserEloBefore) * 100) / 100,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
