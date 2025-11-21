import AddIncomeLogo from './icons/AddIncomeLogo'
import styles from './Modal.module.css'
import type { Income } from '../types/dataBase'
import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form'
import InfoIcon from './icons/InfoIcon'
import { helpNumericKeyDown } from '../helpers/helpNumericKeyDown'
import { AddIcon } from './icons/AddIcon'
import { TrashIcon } from './icons/TrashIcon'
import { useIncomeDB } from '../hooks/useIncomeDB'
import AddIncomeValidate from './AddIncomeValidate'
import { useEffect } from 'react'
import { formatCurrencyParts } from '../utils/Formatter'
import { InputCurrency } from './InputCurrency'

interface modalProps {
  dialogRef: React.RefObject<HTMLDialogElement | null>
  initialValues?: Income
  editID?: number
}

const Modal = ({ dialogRef, initialValues, editID = 0 }: modalProps) => {
  const { register, control, handleSubmit, reset } = useForm<Income>()

  useEffect(() => {
    if (initialValues) {
      reset(initialValues) // Actualiza el formulario con los nuevos valores
    } else {
      reset({
        name: undefined,
        amount: undefined,
        discounts: []
      })
    }
  }, [initialValues, reset])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'discounts'
  })

  const { addIncome, updateIncome, error } = useIncomeDB()

  const onSubmit: SubmitHandler<Income> = (data) => {
    if (initialValues) {
      updateIncome(editID, data)
    } else {
      addIncome(data)
    }
    reset()
    dialogRef.current?.close()
  }

  const addDiscount = () => {
    append({ name: '', amount: 0 })
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dialogRef.current?.close()
    reset()
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onKeyDown={(e) => {
        if (e.key === 'Enter') return
      }}
    >
      <header className={styles.header}>
        <div className={styles.title}>
          <AddIncomeLogo />
          <h2>{initialValues ? 'Editar' : 'Agregar'} fuente de Ingreso</h2>
        </div>

        <button
          aria-label='cerrar'
          onClick={handleCancel}
          className={styles.close}
        >
          ✖
        </button>
      </header>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.incomeContainer}>
          <div className={styles.formIncome}>
            <div className={styles['flex-V']}>
              <label htmlFor='name'>Cual es tu fuente de Ingreso:</label>
              <input
                {...register('name', {
                  required: true,
                  setValueAs: (value) => value.trim()
                })}
                type='text'
                name='name'
                id='name'
                inputMode='text'
                autoComplete='off'
                maxLength={20}
                autoFocus
              />
            </div>
            <div className={styles['flex-V']}>
              <label htmlFor='amount'>Monto:</label>
              <div className={styles['flex-H']}>
                <span className={styles.sign}>
                  {formatCurrencyParts(1).symbol}
                </span>
                <InputCurrency
                  name='amount'
                  control={control}
                  onKeyDown={(e) => {
                    helpNumericKeyDown(e)
                  }}
                />
              </div>
            </div>
          </div>
          <p className={styles.info}>
            Deseas agregar un descuento
            <InfoIcon h={'15'} w={'15'} />
            {error && <span>{error.add}</span>}
          </p>
          <div>
            {fields.length === 0 ? (
              <div>
                <button type='button' className='buttons' onClick={addDiscount}>
                  Descuento <AddIcon />
                </button>
              </div>
            ) : (
              <>
                <div className={styles.discounts}>
                  {fields.map((field, index) => (
                    <div key={field.id} className={styles.formIncome}>
                      <div>
                        <label htmlFor={`discounts.${index}.name`}>
                          Descuento
                        </label>
                        <input
                          {...register(`discounts.${index}.name`, {
                            required: true,
                            setValueAs: (value) => value.trim()
                          })}
                          placeholder='Ej: Pensión'
                          inputMode='text'
                          maxLength={20}
                          autoComplete='off'
                        />
                      </div>
                      <div>
                        <label htmlFor={`discounts.${index}.amount`}>
                          Monto
                        </label>
                        <div className={styles['flex-H']}>
                          <span className={styles.sign}>
                            {formatCurrencyParts(1).symbol}
                          </span>
                          <InputCurrency
                            name={`discounts.${index}.amount`}
                            control={control}
                            onKeyDown={(e) => {
                              helpNumericKeyDown(e)
                            }}
                          />
                        </div>
                      </div>

                      <button
                        type='button'
                        className='buttons'
                        onClick={() => remove(index)}
                        title='Eliminar descuento'
                      >
                        Borrar <TrashIcon w='20' h='20' />
                      </button>
                    </div>
                  ))}
                </div>

                <button type='button' className='buttons' onClick={addDiscount}>
                  Otro <AddIcon />
                </button>
              </>
            )}
          </div>
        </div>
        <footer className={styles.footer}>
          <button
            onClick={handleCancel}
            className={`${styles.button} ${styles.cancel}`}
          >
            Cancelar
          </button>
          <AddIncomeValidate
            control={control}
            title={initialValues ? 'Editar' : 'Agregar'}
          />
        </footer>
      </form>
    </dialog>
  )
}

export default Modal
