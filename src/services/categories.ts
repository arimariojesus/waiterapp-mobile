import { ICategory } from '../types';
import { api } from './api';

class Categories {
  async getAll() {
    try {
      const { data } = await api.get<ICategory[]>('/categories');
      return data;
    } catch {
      throw new Error('Unable to load categories!');
    }
  }
}

const CategoriesService = new Categories();
export default CategoriesService;
