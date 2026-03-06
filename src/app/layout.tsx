import type { Metadata } from 'next';
import { DM_Sans, Instrument_Serif } from 'next/font/google';
import { GoogleTagManager } from '@/components/shared/GoogleTagManager';
import { AnalyticsProvider } from '@/components/shared/AnalyticsProvider';
import '@/styles/globals.css';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-5THC3H88';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: {
    default: 'World Wide Shades | Premium Custom Window Shades & Blinds | Solar Shades | Motorized Roller Shades',
    template: '%s | World Wide Shades',
  },
  description:
    'Factory-direct custom window shades in any shape — triangles, trapezoids, pentagons, hexagons & more. 649 premium fabrics. Precision-cut to ⅛". Ships in 7 days.',
  metadataBase: new URL('https://worldwideshades.com'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'World Wide Shades',
  },
  twitter: {
    card: 'summary_large_image',
  },
  other: {
    'fb:app_id': '1024979196148646',
    // 'google-site-verification': 'YOUR_CODE_HERE',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <body>
        {/* GTM noscript fallback — immediately after <body> per spec */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* GTM head script (afterInteractive = loaded after hydration, non-blocking) */}
        <GoogleTagManager gtmId={GTM_ID} />

        {/* Fire page_view on every client-side route change */}
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}
