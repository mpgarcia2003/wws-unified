import type { Metadata } from 'next';

interface CMSPageProps {
  params: Promise<{ handle: string }>;
}

/**
 * Dynamic CMS Pages — handles all /pages/* routes from Shopify:
 *   FAQ, contact, fabric guide, shape landing pages, etc.
 */
export async function generateMetadata({ params }: CMSPageProps): Promise<Metadata> {
  const { handle } = await params;
  return {
    title: handle.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  };
}

export default async function CMSPage({ params }: CMSPageProps) {
  const { handle } = await params;

  return (
    <div className="storefront-container py-12">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {handle.replace(/-/g, ' ')}
      </h1>
      <p className="text-gray-500">Page content will be loaded from Shopify</p>
    </div>
  );
}
