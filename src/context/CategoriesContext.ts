import { createContext } from 'react'
import type { Category, Errors } from '../types/dataBase'

export interface CategoriesContextType {
  categories: Category[]
  loading: boolean
  error: Errors
  addCategory: (category: Omit<Category, 'id'>) => Promise<number | undefined>
  updateCategory: (
    id: number,
    update: Partial<Omit<Category, 'id'>>
  ) => Promise<void>
  deleteCategory: (id: number) => Promise<void>
}

export const CategoriesContext = createContext<CategoriesContextType | null>(
  null
)
