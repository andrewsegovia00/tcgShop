'use client';

import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import { products } from '@/data/products';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, cartHydrated } = useCart();

  if (!cartHydrated) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-20 text-center font-mono text-label text-muted">
        Loading bag…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-lg border-2 border-ink bg-primary-tint flex items-center justify-center shadow-offset-md">
          <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <h1 className="font-display text-display-md text-ink">Your bag is empty</h1>
        <p className="font-body text-body-sm text-muted mt-2">Drag a product into the bag or hit <em>Add to bag</em> on any card.</p>
        <Link href="/browse" className="btn-primary inline-flex mt-6">
          Start hunting →
        </Link>
      </div>
    );
  }

  const total = totalPrice(products);

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <p className="eyebrow mb-2">Your haul</p>
      <h1 className="font-display text-display-lg text-ink mb-8">Shopping bag</h1>

      <div className="space-y-4">
        {items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;

          return (
            <div key={item.productId} className="sticker-card flex gap-4 p-4">
              <Link href={`/products/${product.id}`} className="flex-shrink-0">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-14 rounded-sm border-2 border-ink"
                  style={{ aspectRatio: '3/4', objectFit: 'cover', height: 72 }}
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
                  <p className="font-body font-semibold text-body-sm text-ink leading-snug">{product.name}</p>
                </Link>
                <p className="font-mono text-label-sm text-muted capitalize mt-0.5">{product.language}</p>
                <p className="font-display text-display-sm text-ink mt-1">${product.price.toFixed(2)}</p>

                {/* Qty controls */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => updateQuantity(product.id, item.quantity - 1)}
                    className="w-7 h-7 border-2 border-ink rounded-sm bg-surface font-mono font-bold text-sm flex items-center justify-center hover:bg-surface-alt shadow-offset-sm"
                    aria-label="Decrease"
                  >−</button>
                  <span className="font-mono font-bold text-label w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, item.quantity + 1)}
                    disabled={item.quantity >= product.stock}
                    className="w-7 h-7 border-2 border-ink rounded-sm bg-surface font-mono font-bold text-sm flex items-center justify-center hover:bg-surface-alt shadow-offset-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Increase"
                  >+</button>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-muted hover:text-danger font-mono text-label font-bold transition-colors"
                  aria-label="Remove"
                >✕</button>
                <p className="font-display text-display-sm text-ink">
                  ${(product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 sticker-card p-6">
        <div className="flex justify-between font-body text-body-sm text-muted mb-2">
          <span>Subtotal</span>
          <span className="font-semibold text-ink">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-body text-body-sm text-muted mb-4">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="flex justify-between font-display text-display-sm text-ink border-t-2 border-ink pt-4 mb-6">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/checkout" className="btn-primary w-full text-center">
            Go to checkout →
          </Link>
          <Link href="/browse" className="btn-outline w-full text-center">
            Keep hunting
          </Link>
        </div>
      </div>
    </div>
  );
}
