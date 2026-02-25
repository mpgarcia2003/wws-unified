import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with World Wide Shades. Questions about custom shades, specialty shapes, measurements, or orders? We\'re here to help.',
  alternates: { canonical: 'https://worldwideshades.com/contact' },
};

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact World Wide Shades',
    url: 'https://worldwideshades.com/contact',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'World Wide Shades',
      email: 'info@worldwideshades.com',
      url: 'https://worldwideshades.com',
      address: { '@type': 'PostalAddress', addressLocality: 'New York', addressRegion: 'NY', addressCountry: 'US' },
    },
  };

  return (
    <div className="contact">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="ct-hero">
        <div className="ct-glow" aria-hidden="true" />
        <div className="ct-hero-inner">
          <p className="ct-kicker">Get In Touch</p>
          <h1>Questions? We&apos;re <em>Here.</em></h1>
          <p className="ct-sub">Whether you need help measuring a window, choosing a fabric, or figuring out which shape you have — we&apos;re happy to help.</p>
        </div>
      </section>

      <section className="ct-body">
        <div className="ct-body-inner">
          <div className="ct-grid">
            <div className="ct-card">
              <h2>Email Us</h2>
              <p>For questions about orders, measurements, fabrics, or anything else.</p>
              <a href="mailto:info@worldwideshades.com" className="ct-email">info@worldwideshades.com</a>
              <p className="ct-note">We typically respond within 24 hours on business days.</p>
            </div>
            <div className="ct-card">
              <h2>Not Sure About Your Shape?</h2>
              <p>Take a photo of your window and email it to us. We&apos;ll tell you the exact shape, which measurements you need, and send you a quote.</p>
              <p className="ct-note">Include a rough estimate of the size if possible — it helps us give you a ballpark faster.</p>
            </div>
            <div className="ct-card">
              <h2>Free Swatches</h2>
              <p>Want to see and feel a fabric before ordering? Request up to 5 free physical swatches through our builder. No credit card, no commitment.</p>
            </div>
            <div className="ct-card">
              <h2>Wholesale &amp; Commercial</h2>
              <p>Contractors, interior designers, and property managers — we offer volume pricing and dedicated account support. Email us with your project details.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contact {
          --ink: #0c0c0c; --ink2: #333; --ink3: #666;
          --cream: #f7f5f0; --warm: #eee9df; --sand: #d6cfc2;
          --gold: #c0993a; --gold-dk: #9a7a2a; --gold-lt: #e8d5a0;
          --white: #fefdfb;
          --ff: var(--font-sans, 'DM Sans', -apple-system, sans-serif);
          --fs: var(--font-serif, 'Instrument Serif', Georgia, serif);
          font-family: var(--ff); color: var(--ink); line-height: 1.6;
        }
        .ct-hero { padding: 5rem 2rem 3rem; text-align: center; position: relative; overflow: hidden; }
        .ct-glow { position: absolute; top: -40%; left: 50%; transform: translateX(-50%); width: 70vw; height: 50vw; background: conic-gradient(from 200deg, var(--cream), var(--warm), var(--cream)); border-radius: 50%; filter: blur(80px); z-index: 0; }
        .ct-hero-inner { position: relative; z-index: 1; max-width: 560px; margin: 0 auto; }
        .ct-kicker { font-size: .72rem; font-weight: 700; letter-spacing: .25em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
        .ct-hero h1 { font-family: var(--fs); font-size: clamp(2rem, 4vw, 3rem); font-weight: 400; line-height: 1.1; margin-bottom: 1rem; }
        .ct-hero h1 em { font-style: italic; color: var(--gold-dk); }
        .ct-sub { font-size: 1rem; color: var(--ink2); line-height: 1.7; }
        .ct-body { padding: 2rem 2rem 5rem; }
        .ct-body-inner { max-width: 800px; margin: 0 auto; }
        .ct-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .ct-card { padding: 1.75rem; background: var(--cream); border-radius: 12px; border: 1px solid var(--sand); }
        .ct-card h2 { font-family: var(--ff); font-size: 1.05rem; font-weight: 700; margin-bottom: .5rem; }
        .ct-card p { font-size: .92rem; color: var(--ink2); line-height: 1.65; margin-bottom: .75rem; }
        .ct-email { display: inline-block; font-size: 1rem; font-weight: 600; color: var(--gold-dk); margin-bottom: .5rem; transition: color .2s; }
        .ct-email:hover { color: var(--gold); }
        .ct-note { font-size: .8rem; color: var(--ink3); margin-bottom: 0; }
        @media (max-width: 640px) { .ct-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
