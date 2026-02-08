/**
 * Cart Item Type Definition
 * Extends MenuItem with quantity
 */
export interface CartItem {
  /** Unique identifier */
  id: string;
  /** Item name in English */
  name: string;
  /** Item name in Amharic */
  nameAm: string;
  /** Price in Ethiopian Birr */
  price: number;
  /** Image URL */
  image: string;
  /** Quantity in cart */
  quantity: number;
  /** Special instructions */
  notes?: string;
}

/**
 * Cart State
 */
export interface CartState {
  /** Cart items */
  items: CartItem[];
  /** Total price */
  total: number;
  /** Total item count */
  itemCount: number;
}

/**
 * Cart Context Type
 */
export interface CartContextType {
  /** Cart items */
  items: CartItem[];
  /** Add item to cart */
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  /** Update item quantity */
  updateQuantity: (id: string, quantity: number) => void;
  /** Remove item from cart */
  removeItem: (id: string) => void;
  /** Clear cart */
  clearCart: () => void;
  /** Total price */
  total: number;
  /** Total item count */
  itemCount: number;
  /** Check if item is in cart */
  isInCart: (id: string) => boolean;
  /** Get item quantity */
  getItemQuantity: (id: string) => number;
}

/**
 * Order Details
 */
export interface OrderDetails {
  /** Order ID */
  id: string;
  /** Customer name */
  customerName: string;
  /** Phone number */
  phone: string;
  /** Table number */
  tableNumber?: string;
  /** Order items */
  items: CartItem[];
  /** Total amount */
  total: number;
  /** Order status */
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  /** Order timestamp */
  timestamp: string;
  /** Special notes */
  notes?: string;
}
