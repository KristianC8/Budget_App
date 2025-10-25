import type { ReactNode } from 'react'
import { useIndexedDb } from '../hooks/useIndexedDB'
import { DBContext } from './dbContext'
import { dbService } from '../services/indexedDB.service'

export const DBProvider = ({ children }: { children: ReactNode }) => {
  const { isReady, error } = useIndexedDb(true)
  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Error al inicializar la base de datos: {error.message}
      </div>
    )
  }
  if (!isReady) {
    return <div style={{ padding: '20px' }}>Cargando base de datos...</div>
  }

  return (
    <DBContext.Provider value={{ dbService, isReady }}>
      {children}
    </DBContext.Provider>
  )
}
