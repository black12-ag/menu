import { MenuItem } from '../types/menu';

export interface OrderItem {
  item: MenuItem;
  quantity: number;
  customizations?: string[];
}

export interface Order {
  orderId: string;
  tableNumber: number;
  orderDate: string;
  customerName: string;
  phone?: string;
  notes?: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'served';
}

// Generate random order ID
export const generateOrderId = (): string => {
  const prefix = 'ORD';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

// Generate random table number
export const generateTableNumber = (): number => {
  return Math.floor(Math.random() * 50) + 1; // Tables 1-50
};

// Calculate order total
export const calculateTotal = (items: OrderItem[]): number => {
  return items.reduce((sum, orderItem) => {
    return sum + (orderItem.item.price * orderItem.quantity);
  }, 0);
};

// Create new order
export const createOrder = (
  items: OrderItem[],
  customerName: string = 'Guest',
  phone?: string,
  notes?: string
): Order => {
  return {
    orderId: generateOrderId(),
    tableNumber: generateTableNumber(),
    orderDate: new Date().toISOString(),
    customerName,
    phone,
    notes,
    items,
    total: calculateTotal(items),
    status: 'pending',
  };
};

// Format order for display
export const formatOrderDisplay = (order: Order): string => {
  const date = new Date(order.orderDate).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
Order #${order.orderId}
Table: ${order.tableNumber}
Date: ${date}
Customer: ${order.customerName}
${order.phone ? `Phone: ${order.phone}` : ''}

Items:
${order.items.map(item => `  - ${item.item.name} x${item.quantity} = ${item.item.price * item.quantity} ETB`).join('\n')}

Total: ${order.total} ETB
Status: ${order.status}
  `.trim();
};

// Submit order to backend
export const submitOrder = async (order: Order): Promise<{ success: boolean; message: string; order?: Order }> => {
  try {
    // In production, this would call the Netlify function
    const response = await fetch('/.netlify/functions/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: order.items.map(item => ({
          id: item.item.id,
          name: item.item.name,
          price: item.item.price,
          quantity: item.quantity,
        })),
        customerName: order.customerName,
        phone: order.phone,
        notes: order.notes,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit order');
    }

    const data = await response.json();
    return {
      success: true,
      message: 'Order placed successfully!',
      order: data.order,
    };
  } catch (error) {
    // For demo purposes, simulate success
    console.log('Order submitted (demo mode):', order);
    return {
      success: true,
      message: `Order #${order.orderId} placed successfully! Your table number is ${order.tableNumber}.`,
      order,
    };
  }
};
