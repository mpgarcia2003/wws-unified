import type { Metadata } from 'next';
import ProductLandingPage, { type ProductLandingPageData } from '@/components/storefront/ProductLandingPage';

export const metadata: Metadata = {
  title: 'Custom Exterior Roller Shades — Outdoor Sun & Privacy Control | World Wide Shades',
  description: 'Custom exterior roller shades for patios, pergolas, and outdoor spaces. Weather-resistant, UV-blocking, motorized. Made in USA, free shipping.',
};

const data: ProductLandingPageData = {
  eyebrow: 'Outdoor Window Solutions',
  heroTitle: 'Custom Exterior Roller Shades',
  heroSubtitle: 'Extend your living space outdoors. Custom exterior shades block sun, heat, and prying eyes — built to withstand the elements and engineered to fit your exact opening.',
  heroStats: [
    { value: '95%+', label: 'UV Block' },
    { value: '700+', label: 'Fabric Options' },
    { value: 'Weather', label: 'Resistant' },
  ],
  ctaPrimaryText: 'Design Your Exterior Shades',
  featuresSectionTitle: 'Built for the Outdoors',
  features: [
    {
      title: 'Weather-Resistant Fabrics',
      desc: 'Heavy-duty PVC-coated polyester fabrics rated for outdoor use. Resistant to mold, mildew, moisture, and UV degradation.',
    },
    {
      title: 'Solar Heat Rejection',
      desc: 'Block up to 90% of solar heat before it enters the glass — dramatically reducing HVAC loads in sun-exposed spaces.',
    },
    {
      title: 'Patio & Pergola Ready',
      desc: 'Custom-sized for any outdoor opening: covered patios, pergolas, screened porches, restaurant outdoor seating, and more.',
    },
    {
      title: 'Motorized Operation',
      desc: 'Outdoor motorized shades allow hands-free operation with RF remote or smart home integration — ideal for large spans or high-mounted shades.',
    },
    {
      title: 'Privacy Without Sacrificing Air',
      desc: 'Open-weave exterior fabrics provide privacy and glare control while still allowing airflow and partial view-through.',
    },
    {
      title: 'Custom Sizing to 144"',
      desc: 'Large exterior openings up to 144" wide and 144" tall. Custom engineering available for oversized installations.',
    },
  ],
  faqs: [
    {
      q: 'Are exterior shades different from interior shades?',
      a: 'Yes. Exterior shades use heavier, weather-resistant fabrics and stainless steel or powder-coated aluminum components that withstand rain, UV, and temperature swings. They are installed outside the window or on the exterior of a structure.',
    },
    {
      q: 'Can exterior shades be retracted in strong winds?',
      a: 'Yes — motorized exterior shades with wind sensors can automatically retract when wind speeds exceed a set threshold, protecting the fabric and motor from damage.',
    },
    {
      q: 'What fabric options are available for exterior shades?',
      a: 'We offer PVC-coated polyester in various openness factors (1–10%) for outdoor use. Colors and textures vary — contact us for a sample kit.',
    },
  ],
  ctaTitle: 'Take Your Outdoor Space to the Next Level',
  ctaNote: 'Free shipping • Custom sizing • Weather-resistant fabrics',
};

export default function ExteriorShadesPage() {
  return <ProductLandingPage data={data} />;
}
