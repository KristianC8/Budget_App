import { useState, useEffect } from 'react'
import { dbService } from '../services/indexedDB.service'
import { Logger } from '../utils/Logger'

export const useIndexedDb = () => {
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        await dbService.init()
        setIsReady(true)
      } catch (error) {
        setError(error as Error)
        Logger.error('Error initializing database:', error)
      }
    }

    init()

    return () => {
      dbService.close()
    }
  }, [])

  return { isReady, error }
}
