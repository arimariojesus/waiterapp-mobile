import { createContext, useCallback, useState } from 'react';

import { ICartItem, IProduct } from '../types';

interface CartContextData {
  items: ICartItem[];
  addItem: (item: IProduct) => void;
  removeItem: (item: IProduct) => void;
  resetItems: () => void;
}

export const CartContext = createContext<CartContextData | null>(null);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<ICartItem[]>([]);

  const addItem = useCallback((product: IProduct) => {
    setItems(_items => {
      const itemIndex = _items.findIndex(
        item => item.product._id === product._id,
      );

      if (itemIndex < 0) {
        return _items.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItems = [..._items];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        quantity: item.quantity + 1,
        product,
      };

      return newCartItems;
    });
  }, []);

  const removeItem = useCallback((product: IProduct) => {
    setItems(_items => {
      const itemIndex = _items.findIndex(
        item => item.product._id === product._id,
      );
      const newCartItems = [..._items];
      const quantity = newCartItems[itemIndex]?.quantity ?? 0;

      if (quantity <= 1) {
        newCartItems.splice(itemIndex, 1);
      } else {
        newCartItems[itemIndex] = {
          quantity: quantity - 1,
          product,
        };
      }

      return newCartItems;
    });
  }, []);

  const resetItems = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, resetItems }}>
      {children}
    </CartContext.Provider>
  );
};
