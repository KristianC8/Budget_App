import { createContext } from 'react'
import type { expenseType } from '../types/expense'
import type { Dispatch, SetStateAction } from 'react'

interface ExpenseContextTypes {
  expenses: expenseType[]
  setExpenses: Dispatch<SetStateAction<expenseType[]>>
  addExpense: (newExpense: expenseType) => void
  removeExpense: (id: string) => void
}

export const ExpenseContext = createContext<ExpenseContextTypes | undefined>(
  undefined
)
