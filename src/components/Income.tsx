import { useIncomeDB } from '../hooks/useIncomeDB'
import { AddIcon } from './icons/AddIcon'
import { IncomeLogo } from './icons/IncomeLogo'
import styles from './Income.module.css'
import { useRef } from 'react'
import Modal from './Modal'

export const Income = () => {
  const { income, loading } = useIncomeDB()
  const modalAddIncomeRef = useRef<HTMLDialogElement>(null)
  const openModal = () => {
    if (modalAddIncomeRef.current) {
      modalAddIncomeRef.current.showModal()
    }
  }
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
      <ul>
        {income &&
          income.map((income) => (
            <li key={income.id}>
              {income.name}: {income.amount}
              <button>edit</button>
              <button>delete</button>
            </li>
          ))}
      </ul>
      <button onClick={openModal}>
        Agregar Ingreso <AddIcon />
      </button>
      <button onClick={resetDB}>Eliminar DB</button>
      <Modal dialogRef={modalAddIncomeRef} />
    </section>
  )
}
