// import expenses from '../mocks/expenses.json'
import styles from './ExpensesTable.module.css'
import { DeleteIcon } from './icons/DeleteIcon'
// import type { expenseType } from '../types/expense'
import { useExpenses } from '../hooks/useExpenses'
import { AddExpenseForm } from './AddExpenseForm'

export const ExpensesTable = () => {
  // const results: expenseType[] = expenses.results
  const { expenses, removeExpense } = useExpenses()

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
                    <td className={styles.tData}>
                      <span className={styles.sign}>$</span>
                      {expense.amount}
                    </td>
                    <td className={styles.tData}>{expense.category}</td>
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
