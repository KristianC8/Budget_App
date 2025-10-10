import { createContext } from 'react'
import type { expenseType } from '../types/expense'

interface ExpenseContextTypes {
  expenses: expenseType[]
  addExpense: (newExpense: expenseType) => void
  removeExpense: (id: number) => void
}

export const ExpenseContext = createContext<ExpenseContextTypes | undefined>(
  undefined
)
