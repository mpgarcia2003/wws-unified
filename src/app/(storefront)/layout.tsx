import { SiteNav } from '@/components/storefront/SiteNav';
import { Footer } from '@/components/storefront/Footer';

/**
 * (storefront) route group layout
 * All pages get the site nav with dropdown menu.
 * The builder lives OUTSIDE this group — full-screen, no nav.
 */
export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <main id="MainContent" role="main" style={{ paddingTop: '96px' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
