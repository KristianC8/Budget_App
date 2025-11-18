// Configuración centralizada
const LOCALE = 'es-CO'
const CURRENCY = 'COP'

// Formatters reutilizables
const currencyFormatter = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: CURRENCY,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})

const currencyFormatterWithDecimals = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: CURRENCY,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const numberFormatter = new Intl.NumberFormat(LOCALE)

const dateFormatter = new Intl.DateTimeFormat(LOCALE, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

// Funciones exportadas
export const formatCurrency = (amount: number): string => {
  return currencyFormatter.format(amount)
}

// Nueva función que retorna partes separadas
export const formatCurrencyParts = (amount: number) => {
  const parts = currencyFormatter.formatToParts(amount)

  return {
    symbol: parts.find((part) => part.type === 'currency')?.value || '$',
    value: parts
      .filter((part) => part.type !== 'currency')
      .map((part) => part.value)
      .join('')
      .trim()
  }
}

export const formatCurrencyWithDecimals = (amount: number): string => {
  return currencyFormatterWithDecimals.format(amount)
}

export const formatNumber = (value: number): string => {
  return numberFormatter.format(value)
}

export const formatDate = (date: Date): string => {
  return dateFormatter.format(date)
}

// Función auxiliar para parsear montos desde strings
export const parseCurrency = (value: string): number => {
  return parseFloat(value.replace(/[^0-9,-]/g, '').replace(',', '.')) || 0
}
