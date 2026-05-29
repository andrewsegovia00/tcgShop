'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { products } from '@/data/products';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

type TcgFilter = 'all' | Product['tcg'];
type LangFilter = 'all' | Product['language'];

const tcgOptions: { label: string; value: TcgFilter }[] = [
  { label: 'All games', value: 'all' },
  { label: 'Pokémon', value: 'pokemon' },
  { label: 'Yu-Gi-Oh!', value: 'yugioh' },
  { label: 'Magic', value: 'mtg' },
];

const langOptions: { label: string; value: LangFilter }[] = [
  { label: 'All languages', value: 'all' },
  { label: 'English', value: 'english' },
  { label: 'Japanese', value: 'japanese' },
];

function FilterBtn({
  active, label, onClick,
}: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={[
        'font-mono font-semibold text-label px-3 py-1.5 rounded-md border-2 transition-all duration-100',
        active
          ? 'bg-primary text-white border-ink shadow-offset-accent'
          : 'bg-surface text-muted border-ink shadow-offset-sm hover:bg-surface-alt hover:shadow-offset-md hover:-translate-x-px hover:-translate-y-px',
      ].join(' ')}
    >
      {label}
    </button>
  );
}

function BrowseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tcgFilter, setTcgFilter] = useState<TcgFilter>('all');
  const [langFilter, setLangFilter] = useState<LangFilter>('all');

  useEffect(() => {
    const t = searchParams.get('tcg') as TcgFilter | null;
    const l = searchParams.get('lang') as LangFilter | null;
    if (t && ['pokemon', 'yugioh', 'mtg'].includes(t)) setTcgFilter(t);
    if (l && ['english', 'japanese'].includes(l)) setLangFilter(l);
  }, [searchParams]);

  function updateParam(key: string, value: string) {
    const p = new URLSearchParams(searchParams.toString());
    if (value === 'all') p.delete(key);
    else p.set(key, value);
    router.replace(`/browse?${p.toString()}`, { scroll: false });
  }

  const filtered = products.filter((p) =>
    (tcgFilter === 'all' || p.tcg === tcgFilter) &&
    (langFilter === 'all' || p.language === langFilter)
  );

  return (
    <div className="max-w-[1180px] mx-auto px-5 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="eyebrow mb-2">R&amp;G TCG · All sealed product</p>
        <h1 className="font-display text-display-lg text-ink">Find your next pull</h1>
        <p className="font-body text-body-sm text-muted mt-1">
          Drag any card into the bag, or tap <em>Add to bag</em>. Filters apply instantly.
        </p>
      </div>

      {/* Filters */}
      <div className="sticker-card p-5 mb-8 flex flex-col sm:flex-row gap-6 flex-wrap">
        <div>
          <p className="eyebrow mb-3">Game</p>
          <div className="flex flex-wrap gap-2">
            {tcgOptions.map((o) => (
              <FilterBtn
                key={o.value}
                active={tcgFilter === o.value}
                label={o.label}
                onClick={() => { setTcgFilter(o.value); updateParam('tcg', o.value); }}
              />
            ))}
          </div>
        </div>
        <div className="w-px bg-border-soft hidden sm:block" />
        <div>
          <p className="eyebrow mb-3">Language</p>
          <div className="flex flex-wrap gap-2">
            {langOptions.map((o) => (
              <FilterBtn
                key={o.value}
                active={langFilter === o.value}
                label={o.label}
                onClick={() => { setLangFilter(o.value); updateParam('lang', o.value); }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Count */}
      <p className="font-mono text-label text-muted mb-5">
        <span className="font-bold text-ink">{filtered.length}</span>{' '}
        {filtered.length === 1 ? 'product' : 'products'} found
      </p>

      {/* Grid or empty */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-body text-muted">Nothing matches those filters.</p>
          <button
            onClick={() => { setTcgFilter('all'); setLangFilter('all'); router.replace('/browse'); }}
            className="mt-3 font-mono text-label font-bold text-primary underline hover:text-primary-strong"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="max-w-[1180px] mx-auto px-5 py-10 font-mono text-label text-muted">
        Loading…
      </div>
    }>
      <BrowseContent />
    </Suspense>
  );
}
