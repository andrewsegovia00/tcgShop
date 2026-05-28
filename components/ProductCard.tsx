'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from './CartContext';

interface ProductCardProps {
  product: Product;
}

const tcgLabels: Record<Product['tcg'], string> = {
  pokemon: 'Pokémon',
  yugioh: 'Yu-Gi-Oh!',
  mtg: 'Magic: The Gathering',
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col">
      <Link href={`/products/${product.id}`} className="block">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {tcgLabels[product.tcg]}
          </span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-500 capitalize">{product.language}</span>
        </div>
        <Link href={`/products/${product.id}`} className="hover:underline flex-1">
          <h3 className="text-sm font-medium text-gray-900 leading-snug">{product.name}</h3>
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        <button
          onClick={() => addItem(product.id)}
          disabled={product.stock === 0}
          className="mt-3 w-full py-2 px-4 text-sm font-medium bg-gray-900 text-white rounded hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
