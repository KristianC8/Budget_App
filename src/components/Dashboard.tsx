export const Dashboard = () => {
  function resetDB() {
    indexedDB.deleteDatabase('BudgetAppDB')
    alert('Base de datos eliminada')
  }
  return (
    <section>
      <h2>Dashboard</h2>
      <button onClick={resetDB}>Eliminar DB</button>
    </section>
  )
}
