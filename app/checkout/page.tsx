'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import { products } from '@/data/products';

interface FormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, cartHydrated } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  if (!cartHydrated) {
    return <div className="max-w-2xl mx-auto px-4 py-20 text-center text-sm text-gray-400">Loading…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-xl font-semibold text-gray-900">Nothing to check out</h1>
        <p className="text-sm text-gray-500 mt-2">Your cart is empty.</p>
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function formatCardNumber(value: string) {
    return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }

  function formatExpiry(value: string) {
    // Allow user to type or delete the slash naturally
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length === 0) return '';
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      clearCart();
      const orderNumber = `TCG-${Date.now().toString().slice(-8)}`;
      router.push(`/order-confirmation?order=${orderNumber}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact */}
          <fieldset>
            <legend className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200 w-full">
              Contact Information
            </legend>
            <div className="space-y-3">
              <div>
                <label htmlFor="fullName" className="block text-xs font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="jane@example.com"
                />
              </div>
            </div>
          </fieldset>

          {/* Shipping */}
          <fieldset>
            <legend className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200 w-full">
              Shipping Address
            </legend>
            <div className="space-y-3">
              <div>
                <label htmlFor="address" className="block text-xs font-medium text-gray-600 mb-1">
                  Street Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="123 Main St"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="city" className="block text-xs font-medium text-gray-600 mb-1">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-xs font-medium text-gray-600 mb-1">
                    ZIP Code
                  </label>
                  <input
                    id="zip"
                    name="zip"
                    type="text"
                    required
                    value={form.zip}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="10001"
                  />
                </div>
              </div>
            </div>
          </fieldset>

          {/* Payment */}
          <fieldset>
            <legend className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200 w-full flex items-center justify-between">
              Payment
              <span className="text-xs font-normal text-gray-400">(Demo — no real charges)</span>
            </legend>
            <div className="space-y-3">
              <div>
                <label htmlFor="cardNumber" className="block text-xs font-medium text-gray-600 mb-1">
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  required
                  value={form.cardNumber}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      cardNumber: formatCardNumber(e.target.value),
                    }))
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 font-mono"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="expiry" className="block text-xs font-medium text-gray-600 mb-1">
                    Expiry
                  </label>
                  <input
                    id="expiry"
                    name="expiry"
                    type="text"
                    required
                    value={form.expiry}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        expiry: formatExpiry(e.target.value),
                      }))
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 font-mono"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-xs font-medium text-gray-600 mb-1">
                    CVV
                  </label>
                  <input
                    id="cvv"
                    name="cvv"
                    type="text"
                    required
                    value={form.cvv}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        cvv: e.target.value.replace(/\D/g, '').slice(0, 4),
                      }))
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 font-mono"
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {submitting ? 'Processing...' : `Place Order — $${total.toFixed(2)}`}
          </button>
        </form>

        {/* Order summary */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            Order Summary
          </h2>
          <div className="space-y-3">
            {items.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;
              return (
                <div key={item.productId} className="flex gap-3 text-sm">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-10 h-13 object-cover rounded border border-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-medium leading-snug truncate">{product.name}</p>
                    <p className="text-gray-500 text-xs capitalize">{product.language} · qty {item.quantity}</p>
                  </div>
                  <p className="text-gray-900 font-medium flex-shrink-0">
                    ${(product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 border-t border-gray-200 pt-4 text-sm font-semibold flex justify-between">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
