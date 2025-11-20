import { useEffect, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { Expense, Errors } from '../types/dataBase'
import type { ExpensesContextType } from './ExpensesContext'
import { expensesRepository } from '../repositories/expenses.repository'
import { ExpensesContext } from './ExpensesContext'
import { useMemo } from 'react'
import { formatCurrencyParts } from '../utils/Formatter'

export const ExpensesProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([])
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
        const data = await expensesRepository.getAll()
        setExpenses(data)
        setError((prev) => ({ ...prev, read: null }))
      } catch (error) {
        setError((prev) => ({
          ...prev,
          read: `Error loading Expenses:${error}`
        }))
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  // Agregar ///////////////////////////////////////////////////////////////////////////////////
  const addExpense = useCallback(async (expense: Omit<Expense, 'id'>) => {
    // ID temporal para UI inmediata
    const tempId = Date.now()
    const optimisticExpense: Expense = {
      ...expense,
      id: tempId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // 1. Actualizar UI INMEDIATAMENTE
    setExpenses((prev) => [...prev, optimisticExpense])

    try {
      // 2. Guardar en DB en background
      const realId = await expensesRepository.add(expense)

      // 3. Reemplazar ID temporal con ID real
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === tempId ? { ...exp, id: realId } : exp))
      )
      setError((prev) => ({ ...prev, add: null }))

      return realId
    } catch (error) {
      // 4. ROLLBACK si falla
      setExpenses((prev) => prev.filter((exp) => exp.id !== tempId))
      setError((prev) => ({ ...prev, add: `Error adding expense: ${error}` }))
    }
  }, [])

  // Eliminar ///////////////////////////////////////////////////////////////////////////////////
  const deleteExpense = useCallback(
    async (id: number) => {
      // Guardar tarea eliminada para rollback
      const deletedExpense = expenses.find((exp) => exp.id === id)

      // 1. Actualizar UI INMEDIATAMENTE
      setExpenses((prev) => prev.filter((exp) => exp.id !== id))

      try {
        // 2. Eliminar de DB en background
        await expensesRepository.delete(id)
        setError((prev) => ({ ...prev, delete: null }))
      } catch (error) {
        // 3. ROLLBACK si falla
        if (deletedExpense) {
          setExpenses((prev) => [...prev, deletedExpense])
        }
        setError((prev) => ({
          ...prev,
          delete: `Error deleting Expense: ${error}`
        }))
      }
    },
    [expenses]
  )

  // Actualizar ///////////////////////////////////////////////////////////////////////////////////
  const updateExpense = useCallback(
    async (id: number, field: string, update: number | string) => {
      // Guardar estado anterior para rollback
      const previousExpenses = expenses

      // 1. Actualizar UI INMEDIATAMENTE
      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === id
            ? {
                ...expense,
                [field]: update,
                updatedAt: new Date().toISOString()
              }
            : expense
        )
      )

      try {
        // 2. Sincronizar con DB en background
        await expensesRepository.update(id, field, update)
        setError((prev) => ({ ...prev, update: null }))
      } catch (error) {
        // 3. ROLLBACK si falla
        setExpenses(previousExpenses)
        setError((prev) => ({
          ...prev,
          update: `Error updating expense: ${error}`
        }))
      }
    },
    [expenses]
  )

  // Total Gastos ///////////////////////////////////////////////////////////////////
  const totalExpenses = useMemo(
    () => expenses.reduce((total, expense) => total + expense.amount, 0),
    [expenses]
  )

  //Formatear Gastos ///////////////////////////////////////////////////////////////////
  const formatExpenses = useMemo(() => {
    return expenses.map((expense) => {
      return {
        ...expense,
        amount: formatCurrencyParts(expense.amount)
      }
    })
  }, [expenses])

  const value: ExpensesContextType = {
    expenses,
    loading,
    error,
    totalExpenses,
    formatExpenses,
    addExpense,
    deleteExpense,
    updateExpense
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}
