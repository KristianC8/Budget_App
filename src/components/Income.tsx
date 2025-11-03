import { IncomeLogo } from './icons/IncomeLogo'
import styles from './Income.module.css'

export const Income = () => {
  function resetDB() {
    indexedDB.deleteDatabase('BudgetAppDB')
    alert('Base de datos eliminada')
  }
  return (
    <section className={`sections ${styles.container}`}>
      <div className={styles.flexHC}>
        <IncomeLogo />
        <h2>Ingresos</h2>
      </div>
      <button onClick={resetDB}>Eliminar DB</button>
    </section>
  )
}
