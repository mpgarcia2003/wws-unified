import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SHAPE_PAGES, ALL_SHAPE_SLUGS, getShapeData } from '../shapeData';
import { ShapeFaqAccordion } from './ShapeFaqClient';

/* ── Static params for SSG ── */
export function generateStaticParams() {
  return ALL_SHAPE_SLUGS.map((shape) => ({ shape }));
}

/* ── Dynamic metadata ── */
export async function generateMetadata({ params }: { params: Promise<{ shape: string }> }): Promise<Metadata> {
  const { shape } = await params;
  const data = getShapeData(shape);
  if (!data) return { title: 'Shape Not Found' };
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      type: 'website',
      images: [{ url: data.img, width: 800, height: 600, alt: data.name }],
    },
    alternates: { canonical: `https://worldwideshades.com/shades/${data.slug}` },
  };
}

/* ── Fabric swatches (shared across all pages) ── */
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

/* ── Page ── */
export default async function ShapeLandingPage({ params }: { params: Promise<{ shape: string }> }) {
  const { shape } = await params;
  const data = getShapeData(shape);
  if (!data) notFound();

  const related = data.relatedSlugs.map((s) => SHAPE_PAGES[s]).filter(Boolean);
  const builderUrl = `/builder?shape=${encodeURIComponent(data.builderSlug)}`;

  /* JSON-LD schema */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: `${data.name} Custom Window Shade`,
        description: data.metaDescription,
        image: data.img,
        brand: { '@type': 'Brand', name: 'World Wide Shades' },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '153',
          highPrice: '3937',
          availability: 'https://schema.org/InStock',
          url: `https://worldwideshades.com${builderUrl}`,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worldwideshades.com' },
          { '@type': 'ListItem', position: 2, name: 'Shades by Shape', item: 'https://worldwideshades.com/shades' },
          { '@type': 'ListItem', position: 3, name: data.name, item: `https://worldwideshades.com/shades/${data.slug}` },
        ],
      },
      {
        '@type': 'HowTo',
        name: `How to Measure Your ${data.name} Window`,
        description: `Step-by-step measurement guide for ordering a custom ${data.name} window shade.`,
        step: data.measureGuide.steps.map((step, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          text: step,
        })),
        tool: [{ '@type': 'HowToTool', name: 'Tape measure or laser measure' }],
      },
      {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.lp-hero-body', '.lp-pain-turn'],
      },
    ],
  };

  return (
    <div className="lp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ═══════ BREADCRUMB ═══════ */}
      <nav className="lp-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/shades">Shades</Link></li>
          <li aria-current="page">{data.name}</li>
        </ol>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className="lp-hero">
        <div className="lp-hero-glow" aria-hidden="true" />
        <div className="lp-hero-inner">
          <div className="lp-hero-text">
            <p className="lp-kicker">{data.heroKicker}</p>
            <h1>{data.headline}</h1>
            <p className="lp-hero-body">{data.subhead}</p>
            <p className="lp-hero-body lp-hero-body--intro">
              {data.intro[0].slice(0, 200)}{data.intro[0].length > 200 ? '...' : ''}
            </p>
            <div className="lp-hero-stats">
              <div className="lp-stat"><div className="lp-stat-num">649</div><div className="lp-stat-label">Fabrics</div></div>
              <div className="lp-stat"><div className="lp-stat-num">⅛&quot;</div><div className="lp-stat-label">Precision</div></div>
              <div className="lp-stat"><div className="lp-stat-num">7 days</div><div className="lp-stat-label">Shipping</div></div>
            </div>
            <div className="lp-hero-ctas">
              <Link href={builderUrl} className="lp-cta-main">Design Your {data.name} Shade <span>→</span></Link>
              <a href="#measure" className="lp-cta-ghost">How to measure</a>
            </div>
            <p className="lp-micro">No account needed · Instant pricing · Free swatches available</p>
          </div>
          <div className="lp-hero-visual">
            <Image src={data.img} alt={`${data.name} window shade diagram`} width={400} height={400} className="lp-hero-diagram" priority />
          </div>
        </div>
      </section>

      {/* ═══════ PAIN ═══════ */}
      <section className="lp-pain">
        <div className="lp-pain-inner">
          <h2>You Called Three Companies.<br /><em>All Three Said No.</em></h2>
          <div className="lp-pain-cards">
            <div className="lp-pain-card">
              <span className="lp-x">✕</span>
              <p>&ldquo;We only make rectangular shades.&rdquo; Two companies didn&apos;t even let you finish describing the window.</p>
            </div>
            <div className="lp-pain-card">
              <span className="lp-x">✕</span>
              <p>{data.painPoint}</p>
            </div>
            <div className="lp-pain-card">
              <span className="lp-x">✕</span>
              <p>You searched online and found stock photos, vague &ldquo;call for quote&rdquo; pages, and zero real pricing.</p>
            </div>
          </div>
          <p className="lp-pain-turn">
            Your window isn&apos;t the problem. The industry is.<br />
            <strong>{data.solution}</strong>
          </p>
        </div>
      </section>

      {/* ═══════ INTRO CONTENT ═══════ */}
      <section className="lp-intro">
        <div className="lp-intro-inner">
          {data.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="lp-how">
        <div className="lp-how-inner">
          <p className="lp-kicker lp-kicker--center">How It Works</p>
          <h2>Three Steps. No Showroom. No Quote Forms.</h2>
          <div className="lp-how-grid">
            <div className="lp-how-step">
              <div className="lp-how-num">1</div>
              <h3>Select Your Shape</h3>
              <p>Pick {data.name} in our builder. We show a labeled diagram so you know exactly which measurements we need.</p>
            </div>
            <div className="lp-how-step">
              <div className="lp-how-num">2</div>
              <h3>Measure &amp; Choose Fabric</h3>
              <p>Enter your dimensions to ⅛&quot;. Pick from 649 fabrics — solar, blackout, or light filtering. Watch your price update live.</p>
            </div>
            <div className="lp-how-step">
              <div className="lp-how-num">3</div>
              <h3>We Build &amp; Ship in 7 Days</h3>
              <p>Precision-cut in our facility. Factory-direct to your door. Same materials as commercial installations — without the markup.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MEASUREMENT GUIDE ═══════ */}
      <section id="measure" className="lp-measure">
        <div className="lp-measure-inner">
          <div className="lp-measure-text">
            <p className="lp-kicker">Measuring Guide</p>
            <h2>How to Measure Your {data.name} Window</h2>
            {data.measureGuide.steps.map((step, i) => (
              <div key={i} className="lp-m-step">
                <span className="lp-m-num">{i + 1}</span>
                <p>{step}</p>
              </div>
            ))}
            <div className="lp-m-tip">
              <strong>Pro tip:</strong> {data.measureGuide.tip}
            </div>
          </div>
          <div className="lp-measure-visual">
            <Image src={data.img} alt={`${data.name} measurement diagram`} width={300} height={300} />
          </div>
        </div>
      </section>

      {/* ═══════ SPECS ═══════ */}
      <section className="lp-specs">
        <div className="lp-specs-inner">
          <p className="lp-kicker lp-kicker--center">Specifications</p>
          <h2>{data.name} — At a Glance</h2>
          <table className="lp-spec-table">
            <tbody>
              {data.specs.map((s) => (
                <tr key={s.label}>
                  <td className="lp-spec-label">{s.label}</td>
                  <td className="lp-spec-value">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════ FABRICS ═══════ */}
      <section className="lp-fabrics">
        <div className="lp-fabrics-inner">
          <p className="lp-kicker lp-kicker--center">Premium Materials</p>
          <h2>649 Fabrics. Same Ones in<br />That Hotel Lobby You Loved.</h2>
          <p className="lp-fabrics-sub">Phifer. Mermet. Ferrari. Copaco. Commercial-grade materials — now for your {data.name.toLowerCase()} window, factory-direct.</p>
          <div className="lp-fab-scroll">
            {SWATCHES.map((sw) => (
              <div key={sw.alt} className="lp-fab-swatch" title={sw.alt}>
                <div style={{ width: '100%', height: '100%', background: sw.color }} />
              </div>
            ))}
          </div>
          <p className="lp-fab-note">Not sure about a color? We&apos;ll ship up to 5 free swatches to your door. No credit card.</p>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="lp-faq">
        <div className="lp-faq-inner">
          <p className="lp-kicker lp-kicker--center">Common Questions</p>
          <h2>{data.name} Shade FAQs</h2>
          <ShapeFaqAccordion faqs={data.faqs} />
        </div>
      </section>

      {/* ═══════ RELATED SHAPES ═══════ */}
      {related.length > 0 && (
        <section className="lp-related">
          <div className="lp-related-inner">
            <p className="lp-kicker lp-kicker--center">Other Shapes</p>
            <h2>Looking for a Different Shape?</h2>
            <div className="lp-related-grid">
              {related.map((r) => (
                <Link key={r.slug} href={`/shades/${r.slug}`} className="lp-related-card">
                  <Image src={r.mask} alt={r.name} width={64} height={64} className="lp-related-img" />
                  <span>{r.name}</span>
                </Link>
              ))}
              <Link href="/shades" className="lp-related-card lp-related-all">
                <span className="lp-related-icon">⊞</span>
                <span>All 10 Shapes</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════ CLOSER ═══════ */}
      <section className="lp-closer">
        <div className="lp-closer-inner">
          <h2>Your {data.name} Window<br />Deserves Better Than<br /><em>&ldquo;Sorry, Can&apos;t Help You.&rdquo;</em></h2>
          <p className="lp-closer-sub">Design online in minutes. See your exact price. Shipped factory-direct in 7 days.</p>
          <Link href={builderUrl} className="lp-cta-main lp-cta-main--closer">Build My {data.name} Shade <span>→</span></Link>
          <p className="lp-closer-micro">No account · Free swatches · Instant pricing · 7-day shipping</p>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="lp-footer">
        <p>© {new Date().getFullYear()} World Wide Shades. All rights reserved.</p>
      </footer>

      {/* ═══════ ALL STYLES ═══════ */}
      <style>{`
        .lp {
          --ink: #0c0c0c; --ink2: #333; --ink3: #666;
          --cream: #f7f5f0; --warm: #eee9df; --sand: #d6cfc2;
          --gold: #c0993a; --gold-dk: #9a7a2a; --gold-lt: #e8d5a0;
          --white: #fefdfb;
          --ff: var(--font-sans, 'DM Sans', -apple-system, sans-serif);
          --fs: var(--font-serif, 'Instrument Serif', Georgia, serif);
          font-family: var(--ff); color: var(--ink); line-height: 1.6;
        }

        /* ─── Shared ─── */
        .lp-kicker {
          font-size: .72rem; font-weight: 700; letter-spacing: .25em;
          text-transform: uppercase; color: var(--gold);
          margin-bottom: 1rem; display: flex; align-items: center; gap: .75rem;
        }
        .lp-kicker::before { content: ''; width: 28px; height: 1.5px; background: var(--gold); }
        .lp-kicker--center { justify-content: center; text-align: center; }
        .lp-kicker--center::after { content: ''; width: 28px; height: 1.5px; background: var(--gold); }
        .lp h2 { font-family: var(--fs); font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 400; line-height: 1.12; text-align: center; margin-bottom: 1.5rem; }
        .lp h2 em { font-style: italic; color: var(--gold-dk); }

        /* ─── Breadcrumb ─── */
        .lp-breadcrumb { padding: .75rem 2rem 0; max-width: 1200px; margin: 0 auto; }
        .lp-breadcrumb ol { display: flex; gap: 0; list-style: none; padding: 0; margin: 0; }
        .lp-breadcrumb li { font-size: .75rem; color: var(--ink3); }
        .lp-breadcrumb li a { color: var(--ink3); transition: color .2s; }
        .lp-breadcrumb li a:hover { color: var(--gold-dk); }
        .lp-breadcrumb li + li::before { content: '/'; margin: 0 .5rem; color: var(--sand); }
        .lp-breadcrumb li[aria-current] { color: var(--ink2); font-weight: 500; }

        /* ─── CTA Buttons ─── */
        .lp-cta-main {
          display: inline-flex; align-items: center; gap: .6rem;
          padding: 1rem 2.2rem; background: var(--ink); color: #fff;
          font-weight: 600; font-size: .95rem; border-radius: 8px;
          transition: all .3s; box-shadow: 0 2px 12px rgba(0,0,0,.12);
        }
        .lp-cta-main:hover { background: var(--gold-dk); transform: translateY(-2px); box-shadow: 0 6px 24px rgba(154,122,42,.25); }
        .lp-cta-main--closer { background: var(--gold-dk); font-size: 1.05rem; padding: 1.1rem 2.5rem; }
        .lp-cta-main--closer:hover { background: var(--gold); }
        .lp-cta-ghost { font-size: .9rem; font-weight: 600; color: var(--ink2); border-bottom: 1.5px solid var(--sand); padding-bottom: 2px; transition: all .2s; }
        .lp-cta-ghost:hover { color: var(--gold-dk); border-color: var(--gold); }
        .lp-micro { font-size: .75rem; color: var(--ink3); margin-top: 1rem; }

        /* ═══════ HERO ═══════ */
        .lp-hero {
          min-height: 92vh; display: flex; align-items: center;
          padding: 5rem 2rem 4rem; position: relative; overflow: hidden;
        }
        .lp-hero-glow {
          position: absolute; top: -20%; right: -10%;
          width: 70vw; height: 70vw;
          background: conic-gradient(from 200deg, var(--cream), var(--warm), var(--cream), rgba(192,153,58,.08), var(--cream));
          border-radius: 50%; filter: blur(80px); z-index: 0;
        }
        .lp-hero-inner {
          max-width: 1200px; margin: 0 auto; width: 100%;
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;
          align-items: center; position: relative; z-index: 1;
        }
        .lp-hero h1 {
          font-family: var(--fs); font-size: clamp(2.6rem, 4.5vw, 3.8rem);
          font-weight: 400; line-height: 1.08; letter-spacing: -.03em;
          margin-bottom: 1.25rem;
        }
        .lp-hero-body { font-size: 1.05rem; color: var(--ink2); line-height: 1.75; margin-bottom: .5rem; max-width: 480px; }
        .lp-hero-body strong { color: var(--ink); font-weight: 600; }
        .lp-hero-body--intro { font-size: .95rem; color: var(--ink3); }
        .lp-hero-stats { display: flex; gap: 2rem; margin: 1.75rem 0 2rem; }
        .lp-stat-num { font-family: var(--fs); font-size: 1.8rem; color: var(--ink); }
        .lp-stat-label { font-size: .7rem; text-transform: uppercase; letter-spacing: .12em; color: var(--ink3); }
        .lp-hero-ctas { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
        .lp-hero-visual { display: flex; align-items: center; justify-content: center; }
        .lp-hero-diagram { width: 100%; max-width: 380px; height: auto; filter: drop-shadow(0 16px 40px rgba(0,0,0,.06)); }

        /* ═══════ PAIN ═══════ */
        .lp-pain {
          padding: 7rem 2rem; background: var(--ink); color: #fff;
          position: relative; overflow: hidden;
        }
        .lp-pain::before {
          content: ''; position: absolute; top: -50%; right: -20%;
          width: 60vw; height: 60vw;
          background: radial-gradient(circle, rgba(192,153,58,.06), transparent 70%);
          border-radius: 50%;
        }
        .lp-pain-inner { max-width: 800px; margin: 0 auto; position: relative; z-index: 1; text-align: center; }
        .lp-pain h2 { color: #fff; }
        .lp-pain h2 em { color: var(--gold-lt); }
        .lp-pain-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 3rem 0; text-align: left; }
        .lp-pain-card { padding: 1.5rem; border-radius: 10px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); }
        .lp-x { color: #e74c3c; font-size: 1.2rem; font-weight: 700; margin-bottom: .5rem; display: block; }
        .lp-pain-card p { font-size: .92rem; color: rgba(255,255,255,.7); line-height: 1.65; }
        .lp-pain-turn { font-size: 1.1rem; color: rgba(255,255,255,.5); margin-top: 2rem; line-height: 1.7; }
        .lp-pain-turn strong { color: var(--gold-lt); font-weight: 600; }

        /* ═══════ INTRO ═══════ */
        .lp-intro { padding: 5rem 2rem; background: var(--white); }
        .lp-intro-inner { max-width: 740px; margin: 0 auto; }
        .lp-intro p { font-size: 1.05rem; color: var(--ink2); line-height: 1.85; margin-bottom: 1.25rem; }
        .lp-intro p:last-child { margin-bottom: 0; }

        /* ═══════ HOW IT WORKS ═══════ */
        .lp-how { padding: 7rem 2rem; background: var(--cream); }
        .lp-how-inner { max-width: 1000px; margin: 0 auto; }
        .lp-how h2 { margin-bottom: 3.5rem; }
        .lp-how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; position: relative; }
        .lp-how-grid::before { content: ''; position: absolute; top: 32px; left: 16.5%; right: 16.5%; height: 1px; background: var(--sand); z-index: 0; }
        .lp-how-step { text-align: center; position: relative; z-index: 1; padding: 0 1.5rem; }
        .lp-how-num {
          width: 64px; height: 64px; border-radius: 50%;
          background: var(--white); border: 2px solid var(--sand);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--fs); font-size: 1.4rem; color: var(--gold-dk);
          margin: 0 auto 1.25rem; transition: all .3s;
        }
        .lp-how-step:hover .lp-how-num { background: var(--ink); border-color: var(--ink); color: var(--gold-lt); }
        .lp-how-step h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: .5rem; }
        .lp-how-step p { font-size: .9rem; color: var(--ink2); line-height: 1.65; }

        /* ═══════ MEASURE ═══════ */
        .lp-measure { padding: 7rem 2rem; background: var(--white); }
        .lp-measure-inner { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: 1fr 300px; gap: 4rem; align-items: center; }
        .lp-measure h2 { text-align: left; }
        .lp-m-step { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
        .lp-m-num { font-family: var(--fs); font-size: 1.4rem; color: var(--gold); flex-shrink: 0; margin-top: .1rem; }
        .lp-m-step p { font-size: .95rem; color: var(--ink2); line-height: 1.65; }
        .lp-m-tip { padding: 1rem 1.25rem; background: var(--cream); border-radius: 8px; border-left: 3px solid var(--gold); font-size: .88rem; color: var(--ink2); line-height: 1.6; margin-top: .5rem; }
        .lp-m-tip strong { color: var(--ink); }
        .lp-measure-visual { display: flex; align-items: center; justify-content: center; }
        .lp-measure-visual img { border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,.06); max-width: 280px; height: auto; }

        /* ═══════ SPECS ═══════ */
        .lp-specs { padding: 5rem 2rem; background: var(--cream); }
        .lp-specs-inner { max-width: 600px; margin: 0 auto; }
        .lp-spec-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        .lp-spec-table td { padding: .85rem 1rem; font-size: .92rem; border-bottom: 1px solid var(--sand); }
        .lp-spec-label { font-weight: 600; color: var(--ink); width: 40%; }
        .lp-spec-value { color: var(--ink2); }

        /* ═══════ FABRICS ═══════ */
        .lp-fabrics { padding: 7rem 2rem; background: var(--white); }
        .lp-fabrics-inner { max-width: 1000px; margin: 0 auto; text-align: center; }
        .lp-fabrics-sub { color: var(--ink2); font-size: 1rem; max-width: 560px; margin: 0 auto 2.5rem; line-height: 1.7; }
        .lp-fab-scroll { display: flex; gap: 1rem; overflow-x: auto; padding: .5rem 0 1rem; scroll-snap-type: x mandatory; }
        .lp-fab-scroll::-webkit-scrollbar { height: 3px; }
        .lp-fab-scroll::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 4px; }
        .lp-fab-swatch {
          flex-shrink: 0; width: 160px; height: 160px;
          border-radius: 10px; overflow: hidden;
          border: 2px solid #e5e0d6; scroll-snap-align: start; transition: all .3s;
        }
        .lp-fab-swatch:hover { border-color: var(--gold); transform: scale(1.04); }
        .lp-fab-swatch img { width: 100%; height: 100%; object-fit: cover; }
        .lp-fab-note { font-size: .85rem; color: var(--ink3); margin-top: 1.5rem; }

        /* ═══════ FAQ ═══════ */
        .lp-faq { padding: 7rem 2rem; background: var(--cream); }
        .lp-faq-inner { max-width: 700px; margin: 0 auto; }
        .lp-faq-list {}
        .lp-faq-item { border-bottom: 1px solid var(--sand); }
        .lp-faq-q {
          width: 100%; padding: 1.2rem 0; font-weight: 600; font-size: .95rem;
          cursor: pointer; display: flex; justify-content: space-between; align-items: center;
          background: none; border: none; font-family: var(--ff); color: var(--ink); text-align: left; transition: color .2s;
        }
        .lp-faq-q:hover { color: var(--gold-dk); }
        .lp-faq-plus { font-size: 1.3rem; font-weight: 300; color: var(--gold); transition: transform .3s; flex-shrink: 0; margin-left: 1rem; }
        .lp-faq-item.open .lp-faq-plus { transform: rotate(45deg); }
        .lp-faq-a { font-size: .9rem; color: var(--ink2); line-height: 1.7; max-height: 0; overflow: hidden; transition: max-height .35s ease, padding .35s ease; padding: 0; }
        .lp-faq-item.open .lp-faq-a { max-height: 400px; padding-bottom: 1.2rem; }

        /* ═══════ RELATED ═══════ */
        .lp-related { padding: 5rem 2rem; background: var(--white); }
        .lp-related-inner { max-width: 900px; margin: 0 auto; }
        .lp-related-grid { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .lp-related-card {
          display: flex; flex-direction: column; align-items: center;
          padding: 1.25rem 1.5rem; background: var(--cream); border: 1.5px solid var(--sand);
          border-radius: 10px; transition: all .3s; min-width: 120px;
        }
        .lp-related-card:hover { border-color: var(--gold); transform: translateY(-4px); box-shadow: 0 8px 24px rgba(192,153,58,.1); }
        .lp-related-img { width: 56px; height: 56px; object-fit: contain; filter: brightness(0) opacity(.55); margin-bottom: .5rem; }
        .lp-related-card:hover .lp-related-img { filter: brightness(0) opacity(1); }
        .lp-related-card span { font-size: .78rem; font-weight: 600; text-align: center; line-height: 1.3; }
        .lp-related-all { justify-content: center; }
        .lp-related-icon { font-size: 2rem; color: var(--gold); margin-bottom: .25rem; }

        /* ═══════ CLOSER ═══════ */
        .lp-closer {
          padding: 8rem 2rem; text-align: center;
          background: var(--ink); position: relative; overflow: hidden;
        }
        .lp-closer::before {
          content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 60vw; height: 60vw;
          background: radial-gradient(circle, rgba(192,153,58,.08), transparent 60%);
          border-radius: 50%;
        }
        .lp-closer-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
        .lp-closer h2 { color: #fff; }
        .lp-closer h2 em { color: var(--gold-lt); }
        .lp-closer-sub { font-size: 1.05rem; color: rgba(255,255,255,.5); margin-bottom: 2.5rem; line-height: 1.7; }
        .lp-closer-micro { font-size: .78rem; color: rgba(255,255,255,.3); margin-top: 1.25rem; }

        /* ═══════ FOOTER ═══════ */
        .lp-footer { padding: 2.5rem 2rem; background: var(--ink); border-top: 1px solid rgba(255,255,255,.05); text-align: center; }
        .lp-footer p { font-size: .75rem; color: rgba(255,255,255,.2); }

        /* ═══════ RESPONSIVE ═══════ */
        @media (max-width: 768px) {
          .lp-hero-inner { grid-template-columns: 1fr; text-align: center; }
          .lp-hero-visual { order: -1; }
          .lp-hero-diagram { max-width: 260px; }
          .lp-hero-body { max-width: 100%; }
          .lp-hero-stats { justify-content: center; }
          .lp-hero-ctas { justify-content: center; }
          .lp-hero .lp-kicker { justify-content: center; }
          .lp-pain-cards { grid-template-columns: 1fr; }
          .lp-how-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .lp-how-grid::before { display: none; }
          .lp-measure-inner { grid-template-columns: 1fr; }
          .lp-measure-visual { order: -1; }
          .lp-measure h2 { text-align: center; }
        }
      `}</style>
    </div>
  );
}
