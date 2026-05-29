'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from './CartContext';
import { useDrag } from './DragContext';
import { products } from '@/data/products';

function BagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}

export default function Navbar() {
  const { totalItems, addItem, cartHydrated } = useCart();
  const { drag, endDrag } = useDrag();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagOver, setBagOver] = useState(false);
  const [justDropped, setJustDropped] = useState(false);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setBagOver(true);
  }

  function handleDragLeave() {
    setBagOver(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setBagOver(false);
    const productId = e.dataTransfer.getData('productId');
    const maxStock = parseInt(e.dataTransfer.getData('maxStock') || '99', 10);
    if (productId) {
      addItem(productId, maxStock);
      setJustDropped(true);
      setTimeout(() => setJustDropped(false), 600);
    }
    endDrag();
  }

  const bagClasses = [
    'relative flex items-center justify-center w-10 h-10 rounded-md border-2 border-ink transition-all duration-150 cursor-pointer',
    drag.active ? 'bag-drop-active' : '',
    bagOver ? 'bag-dragover' : 'bg-surface shadow-offset-sm hover:shadow-offset-md hover:-translate-x-px hover:-translate-y-px',
    justDropped ? 'bg-primary-tint border-primary' : '',
  ].filter(Boolean).join(' ');

  return (
    <nav className="border-b-2 border-ink bg-surface sticky top-0 z-50 shadow-offset-sm">
      <div className="max-w-[1180px] mx-auto px-5 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="font-display text-2xl text-ink leading-none tracking-tight">
          R&amp;G TCG
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="font-body font-semibold text-sm text-muted hover:text-ink transition-colors">
            Home
          </Link>
          <Link href="/browse" className="font-body font-semibold text-sm text-muted hover:text-ink transition-colors">
            Browse
          </Link>

          {/* Droppable bag button */}
          <Link href="/cart" className="no-underline">
            <div
              className={bagClasses}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              title={drag.active ? 'Drop here to add to bag' : 'View bag'}
            >
              <BagIcon className="w-5 h-5 text-ink" />
              {cartHydrated && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white font-mono font-bold text-[9px] rounded-pill w-[18px] h-[18px] flex items-center justify-center border border-ink leading-none">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
              {drag.active && (
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold text-primary tracking-wider whitespace-nowrap">
                  DROP HERE
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <Link href="/cart" className="no-underline">
            <div
              className={bagClasses}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <BagIcon className="w-5 h-5 text-ink" />
              {cartHydrated && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white font-mono font-bold text-[9px] rounded-pill w-[18px] h-[18px] flex items-center justify-center border border-ink leading-none">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </div>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex items-center justify-center border-2 border-ink rounded-md bg-surface shadow-offset-sm"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t-2 border-ink bg-surface px-5 py-3 space-y-1">
          {[
            { label: 'Home', href: '/' },
            { label: 'Browse', href: '/browse' },
            { label: `Bag${cartHydrated && totalItems > 0 ? ` (${totalItems})` : ''}`, href: '/cart' },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-body font-semibold text-sm text-ink hover:bg-surface-alt transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
