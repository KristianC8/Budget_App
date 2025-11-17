import { dbService } from '../services/indexedDB.service'
import type { Income } from '../types/dataBase'

export class IncomeRepository {
  private readonly storeName = 'income'

  async getAll(): Promise<Income[]> {
    return dbService.getAll<Income>(this.storeName)
  }

  async getById(id: number): Promise<Income | undefined> {
    return dbService.getById<Income>(this.storeName, id)
  }

  async add(income: Omit<Income, 'id'>): Promise<number> {
    return dbService.add<Income>(this.storeName, income)
  }

  async updateIncome(
    id: number,
    update: Partial<Omit<Income, 'id'>>
  ): Promise<number> {
    return dbService.update(this.storeName, id, undefined, update)
  }

  async updateDiscount(
    id: number,
    field: string,
    update: number | string
  ): Promise<number> {
    return dbService.update(this.storeName, id, field, update)
  }

  async deleteIncome(id: number): Promise<void> {
    return dbService.delete(this.storeName, id)
  }

  async deleteDiscount(id: number): Promise<void> {
    return dbService.delete(this.storeName, id)
  }

  async count(): Promise<number> {
    return dbService.count(this.storeName)
  }
}

export const incomeRepository = new IncomeRepository()
