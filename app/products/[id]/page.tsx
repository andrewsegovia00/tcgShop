'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/components/CartContext';
import { useDrag } from '@/components/DragContext';
import ProductCard from '@/components/ProductCard';

const tcgLabels: Record<string, string> = {
  pokemon: 'Pokémon', yugioh: 'Yu-Gi-Oh!', mtg: 'Magic: The Gathering',
};
const typeLabels: Record<string, string> = {
  'booster-box': 'Booster Box', 'booster-pack': 'Booster Pack',
  'single-card': 'Single Card', 'sealed-product': 'Sealed Product',
};
const tcgColors: Record<string, string> = {
  pokemon: '#6b3bd6', yugioh: '#a07cff', mtg: '#3f6df0',
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id);
  const { addItem, items } = useCart();
  const { startDrag, endDrag } = useDrag();

  if (!product) return notFound();

  const cartItem = items.find((i) => i.productId === product.id);
  const related = products.filter((p) => p.tcg === product.tcg && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-[1180px] mx-auto px-5 py-10">
      {/* Breadcrumb */}
      <nav className="flex gap-2 items-center font-mono text-label text-muted mb-8">
        <Link href="/" className="hover:text-ink transition-colors">Home</Link>
        <span>/</span>
        <Link href="/browse" className="hover:text-ink transition-colors">Browse</Link>
        <span>/</span>
        <span className="text-ink font-bold truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image — draggable too */}
        <div
          className="sticker-card overflow-hidden bg-surface-alt flex items-center justify-center p-6 cursor-grab active:cursor-grabbing"
          draggable={product.stock > 0}
          onDragStart={(e) => {
            e.dataTransfer.setData('productId', product.id);
            e.dataTransfer.setData('maxStock', product.stock.toString());
            e.dataTransfer.effectAllowed = 'copy';
            startDrag(product.id, product.stock);
          }}
          onDragEnd={endDrag}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-96 w-auto object-contain"
            draggable={false}
            style={{ aspectRatio: 'var(--img-product-ratio)', objectFit: 'contain' }}
          />
        </div>

        {/* Info */}
        <div>
          {/* Chips */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className="chip text-label-sm"
              style={{ color: tcgColors[product.tcg] ?? '#6b3bd6' }}
            >
              {tcgLabels[product.tcg] ?? product.tcg}
            </span>
            <span className="chip text-label-sm text-muted capitalize">{product.language}</span>
            <span className="chip text-label-sm text-muted">{typeLabels[product.type] ?? product.type}</span>
          </div>

          <h1 className="font-display text-display-md text-ink leading-snug">{product.name}</h1>
          <p className="font-display text-display-lg text-ink mt-3">${product.price.toFixed(2)}</p>

          <p className={`font-mono text-label font-bold mt-1 ${product.stock > 0 ? 'text-success' : 'text-danger'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'SOLD OUT'}
          </p>

          <p className="font-body text-body-sm text-muted mt-5 leading-relaxed">{product.description}</p>

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => addItem(product.id, product.stock)}
              disabled={product.stock === 0}
              className="btn-primary flex-1"
            >
              {product.stock === 0 ? 'Sold out' : 'Add to bag'}
            </button>
            {cartItem && (
              <Link href="/cart" className="btn-outline flex-1 text-center text-sm">
                View bag ({cartItem.quantity} in bag)
              </Link>
            )}
          </div>

          {product.stock > 0 && (
            <p className="font-mono text-[10px] text-muted tracking-wider uppercase mt-3">
              ↑ Or drag the image into the bag in the nav
            </p>
          )}

          {/* Specs */}
          <div className="mt-8 border-t-2 border-ink pt-6">
            <p className="eyebrow mb-4">Product details</p>
            <dl className="space-y-2">
              {[
                ['Game', tcgLabels[product.tcg] ?? product.tcg],
                ['Language', product.language.charAt(0).toUpperCase() + product.language.slice(1)],
                ['Type', typeLabels[product.type] ?? product.type],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4 text-body-sm">
                  <dt className="w-24 font-mono text-label text-muted flex-shrink-0">{label}</dt>
                  <dd className="font-body font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16 border-t-2 border-ink pt-10">
          <h2 className="font-display text-display-md text-ink mb-6">
            More {tcgLabels[product.tcg]} product
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
