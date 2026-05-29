'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import { products } from '@/data/products';

interface FormData {
  fullName: string; email: string; address: string;
  city: string; zip: string; cardNumber: string; expiry: string; cvv: string;
}

function Field({ id, label, ...props }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-label-sm font-bold text-muted uppercase tracking-wider mb-1">
        {label}
      </label>
      <input
        id={id}
        className="w-full border-2 border-ink rounded-md px-3 py-2.5 font-body text-body-sm bg-surface text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 shadow-offset-sm"
        {...props}
      />
    </div>
  );
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, cartHydrated } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>({
    fullName: '', email: '', address: '', city: '', zip: '',
    cardNumber: '', expiry: '', cvv: '',
  });

  if (!cartHydrated) {
    return <div className="max-w-xl mx-auto px-5 py-20 text-center font-mono text-label text-muted">Loading…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-5 py-20 text-center">
        <h1 className="font-display text-display-md text-ink">Bag is empty</h1>
        <p className="font-body text-body-sm text-muted mt-2">Add some product before checking out.</p>
        <Link href="/browse" className="btn-primary inline-flex mt-6">Browse products</Link>
      </div>
    );
  }

  const total = totalPrice(products);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function fmtCard(v: string) {
    return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }
  function fmtExpiry(v: string) {
    const d = v.replace(/\D/g, '').slice(0, 4);
    if (d.length <= 2) return d;
    return `${d.slice(0, 2)}/${d.slice(2)}`;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      clearCart();
      const orderNumber = `RG-${Date.now().toString().slice(-8)}`;
      router.push(`/order-confirmation?order=${orderNumber}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-[1180px] mx-auto px-5 py-10">
      <p className="eyebrow mb-2">Almost there</p>
      <h1 className="font-display text-display-lg text-ink mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact */}
          <div className="sticker-card p-6">
            <p className="eyebrow mb-4">Contact</p>
            <div className="space-y-4">
              <Field id="fullName" name="fullName" label="Full name" type="text" required placeholder="Jane Smith" value={form.fullName} onChange={handleChange} />
              <Field id="email" name="email" label="Email" type="email" required placeholder="jane@example.com" value={form.email} onChange={handleChange} />
            </div>
          </div>

          {/* Shipping */}
          <div className="sticker-card p-6">
            <p className="eyebrow mb-4">Shipping address</p>
            <div className="space-y-4">
              <Field id="address" name="address" label="Street address" type="text" required placeholder="123 Cardboard Way" value={form.address} onChange={handleChange} />
              <div className="grid grid-cols-2 gap-4">
                <Field id="city" name="city" label="City" type="text" required placeholder="New York" value={form.city} onChange={handleChange} />
                <Field id="zip" name="zip" label="ZIP" type="text" required placeholder="10001" value={form.zip} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="sticker-card p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="eyebrow">Payment</p>
              <span className="font-mono text-label-sm text-muted">Demo — no real charge</span>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block font-mono text-label-sm font-bold text-muted uppercase tracking-wider mb-1">Card number</label>
                <input
                  id="cardNumber" name="cardNumber" type="text" required maxLength={19}
                  placeholder="1234 5678 9012 3456"
                  value={form.cardNumber}
                  onChange={(e) => setForm((p) => ({ ...p, cardNumber: fmtCard(e.target.value) }))}
                  className="w-full border-2 border-ink rounded-md px-3 py-2.5 font-mono text-body-sm bg-surface text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary shadow-offset-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block font-mono text-label-sm font-bold text-muted uppercase tracking-wider mb-1">Expiry</label>
                  <input
                    id="expiry" name="expiry" type="text" required maxLength={5} placeholder="MM/YY"
                    value={form.expiry}
                    onChange={(e) => setForm((p) => ({ ...p, expiry: fmtExpiry(e.target.value) }))}
                    className="w-full border-2 border-ink rounded-md px-3 py-2.5 font-mono text-body-sm bg-surface text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary shadow-offset-sm"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block font-mono text-label-sm font-bold text-muted uppercase tracking-wider mb-1">CVV</label>
                  <input
                    id="cvv" name="cvv" type="text" required maxLength={4} placeholder="123"
                    value={form.cvv}
                    onChange={(e) => setForm((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                    className="w-full border-2 border-ink rounded-md px-3 py-2.5 font-mono text-body-sm bg-surface text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary shadow-offset-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" disabled={submitting} className="btn-primary w-full py-3 text-base">
            {submitting ? 'Locking in your order…' : `Confirm & pay — $${total.toFixed(2)}`}
          </button>
        </form>

        {/* Order summary */}
        <div>
          <div className="sticker-card p-5 sticky top-24">
            <p className="eyebrow mb-4">Order summary</p>
            <div className="space-y-3">
              {items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;
                return (
                  <div key={item.productId} className="flex gap-3">
                    <img
                      src={product.imageUrl} alt={product.name}
                      className="w-10 rounded-sm border-2 border-ink flex-shrink-0"
                      style={{ aspectRatio: '3/4', objectFit: 'cover', height: 48 }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-semibold text-body-sm text-ink leading-snug truncate">{product.name}</p>
                      <p className="font-mono text-label-sm text-muted capitalize">{product.language} · qty {item.quantity}</p>
                    </div>
                    <p className="font-display text-display-sm text-ink flex-shrink-0 leading-none mt-0.5">
                      ${(product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="border-t-2 border-ink mt-4 pt-4 flex justify-between">
              <span className="font-display text-display-sm text-ink">Total</span>
              <span className="font-display text-display-sm text-ink">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
