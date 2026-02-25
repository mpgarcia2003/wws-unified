import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SHAPE_PAGES, ALL_SHAPE_SLUGS } from './shapeData';

export const metadata: Metadata = {
  title: 'Custom Window Shades by Shape | All 10 Shapes',
  description:
    'Design custom window shades for any shape — rectangles, triangles, trapezoids, pentagons & hexagons. 649 premium fabrics. Instant pricing. Ships in 7 days.',
  alternates: { canonical: 'https://worldwideshades.com/shades' },
};

const shapes = ALL_SHAPE_SLUGS.map((s) => SHAPE_PAGES[s]);

export default function ShadesHubPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Custom Window Shades by Shape',
    description: 'All 10 custom window shade shapes available at World Wide Shades.',
    url: 'https://worldwideshades.com/shades',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: shapes.length,
      itemListElement: shapes.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://worldwideshades.com/shades/${s.slug}`,
        name: s.name,
      })),
    },
  };

  return (
    <div className="hub">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero ── */}
      <section className="hub-hero">
        <div className="hub-hero-glow" aria-hidden="true" />
        <div className="hub-hero-inner">
          <p className="hub-kicker">10 Shapes · 649 Fabrics · 7-Day Shipping</p>
          <h1>Custom Shades for<br /><em>Every Window Shape</em></h1>
          <p className="hub-sub">Rectangles, triangles, trapezoids, pentagons, hexagons — we build shades for the shapes everyone else turns away. Pick yours below.</p>
        </div>
      </section>

      {/* ── Shape grid ── */}
      <section className="hub-grid-section">
        <div className="hub-grid-inner">
          <div className="hub-grid">
            {shapes.map((s) => (
              <Link key={s.slug} href={`/shades/${s.slug}`} className="hub-card">
                <div className="hub-card-img">
                  <Image src={s.mask} alt={s.name} width={80} height={80} className="hub-card-shape" />
                </div>
                <h2>{s.name}</h2>
                <p>{s.subhead.slice(0, 80)}{s.subhead.length > 80 ? '...' : ''}</p>
                <span className="hub-card-link">View details →</span>
                {s.slug === 'standard-rectangle' && <span className="hub-badge">Most Popular</span>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Not sure CTA ── */}
      <section className="hub-cta">
        <div className="hub-cta-inner">
          <h2>Not Sure Which Shape You Have?</h2>
          <p>Take a photo of your window and email it to us. We&apos;ll tell you the exact shape and which measurements you need.</p>
          <div className="hub-cta-btns">
            <Link href="/builder" className="hub-btn">Open the Builder →</Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="hub-footer">
        <p>© {new Date().getFullYear()} World Wide Shades. All rights reserved.</p>
      </footer>

      <style>{`
        .hub {
          --ink: #0c0c0c; --ink2: #333; --ink3: #666;
          --cream: #f7f5f0; --warm: #eee9df; --sand: #d6cfc2;
          --gold: #c0993a; --gold-dk: #9a7a2a; --gold-lt: #e8d5a0;
          --white: #fefdfb;
          --ff: var(--font-sans, 'DM Sans', -apple-system, sans-serif);
          --fs: var(--font-serif, 'Instrument Serif', Georgia, serif);
          font-family: var(--ff); color: var(--ink); line-height: 1.6;
        }

        /* ─ Hero ─ */
        .hub-hero {
          padding: 6rem 2rem 4rem; text-align: center;
          position: relative; overflow: hidden;
        }
        .hub-hero-glow {
          position: absolute; top: -40%; left: 50%; transform: translateX(-50%);
          width: 80vw; height: 60vw;
          background: conic-gradient(from 200deg, var(--cream), var(--warm), var(--cream), rgba(192,153,58,.08), var(--cream));
          border-radius: 50%; filter: blur(80px); z-index: 0;
        }
        .hub-hero-inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
        .hub-kicker {
          font-size: .72rem; font-weight: 700; letter-spacing: .25em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 1.25rem;
        }
        .hub-hero h1 {
          font-family: var(--fs); font-size: clamp(2.4rem, 4.5vw, 3.6rem);
          font-weight: 400; line-height: 1.08; letter-spacing: -.03em; margin-bottom: 1.25rem;
        }
        .hub-hero h1 em { font-style: italic; color: var(--gold-dk); }
        .hub-sub { font-size: 1.05rem; color: var(--ink2); line-height: 1.75; max-width: 560px; margin: 0 auto; }

        /* ─ Grid ─ */
        .hub-grid-section { padding: 3rem 2rem 6rem; background: var(--white); }
        .hub-grid-inner { max-width: 1100px; margin: 0 auto; }
        .hub-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .hub-card {
          position: relative; padding: 2rem 1.5rem 1.5rem;
          background: var(--cream); border: 1.5px solid var(--sand);
          border-radius: 12px; transition: all .35s; display: flex;
          flex-direction: column; align-items: center; text-align: center;
        }
        .hub-card:hover { border-color: var(--gold); transform: translateY(-6px); box-shadow: 0 14px 40px rgba(192,153,58,.1); }
        .hub-card-img { margin-bottom: 1rem; }
        .hub-card-shape { width: 72px; height: 72px; object-fit: contain; filter: brightness(0) opacity(.5); transition: all .3s; }
        .hub-card:hover .hub-card-shape { filter: brightness(0) opacity(1); }
        .hub-card h2 { font-family: var(--ff); font-size: 1rem; font-weight: 700; margin-bottom: .35rem; text-align: center; }
        .hub-card p { font-size: .82rem; color: var(--ink3); line-height: 1.55; margin-bottom: .75rem; flex: 1; }
        .hub-card-link { font-size: .8rem; font-weight: 600; color: var(--gold-dk); transition: color .2s; }
        .hub-card:hover .hub-card-link { color: var(--gold); }
        .hub-badge {
          position: absolute; top: .75rem; right: .75rem;
          font-size: .65rem; font-weight: 700; letter-spacing: .06em;
          text-transform: uppercase; padding: .3rem .6rem;
          background: var(--gold); color: #fff; border-radius: 4px;
        }

        /* ─ CTA ─ */
        .hub-cta { padding: 6rem 2rem; background: var(--ink); text-align: center; }
        .hub-cta-inner { max-width: 560px; margin: 0 auto; }
        .hub-cta h2 { font-family: var(--fs); font-size: clamp(1.6rem, 3vw, 2.4rem); color: #fff; font-weight: 400; margin-bottom: .75rem; }
        .hub-cta p { font-size: 1rem; color: rgba(255,255,255,.5); line-height: 1.7; margin-bottom: 2rem; }
        .hub-btn {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .9rem 2rem; background: var(--gold-dk); color: #fff;
          font-weight: 600; font-size: .95rem; border-radius: 8px;
          transition: all .3s;
        }
        .hub-btn:hover { background: var(--gold); transform: translateY(-2px); }

        /* ─ Footer ─ */
        .hub-footer { padding: 2.5rem 2rem; background: var(--ink); border-top: 1px solid rgba(255,255,255,.05); text-align: center; }
        .hub-footer p { font-size: .75rem; color: rgba(255,255,255,.2); }

        @media (max-width: 768px) {
          .hub-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .hub-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
