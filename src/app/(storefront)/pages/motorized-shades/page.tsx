import type { Metadata } from 'next';
import ProductLandingPage, { type ProductLandingPageData } from '@/components/storefront/ProductLandingPage';

export const metadata: Metadata = {
  title: 'Custom Motorized Roller Shades — Smart Home Ready | World Wide Shades',
  description: 'Custom motorized window shades with Somfy motors. Works with Alexa, Google Home, Control4, Lutron. Made in USA, 700+ fabrics, free shipping.',
};

const data: ProductLandingPageData = {
  eyebrow: 'Smart Window Automation',
  heroTitle: 'Custom Motorized Roller Shades',
  heroSubtitle: 'Effortless operation at the touch of a button. Somfy-powered motors, smart home integration, and ultra-quiet performance for any window in your home.',
  heroStats: [
    { value: 'Somfy', label: 'Motor Brand' },
    { value: '700+', label: 'Fabric Options' },
    { value: '5 Years', label: 'Motor Warranty' },
  ],
  ctaPrimaryText: 'Design Your Motorized Shades',
  featuresSectionTitle: 'Why Motorized Shades?',
  features: [
    {
      title: 'Quiet, Reliable Somfy Motors',
      desc: 'Industry-leading Somfy motors rated for years of daily use. Ultra-quiet operation — you\'ll barely notice when the shades move.',
    },
    {
      title: 'Smart Home Ready',
      desc: 'Works with Alexa, Google Home, Control4, Lutron, Crestron, and most major smart home platforms. Schedule, automate, and voice-control your shades.',
    },
    {
      title: 'Hardwire or Plug-In',
      desc: 'Line voltage (120V/60Hz) standard. Low voltage (24VDC) and battery-powered options also available for any installation situation.',
    },
    {
      title: 'Multiple Control Options',
      desc: 'RF remote control, wall-mounted transmitter, 4-wire Decora switch, smartphone app, or voice activation — choose what works best for your lifestyle.',
    },
    {
      title: 'Essential for Specialty Shapes',
      desc: 'Motorization is standard on all specialty shape shades (triangle, trapezoid, hexagon, pentagon) because manual operation is not practical on angled rails.',
    },
    {
      title: 'UL Listed & Warranted',
      desc: 'All motors are UL listed for safety. Motor warranty is 5 years; fabric warranty is 3 years. Professional installation support available nationwide.',
    },
  ],
  faqs: [
    {
      q: 'What motor brands do you use?',
      a: 'We use Somfy tubular motors — the industry standard for motorized window treatments. Somfy is known for ultra-quiet operation, reliability, and broad smart home compatibility.',
    },
    {
      q: 'Do I need an electrician to install motorized shades?',
      a: 'For hardwired (line voltage) installations, yes — an electrician should connect the power. For plug-in or battery-powered motors, no electrician is needed and installation is DIY-friendly.',
    },
    {
      q: 'Can existing shades be converted to motorized?',
      a: 'In most cases, no — motorized shades require a different tube, motor, and bracket system from the start. We build motorized shades from scratch to your exact dimensions.',
    },
    {
      q: 'What smart home systems are compatible?',
      a: 'Somfy motors work with most major smart home platforms including Amazon Alexa, Google Home, Apple HomeKit (with hub), Control4, Lutron, Crestron, and Savant. Ask us about specific integrations.',
    },
  ],
  ctaTitle: 'Automate Your Window Treatments',
  ctaNote: 'Free shipping • Made in USA • 5-year motor warranty',
};

export default function MotorizedShadesPage() {
  return <ProductLandingPage data={data} />;
}
