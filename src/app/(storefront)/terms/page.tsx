import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'World Wide Shades terms of service — the legal agreement governing use of our website and purchase of custom window shades.',
  alternates: { canonical: 'https://worldwideshades.com/terms' },
};

export default function TermsPage() {
  return (
    <div className="legal">
      <div className="legal-inner">
        <h1>Terms of Service</h1>
        <p className="legal-updated">Last updated: February 24, 2026</p>

        <h2>Agreement to Terms</h2>
        <p>By accessing or using worldwideshades.com (&ldquo;the Site&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Site.</p>

        <h2>Products and Orders</h2>
        <p>All window shades sold through World Wide Shades are custom-made to your specifications. Because each shade is precision-cut to your exact measurements, <strong>all sales are final</strong>. We cannot accept returns or exchanges on custom-cut products.</p>
        <p>We make every effort to display accurate colors on our website. However, monitor settings vary and we cannot guarantee that the color you see on screen will be an exact match. We strongly recommend ordering free physical swatches before placing an order.</p>

        <h2>Measurements and Accuracy</h2>
        <p>You are responsible for providing accurate measurements. Shades are cut to the exact dimensions you enter in our builder. World Wide Shades is not responsible for shades that do not fit due to incorrect measurements provided by the customer.</p>
        <p>If you are unsure about measurements, we recommend using a laser measure and contacting us for guidance before ordering.</p>

        <h2>Pricing</h2>
        <p>All prices displayed in our shade builder are in US dollars and include the shade, mounting hardware, and standard shipping within the continental United States. Prices are subject to change without notice, but the price confirmed at checkout is the price you pay.</p>

        <h2>Shipping and Delivery</h2>
        <p>Most orders ship within 7 business days. Specialty shapes may take 7-10 business days. Hexagon shades take 10-14 business days. Delivery times after shipment depend on your location and the shipping carrier.</p>
        <p>We are not responsible for delays caused by shipping carriers, weather events, or other circumstances beyond our control.</p>

        <h2>Defects and Warranty</h2>
        <p>We stand behind the quality of our products. If your shade arrives with a manufacturing defect — incorrect dimensions, fabric damage, or hardware issues — contact us within 14 days of delivery. We will replace the shade at no cost.</p>
        <p>This warranty does not cover: damage during customer installation; normal wear and tear; fading from sun exposure over time; or shades that do not fit due to incorrect measurements.</p>

        <h2>Intellectual Property</h2>
        <p>All content on this Site — including text, images, logos, and software — is the property of World Wide Shades and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>

        <h2>Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, World Wide Shades shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Site or purchase of products. Our total liability for any claim shall not exceed the amount you paid for the product in question.</p>

        <h2>Governing Law</h2>
        <p>These terms are governed by the laws of the State of New York, without regard to conflict of law principles.</p>

        <h2>Changes to Terms</h2>
        <p>We reserve the right to update these terms at any time. Continued use of the Site after changes constitutes acceptance of the new terms.</p>

        <h2>Contact</h2>
        <p>For questions about these terms, email us at info@worldwideshades.com.</p>
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
