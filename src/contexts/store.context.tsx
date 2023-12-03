import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from 'react'
import localStorageKeys from '@utils/localStorageKeys'
import { IPagination } from 'types/product.types'
import { IStoreItem, IStoresContext } from 'types/store.types'
import { searchAllStoreItems } from 'services/store.service'
import { StoreTableColumns } from '@utils/store/constants'
import { PaymentMethods } from 'types/order.types'

export const initialPagination: IPagination = {
  count: 0,
  skip: 0,
  take: 10,
}

// Create a StoresContext
export const StoresContext = createContext<IStoresContext>({
  storeItems: [],
  filters: {},
  isLoading: false,
  pagination: initialPagination,
  tableColumns: [],
  getStoreItems: () => {},
  setFilters: () => {},
  setTableColumns: () => {},
  setStoreItems: () => {},
})

// Custom hook to access the StoresContext
export const useStores = () => useContext(StoresContext)

// StoresProvider component that wraps your app
export const StoresProvider = ({ children }: { children: ReactNode }) => {
  const [storeItems, setStoreItems] = useState<IStoreItem[] | []>([])
  const [tableColumns, setTableColumns] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [filters, setFilters] = useState<{
    [param: string]: string | string[] | number[]
  }>({})
  const pagination = useRef<IPagination>(initialPagination)

  // Use an AbortController to cancel previous requests
  const abortControllerRef = useRef<AbortController | null>(null)

  const getStoreItems = async () => {
    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()

    setIsLoading(true)
    const data = await searchAllStoreItems(
      { ...filters, ...pagination.current },
      abortControllerRef.current,
    )

    if (data.success) {
      if (data.pagination) {
        pagination.current = data.pagination
      }
      setStoreItems([...data.data])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    pagination.current.skip = 0
    pagination.current.count = 0
    getStoreItems()
    // getCounts()
  }, [filters])

  useEffect(() => {
    getStoreItems()
  }, [pagination])

  useEffect(() => {
    const tableColumns = localStorage.getItem(
      localStorageKeys.STORE_TABLE_COLUMNS,
    )

    if (tableColumns) {
      const columns = JSON.parse(tableColumns)

      setTableColumns(columns)
    } else {
      setTableColumns([...StoreTableColumns])
    }
  }, [])

  return (
    <StoresContext.Provider
      value={{
        storeItems,
        isLoading,
        pagination: pagination.current,
        filters,
        setFilters,
        getStoreItems,
        setStoreItems,
        setTableColumns,
        tableColumns,
      }}
    >
      {children}
    </StoresContext.Provider>
  )
}
