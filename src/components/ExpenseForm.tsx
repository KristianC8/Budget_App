import React from 'react'

interface dialogProps {
  dialogRef: React.RefObject<HTMLDialogElement | null>
}

export const ExpenseForm = ({ dialogRef }: dialogProps) => {
  return (
    <dialog closedBy='any' ref={dialogRef}>
      <form method='dialog'>
        <header>
          <h2>Agregar Gasto</h2>
          <button value='close' aria-label='Cerrar'>
            ×
          </button>
        </header>

        <main>
          <label htmlFor='amount'>Monto:</label>
          <input type='text' id='amount' name='amount' />
          <label htmlFor='category'>Categoría:</label>
          <select name='category' id='category'>
            <option value='mercado'>Mercado</option>
            <option value='almuerzo'>Almuerzo</option>
            <option value='mascotas'>Mascotas</option>
            <option value='otros'>Otros</option>
          </select>
        </main>

        <footer>
          <button type='submit' value='confirm'>
            Confirmar
          </button>
          <button value='cancel'>Cancelar</button>
        </footer>
      </form>
    </dialog>
  )
}
