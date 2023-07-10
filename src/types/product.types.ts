import { Dispatch, SetStateAction } from "react";

export interface IProductsContext {
  products: IProduct[] | []
  isLoading: boolean
  pagination: {
    count: number,
    take: number,
    skip: number
  }
  filters: {
    [param: string]: string | string[] | number[]
  }
  getProducts: () => void
  setFilters: Dispatch<SetStateAction<{ [param: string]: string | string[] | number[]; }>>
}

export type Sizes = {
  size: string
  smSize?: string
  quantity?: number
}

export interface IProduct {
  id: number
  title: string
  category: string
  brand: string
  images: string[]
  rating?: number
  updatedAt: string
  createdAt: string
  price: number
  color?: string
  sizes?: Sizes[]
  isBest?: boolean
  salePrice: number
  fastenerType: string
  sex: string
  season: string
  weight: string
  shoesHeight: string
  country: string
}

export type ICreateProduct = {
  title: string
  category: string
  brand: string
  price: number
  color?: string
  sizes: Sizes[]
  purchasePrice: number
  clasp: string
  gender: string
  season: string
  weight: string
  shoesHeight: string
  country: string
  images: Array<string | File>
}

export enum ProductKeys {
  GENDER = 'gender',
  TITLE = 'title',
  BRAND = 'brand',
  PRICE = 'price',
  COLOR = 'color',
  SIZES = 'sizes',
  SEASON = 'season',
  WEIGHT = 'weight',
  COUNTRY = 'country',
  CATEGORY = 'category',
  PURCHASE_PRICE = 'purchasePrice',
  CLASP = 'clasp',
  SHOES_HEIGHT = 'shoesHeight',
}
