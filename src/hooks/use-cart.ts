import { useContext } from 'react';

import { CartContext } from '../contexts';

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('You must use CartProvider when using useCart');
  }

  return context;
};
