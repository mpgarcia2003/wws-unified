import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { HomepageFaq } from './HomepageClient';

export const metadata: Metadata = {
  title: 'World Wide Shades | Custom Shades for Windows No One Else Can Fit',
  description:
    'Factory-direct custom window shades in any shape — triangles, trapezoids, pentagons, hexagons & more. 649 premium fabrics. Precision-cut to ⅛". Shipped in 7 days.',
  openGraph: {
    title: 'World Wide Shades | Custom Shades for Any Window Shape',
    description: 'Triangles, trapezoids, pentagons, hexagons — 649 fabrics, factory-direct, 7-day shipping.',
    type: 'website',
  },
};

/* ─── Data ─── */
const SHAPES = [
  { name: 'Standard Rectangle', slug: 'standard-rectangle', builder: 'Standard', img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895721/Bottom_Up_Rectangle_fuh9wo.png', popular: true },
  { name: 'Right Triangle – Left', slug: 'right-triangle-left', builder: 'Right Triangle Left', img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895716/Right_Triangle_left_gcmcpz.png' },
  { name: 'Right Triangle – Right', slug: 'right-triangle-right', builder: 'Right Triangle Right', img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895723/Right_Triangle_Right_ewqoan.png' },
  { name: 'Acute Triangle', slug: 'acute-triangle', builder: 'Acute Triangle', img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895721/Acute_Triangle_tlw47x.png' },
  { name: 'Trapezoid – Left', slug: 'trapezoid-left', builder: 'Trapezoid Left', img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895716/Trapezoid_Left_ofrqqd.png' },
  { name: 'Trapezoid – Right', slug: 'trapezoid-right', builder: 'Trapezoid Right', img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895719/Trapezoid_ksy87c.png' },
  { name: 'Flat Top Trapezoid – Right', slug: 'flat-top-trapezoid-right', builder: 'Flat Top Trapezoid Right', img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895717/Flat_Top_Trapezoid_right_lvvk96.png' },
  { name: 'Flat Top Trapezoid – Left', slug: 'flat-top-trapezoid-left', builder: 'Flat Top Trapezoid Left', img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895716/Trapezoid_Left_ofrqqd.png' },
  { name: 'Pentagon', slug: 'pentagon', builder: 'Pentagon', img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895717/Pentagon_cmdrjj.png' },
  { name: 'Flat Top Hexagon', slug: 'flat-top-hexagon', builder: 'Flat Top Hexagon', img: 'https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895722/Flat_Top_Hexagon_zlqbx3.png' },
];

const SWATCHES = [
  { color: '#B8754C', alt: 'Canyon' },
  { color: '#3C3C3C', alt: 'Charcoal' },
  { color: '#E8EDF0', alt: 'Ice' },
  { color: '#D4C9B8', alt: 'Linen' },
  { color: '#1A1A2E', alt: 'Midnight' },
  { color: '#8B8B8B', alt: 'Pewter' },
  { color: '#A89080', alt: 'Mushroom' },
  { color: '#9B9590', alt: 'Stone' },
];

const FAQS = [
  { q: 'What shapes can you actually make?', a: 'We manufacture shades for 10 window shapes: standard rectangles, right triangles (left & right), acute triangles, trapezoids (left & right), flat top trapezoids (left & right), pentagons, and flat top hexagons. If your window has angles, we can fit it.' },
  { q: 'How is this so much cheaper than my local dealer?', a: 'No showroom rent. No sales commission. No distributor markup. You\'re buying factory-direct from the same people who cut and sew your shade. The materials are identical to what dealers sell — Phifer, Mermet, Ferrari — you just skip the 40-60% retail markup.' },
  { q: 'What if I\'m not sure about a fabric color?', a: 'Request up to 5 free physical swatches through our builder. No credit card. No commitment. We ship them to your door so you can see and feel the material against your walls, in your light, before you spend a dime.' },
  { q: 'How long until I get my shades?', a: 'Most orders ship within 7 business days. Every shade is precision-cut to your exact specifications — nothing comes off a shelf. Specialty shapes may take an extra 2-3 days for the custom cutting process.' },
  { q: 'What\'s the difference between solar and blackout?', a: 'Solar and light filtering fabrics reduce glare and block UV while preserving your view. Blackout fabrics block 100% of light, ideal for bedrooms or media rooms. Our builder shows both categories with preview images.' },
  { q: 'Can I really measure my triangle/trapezoid window myself?', a: 'Yes. Our builder shows a diagram for each shape with exactly where to measure. Measure to the nearest ⅛" — our builder accepts fractional dimensions. If you\'re nervous, we offer a professional measurement service too.' },
];

/* ─── Structured Data (Organization + LocalBusiness + Speakable) ─── */
const homepageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://worldwideshades.com/#org',
      name: 'World Wide Shades',
      url: 'https://worldwideshades.com',
      logo: 'https://worldwideshades.com/logo.png',
      description: 'Factory-direct custom window shades for specialty shapes — triangles, trapezoids, pentagons, hexagons. 649 premium fabrics, precision-cut to ⅛", shipped in 7 days.',
      email: 'info@worldwideshades.com',
      sameAs: [],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'info@worldwideshades.com',
        contactType: 'customer service',
        availableLanguage: ['English'],
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://worldwideshades.com/#business',
      name: 'World Wide Shades',
      url: 'https://worldwideshades.com',
      image: 'https://worldwideshades.com/logo.png',
      email: 'info@worldwideshades.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'New York',
        addressRegion: 'NY',
        addressCountry: 'US',
      },
      areaServed: [
        { '@type': 'Country', name: 'United States' },
      ],
      priceRange: '$153-$3937',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://worldwideshades.com/#website',
      url: 'https://worldwideshades.com',
      name: 'World Wide Shades',
      publisher: { '@id': 'https://worldwideshades.com/#org' },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://worldwideshades.com/#homepage',
      url: 'https://worldwideshades.com',
      name: 'Custom Shades for Windows No One Else Can Fit',
      isPartOf: { '@id': 'https://worldwideshades.com/#website' },
      about: { '@id': 'https://worldwideshades.com/#org' },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.hp-hero-body', '.hp-hero-stats'],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <div className="hp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }} />
      {/* ═══════ HERO ═══════ */}
      <section className="hp-hero">
        <div className="hp-hero-glow" aria-hidden="true" />
        <div className="hp-hero-inner">
          <div className="hp-hero-text">
            <p className="hp-kicker">Custom Window Shades</p>
            <h1>Custom Shades for<br />Windows <em>No One Else</em><br />Can Fit.</h1>
            <p className="hp-hero-body">
              Every other company turns you away when you have specialty shapes.
              Triangles, trapezoids, pentagons, hexagons — <strong>we built our entire
              operation around the shapes they won&apos;t touch.</strong>
            </p>
            <div className="hp-hero-stats">
              <div className="hp-stat"><div className="hp-stat-num">10</div><div className="hp-stat-label">Shapes</div></div>
              <div className="hp-stat"><div className="hp-stat-num">649</div><div className="hp-stat-label">Fabrics</div></div>
              <div className="hp-stat"><div className="hp-stat-num">47</div><div className="hp-stat-label">Collections</div></div>
              <div className="hp-stat"><div className="hp-stat-num">7 days</div><div className="hp-stat-label">Shipping</div></div>
            </div>
            <div className="hp-hero-ctas">
              <Link href="/builder" className="hp-cta-main">Design Your Shade <span>→</span></Link>
              <Link href="/shades" className="hp-cta-ghost">Browse all shapes</Link>
            </div>
            <p className="hp-micro">No account needed · Instant pricing · Free swatches available</p>
          </div>
          <div className="hp-hero-visual">
            <div className="hp-float-shapes" aria-hidden="true">
              <div className="hp-fs hp-fs-tri">△</div>
              <div className="hp-fs hp-fs-pent">⬠</div>
              <div className="hp-fs hp-fs-trap">▱</div>
              <div className="hp-fs hp-fs-hex">⬡</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PAIN ═══════ */}
      <section className="hp-pain">
        <div className="hp-pain-inner">
          <h2>You Called Three Companies.<br /><em>All Three Said No.</em></h2>
          <div className="hp-pain-cards">
            <div className="hp-pain-card">
              <span className="hp-x">✕</span>
              <p>&ldquo;We only make rectangular shades.&rdquo; Two companies didn&apos;t even let you finish describing the window.</p>
            </div>
            <div className="hp-pain-card">
              <span className="hp-x">✕</span>
              <p>The one dealer who could do it wanted $1,400 per window — plus a 6-week wait and an in-home measurement fee.</p>
            </div>
            <div className="hp-pain-card">
              <span className="hp-x">✕</span>
              <p>You searched online and found stock photos, vague &ldquo;call for quote&rdquo; pages, and zero real pricing.</p>
            </div>
          </div>
          <p className="hp-pain-turn">
            Your window isn&apos;t the problem. The industry is.<br />
            Most manufacturers refuse specialty shapes because angled cuts slow their production line.<br />
            <strong>We built our entire operation around the shapes they won&apos;t touch.</strong>
          </p>
        </div>
      </section>

      {/* ═══════ SHAPES GRID ═══════ */}
      <section id="shapes" className="hp-shapes">
        <div className="hp-shapes-inner">
          <p className="hp-kicker hp-kicker--center">10 Window Shapes</p>
          <h2>Which Shape Is Your Window?</h2>
          <p className="hp-shapes-sub">Select your window shape to see details, or jump straight into the builder.</p>
          <div className="hp-shapes-grid">
            {SHAPES.map((s) => (
              <Link key={s.slug} href={`/shades/${s.slug}`} className="hp-shape-card">
                <Image src={s.img} alt={s.name} width={64} height={64} className="hp-shape-img" />
                <span className="hp-shape-name">{s.name}</span>
                {s.popular && <span className="hp-shape-badge">Most Popular</span>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="hp-how">
        <div className="hp-how-inner">
          <p className="hp-kicker hp-kicker--center">How It Works</p>
          <h2>Three Steps. No Showroom. No Quote Forms.</h2>
          <div className="hp-how-grid">
            <div className="hp-how-step">
              <div className="hp-how-num">1</div>
              <h3>Select Your Shape</h3>
              <p>Pick from 10 window shapes. Our builder shows a labeled diagram so you pick the right one.</p>
            </div>
            <div className="hp-how-step">
              <div className="hp-how-num">2</div>
              <h3>Measure &amp; Choose Fabric</h3>
              <p>Enter your dimensions to ⅛&quot;. Pick from 649 fabrics — solar, blackout, or light filtering. Watch your price update live.</p>
            </div>
            <div className="hp-how-step">
              <div className="hp-how-num">3</div>
              <h3>We Build &amp; Ship in 7 Days</h3>
              <p>Precision-cut in our facility. Factory-direct to your door. Same materials as commercial installations — without the markup.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FABRICS ═══════ */}
      <section className="hp-fabrics">
        <div className="hp-fabrics-inner">
          <p className="hp-kicker hp-kicker--center">Premium Materials</p>
          <h2>649 Fabrics. Same Ones in<br />That Hotel Lobby You Loved.</h2>
          <p className="hp-fabrics-sub">Phifer. Mermet. Ferrari. Copaco. Commercial-grade materials — factory-direct, without the dealer markup.</p>
          <div className="hp-fab-scroll">
            {SWATCHES.map((sw) => (
              <div key={sw.alt} className="hp-fab-swatch" title={sw.alt}>
                <div style={{ width: '100%', height: '100%', background: sw.color }} />
              </div>
            ))}
          </div>
          <p className="hp-fab-note">Not sure about a color? We&apos;ll ship up to 5 free swatches to your door. No credit card.</p>
        </div>
      </section>

      {/* ═══════ WHY WWS ═══════ */}
      <section className="hp-why">
        <div className="hp-why-inner">
          <p className="hp-kicker hp-kicker--center">Why World Wide Shades</p>
          <h2>What Makes Us Different</h2>
          <div className="hp-why-grid">
            {[
              { icon: '◇', title: 'Shapes Others Won\'t Touch', desc: '10 shapes including triangles, trapezoids, pentagons, and hexagons. We built our production line for angles.' },
              { icon: '⊘', title: 'Factory-Direct Pricing', desc: 'No showroom, no dealer, no distributor. Same commercial-grade materials at 40-60% less than retail.' },
              { icon: '⚡', title: 'Instant Online Pricing', desc: 'See your exact price the moment you enter measurements. No "call for quote." No waiting.' },
              { icon: '◎', title: 'Free Swatches', desc: 'Up to 5 free fabric swatches shipped to your door. See and feel the material before you commit.' },
              { icon: '⅛"', title: 'Precision Cut', desc: 'Every shade cut to ⅛" precision. No "close enough." No light gaps.' },
              { icon: '⚙', title: 'Motorized Options', desc: 'Add a rechargeable motor to any rectangular shade. Remote-controlled. USB-C rechargeable.' },
            ].map((item) => (
              <div key={item.title} className="hp-why-card">
                <span className="hp-why-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="hp-faq">
        <div className="hp-faq-inner">
          <p className="hp-kicker hp-kicker--center">Common Questions</p>
          <h2>Frequently Asked Questions</h2>
          <HomepageFaq faqs={FAQS} />
        </div>
      </section>

      {/* ═══════ CLOSER ═══════ */}
      <section className="hp-closer">
        <div className="hp-closer-inner">
          <h2>Your Window Isn&apos;t <em>Impossible.</em><br />You Just Haven&apos;t Found Us Yet.</h2>
          <p className="hp-closer-sub">Design online in minutes. See your exact price. Shipped factory-direct in 7 days.</p>
          <Link href="/builder" className="hp-cta-main hp-cta-main--closer">Design Your Shade <span>→</span></Link>
          <p className="hp-closer-micro">No account · Free swatches · Instant pricing · 7-day shipping</p>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="hp-footer">
        <div className="hp-footer-inner">
          <div className="hp-footer-brand">
            <span className="hp-footer-logo">World Wide <em>Shades</em></span>
            <p>Custom shades for every window shape. Factory-direct.</p>
          </div>
          <div className="hp-footer-links">
            <Link href="/shades">All Shapes</Link>
            <Link href="/builder">Builder</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
        <p className="hp-footer-copy">© {new Date().getFullYear()} World Wide Shades. All rights reserved.</p>
      </footer>

      {/* ═══════ ALL STYLES ═══════ */}
      <style>{`
        .hp {
          --ink: #0c0c0c; --ink2: #333; --ink3: #666;
          --cream: #f7f5f0; --warm: #eee9df; --sand: #d6cfc2;
          --gold: #c0993a; --gold-dk: #9a7a2a; --gold-lt: #e8d5a0;
          --white: #fefdfb;
          --ff: var(--font-sans, 'DM Sans', -apple-system, sans-serif);
          --fs: var(--font-serif, 'Instrument Serif', Georgia, serif);
          font-family: var(--ff); color: var(--ink); line-height: 1.6;
        }

        /* ─── Shared ─── */
        .hp-kicker {
          font-size: .72rem; font-weight: 700; letter-spacing: .25em;
          text-transform: uppercase; color: var(--gold);
          margin-bottom: 1rem; display: flex; align-items: center; gap: .75rem;
        }
        .hp-kicker::before { content: ''; width: 28px; height: 1.5px; background: var(--gold); }
        .hp-kicker--center { justify-content: center; text-align: center; }
        .hp-kicker--center::after { content: ''; width: 28px; height: 1.5px; background: var(--gold); }
        .hp h2 { font-family: var(--fs); font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 400; line-height: 1.12; text-align: center; margin-bottom: 1.5rem; }
        .hp h2 em { font-style: italic; color: var(--gold-dk); }
        .hp-cta-main {
          display: inline-flex; align-items: center; gap: .6rem;
          padding: 1rem 2.2rem; background: var(--ink); color: #fff;
          font-weight: 600; font-size: .95rem; border-radius: 8px;
          transition: all .3s; box-shadow: 0 2px 12px rgba(0,0,0,.12);
        }
        .hp-cta-main:hover { background: var(--gold-dk); transform: translateY(-2px); box-shadow: 0 6px 24px rgba(154,122,42,.25); }
        .hp-cta-main--closer { background: var(--gold-dk); font-size: 1.05rem; padding: 1.1rem 2.5rem; }
        .hp-cta-main--closer:hover { background: var(--gold); }
        .hp-cta-ghost { font-size: .9rem; font-weight: 600; color: var(--ink2); border-bottom: 1.5px solid var(--sand); padding-bottom: 2px; transition: all .2s; }
        .hp-cta-ghost:hover { color: var(--gold-dk); border-color: var(--gold); }
        .hp-micro { font-size: .75rem; color: var(--ink3); margin-top: 1rem; }

        /* ═══════ HERO ═══════ */
        .hp-hero {
          min-height: 92vh; display: flex; align-items: center;
          padding: 5rem 2rem 4rem; position: relative; overflow: hidden;
        }
        .hp-hero-glow {
          position: absolute; top: -20%; right: -10%;
          width: 70vw; height: 70vw;
          background: conic-gradient(from 200deg, var(--cream), var(--warm), var(--cream), rgba(192,153,58,.08), var(--cream));
          border-radius: 50%; filter: blur(80px); z-index: 0;
        }
        .hp-hero-inner {
          max-width: 1200px; margin: 0 auto; width: 100%;
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;
          align-items: center; position: relative; z-index: 1;
        }
        .hp-hero h1 {
          font-family: var(--fs); font-size: clamp(2.6rem, 4.8vw, 4rem);
          font-weight: 400; line-height: 1.08; letter-spacing: -.03em; margin-bottom: 1.25rem;
        }
        .hp-hero h1 em { font-style: italic; color: var(--gold-dk); }
        .hp-hero-body { font-size: 1.08rem; color: var(--ink2); line-height: 1.75; margin-bottom: .5rem; max-width: 500px; }
        .hp-hero-body strong { color: var(--ink); font-weight: 600; }
        .hp-hero-stats { display: flex; gap: 2rem; margin: 1.75rem 0 2rem; }
        .hp-stat-num { font-family: var(--fs); font-size: 1.8rem; color: var(--ink); }
        .hp-stat-label { font-size: .7rem; text-transform: uppercase; letter-spacing: .12em; color: var(--ink3); }
        .hp-hero-ctas { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }

        /* Floating shapes */
        .hp-hero-visual { position: relative; display: flex; align-items: center; justify-content: center; min-height: 360px; }
        .hp-float-shapes { position: relative; width: 320px; height: 320px; }
        .hp-fs {
          position: absolute; font-size: 5rem; color: var(--sand); opacity: .45;
          animation: hpFloat 8s ease-in-out infinite;
        }
        .hp-fs-tri { top: 0; left: 50%; transform: translateX(-50%); font-size: 7rem; color: var(--gold-lt); opacity: .5; animation-delay: 0s; }
        .hp-fs-pent { top: 40%; right: 0; animation-delay: -2s; }
        .hp-fs-trap { bottom: 10%; left: 10%; animation-delay: -4s; }
        .hp-fs-hex { top: 20%; left: 0; animation-delay: -6s; }
        @keyframes hpFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }

        /* ═══════ PAIN ═══════ */
        .hp-pain {
          padding: 7rem 2rem; background: var(--ink); color: #fff;
          position: relative; overflow: hidden;
        }
        .hp-pain::before {
          content: ''; position: absolute; top: -50%; right: -20%;
          width: 60vw; height: 60vw;
          background: radial-gradient(circle, rgba(192,153,58,.06), transparent 70%);
          border-radius: 50%;
        }
        .hp-pain-inner { max-width: 800px; margin: 0 auto; position: relative; z-index: 1; text-align: center; }
        .hp-pain h2 { color: #fff; }
        .hp-pain h2 em { color: var(--gold-lt); }
        .hp-pain-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 3rem 0; text-align: left; }
        .hp-pain-card { padding: 1.5rem; border-radius: 10px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); }
        .hp-x { color: #e74c3c; font-size: 1.2rem; font-weight: 700; margin-bottom: .5rem; display: block; }
        .hp-pain-card p { font-size: .92rem; color: rgba(255,255,255,.7); line-height: 1.65; }
        .hp-pain-turn { font-size: 1.1rem; color: rgba(255,255,255,.5); margin-top: 2rem; line-height: 1.7; }
        .hp-pain-turn strong { color: var(--gold-lt); font-weight: 600; }

        /* ═══════ SHAPES GRID ═══════ */
        .hp-shapes { padding: 7rem 2rem; background: var(--cream); }
        .hp-shapes-inner { max-width: 1000px; margin: 0 auto; }
        .hp-shapes-sub { text-align: center; color: var(--ink2); font-size: 1rem; max-width: 500px; margin: -.5rem auto 2.5rem; }
        .hp-shapes-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; }
        .hp-shape-card {
          position: relative; display: flex; flex-direction: column; align-items: center;
          padding: 1.5rem 1rem; background: var(--white); border: 1.5px solid var(--sand);
          border-radius: 10px; transition: all .35s;
        }
        .hp-shape-card:hover { border-color: var(--gold); transform: translateY(-6px); box-shadow: 0 12px 36px rgba(192,153,58,.1); }
        .hp-shape-img { width: 56px; height: 56px; object-fit: contain; filter: brightness(0) opacity(.5); margin-bottom: .75rem; transition: all .3s; }
        .hp-shape-card:hover .hp-shape-img { filter: brightness(0) opacity(1); }
        .hp-shape-name { font-size: .75rem; font-weight: 600; text-align: center; line-height: 1.3; }
        .hp-shape-badge {
          position: absolute; top: .5rem; right: .5rem;
          font-size: .55rem; font-weight: 700; letter-spacing: .06em;
          text-transform: uppercase; padding: .2rem .4rem;
          background: var(--gold); color: #fff; border-radius: 3px;
        }

        /* ═══════ HOW ═══════ */
        .hp-how { padding: 7rem 2rem; background: var(--white); }
        .hp-how-inner { max-width: 1000px; margin: 0 auto; }
        .hp-how h2 { margin-bottom: 3.5rem; }
        .hp-how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; position: relative; }
        .hp-how-grid::before { content: ''; position: absolute; top: 32px; left: 16.5%; right: 16.5%; height: 1px; background: var(--sand); z-index: 0; }
        .hp-how-step { text-align: center; position: relative; z-index: 1; padding: 0 1.5rem; }
        .hp-how-num {
          width: 64px; height: 64px; border-radius: 50%;
          background: var(--cream); border: 2px solid var(--sand);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--fs); font-size: 1.4rem; color: var(--gold-dk);
          margin: 0 auto 1.25rem; transition: all .3s;
        }
        .hp-how-step:hover .hp-how-num { background: var(--ink); border-color: var(--ink); color: var(--gold-lt); }
        .hp-how-step h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: .5rem; }
        .hp-how-step p { font-size: .9rem; color: var(--ink2); line-height: 1.65; }

        /* ═══════ FABRICS ═══════ */
        .hp-fabrics { padding: 7rem 2rem; background: var(--cream); }
        .hp-fabrics-inner { max-width: 1000px; margin: 0 auto; text-align: center; }
        .hp-fabrics-sub { color: var(--ink2); font-size: 1rem; max-width: 560px; margin: 0 auto 2.5rem; line-height: 1.7; }
        .hp-fab-scroll { display: flex; gap: 1rem; overflow-x: auto; padding: .5rem 0 1rem; scroll-snap-type: x mandatory; }
        .hp-fab-scroll::-webkit-scrollbar { height: 3px; }
        .hp-fab-scroll::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 4px; }
        .hp-fab-swatch {
          flex-shrink: 0; width: 160px; height: 160px; border-radius: 10px; overflow: hidden;
          border: 2px solid #e5e0d6; scroll-snap-align: start; transition: all .3s;
        }
        .hp-fab-swatch:hover { border-color: var(--gold); transform: scale(1.04); }
        .hp-fab-swatch img { width: 100%; height: 100%; object-fit: cover; }
        .hp-fab-note { font-size: .85rem; color: var(--ink3); margin-top: 1.5rem; }

        /* ═══════ WHY ═══════ */
        .hp-why { padding: 7rem 2rem; background: var(--white); }
        .hp-why-inner { max-width: 1000px; margin: 0 auto; }
        .hp-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-top: 2rem; }
        .hp-why-card {
          padding: 1.75rem; background: var(--cream); border: 1px solid var(--sand);
          border-radius: 10px; transition: all .3s;
        }
        .hp-why-card:hover { border-color: var(--gold); transform: translateY(-3px); box-shadow: 0 8px 24px rgba(192,153,58,.08); }
        .hp-why-icon { font-size: 1.4rem; color: var(--gold); margin-bottom: .5rem; display: block; }
        .hp-why-card h3 { font-size: .95rem; font-weight: 700; margin-bottom: .4rem; }
        .hp-why-card p { font-size: .85rem; color: var(--ink2); line-height: 1.6; }

        /* ═══════ FAQ ═══════ */
        .hp-faq { padding: 7rem 2rem; background: var(--cream); }
        .hp-faq-inner { max-width: 700px; margin: 0 auto; }
        /* FAQ reuses lp-faq-* classes from HomepageFaq */
        .hp-faq .lp-faq-item { border-bottom: 1px solid var(--sand); }
        .hp-faq .lp-faq-q {
          width: 100%; padding: 1.2rem 0; font-weight: 600; font-size: .95rem;
          cursor: pointer; display: flex; justify-content: space-between; align-items: center;
          background: none; border: none; font-family: var(--ff); color: var(--ink); text-align: left; transition: color .2s;
        }
        .hp-faq .lp-faq-q:hover { color: var(--gold-dk); }
        .hp-faq .lp-faq-plus { font-size: 1.3rem; font-weight: 300; color: var(--gold); transition: transform .3s; flex-shrink: 0; margin-left: 1rem; }
        .hp-faq .lp-faq-item.open .lp-faq-plus { transform: rotate(45deg); }
        .hp-faq .lp-faq-a { font-size: .9rem; color: var(--ink2); line-height: 1.7; max-height: 0; overflow: hidden; transition: max-height .35s ease, padding .35s ease; padding: 0; }
        .hp-faq .lp-faq-item.open .lp-faq-a { max-height: 400px; padding-bottom: 1.2rem; }

        /* ═══════ CLOSER ═══════ */
        .hp-closer {
          padding: 8rem 2rem; text-align: center;
          background: var(--ink); position: relative; overflow: hidden;
        }
        .hp-closer::before {
          content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 60vw; height: 60vw;
          background: radial-gradient(circle, rgba(192,153,58,.08), transparent 60%);
          border-radius: 50%;
        }
        .hp-closer-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
        .hp-closer h2 { color: #fff; }
        .hp-closer h2 em { color: var(--gold-lt); }
        .hp-closer-sub { font-size: 1.05rem; color: rgba(255,255,255,.5); margin-bottom: 2.5rem; line-height: 1.7; }
        .hp-closer-micro { font-size: .78rem; color: rgba(255,255,255,.3); margin-top: 1.25rem; }

        /* ═══════ FOOTER ═══════ */
        .hp-footer { padding: 3rem 2rem 1.5rem; background: var(--ink); border-top: 1px solid rgba(255,255,255,.05); }
        .hp-footer-inner { max-width: 800px; margin: 0 auto; display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,.06); }
        .hp-footer-logo { font-family: var(--fs); font-size: 1.1rem; color: #fff; display: block; margin-bottom: .35rem; }
        .hp-footer-logo em { color: var(--gold); font-style: italic; }
        .hp-footer-brand p { font-size: .78rem; color: rgba(255,255,255,.3); }
        .hp-footer-links { display: flex; flex-wrap: wrap; gap: .6rem 1.25rem; }
        .hp-footer-links a { font-size: .8rem; color: rgba(255,255,255,.35); transition: color .2s; }
        .hp-footer-links a:hover { color: var(--gold); }
        .hp-footer-copy { text-align: center; font-size: .72rem; color: rgba(255,255,255,.15); margin-top: 1.5rem; }

        /* ═══════ RESPONSIVE ═══════ */
        @media (max-width: 768px) {
          .hp-hero-inner { grid-template-columns: 1fr; text-align: center; }
          .hp-hero-visual { display: none; }
          .hp-hero-body { max-width: 100%; }
          .hp-hero-stats { justify-content: center; }
          .hp-hero-ctas { justify-content: center; }
          .hp-hero .hp-kicker { justify-content: center; }
          .hp-pain-cards { grid-template-columns: 1fr; }
          .hp-shapes-grid { grid-template-columns: repeat(2, 1fr); }
          .hp-how-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .hp-how-grid::before { display: none; }
          .hp-why-grid { grid-template-columns: 1fr; }
          .hp-footer-inner { flex-direction: column; align-items: center; text-align: center; }
          .hp-footer-links { justify-content: center; }
        }
      `}</style>
    </div>
  );
}
