import { useContext } from 'react';

import { WaiterContext } from '../contexts';

export const useWaiter = () => {
  const context = useContext(WaiterContext);

  if (!context) {
    throw new Error('You must use WaiterProvider when using useWaiter');
  }

  return context;
};
