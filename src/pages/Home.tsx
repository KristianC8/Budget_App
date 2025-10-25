import { Header } from '../components/Header'
import { AppSection } from '../components/AppSection'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export const Home = () => {
  useDocumentTitle('Presupuesto App')
  return (
    <>
      <Header />
      <AppSection />
    </>
  )
}
