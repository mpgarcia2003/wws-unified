'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export function Header() {
  const { totalQuantity, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="storefront-container flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold">
          World Wide Shades
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/collections" className="hover:text-[--color-wws-indigo]">Shop</Link>
          <Link href="/pages/specialty-shades" className="hover:text-[--color-wws-indigo]">Specialty Shapes</Link>
          <Link href="/pages/fabric-guide" className="hover:text-[--color-wws-indigo]">Fabric Guide</Link>
          <Link href="/pages/faq" className="hover:text-[--color-wws-indigo]">FAQ</Link>
          <Link href="/pages/contact" className="hover:text-[--color-wws-indigo]">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/builder"
            className="hidden sm:inline-flex px-4 py-2 bg-[--color-wws-indigo] text-white text-sm font-semibold rounded-lg hover:bg-[--color-wws-indigo-dark] transition-colors"
          >
            Design Your Shades
          </Link>

          <button
            onClick={openCart}
            className="relative p-2"
            aria-label={`Cart (${totalQuantity} items)`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[--color-wws-indigo] text-white text-xs font-bold rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
