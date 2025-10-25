import { dbService } from '../services/indexedDB.service'
import type { Category } from '../types/dataBase'

export class CategoriesRepository {
  private readonly storeName = 'categories'

  async getAll(): Promise<Category[]> {
    return dbService.getAll<Category>(this.storeName)
  }

  async add(category: Omit<Category, 'id'>): Promise<number> {
    return dbService.add<Category>(this.storeName, category)
  }

  async delete(id: number): Promise<void> {
    return dbService.delete(this.storeName, id)
  }

  async update(
    id: number,
    update: Partial<Omit<Category, 'id'>>
  ): Promise<number> {
    return dbService.update(this.storeName, id, undefined, update)
  }
}

export const categoriesRepository = new CategoriesRepository()
