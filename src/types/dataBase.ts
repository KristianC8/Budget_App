export interface BaseEntity {
  id: number
  createdAt?: string
  updatedAt?: string
}

export interface Expense extends BaseEntity {
  amount: number
  category: string
}

export interface Category extends BaseEntity {
  name: string
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
