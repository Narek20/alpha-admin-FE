import { SetStateAction, Dispatch } from 'react'
import { IProduct } from './product.types'

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
  importDate: string
  product: string
  products: IProduct[]
  productIDs: Array<{ quantity: number; id: number; size?: string }>
}

export enum StorageKeys {
  ID = 'id',
  TITLE = 'title',
  PRODUCT = 'product',
  IMPORT_DATE = 'importDate',
}
