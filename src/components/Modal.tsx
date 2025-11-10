import AddIncomeLogo from './icons/AddIncomeLogo'
import styles from './Modal.module.css'

interface modalProps {
  dialogRef: React.RefObject<HTMLDialogElement | null>
}

const Modal = ({ dialogRef }: modalProps) => {
  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <form method='dialog' className={styles.form}>
        <header>
          <div className={styles.title}>
            <AddIncomeLogo />
            <h2>Agregar fuente de Ingreso</h2>
          </div>
          <button aria-label='cerrar' className={styles.close}>
            ✖
          </button>
        </header>
        <div className={styles.incomeContainer}>
          <div className={styles.formIncome}>
            <div className={styles['flex-V']}>
              <label htmlFor='income'>Cual es tu fuente de Ingreso:</label>
              <input type='text' name='income' id='income' autoFocus />
            </div>
            <div className={styles['flex-V']}>
              <label htmlFor='amount'>Monto:</label>
              <div className={styles['flex-H']}>
                <span className={styles.sign}>$</span>
                <input type='text' name='amount' id='amount' />
              </div>
            </div>
          </div>
          <p>Deseas agregar un descuento</p>
          <div> Agregar descuento</div>
        </div>
        <footer>
          <button type='submit' value='confirm'>
            Confirmar
          </button>
          <button>Cancelar</button>
        </footer>
      </form>
    </dialog>
  )
}

export default Modal
