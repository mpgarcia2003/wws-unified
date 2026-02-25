import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shade Builder | Design Your Custom Shade',
  description: 'Design your custom window shade — select shape, enter measurements, choose fabric, see instant pricing.',
  robots: { index: false, follow: false },
};

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
