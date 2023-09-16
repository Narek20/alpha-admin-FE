import { SetStateAction, Dispatch } from 'react'
import { IPagination, IProduct } from './product.types'

export interface IOrdersContext {
  orders: IOrder[] | []
  isLoading: boolean
  pagination: IPagination
  filters: {
    [param: string]: string | string[] | number[]
  }
  tableColumns: string[]
  statusCounts: StatusCounts
  getOrders: () => void
  getCounts: () => void
  setOrders: Dispatch<SetStateAction<IOrder[]>>
  setTableColumns: Dispatch<SetStateAction<string[]>>
  setFilters: Dispatch<
    SetStateAction<{ [param: string]: string | string[] | number[] }>
  >
}

export interface IOrder {
  id: number
  fullName: string
  phone: string
  status: OrderStatus
  city: string
  address: string
  address2?: string
  quantity: number
  size?: string
  formattedDate: string
  orderProducts: orderProductType[]
  updatedAt: string
  createdAt: string
  productIDs?: Array<{ quantity: number; id: number; size?: string }>
  notes?: string
  driver?: string
  deliveryDate: string
  isSpecial?: boolean
  paymentMethod: PaymentMethods
}

export type StatusCounts = Array<{
  status: OrderStatus
  count: number
}>

export type orderProductType = {
  id: number
  quantity: number
  product: IProduct
  size?: string
  orderId?: number
}

export enum OrderStatus {
  COMPLETED = 'Ավարտված',
  RECEIVED = 'Նոր պատվեր',
  DELIVERY = 'Առաքվում է',
  PACKING = 'Փաթեթավորվում է',
  ISSUE = 'Խնդիր',
}

export enum PaymentMethods {
  PAID = 'Վճարված է',
  CASH = 'Կանխիկ',
  NON_CASH = 'Անկանխիկ',
}

export enum OrderTableKeysType {
  ID = 'id',
  FULL_NAME = 'fullName',
  PHONE = 'phone',
  CITY = 'city',
  ADDRESS = 'address',
  ADDRESS2 = 'address2',
  CREATED_AT = 'createdAt',
  QUANTITY = 'quantity',
  STATUS = 'status',
  UPDATED_AT = 'updatedAt',
  FORMATTED_DATE = 'formattedDate',
  NOTES = 'notes',
  SIZE = 'size',
  DRIVER = 'driver',
  DELIVERY_DATE = 'deliveryDate',
  IS_SPECIAL = 'isSpecial',
  PAYMENT_METHOD = 'paymentMethod',
}
