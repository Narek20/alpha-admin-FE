import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from 'react'
import {
  IOrdersContext,
  IOrder,
  StatusCounts,
} from 'types/order.types'
import { getAllOrders, searchAllOrders } from 'services/orders.service'
import localStorageKeys from '@utils/localStorageKeys'
import { OrderTableColumns } from '@utils/order/constants'

// Create a OrdersContext
export const OrdersContext = createContext<IOrdersContext>({
  orders: [],
  filters: {},
  isLoading: false,
  pagination: { count: 20, skip: 0, take: 10 },
  tableColumns: [],
  statusCounts: [],
  getOrders: () => {},
  searchOrders: (search) => {},
  setFilters: () => {},
  setTableColumns: () => {},
  setOrders: () => {},
})

// Custom hook to access the OrdersContext
export const useOrders = () => useContext(OrdersContext)

// OrdersProvider component that wraps your app
export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<IOrder[] | []>([])
  const [tableColumns, setTableColumns] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<{
    count: number
    skip: number
    take: number
  }>({ count: 20, skip: 0, take: 10 })
  const [statusCounts, setStatusCounts] = useState<StatusCounts>([])
  const [filters, setFilters] = useState<{
    [param: string]: string | string[] | number[]
  }>({ status: 'Բոլորը' })

  // Use an AbortController to cancel previous requests
  const abortControllerRef = useRef<AbortController | null>(null)

  const getOrders = async () => {
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    setIsLoading(true)
    const data = await getAllOrders(filters, abortController)

    if (data.success) {
      setOrders([...data.data])
    }
    setIsLoading(false)
  }

  const searchOrders = async (searchTerms?: string) => {
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    setIsLoading(true)
    const data = await searchAllOrders(searchTerms, filters, abortController)

    if (data.success) {
      setOrders([...data.data])

      if (data.statusCounts) {
        setStatusCounts(data.statusCounts)
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    searchOrders()
  }, [filters])

  useEffect(() => {
    const tableColumns = localStorage.getItem(localStorageKeys.TABLE_COLUMNS)
    if (tableColumns) {
      const columns = JSON.parse(tableColumns)

      setTableColumns(columns)
    } else {
      setTableColumns([...OrderTableColumns])
    }
  }, [])

  return (
    <OrdersContext.Provider
      value={{
        orders,
        isLoading,
        pagination,
        filters,
        statusCounts,
        setFilters,
        getOrders,
        searchOrders,
        setOrders,
        setTableColumns,
        tableColumns,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
