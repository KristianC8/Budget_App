import styles from './AddExpenseForm.module.css'
import { AddIcon } from './icons/AddIcon'
import { memo } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { useExpenses } from '../hooks/useExpenses'
import { v4 as uuidv4 } from 'uuid'

export const AddExpenseForm = memo(() => {
  const { addExpense } = useExpenses()

  const CATEGORIES = {
    mercado: 'Mercado',
    transporte: 'Transporte',
    medicamentos: 'Medicamentos',
    otros: 'Otros'
  } as const

  // Tipo derivado automáticamente
  type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES]

  interface IFormInput {
    amount: number
    category: Category
  }

  const { register, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: {
      amount: undefined,
      category: CATEGORIES.mercado
    }
  })
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const newExpense = {
      // id: crypto.randomUUID(),
      id: uuidv4(),
      ...data
    }
    addExpense(newExpense)
    reset()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor='amount'>
          Monto
        </label>
        <div className={styles['flex-h']}>
          <span className={styles.sign}>$</span>
          <input
            type='number'
            inputMode='numeric'
            className={styles.inputNumber}
            {...register('amount', { required: 'El monto es requerido' })}
            id='amount'
          />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor='category'>
          Categoría
        </label>
        <select
          className={styles.select}
          {...register('category')}
          id='category'
        >
          <option className={styles.option} value='Mercado'>
            Mercado
          </option>
          <option className={styles.option} value='Transporte'>
            Transporte
          </option>
          <option className={styles.option} value='Medicamentos'>
            Medicamentos
          </option>
          <option className={styles.option} value='Otros'>
            Otros
          </option>
        </select>
      </div>
      <button title='Agregar' className={styles.button} type='submit'>
        <AddIcon />
      </button>
    </form>
  )
})
