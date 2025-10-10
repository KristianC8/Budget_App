import React from 'react'
import { useState } from 'react'
import type { form, errorsForm } from '../types/addExpenseForm'
import { useExpenses } from './useExpenses'

export const useForm = (
  intialForm: form,
  validateForm: (form: form) => errorsForm
) => {
  const { addExpense } = useExpenses()

  const [formState, setFormState] = useState<form>(intialForm)
  const [errors, setErrors] = useState<errorsForm>({})
  const [hasValidated, setHasValidated] = useState(false)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleBlur = () => {
    setErrors(validateForm(formState))
    setHasValidated(true)
  }

  const handleKeyUp = () => {
    setErrors(validateForm(formState))
    setHasValidated(true)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState(intialForm)
    const newExpense = {
      // id: crypto.randomUUID(),
      id: Math.random(),
      ...formState
    }

    addExpense(newExpense)
  }

  return {
    formState,
    errors,
    hasValidated,
    onInputChange,
    onSelectChange,
    handleBlur,
    handleKeyUp,
    handleSubmit
  }
}
