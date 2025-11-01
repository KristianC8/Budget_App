import { Totals } from './Totals'

export const Dashboard = () => {
  function resetDB() {
    indexedDB.deleteDatabase('BudgetAppDB')
    alert('Base de datos eliminada')
  }
  return (
    <section>
      <h2>Dashboard</h2>
      <Totals />
      <button onClick={resetDB}>Eliminar DB</button>
    </section>
  )
}
