import { useCategoriesDB } from '../hooks/useCategoriesDB'
import styles from './CategoriesConfig.module.css'
import { CategoriesLogo } from './icons/CategoriesLogo'
import { DeleteIcon } from './icons/DeleteIcon'
import { useEditCategoriesDB } from '../hooks/useEditCategoriesDB'
import { AddCategoryForm } from './AddCategoryForm'
import { useForm } from 'react-hook-form'
import { useRef } from 'react'
import { useScrollBottom } from '../hooks/useScrollBottom'

export const CategoriesConfig = () => {
  const listRef = useRef<HTMLDivElement | null>(null)
  const { categories, deleteCategory } = useCategoriesDB()
  const { editingCategory, handleDoubleClick, handleBlur, handleKeyDown } =
    useEditCategoriesDB()

  interface inputType {
    name: string
  }

  const { register, setValue } = useForm<inputType>()

  useScrollBottom(listRef, categories)

  return (
    <section className={styles.section}>
      <div className={styles.listContainer} ref={listRef}>
        <div className={styles.flexHC}>
          <CategoriesLogo />
          <h2>Categorías</h2>
        </div>
        <ul className={styles.ul}>
          {categories &&
            categories.map((category) => (
              <li
                key={category.id}
                className={styles.flexHL}
                onDoubleClick={() => {
                  handleDoubleClick(category.id)
                  setValue('name', category.name)
                }}
                onBlur={handleBlur}
              >
                {editingCategory.id === category.id ? (
                  <div data-deepl-do-not-translate='true'>
                    <input
                      type='text'
                      inputMode='text'
                      {...register('name', {
                        required: true
                      })}
                      onKeyDown={(e) => {
                        handleKeyDown(e, category.id, category.name)
                      }}
                      autoFocus
                      spellCheck={false}
                      autoCorrect='off'
                      autoComplete='off'
                      data-deepl-do-not-translate='true'
                      maxLength={20}
                    />
                  </div>
                ) : (
                  <>{category.name}</>
                )}
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
      <AddCategoryForm />
    </section>
  )
}
