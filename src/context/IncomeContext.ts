import { createContext } from 'react'
import type { Income, Errors } from '../types/dataBase'

export interface IncomeContextType {
  income: Income[]
  loading: boolean
  error: Errors
  netIncome: number
  addIncome: (income: Omit<Income, 'id'>) => Promise<number | undefined>
  updateIncome: (
    id: number,
    update: Partial<Omit<Income, 'id'>>
  ) => Promise<void>
  deleteIncome: (id: number) => Promise<void>
}

export const IncomeContext = createContext<IncomeContextType | null>(null)
