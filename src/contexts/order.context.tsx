import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import koshik from '@assets/images/koshik.jpg'
import { IOrdersContext, OrderStatus, OrderType } from 'types/order.types'

// Create a OrdersContext
export const OrdersContext = createContext<IOrdersContext>({
  orders: [],
})

// Custom hook to access the OrdersContext
export const useOrders = () => useContext(OrdersContext)

// OrdersProvider component that wraps your app
export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<OrderType[] | []>([])

  useEffect(() => {
    setOrders([
      {
        id: 1,
        title: 'Կայֆոտ կոշիկ1',
        category: 'Կոշիկ',
        brand: 'Alpha',
        updatedAt: '23.06.23',
        createdAt: '23.06.23',
        color: 'black',
        img: koshik,
        isDrafted: false,
        size: '12',
        status: OrderStatus.COMPLETED,
        address: 'Մեհրաբ',
        quantity: 12,
        customer_phone: '+37477810019',
        customer_name: 'Narek Hovhannisyan',
        storage: 'Երևան',
        price: '1000',
      },
      {
        id: 2,
        title: 'Կայֆոտ կոշիկ2',
        category: 'Կոշիկ',
        brand: 'Alpha',
        updatedAt: '23.06.23',
        createdAt: '23.06.23',
        color: 'black',
        img: koshik,
        isDrafted: false,
        size: '12',
        status: OrderStatus.CANCELED,
        address: 'Մեհրաբ',
        quantity: 12,
        customer_phone: '+37477810019',
        customer_name: 'Narek Hovhannisyan',
        storage: 'Երևան',
        price: '1000',
      },
      {
        id: 3,
        title: 'Կայֆոտ կոշիկ3',
        category: 'Կոշիկ',
        brand: 'Alpha',
        updatedAt: '23.06.23',
        createdAt: '23.06.23',
        color: 'black',
        img: koshik,
        isDrafted: false,
        size: '12',
        status: OrderStatus.DELIVERY,
        address: 'Մեհրաբ',
        quantity: 12,
        customer_phone: '+37477810019',
        customer_name: 'Narek Hovhannisyan',
        storage: 'Երևան',
        price: '1000',
      },
      {
        id: 4,
        title: 'Կայֆոտ կոշիկ4',
        category: 'Կոշիկ',
        brand: 'Alpha',
        updatedAt: '23.06.23',
        createdAt: '23.06.23',
        color: 'black',
        img: koshik,
        isDrafted: false,
        size: '12',
        status: OrderStatus.COMPLETED,
        address: 'Մեհրաբ',
        quantity: 12,
        customer_phone: '+37477810019',
        customer_name: 'Narek Hovhannisyan',
        storage: 'Երևան',
        price: '1000',
      },
      {
        id: 5,
        title: 'Կայֆոտ կոշիկ5',
        category: 'Կոշիկ',
        brand: 'Alpha',
        updatedAt: '23.06.23',
        createdAt: '23.06.23',
        color: 'black',
        img: koshik,
        isDrafted: false,
        size: '12',
        status: OrderStatus.PENDING,
        address: 'Մեհրաբ',
        quantity: 12,
        customer_phone: '+37477810019',
        customer_name: 'Narek Hovhannisyan',
        storage: 'Երևան',
        price: '1000',
      },
      {
        id: 6,
        title: 'Կայֆոտ կոշիկ6',
        category: 'Կոշիկ',
        brand: 'Alpha',
        updatedAt: '23.06.23',
        createdAt: '23.06.23',
        color: 'black',
        img: koshik,
        isDrafted: false,
        size: '12',
        status: OrderStatus.COMPLETED,
        address: 'Մեհրաբ',
        quantity: 12,
        customer_phone: '+37477810019',
        customer_name: 'Narek Hovhannisyan',
        storage: 'Երևան',
        price: '1000',
      },
      {
        id: 7,
        title: 'Կայֆոտ կոշիկ7',
        category: 'Կոշիկ',
        brand: 'Alpha',
        updatedAt: '23.06.23',
        createdAt: '23.06.23',
        color: 'black',
        img: koshik,
        isDrafted: false,
        size: '12',
        status: OrderStatus.PACKING,
        address: 'Մեհրաբ',
        quantity: 12,
        customer_phone: '+37477810019',
        customer_name: 'Narek Hovhannisyan',
        storage: 'Երևան',
        price: '1000',
      },
    ])
  }, [])

  return (
    <OrdersContext.Provider value={{ orders }}>
      {children}
    </OrdersContext.Provider>
  )
}
