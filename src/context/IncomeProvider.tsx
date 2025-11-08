import { useEffect, useState, type ReactNode } from 'react'
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

  const value: IncomeContextType = {
    income,
    loading,
    error
  }

  return (
    <IncomeContext.Provider value={value}>{children}</IncomeContext.Provider>
  )
}
