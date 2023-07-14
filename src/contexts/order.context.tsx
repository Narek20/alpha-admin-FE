import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { IOrdersContext, OrderStatus, IOrder } from 'types/order.types'
import { getAllOrders } from 'services/orders.service'

// Create a OrdersContext
export const OrdersContext = createContext<IOrdersContext>({
  orders: [],
  filters: {},
  isLoading: false,
  pagination: { count: 20, skip: 0, take: 10 },
  getOrders: () => {},
  setFilters: () => {},
})

// Custom hook to access the OrdersContext
export const useOrders = () => useContext(OrdersContext)

// OrdersProvider component that wraps your app
export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<IOrder[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<{
    count: number
    skip: number
    take: number
  }>({ count: 20, skip: 0, take: 10 })
  const [filters, setFilters] = useState<{
    [param: string]: string | string[] | number[]
  }>({})

  const getOrders = async () => {
    const data = await getAllOrders(filters)

    if (data.success) {
      setOrders([...data.data])
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <OrdersContext.Provider
      value={{ orders, isLoading, pagination, filters, setFilters, getOrders }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
