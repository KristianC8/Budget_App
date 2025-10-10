import { useState } from 'react'
import type { expenseType } from '../types/expense'

export const useTestState = () => {
  const [expenses, setExpenses] = useState<expenseType[]>([])

  const addExpense = (newExpense: expenseType) => {
    if (expenses.find((expense) => expense.id === newExpense.id)) return
    setExpenses((prevState) => [...prevState, newExpense])
  }

  const removeExpense = (id: number) => {
    setExpenses((prevState) => prevState.filter((expense) => expense.id !== id))
  }

  return {
    expenses,
    addExpense,
    removeExpense
  }
}
