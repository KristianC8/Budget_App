import { DBProvider } from './context/DBProvider.tsx'
import { ExpensesProvider } from './context/ExpensesProvider.tsx'
import { CategoriesProvider } from './context/CategoriesProvider.tsx'
import { Router } from './router/index.tsx'

function App() {
  return (
    <DBProvider>
      <ExpensesProvider>
        <CategoriesProvider>
          <Router />
        </CategoriesProvider>
      </ExpensesProvider>
    </DBProvider>
  )
}

export default App
