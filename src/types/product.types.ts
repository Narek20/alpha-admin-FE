import { Dispatch, SetStateAction } from 'react'
import { ICategory } from './category.types'

export interface IProductsContext {
  products: IProduct[] | []
  isLoading: boolean
  pagination: {
    count: number
    take: number
    skip: number
  }
  filters: {
    [param: string]: string | string[] | number[]
  }
  getProducts: () => void
  setFilters: Dispatch<
    SetStateAction<{ [param: string]: string | string[] | number[] }>
  >
}

export type Sizes = {
  size: string
  smSize?: string
  quantity?: number
}

export enum AdditionalDetailsKeys {
  BRAND = 'brand',
  COUNTRY = 'country',
  COLOR = 'color',
  PRICE = 'price',
  PURCHASE_PRICE = 'purchasePrice',
}

export type ProductAdditionalInfo = {
  title: string
  value: string
}

export interface IProduct {
  id: number
  title: string
  category: ICategory
  brand: string
  images: string[]
  rating?: number
  updatedAt: string
  createdAt: string
  price: number
  color?: string
  sizes?: Sizes[]
  isBest?: boolean
  purchasePrice: number
  country?: string
  notes?: string
  additionalInfo?: ProductAdditionalInfo[]
}

export type ICreateProduct = {
  title: string
  category: string
  brand: string
  price: number
  color?: string
  sizes: Sizes[]
  purchasePrice: number
  country: string
  images: Array<string | File>
  notes?: string
  additionalInfo: ProductAdditionalInfo[]
}

export enum ProductKeys {
  TITLE = 'title',
  BRAND = 'brand',
  PRICE = 'price',
  COLOR = 'color',
  SIZES = 'sizes',
  COUNTRY = 'country',
  CATEGORY = 'category',
  PURCHASE_PRICE = 'purchasePrice',
  NOTES = 'notes',
  ADDITIONAL_INFO = 'additionalInfo',
}
