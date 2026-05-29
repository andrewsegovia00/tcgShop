'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from './CartContext';
import { useDrag } from './DragContext';

interface ProductCardProps {
  product: Product;
}

const tcgLabels: Record<Product['tcg'], string> = {
  pokemon: 'Pokémon',
  yugioh: 'Yu-Gi-Oh!',
  mtg: 'Magic',
};

const tcgColors: Record<Product['tcg'], string> = {
  pokemon: '#6b3bd6',
  yugioh: '#a07cff',
  mtg: '#3f6df0',
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { startDrag, endDrag } = useDrag();

  function handleDragStart(e: React.DragEvent) {
    e.dataTransfer.setData('productId', product.id);
    e.dataTransfer.setData('maxStock', product.stock.toString());
    e.dataTransfer.effectAllowed = 'copy';
    // Ghost image: use the card itself at reduced opacity — default is fine
    startDrag(product.id, product.stock);
  }

  function handleDragEnd() {
    endDrag();
  }

  return (
    <div
      className="sticker-card flex flex-col cursor-grab active:cursor-grabbing select-none"
      draggable={product.stock > 0}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Image */}
      <Link href={`/products/${product.id}`} className="block" tabIndex={-1} draggable={false}>
        <div className="border-b-2 border-ink overflow-hidden rounded-t-md bg-surface-alt" style={{ aspectRatio: '3/4' }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            draggable={false}
          />
        </div>
      </Link>

      {/* Body */}
      <div className="p-3 flex flex-col flex-1 gap-2">
        {/* TCG chip + language */}
        <div className="flex items-center gap-1.5">
          <span
            className="font-mono font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-pill border border-current"
            style={{ color: tcgColors[product.tcg] }}
          >
            {tcgLabels[product.tcg]}
          </span>
          <span className="font-mono text-[10px] text-muted capitalize">{product.language}</span>
        </div>

        {/* Title */}
        <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors flex-1">
          <h3 className="font-body font-semibold text-body-sm text-ink leading-snug">{product.name}</h3>
        </Link>

        {/* Price + stock row */}
        <div className="flex items-end justify-between">
          <span className="font-display text-display-sm text-ink leading-none">
            ${product.price.toFixed(2)}
          </span>
          <span className={`font-mono text-label-sm font-bold ${product.stock > 0 ? 'text-success' : 'text-danger'}`}>
            {product.stock > 0 ? `${product.stock} left` : 'SOLD OUT'}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={() => addItem(product.id, product.stock)}
          disabled={product.stock === 0}
          className="btn-primary w-full mt-1 text-body-sm"
        >
          {product.stock === 0 ? 'Sold out' : 'Add to bag'}
        </button>

        {/* Drag hint */}
        {product.stock > 0 && (
          <p className="text-center font-mono text-[9px] text-muted tracking-wider uppercase">
            or drag to bag ↑
          </p>
        )}
      </div>
    </div>
  );
}
