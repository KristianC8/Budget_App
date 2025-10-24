import styles from './Header.module.css'
import { Link } from 'wouter'
import { SettingsIcon } from './icons/SettingsIcon'
import { FinanceLogo } from './icons/FinanceLogo'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.flexH}>
        <FinanceLogo />
        <h1 className={styles.title}>Presupuesto</h1>
      </div>
      <nav>
        <Link href='/config' className={styles.link}>
          <SettingsIcon />
        </Link>
      </nav>
    </header>
  )
}
