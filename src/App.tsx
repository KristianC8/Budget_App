import './App.css'
import { AppSection } from './components/AppSection'
import { Header } from './components/Header'
import { ExpensesProvider } from './context/ExpensesProvider'
import { useIndexedDb } from './hooks/useIndexedDB'

function App() {
  const { isReady, error: dbError } = useIndexedDb()

  if (!isReady) return <div>Inicializando base de datos...</div>
  if (dbError) return <div>Error: {dbError.message}</div>

  return (
    <>
      <Header />
      <ExpensesProvider>
        <AppSection />
      </ExpensesProvider>
    </>
  )
}

export default App
