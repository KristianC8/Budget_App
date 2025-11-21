import { type Income } from '../types/dataBase'
import { type Control, useWatch } from 'react-hook-form'
import { useMemo } from 'react'
import { AddIcon } from './icons/AddIcon'
import styles from './AddIncomeValidate.module.css'
import { ParseCurrency } from '../utils/currencyFormated'

const AddIncomeValidate = ({
  control,
  title
}: {
  control: Control<Income>
  title: string
}) => {
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
    return currentDiscounts.reduce((sum, item) => {
      const amount =
        typeof item.amount === 'string'
          ? ParseCurrency(item.amount)
          : item.amount || 0
      return sum + (isNaN(amount) ? 0 : amount)
    }, 0)
  }, [currentDiscounts])

  const incomeValue =
    typeof currentIncome === 'string'
      ? ParseCurrency(currentIncome)
      : currentIncome

  const isValidTotal =
    typeof incomeValue === 'number' &&
    !isNaN(incomeValue) &&
    totalDiscounts >= incomeValue

  return (
    <>
      {isValidTotal && (
        <span className={styles.error}>
          La suma de los descuentos no puede superar o ser igual a los ingresos
        </span>
      )}
      <button className='buttons' type='submit' disabled={isValidTotal}>
        {title} <AddIcon />
      </button>
    </>
  )
}

export default AddIncomeValidate
