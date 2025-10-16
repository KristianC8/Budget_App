import { createContext } from 'react'
import type { expenseType } from '../types/expense'

interface ExpenseContextTypes {
  expenses: expenseType[]
  updateExpenses: (rowId: string, field: string, value: number | string) => void
  addExpense: (newExpense: expenseType) => void
  removeExpense: (id: string) => void
}

export const ExpenseContext = createContext<ExpenseContextTypes | undefined>(
  undefined
)
