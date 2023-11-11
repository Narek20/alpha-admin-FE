import { ICustomer, ICustomerContext } from 'types/customer.types'
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from 'react'
import { search } from 'services/customer.service'
import { IPagination } from 'types/product.types'
import { initialPagination } from './order.context'

// Create a DriverContext
export const CustomersContext = createContext<ICustomerContext>({
  customers: [],
  isLoading: false,
  searchKey: '',
  setSearchKey: () => {},
  pagination: initialPagination,
  getCustomers: () => {},
  setCustomers: () => {},
})

// Custom hook to access the DriverContext
export const useCustomers = () => useContext(CustomersContext)

// CustomersProvider component that wraps your app
export const CustomersProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<ICustomer[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchKey, setSearchKey] = useState('')

  const pagination = useRef<IPagination>(initialPagination)
  const abortControllerRef = useRef<AbortController | null>(null)

  const getCustomers = async () => {
    setIsLoading(true)

    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()

    const data = await search(
      searchKey,
      abortControllerRef.current,
      pagination.current,
    )

    if (data.success) {
      setCustomers([...data.data])
      if (data.pagination) {
        pagination.current = data.pagination
      }
    }

    setIsLoading(false)
  }

  useEffect(() => {
    pagination.current = initialPagination
    getCustomers()

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [searchKey])

  return (
    <CustomersContext.Provider
      value={{
        customers,
        isLoading,
        getCustomers,
        setCustomers,
        searchKey,
        setSearchKey,
        pagination: pagination.current,
      }}
    >
      {children}
    </CustomersContext.Provider>
  )
}
