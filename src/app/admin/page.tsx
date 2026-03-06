import { isAdminAuthenticated, getDashboardStats, getOrders, getSwatchRequests, getConsultationRequests } from './actions';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

export const dynamic = 'force-dynamic'; // always fresh data

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; status?: string }>;
}) {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return <AdminLogin />;
  }

  const params = await searchParams;
  const tab = params.tab || 'overview';
  const statusFilter = params.status || 'all';

  const [stats, orders, swatches, consultations] = await Promise.all([
    getDashboardStats(),
    getOrders(tab === 'orders' ? statusFilter : undefined),
    getSwatchRequests(tab === 'swatches' ? statusFilter : undefined),
    getConsultationRequests(tab === 'consultations' ? statusFilter : undefined),
  ]);

  return (
    <AdminDashboard
      tab={tab}
      statusFilter={statusFilter}
      stats={stats}
      orders={orders}
      swatches={swatches}
      consultations={consultations}
    />
  );
}
