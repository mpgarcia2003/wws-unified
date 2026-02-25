/**
 * Unified Analytics Tracker
 *
 * KEY ADVANTAGE OF WWS-UNIFIED:
 * Previously, the shade builder ran inside an iframe on builder.worldwideshades.com,
 * requiring a postMessage bridge to forward GTM events to the parent page.
 *
 * Now, everything runs on a single domain under one GTM container.
 * Events fire directly into dataLayer — no bridging needed.
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/** Push an event to GTM dataLayer */
export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {}
) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
}

// Storefront events

export function trackPageView(pagePath: string, pageTitle: string) {
  trackEvent('page_view', { page_path: pagePath, page_title: pageTitle });
}

export function trackViewItem(product: {
  id: string;
  name: string;
  price: number;
  category?: string;
}) {
  trackEvent('view_item', {
    ecommerce: {
      currency: 'USD',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
      }],
    },
  });
}

export function trackAddToCart(item: {
  id: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
}) {
  trackEvent('add_to_cart', {
    ecommerce: {
      currency: 'USD',
      value: item.price * item.quantity,
      items: [{
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
        item_variant: item.variant,
      }],
    },
  });
}

// Builder-specific events (previously forwarded via postMessage from iframe)

export function trackBuilderStep(step: string, details?: Record<string, unknown>) {
  trackEvent('builder_step', { builder_step: step, ...details });
}

export function trackShapeSelected(shape: string) {
  trackEvent('shape_selected', { shade_shape: shape });
}

export function trackFabricSelected(fabric: string, collection?: string) {
  trackEvent('fabric_selected', { fabric_name: fabric, fabric_collection: collection });
}

export function trackBuilderComplete(orderValue: number) {
  trackEvent('builder_complete', {
    ecommerce: { currency: 'USD', value: orderValue },
  });
}

export function trackConsultationRequest(source: string) {
  trackEvent('consultation_request', { request_source: source });
}
