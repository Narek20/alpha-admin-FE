import { Dispatch, SetStateAction } from 'react'
import { IOrder } from './order.types'

export interface ICustomerContext {
  customers: ICustomer[] | []
  isLoading: boolean
  getCustomers: () => void
  setCustomers: Dispatch<SetStateAction<ICustomer[]>>
}

export interface ICustomer {
  id: number
  fullName: string
  phone: string
  address?: string
  address2?: string
  notes?: string
  notes2?: string
  cashback?: string
  cashback_money?: string
  totalPrice: number
  totalQty: number
  orders: IOrder[]
}

export enum CustomerInfoKeys {
  FULL_NAME = 'fullName',
  PHONE = 'phone',
  ADDRESS = 'address',
  ADDRESS2 = 'address2',
  CASHBACK = 'cashback',
  CASHBACK_MONEY = 'cashback_money',
  NOTES = 'notes',
  NOTES2 = 'notes2',
  TOTAL_PRICE = 'totalPrice',
  TOTAL_QTY = 'totalQty',
}
