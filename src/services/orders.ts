import { api } from './api';

interface OrderPayload {
  table: string;
  products: {
    product: string;
    quantity: number;
  }[];
}

class Orders {
  async add(order: OrderPayload) {
    try {
      const { data } = await api.post('/orders', order);
      return data;
    } catch {
      throw new Error('Unable to add a new order!');
    }
  }
}

export const OrdersService = new Orders();
