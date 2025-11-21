import { createContext } from 'react'
import type { Expense, Errors } from '../types/dataBase'

export interface ExpensesContextType {
  expenses: Expense[]
  loading: boolean
  error: Errors
  totalExpenses: number
  addExpense: (expense: Omit<Expense, 'id'>) => Promise<number | undefined>
  updateExpense: (
    id: number,
    field: string,
    update: number | string
  ) => Promise<void>
  deleteExpense: (id: number) => Promise<void>
}

export const ExpensesContext = createContext<ExpensesContextType | null>(null)
