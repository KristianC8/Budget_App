export interface BaseEntity {
  id: number
  createdAt?: string
  updatedAt?: string
}

export interface Expense extends BaseEntity {
  amount: number
  category: string
  description: string
}

export interface Category extends BaseEntity {
  name: string
}

interface Discount {
  name: string
  amount: number
}

export interface Income extends BaseEntity {
  name: string
  amount: number
  discounts: Discount[]
}

// Configuración de stores
export interface StoreConfig {
  name: string
  keyPath: string
  autoIncrement: boolean
  indexes?: {
    name: string
    keyPath: string | string[]
    options?: IDBIndexParameters
  }[]
}

// Errores
export interface Errors {
  add: string | null
  delete: string | null
  update: string | null
  read: string | null
}

export const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Mercado' },
  { id: 2, name: 'Transporte' },
  { id: 3, name: 'Farmacia' },
  { id: 4, name: 'Servicios' },
  { id: 5, name: 'Suscripciones' },
  { id: 6, name: 'Otros' }
]
