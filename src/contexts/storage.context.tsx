import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { getAllStorageImports } from 'services/storage.service'
import { IStorage, IStorageContext } from 'types/storage.types'

// Create a StorageContext
export const StorageContext = createContext<IStorageContext>({
  storageImports: [],
  filters: {},
  isLoading: false,
  pagination: { count: 20, skip: 0, take: 10 },
  getStorageImports: () => {},
  setFilters: () => {},
  setStorageImports: () => {},
})

// Custom hook to access the StorageContext
export const useStorage = () => useContext(StorageContext)

// StorageProvider component that wraps your app
export const StorageProvider = ({ children }: { children: ReactNode }) => {
  const [storageImports, setStorageImports] = useState<IStorage[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<{
    count: number
    skip: number
    take: number
  }>({ count: 20, skip: 0, take: 10 })
  const [filters, setFilters] = useState<{
    [param: string]: string | string[] | number[]
  }>({ status: 'Նոր պատվեր' })

  const getStorageImports = async () => {
    setIsLoading(true)
    const data = await getAllStorageImports(filters)

    if (data.success) {
      setStorageImports([...data.data])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getStorageImports()
  }, [filters])

  return (
    <StorageContext.Provider
      value={{
        storageImports,
        isLoading,
        pagination,
        filters,
        setFilters,
        getStorageImports,
        setStorageImports,
      }}
    >
      {children}
    </StorageContext.Provider>
  )
}
