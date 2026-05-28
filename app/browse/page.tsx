'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { products } from '@/data/products';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

type TcgFilter = 'all' | Product['tcg'];
type LangFilter = 'all' | Product['language'];

const tcgOptions: { label: string; value: TcgFilter }[] = [
  { label: 'All Games', value: 'all' },
  { label: 'Pokémon', value: 'pokemon' },
  { label: 'Yu-Gi-Oh!', value: 'yugioh' },
  { label: 'Magic: The Gathering', value: 'mtg' },
];

const langOptions: { label: string; value: LangFilter }[] = [
  { label: 'All Languages', value: 'all' },
  { label: 'English', value: 'english' },
  { label: 'Japanese', value: 'japanese' },
];

function BrowseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [tcgFilter, setTcgFilter] = useState<TcgFilter>('all');
  const [langFilter, setLangFilter] = useState<LangFilter>('all');

  useEffect(() => {
    const tcgParam = searchParams.get('tcg') as TcgFilter | null;
    const langParam = searchParams.get('lang') as LangFilter | null;
    if (tcgParam && ['pokemon', 'yugioh', 'mtg'].includes(tcgParam)) {
      setTcgFilter(tcgParam);
    }
    if (langParam && ['english', 'japanese'].includes(langParam)) {
      setLangFilter(langParam);
    }
  }, [searchParams]);

  function handleTcgChange(value: TcgFilter) {
    setTcgFilter(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') params.delete('tcg');
    else params.set('tcg', value);
    router.replace(`/browse?${params.toString()}`, { scroll: false });
  }

  function handleLangChange(value: LangFilter) {
    setLangFilter(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') params.delete('lang');
    else params.set('lang', value);
    router.replace(`/browse?${params.toString()}`, { scroll: false });
  }

  const filtered = products.filter((p) => {
    const tcgMatch = tcgFilter === 'all' || p.tcg === tcgFilter;
    const langMatch = langFilter === 'all' || p.language === langFilter;
    return tcgMatch && langMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Browse Products</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-6 border-b border-gray-200">
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Game
          </label>
          <div className="flex flex-wrap gap-2">
            {tcgOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleTcgChange(opt.value)}
                className={`px-3 py-1.5 text-sm rounded border ${
                  tcgFilter === opt.value
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Language
          </label>
          <div className="flex flex-wrap gap-2">
            {langOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleLangChange(opt.value)}
                className={`px-3 py-1.5 text-sm rounded border ${
                  langFilter === opt.value
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-5">
        {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">No products match your filters.</p>
          <button
            onClick={() => {
              setTcgFilter('all');
              setLangFilter('all');
              router.replace('/browse');
            }}
            className="mt-3 text-sm text-gray-900 underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-10 text-sm text-gray-500">Loading...</div>}>
      <BrowseContent />
    </Suspense>
  );
}
