import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About World Wide Shades | Factory-Direct Custom Shades',
  description: 'World Wide Shades is a New York-based manufacturer of custom window shades for specialty shapes — triangles, trapezoids, pentagons, hexagons. Factory-direct since 2018.',
  alternates: { canonical: 'https://worldwideshades.com/about' },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About World Wide Shades',
    description: 'Factory-direct custom window shades for specialty shapes.',
    url: 'https://worldwideshades.com/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'World Wide Shades',
      url: 'https://worldwideshades.com',
      foundingDate: '2018',
      foundingLocation: { '@type': 'Place', name: 'New York, NY' },
    },
  };

  return (
    <div className="about">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="ab-hero">
        <div className="ab-glow" aria-hidden="true" />
        <div className="ab-hero-inner">
          <p className="ab-kicker">About Us</p>
          <h1>We Make the Shades<br /><em>Everyone Else Refuses.</em></h1>
        </div>
      </section>

      <section className="ab-body">
        <div className="ab-body-inner">
          <p className="ab-lead">World Wide Shades started with a simple observation: millions of homeowners have triangle, trapezoid, pentagon, and hexagon windows — and almost no one will make shades for them.</p>

          <h2>The Problem We Solve</h2>
          <p>The window shade industry is optimized for rectangles. Big-box retailers sell fixed sizes. Online retailers offer custom rectangles. Local dealers will quote specialty shapes — for $1,200+ per window with a 6-week lead time.</p>
          <p>We built our entire operation around the shapes others won&apos;t touch. Our cutting facility handles 10 window shapes. Our online builder lets you enter exact measurements for any of them and see your price instantly — no quote forms, no waiting, no sales calls.</p>

          <h2>Factory-Direct, No Markup</h2>
          <p>We sell directly to homeowners. No showrooms. No dealers. No distributor network adding 40-60% to the price. The fabrics are commercial-grade — Phifer, Mermet, Ferrari, Copaco, Texstyle, Senbesta — the same materials installed in high-rises, luxury hotels, and commercial buildings.</p>
          <p>You get commercial quality at a fraction of the dealer price because we cut out every middleman between the fabric roll and your front door.</p>

          <h2>By the Numbers</h2>
          <div className="ab-stats">
            <div className="ab-stat"><span className="ab-stat-num">10</span><span className="ab-stat-label">Window shapes</span></div>
            <div className="ab-stat"><span className="ab-stat-num">649</span><span className="ab-stat-label">Premium fabrics</span></div>
            <div className="ab-stat"><span className="ab-stat-num">47</span><span className="ab-stat-label">Collections</span></div>
            <div className="ab-stat"><span className="ab-stat-num">⅛&quot;</span><span className="ab-stat-label">Cutting precision</span></div>
            <div className="ab-stat"><span className="ab-stat-num">7</span><span className="ab-stat-label">Day shipping</span></div>
            <div className="ab-stat"><span className="ab-stat-num">6</span><span className="ab-stat-label">Fabric manufacturers</span></div>
          </div>

          <h2>Based in New York</h2>
          <p>World Wide Shades is headquartered in New York and ships nationwide across all 50 states. Our cutting facility handles everything from standard 24&quot; rectangles to 12-foot hexagons.</p>

          <div className="ab-cta-bar">
            <p>Ready to see what we can build for your windows?</p>
            <Link href="/builder" className="ab-cta">Open the Builder →</Link>
          </div>
        </div>
      </section>

      <style>{`
        .about {
          --ink: #0c0c0c; --ink2: #333; --ink3: #666;
          --cream: #f7f5f0; --warm: #eee9df; --sand: #d6cfc2;
          --gold: #c0993a; --gold-dk: #9a7a2a; --gold-lt: #e8d5a0;
          --white: #fefdfb;
          --ff: var(--font-sans, 'DM Sans', -apple-system, sans-serif);
          --fs: var(--font-serif, 'Instrument Serif', Georgia, serif);
          font-family: var(--ff); color: var(--ink); line-height: 1.6;
        }
        .ab-hero { padding: 5rem 2rem 3rem; text-align: center; position: relative; overflow: hidden; }
        .ab-glow { position: absolute; top: -40%; left: 50%; transform: translateX(-50%); width: 70vw; height: 50vw; background: conic-gradient(from 200deg, var(--cream), var(--warm), var(--cream)); border-radius: 50%; filter: blur(80px); z-index: 0; }
        .ab-hero-inner { position: relative; z-index: 1; }
        .ab-kicker { font-size: .72rem; font-weight: 700; letter-spacing: .25em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
        .ab-hero h1 { font-family: var(--fs); font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 400; line-height: 1.1; }
        .ab-hero h1 em { font-style: italic; color: var(--gold-dk); }
        .ab-body { padding: 2rem 2rem 5rem; }
        .ab-body-inner { max-width: 700px; margin: 0 auto; }
        .ab-lead { font-size: 1.15rem; color: var(--ink); line-height: 1.8; margin-bottom: 2rem; font-weight: 500; }
        .ab-body h2 { font-family: var(--fs); font-size: 1.6rem; font-weight: 400; margin: 2.5rem 0 .75rem; }
        .ab-body p { font-size: 1rem; color: var(--ink2); line-height: 1.85; margin-bottom: 1rem; }
        .ab-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 2rem 0; }
        .ab-stat { text-align: center; padding: 1.25rem; background: var(--cream); border-radius: 10px; }
        .ab-stat-num { display: block; font-family: var(--fs); font-size: 2rem; color: var(--ink); }
        .ab-stat-label { font-size: .75rem; text-transform: uppercase; letter-spacing: .1em; color: var(--ink3); }
        .ab-cta-bar { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; background: var(--ink); border-radius: 10px; margin-top: 3rem; gap: 1rem; flex-wrap: wrap; }
        .ab-cta-bar p { color: rgba(255,255,255,.7); font-size: .95rem; font-weight: 500; margin: 0; }
        .ab-cta { padding: .6rem 1.4rem; background: var(--gold-dk); color: #fff; font-size: .85rem; font-weight: 600; border-radius: 7px; transition: all .2s; white-space: nowrap; }
        .ab-cta:hover { background: var(--gold); }
        @media (max-width: 640px) { .ab-stats { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}
