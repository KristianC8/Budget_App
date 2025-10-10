import styles from './AddExpenseForm.module.css'
import { AddIcon } from './icons/AddIcon'
import { memo } from 'react'
import type { form, errorsForm } from '../types/addExpenseForm'
import { useForm } from '../hooks/useForm'

export const AddExpenseForm = memo(() => {
  const initialForm = {
    amount: '',
    category: ''
  }

  const validateForm = (form: form) => {
    const errors: errorsForm = {}

    if (!form.amount.trim()) {
      errors.amount = 'El monto es requerido'
    }

    return errors
  }

  const {
    formState,
    errors,
    onInputChange,
    onSelectChange,
    handleBlur,
    handleKeyUp,
    handleSubmit
  } = useForm(initialForm, validateForm)

  const { amount, category } = formState

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
            name='amount'
            id='amount'
            value={amount}
            onChange={onInputChange}
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
          />
          {errors && <span>{errors.amount}</span>}
        </div>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor='category'>
          Categoría
        </label>
        <select
          className={styles.select}
          name='category'
          id='category'
          value={category}
          onChange={onSelectChange}
        >
          <option className={styles.option} value='mercado'>
            Mercado
          </option>
          <option className={styles.option} value='transporte'>
            Transporte
          </option>
          <option className={styles.option} value='medicina'>
            Medicamentos
          </option>
          <option className={styles.option} value='otros'>
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
