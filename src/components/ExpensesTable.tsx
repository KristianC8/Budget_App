// import expenses from '../mocks/expenses.json'
// import type { expenseType } from '../types/expense'
import styles from './ExpensesTable.module.css'
import { DeleteIcon } from './icons/DeleteIcon'
import { AddExpenseForm } from './AddExpenseForm'
import { useExpenses } from '../hooks/useExpenses'
import { useEditExpense } from '../hooks/useEditExpense'

export const ExpensesTable = () => {
  // const results: expenseType[] = expenses.results
  const { expenses, removeExpense } = useExpenses()
  const {
    editingCell,
    register,
    setValue,
    handleChange,
    handleDoubleClick,
    handleBlur,
    handleKeyDown
  } = useEditExpense()

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
                        setValue('amount', expense['amount']) //Valor actual
                      }}
                    >
                      <span className={styles.sign}>$</span>
                      {editingCell.rowId === expense.id &&
                      editingCell.field === 'amount' ? (
                        <input
                          {...register('amount', {
                            required: 'El monto es requerido',
                            min: 1,
                            max: 999999999999
                          })}
                          type='text'
                          inputMode='numeric'
                          className={styles.inputNumber}
                          autoFocus // Foco automático al entrar al modo edición
                          onBlur={handleBlur} // Sale del modo edición al perder foco
                          onKeyDown={(e) => {
                            handleKeyDown(
                              e,
                              expense.id,
                              'amount',
                              expense['amount']
                            )
                          }}
                          maxLength={12}
                          autoComplete='off'
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
