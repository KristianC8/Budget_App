// import expenses from '../mocks/expenses.json'
// import type { expenseType } from '../types/expense'
import styles from './ExpensesTable.module.css'
import { DeleteIcon } from './icons/DeleteIcon'
import { useExpenses } from '../hooks/useExpenses'
import { AddExpenseForm } from './AddExpenseForm'
import { useState } from 'react'
import React from 'react'
import { useForm } from 'react-hook-form'

export const ExpensesTable = () => {
  // const results: expenseType[] = expenses.results
  const { expenses, updateExpenses, removeExpense } = useExpenses()

  interface cellType {
    rowId: string | null
    field: string | null
  }

  const [editingCell, setEditingCell] = useState<cellType>({
    rowId: null,
    field: null
  })

  const { register, setValue } = useForm()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    rowId: string,
    field: string
  ) => {
    const value = field === 'amount' ? Number(e.target.value) : e.target.value
    updateExpenses(rowId, field, value)
    e.target.blur()
  }

  const handleDoubleClick = (rowId: string, field: string) => {
    setEditingCell({ rowId, field })
  }

  const handleBlur = () => {
    setEditingCell({ rowId: null, field: null })
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>,
    rowId: string,
    field: string
  ) => {
    if (e.key === 'Enter') {
      const value =
        field === 'amount'
          ? Number(e.currentTarget.value)
          : e.currentTarget.value
      updateExpenses(rowId, field, value)
      e.preventDefault()
      e.currentTarget.blur()
    }
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
                        setValue('amount', expense['amount'])
                      }}
                    >
                      <span className={styles.sign}>$</span>
                      {editingCell.rowId === expense.id &&
                      editingCell.field === 'amount' ? (
                        <input
                          {...register('amount')}
                          type='number'
                          inputMode='numeric'
                          className={styles.inputNumber}
                          // value={expense['amount']} // Valor actual de la celda
                          autoFocus // Foco automático al entrar al modo edición
                          // onChange={(e) =>
                          //   handleChange(e, expense.id, 'amount')
                          // } // Actualiza el estado al escribir
                          onBlur={handleBlur} // Sale del modo edición al perder foco
                          onKeyDown={(e) => {
                            handleKeyDown(e, expense.id, 'amount')
                          }}
                        />
                      ) : (
                        <>{expense.amount}</>
                      )}
                    </td>
                    <td
                      className={styles.tData}
                      onDoubleClick={() => {
                        handleDoubleClick(expense.id, 'category')
                        setValue('category', expense['category'])
                      }}
                    >
                      {editingCell.rowId === expense.id &&
                      editingCell.field === 'category' ? (
                        <select
                          {...register('category')}
                          className={styles.select}
                          id='category'
                          // value={expense['category']}
                          // onChange={(e) =>
                          //   handleChange(e, expense.id, 'category')
                          // } // Actualiza el estado al escribir
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e, expense.id, 'category')
                          }}
                        >
                          <option className={styles.option} value='Mercado'>
                            Mercado
                          </option>
                          <option className={styles.option} value='Transporte'>
                            Transporte
                          </option>
                          <option
                            className={styles.option}
                            value='Medicamentos'
                          >
                            Medicamentos
                          </option>
                          <option className={styles.option} value='Otros'>
                            Otros
                          </option>
                        </select>
                      ) : (
                        <>{expense.category}</>
                      )}
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
