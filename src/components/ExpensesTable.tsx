// import expenses from '../mocks/expenses.json'
// import type { expenseType } from '../types/expense'
import styles from './ExpensesTable.module.css'
import { DeleteIcon } from './icons/DeleteIcon'
import { useExpenses } from '../hooks/useExpenses'
import { AddExpenseForm } from './AddExpenseForm'
import { useState } from 'react'
import React from 'react'

export const ExpensesTable = () => {
  // const results: expenseType[] = expenses.results
  const { expenses, setExpenses, removeExpense } = useExpenses()

  interface cellType {
    rowId: string | null
    field: string | null
  }

  const [editingCell, setEditingCell] = useState<cellType>({
    rowId: null,
    field: null
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowId: string,
    field: string
  ) => {
    const updatedExpenses = expenses.map((row) =>
      row.id === rowId ? { ...row, [field]: e.target.value } : row
    )
    setExpenses(updatedExpenses)
  }

  const handleDoubleClick = (rowId: string, field: string) => {
    setEditingCell({ rowId, field })
  }

  const handleBlur = () => {
    setEditingCell({ rowId: null, field: null })
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        {expenses.length === 0 && (
          <p className={styles.noResults}>Ingresa aquí tus gastos</p>
        )}
        {expenses.length > 0 && (
          <table className={styles.table}>
            <colgroup>
              <col style={{ width: '5%' }} />
              <col style={{ width: '50%' }} />
              <col style={{ width: '35%' }} />
              <col style={{ width: '10%' }} />
            </colgroup>
            <thead>
              <tr>
                <th className={styles.tHead}>No.</th>
                <th className={styles.tHead}>Monto</th>
                <th className={styles.tHead}>Categoría</th>
                <th className={styles.tHead}>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 &&
                expenses.map((expense, i) => (
                  <tr key={expense.id}>
                    <td className={styles.tData}>{i + 1}</td>
                    <td
                      className={styles.tData}
                      onDoubleClick={() => {
                        handleDoubleClick(expense.id, 'amount')
                      }}
                    >
                      {editingCell.rowId === expense.id &&
                      editingCell.field === 'amount' ? (
                        <input
                          type='text'
                          value={expense['amount']} // Valor actual de la celda
                          autoFocus // Foco automático al entrar al modo edición
                          onChange={(e) =>
                            handleChange(e, expense.id, 'amount')
                          } // Actualiza el estado al escribir
                          onBlur={handleBlur} // Sale del modo edición al perder foco
                        />
                      ) : (
                        <>
                          <span className={styles.sign}>$</span>
                          {expense.amount}
                        </>
                      )}
                    </td>
                    <td
                      className={styles.tData}
                      onClick={() => {
                        handleDoubleClick(expense.id, 'category')
                      }}
                    >
                      {expense.category}
                    </td>
                    <td className={styles.tData}>
                      <div className={styles.flexSE}>
                        <button
                          className={styles.deleteButton}
                          onClick={() => {
                            removeExpense(expense.id)
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      <AddExpenseForm />
    </div>
  )
}
