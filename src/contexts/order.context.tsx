import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { IOrdersContext, IOrder } from 'types/order.types'
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
  const [filters, setFilters] = useState<{
    [param: string]: string | string[] | number[]
  }>({ status: 'Նոր պատվեր' })

  const getOrders = async () => {
    setIsLoading(true)
    const data = await getAllOrders(filters)

    if (data.success) {
      setOrders([...data.data])
    }
    setIsLoading(false)
  }

  const searchOrders = async (searchTerms: string) => {
    setIsLoading(true)
    const data = await searchAllOrders(searchTerms)

    if (data.success) {
      setOrders([...data.data])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getOrders()
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
