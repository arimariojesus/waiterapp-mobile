import { createContext, useCallback, useEffect, useState } from 'react';

import { CategoriesService, ProductsService } from '../services';
import { ICategory, IProduct } from '../types';

interface WaiterContextData {
  isLoading: boolean;
  isLoadingProducts: boolean;

  selectedTable: string;
  products: IProduct[];
  categories: ICategory[];

  handleSelectCategory: (categoryId: string) => Promise<void>;
  handleSaveTable: (table: string) => void;
  resetTable: () => void;
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
          CategoriesService.getAll(),
          ProductsService.getAll(),
        ]);

        setcategories(categoriesResponse);
        setProducts(productsResponse);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleSelectCategory = useCallback(async (categoryId: string) => {
    try {
      setIsLoadingProducts(true);

      const productsPromise = !categoryId
        ? ProductsService.getAll()
        : ProductsService.getByCategoryId(categoryId);

      const data = await productsPromise;

      setProducts(data);
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  const handleSaveTable = (table: string) => {
    setSelectedTable(table);
  };

  const resetTable = () => {
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
        resetTable,
      }}
    >
      {children}
    </WaiterContext.Provider>
  );
};
