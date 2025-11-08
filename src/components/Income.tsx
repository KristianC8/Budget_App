import { useIncomeDB } from '../hooks/useIncomeDB'
import { AddIcon } from './icons/AddIcon'
import { IncomeLogo } from './icons/IncomeLogo'
import styles from './Income.module.css'

export const Income = () => {
  const { income, loading } = useIncomeDB()
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
      {loading && <div>Cargando ingresos...</div>}
      {income.length === 0 && <div>Ingresa aquí tus fuentes de ingreso</div>}
      <button>
        Agregar Ingreso <AddIcon />
      </button>
      <button onClick={resetDB}>Eliminar DB</button>
    </section>
  )
}
