'use server';

import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Order, SwatchRequest, ConsultationRequest, OrderStatus } from '@/types/admin';

const ADMIN_COOKIE = 'wws-admin-token';
const TOKEN_VALUE = 'authenticated'; // Simple — cookie existence = authed

/* ── Auth ── */

export async function adminLogin(password: string): Promise<{ success: boolean }> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return { success: false };
  if (password !== expected) return { success: false };

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, TOKEN_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/admin',
  });

  return { success: true };
}

export async function adminLogout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === TOKEN_VALUE;
}

/* ── Dashboard Stats ── */

export async function getDashboardStats() {
  const db = createAdminClient();

  const [ordersRes, swatchesRes, consultationsRes] = await Promise.all([
    db.from('wws_orders').select('status, total_cents, created_at'),
    db.from('swatch_requests').select('status, created_at'),
    db.from('consultation_requests').select('status, created_at'),
  ]);

  const orders = ordersRes.data ?? [];
  const swatches = swatchesRes.data ?? [];
  const consultations = consultationsRes.data ?? [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  return {
    orders: {
      total: orders.length,
      pending: orders.filter((o) => ['pending_payment', 'paid'].includes(o.status)).length,
      inProduction: orders.filter((o) => ['in_production', 'cut', 'sewing', 'quality_check'].includes(o.status)).length,
      shipped: orders.filter((o) => o.status === 'shipped').length,
      revenue: orders
        .filter((o) => !['cancelled', 'refunded', 'pending_payment'].includes(o.status))
        .reduce((sum, o) => sum + (o.total_cents || 0), 0),
      thisWeek: orders.filter((o) => new Date(o.created_at) >= weekAgo).length,
    },
    swatches: {
      total: swatches.length,
      pending: swatches.filter((s) => s.status === 'pending').length,
      thisWeek: swatches.filter((s) => new Date(s.created_at) >= weekAgo).length,
    },
    consultations: {
      total: consultations.length,
      pending: consultations.filter((c) => c.status === 'pending').length,
      thisWeek: consultations.filter((c) => new Date(c.created_at) >= weekAgo).length,
    },
  };
}

/* ── Orders ── */

export async function getOrders(status?: string): Promise<Order[]> {
  const db = createAdminClient();
  let query = db
    .from('wws_orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) { console.error('getOrders error:', error); return []; }
  return (data ?? []) as Order[];
}

export async function getOrder(id: string): Promise<Order | null> {
  const db = createAdminClient();
  const { data, error } = await db
    .from('wws_orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as Order;
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  note?: string
): Promise<{ success: boolean; error?: string }> {
  const db = createAdminClient();

  const updates: Record<string, unknown> = { status: newStatus };
  if (newStatus === 'shipped') updates.shipped_at = new Date().toISOString();
  if (newStatus === 'delivered') updates.delivered_at = new Date().toISOString();
  if (newStatus === 'paid') updates.paid_at = new Date().toISOString();

  const { error } = await db
    .from('wws_orders')
    .update(updates)
    .eq('id', orderId);

  if (error) return { success: false, error: error.message };

  // Log with note if provided
  if (note) {
    await db.from('wws_order_status_history').insert({
      order_id: orderId,
      from_status: null, // trigger handles the real from_status
      to_status: newStatus,
      changed_by: 'admin',
      note,
    });
  }

  return { success: true };
}

export async function updateOrderTracking(
  orderId: string,
  tracking_number: string,
  tracking_url?: string
): Promise<{ success: boolean; error?: string }> {
  const db = createAdminClient();
  const { error } = await db
    .from('wws_orders')
    .update({ tracking_number, tracking_url: tracking_url || null })
    .eq('id', orderId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateOrderNotes(
  orderId: string,
  notes: string
): Promise<{ success: boolean; error?: string }> {
  const db = createAdminClient();
  const { error } = await db
    .from('wws_orders')
    .update({ notes })
    .eq('id', orderId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

/* ── Swatch Requests ── */

export async function getSwatchRequests(status?: string): Promise<SwatchRequest[]> {
  const db = createAdminClient();
  let query = db
    .from('swatch_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) { console.error('getSwatchRequests error:', error); return []; }
  return (data ?? []) as SwatchRequest[];
}

export async function updateSwatchStatus(
  id: string,
  status: string
): Promise<{ success: boolean; error?: string }> {
  const db = createAdminClient();
  const updates: Record<string, unknown> = { status };
  if (status === 'shipped') updates.shipped_at = new Date().toISOString();

  const { error } = await db
    .from('swatch_requests')
    .update(updates)
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

/* ── Consultation Requests ── */

export async function getConsultationRequests(status?: string): Promise<ConsultationRequest[]> {
  const db = createAdminClient();
  let query = db
    .from('consultation_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) { console.error('getConsultationRequests error:', error); return []; }
  return (data ?? []) as ConsultationRequest[];
}

export async function updateConsultationStatus(
  id: string,
  status: string,
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  const db = createAdminClient();
  const updates: Record<string, unknown> = { status };
  if (status === 'called') updates.called_at = new Date().toISOString();
  if (notes !== undefined) updates.notes = notes;

  const { error } = await db
    .from('consultation_requests')
    .update(updates)
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
