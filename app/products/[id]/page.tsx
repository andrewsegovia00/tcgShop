'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/components/CartContext';
import ProductCard from '@/components/ProductCard';

const tcgLabels: Record<string, string> = {
  pokemon: 'Pokémon',
  yugioh: 'Yu-Gi-Oh!',
  mtg: 'Magic: The Gathering',
};

const typeLabels: Record<string, string> = {
  'booster-box': 'Booster Box',
  'booster-pack': 'Booster Pack',
  'single-card': 'Single Card',
  'sealed-product': 'Sealed Product',
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id);
  const { addItem, items } = useCart();

  if (!product) return notFound();

  const cartItem = items.find((i) => i.productId === product.id);
  const related = products
    .filter((p) => p.tcg === product.tcg && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex gap-2">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href="/browse" className="hover:text-gray-900">Browse</Link>
        <span>/</span>
        <span className="text-gray-900 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Product detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-96 w-auto object-contain"
          />
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {tcgLabels[product.tcg] ?? product.tcg}
            </span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-500 capitalize">{product.language}</span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-500">{typeLabels[product.type] ?? product.type}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h1>
          <p className="mt-4 text-3xl font-semibold text-gray-900">${product.price.toFixed(2)}</p>

          <p className={`mt-2 text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          <p className="mt-5 text-sm text-gray-600 leading-relaxed">{product.description}</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => addItem(product.id, product.stock)}
              disabled={product.stock === 0}
              className="flex-1 py-3 px-6 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            {cartItem && (
              <Link
                href="/cart"
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 text-center"
              >
                View Cart ({cartItem.quantity} in cart)
              </Link>
            )}
          </div>

          {/* Specs table */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Product Details</h2>
            <dl className="space-y-2">
              {[
                { label: 'Game', value: tcgLabels[product.tcg] ?? product.tcg },
                { label: 'Language', value: product.language.charAt(0).toUpperCase() + product.language.slice(1) },
                { label: 'Type', value: typeLabels[product.type] ?? product.type },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4 text-sm">
                  <dt className="w-24 text-gray-500 flex-shrink-0">{label}</dt>
                  <dd className="text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">More {tcgLabels[product.tcg]} Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
