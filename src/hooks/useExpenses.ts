import { useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'

export const useExpenses = () => {
  const contextExpenses = useContext(ExpenseContext)

  if (contextExpenses === undefined) {
    throw new Error('useExpense need a provider')
  }

  return contextExpenses
}
