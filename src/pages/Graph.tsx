import { Header } from '../components/Header'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PieChartExpenses from '../components/graphs/PieChartExpenses'

export const Graph = () => {
  useDocumentTitle('Gráfica | Presupuesto App')
  return (
    <>
      <Header />
      <h2>Gráficos</h2>
      <PieChartExpenses />
    </>
  )
}
