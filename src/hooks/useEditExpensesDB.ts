import { useExpensesDB } from './useExpensesDB'
import { useState } from 'react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { helpNumericKeyDown } from '../helpers/helpNumericKeyDown'

export const useEditExpenseDB = () => {
  const { updateExpense } = useExpensesDB()

  interface cellType {
    rowId: number | null
    field: string | null
  }

  const [editingCell, setEditingCell] = useState<cellType>({
    rowId: null,
    field: null
  })

  const { register, setValue } = useForm()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    rowId: number,
    field: string
  ) => {
    const value = field === 'amount' ? Number(e.target.value) : e.target.value
    updateExpense(rowId, field, value)
    e.target.blur()
  }

  const handleDoubleClick = (rowId: number, field: string) => {
    setEditingCell({ rowId, field })
  }

  const handleBlur = () => {
    setEditingCell({ rowId: null, field: null })
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowId: number,
    field: string,
    actual: number
  ) => {
    helpNumericKeyDown(e)
    if (e.key === 'Enter') {
      const value =
        field === 'amount'
          ? e.currentTarget.value[0] === '0' || e.currentTarget.value === ''
            ? actual
            : Number(e.currentTarget.value)
          : e.currentTarget.value
      updateExpense(rowId, field, value)
      e.preventDefault()
      e.currentTarget.blur()
    }
  }

  return {
    editingCell,
    register,
    setValue,
    handleChange,
    handleDoubleClick,
    handleBlur,
    handleKeyDown
  }
}
