/**
 * GTM / Analytics — Single source of truth for all dataLayer operations
 *
 * Exports:
 *   GTM_ID                  — GTM container ID
 *   pageview(url)           — route change → dataLayer
 *   pushEvent(name, data)   — reusable dataLayer push
 *   forwardBuilderEvent()   — handles GTM_EVENT postMessages from builder iframe
 *   sendTrackingParamsToBuilder(iframe) — UTM/gclid forwarding with sessionStorage
 *   shareGa4ClientId(iframe)            — GA4 session stitching
 */

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-5THC3H88';
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-1RHH50R34P';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

const TRACKING_KEYS = [
  'gclid', 'fbclid', 'msclkid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
] as const;

const BUILDER_ALLOWED_ORIGINS = ['builder.worldwideshades.com', 'wwsai.vercel.app'];

// ── Core helpers ─────────────────────────────────────────────────────────────

/** Push any event to GTM dataLayer */
export function pushEvent(eventName: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...data });
}

/** Fire page_view on every client-side route change */
export function pageview(url: string) {
  pushEvent('page_view', { page_path: url });
}

// ── Landing page interaction events ──────────────────────────────────────────

export function trackCtaClick(ctaText: string, page: string) {
  pushEvent('cta_click', { cta_text: ctaText, page });
}

export function trackShapeSelected(shape: string, source: string) {
  pushEvent('shape_selected', { shape, source });
}

export function trackFaqOpen(question: string) {
  pushEvent('faq_open', { question });
}

export function trackFreeSamplesClick(source: string) {
  pushEvent('free_samples_click', { source });
}

export function trackPhoneClick() {
  pushEvent('phone_click', { phone: '844-674-2716' });
}

export function trackScrollDepth(depth: '25%' | '50%' | '75%' | '100%', page: string) {
  pushEvent('scroll_depth', { depth, page });
}

// ── Builder iframe bridge ─────────────────────────────────────────────────────

/**
 * Forward GTM_EVENT postMessages from builder iframe to parent dataLayer.
 * Call this inside the builder page's message event listener.
 */
export function forwardBuilderEvent(messageData: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  const { type, event: gtmEvent, data } = messageData as {
    type: string;
    event?: string;
    data?: Record<string, unknown>;
  };
  if (type !== 'GTM_EVENT' || !gtmEvent) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: gtmEvent,
    ...(data ?? {}),
    event_source: 'shade_builder_iframe',
  });
}

/** Validate that a postMessage came from an allowed builder origin */
export function isAllowedBuilderOrigin(origin: string): boolean {
  return BUILDER_ALLOWED_ORIGINS.some((o) => origin.includes(o));
}

// ── UTM / tracking param forwarding ──────────────────────────────────────────

/**
 * Capture UTM params + click IDs from current URL, persist to sessionStorage,
 * and forward to the builder iframe.
 * Call this once after the builder iframe mounts.
 */
export function sendTrackingParamsToBuilder(iframe: HTMLIFrameElement | null) {
  if (typeof window === 'undefined' || !iframe?.contentWindow) return;

  // Read from URL
  const urlParams = new URLSearchParams(window.location.search);
  const fresh: Record<string, string> = {};
  TRACKING_KEYS.forEach((k) => {
    const v = urlParams.get(k);
    if (v) fresh[k] = v;
  });

  // Persist fresh params; fall back to stored params across navigations
  if (Object.keys(fresh).length > 0) {
    sessionStorage.setItem('wws_tracking', JSON.stringify(fresh));
  }

  const stored = sessionStorage.getItem('wws_tracking');
  const params: Record<string, string> = stored ? JSON.parse(stored) : fresh;
  if (Object.keys(params).length === 0) return;

  const send = () =>
    iframe.contentWindow?.postMessage({ type: 'WWS_PARENT_PARAMS', params }, '*');

  send();
  const t1 = setTimeout(send, 1000);
  const t2 = setTimeout(send, 3000);

  // Cleanup on iframe navigation (best-effort)
  iframe.addEventListener('load', send, { once: true });

  return () => {
    clearTimeout(t1);
    clearTimeout(t2);
  };
}

// ── GA4 session stitching ─────────────────────────────────────────────────────

/**
 * Share the parent GA4 client_id with the builder iframe so that sessions merge.
 * Polls every 500ms until gtag resolves the client_id, then stops.
 * Returns a cleanup function to cancel polling.
 */
export function shareGa4ClientId(iframe: HTMLIFrameElement | null): () => void {
  if (typeof window === 'undefined' || !iframe) return () => {};

  const interval = setInterval(() => {
    try {
      window.gtag?.('get', GA4_ID, 'client_id', (clientId: unknown) => {
        if (clientId && iframe.contentWindow) {
          clearInterval(interval);
          iframe.contentWindow.postMessage({ type: 'GA4_CLIENT_ID', clientId }, '*');
        }
      });
    } catch {
      // gtag not ready yet
    }
  }, 500);

  const timeout = setTimeout(() => clearInterval(interval), 10_000);

  return () => {
    clearInterval(interval);
    clearTimeout(timeout);
  };
}
