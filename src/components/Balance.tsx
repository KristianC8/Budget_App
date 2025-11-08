import { useExpensesDB } from '../hooks/useExpensesDB'
import styles from './Balance.module.css'
import { BalanceLogo } from './icons/BalanceLogo'

export const Balance = () => {
  const { expenses } = useExpensesDB()
  const totalExpenses = expenses.reduce((total, currentValue) => {
    return total + currentValue.amount
  }, 0)
  return (
    <section className={`sections ${styles.container}`}>
      <div className={styles.flexHC}>
        <BalanceLogo />
        <h2>Saldo Disponible</h2>
      </div>
      <div>Avilable Balance</div>
      <div>Income</div>
      <div>
        <span>Expenses:</span>
        {totalExpenses}
      </div>
    </section>
  )
}
