import { useContext } from 'react'
import { ExpensesContext } from '../context/ExpensesContext'

export const useExpensesDB = () => {
  const context = useContext(ExpensesContext)
  if (!context) {
    throw new Error('useExpensesDB debe usarse dentro de un ExpensesProvider')
  }
  return context
}
