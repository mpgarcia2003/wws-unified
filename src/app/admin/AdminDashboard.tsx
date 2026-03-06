'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  adminLogout,
  updateOrderStatus,
  updateOrderTracking,
  updateOrderNotes,
  updateSwatchStatus,
  updateConsultationStatus,
} from './actions';
import {
  ORDER_STATUS_CONFIG,
  formatCents,
  formatOrderNumber,
  type Order,
  type OrderStatus,
  type SwatchRequest,
  type ConsultationRequest,
} from '@/types/admin';

/* ── Types ── */
interface DashboardStats {
  orders: { total: number; pending: number; inProduction: number; shipped: number; revenue: number; thisWeek: number };
  swatches: { total: number; pending: number; thisWeek: number };
  consultations: { total: number; pending: number; thisWeek: number };
}

interface Props {
  tab: string;
  statusFilter: string;
  stats: DashboardStats;
  orders: Order[];
  swatches: SwatchRequest[];
  consultations: ConsultationRequest[];
}

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'orders', label: 'Orders' },
  { key: 'swatches', label: 'Swatches' },
  { key: 'consultations', label: 'Consultations' },
];

export function AdminDashboard({ tab, statusFilter, stats, orders, swatches, consultations }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = (newTab: string, newStatus?: string) => {
    const params = new URLSearchParams();
    params.set('tab', newTab);
    if (newStatus && newStatus !== 'all') params.set('status', newStatus);
    startTransition(() => router.push(`/admin?${params.toString()}`));
  };

  const handleLogout = async () => {
    await adminLogout();
    window.location.reload();
  };

  return (
    <div className="adm">
      {/* ── Header ── */}
      <header className="adm-header">
        <div className="adm-header-inner">
          <div>
            <span className="adm-brand">World Wide <em>Shades</em></span>
            <span className="adm-badge">ADMIN</span>
          </div>
          <button className="adm-logout" onClick={handleLogout}>Sign Out</button>
        </div>
      </header>

      {/* ── Tabs ── */}
      <nav className="adm-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`adm-tab${tab === t.key ? ' active' : ''}`}
            onClick={() => navigate(t.key)}
          >
            {t.label}
            {t.key === 'orders' && stats.orders.pending > 0 && (
              <span className="adm-tab-badge">{stats.orders.pending}</span>
            )}
            {t.key === 'swatches' && stats.swatches.pending > 0 && (
              <span className="adm-tab-badge">{stats.swatches.pending}</span>
            )}
            {t.key === 'consultations' && stats.consultations.pending > 0 && (
              <span className="adm-tab-badge">{stats.consultations.pending}</span>
            )}
          </button>
        ))}
      </nav>

      {/* ── Content ── */}
      <div className={`adm-content${isPending ? ' loading' : ''}`}>
        {tab === 'overview' && <OverviewTab stats={stats} onNavigate={navigate} />}
        {tab === 'orders' && <OrdersTab orders={orders} statusFilter={statusFilter} onNavigate={navigate} />}
        {tab === 'swatches' && <SwatchesTab swatches={swatches} statusFilter={statusFilter} onNavigate={navigate} />}
        {tab === 'consultations' && <ConsultationsTab consultations={consultations} statusFilter={statusFilter} onNavigate={navigate} />}
      </div>

      <Styles />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   OVERVIEW TAB
   ═══════════════════════════════════════════════════════ */
function OverviewTab({ stats, onNavigate }: { stats: DashboardStats; onNavigate: (tab: string, status?: string) => void }) {
  return (
    <div className="adm-overview">
      <h2>Dashboard</h2>
      <div className="adm-kpi-grid">
        <KPI label="Total Revenue" value={formatCents(stats.orders.revenue)} />
        <KPI label="Total Orders" value={stats.orders.total} onClick={() => onNavigate('orders')} />
        <KPI label="Needs Action" value={stats.orders.pending} accent onClick={() => onNavigate('orders', 'paid')} />
        <KPI label="In Production" value={stats.orders.inProduction} onClick={() => onNavigate('orders', 'in_production')} />
        <KPI label="Shipped" value={stats.orders.shipped} onClick={() => onNavigate('orders', 'shipped')} />
        <KPI label="Orders This Week" value={stats.orders.thisWeek} />
      </div>

      <div className="adm-kpi-grid adm-kpi-grid--sm">
        <KPI label="Swatch Requests" value={stats.swatches.total} onClick={() => onNavigate('swatches')} />
        <KPI label="Swatches Pending" value={stats.swatches.pending} accent onClick={() => onNavigate('swatches', 'pending')} />
        <KPI label="Consultations" value={stats.consultations.total} onClick={() => onNavigate('consultations')} />
        <KPI label="Consult. Pending" value={stats.consultations.pending} accent onClick={() => onNavigate('consultations', 'pending')} />
      </div>
    </div>
  );
}

function KPI({ label, value, accent, onClick }: { label: string; value: string | number; accent?: boolean; onClick?: () => void }) {
  return (
    <div className={`adm-kpi${accent ? ' accent' : ''}${onClick ? ' clickable' : ''}`} onClick={onClick}>
      <div className="adm-kpi-label">{label}</div>
      <div className="adm-kpi-value">{value}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ORDERS TAB
   ═══════════════════════════════════════════════════════ */
function OrdersTab({ orders, statusFilter, onNavigate }: { orders: Order[]; statusFilter: string; onNavigate: (tab: string, status?: string) => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const router = useRouter();

  const statusFilters = ['all', 'paid', 'in_production', 'cut', 'sewing', 'quality_check', 'shipped', 'delivered', 'cancelled'];

  const refresh = () => router.refresh();

  return (
    <div>
      <div className="adm-toolbar">
        <h2>Orders</h2>
        <div className="adm-filters">
          {statusFilters.map((s) => (
            <button
              key={s}
              className={`adm-filter${statusFilter === s ? ' active' : ''}`}
              onClick={() => onNavigate('orders', s)}
            >
              {s === 'all' ? 'All' : ORDER_STATUS_CONFIG[s as OrderStatus]?.label || s}
            </button>
          ))}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="adm-empty">No orders found{statusFilter !== 'all' ? ` with status "${statusFilter}"` : ''}.</div>
      ) : (
        <table className="adm-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                expanded={expandedId === order.id}
                onToggle={() => setExpandedId(expandedId === order.id ? null : order.id)}
                onRefresh={refresh}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function OrderRow({ order, expanded, onToggle, onRefresh }: { order: Order; expanded: boolean; onToggle: () => void; onRefresh: () => void }) {
  const [busy, setBusy] = useState(false);
  const config = ORDER_STATUS_CONFIG[order.status];

  const handleStatusChange = async (newStatus: OrderStatus) => {
    setBusy(true);
    await updateOrderStatus(order.id, newStatus);
    onRefresh();
    setBusy(false);
  };

  const handleTrackingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    await updateOrderTracking(order.id, fd.get('tracking') as string, fd.get('url') as string);
    onRefresh();
    setBusy(false);
  };

  const handleNotesSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    await updateOrderNotes(order.id, fd.get('notes') as string);
    onRefresh();
    setBusy(false);
  };

  return (
    <>
      <tr className={`adm-row${expanded ? ' expanded' : ''}`} onClick={onToggle}>
        <td className="adm-mono">{formatOrderNumber(order.order_number)}</td>
        <td>
          <div className="adm-customer">{order.customer_name}</div>
          <div className="adm-email">{order.customer_email}</div>
        </td>
        <td>{order.line_items?.length || 0} shade{(order.line_items?.length || 0) !== 1 ? 's' : ''}</td>
        <td className="adm-mono">{formatCents(order.total_cents)}</td>
        <td><span className="adm-status" style={{ background: config.color }}>{config.label}</span></td>
        <td className="adm-date">{new Date(order.created_at).toLocaleDateString()}</td>
        <td className="adm-expand-icon">{expanded ? '▾' : '▸'}</td>
      </tr>
      {expanded && (
        <tr className="adm-detail-row">
          <td colSpan={7}>
            <div className="adm-detail">
              {/* Line Items */}
              <div className="adm-detail-section">
                <h4>Line Items</h4>
                {(order.line_items || []).map((item, i) => (
                  <div key={i} className="adm-line-item">
                    <strong>{item.shape}</strong> — {item.fabric_collection} / {item.fabric_name}
                    <br />
                    {item.width} × {item.height} · {item.mount_type} · {item.control_type}
                    {item.motor_type && ` · ${item.motor_type}`}
                    <br />
                    Qty: {item.quantity} · {formatCents(item.line_total)}
                  </div>
                ))}
              </div>

              {/* Shipping Address */}
              <div className="adm-detail-section">
                <h4>Shipping</h4>
                <p>
                  {order.shipping_address.line1}<br />
                  {order.shipping_address.line2 && <>{order.shipping_address.line2}<br /></>}
                  {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}
                </p>
                {order.tracking_number && (
                  <p className="adm-tracking">
                    Tracking: <a href={order.tracking_url || '#'} target="_blank" rel="noopener">{order.tracking_number}</a>
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="adm-detail-section">
                <h4>Update Status</h4>
                <div className="adm-status-actions">
                  {config.next.map((ns) => (
                    <button
                      key={ns}
                      className="adm-action-btn"
                      style={{ borderColor: ORDER_STATUS_CONFIG[ns].color }}
                      onClick={(e) => { e.stopPropagation(); handleStatusChange(ns); }}
                      disabled={busy}
                    >
                      → {ORDER_STATUS_CONFIG[ns].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tracking Form */}
              {['shipped', 'quality_check', 'in_production'].includes(order.status) && (
                <div className="adm-detail-section">
                  <h4>Tracking Info</h4>
                  <form onSubmit={handleTrackingSubmit} className="adm-inline-form" onClick={(e) => e.stopPropagation()}>
                    <input name="tracking" placeholder="Tracking number" defaultValue={order.tracking_number || ''} />
                    <input name="url" placeholder="Tracking URL (optional)" defaultValue={order.tracking_url || ''} />
                    <button type="submit" disabled={busy}>Save</button>
                  </form>
                </div>
              )}

              {/* Notes */}
              <div className="adm-detail-section">
                <h4>Internal Notes</h4>
                <form onSubmit={handleNotesSubmit} className="adm-inline-form" onClick={(e) => e.stopPropagation()}>
                  <textarea name="notes" rows={2} defaultValue={order.notes || ''} placeholder="Add production notes..." />
                  <button type="submit" disabled={busy}>Save</button>
                </form>
              </div>

              {/* IDs */}
              <div className="adm-detail-section adm-ids">
                {order.stripe_payment_intent && <span>Stripe: {order.stripe_payment_intent}</span>}
                <span>ID: {order.id}</span>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   SWATCHES TAB
   ═══════════════════════════════════════════════════════ */
function SwatchesTab({ swatches, statusFilter, onNavigate }: { swatches: SwatchRequest[]; statusFilter: string; onNavigate: (tab: string, status?: string) => void }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  const handleStatus = async (id: string, status: string) => {
    setBusy(id);
    await updateSwatchStatus(id, status);
    router.refresh();
    setBusy(null);
  };

  return (
    <div>
      <div className="adm-toolbar">
        <h2>Swatch Requests</h2>
        <div className="adm-filters">
          {['all', 'pending', 'shipped'].map((s) => (
            <button key={s} className={`adm-filter${statusFilter === s ? ' active' : ''}`} onClick={() => onNavigate('swatches', s)}>
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {swatches.length === 0 ? (
        <div className="adm-empty">No swatch requests found.</div>
      ) : (
        <table className="adm-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Fabrics</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {swatches.map((sw) => (
              <tr key={sw.id}>
                <td>{sw.name}</td>
                <td className="adm-email">{sw.email}</td>
                <td className="adm-small">{sw.address}<br />{sw.city_state_zip}</td>
                <td className="adm-small">
                  {(sw.fabrics || []).map((f, i) => (
                    <span key={i} className="adm-fab-chip">{typeof f === 'string' ? f : f.name}</span>
                  ))}
                </td>
                <td>
                  <span className="adm-status" style={{ background: sw.status === 'pending' ? '#f59e0b' : sw.status === 'shipped' ? '#22c55e' : '#888' }}>
                    {sw.status}
                  </span>
                </td>
                <td className="adm-date">{new Date(sw.created_at).toLocaleDateString()}</td>
                <td>
                  {sw.status === 'pending' && (
                    <button className="adm-action-btn" onClick={() => handleStatus(sw.id, 'shipped')} disabled={busy === sw.id}>
                      Mark Shipped
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CONSULTATIONS TAB
   ═══════════════════════════════════════════════════════ */
function ConsultationsTab({ consultations, statusFilter, onNavigate }: { consultations: ConsultationRequest[]; statusFilter: string; onNavigate: (tab: string, status?: string) => void }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  const handleStatus = async (id: string, status: string) => {
    setBusy(id);
    await updateConsultationStatus(id, status);
    router.refresh();
    setBusy(null);
  };

  return (
    <div>
      <div className="adm-toolbar">
        <h2>Consultation Requests</h2>
        <div className="adm-filters">
          {['all', 'pending', 'called', 'completed'].map((s) => (
            <button key={s} className={`adm-filter${statusFilter === s ? ' active' : ''}`} onClick={() => onNavigate('consultations', s)}>
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {consultations.length === 0 ? (
        <div className="adm-empty">No consultation requests found.</div>
      ) : (
        <table className="adm-table">
          <thead>
            <tr>
              <th>Phone</th>
              <th>Preferred Time</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((c) => (
              <tr key={c.id}>
                <td className="adm-mono">{c.phone}</td>
                <td>{c.preferred_time}</td>
                <td>
                  <span className="adm-status" style={{ background: c.status === 'pending' ? '#f59e0b' : c.status === 'called' ? '#3b82f6' : '#22c55e' }}>
                    {c.status}
                  </span>
                </td>
                <td className="adm-date">{new Date(c.created_at).toLocaleDateString()}</td>
                <td className="adm-action-cell">
                  {c.status === 'pending' && (
                    <button className="adm-action-btn" onClick={() => handleStatus(c.id, 'called')} disabled={busy === c.id}>
                      Mark Called
                    </button>
                  )}
                  {c.status === 'called' && (
                    <button className="adm-action-btn" onClick={() => handleStatus(c.id, 'completed')} disabled={busy === c.id}>
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════ */
function Styles() {
  return (
    <style>{`
      .adm {
        --ink: #0c0c0c; --ink2: #333; --ink3: #666;
        --bg: #f4f2ee; --card: #fff; --border: #e6e2da;
        --gold: #c0993a; --gold-dk: #9a7a2a;
        --ff: -apple-system, 'Segoe UI', sans-serif;
        --fs: Georgia, serif;
        font-family: var(--ff); color: var(--ink); background: var(--bg);
        min-height: 100vh;
      }

      /* Header */
      .adm-header { background: var(--ink); padding: 1rem 2rem; border-bottom: 2px solid var(--gold); }
      .adm-header-inner { max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
      .adm-brand { font-family: var(--fs); font-size: 1.2rem; color: #fff; }
      .adm-brand em { color: var(--gold); font-style: italic; }
      .adm-badge {
        font-size: .6rem; font-weight: 700; color: var(--gold); background: rgba(192,153,58,.1);
        padding: 2px 8px; border-radius: 12px; border: 1px solid rgba(192,153,58,.2);
        margin-left: 8px; letter-spacing: .1em;
      }
      .adm-logout {
        font-size: .78rem; color: #888; background: none; border: 1px solid #444;
        padding: 6px 14px; border-radius: 6px; cursor: pointer; transition: all .2s;
      }
      .adm-logout:hover { color: #fff; border-color: #888; }

      /* Tabs */
      .adm-tabs {
        max-width: 1400px; margin: 0 auto; padding: 0 2rem;
        display: flex; border-bottom: 2px solid var(--border);
      }
      .adm-tab {
        padding: .9rem 1.5rem; font-size: .82rem; font-weight: 600; cursor: pointer;
        background: none; border: none; border-bottom: 2.5px solid transparent;
        color: #999; margin-bottom: -2px; transition: all .15s;
        display: flex; align-items: center; gap: 6px;
      }
      .adm-tab:hover { color: var(--ink); }
      .adm-tab.active { color: var(--gold); border-bottom-color: var(--gold); }
      .adm-tab-badge {
        font-size: .6rem; font-weight: 700; background: #ef4444; color: #fff;
        padding: 1px 6px; border-radius: 10px; min-width: 18px; text-align: center;
      }

      /* Content */
      .adm-content { max-width: 1400px; margin: 0 auto; padding: 1.5rem 2rem 3rem; }
      .adm-content.loading { opacity: .5; pointer-events: none; }
      .adm-content h2 { font-family: var(--fs); font-size: 1.4rem; font-weight: 400; margin-bottom: 1.25rem; }

      /* KPI Grid */
      .adm-kpi-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: .75rem; margin-bottom: 1.5rem; }
      .adm-kpi-grid--sm { grid-template-columns: repeat(4, 1fr); }
      .adm-kpi {
        background: var(--card); border: 1px solid var(--border); border-radius: 10px;
        padding: 1.1rem 1.25rem; transition: all .2s;
      }
      .adm-kpi.clickable { cursor: pointer; }
      .adm-kpi.clickable:hover { border-color: var(--gold); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,.05); }
      .adm-kpi.accent { border-left: 3px solid var(--gold); }
      .adm-kpi-label { font-size: .65rem; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 4px; }
      .adm-kpi-value { font-family: var(--fs); font-size: 1.6rem; }

      /* Toolbar */
      .adm-toolbar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem; }
      .adm-toolbar h2 { margin-bottom: 0; }
      .adm-filters { display: flex; gap: 4px; flex-wrap: wrap; }
      .adm-filter {
        padding: 5px 12px; font-size: .72rem; font-weight: 600; cursor: pointer;
        background: var(--card); border: 1px solid var(--border); border-radius: 6px;
        color: var(--ink3); transition: all .15s;
      }
      .adm-filter:hover { border-color: var(--gold); color: var(--ink); }
      .adm-filter.active { background: var(--ink); color: #fff; border-color: var(--ink); }

      /* Table */
      .adm-table { width: 100%; border-collapse: collapse; background: var(--card); border-radius: 10px; overflow: hidden; border: 1px solid var(--border); }
      .adm-table th {
        font-size: .68rem; font-weight: 700; color: #aaa; text-transform: uppercase;
        letter-spacing: .06em; padding: .75rem 1rem; text-align: left;
        border-bottom: 1px solid var(--border); background: #faf9f7;
      }
      .adm-table td { padding: .75rem 1rem; font-size: .85rem; border-bottom: 1px solid #f0ede7; vertical-align: top; }
      .adm-row { cursor: pointer; transition: background .1s; }
      .adm-row:hover { background: #faf9f7; }
      .adm-row.expanded { background: #f5f3ef; }
      .adm-mono { font-family: 'SF Mono', 'Fira Code', monospace; font-size: .82rem; }
      .adm-customer { font-weight: 600; font-size: .85rem; }
      .adm-email { font-size: .75rem; color: var(--ink3); }
      .adm-date { font-size: .78rem; color: var(--ink3); white-space: nowrap; }
      .adm-small { font-size: .78rem; color: var(--ink2); line-height: 1.5; }
      .adm-expand-icon { font-size: .7rem; color: #ccc; }
      .adm-empty { padding: 3rem; text-align: center; color: var(--ink3); font-size: .9rem; background: var(--card); border-radius: 10px; border: 1px solid var(--border); }

      /* Status Badge */
      .adm-status {
        display: inline-block; font-size: .65rem; font-weight: 700; color: #fff;
        padding: 3px 10px; border-radius: 12px; text-transform: uppercase; letter-spacing: .04em;
      }

      /* Detail Row */
      .adm-detail-row td { padding: 0 !important; }
      .adm-detail { padding: 1.25rem 1rem; background: #faf9f7; display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
      .adm-detail-section { background: var(--card); padding: 1rem; border-radius: 8px; border: 1px solid var(--border); }
      .adm-detail-section h4 { font-size: .7rem; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: .08em; margin-bottom: .5rem; }
      .adm-line-item { font-size: .82rem; line-height: 1.6; padding: .5rem 0; border-bottom: 1px solid #f0ede7; }
      .adm-line-item:last-child { border-bottom: none; }
      .adm-tracking a { color: var(--gold-dk); text-decoration: underline; }
      .adm-ids { font-size: .7rem; color: #bbb; font-family: monospace; display: flex; flex-direction: column; gap: .25rem; grid-column: 1 / -1; }

      /* Action Buttons */
      .adm-status-actions { display: flex; gap: .5rem; flex-wrap: wrap; }
      .adm-action-btn {
        font-size: .72rem; font-weight: 600; padding: 5px 12px; border-radius: 6px;
        background: none; border: 1.5px solid var(--border); cursor: pointer;
        color: var(--ink2); transition: all .15s;
      }
      .adm-action-btn:hover { background: var(--ink); color: #fff; border-color: var(--ink); }
      .adm-action-btn:disabled { opacity: .4; cursor: not-allowed; }
      .adm-action-cell { white-space: nowrap; }

      /* Inline Forms */
      .adm-inline-form { display: flex; gap: .5rem; flex-wrap: wrap; align-items: flex-start; }
      .adm-inline-form input, .adm-inline-form textarea {
        flex: 1; min-width: 160px; padding: .5rem .75rem; font-size: .82rem;
        border: 1px solid var(--border); border-radius: 6px; background: #fff;
        font-family: var(--ff); resize: vertical;
      }
      .adm-inline-form button {
        padding: .5rem 1rem; font-size: .78rem; font-weight: 600;
        background: var(--gold); color: #fff; border: none; border-radius: 6px;
        cursor: pointer; white-space: nowrap;
      }
      .adm-inline-form button:hover { background: var(--gold-dk); }

      /* Fabric Chips */
      .adm-fab-chip {
        display: inline-block; font-size: .68rem; background: #f0ede7;
        padding: 2px 8px; border-radius: 4px; margin: 1px 3px 1px 0;
      }

      /* Responsive */
      @media (max-width: 1024px) {
        .adm-kpi-grid { grid-template-columns: repeat(3, 1fr); }
        .adm-kpi-grid--sm { grid-template-columns: repeat(2, 1fr); }
        .adm-detail { grid-template-columns: 1fr; }
      }
      @media (max-width: 768px) {
        .adm-kpi-grid { grid-template-columns: repeat(2, 1fr); }
        .adm-table { font-size: .8rem; }
        .adm-content { padding: 1rem; }
        .adm-tabs { padding: 0 1rem; overflow-x: auto; }
      }
    `}</style>
  );
}
