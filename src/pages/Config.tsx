import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Header } from '../components/Header'
import { ConfigSection } from '../components/ConfigSection'

export const Config = () => {
  useDocumentTitle('Configuración | Presupuesto App')
  return (
    <>
      <Header />
      <ConfigSection />
    </>
  )
}
