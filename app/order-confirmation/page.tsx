'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ConfirmContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') ?? 'RG-XXXXXXXX';

  return (
    <div className="max-w-lg mx-auto px-5 py-20 text-center">
      {/* Icon */}
      <div className="w-20 h-20 mx-auto mb-6 rounded-lg border-2 border-ink bg-primary-tint flex items-center justify-center shadow-offset-md">
        <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      </div>

      <p className="eyebrow mb-3">Order confirmed</p>
      <h1 className="font-display text-display-lg text-ink leading-tight">
        Your pulls are on their way.
      </h1>
      <p className="font-body text-body-sm text-muted mt-3 max-w-xs mx-auto leading-relaxed">
        Packed by hand. Shipped with care. Good luck on your pulls — may the RNG be with you.
      </p>

      {/* Order card */}
      <div className="sticker-card p-6 text-left mt-8">
        <div className="flex justify-between items-center py-2 border-b border-border-soft">
          <span className="font-mono text-label text-muted">Order number</span>
          <span className="font-mono font-bold text-label text-primary">{orderNumber}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border-soft">
          <span className="font-mono text-label text-muted">Status</span>
          <span className="font-mono font-bold text-label text-success">Confirmed</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="font-mono text-label text-muted">Est. delivery</span>
          <span className="font-mono text-label text-ink">5 – 7 business days</span>
        </div>
      </div>

      <p className="font-mono text-label-sm text-muted mt-4">
        Demo store — no real payment was processed.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
        <Link href="/browse" className="btn-primary">
          Keep hunting →
        </Link>
        <Link href="/" className="btn-outline">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-mono text-label text-muted">Loading…</div>}>
      <ConfirmContent />
    </Suspense>
  );
}
