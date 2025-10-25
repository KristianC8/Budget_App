import { useEffect, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { Category, Errors } from '../types/dataBase'
import type { CategoriesContextType } from './CategoriesContext'
import { categoriesRepository } from '../repositories/categories.repository'
import { CategoriesContext } from './CategoriesContext'

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Errors>({
    add: null,
    delete: null,
    update: null,
    read: null
  })

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true)
        const data = await categoriesRepository.getAll()
        setCategories(data)
        setError((prev) => ({ ...prev, read: null }))
      } catch (error) {
        setError((prev) => ({
          ...prev,
          read: `Error loading categories:${error}`
        }))
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  // Agregar ///////////////////////////////////////////////////////////////////////////////////
  const addCategory = useCallback(async (expense: Omit<Category, 'id'>) => {
    // ID temporal para UI inmediata
    const tempId = Date.now()
    const optimisticExpense: Category = {
      ...expense,
      id: tempId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // 1. Actualizar UI INMEDIATAMENTE
    setCategories((prev) => [...prev, optimisticExpense])

    try {
      // 2. Guardar en DB en background
      const realId = await categoriesRepository.add(expense)

      // 3. Reemplazar ID temporal con ID real
      setCategories((prev) =>
        prev.map((exp) => (exp.id === tempId ? { ...exp, id: realId } : exp))
      )
      setError((prev) => ({ ...prev, add: null }))

      return realId
    } catch (error) {
      // 4. ROLLBACK si falla
      setCategories((prev) => prev.filter((exp) => exp.id !== tempId))
      setError((prev) => ({ ...prev, add: `Error adding category: ${error}` }))
    }
  }, [])

  // Eliminar ///////////////////////////////////////////////////////////////////////////////////
  const deleteCategory = useCallback(
    async (id: number) => {
      // Guardar tarea eliminada para rollback
      const deletedExpense = categories.find((exp) => exp.id === id)

      // 1. Actualizar UI INMEDIATAMENTE
      setCategories((prev) => prev.filter((exp) => exp.id !== id))

      try {
        // 2. Eliminar de DB en background
        await categoriesRepository.delete(id)
        setError((prev) => ({ ...prev, delete: null }))
      } catch (error) {
        // 3. ROLLBACK si falla
        if (deletedExpense) {
          setCategories((prev) => [...prev, deletedExpense])
        }
        setError((prev) => ({
          ...prev,
          delete: `Error deleting category: ${error}`
        }))
      }
    },
    [categories]
  )

  // Actualizar ///////////////////////////////////////////////////////////////////////////////////
  const updateCategory = useCallback(
    async (id: number, update: Partial<Omit<Category, 'id'>>) => {
      // Guardar estado anterior para rollback
      const previousExpenses = categories

      // 1. Actualizar UI INMEDIATAMENTE
      setCategories((prev) =>
        prev.map((category) =>
          category.id === id
            ? {
                ...category,
                ...update,
                updatedAt: new Date().toISOString()
              }
            : category
        )
      )

      try {
        // 2. Sincronizar con DB en background
        await categoriesRepository.update(id, update)
        setError((prev) => ({ ...prev, update: null }))
      } catch (error) {
        // 3. ROLLBACK si falla
        setCategories(previousExpenses)
        setError((prev) => ({
          ...prev,
          update: `Error updating category: ${error}`
        }))
      }
    },
    [categories]
  )

  const value: CategoriesContextType = {
    categories,
    loading,
    error,
    addCategory,
    deleteCategory,
    updateCategory
  }

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}
