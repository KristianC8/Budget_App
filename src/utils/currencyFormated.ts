import { formatCurrencyParts } from './Formatter'

export const handleChangeInputCunrrency = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const input = e.target
  const cursorPosition = input.selectionStart || 0
  const oldLength = input.value.length

  // Solo números
  const numbers = input.value.replace(/[^0-9]/g, '')

  if (!numbers) {
    input.value = ''
    return
  }

  const num = parseInt(numbers, 10)

  // Formatear
  const formatted = formatCurrencyParts(num)

  input.value = formatted.value

  // Ajustar cursor
  const newLength = formatted.value.length
  const diff = newLength - oldLength
  const newPosition = Math.max(0, cursorPosition + diff)

  input.setSelectionRange(newPosition, newPosition)
}

export const ParseCurrency = (value: string) => {
  const valueNumber = value.replace(/[^0-9]/g, '')
  return parseInt(valueNumber, 10)
}
