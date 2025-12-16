import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import styles from './LineChartBalance.module.css'

// #region Sample data

interface MonthData {
  mes: string
  ingresos: number
  gastos: number
}

const data: MonthData[] = [
  { mes: 'Julio', ingresos: 4500, gastos: 3200 },
  { mes: 'Agosto', ingresos: 5200, gastos: 3800 },
  { mes: 'Septiembre', ingresos: 4800, gastos: 4100 },
  { mes: 'Octubre', ingresos: 6100, gastos: 3900 },
  { mes: 'Noviembre', ingresos: 5500, gastos: 4500 },
  { mes: 'Diciembre', ingresos: 7200, gastos: 5100 }
]

// #endregion

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    color: string
  }>
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null

  const ingresos = payload.find((p) => p.name === 'Ingresos')?.value || 0
  const gastos = payload.find((p) => p.name === 'Gastos')?.value || 0
  const diferencia = ingresos - gastos

  return (
    // <div className='bg-white px-4 py-3 rounded-lg shadow-xl border border-gray-200'>
    <div className={styles.tooltip}>
      <p>{label}</p>

      {payload.map((entry, index) => (
        <div
          key={index}
          //   className='flex items-center justify-between gap-4 mb-1'
          className={styles.tooltipItem}
        >
          {/* <span className='text-sm flex items-center gap-2'> */}
          <span className={styles.tooltipLabel}>
            <span
              //   className='w-3 h-3 rounded-full'
              className={styles.tooltipCircle}
              style={{ backgroundColor: entry.color }}
            />
            {entry.name}:
          </span>
          {/* <span className='font-semibold text-sm'> */}
          <span className={styles.tooltipValue}>
            ${entry.value.toLocaleString()}
          </span>
        </div>
      ))}

      {/* <div className='border-t border-gray-200 mt-2 pt-2'> */}
      <div className={styles.tooltipDivision}>
        {/* <div className='flex items-center justify-between gap-4'> */}
        <div className={styles.tooltipBalance}>
          {/* <span className='text-sm font-medium text-gray-600'>Balance:</span> */}
          <span className={styles.tooltipBalanceText}>Balance:</span>
          <span className={`${diferencia >= 0 ? styles.green : styles.red}`}>
            ${Math.abs(diferencia).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export const LineChartBalance: React.FC = () => {
  return (
    <section className={styles.lineSection}>
      <h2>Balance</h2>
      <LineChart
        style={{
          height: '100%',
          aspectRatio: 2
        }}
        responsive
        data={data}
      >
        <CartesianGrid strokeDasharray='2 2' />
        <XAxis tick={{ fill: '#6b7280', fontSize: 8 }} dataKey='mes' />
        <YAxis
          tick={{ fill: '#6b7280', fontSize: 10 }}
          tickFormatter={(value) => `$${value / 1000}k`}
          width='auto'
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            fontSize: '12px',
            fontWeight: '500'
          }}
        />
        <Line
          type='monotone'
          dataKey='ingresos'
          name='Ingresos'
          stroke='#10b981'
          activeDot={{ stroke: '#10b981', r: 4 }}
        />
        <Line
          type='monotone'
          dataKey='gastos'
          name='Gastos'
          stroke='#ef4444'
          activeDot={{ stroke: '#ef4444', r: 4 }}
        />
      </LineChart>
    </section>
  )
}
