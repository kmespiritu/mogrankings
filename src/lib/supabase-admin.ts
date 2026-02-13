import { createClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client using service_role key.
 * Bypasses RLS — only use in API route handlers (server-side).
 * Never import this in client components.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
