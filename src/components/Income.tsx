import { useIncomeDB } from '../hooks/useIncomeDB'
import { AddIcon } from './icons/AddIcon'
import { IncomeLogo } from './icons/IncomeLogo'
import styles from './Income.module.css'
import { useRef, useState } from 'react'
import type { Income as IncomeType } from '../types/dataBase'
import Modal from './Modal'
import { DeleteIcon } from './icons/DeleteIcon'
import { EditIcon } from './icons/EditIcon'

export const Income = () => {
  const { income, loading, deleteIncome } = useIncomeDB()
  const [incomeToEdit, setIncomeToEdit] = useState<IncomeType | undefined>(
    undefined
  )
  const modalAddIncomeRef = useRef<HTMLDialogElement>(null)
  const openAddModal = () => {
    if (modalAddIncomeRef.current) {
      modalAddIncomeRef.current.showModal()
    }
  }
  const modalEditIncomeRef = useRef<HTMLDialogElement>(null)
  const handleEdit = (income: IncomeType) => {
    setIncomeToEdit(income) // Guardas el item a editar
    modalEditIncomeRef.current?.showModal() // Abres la modal
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
      {income.length === 0 && (
        <div className={styles.noResults}>
          Ingresa aquí tus fuentes de ingreso
        </div>
      )}
      {income.length > 0 && (
        <ul className={styles.list}>
          {income.map((income) => (
            <li key={income.id}>
              <div>
                {<span className={styles.sign}>$ </span>}
                {income.amount -
                  income.discounts.reduce(
                    (total, currentValue) => total + currentValue.amount,
                    0
                  )}{' '}
                {income.name}
              </div>
              <div className={styles.flexHC}>
                <button
                  className={styles.button}
                  onClick={() => {
                    handleEdit(income)
                  }}
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => {
                    deleteIncome(income.id)
                  }}
                  className={styles.button}
                >
                  <DeleteIcon />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button className='buttons' onClick={openAddModal}>
        Agregar <AddIcon />
      </button>
      <button onClick={resetDB}>Eliminar DB</button>
      <Modal dialogRef={modalAddIncomeRef} />
      <Modal
        dialogRef={modalEditIncomeRef}
        initialValues={incomeToEdit}
        editID={incomeToEdit?.id}
      />
    </section>
  )
}
