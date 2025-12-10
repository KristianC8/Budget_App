import { useIncomeDB } from '../hooks/useIncomeDB'
import { AddIcon } from './icons/AddIcon'
import { IncomeLogo } from './icons/IncomeLogo'
import styles from './Income.module.css'
import { useRef, useState } from 'react'
import type { Income as IncomeType } from '../types/dataBase'
import Modal from './Modal'
import { DeleteIcon } from './icons/DeleteIcon'
import { EditIcon } from './icons/EditIcon'
import { formatCurrencyParts } from '../utils/Formatter'

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
  const netIncome = (income: IncomeType) => {
    return (
      income.amount -
      income.discounts.reduce(
        (total, currentValue) => total + currentValue.amount,
        0
      )
    )
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
          {income.map((income, i) => (
            <li key={income.id}>
              <div className={styles.incomeContainer}>
                {`${i + 1}. `}
                <div className={styles.income}>
                  {`${income.name}: `}
                  <span className={styles.sign}>
                    {formatCurrencyParts(1).symbol}
                  </span>{' '}
                  {formatCurrencyParts(netIncome(income)).value}
                </div>
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
      <div className={styles.footer}>
        <button className='buttons' onClick={openAddModal}>
          Agregar <AddIcon />
        </button>
      </div>
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
