import { PieChartExpenses } from './graphs/PieChartExpenses'
import styles from './GraphsSection.module.css'

export const GraphsSection = () => {
  return (
    <section className={styles.sectionGraphs}>
      <PieChartExpenses />
      <section style={{ border: 'solid 2px gray', borderRadius: '0.5rem' }}>
        2
      </section>
      <section style={{ border: 'solid 2px gray', borderRadius: '0.5rem' }}>
        3
      </section>
    </section>
  )
}
