import { type Income } from '../types/dataBase'
import { type Control, useWatch } from 'react-hook-form'
import { useMemo } from 'react'
import { AddIcon } from './icons/AddIcon'
import styles from './AddIncomeValidate.module.css'

const AddIncomeValidate = ({ control }: { control: Control<Income> }) => {
  const currentDiscounts = useWatch({
    control,
    name: 'discounts',
    defaultValue: []
  })

  const currentIncome = useWatch({
    control,
    name: 'amount',
    defaultValue: undefined
  })

  const totalDiscounts = useMemo(() => {
    return currentDiscounts.reduce((sum, item) => sum + (item.amount || 0), 0)
  }, [currentDiscounts])

  const isValidTotal = totalDiscounts >= currentIncome

  return (
    <>
      {isValidTotal && (
        <span className={styles.error}>
          La suma de los descuentos no puede superar o ser igual a los ingresos
        </span>
      )}
      <button className='buttons' type='submit' disabled={isValidTotal}>
        Agregar <AddIcon />
      </button>
    </>
  )
}

export default AddIncomeValidate
