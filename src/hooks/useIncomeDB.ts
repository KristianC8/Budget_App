import { useContext } from 'react'
import { IncomeContext } from '../context/IncomeContext'

export const useIncomeDB = () => {
  const context = useContext(IncomeContext)
  if (!context) {
    throw new Error('useIncomeDB debe usarse dentro de un IncomeProvider')
  }
  return context
}
