import { Handler } from '@netlify/functions';

// Generate random order ID
const generateOrderId = (): string => {
  const prefix = 'ORD';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

// Generate random table number
const generateTableNumber = (): number => {
  return Math.floor(Math.random() * 50) + 1; // Tables 1-50
};

export const handler: Handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { items, customerName, phone, notes } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Items are required' }),
      };
    }

    // Generate order details
    const orderId = generateOrderId();
    const tableNumber = generateTableNumber();
    const orderDate = new Date().toISOString();

    // Calculate total
    const total = items.reduce((sum: number, item: any) => {
      return sum + (item.price * (item.quantity || 1));
    }, 0);

    // Create order object
    const order = {
      orderId,
      tableNumber,
      orderDate,
      customerName: customerName || 'Guest',
      phone: phone || null,
      notes: notes || null,
      items,
      total,
      status: 'pending',
    };

    // In a real application, you would save this to a database
    // For now, we'll just return the order details

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Order created successfully',
        order,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
