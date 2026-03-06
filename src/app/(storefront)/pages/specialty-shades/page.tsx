import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Specialty Window Shades — Any Shape, Any Window | World Wide Shades',
  description: 'Custom specialty shades for triangle, trapezoid, hexagon, pentagon, and any non-standard window shape. Made in USA, motorized standard, expert measurement support.',
};

const SHAPES = [
  { name: 'Triangle Shades', href: '/pages/triangle-shades', desc: 'Right triangle, acute triangle, top triangle' },
  { name: 'Trapezoid Shades', href: '/pages/trapezoid-shades', desc: 'Standard, inverted, angled trapezoid' },
  { name: 'Hexagon Shades', href: '/pages/hexagon-shades', desc: 'Regular, elongated, irregular hexagon' },
  { name: 'Pentagon Shades', href: '/pages/pentagon-shades', desc: 'House pentagon, regular, irregular' },
  { name: 'Exterior Shades', href: '/pages/exterior-shades', desc: 'Outdoor patios, pergolas, and facades' },
  { name: 'Custom Shapes', href: '/builder', desc: 'Octagon, arch, circle segment, and more' },
];

export default function SpecialtyShadesPage() {
  return (
    <div style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#171717', background: '#fefdfb' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1008 60%, #0c0c0c 100%)',
        color: '#fff', padding: '100px 24px 80px', position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(192,153,58,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px', pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c0993a', marginBottom: 20 }}>
            Specialty Window Solutions
          </p>
          <h1 style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 400, lineHeight: 1.1,
            marginBottom: 24, maxWidth: 760,
          }}>
            Any Window. <em style={{ color: '#c0993a', fontStyle: 'italic' }}>Any Shape.</em>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: '#d4d0c8', maxWidth: 580, marginBottom: 48 }}>
            We specialize in the windows other companies won&apos;t touch. Triangles, trapezoids, hexagons, pentagons, and beyond — precision-engineered, motorized, and guaranteed to fit.
          </p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <Link href="/builder" style={{
              display: 'inline-block', background: '#c0993a', color: '#0c0c0c',
              fontWeight: 700, fontSize: 15, padding: '14px 32px', borderRadius: 4, textDecoration: 'none',
            }}>
              Start Your Custom Shade
            </Link>
            <Link href="/pages/contact" style={{ color: '#d4d0c8', fontSize: 14, textDecoration: 'underline', textUnderlineOffset: 3, alignSelf: 'center' }}>
              Talk to a Specialist
            </Link>
          </div>
        </div>
      </section>

      {/* Trust row */}
      <div style={{
        background: '#f7f5f0', padding: '16px 24px',
        display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap',
        fontSize: 13, fontWeight: 500, color: '#6b7280',
      }}>
        {['Free Shipping on All Orders', 'Motorized Standard', '100% Fit Guarantee', 'Expert Validation Call'].map((t) => (
          <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#c0993a' }}>✓</span> {t}
          </span>
        ))}
      </div>

      {/* Shape grid */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 400, lineHeight: 1.2, marginBottom: 16,
          }}>
            Our Specialty Shapes
          </h2>
          <p style={{ color: '#6b7280', marginBottom: 48, maxWidth: 560, lineHeight: 1.6 }}>
            Over 40 years covering the windows that standard brands won&apos;t quote. Select your shape to see the full detail, measurement guide, and pricing.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {SHAPES.map((shape) => (
              <Link key={shape.name} href={shape.href} style={{
                display: 'block',
                padding: '28px 32px',
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 10,
                textDecoration: 'none',
                color: '#171717',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                borderTop: '3px solid #c0993a',
              }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{shape.name}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.5 }}>{shape.desc}</p>
                <p style={{ marginTop: 16, fontSize: 13, color: '#c0993a', fontWeight: 600 }}>View details →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why WWS */}
      <section style={{ background: '#0c0c0c', color: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 400, lineHeight: 1.2, marginBottom: 48, color: '#fff',
          }}>
            Why World Wide Shades for Specialty Windows?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { icon: '⚡', title: 'Motorized by Default', desc: 'All specialty shapes ship with motorization because manual operation on angled rails is impractical.' },
              { icon: '📐', title: 'Shape-Specific Guides', desc: 'Foolproof measurement diagrams for every shape. No guessing, no complex math — just clear steps.' },
              { icon: '👤', title: 'Expert Validation Call', desc: 'We review your measurements before production begins. A complimentary call to catch any errors.' },
              { icon: '🔒', title: '100% Fit Guarantee', desc: 'If your shade doesn\'t fit due to our error, we remake it at no charge. Period.' },
            ].map((f, i) => (
              <div key={i} style={{
                padding: '24px 28px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(192,153,58,0.2)',
                borderRadius: 8,
              }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1008 0%, #0c0c0c 100%)',
        color: '#fff', padding: '80px 24px', textAlign: 'center',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 400, lineHeight: 1.2, marginBottom: 32,
          }}>
            Have an Unusual Window?{' '}
            <em style={{ color: '#c0993a' }}>We Can Cover It.</em>
          </h2>
          <Link href="/builder" style={{
            display: 'inline-block', background: '#c0993a', color: '#0c0c0c',
            fontWeight: 700, fontSize: 16, padding: '16px 40px', borderRadius: 4, textDecoration: 'none',
          }}>
            Start Your Custom Shade
          </Link>
          <p style={{ marginTop: 16, fontSize: 13, color: '#6b7280' }}>
            Free shipping • Motorized standard • 100% Fit Guarantee
          </p>
        </div>
      </section>
    </div>
  );
}
