import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[--color-wws-black] text-white py-12">
      <div className="storefront-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">World Wide Shades</h3>
            <p className="text-sm text-gray-400">
              Custom shades for windows other companies won&apos;t touch. Made in USA.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/collections" className="hover:text-white">All Products</Link></li>
              <li><Link href="/pages/specialty-shades" className="hover:text-white">Specialty Shapes</Link></li>
              <li><Link href="/builder" className="hover:text-white">Shade Builder</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/pages/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/pages/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/pages/fabric-guide" className="hover:text-white">Fabric Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Connect</h4>
            <p className="text-sm text-gray-400">Follow us on social media</p>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} World Wide Shades. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
