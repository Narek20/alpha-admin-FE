import { SetStateAction, Dispatch } from 'react'
import { IPagination, IProduct } from './product.types'

export interface IStoresContext {
  storeItems: IStoreItem[] | []
  isLoading: boolean
  pagination: IPagination
  filters: {
    [param: string]: string | string[] | number[]
  }
  tableColumns: string[]
  getStoreItems: () => void
  setStoreItems: Dispatch<SetStateAction<IStoreItem[]>>
  setTableColumns: Dispatch<SetStateAction<string[]>>
  setFilters: Dispatch<
    SetStateAction<{ [param: string]: string | string[] | number[] }>
  >
}

export interface IStoreItem {
  id: number
  fullName: string
  phone: string
  address?: string
  address2?: string
  quantity?: number
  size?: string
  specialPrice?: number
  storeProducts?: StoreProductType[]
  updatedAt: string
  createdAt: string
  productIDs?: Array<{ quantity: number; id: number; size?: string }>
  notes?: string
  isSpecial?: boolean
  paymentMethod: PaymentMethods
}

export type StoreProductType = {
  id: number
  quantity: number
  product: IProduct
  size?: string
  storeId?: number
}

export enum PaymentMethods {
  PAID = 'Վճարված է',
  CASH = 'Կանխիկ',
  NON_CASH = 'Անկանխիկ',
}

export enum StoreTableKeysType {
  ID = 'id',
  FULL_NAME = 'fullName',
  PHONE = 'phone',
  ADDRESS = 'address',
  ADDRESS2 = 'address2',
  CREATED_AT = 'createdAt',
  QUANTITY = 'quantity',
  UPDATED_AT = 'updatedAt',
  NOTES = 'notes',
  SIZE = 'size',
  IS_SPECIAL = 'isSpecial',
  PAYMENT_METHOD = 'paymentMethod',
}
