import styles from './Balance.module.css'
import { BalanceLogo } from './icons/BalanceLogo'

export const Balance = () => {
  return (
    <section className={`sections ${styles.container}`}>
      <div className={styles.flexHC}>
        <BalanceLogo />
        <h2>Saldo Disponible</h2>
      </div>
      <div>Avilable Balance</div>
      <div>Income</div>
      <div>Expenses</div>
    </section>
  )
}
