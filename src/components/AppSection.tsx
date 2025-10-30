import styles from './AppSection.module.css'
import { ExpensesList } from './ExpensesList'
import { ExpensesTable } from './ExpensesTable'

export const AppSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.left}>
        <ExpensesList />
      </div>

      <ExpensesTable />
    </section>
  )
}
