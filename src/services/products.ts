import { IProduct } from '../types';
import { api } from './api';

class Products {
  async getAll() {
    try {
      const { data } = await api.get<IProduct[]>('/products');
      return data;
    } catch {
      throw new Error('Unable to load products!');
    }
  }

  async getByCategoryId(categoryId: string) {
    try {
      const { data } = await api.get<IProduct[]>(
        `/categories/${categoryId}/products`,
      );
      return data;
    } catch {
      throw new Error(
        `Unable to load products of this category id: ${categoryId}`,
      );
    }
  }
}

const ProductsService = new Products();
export default ProductsService;
