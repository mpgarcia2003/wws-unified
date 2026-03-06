import Link from 'next/link';

export interface ProductFeature {
  title: string;
  desc: string;
}

export interface ProductFaq {
  q: string;
  a: string;
}

export interface ProductLandingPageData {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroStats: { value: string; label: string }[];
  featuresSectionTitle: string;
  features: ProductFeature[];
  imageAlt?: string;
  faqs?: ProductFaq[];
  ctaTitle: string;
  ctaPrimaryText: string;
  ctaNote?: string;
}

const BUILDER_URL = '/builder';

export default function ProductLandingPage({ data }: { data: ProductLandingPageData }) {
  return (
    <div style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#171717', background: '#fefdfb' }}>

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1008 60%, #0c0c0c 100%)',
        color: '#fff',
        padding: '100px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(192,153,58,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c0993a', marginBottom: 20 }}>
            {data.eyebrow}
          </p>
          <h1 style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: 'clamp(36px, 6vw, 68px)',
            fontWeight: 400, lineHeight: 1.1,
            marginBottom: 24, maxWidth: 760,
          }}>
            {data.heroTitle}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: '#d4d0c8', maxWidth: 580, marginBottom: 48 }}>
            {data.heroSubtitle}
          </p>

          {/* stats */}
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', marginBottom: 48 }}>
            {data.heroStats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 36, fontWeight: 700, color: '#c0993a', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <Link href={BUILDER_URL} style={{
              display: 'inline-block', background: '#c0993a', color: '#0c0c0c',
              fontWeight: 700, fontSize: 15, padding: '14px 32px', borderRadius: 4, textDecoration: 'none',
            }}>
              {data.ctaPrimaryText}
            </Link>
            <Link href="/pages/contact" style={{ color: '#d4d0c8', fontSize: 14, textDecoration: 'underline', textUnderlineOffset: 3, alignSelf: 'center' }}>
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust row ── */}
      <div style={{
        background: '#f7f5f0',
        padding: '16px 24px',
        display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap',
        fontSize: 13, fontWeight: 500, color: '#6b7280',
      }}>
        {['Free Shipping on All Orders', 'Made in USA', '100% Fit Guarantee', 'Ships in 5–7 Days'].map((t) => (
          <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#c0993a' }}>✓</span> {t}
          </span>
        ))}
      </div>

      {/* ── Features ── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: 'clamp(26px, 4vw, 42px)',
            fontWeight: 400, lineHeight: 1.2,
            marginBottom: 56,
          }}>
            {data.featuresSectionTitle}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {data.features.map((f, i) => (
              <div key={i} style={{
                padding: '28px 32px',
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 10,
                borderTop: '3px solid #c0993a',
              }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: '#6b7280' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {data.faqs && data.faqs.length > 0 && (
        <section style={{ background: '#f7f5f0', padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: 'clamp(24px, 3.5vw, 38px)',
              fontWeight: 400, lineHeight: 1.2,
              marginBottom: 40,
            }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {data.faqs.map((faq, i) => (
                <details key={i} style={{
                  background: '#fff',
                  borderRadius: i === 0 ? '8px 8px 0 0' : i === data.faqs!.length - 1 ? '0 0 8px 8px' : 0,
                  border: '1px solid #e5e7eb',
                }}>
                  <summary style={{
                    padding: '18px 24px',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    {faq.q}
                    <span style={{ color: '#c0993a', fontSize: 20, flexShrink: 0, marginLeft: 16 }}>+</span>
                  </summary>
                  <p style={{ padding: '0 24px 18px', fontSize: 14, lineHeight: 1.7, color: '#6b7280', margin: 0 }}>
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ── */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1008 0%, #0c0c0c 100%)',
        color: '#fff',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: 'clamp(28px, 4.5vw, 48px)',
            fontWeight: 400, lineHeight: 1.2,
            marginBottom: 32,
          }}>
            {data.ctaTitle}
          </h2>
          <Link href={BUILDER_URL} style={{
            display: 'inline-block', background: '#c0993a', color: '#0c0c0c',
            fontWeight: 700, fontSize: 16, padding: '16px 40px', borderRadius: 4, textDecoration: 'none',
          }}>
            {data.ctaPrimaryText}
          </Link>
          {data.ctaNote && (
            <p style={{ marginTop: 16, fontSize: 13, color: '#6b7280' }}>{data.ctaNote}</p>
          )}
        </div>
      </section>
    </div>
  );
}
