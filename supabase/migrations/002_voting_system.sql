-- Mog Rankings: "Who Mogs Who" Voting System
-- Phase 2: ELO-based Audience Scores

-- ELO ratings table (one row per chad)
CREATE TABLE elo_ratings (
  chad_id TEXT PRIMARY KEY,
  elo_rating NUMERIC(8,2) NOT NULL DEFAULT 1500.00,
  wins INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0,
  total_votes INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Individual votes table
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  winner_id TEXT NOT NULL,
  loser_id TEXT NOT NULL,
  winner_elo_before NUMERIC(8,2) NOT NULL,
  loser_elo_before NUMERIC(8,2) NOT NULL,
  winner_elo_after NUMERIC(8,2) NOT NULL,
  loser_elo_after NUMERIC(8,2) NOT NULL,
  voter_ip TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_votes_rate_limit ON votes(voter_ip, created_at DESC);
CREATE INDEX idx_votes_winner ON votes(winner_id);
CREATE INDEX idx_votes_loser ON votes(loser_id);
CREATE INDEX idx_elo_rating ON elo_ratings(elo_rating DESC);

-- Enable Row Level Security
ALTER TABLE elo_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Anyone can read ELO ratings
CREATE POLICY "elo_ratings_select" ON elo_ratings
  FOR SELECT TO anon USING (true);

-- RLS Policies: Anyone can update ELO ratings (API route handles validation)
CREATE POLICY "elo_ratings_update" ON elo_ratings
  FOR UPDATE TO anon USING (true);

-- RLS Policies: Anyone can read votes
CREATE POLICY "votes_select" ON votes
  FOR SELECT TO anon USING (true);

-- RLS Policies: Anyone can insert votes
CREATE POLICY "votes_insert" ON votes
  FOR INSERT TO anon WITH CHECK (true);

-- Seed all 20 chads with initial ELO of 1500
-- IDs match seed.ts
INSERT INTO elo_ratings (chad_id, elo_rating, wins, losses, total_votes) VALUES
  ('1', 1500.00, 0, 0, 0),   -- Zyzz (legacy, won't be in matchups but tracked)
  ('2', 1500.00, 0, 0, 0),   -- Chico Lachowski
  ('3', 1500.00, 0, 0, 0),   -- Sean O'Pry
  ('4', 1500.00, 0, 0, 0),   -- Jordan Barrett
  ('5', 1500.00, 0, 0, 0),   -- David Gandy
  ('6', 1500.00, 0, 0, 0),   -- Matt Bomer
  ('7', 1500.00, 0, 0, 0),   -- Ian Somerhalder
  ('8', 1500.00, 0, 0, 0),   -- Marlon Teixeira
  ('9', 1500.00, 0, 0, 0),   -- David Laid
  ('10', 1500.00, 0, 0, 0),  -- Jeff Seid
  ('11', 1500.00, 0, 0, 0),  -- Vinnie Hacker
  ('12', 1500.00, 0, 0, 0),  -- Lucky Blue Smith
  ('13', 1500.00, 0, 0, 0),  -- Henry Cavill
  ('14', 1500.00, 0, 0, 0),  -- Nick Bateman
  ('15', 1500.00, 0, 0, 0),  -- Toni Mahfud
  ('17', 1500.00, 0, 0, 0),  -- GigaChad (legacy)
  ('18', 1500.00, 0, 0, 0),  -- Clavicular
  ('19', 1500.00, 0, 0, 0),  -- Dragomaxxer
  ('20', 1500.00, 0, 0, 0),  -- Androgenic
  ('21', 1500.00, 0, 0, 0);  -- Syrian Psycho
