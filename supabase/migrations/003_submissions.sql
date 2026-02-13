-- =============================================================
-- 003: Submissions table for "Submit a Chad" nomination form
-- =============================================================

-- Create submissions table
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  handle TEXT NOT NULL,
  bio TEXT,
  country TEXT,
  archetypes TEXT[] NOT NULL,
  platforms JSONB NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  submitter_ip TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_submissions_status ON submissions(status, created_at DESC);
CREATE INDEX idx_submissions_ip ON submissions(submitter_ip, created_at DESC);
CREATE INDEX idx_submissions_name ON submissions(LOWER(name));
CREATE INDEX idx_submissions_handle ON submissions(LOWER(handle));

-- Enable RLS
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- INSERT policy for anon: can only insert well-formed pending submissions
-- This is the critical defense layer — even direct Supabase bypass is constrained
CREATE POLICY "anon_insert_submissions"
  ON submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    -- Must be pending — attacker cannot self-approve
    status = 'pending'
    -- Cannot set admin fields
    AND reviewed_at IS NULL
    AND admin_notes IS NULL
    -- Field length constraints
    AND LENGTH(name) <= 80
    AND LENGTH(handle) <= 60
    AND (bio IS NULL OR LENGTH(bio) <= 500)
    AND (country IS NULL OR LENGTH(country) <= 10)
    AND (reason IS NULL OR LENGTH(reason) <= 1000)
    -- Array cardinality constraints
    AND CARDINALITY(archetypes) BETWEEN 1 AND 4
    AND JSONB_ARRAY_LENGTH(platforms) BETWEEN 1 AND 5
  );

-- No SELECT for anon — attackers cannot enumerate submissions or extract IPs
-- No UPDATE for anon — attackers cannot change status
-- No DELETE for anon — attackers cannot cover tracks
-- service_role key (used by admin API) bypasses RLS entirely
