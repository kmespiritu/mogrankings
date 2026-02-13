import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

function validateAdminKey(request: NextRequest): boolean {
  const url = new URL(request.url);
  const keyFromQuery = url.searchParams.get('key');
  const keyFromHeader = request.headers.get('x-admin-key');
  const adminKey = process.env.ADMIN_SECRET_KEY;

  if (!adminKey) return false;
  return keyFromQuery === adminKey || keyFromHeader === adminKey;
}

/**
 * GET /api/admin/submissions?key=SECRET&status=pending
 * Returns submissions filtered by status, ordered by newest first.
 */
export async function GET(request: NextRequest) {
  if (!validateAdminKey(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const url = new URL(request.url);
  const status = url.searchParams.get('status') || 'pending';

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status filter.' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('submissions')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    console.error('Admin fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions.' }, { status: 500 });
  }

  return NextResponse.json({ submissions: data });
}

/**
 * PATCH /api/admin/submissions?key=SECRET
 * Body: { id, action: 'approve'|'reject', notes? }
 */
export async function PATCH(request: NextRequest) {
  if (!validateAdminKey(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  let body: { id?: string; action?: string; notes?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { id, action, notes } = body;

  if (!id || !action || !['approve', 'reject'].includes(action)) {
    return NextResponse.json(
      { error: 'Required: id (UUID) and action (approve|reject).' },
      { status: 400 }
    );
  }

  const newStatus = action === 'approve' ? 'approved' : 'rejected';

  const { data, error } = await supabaseAdmin
    .from('submissions')
    .update({
      status: newStatus,
      admin_notes: notes || null,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Admin update error:', error);
    return NextResponse.json({ error: 'Failed to update submission.' }, { status: 500 });
  }

  return NextResponse.json({ submission: data, message: `Submission ${newStatus}.` });
}
