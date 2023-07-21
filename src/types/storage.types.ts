import { SetStateAction, Dispatch } from 'react'
import { IProduct } from './product.types'

export interface IStorageContext {
  storageImports: IStorage[] | []
  isLoading: boolean
  pagination: {
    count: number
    take: number
    skip: number
  }
  filters: {
    [param: string]: string | string[] | number[]
  }
  getStorageImports: () => void
  setStorageImports: Dispatch<SetStateAction<IStorage[]>>
  setFilters: Dispatch<
    SetStateAction<{ [param: string]: string | string[] | number[] }>
  >
}

export interface IStorage {
  id: number
  storage: string
  importDate: string
  products?: IProduct[]
  productIDs?: Array<{ quantity: number; id: number; size?: string }>
}

export enum StorageKeys {
  ID = 'id',
  STORAGE = 'storage',
  IMPORT_DATE = 'importDate',
}
