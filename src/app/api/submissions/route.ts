import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateSubmission } from '@/lib/validation';
import { SEED_CHADS } from '@/data/seed';

export async function POST(request: NextRequest) {
  try {
    // ── Payload size guard ──
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 10240) {
      return NextResponse.json(
        { error: 'Payload too large.' },
        { status: 413 }
      );
    }

    // ── IP extraction (same pattern as vote route) ──
    const submitterIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // ── Rate limit: 3 submissions per IP per 24 hours ──
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: recentSubmissions, error: rateLimitError } = await supabaseAdmin
      .from('submissions')
      .select('id')
      .eq('submitter_ip', submitterIp)
      .gte('created_at', oneDayAgo);

    if (rateLimitError) {
      console.error('Rate limit check failed:', rateLimitError);
      return NextResponse.json(
        { error: 'Server error during rate limit check.' },
        { status: 500 }
      );
    }

    if (recentSubmissions && recentSubmissions.length >= 3) {
      return NextResponse.json(
        { error: 'Rate limited: maximum 3 submissions per 24 hours.' },
        { status: 429 }
      );
    }

    // ── Parse body ──
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body.' },
        { status: 400 }
      );
    }

    // ── Validate ──
    const validation = validateSubmission(body as Record<string, unknown>);
    if (!validation.valid || !validation.sanitized) {
      return NextResponse.json(
        { error: 'Validation failed.', details: validation.errors },
        { status: 400 }
      );
    }

    const { name, handle, bio, country, archetypes, platforms, reason } = validation.sanitized;

    // ── Duplicate detection: check against seed data ──
    const nameLower = name.toLowerCase();
    const handleLower = handle.toLowerCase();

    const existingChad = SEED_CHADS.find(
      (c) =>
        c.name.toLowerCase() === nameLower ||
        c.handle.toLowerCase() === handleLower
    );

    if (existingChad) {
      return NextResponse.json(
        { error: `${existingChad.name} is already on the leaderboard.` },
        { status: 409 }
      );
    }

    // ── Duplicate detection: check against pending submissions in DB ──
    const { data: pendingDupes } = await supabaseAdmin
      .from('submissions')
      .select('id, name')
      .eq('status', 'pending')
      .or(`name.ilike.${nameLower},handle.ilike.${handleLower}`)
      .limit(1);

    if (pendingDupes && pendingDupes.length > 0) {
      return NextResponse.json(
        { error: 'This person has already been nominated and is pending review.' },
        { status: 409 }
      );
    }

    // ── Insert via anon client (goes through RLS as defense-in-depth) ──
    const { error: insertError } = await supabase
      .from('submissions')
      .insert({
        name,
        handle,
        bio: bio || null,
        country: country || null,
        archetypes,
        platforms,
        reason: reason || null,
        status: 'pending',
        submitter_ip: submitterIp,
      });

    if (insertError) {
      console.error('Insert failed:', insertError);
      return NextResponse.json(
        { error: 'Failed to submit nomination.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Nomination received. We\'ll review it shortly.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
