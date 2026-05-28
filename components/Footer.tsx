import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">TCG Shop</p>
            <p className="text-xs text-gray-500 mt-1">Your source for trading card games.</p>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="text-xs text-gray-500 hover:text-gray-900">
              Home
            </Link>
            <Link href="/browse" className="text-xs text-gray-500 hover:text-gray-900">
              Browse
            </Link>
            <Link href="/cart" className="text-xs text-gray-500 hover:text-gray-900">
              Cart
            </Link>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} TCG Shop. All rights reserved. Demo store — no real transactions.
        </p>
      </div>
    </footer>
  );
}
