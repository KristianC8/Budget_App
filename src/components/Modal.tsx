import AddIncomeLogo from './icons/AddIncomeLogo'
import styles from './Modal.module.css'
import type { Income } from '../types/dataBase'
import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form'
import InfoIcon from './icons/InfoIcon'
import { helpNumericKeyDown } from '../helpers/helpNumericKeyDown'

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

  const onSubmit: SubmitHandler<Income> = (data) => {
    console.log(data)
    console.log(data.discounts)
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
                <p>No hay descuentos agregados</p>
                <button type='button' onClick={addDiscount}>
                  Agregar primer descuento
                </button>
              </div>
            ) : (
              <>
                {fields.map((field, index) => (
                  <div key={field.id}>
                    <div>
                      <div>
                        <label>Descuento</label>
                        <input
                          {...register(`discounts.${index}.name`)}
                          placeholder='Ej: Salud'
                        />
                      </div>
                      <div>
                        <label>Monto</label>
                        <input
                          {...register(`discounts.${index}.amount`)}
                          type='number'
                          placeholder='1000'
                        />
                      </div>
                    </div>
                    <button
                      type='button'
                      onClick={() => remove(index)}
                      title='Eliminar descuento'
                    >
                      Borrar
                    </button>
                  </div>
                ))}

                <button type='button' onClick={addDiscount}>
                  Agregar otro descuento
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
          <button className={`${styles.button} buttons`} type='submit'>
            Agregar
          </button>
        </footer>
      </form>
    </dialog>
  )
}

export default Modal
