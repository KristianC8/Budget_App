import type { ReactNode } from 'react'
import type { expenseType } from '../types/expense'
import { useState } from 'react'
import { ExpenseContext } from './ExpenseContext'

interface ExpenseProviderProps {
  children: ReactNode
}

const initialState = [
  {
    id: '1',
    amount: 115000,
    category: 'Otros'
  },
  {
    id: '2',
    amount: 150,
    category: 'Transporte'
  },
  {
    id: '3',
    amount: 280,
    category: 'Medicamentos'
  },
  {
    id: '4',
    amount: 100280,
    category: 'Mercado'
  }
]

export const ExpenseProvider = ({ children }: ExpenseProviderProps) => {
  const [expenses, setExpenses] = useState<expenseType[]>(initialState)

  const addExpense = (newExpense: expenseType) => {
    if (expenses.find((expense) => expense.id === newExpense.id)) return
    setExpenses((prevState) => [...prevState, newExpense])
  }

  const removeExpense = (id: string) => {
    setExpenses((prevState) => prevState.filter((expense) => expense.id !== id))
  }

  const updateExpenses = (
    rowId: string,
    field: string,
    value: number | string
  ) => {
    setExpenses((prevState) =>
      prevState.map((expense) =>
        expense.id === rowId ? { ...expense, [field]: value } : expense
      )
    )
  }

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        updateExpenses,
        addExpense,
        removeExpense
      }}
    >
      {children}
    </ExpenseContext.Provider>
  )
}
