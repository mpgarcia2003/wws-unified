import type { Metadata } from 'next';

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

/**
 * Single Collection page
 * TODO: Recreate from collection.json + main-collection-product-grid.liquid
 */
export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  return {
    title: handle.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;

  return (
    <div className="storefront-container py-12">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {handle.replace(/-/g, ' ')}
      </h1>
      <p className="text-gray-500">Product grid will be loaded from Shopify Storefront API</p>
    </div>
  );
}
