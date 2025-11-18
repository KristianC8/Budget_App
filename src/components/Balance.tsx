import { useExpensesDB } from '../hooks/useExpensesDB'
import { useIncomeDB } from '../hooks/useIncomeDB'
import styles from './Balance.module.css'
import { BalanceLogo } from './icons/BalanceLogo'
import { formatCurrencyParts } from '../utils/Formatter'

export const Balance = () => {
  const { totalExpenses } = useExpensesDB()
  const { netIncome } = useIncomeDB()

  const availableBalance = netIncome - totalExpenses

  const balance = formatCurrencyParts(availableBalance)
  const income = formatCurrencyParts(netIncome)
  const expenses = formatCurrencyParts(totalExpenses)

  return (
    <section className={`sections ${styles.container}`}>
      <div className={styles.flexHC}>
        <BalanceLogo />
        <h2>Saldo Disponible</h2>
      </div>
      <div className={styles.balanceSection}>
        <span className={styles.sign}>{balance.symbol}</span>
        <span
          className={`${availableBalance > netIncome * 0.5 ? styles.high : availableBalance < netIncome * 0.2 ? styles.low : styles.medium}`}
        >
          {balance.value}
        </span>
      </div>
      <div className={styles.IncExp}>
        <div className={styles.incomeSection}>
          <div className={styles.labels}>Ingresos:</div>
          <span className={styles.sign}>{income.symbol}</span>
          <span>{income.value}</span>
        </div>
        <div className={styles.expensesSection}>
          <div className={styles.labels}>Gastos:</div>
          <span className={styles.sign}>{expenses.symbol}</span>
          <span>{expenses.value}</span>
        </div>
      </div>
    </section>
  )
}
