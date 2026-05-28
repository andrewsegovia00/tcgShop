'use client';

import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import { products } from '@/data/products';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h1 className="text-xl font-semibold text-gray-900">Your cart is empty</h1>
        <p className="text-sm text-gray-500 mt-2">Add some products to get started.</p>
        <Link
          href="/browse"
          className="mt-6 inline-block px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const total = totalPrice(products);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="space-y-4">
        {items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          const lineTotal = product.price * item.quantity;

          return (
            <div key={item.productId} className="flex gap-4 border border-gray-200 rounded-lg p-4">
              <Link href={`/products/${product.id}`} className="flex-shrink-0">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-20 object-cover rounded border border-gray-100"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.id}`} className="hover:underline">
                  <p className="text-sm font-medium text-gray-900 leading-snug">{product.name}</p>
                </Link>
                <p className="text-xs text-gray-500 mt-0.5 capitalize">{product.language}</p>
                <p className="text-sm font-medium text-gray-900 mt-1">${product.price.toFixed(2)}</p>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => updateQuantity(product.id, item.quantity - 1)}
                    className="w-7 h-7 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 text-base leading-none"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="text-sm w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, item.quantity + 1)}
                    disabled={item.quantity >= product.stock}
                    className="w-7 h-7 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 text-base leading-none disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-gray-400 hover:text-red-500"
                  aria-label="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <p className="text-sm font-semibold text-gray-900">${lineTotal.toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order summary */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">Subtotal</span>
          <span className="text-sm font-medium text-gray-900">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-600">Shipping</span>
          <span className="text-sm text-gray-500">Calculated at checkout</span>
        </div>
        <div className="flex justify-between items-center text-base font-semibold border-t border-gray-200 pt-4">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Link
          href="/checkout"
          className="mt-6 block w-full py-3 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700 text-center"
        >
          Proceed to Checkout
        </Link>
        <Link
          href="/browse"
          className="mt-3 block w-full py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 text-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
