import Link from 'next/link';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';

function BagIllustration() {
  return (
    <div className="flex items-center justify-center w-32 h-32 mx-auto mb-8 rounded-lg border-2 border-ink bg-primary-tint shadow-offset-md">
      <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none" stroke="#1a1320" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8 8 16v36a4 4 0 0 0 4 4h40a4 4 0 0 0 4-4V16l-8-8z" fill="#ede7fb"/>
        <line x1="8" y1="16" x2="56" y2="16"/>
        <path d="M40 26a8 8 0 0 1-16 0" />
        <circle cx="24" cy="26" r="1.5" fill="#6b3bd6" stroke="none"/>
        <circle cx="40" cy="26" r="1.5" fill="#6b3bd6" stroke="none"/>
      </svg>
    </div>
  );
}

const categories = [
  { label: 'Pokémon',          value: 'pokemon', bg: 'bg-primary-tint',  border: 'border-primary',  text: 'text-primary' },
  { label: 'Yu-Gi-Oh!',        value: 'yugioh',  bg: 'bg-purple-50',     border: 'border-primary-soft', text: 'text-primary-soft' },
  { label: 'Magic: The Gathering', value: 'mtg', bg: 'bg-blue-50',       border: 'border-secondary', text: 'text-secondary' },
];

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div>
      {/* Hero */}
      <section className="border-b-2 border-ink bg-surface">
        <div className="max-w-[1180px] mx-auto px-5 py-16 text-center">
          <BagIllustration />
          <p className="eyebrow mb-4">R&amp;G TCG · Sealed product, hand-checked</p>
          <h1 className="font-display text-[clamp(2.25rem,6vw,3.5rem)] text-ink leading-tight tracking-tight">
            Crack packs.<br />Build decks.<br />Rep your game.
          </h1>
          <p className="mt-5 font-body text-body-lg text-muted max-w-lg mx-auto leading-relaxed">
            Booster boxes &amp; packs for Pokémon, Magic, Yu-Gi-Oh! and more —
            <strong className="text-ink"> drag any card into the bag</strong> or
            just tap <em>Add to bag</em>. We handle the rest.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/browse" className="btn-primary text-sm">
              Browse all products
            </Link>
            <Link href="/browse?tcg=pokemon" className="btn-outline text-sm">
              Shop Pokémon
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-[1180px] mx-auto px-5 py-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-display-lg text-ink">Featured drops</h2>
          <Link href="/browse" className="font-mono text-label font-bold text-primary tracking-wider uppercase hover:text-primary-strong transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Category tiles */}
      <section className="border-t-2 border-ink">
        <div className="max-w-[1180px] mx-auto px-5 py-12">
          <h2 className="font-display text-display-lg text-ink mb-6">Shop by game</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categories.map(({ label, value, bg, border, text }) => (
              <Link
                key={value}
                href={`/browse?tcg=${value}`}
                className={`block sticker-card ${bg} border-2 ${border} rounded-lg p-6 text-center`}
              >
                <p className={`font-display text-display-sm ${text}`}>{label}</p>
                <p className="font-mono text-label text-muted mt-1 tracking-wide">Browse all →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
