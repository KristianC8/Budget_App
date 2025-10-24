import { Link } from 'wouter'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export const Settings = () => {
  useDocumentTitle('Ajustes | Presupuesto App')
  return (
    <>
      <h2>Ajustes</h2>
      <Link href='/'>Home</Link>
    </>
  )
}
