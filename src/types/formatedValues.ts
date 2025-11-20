import type { BaseEntity } from './dataBase'

interface FormatAmount {
  symbol: string
  value: string
}

export interface FormatExpense extends BaseEntity {
  amount: FormatAmount
  category: string
}
