'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from '@/lib/analytics/gtm';

/**
 * Fires a page_view dataLayer event on every client-side navigation.
 * Must be a Client Component because it uses usePathname + useEffect.
 * Renders nothing — drop it inside the root layout body.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    pageview(pathname);
  }, [pathname]);

  return <>{children}</>;
}
