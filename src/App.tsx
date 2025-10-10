// import { useRef } from 'react'
// import { useTestState } from './hooks/useTestState'
// import { ExpenseForm } from './components/ExpenseForm'
import './App.css'
import { AppSection } from './components/AppSection'
// import expenses from './mocks/expenses.json'
import { Header } from './components/Header'
import { ExpenseProvider } from './context/ExpenseProvider'

function App() {
  // const {expenses, addExpense} = useTestState()

  // const results = expenses.results
  // const newExpense = {
  //   id: crypto.randomUUID(),
  //   amount: 1000,
  //   category: 'Mercado'
  // }

  // const dialogRef = useRef<HTMLDialogElement>(null)

  // const openModal = () => {
  //   if (dialogRef.current) {
  //     dialogRef.current.showModal();
  //   }
  // }

  // const closeModal = () => {
  //   if (dialogRef.current) {
  //     dialogRef.current.close();
  //   }
  // }

  return (
    <>
      <Header />
      {/* <p>{expenses && expenses.map(expense =><span key={expense.id}>{expense.amount}</span>)}</p> */}
      {/* <button onClick={openModal}>Open</button> */}
      {/* <ExpenseForm dialogRef={dialogRef}/> */}
      <ExpenseProvider>
        <AppSection />
      </ExpenseProvider>
    </>
  )
}

export default App
