import Link from 'next/link';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Trading Card Games
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Shop sealed booster boxes and packs for Pokémon, Yu-Gi-Oh!, and Magic: The Gathering.
            English and Japanese editions available.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/browse"
              className="inline-block px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700"
            >
              Browse All Products
            </Link>
            <Link
              href="/browse?tcg=pokemon"
              className="inline-block px-6 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50"
            >
              Shop Pokémon
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Featured Products</h2>
          <Link href="/browse" className="text-sm text-gray-500 hover:text-gray-900 underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* TCG categories */}
      <section className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Shop by Game</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Pokémon', value: 'pokemon', color: 'bg-yellow-50 border-yellow-200' },
              { label: 'Yu-Gi-Oh!', value: 'yugioh', color: 'bg-purple-50 border-purple-200' },
              { label: 'Magic: The Gathering', value: 'mtg', color: 'bg-green-50 border-green-200' },
            ].map(({ label, value, color }) => (
              <Link
                key={value}
                href={`/browse?tcg=${value}`}
                className={`block border rounded-lg p-6 text-center hover:shadow-sm ${color}`}
              >
                <p className="font-medium text-gray-900">{label}</p>
                <p className="text-sm text-gray-500 mt-1">Browse all products →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
