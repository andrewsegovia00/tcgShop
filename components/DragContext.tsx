'use client';

import { createContext, useContext, useState } from 'react';

interface DragState {
  active: boolean;
  productId: string | null;
  maxStock: number;
}

interface DragContextType {
  drag: DragState;
  startDrag: (productId: string, maxStock: number) => void;
  endDrag: () => void;
}

const DragContext = createContext<DragContextType | null>(null);

export function DragProvider({ children }: { children: React.ReactNode }) {
  const [drag, setDrag] = useState<DragState>({ active: false, productId: null, maxStock: 0 });

  function startDrag(productId: string, maxStock: number) {
    setDrag({ active: true, productId, maxStock });
  }

  function endDrag() {
    setDrag({ active: false, productId: null, maxStock: 0 });
  }

  return (
    <DragContext.Provider value={{ drag, startDrag, endDrag }}>
      {children}
    </DragContext.Provider>
  );
}

export function useDrag(): DragContextType {
  const ctx = useContext(DragContext);
  if (!ctx) throw new Error('useDrag must be used within DragProvider');
  return ctx;
}
