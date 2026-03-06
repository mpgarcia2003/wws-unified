import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ — Custom Window Shades | World Wide Shades',
  description: 'Answers to the most common questions about custom window shades: measuring, motorization, specialty shapes, shipping, installation, and more.',
};

const FAQ_SECTIONS = [
  {
    section: 'Getting Started',
    faqs: [
      {
        q: 'How do I order custom shades?',
        a: 'Start in our Shade Builder at /builder. You\'ll select your shade type, choose your fabric, enter your measurements, and add to cart. For specialty shapes, we offer a complimentary measurement validation call before production begins.',
      },
      {
        q: 'Do I need to measure my windows myself?',
        a: 'For most shades, yes — we provide clear measurement guides for every product. For specialty shapes (triangle, trapezoid, hexagon, pentagon), we offer a free validation call to review your measurements. You can also request professional measurement through our installer network.',
      },
      {
        q: 'What is the difference between inside and outside mount?',
        a: 'Inside mount (ID) installs within the window frame for a clean, recessed look. Outside mount (OD) installs on the wall or trim above and beside the window — often used for maximum light blocking or when the window frame is too shallow.',
      },
      {
        q: 'Can I order fabric samples before buying?',
        a: 'Yes — we offer free fabric samples. Visit /pages/free-samples to request up to 5 swatches shipped free.',
      },
    ],
  },
  {
    section: 'Specialty Shapes',
    faqs: [
      {
        q: 'Can you make shades for triangle windows?',
        a: 'Yes — triangle shades are one of our specialties. We make Right Triangle Right, Right Triangle Left, and Acute Triangle configurations. All include motorization (manual operation is not practical on angled rails) and a complimentary measurement validation call.',
      },
      {
        q: 'What about trapezoid, hexagon, or pentagon windows?',
        a: 'All of these are available. Our multi-point measurement systems (4-point for trapezoid, 6-point for hexagon, 5-point for pentagon) ensure a perfect fit. Visit the individual landing pages for details and measurement guides.',
      },
      {
        q: 'Why are specialty shape shades motorized by default?',
        a: 'Manual pull cords do not work well on angled rails — the shade lifts unevenly and the cord is difficult to access on high or angled windows. Motorization provides smooth, even operation via remote or smart home system.',
      },
      {
        q: 'What is the maximum size for specialty shape shades?',
        a: 'Most configurations go up to 144" wide × 144" tall. For triangle shades, we accommodate up to 288" for certain configurations. Contact us for oversized requirements.',
      },
    ],
  },
  {
    section: 'Motorization',
    faqs: [
      {
        q: 'What motor brand do you use?',
        a: 'We use Somfy tubular motors — the industry standard for motorized window treatments. Somfy motors are known for ultra-quiet operation, long-term reliability, and compatibility with virtually every smart home platform.',
      },
      {
        q: 'What smart home systems work with your motorized shades?',
        a: 'Somfy motors are compatible with Amazon Alexa, Google Home, Apple HomeKit (via bridge), Control4, Lutron, Crestron, Savant, and most other major platforms. Ask us about your specific system.',
      },
      {
        q: 'Do I need an electrician for motorized shades?',
        a: 'For hardwired (line voltage, 120V) installations, yes — a licensed electrician should make the electrical connections. For plug-in motors, no electrician is needed. Battery-powered motors require no wiring at all.',
      },
      {
        q: 'What is the motor warranty?',
        a: '5 years on motors, 3 years on fabric. If a motor fails under normal use within the warranty period, we replace it at no charge.',
      },
    ],
  },
  {
    section: 'Shipping & Production',
    faqs: [
      {
        q: 'How long does production take?',
        a: 'Standard production time is 5–7 business days for most shades. Specialty shape shades (triangle, trapezoid, etc.) typically require 4–6 weeks due to the precision manufacturing involved.',
      },
      {
        q: 'Is shipping free?',
        a: 'Yes — shipping is free on all orders, everywhere in the United States.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently, we ship within the United States only. Contact us if you have an international project — we may be able to accommodate on a case-by-case basis.',
      },
      {
        q: 'Can I get rush production?',
        a: 'Rush production is available for select configurations. Contact us before ordering to check availability and lead times.',
      },
    ],
  },
  {
    section: 'Installation',
    faqs: [
      {
        q: 'Can I install my shades myself?',
        a: 'Yes — most of our shades include step-by-step installation guides and videos. Standard roller shades are particularly DIY-friendly. For specialty shapes, we provide detailed bracket placement diagrams.',
      },
      {
        q: 'Do you offer professional installation?',
        a: 'Yes — we have a nationwide network of vetted installers. For specialty shapes, professional installation is recommended for large spans or high ceilings. Contact us to connect with an installer in your area.',
      },
      {
        q: 'What tools do I need for installation?',
        a: 'Most installations require a power drill, level, measuring tape, and the hardware included with your shade. We include all mounting hardware and detailed instructions.',
      },
    ],
  },
  {
    section: 'Guarantee & Returns',
    faqs: [
      {
        q: 'What is your fit guarantee?',
        a: 'If your shade doesn\'t fit due to our manufacturing error, we will remake it at no charge. For specialty shapes, we include a measurement validation call before production to catch any errors in your measurements.',
      },
      {
        q: 'Can I return a custom shade?',
        a: 'Custom-made products are non-returnable. However, if there is a manufacturing defect or we made the shade incorrectly, we will replace it. This is why our measurement validation process for specialty shapes is so important.',
      },
      {
        q: 'What is your warranty?',
        a: 'Motor warranty: 5 years. Fabric warranty: 3 years. Hardware: 2 years. Warranty covers manufacturer defects under normal use and does not cover damage from improper installation or misuse.',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#171717', background: '#fefdfb' }}>

      {/* Hero */}
      <section style={{
        background: '#0c0c0c',
        color: '#fff',
        padding: '80px 24px 64px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c0993a', marginBottom: 16 }}>
            Support
          </p>
          <h1 style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, lineHeight: 1.1, marginBottom: 20,
          }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: 17, color: '#9ca3af', lineHeight: 1.6, maxWidth: 520, margin: '0 auto 32px' }}>
            Everything you need to know about our custom shades, measurement process, and ordering.
          </p>
          <Link href="/pages/contact" style={{
            display: 'inline-block',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            padding: '12px 28px',
            borderRadius: 4,
            textDecoration: 'none',
          }}>
            Still have questions? Contact us
          </Link>
        </div>
      </section>

      {/* FAQ sections */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {FAQ_SECTIONS.map((section) => (
            <div key={section.section} style={{ marginBottom: 64 }}>
              <h2 style={{
                fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#c0993a', marginBottom: 24,
                paddingBottom: 16,
                borderBottom: '1px solid #e5e7eb',
              }}>
                {section.section}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {section.faqs.map((faq, i) => (
                  <details key={i} style={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: i === 0 ? '8px 8px 0 0' : i === section.faqs.length - 1 ? '0 0 8px 8px' : 0,
                    marginTop: i > 0 ? -1 : 0,
                  }}>
                    <summary style={{
                      padding: '18px 24px',
                      fontSize: 15, fontWeight: 600,
                      cursor: 'pointer',
                      listStyle: 'none',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      <span style={{ paddingRight: 16 }}>{faq.q}</span>
                      <span style={{ color: '#c0993a', fontSize: 20, flexShrink: 0 }}>+</span>
                    </summary>
                    <p style={{ padding: '4px 24px 20px', fontSize: 14, lineHeight: 1.8, color: '#6b7280', margin: 0 }}>
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: '#f7f5f0',
        padding: '64px 24px',
        textAlign: 'center',
        borderTop: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: 32, fontWeight: 400, lineHeight: 1.2, marginBottom: 16,
          }}>
            Ready to Get Started?
          </h2>
          <p style={{ color: '#6b7280', marginBottom: 32, lineHeight: 1.6 }}>
            Use our Shade Builder to design your custom shades, or contact us if you have questions about a specialty window project.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/builder" style={{
              display: 'inline-block', background: '#0c0c0c', color: '#fff',
              fontWeight: 700, fontSize: 15, padding: '14px 32px', borderRadius: 4, textDecoration: 'none',
            }}>
              Design Your Shades
            </Link>
            <Link href="/pages/contact" style={{
              display: 'inline-block', border: '1px solid #e5e7eb', color: '#374151',
              fontWeight: 600, fontSize: 15, padding: '14px 28px', borderRadius: 4, textDecoration: 'none',
            }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
