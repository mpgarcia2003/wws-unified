import type { Metadata } from 'next';
import ProductLandingPage, { type ProductLandingPageData } from '@/components/storefront/ProductLandingPage';

export const metadata: Metadata = {
  title: 'Custom Blackout Roller Shades — 99-100% Light Blocking | World Wide Shades',
  description: 'Custom-made blackout roller shades with complete light blocking. 700+ fabric options, made in USA, ships in 5–7 days. Hotel-quality darkness in your home.',
};

const data: ProductLandingPageData = {
  eyebrow: 'Premium Window Treatments',
  heroTitle: 'Custom Blackout Roller Shades',
  heroSubtitle: 'Block intrusive light, protect your privacy, and enjoy hotel-style darkness any time of day. Custom-made in the USA, ships in 5–7 days.',
  heroStats: [
    { value: '99–100%', label: 'Light Blocking' },
    { value: '700+', label: 'Fabric Options' },
    { value: '5–7 Days', label: 'Ships in' },
  ],
  ctaPrimaryText: 'Design Your Blackout Shades',
  featuresSectionTitle: 'Why Our Blackout Shades?',
  features: [
    {
      title: 'Complete Light Control',
      desc: 'Achieve 99–100% light blocking with multi-layered blackout fabric that eliminates even the smallest light leaks around the edges.',
    },
    {
      title: 'Energy Efficiency',
      desc: 'Reduce heating and cooling costs by up to 25% with thermal insulation that keeps your room comfortable year-round.',
    },
    {
      title: 'Enhanced Privacy',
      desc: 'Prevent visibility from outside while maintaining your interior style with sleek, wall-mounted designs that look great from any angle.',
    },
    {
      title: 'UV Protection',
      desc: 'Protect your furniture, flooring, and artwork from fading with fabric that blocks harmful ultraviolet rays.',
    },
    {
      title: 'Noise Reduction',
      desc: 'Multi-layer materials provide additional sound dampening for quieter, more peaceful spaces — ideal for bedrooms and home offices.',
    },
    {
      title: 'Space-Saving Design',
      desc: 'Sleek roller tube mechanism fits within your window frame without protruding into your room. Available in motorized or manual operation.',
    },
  ],
  faqs: [
    {
      q: 'What is the difference between blackout and light-filtering shades?',
      a: 'Blackout shades block 99–100% of light, creating complete darkness. Light-filtering shades diffuse sunlight while still allowing some natural light through. Blackout shades are ideal for bedrooms, media rooms, and nurseries.',
    },
    {
      q: 'Can blackout shades be motorized?',
      a: 'Yes — all of our blackout shades are available with motorization. Somfy motors allow control via remote, wall switch, smartphone app, or voice assistant (Alexa, Google Home).',
    },
    {
      q: 'Do you offer inside or outside mount?',
      a: 'Both. Inside mount sits within the window frame for a clean, recessed look. Outside mount extends beyond the frame and is ideal when maximum light blocking at the edges is critical.',
    },
    {
      q: 'How long does production and shipping take?',
      a: 'Standard production time is 5–7 business days. Rush production is available for select configurations. Shipping is always free.',
    },
  ],
  ctaTitle: 'Ready for Complete Light Control?',
  ctaNote: 'Free shipping • Made in USA • 100% Fit Guarantee',
};

export default function BlackoutShadesPage() {
  return <ProductLandingPage data={data} />;
}
