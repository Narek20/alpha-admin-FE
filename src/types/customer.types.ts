import { IOrder } from './order.types'

export interface ICustomerContext {
  customers: ICustomer[] | []
  isLoading: boolean
  getCustomers: () => void
}

export interface ICustomer {
  id: number
  fullName: string
  phone: string
  totalPrice: number
  totalQty: number
  orders: IOrder[]
}
