import AddIncomeLogo from './icons/AddIncomeLogo'
import styles from './Modal.module.css'
import type { Income } from '../types/dataBase'
import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form'
import InfoIcon from './icons/InfoIcon'
import { helpNumericKeyDown } from '../helpers/helpNumericKeyDown'
import { AddIcon } from './icons/AddIcon'
import { TrashIcon } from './icons/TrashIcon'
import { useIncomeDB } from '../hooks/useIncomeDB'

interface modalProps {
  dialogRef: React.RefObject<HTMLDialogElement | null>
}

const Modal = ({ dialogRef }: modalProps) => {
  console.log('render modal')

  const { register, control, handleSubmit, reset } = useForm<Income>({
    defaultValues: {
      name: undefined,
      amount: undefined,
      discounts: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'discounts'
  })

  const { addIncome } = useIncomeDB()

  const onSubmit: SubmitHandler<Income> = (data) => {
    console.log(data)
    console.log(data.discounts)
    addIncome(data)
    reset()
    dialogRef.current?.close()
  }

  const addDiscount = () => {
    append({ name: '', amount: 0 })
  }

  // const currentDiscounts = watch('discounts')

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dialogRef.current?.close()
    reset()
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <header className={styles.header}>
        <div className={styles.title}>
          <AddIncomeLogo />
          <h2>Agregar fuente de Ingreso</h2>
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
                <span className={styles.sign}>$</span>
                <input
                  {...register('amount', {
                    required: true,
                    min: 1,
                    max: 99999999999999,
                    valueAsNumber: true
                  })}
                  type='text'
                  name='amount'
                  id='amount'
                  inputMode='numeric'
                  onKeyDown={(e) => {
                    helpNumericKeyDown(e)
                  }}
                  autoComplete='off'
                  maxLength={14}
                />
              </div>
            </div>
          </div>
          <p className={styles.info}>
            Deseas agregar un descuento
            <InfoIcon h={'15'} w={'15'} />
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
                        <label>Descuento</label>
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
                        <label>Monto</label>
                        <div className={styles['flex-H']}>
                          <span className={styles.sign}>$</span>
                          <input
                            {...register(`discounts.${index}.amount`, {
                              required: true,
                              min: 1,
                              max: 99999999999999,
                              valueAsNumber: true
                            })}
                            onKeyDown={(e) => {
                              helpNumericKeyDown(e)
                            }}
                            type='text'
                            inputMode='numeric'
                            autoComplete='off'
                            maxLength={14}
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
          <button className='buttons' type='submit'>
            Agregar <AddIcon />
          </button>
        </footer>
      </form>
    </dialog>
  )
}

export default Modal
