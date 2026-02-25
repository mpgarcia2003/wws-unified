import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Cart | World Wide Shades',
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <div className="storefront-container py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <p className="text-gray-500">Cart functionality coming soon.</p>
    </div>
  );
}
