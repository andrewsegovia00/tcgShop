'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') ?? 'TCG-XXXXXXXX';

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-green-50 rounded-full border border-green-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Order Placed!</h1>
      <p className="text-gray-500 mt-2 text-sm">Thank you for your purchase. Your order has been received.</p>

      <div className="mt-6 border border-gray-200 rounded-lg p-6 text-left">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Order number</span>
          <span className="text-sm font-mono font-semibold text-gray-900">{orderNumber}</span>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-gray-500">Status</span>
          <span className="text-sm font-medium text-green-600">Confirmed</span>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-gray-500">Estimated delivery</span>
          <span className="text-sm text-gray-900">5–7 business days</span>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400">
        This is a demo store. No real payment was processed.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/browse"
          className="inline-block px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="inline-block px-6 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-500 text-sm">Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
