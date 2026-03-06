'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  forwardBuilderEvent,
  isAllowedBuilderOrigin,
  sendTrackingParamsToBuilder,
  shareGa4ClientId,
} from '@/lib/analytics/gtm';

const BUILDER_URL = process.env.NEXT_PUBLIC_BUILDER_URL || 'https://builder.worldwideshades.com';

export default function BuilderPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();

  // ── 1. postMessage listener: GTM forwarding + cart operations ──
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (!isAllowedBuilderOrigin(event.origin)) return;

      const msg = event.data ?? {};

      // Forward builder GTM events to parent dataLayer
      if (msg.type === 'GTM_EVENT') {
        forwardBuilderEvent(msg);
      }

      // Builder requests adding to Shopify headless cart
      if (msg.type === 'ADD_TO_SHOPIFY_CART') {
        try {
          const res = await fetch('/api/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(msg.item),
          });
          const msgType = res.ok ? 'CART_ADD_SUCCESS' : 'CART_ADD_ERROR';
          event.source?.postMessage({ type: msgType }, { targetOrigin: event.origin });
          if (res.ok && msg.item?.redirectToCart) router.push('/cart');
        } catch {
          event.source?.postMessage({ type: 'CART_ADD_ERROR' }, { targetOrigin: event.origin });
        }
      }

      if (msg.type === 'NAVIGATE_TO_CART') {
        router.push('/cart');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [router]);

  // ── 2. Tracking params + GA4 client_id forwarding ──
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      const cleanupTracking = sendTrackingParamsToBuilder(iframe);
      const cleanupGa4 = shareGa4ClientId(iframe);
      return () => {
        cleanupTracking?.();
        cleanupGa4();
      };
    };

    // Run immediately (in case iframe already loaded) and on load
    const cleanup = handleLoad();
    iframe.addEventListener('load', handleLoad);

    return () => {
      cleanup?.();
      iframe.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      <iframe
        ref={iframeRef}
        id="shade-builder-iframe"
        src={BUILDER_URL}
        title="World Wide Shades — Custom Shade Builder"
        allow="camera; microphone; payment"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
      />
      <style>{`
        html, body { margin: 0; padding: 0; overflow: hidden; height: 100%; }
        @media (max-width: 768px) {
          html, body { overflow: auto; }
        }
      `}</style>
    </>
  );
}
