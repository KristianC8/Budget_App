import { dbService } from '../services/indexedDB.service'
import type { Expense } from '../types/dataBase'

export class ExpensesRepository {
  private readonly storeName = 'expenses'

  async getAll(): Promise<Expense[]> {
    return dbService.getAll<Expense>(this.storeName)
  }

  async getById(id: number): Promise<Expense | undefined> {
    return dbService.getById<Expense>(this.storeName, id)
  }

  async add(expense: Omit<Expense, 'id'>): Promise<number> {
    return dbService.add<Expense>(this.storeName, expense)
  }

  async update(
    id: number,
    field: string,
    update: number | string
  ): Promise<number> {
    return dbService.update(this.storeName, id, field, update)
  }

  async delete(id: number): Promise<void> {
    return dbService.delete(this.storeName, id)
  }

  async count(): Promise<number> {
    return dbService.count(this.storeName)
  }
}

export const expensesRepository = new ExpensesRepository()
