import styles from './AppSection.module.css'
import { Dashboard } from './Dashboard'
import { ExpensesTable } from './ExpensesTable'

export const AppSection = () => {
  return (
    <section className={styles.section}>
      <Dashboard />
      <ExpensesTable />
    </section>
  )
}
