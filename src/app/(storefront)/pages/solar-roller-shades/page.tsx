import type { Metadata } from 'next';
import ProductLandingPage, { type ProductLandingPageData } from '@/components/storefront/ProductLandingPage';

export const metadata: Metadata = {
  title: 'Custom Solar Roller Shades — Glare Control With a View | World Wide Shades',
  description: 'Custom solar roller shades that filter glare while preserving your view. Energy-efficient, UV-blocking, made in USA. 700+ fabric options, ships in 5–7 days.',
};

const data: ProductLandingPageData = {
  eyebrow: 'Premium Window Treatments',
  heroTitle: 'Custom Solar Roller Shades',
  heroSubtitle: 'Reduce glare, cut UV rays, and stay connected to the outdoors — without sacrificing your view. Made to order, shipped in 5–7 days.',
  heroStats: [
    { value: '1–14%', label: 'Openness Factor Range' },
    { value: '700+', label: 'Fabric Options' },
    { value: '25%', label: 'Energy Savings' },
  ],
  ctaPrimaryText: 'Design Your Solar Shades',
  featuresSectionTitle: 'Why Solar Roller Shades?',
  features: [
    {
      title: 'Glare Reduction Without Darkness',
      desc: 'Solar shades filter harsh sunlight and eliminate screen glare while keeping your room bright and your view intact — the best of both worlds.',
    },
    {
      title: 'UV Protection',
      desc: 'Block up to 99% of harmful UV rays, protecting furniture, flooring, and artwork from fading while maintaining natural light.',
    },
    {
      title: 'Energy Efficiency',
      desc: 'Reduce heat gain in summer and heat loss in winter. Solar shades can lower cooling costs significantly in sun-facing rooms.',
    },
    {
      title: 'View-Through Openness',
      desc: 'Choose your openness factor (1%–14%) to control how much you see through the fabric. Tighter weaves offer more privacy; looser weaves maximize the view.',
    },
    {
      title: 'Daytime Privacy',
      desc: 'During the day, solar shades make it harder for people outside to see in, while you maintain a clear outward view.',
    },
    {
      title: 'Motorized Options',
      desc: 'Add motorization for effortless control via remote, wall switch, or smart home system. Ideal for large or hard-to-reach windows.',
    },
  ],
  faqs: [
    {
      q: 'What openness factor should I choose?',
      a: '1–3% openness is best for maximum glare control and daytime privacy. 5–10% gives a good balance of light control and view. 10–14% maximizes view-through with minimal light filtering. Our team can help you choose.',
    },
    {
      q: 'Do solar shades provide nighttime privacy?',
      a: 'At night, with interior lights on, solar shades do not provide privacy as the effect reverses. For nighttime privacy, consider pairing solar shades with a blackout roller shade (dual shade system).',
    },
    {
      q: 'Can solar shades be motorized?',
      a: 'Yes — all solar shades are available with Somfy motorization. Works with Alexa, Google Home, Control4, Lutron, and other smart home platforms.',
    },
  ],
  ctaTitle: 'Keep the View. Lose the Glare.',
  ctaNote: 'Free shipping • Made in USA • 100% Fit Guarantee',
};

export default function SolarRollerShadesPage() {
  return <ProductLandingPage data={data} />;
}
