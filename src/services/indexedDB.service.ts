import type { StoreConfig, BaseEntity } from '../types/dataBase'
import { DB_NAME, DB_VERSION, STORES } from '../config/dataBase'
import { Logger } from '../utils/logger'
import { DEFAULT_CATEGORIES } from '../types/dataBase'

class IndexedDBService {
  private db: IDBDatabase | null = null
  private readonly dbName: string
  private readonly version: number
  private readonly stores: StoreConfig[]

  constructor(dbName: string, version: number, stores: StoreConfig[]) {
    this.dbName = dbName
    this.version = version
    this.stores = stores
  }

  //Inicializar Base de datos y crear stores
  async init(): Promise<IDBDatabase> {
    if (this.db) return this.db

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => {
        reject(new Error(`Error al abrir la base de datos: ${request.error}`))
      }

      request.onsuccess = () => {
        this.db = request.result
        Logger.info(`✅ Base de datos "${this.dbName}" inicializada`)
        resolve(this.db)
      }

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result
        const transaction = (event.target as IDBOpenDBRequest).transaction

        if (!transaction) {
          reject(new Error('Transaction is null'))
          return
        }

        Logger.info(
          `🔄 Actualizando  base de datos de v${event.oldVersion} a v${event.newVersion}`
        )

        this.stores.forEach((StoreConfig) => {
          if (!db.objectStoreNames.contains(StoreConfig.name)) {
            const store = db.createObjectStore(StoreConfig.name, {
              keyPath: StoreConfig.keyPath,
              autoIncrement: StoreConfig.autoIncrement
            })

            StoreConfig.indexes?.forEach((index) => {
              store.createIndex(index.name, index.keyPath, index.options)
            })

            Logger.info(`📦 Store creado: ${StoreConfig.name}`)

            if (StoreConfig.name === 'categories') {
              this.insertDefaultCategories(store)
            }
          }
        })
      }
    })
  }

  private insertDefaultCategories(store: IDBObjectStore): void {
    const now = new Date().toISOString()

    DEFAULT_CATEGORIES.forEach((cat) => {
      store.add({
        ...cat,
        createdAt: now,
        updatedAt: now
      })
    })

    Logger.info(
      `✨ ${DEFAULT_CATEGORIES.length} categorías por defecto insertadas`
    )
  }

  //Obtener todos los registros de un Store
  async getAll<T extends BaseEntity>(storeName: string): Promise<T[]> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result as T[])
      request.onerror = () => reject(request.error)
    })
  }

  //Obtener registro por ID
  async getById<T extends BaseEntity>(
    storeName: string,
    id: number
  ): Promise<T | undefined> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.get(id)

      request.onsuccess = () => resolve(request.result as T | undefined)
      request.onerror = () => reject(request.error)
    })
  }

  //Agregar un registro
  async add<T extends BaseEntity>(
    storeName: string,
    item: Omit<T, 'id'>
  ): Promise<number> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)

      const dataToAdd = {
        ...item,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      const request = store.add(dataToAdd)

      request.onsuccess = () => resolve(request.result as number)
      request.onerror = () => reject(request.error)
    })
  }

  // Actualizar un registro existente
  // Sobre carga de funciones TypeScript para que pueda decidir el tipo para update
  async update(
    storeName: string,
    id: number,
    field: string,
    update: number | string
  ): Promise<number>

  async update<T extends BaseEntity>(
    storeName: string,
    id: number,
    field: undefined,
    update: Partial<Omit<T, 'id'>>
  ): Promise<number>

  // Implementación
  async update<T extends BaseEntity>(
    storeName: string,
    id: number,
    field?: string,
    update?: number | string | Partial<Omit<T, 'id'>>
  ): Promise<number> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)

      const getRequest = store.get(id)

      getRequest.onsuccess = () => {
        const existingData = getRequest.result

        if (!existingData) {
          reject(new Error(`Record with id ${id} not found`))
          return
        }

        let updatedData = {}

        if (field) {
          updatedData = {
            ...existingData,
            [field]: update,
            id,
            updatedAt: new Date().toISOString()
          }
        } else {
          updatedData = {
            ...existingData,
            ...(update as Partial<Omit<T, 'id'>>),
            id,
            updatedAt: new Date().toISOString()
          }
        }

        const updateRequest = store.put(updatedData)

        updateRequest.onsuccess = () => resolve(id)
        updateRequest.onerror = () => reject(updateRequest.error)
      }

      getRequest.onerror = () => reject(getRequest.error)
    })
  }

  // Eliminar un registro
  async delete(storeName: string, id: number): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.delete(id)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  //Eliminar todos los registros de un store
  async clear(storeName: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  //Buscar por indice
  async getByIndex<T extends BaseEntity>(
    storeName: string,
    indexName: string,
    value: IDBValidKey
  ): Promise<T[]> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const index = store.index(indexName)
      const request = index.getAll(value)

      request.onsuccess = () => resolve(request.result as T[])
      request.onerror = () => reject(request.error)
    })
  }

  //Contar registros de un store
  async count(storeName: string): Promise<number> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.count()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  //Cerrar la conexion con la base de datos
  close(): void {
    if (this.db) {
      this.db.close()
      this.db = null
      Logger.info('🔒 Conexión a la base de datos cerrada')
    }
  }
}

export const dbService = new IndexedDBService(DB_NAME, DB_VERSION, STORES)
