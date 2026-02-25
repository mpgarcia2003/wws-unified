import type { Metadata } from 'next';
import { DM_Sans, Instrument_Serif } from 'next/font/google';
import '@/styles/globals.css';

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
    default: 'World Wide Shades | Custom Shades for Windows No One Else Can Fit',
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
    // Uncomment and add your Google Search Console verification code:
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
      <body>{children}</body>
    </html>
  );
}
