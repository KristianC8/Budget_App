import { useEffect, useState, useCallback, type ReactNode } from 'react'
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

  const value: IncomeContextType = {
    income,
    loading,
    error,
    addIncome
  }

  return (
    <IncomeContext.Provider value={value}>{children}</IncomeContext.Provider>
  )
}
