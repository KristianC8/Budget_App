import {
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
  useController
} from 'react-hook-form'
import { useState, useRef, useEffect } from 'react'
import { formatCurrencyParts } from '../utils/Formatter'

interface InputCurrencyProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  type?: 'number' | 'text'
  inputMode?: 'numeric' | 'text'
  autoComplete?: 'off' | 'on'
  maxLength?: number
  className?: string
  autoFocus?: boolean
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  rules?: RegisterOptions<T>
}

export const InputCurrency = <T extends FieldValues>({
  control,
  name,
  type = 'text',
  inputMode = 'numeric',
  autoComplete = 'off',
  maxLength = 12,
  className,
  autoFocus = true,
  onBlur,
  onKeyDown,
  rules
}: InputCurrencyProps<T>) => {
  // Merge default rules with custom rules
  const mergedRules: RegisterOptions<T> = {
    required: true,
    min: 1,
    max: 99999999999999,
    ...rules
  }

  const { field } = useController({
    control,
    name,
    rules: mergedRules
  })

  const [display, setDisplay] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setDisplay(field.value ? formatCurrencyParts(field.value).value : '')
  }, [field.value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const oldValue = input.value
    const cursor = input.selectionStart ?? 0

    // 1. Extraer solo números
    const raw = oldValue.replace(/[^0-9]/g, '')
    const num = raw ? parseInt(raw, 10) : 0

    // 2. Formatear
    const formatted = raw ? formatCurrencyParts(num).value : ''

    // 3. Calcular nuevo cursor
    const oldDigitsLeft = oldValue
      .slice(0, cursor)
      .replace(/[^0-9]/g, '').length

    // generar una posición de cursor equivalente en el nuevo string
    let newCursor = 0
    let digitsSeen = 0

    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) {
        digitsSeen++
      }
      if (digitsSeen === oldDigitsLeft) {
        newCursor = i + 1
        break
      }
    }

    // 4. Actualizar UI y RHF
    field.onChange(num)
    setDisplay(formatted)

    // 5. Establecer cursor en el siguiente tick
    requestAnimationFrame(() => {
      inputRef.current?.setSelectionRange(newCursor, newCursor)
    })
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    field.onBlur()
    onBlur?.(e)
  }

  return (
    <input
      type={type}
      ref={(el) => {
        field.ref(el)
        inputRef.current = el
      }}
      inputMode={inputMode}
      autoComplete={autoComplete}
      maxLength={maxLength}
      value={display}
      onChange={handleChange}
      onBlur={handleBlur}
      id={name}
      onKeyDown={onKeyDown}
      className={className}
      autoFocus={autoFocus}
      name={field.name}
    />
  )
}
