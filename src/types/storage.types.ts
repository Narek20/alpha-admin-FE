import { SetStateAction, Dispatch } from 'react'
import { IProduct } from './product.types'
import { IUser } from './user.types'

export interface IStorageContext {
  storageImports: IStorageImport[]
  storages: IStorage[]
  isLoading: boolean
  pagination: {
    count: number
    take: number
    skip: number
  }
  getStorageImports: () => void
  setStorageImports: Dispatch<SetStateAction<IStorageImport[]>>
}

export interface IStorage {
  id: number
  title: string
}

export interface IStorageImport {
  id: number
  title: string
  user: IUser,
  importDate: string
  quantity: number,
  size: string,
  product: string
  products: IProduct[]
  productIDs: Array<{ quantity: number; id: number; size?: string }>
}

export enum StorageKeys {
  ID = 'id',
  TITLE = 'title',
  PRODUCT = 'product',
  IMPORT_DATE = 'importDate',
  USER = 'user',
  SIZE = 'size',
  QUANTITY = 'quantity'
}
