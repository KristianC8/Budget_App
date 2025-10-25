import { createContext } from 'react'
import { dbService } from '../services/indexedDB.service'

export interface DBContextType {
  dbService: typeof dbService
  isReady: boolean
}

export const DBContext = createContext<DBContextType | null>(null)
