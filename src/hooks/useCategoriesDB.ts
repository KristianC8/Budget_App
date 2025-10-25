import { useContext } from 'react'
import { CategoriesContext } from '../context/CategoriesContext'

export const useCategoriesDB = () => {
  const context = useContext(CategoriesContext)
  if (!context) {
    throw new Error(
      'useCategoriesDB debe usarse dentro de un CategoriesProvider'
    )
  }
  return context
}
