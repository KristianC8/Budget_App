import { useContext } from 'react'
import { DBContext } from '../context/dbContext'

export const useDB = () => {
  const context = useContext(DBContext)
  if (!context) {
    throw new Error('useDB debe usarse dentro de DBProvider')
  }
  return context
}
