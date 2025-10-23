import styles from './Header.module.css'
import { Link } from 'wouter'
import { SettingsIcon } from './icons/SettingsIcon'

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Presupuesto</h1>
      <nav>
        <Link href='/config' className={styles.link}>
          <SettingsIcon />
        </Link>
      </nav>
    </header>
  )
}
