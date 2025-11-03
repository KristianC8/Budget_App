import { Balance } from './Balance'
import { Income } from './Income'
import styles from './Dashboard.module.css'

export const Dashboard = () => {
  return (
    <section className={styles.container}>
      <Income />
      <Balance />
    </section>
  )
}
