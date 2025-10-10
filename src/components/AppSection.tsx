import styles from './AppSection.module.css'
import { ExpensesTable } from './ExpensesTable'

export const AppSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.left}>
        <ExpensesTable />
      </div>
      <div className={styles.right}></div>
    </section>
  )
}
