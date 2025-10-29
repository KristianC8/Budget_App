import { useCategoriesDB } from '../hooks/useCategoriesDB'
import styles from './CategoriesConfig.module.css'
import { CategoriesLogo } from './icons/CategoriesLogo'
import { DeleteIcon } from './icons/DeleteIcon'
import { useForm } from 'react-hook-form'
import { AddIcon } from './icons/AddIcon'
import type { SubmitHandler } from 'react-hook-form'

export const CategoriesConfig = () => {
  const { categories, addCategory, deleteCategory } = useCategoriesDB()

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
    <section className={styles.section}>
      <div className={styles.listContainer}>
        <div className={styles.flexHC}>
          <CategoriesLogo />
          <h2>Categorías</h2>
        </div>
        <ul className={styles.ul}>
          {categories &&
            categories.map((category) => (
              <li key={category.id} className={styles.flexHL}>
                {category.name}
                <button
                  className={styles.deleteButton}
                  onClick={() => {
                    deleteCategory(category.id)
                  }}
                >
                  <DeleteIcon />
                </button>
              </li>
            ))}
        </ul>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor='category'>
            Agregar categoría
          </label>
          <div className={styles['flex-h']}>
            <input
              type='text'
              inputMode='text'
              {...register('name', {
                required: true
              })}
              id='category'
              autoComplete='off'
              maxLength={20}
            />
          </div>
        </div>

        <button title='Agregar' className={styles.button} type='submit'>
          <AddIcon />
        </button>
      </form>
    </section>
  )
}
