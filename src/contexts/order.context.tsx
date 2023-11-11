import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from 'react'
import { IOrdersContext, IOrder, StatusCounts } from 'types/order.types'
import { getOrderCounts, searchAllOrders } from 'services/orders.service'
import localStorageKeys from '@utils/localStorageKeys'
import { OrderTableColumns } from '@utils/order/constants'
import { IPagination } from 'types/product.types'

export const initialPagination: IPagination = {
  count: 0,
  skip: 0,
  take: 2,
}

// Create a OrdersContext
export const OrdersContext = createContext<IOrdersContext>({
  orders: [],
  filters: {},
  isLoading: false,
  pagination: initialPagination,
  tableColumns: [],
  statusCounts: [],
  getOrders: () => {},
  getCounts: () => {},
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
  const [statusCounts, setStatusCounts] = useState<StatusCounts>([])
  const [filters, setFilters] = useState<{
    [param: string]: string | string[] | number[]
  }>({})
  const pagination = useRef<IPagination>(initialPagination)

  // Use an AbortController to cancel previous requests
  const abortControllerRef = useRef<AbortController | null>(null)

  const getOrders = async () => {
    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()

    setIsLoading(true)
    const data = await searchAllOrders(
      { ...filters, ...pagination.current },
      abortControllerRef.current,
    )

    if (data.success) {
      if (data.pagination) {
        pagination.current = data.pagination
      }
      setOrders([...data.data])
    }
    setIsLoading(false)
  }

  const getCounts = async () => {
    const data = await getOrderCounts()

    if (data.success) {
      setStatusCounts(data.data)
    }
  }

  useEffect(() => {
    getCounts()
  }, [])

  useEffect(() => {
    pagination.current.skip = 0
    pagination.current.count = 0
    getOrders()
    // getCounts()
  }, [filters])

  useEffect(() => {
    getOrders()
  }, [pagination])

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
        pagination: pagination.current,
        filters,
        statusCounts,
        setFilters,
        getOrders,
        getCounts,
        setOrders,
        setTableColumns,
        tableColumns,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
