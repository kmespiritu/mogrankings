-- ChadBlade Database Schema
-- Phase 2: Apply this migration when connecting Supabase

-- Core chad profiles
CREATE TABLE chads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  handle TEXT,
  bio TEXT,
  country TEXT,
  archetypes TEXT[] NOT NULL,
  mog_tier TEXT DEFAULT 'B',
  is_legacy BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Platform-specific metrics (one row per platform per chad)
CREATE TABLE platform_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chad_id UUID REFERENCES chads(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  username TEXT,
  followers INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(chad_id, platform)
);

-- Daily snapshots for trend tracking
CREATE TABLE metric_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chad_id UUID REFERENCES chads(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  followers INTEGER NOT NULL,
  engagement_rate NUMERIC(5,2),
  snapshot_date DATE NOT NULL DEFAULT CURRENT_DATE,
  UNIQUE(chad_id, platform, snapshot_date)
);

-- Computed scores (recalculated daily)
CREATE TABLE chad_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chad_id UUID REFERENCES chads(id) ON DELETE CASCADE,
  chad_score NUMERIC(5,2) NOT NULL,
  virality_score INTEGER,
  weekly_growth NUMERIC(5,2),
  monthly_growth NUMERIC(5,2),
  trend TEXT DEFAULT 'stable',
  computed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_snapshots_chad_date ON metric_snapshots(chad_id, snapshot_date DESC);
CREATE INDEX idx_scores_chad ON chad_scores(chad_id, computed_at DESC);
CREATE INDEX idx_chads_slug ON chads(slug);
