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

export const CategoriesService = new Categories();
