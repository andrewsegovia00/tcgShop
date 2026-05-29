import Link from 'next/link';

const games = [
  { label: 'Pokémon', href: '/browse?tcg=pokemon' },
  { label: 'Magic: The Gathering', href: '/browse?tcg=mtg' },
  { label: 'Yu-Gi-Oh!', href: '/browse?tcg=yugioh' },
];

const shop = [
  { label: 'Browse all', href: '/browse' },
  { label: 'Booster boxes', href: '/browse' },
  { label: 'Booster packs', href: '/browse' },
  { label: 'Your bag', href: '/cart' },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-surface mt-auto">
      {/* Main footer grid */}
      <div className="max-w-[1180px] mx-auto px-5 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-2">
          <p className="font-display text-display-md text-ink leading-none">R&amp;G TCG</p>
          <p className="font-body text-body-sm text-muted mt-3 max-w-xs leading-relaxed">
            Sealed product, hand-checked. Booster boxes and packs across the five
            major games — picked, packed, and shipped the same day.
          </p>
          <div className="flex gap-2 flex-wrap mt-5">
            {['Pokémon','Magic','Yu-Gi-Oh!','Lorcana','One Piece'].map((g) => (
              <span key={g} className="chip text-[10px] text-muted">{g}</span>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <p className="eyebrow mb-4">Shop</p>
          <ul className="space-y-2.5">
            {shop.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="font-body text-body-sm text-muted hover:text-ink transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Games */}
        <div>
          <p className="eyebrow mb-4">Games</p>
          <ul className="space-y-2.5">
            {games.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="font-body text-body-sm text-muted hover:text-ink transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t-2 border-border-soft">
        <div className="max-w-[1180px] mx-auto px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-label-sm text-muted">
            © {new Date().getFullYear()} R&amp;G TCG — Demo store, no real transactions.
          </p>
          <p className="font-mono text-label-sm text-muted">
            White + Purple "Gear 5"
          </p>
        </div>
      </div>
    </footer>
  );
}
