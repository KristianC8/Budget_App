import styles from './Header.module.css'
import { Link } from 'wouter'
import { SettingsIcon } from './icons/SettingsIcon'
import { FinanceLogo } from './icons/FinanceLogo'
import { useLocation } from 'wouter'

export const Header = () => {
  const [location] = useLocation()
  return (
    <header className={styles.header}>
      <Link href='/' className={styles.flexH}>
        <FinanceLogo />
        <h1 className={styles.title}>
          {location === '/config' ? 'Configuración' : 'Presupuesto'}
        </h1>
      </Link>
      <nav>
        {location !== '/config' && (
          <Link href='/config' className={styles.link}>
            <SettingsIcon />
          </Link>
        )}
      </nav>
    </header>
  )
}
