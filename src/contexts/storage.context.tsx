import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { getAllStorageImports, getAllStorages } from 'services/storage.service'
import { IStorage, IStorageContext, IStorageImport } from 'types/storage.types'

// Create a StorageContext
export const StorageContext = createContext<IStorageContext>({
  storageImports: [],
  storages: [],
  isLoading: false,
  pagination: { count: 20, skip: 0, take: 10 },
  getStorageImports: () => {},
  setStorageImports: () => {},
})

// Custom hook to access the StorageContext
export const useStorage = () => useContext(StorageContext)

// StorageProvider component that wraps your app
export const StorageProvider = ({ children }: { children: ReactNode }) => {
  const [storageImports, setStorageImports] = useState<IStorageImport[]>([])
  const [storages, setStorages] = useState<IStorage[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<{
    count: number
    skip: number
    take: number
  }>({ count: 20, skip: 0, take: 10 })

  const getStorageImports = async () => {
    setIsLoading(true)
    const data = await getAllStorageImports()

    if (data.success) {
      setStorageImports([...data.data])
    }
    setIsLoading(false)
  }

  const getStorages = async () => {
    const data = await getAllStorages()

    if (data.success) {
      setStorages(data.data)
    }
  }

  useEffect(() => {
    getStorageImports()
    getStorages()
  }, [])

  return (
    <StorageContext.Provider
      value={{
        storageImports,
        isLoading,
        storages,
        pagination,
        getStorageImports,
        setStorageImports,
      }}
    >
      {children}
    </StorageContext.Provider>
  )
}
