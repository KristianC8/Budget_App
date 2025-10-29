import { useExpensesDB } from '../hooks/useExpensesDB'

export function ExpensesList() {
  const { expenses, loading, error, addExpense } = useExpensesDB()

  const handleAdd = async () => {
    addExpense({
      amount: 1000,
      category: 'Otros'
    })
    // ✨ La UI ya se actualizó instantáneamente!
    // No necesitas esperar a que termine la operación de DB
  }

  function resetDB() {
    indexedDB.deleteDatabase('BudgetAppDB')
    alert('Base de datos eliminada')
  }

  if (loading) return <div>Cargando gastos...</div>

  return (
    <div style={{ overflow: 'hidden' }}>
      <h2>Gastos (Context)</h2>
      <button onClick={handleAdd}>Agregar Gasto</button>
      {error.add && <span>{error.add}</span>}
      {error.delete && <span>{error.delete}</span>}
      {error.update && <span>{error.update}</span>}
      {error.read && <span>{error.read}</span>}
      {expenses.map((expense) => (
        <div key={expense.id}>
          <span>{expense.amount}</span>
          <span>{expense.category}</span>
          <span>{expense.createdAt}</span>
        </div>
      ))}
      <button onClick={resetDB}>Eliminar DB</button>
    </div>
  )
}
