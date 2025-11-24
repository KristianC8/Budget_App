import { useCategoriesDB } from '../hooks/useCategoriesDB'
import { AddIcon } from './icons/AddIcon'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import styles from './AddCategoryForm.module.css'

export const AddCategoryForm = () => {
  const { addCategory } = useCategoriesDB()

  interface IFormInput {
    name: string
  }

  const { register, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: {
      name: undefined
    }
  })

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    addCategory(data)
    reset()
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor='category'>
          Agregar categoría
        </label>
        <input
          type='text'
          inputMode='text'
          {...register('name', {
            required: true,
            setValueAs: (value) => value.trim()
          })}
          id='category'
          autoComplete='off'
          maxLength={20}
          placeholder='Nombre de la categoría'
        />
      </div>

      <button title='Agregar' className='buttons' type='submit'>
        Agregar <AddIcon />
      </button>
    </form>
  )
}
