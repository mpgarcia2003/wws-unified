import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { CITIES, PRODUCTS, type City } from '@/data/cities';
import { STATES, type State } from '@/data/states';

// ─── Types ───────────────────────────────────────────────────────────────────

type PageParams = { location: string; product: string };

interface PageContext {
  type: 'city' | 'state';
  city?: City;
  state?: State;
  productName: string;
  productSlug: string;
}

// ─── Static params (generates ALL 2,640 pages at build time) ─────────────────

export function generateStaticParams(): PageParams[] {
  const params: PageParams[] = [];

  // 170 cities × 12 products = 2,040 pages
  for (const city of CITIES) {
    for (const product of PRODUCTS) {
      params.push({ location: city.slug, product: product.slug });
    }
  }

  // 50 states × 12 products = 600 pages (skip slugs already used by cities)
  const citySlugs = new Set(CITIES.map((c) => c.slug));
  for (const state of STATES) {
    const stateSlug = state.slug;
    for (const product of PRODUCTS) {
      // Only add state page if its slug doesn't conflict with a city slug
      // (city pages take priority for conflicting slugs)
      if (!citySlugs.has(stateSlug)) {
        params.push({ location: stateSlug, product: product.slug });
      }
    }
  }

  return params;
}

// ─── Resolve location to city or state ────────────────────────────────────────

function resolveContext(locationSlug: string, productSlug: string): PageContext | null {
  const product = PRODUCTS.find((p) => p.slug === productSlug);
  if (!product) return null;

  // City takes priority
  const city = CITIES.find((c) => c.slug === locationSlug);
  if (city) {
    return { type: 'city', city, productName: product.name, productSlug: product.slug };
  }

  // State fallback
  const state = STATES.find((s) => s.slug === locationSlug);
  if (state) {
    return { type: 'state', state, productName: product.name, productSlug: product.slug };
  }

  return null;
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { location, product } = await params;
  const ctx = resolveContext(location, product);
  if (!ctx) return { title: 'Not Found' };

  const locationName =
    ctx.type === 'city'
      ? `${ctx.city!.name}, ${ctx.city!.stateCode}`
      : ctx.state!.name;

  const title = `Custom ${ctx.productName} in ${locationName} | World Wide Shades`;
  const description = `Shop precision-made custom ${ctx.productName.toLowerCase()} for homes in ${locationName}. Factory-direct pricing, 700+ fabric options, free shipping. Made in USA.`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://worldwideshades.com/shades/${location}/${product}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://worldwideshades.com/shades/${location}/${product}`,
    },
  };
}

// ─── Page content helpers ────────────────────────────────────────────────────

function getProductDescription(productSlug: string): string {
  const map: Record<string, string> = {
    'roller-shades': 'clean, minimal roller shades that fit any standard rectangular window with precision-cut fabric and effortless operation',
    'blackout-shades': 'blackout roller shades that block 99–100% of light for complete darkness in bedrooms, nurseries, and media rooms',
    'solar-shades': 'solar shades that reduce glare and UV rays while preserving your view of the outdoors',
    'light-filtering-shades': 'light-filtering shades that soften harsh sunlight while maintaining a warm, bright interior',
    'motorized-shades': 'motorized roller shades powered by Somfy motors, compatible with Alexa, Google Home, and major smart home platforms',
    'triangle-shades': 'custom triangle shades for angled windows — precision-engineered with motorization standard and a complimentary measurement validation call',
    'trapezoid-shades': 'custom trapezoid shades using a 4-point measurement system for perfect fit on angled architectural windows',
    'hexagon-shades': 'custom hexagon shades engineered to all six angles with expert measurement validation before production',
    'pentagon-shades': 'custom pentagon shades built to all five points, motorized standard, with shape-specific measurement guides',
    'exterior-shades': 'exterior roller shades for patios, pergolas, and outdoor spaces — weather-resistant, UV-blocking, and motorization-ready',
    'specialty-shades': 'specialty custom shades for non-standard window shapes — any geometry, motorized, with expert support',
    'custom-shades': 'custom window shades made to your exact dimensions in any fabric, shape, and configuration',
  };
  return map[productSlug] ?? 'custom window shades made to your exact specifications';
}

function getProductFaqs(productSlug: string, locationName: string): { q: string; a: string }[] {
  const isSpecialty = ['triangle-shades', 'trapezoid-shades', 'hexagon-shades', 'pentagon-shades', 'specialty-shades'].includes(productSlug);

  const base = [
    {
      q: `How long does delivery take to ${locationName}?`,
      a: `We ship free to all addresses in ${locationName}. Standard production time is 5–7 business days for most shades. Specialty shape shades (triangle, trapezoid, hexagon, pentagon) take 4–6 weeks due to precision manufacturing. Once shipped, standard delivery is 2–5 business days.`,
    },
    {
      q: `Do you have a showroom or installer in ${locationName}?`,
      a: `We ship factory-direct to ${locationName} — no local showroom required. For installation, we have a nationwide network of vetted professional installers. Contact us to find one in your area. Most customers also successfully self-install with our step-by-step video guides.`,
    },
    {
      q: `What is your return policy for ${locationName} orders?`,
      a: `All shades are custom-made to your exact specifications and are non-returnable. However, if there is a manufacturing defect, we remake at no charge. For specialty shapes, our measurement validation call helps catch errors before production begins.`,
    },
  ];

  if (isSpecialty) {
    base.push({
      q: `Can I get a professional measurement in ${locationName}?`,
      a: `Yes — we have professional measurers and installers in most major markets including ${locationName}. For specialty shapes, we also offer a free remote measurement validation call (Zoom or phone) after you order, so our team can review your dimensions before we cut.`,
    });
  }

  return base;
}

function getRelatedCities(currentCity: City, productSlug: string, count = 6): City[] {
  return CITIES.filter(
    (c) => c.slug !== currentCity.slug && c.stateCode === currentCity.stateCode
  )
    .slice(0, count)
    .concat(
      CITIES.filter(
        (c) => c.slug !== currentCity.slug && c.stateCode !== currentCity.stateCode
      ).slice(0, Math.max(0, count - CITIES.filter((c) => c.stateCode === currentCity.stateCode).length))
    )
    .slice(0, count);
}

// ─── Page component ──────────────────────────────────────────────────────────

export default async function ProgrammaticPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { location, product: productSlug } = await params;
  const ctx = resolveContext(location, productSlug);
  if (!ctx) notFound();

  const locationName =
    ctx.type === 'city'
      ? `${ctx.city!.name}, ${ctx.city!.stateCode}`
      : ctx.state!.name;
  const locationNameFull =
    ctx.type === 'city'
      ? `${ctx.city!.name}, ${ctx.city!.state}`
      : ctx.state!.name;

  const productDesc = getProductDescription(productSlug);
  const faqs = getProductFaqs(productSlug, locationName);
  const relatedCities =
    ctx.type === 'city'
      ? getRelatedCities(ctx.city!, productSlug)
      : CITIES.filter((c) => c.stateCode === ctx.state!.code).slice(0, 8);

  const productLandingHref = `/pages/${productSlug}`;
  const isSpecialtyShape = ['triangle-shades', 'trapezoid-shades', 'hexagon-shades', 'pentagon-shades'].includes(productSlug);

  // ── JSON-LD ──────────────────────────────────────────────────────────────
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://worldwideshades.com/#org',
        name: 'World Wide Shades',
        url: 'https://worldwideshades.com',
        telephone: '+18446742716',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '26 Broadway Suite 934',
          addressLocality: 'New York',
          addressRegion: 'NY',
          postalCode: '10004',
          addressCountry: 'US',
        },
        areaServed: locationNameFull,
        description: `Custom window shades shipped factory-direct to ${locationNameFull}.`,
      },
      {
        '@type': 'Product',
        name: `Custom ${ctx.productName} — ${locationName}`,
        description: `Precision-made ${productDesc}, shipped factory-direct to ${locationNameFull}.`,
        brand: { '@type': 'Brand', name: 'World Wide Shades' },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: '89',
            priceCurrency: 'USD',
          },
          availability: 'https://schema.org/InStock',
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'USD' },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              businessDays: { '@type': 'QuantitativeValue', minValue: 5, maxValue: 12 },
            },
          },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worldwideshades.com' },
          { '@type': 'ListItem', position: 2, name: ctx.productName, item: `https://worldwideshades.com${productLandingHref}` },
          { '@type': 'ListItem', position: 3, name: locationName, item: `https://worldwideshades.com/shades/${location}/${productSlug}` },
        ],
      },
    ],
  };

  return (
    <>
      <Script id="jsonld-local" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>

      <div style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#171717', background: '#fefdfb' }}>

        {/* ── Breadcrumb ── */}
        <div style={{ background: '#f7f5f0', padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>
          <nav style={{ maxWidth: 1200, margin: '0 auto', fontSize: 13, color: '#6b7280', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link href={productLandingHref} style={{ color: '#6b7280', textDecoration: 'none' }}>{ctx.productName}</Link>
            <span>›</span>
            <span style={{ color: '#171717', fontWeight: 600 }}>{locationName}</span>
          </nav>
        </div>

        {/* ── Hero ── */}
        <section style={{
          background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1008 60%, #0c0c0c 100%)',
          color: '#fff', padding: '80px 24px 64px', position: 'relative', overflow: 'hidden',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(192,153,58,0.07) 1px, transparent 1px)',
            backgroundSize: '40px 40px', pointerEvents: 'none',
          }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c0993a', marginBottom: 16 }}>
              {ctx.type === 'city' ? `${ctx.city!.name}, ${ctx.city!.stateCode}` : ctx.state!.name} · Custom Window Shades
            </p>
            <h1 style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: 'clamp(32px, 5.5vw, 64px)', fontWeight: 400, lineHeight: 1.1,
              marginBottom: 24, maxWidth: 800,
            }}>
              Custom {ctx.productName} in{' '}
              <em style={{ color: '#c0993a', fontStyle: 'italic' }}>{locationName}</em>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: '#d4d0c8', maxWidth: 600, marginBottom: 40 }}>
              Precision-made {productDesc} — shipped factory-direct to {locationNameFull}. Free shipping. Made in USA.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
              <Link href="/builder" style={{
                display: 'inline-block', background: '#c0993a', color: '#0c0c0c',
                fontWeight: 700, fontSize: 15, padding: '14px 32px', borderRadius: 4, textDecoration: 'none',
              }}>
                Design Your {ctx.productName.split(' ')[0]} Shades
              </Link>
              <Link href="/pages/contact" style={{
                display: 'inline-block', border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff', fontWeight: 600, fontSize: 14, padding: '14px 24px',
                borderRadius: 4, textDecoration: 'none',
              }}>
                Talk to an Expert
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {['Free shipping to ' + locationName, 'Made in USA', '100% Fit Guarantee'].map((m) => (
                <span key={m} style={{ fontSize: 13, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#c0993a' }}>✓</span> {m}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why WWS ── */}
        <section style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c0993a', marginBottom: 16 }}>
                  Factory-Direct to {locationName}
                </p>
                <h2 style={{
                  fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                  fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 400, lineHeight: 1.2, marginBottom: 20,
                }}>
                  Why {locationName} Homeowners Choose World Wide Shades
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', marginBottom: 16 }}>
                  We ship {ctx.productName.toLowerCase()} factory-direct to {locationNameFull} — no dealer markups, no showroom overhead. The same precision manufacturing used by interior designers and architects nationwide, available direct to your door.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', marginBottom: 24 }}>
                  {isSpecialtyShape
                    ? `Specialty window shapes like ${ctx.productName.toLowerCase()} require expert engineering. We've been making them for over 40 years and are one of the few companies that will quote, manufacture, and guarantee them.`
                    : `Every shade is precision-cut to your exact measurements — to the nearest ⅛ inch. 700+ fabric options in blackout, solar, and light-filtering. Motorization available on all products.`
                  }
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { v: '700+', l: 'Fabric Options' },
                    { v: '40+', l: 'Years Experience' },
                    { v: '$0', l: 'Shipping Cost' },
                    { v: '100%', l: 'Fit Guarantee' },
                  ].map((s) => (
                    <div key={s.l} style={{
                      padding: '16px 20px',
                      background: '#f7f5f0',
                      borderRadius: 8,
                      borderLeft: '3px solid #c0993a',
                    }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: '#c0993a', lineHeight: 1 }}>{s.v}</div>
                      <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                background: '#0c0c0c',
                borderRadius: 12,
                padding: '40px 36px',
                color: '#fff',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                  fontSize: 22, fontWeight: 400, marginBottom: 24,
                }}>
                  What&apos;s Included with Every Order
                </h3>
                {[
                  'Precision-cut to your exact measurements (±⅛")',
                  'Free shipping to ' + locationName,
                  'Hardware & installation guide included',
                  isSpecialtyShape ? 'Complimentary measurement validation call' : 'Up to 5 free fabric samples available',
                  isSpecialtyShape ? 'Motorization standard' : 'Motorization available on all products',
                  '5-year motor warranty, 3-year fabric warranty',
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                    padding: '10px 0',
                    borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  }}>
                    <span style={{ color: '#c0993a', flexShrink: 0, marginTop: 2 }}>✓</span>
                    <span style={{ fontSize: 14, color: '#d4d0c8', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
                <Link href="/builder" style={{
                  display: 'block', textAlign: 'center',
                  marginTop: 28, background: '#c0993a', color: '#0c0c0c',
                  fontWeight: 700, fontSize: 15, padding: '14px', borderRadius: 4, textDecoration: 'none',
                }}>
                  Start Designing →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section style={{ background: '#f7f5f0', padding: '64px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 400, lineHeight: 1.2,
              marginBottom: 48, textAlign: 'center',
            }}>
              How to Order {ctx.productName} in {locationName}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {[
                { n: '1', t: 'Measure', d: `Use our measurement guide for ${ctx.productName.toLowerCase()}. We accept dimensions to the nearest ⅛".` },
                { n: '2', t: 'Design', d: 'Choose fabric, opacity, and motorization in our online builder. No showroom visit needed.' },
                { n: '3', t: 'We Build', d: `Your ${ctx.productName.toLowerCase()} is precision-cut and assembled in our USA facility.` },
                { n: '4', t: 'Delivered Free', d: `Shipped directly to your door in ${locationName}. Free standard delivery.` },
              ].map((step) => (
                <div key={step.n} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: '#0c0c0c', color: '#c0993a',
                    fontWeight: 700, fontSize: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}>
                    {step.n}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{step.t}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Local FAQ ── */}
        <section style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 400, lineHeight: 1.2, marginBottom: 32,
            }}>
              Common Questions — {locationName}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {faqs.map((faq, i) => (
                <details key={i} style={{
                  background: '#fff', border: '1px solid #e5e7eb',
                  borderRadius: i === 0 ? '8px 8px 0 0' : i === faqs.length - 1 ? '0 0 8px 8px' : 0,
                  marginTop: i > 0 ? -1 : 0,
                }}>
                  <summary style={{
                    padding: '18px 24px', fontSize: 15, fontWeight: 600,
                    cursor: 'pointer', listStyle: 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span style={{ paddingRight: 16 }}>{faq.q}</span>
                    <span style={{ color: '#c0993a', fontSize: 20, flexShrink: 0 }}>+</span>
                  </summary>
                  <p style={{ padding: '4px 24px 18px', fontSize: 14, lineHeight: 1.8, color: '#6b7280', margin: 0 }}>
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Internal linking: related cities ── */}
        {relatedCities.length > 0 && (
          <section style={{ background: '#f7f5f0', padding: '48px 24px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 16 }}>
                {ctx.productName} Near {ctx.type === 'city' ? ctx.city!.name : locationName}
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {relatedCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/shades/${city.slug}/${productSlug}`}
                    style={{
                      fontSize: 13, color: '#374151', textDecoration: 'none',
                      padding: '6px 14px', background: '#fff',
                      border: '1px solid #e5e7eb', borderRadius: 100,
                    }}
                  >
                    {city.name}, {city.stateCode}
                  </Link>
                ))}
                <Link
                  href={productLandingHref}
                  style={{
                    fontSize: 13, color: '#c0993a', textDecoration: 'none',
                    padding: '6px 14px', background: 'rgba(192,153,58,0.08)',
                    border: '1px solid rgba(192,153,58,0.3)', borderRadius: 100, fontWeight: 600,
                  }}
                >
                  View All {ctx.productName} →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── Related products ── */}
        <section style={{ padding: '48px 24px', borderTop: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 16 }}>
              More Shades Available in {locationName}
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {PRODUCTS.filter((p) => p.slug !== productSlug).slice(0, 8).map((p) => (
                <Link
                  key={p.slug}
                  href={`/shades/${location}/${p.slug}`}
                  style={{
                    fontSize: 13, color: '#374151', textDecoration: 'none',
                    padding: '6px 14px', background: '#f7f5f0',
                    border: '1px solid #e5e7eb', borderRadius: 100,
                  }}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section style={{
          background: 'linear-gradient(135deg, #1a1008 0%, #0c0c0c 100%)',
          color: '#fff', padding: '80px 24px', textAlign: 'center',
        }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 400, lineHeight: 1.2, marginBottom: 16,
            }}>
              Ready to Order {ctx.productName}?
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: 32, fontSize: 16 }}>
              Free shipping to {locationName} · Factory-direct pricing · Made in USA
            </p>
            <Link href="/builder" style={{
              display: 'inline-block', background: '#c0993a', color: '#0c0c0c',
              fontWeight: 700, fontSize: 16, padding: '16px 40px', borderRadius: 4, textDecoration: 'none',
            }}>
              Start Designing — Free
            </Link>
            <p style={{ marginTop: 16, fontSize: 13, color: '#6b7280' }}>
              No payment required to start · Measurements reviewed before production
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
