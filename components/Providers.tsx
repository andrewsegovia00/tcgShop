'use client';

import { CartProvider } from './CartContext';
import { DragProvider } from './DragContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DragProvider>
      <CartProvider>{children}</CartProvider>
    </DragProvider>
  );
}
