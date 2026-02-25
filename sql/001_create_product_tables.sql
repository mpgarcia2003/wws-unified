-- =====================================================
-- WWS Unified — Product Database Schema
-- Run this in your Supabase SQL Editor
-- =====================================================

-- =====================================================
-- COLLECTIONS TABLE
-- 47 fabric collections (e.g. BreezeGuard, EcoTherm)
-- =====================================================
CREATE TABLE IF NOT EXISTS wws_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,              -- e.g. 'breezeguard'
  company TEXT NOT NULL,                   -- e.g. 'Phifer'
  fabric_code TEXT NOT NULL,               -- e.g. '7500'
  wws_name TEXT NOT NULL,                  -- e.g. 'BreezeGuard'
  category TEXT NOT NULL,                  -- 'Blackout Shades' or 'Light Filtering Shades'
  price_group TEXT NOT NULL DEFAULT 'C',   -- 'A' through 'I'
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- FABRICS TABLE
-- 649+ individual fabric colors/variants
-- =====================================================
CREATE TABLE IF NOT EXISTS wws_fabrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID REFERENCES wws_collections(id) ON DELETE CASCADE,
  legacy_id TEXT UNIQUE,                    -- e.g. 'fab_0', 'fab_1' (for migration/upsert)
  name TEXT NOT NULL,                       -- full display name
  color TEXT NOT NULL,                      -- extracted color (e.g. 'Odyssey', 'White | Pearl')
  category TEXT NOT NULL,                   -- 'Blackout' or 'Light Filtering'
  tone TEXT NOT NULL DEFAULT 'neutral',     -- 'light', 'dark', 'neutral'
  cloudinary_url TEXT NOT NULL,
  price_group TEXT NOT NULL DEFAULT 'C',    -- inherited from collection or overridden
  sku TEXT,
  features TEXT[] DEFAULT ARRAY['UV Protection', 'Fade Resistant'],
  rgb_r INT DEFAULT 200,
  rgb_g INT DEFAULT 200,
  rgb_b INT DEFAULT 200,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- PRICE GRIDS TABLE
-- Pricing tables A-I + Specialty, stored as JSONB
-- =====================================================
CREATE TABLE IF NOT EXISTS wws_price_grids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_code TEXT UNIQUE NOT NULL,          -- 'A' through 'I', 'SPECIALTY_1'
  grid JSONB NOT NULL,                      -- 10x10 price array [[row0], [row1], ...]
  size_breakpoints JSONB NOT NULL DEFAULT '[36, 48, 60, 72, 84, 96, 108, 120, 132, 144]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_wws_fabrics_collection ON wws_fabrics(collection_id);
CREATE INDEX IF NOT EXISTS idx_wws_fabrics_category ON wws_fabrics(category);
CREATE INDEX IF NOT EXISTS idx_wws_fabrics_price_group ON wws_fabrics(price_group);
CREATE INDEX IF NOT EXISTS idx_wws_fabrics_active ON wws_fabrics(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_wws_collections_active ON wws_collections(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_wws_collections_slug ON wws_collections(slug);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE wws_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE wws_fabrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE wws_price_grids ENABLE ROW LEVEL SECURITY;

-- Public read access (builder needs to fetch products)
CREATE POLICY "Public read collections" ON wws_collections
  FOR SELECT USING (true);

CREATE POLICY "Public read fabrics" ON wws_fabrics
  FOR SELECT USING (true);

CREATE POLICY "Public read price grids" ON wws_price_grids
  FOR SELECT USING (true);

-- Admin write access (service role key only)
CREATE POLICY "Service role write collections" ON wws_collections
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role write fabrics" ON wws_fabrics
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role write price grids" ON wws_price_grids
  FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- AUTO-UPDATE updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_wws_collections_updated
  BEFORE UPDATE ON wws_collections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_wws_fabrics_updated
  BEFORE UPDATE ON wws_fabrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_wws_price_grids_updated
  BEFORE UPDATE ON wws_price_grids
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
