import React from 'react'
import styles from './PieChartExpenses.module.css'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip
  //   type PieLabelRenderProps
} from 'recharts'

type BudgetCategory = {
  name: string
  value: number
}

const data: BudgetCategory[] = [
  { name: 'Vivienda', value: 450 },
  { name: 'Alimentación', value: 300 },
  { name: 'Transporte', value: 120 },
  { name: 'Entretenimiento', value: 80 },
  { name: 'Ahorro', value: 200 }
]

const COLORS = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#EF4444']
const RADIAN = Math.PI / 180

interface CustomLabelProps {
  cx?: number
  cy?: number
  midAngle?: number
  innerRadius?: number
  outerRadius?: number
  percent?: number
}

export const PieChartExpenses: React.FC = () => {
  const CustomLabel = (props: CustomLabelProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props

    if (
      cx === undefined ||
      cy === undefined ||
      midAngle === undefined ||
      innerRadius === undefined ||
      outerRadius === undefined ||
      percent === undefined
    ) {
      return null
    }

    // Calcular el radio en el centro del segmento
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5

    // Calcular posición x e y usando trigonometría
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    // Solo mostrar si el porcentaje es mayor a 3%
    if (percent < 0.03) return null

    return (
      <text
        x={x}
        y={y}
        fill='#fff'
        textAnchor='middle'
        dominantBaseline='central'
        fontSize={16}
        fontWeight='bold'
        style={{ pointerEvents: 'none' }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }
  const total = data.reduce((sum, item) => sum + item.value, 0)
  return (
    <>
      <section className={styles.pieSection}>
        <h2>Gastos por Categoría</h2>
        <div className={styles.pieChartContent}>
          <PieChart className={styles.pieChart} responsive>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              labelLine={false}
              label={CustomLabel}
              outerRadius={'100%'}
              innerRadius={'70%'}
              paddingAngle={2}
              cornerRadius={2}
              dataKey='value'
              stroke='none'
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#181818',
                border: '1px solid #ccc',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
          </PieChart>

          <div className={styles.legend}>
            {data.map((item, index) => {
              const percentage = ((item.value / total) * 100).toFixed(1)
              return (
                <div key={index} className={styles.category}>
                  <div
                    className={styles.colorCategory}
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className={styles.label}>
                    <span className={styles.name}>{item.name}</span>
                    <span className={styles.value}>
                      {item.value} ({percentage}%)
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
