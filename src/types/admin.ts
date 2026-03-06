/* ── Admin types ── */

export type OrderStatus =
  | 'pending_payment'
  | 'paid'
  | 'in_production'
  | 'cut'
  | 'sewing'
  | 'quality_check'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'
  | 'partially_refunded';

export interface Order {
  id: string;
  order_number: number;
  stripe_session_id: string | null;
  stripe_payment_intent: string | null;
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;
  shipping_address: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  line_items: OrderLineItem[];
  subtotal_cents: number;
  shipping_cents: number;
  tax_cents: number;
  discount_cents: number;
  total_cents: number;
  currency: string;
  status: OrderStatus;
  shipping_method: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  production_notes: string | null;
  estimated_ship_date: string | null;
  source: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  paid_at: string | null;
}

export interface OrderLineItem {
  shape: string;
  fabric_name: string;
  fabric_collection: string;
  fabric_sku?: string;
  width: string;
  height: string;
  custom_dims?: Record<string, string>;
  mount_type: string;
  control_type: string;
  motor_type?: string;
  valance?: string;
  side_channels?: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface OrderStatusHistory {
  id: string;
  order_id: string;
  from_status: string | null;
  to_status: string;
  changed_by: string;
  note: string | null;
  created_at: string;
}

export interface SwatchRequest {
  id: string;
  name: string;
  email: string;
  address: string;
  city_state_zip: string;
  fabrics: Array<{ name: string; collection?: string }>;
  status: string;
  created_at: string;
  shipped_at: string | null;
  notes: string | null;
  customer_name?: string;
  phone?: string;
}

export interface ConsultationRequest {
  id: string;
  phone: string;
  preferred_time: string;
  status: string;
  created_at: string;
  called_at: string | null;
  notes: string | null;
}

/* ── Helpers ── */

export const ORDER_STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; next: OrderStatus[] }> = {
  pending_payment: { label: 'Pending Payment', color: '#f59e0b', next: ['paid', 'cancelled'] },
  paid:            { label: 'Paid',            color: '#10b981', next: ['in_production', 'cancelled', 'refunded'] },
  in_production:   { label: 'In Production',   color: '#3b82f6', next: ['cut'] },
  cut:             { label: 'Cut',             color: '#6366f1', next: ['sewing'] },
  sewing:          { label: 'Sewing',          color: '#8b5cf6', next: ['quality_check'] },
  quality_check:   { label: 'Quality Check',   color: '#a855f7', next: ['shipped', 'sewing'] },
  shipped:         { label: 'Shipped',         color: '#06b6d4', next: ['delivered'] },
  delivered:       { label: 'Delivered',        color: '#22c55e', next: [] },
  cancelled:       { label: 'Cancelled',        color: '#ef4444', next: [] },
  refunded:        { label: 'Refunded',         color: '#f97316', next: [] },
  partially_refunded: { label: 'Partial Refund', color: '#f97316', next: [] },
};

export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function formatOrderNumber(num: number): string {
  return `WWS-${num}`;
}
