import { PieChartExpenses } from './graphs/PieChartExpenses'
import styles from './GraphsSection.module.css'
import { LineChartBalance } from './graphs/LineChartBalance'

export const GraphsSection = () => {
  return (
    <section className={styles.sectionGraphs}>
      <PieChartExpenses />
      <LineChartBalance />
      <section style={{ border: 'solid 2px gray', borderRadius: '0.5rem' }}>
        3
      </section>
    </section>
  )
}
