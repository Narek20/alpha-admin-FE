import { SetStateAction, Dispatch } from 'react'
import { IProduct } from './product.types'

export interface IOrdersContext {
  orders: IOrder[] | []
  isLoading: boolean
  pagination: {
    count: number
    take: number
    skip: number
  }
  filters: {
    [param: string]: string | string[] | number[]
  }
  getOrders: () => void
  setOrders: Dispatch<SetStateAction<IOrder[]>>
  setFilters: Dispatch<
    SetStateAction<{ [param: string]: string | string[] | number[] }>
  >
}

export interface IOrder {
  id: number
  fullName: string
  phone: string
  status: OrderStatus
  address: string
  quantity: number
  formattedDate: string
  orderProducts: Array<{ quantity: number; product: IProduct }>
  updatedAt: string
  createdAt: string
}

export enum OrderStatus {
  COMPLETED = 'Ավարտված է',
  RECEIVED = 'Ընդունված է',
  DELIVERY = 'Առաքվում է',
  PACKING = 'Փաթեթավորվում է',
  SPECIAL_ORDER = 'Հատուկ պատվեր',
  ISSUE = 'Խնդիր',
}

export enum OrderTableKeysType {
  ID = 'id',
  FULL_NAME = 'fullName',
  PHONE = 'phone',
  ADDRESS = 'address',
  CREATED_AT = 'createdAt',
  QUANTITY = 'quantity',
  STATUS = 'status',
  UPDATED_AT = 'updatedAt',
  FORMATTED_DATE = 'formattedDate',
}
