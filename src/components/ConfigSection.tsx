import { CategoriesConfig } from './CategoriesConfig'
// import { CategoriesTest } from './CategoriesTest'
import styles from './ConfigSection.module.css'

export const ConfigSection = () => {
  return (
    <section className={styles.section}>
      <section></section>
      <CategoriesConfig />
      {/* <CategoriesTest /> */}
    </section>
  )
}
