import { createContext } from 'react'
import type { Income, Errors } from '../types/dataBase'

export interface IncomeContextType {
  income: Income[]
  loading: boolean
  error: Errors
  addIncome: (income: Omit<Income, 'id'>) => Promise<number | undefined>
}

export const IncomeContext = createContext<IncomeContextType | null>(null)
