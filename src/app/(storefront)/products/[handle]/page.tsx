import type { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

/**
 * Product Detail Page
 * TODO: Recreate from product.json + main-product.liquid
 *   - Product media gallery
 *   - Variant picker
 *   - Buy buttons / Add to Cart
 *   - Related products
 *   - Sticky ATC bar
 */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  return {
    title: handle.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;

  return (
    <div className="storefront-container py-12">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {handle.replace(/-/g, ' ')}
      </h1>
      <p className="text-gray-500">Product details will be loaded from Shopify Storefront API</p>
    </div>
  );
}
