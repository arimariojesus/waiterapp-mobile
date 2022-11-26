import { ICartItem } from '../types';

export function getTotalPrice(item: ICartItem[]) {
  return item.reduce((total, product) => {
    const {
      product: { price },
      quantity,
    } = product;
    return total + price * quantity;
  }, 0);
}
