import type { ReactNode } from 'react'
import type { expenseType } from '../types/expense'
import { useState } from 'react'
import { ExpenseContext } from './ExpenseContext'

interface ExpenseProviderProps {
  children: ReactNode
}

const initialState = [
  {
    id: 1,
    amount: 115000,
    category: 'mercado'
  },
  {
    id: 2,
    amount: 150,
    category: 'transporte'
  },
  {
    id: 3,
    amount: 280,
    category: 'servicios'
  }
]

export const ExpenseProvider = ({ children }: ExpenseProviderProps) => {
  const [expenses, setExpenses] = useState<expenseType[]>(initialState)

  const addExpense = (newExpense: expenseType) => {
    if (expenses.find((expense) => expense.id === newExpense.id)) return
    setExpenses((prevState) => [...prevState, newExpense])
  }

  const removeExpense = (id: number) => {
    setExpenses((prevState) => prevState.filter((expense) => expense.id !== id))
  }
  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        removeExpense
      }}
    >
      {children}
    </ExpenseContext.Provider>
  )
}
