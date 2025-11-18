import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode
} from 'react'
import type { IncomeContextType } from './IncomeContext'
import type { Income, Errors } from '../types/dataBase'
import { IncomeContext } from './IncomeContext'
import { incomeRepository } from '../repositories/income.repository'

export const IncomeProvider = ({ children }: { children: ReactNode }) => {
  const [income, setIncome] = useState<Income[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Errors>({
    add: null,
    delete: null,
    update: null,
    read: null
  })

  const loadInitialData = async () => {
    try {
      setLoading(true)
      const data = await incomeRepository.getAll()
      setIncome(data)
      setError((prev) => ({ ...prev, read: null }))
    } catch (error) {
      setError((prev) => ({
        ...prev,
        read: `Error loading income:${error}`
      }))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInitialData()
  }, [])

  // Agregar ///////////////////////////////////////////////////////////////////////////////////
  const addIncome = useCallback(async (income: Omit<Income, 'id'>) => {
    // ID temporal para UI inmediata
    const tempId = Date.now()
    const optimisticIncome: Income = {
      ...income,
      id: tempId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // 1. Actualizar UI INMEDIATAMENTE
    setIncome((prev) => [...prev, optimisticIncome])

    try {
      // 2. Guardar en DB en background
      const realId = await incomeRepository.add(income)

      // 3. Reemplazar ID temporal con ID real
      setIncome((prev) =>
        prev.map((inc) => (inc.id === tempId ? { ...inc, id: realId } : inc))
      )
      setError((prev) => ({ ...prev, add: null }))

      return realId
    } catch (error) {
      // 4. ROLLBACK si falla
      setIncome((prev) => prev.filter((inc) => inc.id !== tempId))
      setError((prev) => ({ ...prev, add: `Error adding income: ${error}` }))
    }
  }, [])

  const deleteIncome = useCallback(
    async (id: number) => {
      // Guardar tarea eliminada para rollback
      const deletedIncome = income.find((inc) => inc.id === id)

      // 1. Actualizar UI INMEDIATAMENTE
      setIncome((prev) => prev.filter((inc) => inc.id !== id))

      try {
        // 2. Eliminar de DB en background
        await incomeRepository.deleteIncome(id)
        setError((prev) => ({ ...prev, delete: null }))
      } catch (error) {
        // 3. ROLLBACK si falla
        if (deletedIncome) {
          setIncome((prev) => [...prev, deletedIncome])
        }
        setError((prev) => ({
          ...prev,
          delete: `Error deleting Income: ${error}`
        }))
      }
    },
    [income]
  )

  // Actualizar ///////////////////////////////////////////////////////////////////////////////////
  const updateIncome = useCallback(
    async (id: number, update: Partial<Omit<Income, 'id'>>) => {
      // Guardar estado anterior para rollback
      const previousIncome = income

      // 1. Actualizar UI INMEDIATAMENTE
      setIncome((prev) =>
        prev.map((incomeItem) =>
          incomeItem.id === id
            ? {
                ...incomeItem,
                ...update,
                updatedAt: new Date().toISOString()
              }
            : incomeItem
        )
      )

      try {
        // 2. Sincronizar con DB en background
        await incomeRepository.updateIncome(id, update)
        setError((prev) => ({ ...prev, update: null }))
      } catch (error) {
        // 3. ROLLBACK si falla
        setIncome(previousIncome)
        setError((prev) => ({
          ...prev,
          update: `Error updating income: ${error}`
        }))
      }
    },
    [income]
  )

  // Total Ingresos //////////////////////////////////////////////////////////////////////////
  const netIncome = useMemo(() => {
    return income.reduce((total, incomeItem) => {
      const discountsTotal = incomeItem.discounts.reduce(
        (sum, discount) => sum + discount.amount,
        0
      )
      return total + incomeItem.amount - discountsTotal
    }, 0)
  }, [income])

  const value: IncomeContextType = {
    income,
    loading,
    error,
    netIncome,
    addIncome,
    updateIncome,
    deleteIncome
  }

  return (
    <IncomeContext.Provider value={value}>{children}</IncomeContext.Provider>
  )
}
