import styles from './ExpensesTable.module.css'
import { DeleteIcon } from './icons/DeleteIcon'
import { AddExpenseForm } from './AddExpenseForm'
import { useEditExpenseDB } from '../hooks/useEditExpensesDB'
import { useExpensesDB } from '../hooks/useExpensesDB'
import { TrashIcon } from './icons/TrashIcon'
import MoneyLogo from './icons/MoneyLogo'
import { useCategoriesDB } from '../hooks/useCategoriesDB'
import { useRef } from 'react'
import { useScrollBottom } from '../hooks/useScrollBottom'
import { InputCurrency } from './InputCurrency'
import { formatCurrencyParts } from '../utils/Formatter'

export const ExpensesTable = () => {
  const tableRef = useRef<HTMLDivElement | null>(null)
  const { expenses, loading, error, deleteExpense } = useExpensesDB()
  const { categories } = useCategoriesDB()
  const {
    editingCell,
    control,
    register,
    setValue,
    handleChange,
    handleDoubleClick,
    handleBlur,
    handleKeyDown,
    handleKeyInput
  } = useEditExpenseDB()

  useScrollBottom(tableRef, expenses)

  return (
    <section className={`sections ${styles.container}`}>
      <div>
        <div className={styles.flexH}>
          <MoneyLogo />
          <h2>Gastos</h2>
        </div>
        {error.add && <span>{error.add}</span>}
        {error.delete && <span>{error.delete}</span>}
        {error.update && <span>{error.update}</span>}
        {error.read && <span>{error.read}</span>}
        {loading && <div>Cargando gastos...</div>}
        <div className={styles.tableContainer} ref={tableRef}>
          {expenses.length === 0 && (
            <p className={styles.noResults}>Ingresa aquí tus gastos</p>
          )}
          {expenses.length > 0 && (
            <table className={styles.table}>
              <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '30%' }} />
                <col style={{ width: '40%' }} />
                <col style={{ width: '5%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th className={styles.tHead}>No.</th>
                  <th className={styles.tHead}>Monto</th>
                  <th className={styles.tHead}>Categoría</th>
                  <th className={styles.tHead}>Descripción</th>
                  {/* <th className={styles.tHead}>&nbsp;</th> */}
                  <th className={styles.tHead}>
                    <TrashIcon />
                  </th>
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
                          setValue('amount', expense['amount']) //Valor actual
                        }}
                      >
                        {editingCell.rowId === expense.id &&
                        editingCell.field === 'amount' ? (
                          <>
                            <span className={styles.sign}>
                              {formatCurrencyParts(1).symbol}{' '}
                            </span>
                            <InputCurrency
                              control={control}
                              name='amount'
                              className={styles.inputNumber}
                              onBlur={handleBlur}
                              onKeyDown={(e) => {
                                handleKeyDown(
                                  e,
                                  expense.id,
                                  'amount',
                                  expense['amount']
                                )
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <span className={styles.sign}>
                              {formatCurrencyParts(expense.amount).symbol}{' '}
                            </span>
                            {formatCurrencyParts(expense.amount).value}
                          </>
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
                            {...register('category', { required: true })}
                            className={styles.select}
                            autoFocus
                            onBlur={handleBlur}
                            onChange={(e) => {
                              handleChange(e, expense.id, 'category')
                            }}
                            disabled={categories.length === 0}
                          >
                            {categories.length === 0 && (
                              <option value={expense.category}>
                                {expense.category}
                              </option>
                            )}
                            <option value='' hidden>
                              Selecciona uno
                            </option>
                            {categories.length > 0 &&
                              categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                  {category.name}
                                </option>
                              ))}
                          </select>
                        ) : (
                          <>{expense.category}</>
                        )}
                      </td>
                      <td
                        className={styles.tData}
                        onDoubleClick={() => {
                          handleDoubleClick(expense.id, 'description')
                          setValue('description', expense['description'])
                        }}
                      >
                        {editingCell.rowId === expense.id &&
                        editingCell.field === 'description' ? (
                          <input
                            {...register('description', { required: true })}
                            type='text'
                            inputMode='text'
                            autoComplete='off'
                            maxLength={20}
                            onBlur={handleBlur}
                            id='description'
                            autoFocus
                            name='description'
                            className={styles.inputText}
                            onKeyDown={(e) => {
                              handleKeyInput(
                                e,
                                expense.id,
                                'description',
                                expense.description
                              )
                            }}
                          />
                        ) : (
                          <>{expense.description}</>
                        )}
                      </td>
                      <td className={styles.tData}>
                        <div className={styles.flexSE}>
                          <button
                            className={styles.deleteButton}
                            onClick={() => {
                              deleteExpense(expense.id)
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
      </div>

      <AddExpenseForm />
    </section>
  )
}
