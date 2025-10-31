import { useCategoriesDB } from './useCategoriesDB'
import { useState } from 'react'
import React from 'react'

interface idCategoryType {
  id: number | null
}

export const useEditCategoriesDB = () => {
  const { updateCategory } = useCategoriesDB()

  const [editingCategory, setEditingCategory] = useState<idCategoryType>({
    id: null
  })

  const handleDoubleClick = (id: number) => {
    setEditingCategory({ id })
  }

  const handleBlur = () => {
    setEditingCategory({ id: null })
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number,
    actual: string
  ) => {
    if (e.key === 'Enter') {
      const value =
        e.currentTarget.value.trim() === ''
          ? { name: actual }
          : { name: e.currentTarget.value.trim() }
      updateCategory(id, value)
      e.preventDefault()
      e.currentTarget.blur()
    }
  }

  return {
    editingCategory,
    handleDoubleClick,
    handleBlur,
    handleKeyDown
  }
}
