import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'World Wide Shades privacy policy — how we collect, use, and protect your personal information.',
  alternates: { canonical: 'https://worldwideshades.com/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="legal">
      <div className="legal-inner">
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: February 24, 2026</p>

        <h2>Who We Are</h2>
        <p>World Wide Shades (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) operates worldwideshades.com. This privacy policy explains how we collect, use, and protect your personal information when you use our website and services.</p>

        <h2>Information We Collect</h2>
        <p><strong>Information you provide:</strong> When you use our shade builder, place an order, request swatches, or contact us, we may collect your name, email address, shipping address, phone number, and payment information.</p>
        <p><strong>Automatically collected:</strong> We use cookies and similar technologies to collect information about your browsing behavior, including pages visited, time spent, browser type, device type, and IP address. We use Google Analytics 4 for website analytics.</p>
        <p><strong>Order data:</strong> Window measurements, fabric selections, and shade configurations are stored to process your order and provide customer support.</p>

        <h2>How We Use Your Information</h2>
        <p>We use your information to: process and fulfill orders; send order confirmations and shipping updates; respond to customer inquiries; improve our website and products; send marketing communications (only with your consent); and comply with legal obligations.</p>

        <h2>Sharing Your Information</h2>
        <p>We do not sell your personal information. We share data only with: payment processors (Stripe) to process transactions; shipping carriers to deliver orders; analytics providers (Google) to understand website usage; and as required by law.</p>

        <h2>Data Security</h2>
        <p>We use industry-standard security measures including SSL encryption, secure payment processing through Stripe, and access controls to protect your personal information. No method of transmission over the internet is 100% secure, but we take reasonable steps to protect your data.</p>

        <h2>Cookies</h2>
        <p>We use essential cookies for website functionality and analytics cookies to understand how visitors use our site. You can control cookie settings through your browser preferences.</p>

        <h2>Your Rights</h2>
        <p>You have the right to: access your personal information; correct inaccurate data; request deletion of your data; opt out of marketing communications; and lodge a complaint with a supervisory authority. To exercise these rights, email us at info@worldwideshades.com.</p>

        <h2>California Residents (CCPA)</h2>
        <p>California residents have additional rights under the CCPA, including the right to know what personal information we collect, the right to delete personal information, and the right to opt out of the sale of personal information. We do not sell personal information.</p>

        <h2>Children&apos;s Privacy</h2>
        <p>Our website is not directed at children under 13. We do not knowingly collect personal information from children.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update this policy from time to time. We will post the updated policy on this page with a new &ldquo;last updated&rdquo; date.</p>

        <h2>Contact Us</h2>
        <p>For privacy questions or requests, email us at info@worldwideshades.com.</p>
      </div>

      <style>{`
        .legal {
          --ink: #0c0c0c; --ink2: #333; --ink3: #666; --cream: #f7f5f0; --sand: #d6cfc2; --gold: #c0993a; --gold-dk: #9a7a2a;
          --ff: var(--font-sans, 'DM Sans', -apple-system, sans-serif);
          --fs: var(--font-serif, 'Instrument Serif', Georgia, serif);
          font-family: var(--ff); color: var(--ink); line-height: 1.6; padding: 3rem 2rem 5rem;
        }
        .legal-inner { max-width: 700px; margin: 0 auto; }
        .legal h1 { font-family: var(--fs); font-size: 2.2rem; font-weight: 400; margin-bottom: .25rem; }
        .legal-updated { font-size: .85rem; color: var(--ink3); margin-bottom: 2.5rem; }
        .legal h2 { font-family: var(--ff); font-size: 1.1rem; font-weight: 700; margin: 2rem 0 .5rem; }
        .legal p { font-size: .95rem; color: var(--ink2); line-height: 1.8; margin-bottom: .75rem; }
        .legal strong { color: var(--ink); }
      `}</style>
    </div>
  );
}
