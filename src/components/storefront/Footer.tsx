import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="wws-footer">
      <div className="wws-footer-inner">

        {/* Col 1 — Brand (2x width) */}
        <div className="wws-footer-brand">
          <Link href="/" className="wws-footer-logo">
            World Wide <em>Shades</em>
          </Link>
          <p className="wws-footer-desc">
            Factory-direct custom window shades for specialty shapes — triangles, trapezoids,
            pentagons, hexagons. 649 premium fabrics. Precision-cut to ⅛&quot;.
          </p>
          <address className="wws-footer-addr">
            26 Broadway Suite 934<br />
            New York, NY 10004
          </address>
          <a href="tel:+18446742716" className="wws-footer-phone">(844) 674-2716</a>
          <p className="wws-footer-tag">Founded by industry veterans &bull; Made in USA 🇺🇸</p>
        </div>

        {/* Col 2 — Specialty Shapes */}
        <div>
          <h4 className="wws-footer-heading">Specialty Shapes</h4>
          <ul className="wws-footer-list">
            <li><Link href="/pages/triangle-shades">Triangle Shades</Link></li>
            <li><Link href="/pages/trapezoid-shades">Trapezoid Shades</Link></li>
            <li><Link href="/pages/hexagon-shades">Hexagon Shades</Link></li>
            <li><Link href="/pages/pentagon-shades">Pentagon Shades</Link></li>
            <li><Link href="/pages/specialty-shades">All Specialty Shapes</Link></li>
            <li><Link href="/pages/exterior-shades">Exterior Shades</Link></li>
          </ul>
        </div>

        {/* Col 3 — Products */}
        <div>
          <h4 className="wws-footer-heading">Products</h4>
          <ul className="wws-footer-list">
            <li><Link href="/pages/blackout-shades">Blackout Shades</Link></li>
            <li><Link href="/pages/solar-roller-shades">Solar Roller Shades</Link></li>
            <li><Link href="/pages/motorized-shades">Motorized Shades</Link></li>
            <li><Link href="/collections/all">All Products</Link></li>
            <li><Link href="/pages/builder">Shade Builder</Link></li>
            <li><Link href="/pages/free-samples">Free Samples</Link></li>
          </ul>
        </div>

        {/* Col 4 — Support */}
        <div>
          <h4 className="wws-footer-heading">Support</h4>
          <ul className="wws-footer-list">
            <li><Link href="/pages/faq">FAQ</Link></li>
            <li><Link href="/pages/contact">Contact Us</Link></li>
            <li><Link href="/blogs/news">Blog</Link></li>
            <li><Link href="/pages/about">About Us</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
          </ul>
        </div>

      </div>

      <div className="wws-footer-bottom">
        <p>&copy; {year} World Wide Shades. All rights reserved. Handcrafted in the USA 🇺🇸</p>
        <div className="wws-footer-bottom-links">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>

      <style>{`
        .wws-footer {
          background: #0c0c0c; color: rgba(255,255,255,.6);
          font-family: var(--font-sans, 'DM Sans', -apple-system, sans-serif);
          font-size: .85rem; line-height: 1.6;
        }
        .wws-footer-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 4rem 2rem 3rem;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
        }
        .wws-footer-logo {
          font-family: var(--font-serif, 'Instrument Serif', Georgia, serif);
          font-size: 1.15rem; color: #fff; text-decoration: none;
          display: block; margin-bottom: .75rem;
        }
        .wws-footer-logo em { font-style: italic; color: #c0993a; }
        .wws-footer-desc { color: rgba(255,255,255,.4); font-size: .82rem; line-height: 1.7; margin-bottom: 1.25rem; }
        .wws-footer-addr { font-style: normal; color: rgba(255,255,255,.35); font-size: .8rem; line-height: 1.7; margin-bottom: .5rem; }
        .wws-footer-phone { color: rgba(255,255,255,.55); font-size: .82rem; font-weight: 600; text-decoration: none; display: block; margin-bottom: .75rem; transition: color .2s; }
        .wws-footer-phone:hover { color: #c0993a; }
        .wws-footer-tag { font-size: .72rem; color: rgba(255,255,255,.25); margin-top: .5rem; }

        .wws-footer-heading {
          font-size: .65rem; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; color: rgba(255,255,255,.35);
          margin-bottom: 1rem;
        }
        .wws-footer-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: .55rem; }
        .wws-footer-list a { color: rgba(255,255,255,.45); text-decoration: none; font-size: .83rem; transition: color .2s; }
        .wws-footer-list a:hover { color: #c0993a; }

        .wws-footer-bottom {
          max-width: 1200px; margin: 0 auto;
          padding: 1.25rem 2rem;
          border-top: 1px solid rgba(255,255,255,.07);
          display: flex; justify-content: space-between; align-items: center;
          gap: 1rem; flex-wrap: wrap;
          font-size: .72rem; color: rgba(255,255,255,.2);
        }
        .wws-footer-bottom-links { display: flex; gap: 1.5rem; }
        .wws-footer-bottom-links a { color: rgba(255,255,255,.2); text-decoration: none; transition: color .2s; }
        .wws-footer-bottom-links a:hover { color: rgba(255,255,255,.5); }

        @media (max-width: 900px) {
          .wws-footer-inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
          .wws-footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 560px) {
          .wws-footer-inner { grid-template-columns: 1fr; padding: 3rem 1.5rem 2rem; }
          .wws-footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
