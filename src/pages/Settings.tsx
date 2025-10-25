import { Link } from 'wouter'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { CategoriesTest } from '../components/CategoriesTest'

export const Settings = () => {
  useDocumentTitle('Ajustes | Presupuesto App')
  return (
    <>
      <h2>Ajustes</h2>
      <Link href='/'>Home</Link>
      <CategoriesTest />
    </>
  )
}
