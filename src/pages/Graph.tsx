import { Header } from '../components/Header'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export const Graph = () => {
  useDocumentTitle('Gráfica | Presupuesto App')
  return (
    <>
      <Header />
      <h2>Gráficos</h2>
    </>
  )
}
