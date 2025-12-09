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

  const { control, register, setValue } = useForm()

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    rowId: number,
    field: string
  ) => {
    const value = e.target.value
    updateExpense(rowId, field, value)
    e.target.blur()
  }

  const handleDoubleClick = (rowId: number, field: string) => {
    setEditingCell({ rowId, field })
  }

  const handleBlur = () => {
    setEditingCell({ rowId: null, field: null })
  }

  const handleKeyInput = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowId: number,
    field: string,
    actualValue: string
  ) => {
    if (e.key === 'Enter') {
      const value =
        e.currentTarget.value === '0' || e.currentTarget.value === ''
          ? actualValue
          : e.currentTarget.value.trim()
      updateExpense(rowId, field, value)
      e.currentTarget.blur()
    }
  }

  // const handleKeyDown = (
  //   e: React.KeyboardEvent<HTMLInputElement>,
  //   rowId: number,
  //   field: string,
  //   actual: number | string
  // ) => {
  //   helpNumericKeyDown(e)
  //   if (e.key === 'Enter') {
  //     let value: number | string = e.currentTarget.value

  //     if (field === 'amount') {
  //       const cleanVal = e.currentTarget.value.replace(/[^0-9]/g, '')
  //       const cleanActual =
  //         typeof actual === 'string'
  //           ? Number(actual.replace(/[^0-9]/g, ''))
  //           : actual

  //       value =
  //         cleanVal === '' || (cleanVal.length > 1 && cleanVal.startsWith('0'))
  //           ? cleanActual
  //           : Number(cleanVal)
  //     }

  //     updateExpense(rowId, field, value)
  //     e.preventDefault()
  //     e.currentTarget.blur()
  //   }
  // }
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowId: number,
    field: string,
    actual: number
  ) => {
    helpNumericKeyDown(e)
    if (e.key === 'Enter') {
      const numbers = e.currentTarget.value.replace(/[^0-9]/g, '')
      const value =
        field === 'amount'
          ? e.currentTarget.value === '0' || e.currentTarget.value === ''
            ? actual
            : parseInt(numbers, 10) || 0
          : e.currentTarget.value
      updateExpense(rowId, field, value)
      e.preventDefault()
      e.currentTarget.blur()
    }
  }

  return {
    editingCell,
    control,
    register,
    setValue,
    handleChange,
    handleDoubleClick,
    handleBlur,
    handleKeyDown,
    handleKeyInput
  }
}
