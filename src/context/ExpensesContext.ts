import { createContext } from 'react'
import type { Expense, Errors } from '../types/dataBase'
import type { FormatExpense } from '../types/formatedValues'

export interface ExpensesContextType {
  expenses: Expense[]
  loading: boolean
  error: Errors
  formatExpenses: FormatExpense[]
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
