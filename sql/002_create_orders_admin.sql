-- =====================================================
-- WWS Unified — Orders & Admin Schema
-- Run this in your Supabase SQL Editor
-- =====================================================

-- =====================================================
-- ORDERS TABLE
-- Every shade order from the builder → Stripe checkout
-- =====================================================
CREATE TABLE IF NOT EXISTS wws_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number SERIAL UNIQUE,               -- human-readable WWS-1001, WWS-1002...
  stripe_session_id TEXT UNIQUE,             -- Stripe Checkout session ID
  stripe_payment_intent TEXT,                -- Stripe PaymentIntent ID (for refunds)

  -- Customer info
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address JSONB NOT NULL DEFAULT '{}',
  -- { line1, line2, city, state, zip, country }

  -- Order contents
  line_items JSONB NOT NULL DEFAULT '[]',
  -- [{
  --   shape, fabric_name, fabric_collection, fabric_sku,
  --   width, height, custom_dims, mount_type, control_type,
  --   motor_type, valance, side_channels,
  --   quantity, unit_price, line_total
  -- }]

  -- Financials
  subtotal_cents INT NOT NULL DEFAULT 0,
  shipping_cents INT NOT NULL DEFAULT 0,
  tax_cents INT NOT NULL DEFAULT 0,
  discount_cents INT NOT NULL DEFAULT 0,
  total_cents INT NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'usd',

  -- Status workflow: pending_payment → paid → in_production → shipped → delivered → cancelled/refunded
  status TEXT NOT NULL DEFAULT 'pending_payment'
    CHECK (status IN (
      'pending_payment', 'paid', 'in_production',
      'cut', 'sewing', 'quality_check',
      'shipped', 'delivered',
      'cancelled', 'refunded', 'partially_refunded'
    )),

  -- Shipping
  shipping_method TEXT DEFAULT 'standard',
  tracking_number TEXT,
  tracking_url TEXT,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,

  -- Production
  production_notes TEXT,
  estimated_ship_date DATE,

  -- Metadata
  source TEXT DEFAULT 'builder',             -- 'builder', 'admin_manual', 'phone'
  notes TEXT,                                -- internal admin notes
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

-- =====================================================
-- ORDER STATUS HISTORY (audit trail)
-- =====================================================
CREATE TABLE IF NOT EXISTS wws_order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES wws_orders(id) ON DELETE CASCADE,
  from_status TEXT,
  to_status TEXT NOT NULL,
  changed_by TEXT DEFAULT 'system',          -- 'system', 'admin', 'stripe_webhook'
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_wws_orders_status ON wws_orders(status);
CREATE INDEX IF NOT EXISTS idx_wws_orders_email ON wws_orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_wws_orders_stripe ON wws_orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_wws_orders_created ON wws_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wws_orders_number ON wws_orders(order_number);
CREATE INDEX IF NOT EXISTS idx_wws_order_history_order ON wws_order_status_history(order_id);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE wws_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE wws_order_status_history ENABLE ROW LEVEL SECURITY;

-- Anon can INSERT (builder creates order pre-payment)
CREATE POLICY "Anon insert orders" ON wws_orders
  FOR INSERT WITH CHECK (true);

-- Anon can read own order by stripe session (for confirmation page)
CREATE POLICY "Anon read own order" ON wws_orders
  FOR SELECT USING (true);

-- Service role full access (admin dashboard, webhooks)
CREATE POLICY "Service role full orders" ON wws_orders
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full history" ON wws_order_status_history
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Anon read history" ON wws_order_status_history
  FOR SELECT USING (true);

-- =====================================================
-- AUTO-UPDATE + ORDER NUMBER SEQUENCE
-- =====================================================
-- Start order numbers at 1001
ALTER SEQUENCE wws_orders_order_number_seq RESTART WITH 1001;

CREATE TRIGGER trg_wws_orders_updated
  BEFORE UPDATE ON wws_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-log status changes
CREATE OR REPLACE FUNCTION log_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO wws_order_status_history (order_id, from_status, to_status, changed_by)
    VALUES (NEW.id, OLD.status, NEW.status, 'system');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_wws_orders_status_log
  AFTER UPDATE ON wws_orders
  FOR EACH ROW EXECUTE FUNCTION log_order_status_change();

-- =====================================================
-- NOTE: If you have a swatch_requests table, run this:
-- ALTER TABLE swatch_requests
--   ADD COLUMN IF NOT EXISTS customer_name TEXT,
--   ADD COLUMN IF NOT EXISTS phone TEXT,
--   ADD COLUMN IF NOT EXISTS converted_order_id UUID REFERENCES wws_orders(id);
-- If not, run sql/create_swatch_requests.sql first.
-- =====================================================
