import styles from './AddExpenseForm.module.css'
import { AddIcon } from './icons/AddIcon'
import { memo } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { helpNumericKeyDown } from '../helpers/helpNumericKeyDown'
import { useExpensesDB } from '../hooks/useExpensesDB'
import { useCategoriesDB } from '../hooks/useCategoriesDB'

export const AddExpenseForm = memo(() => {
  const { addExpense } = useExpensesDB()
  const { categories } = useCategoriesDB()

  // const CATEGORIES = {
  //   mercado: 'Mercado',
  //   transporte: 'Transporte',
  //   medicamentos: 'Medicamentos',
  //   otros: 'Otros'
  // } as const

  // // Tipo derivado automáticamente
  // type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES]

  interface IFormInput {
    amount: number
    category: string
  }

  const { register, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: {
      amount: undefined,
      category: ''
    }
  })

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    addExpense(data)
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
            type='text'
            inputMode='numeric'
            {...register('amount', {
              required: 'El monto es requerido',
              min: 1,
              max: 999999999999,
              valueAsNumber: true
            })}
            onKeyDown={(e) => {
              helpNumericKeyDown(e)
            }}
            id='amount'
            autoComplete='off'
            maxLength={12}
          />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor='category'>
          Categoría
        </label>
        <select
          {...register('category', { required: true })}
          id='category'
          disabled={categories.length === 0}
          className={styles.select}
          defaultValue=''
        >
          {categories.length === 0 && (
            <option value=''>Crea una categoría</option>
          )}
          <option value='' hidden>
            Selecciona uno
          </option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <button title='Agregar' className={styles.button} type='submit'>
        <AddIcon />
      </button>
    </form>
  )
})
