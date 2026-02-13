-- ═══════════════════════════════════════════════════════════════
-- CRITICAL SECURITY FIX: Lock down ELO ratings and votes tables
--
-- BEFORE: anon could UPDATE elo_ratings and INSERT votes directly,
-- bypassing all API validation and rate limiting.
-- AFTER: Only the service_role key (used by API routes) can write.
-- Anon can still SELECT (read) both tables.
-- ═══════════════════════════════════════════════════════════════

-- 1. Remove the dangerous anon UPDATE policy on elo_ratings
DROP POLICY IF EXISTS "elo_ratings_update" ON elo_ratings;

-- 2. Remove the dangerous anon INSERT policy on votes
DROP POLICY IF EXISTS "votes_insert" ON votes;

-- 3. Add INSERT policy for elo_ratings (for service_role seeding new chads)
-- Note: service_role bypasses RLS entirely, so this is just defense-in-depth
CREATE POLICY "elo_ratings_insert_service" ON elo_ratings
  FOR INSERT TO anon WITH CHECK (false);

CREATE POLICY "elo_ratings_update_service" ON elo_ratings
  FOR UPDATE TO anon USING (false);

CREATE POLICY "votes_insert_service" ON votes
  FOR INSERT TO anon WITH CHECK (false);

-- Verify: anon can only SELECT on both tables now.
-- All writes go through supabaseAdmin (service_role) which bypasses RLS.
