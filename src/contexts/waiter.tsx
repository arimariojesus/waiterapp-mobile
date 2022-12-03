import { createContext, useCallback, useEffect, useState } from 'react';

import { api } from '../services/api';
import { ICategory, IProduct } from '../types';

interface WaiterContextData {
  isLoading: boolean;
  isLoadingProducts: boolean;

  selectedTable: string;
  products: IProduct[];
  categories: ICategory[];

  handleSelectCategory: (categoryId: string) => Promise<void>;
  handleSaveTable: (table: string) => void;
  handleResetOrder: () => void;
}

export const WaiterContext = createContext<WaiterContextData | null>(null);

interface WaiterProviderProps {
  children: React.ReactNode;
}

export const WaiterProvider = ({ children }: WaiterProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setcategories] = useState<ICategory[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const [categoriesResponse, productsResponse] = await Promise.all([
          api.get<ICategory[]>('/categories'),
          api.get<IProduct[]>('/products'),
        ]);

        setcategories(categoriesResponse.data);
        setProducts(productsResponse.data);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleSelectCategory = useCallback(async (categoryId: string) => {
    try {
      setIsLoadingProducts(true);
      const route = !categoryId
        ? '/products'
        : `/categories/${categoryId}/products`;

      const { data } = await api.get<IProduct[]>(route);
      setProducts(data);
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  const handleSaveTable = (table: string) => {
    setSelectedTable(table);
  };

  const handleResetOrder = () => {
    setSelectedTable('');
  };

  return (
    <WaiterContext.Provider
      value={{
        isLoading,
        isLoadingProducts,

        selectedTable,
        products,
        categories,

        handleSelectCategory,
        handleSaveTable,
        handleResetOrder,
      }}
    >
      {children}
    </WaiterContext.Provider>
  );
};
