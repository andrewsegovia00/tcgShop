export interface Product {
  id: string;
  name: string;
  tcg: 'pokemon' | 'yugioh' | 'mtg';
  language: 'english' | 'japanese';
  type: 'booster-box' | 'booster-pack' | 'single-card' | 'sealed-product';
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  featured: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (productId: string, maxStock?: number) => void;
  cartHydrated: boolean;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: (products: Product[]) => number;
}
