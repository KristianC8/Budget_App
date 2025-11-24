import styles from './AddExpenseForm.module.css'
import { AddIcon } from './icons/AddIcon'
import { memo } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { helpNumericKeyDown } from '../helpers/helpNumericKeyDown'
import { useExpensesDB } from '../hooks/useExpensesDB'
import { useCategoriesDB } from '../hooks/useCategoriesDB'
import { formatCurrencyParts } from '../utils/Formatter'
import { InputCurrency } from './InputCurrency'

export const AddExpenseForm = memo(() => {
  const { addExpense } = useExpensesDB()
  const { categories } = useCategoriesDB()

  interface IFormInput {
    amount: number
    category: string
    description: string
  }

  const { control, register, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: {
      amount: undefined,
      category: '',
      description: ''
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
          <span className={styles.sign}>{formatCurrencyParts(1).symbol}</span>
          <InputCurrency
            control={control}
            name='amount'
            autoFocus={false}
            onKeyDown={(e) => {
              helpNumericKeyDown(e)
            }}
            placeholder='0'
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
            Selecciona una
          </option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor='description'>
          Descripción
        </label>
        <input
          {...register('description', { required: true })}
          id='description'
          type='text'
          className={styles.input}
          placeholder='Breve descripción'
          autoComplete='off'
          maxLength={20}
        />
      </div>
      <button title='Agregar' className='buttons' type='submit'>
        Agregar <AddIcon />
      </button>
    </form>
  )
})
