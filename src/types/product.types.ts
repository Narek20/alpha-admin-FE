export interface IProductsContext {
  products: IProduct[] | []
  isLoading: boolean
  getProducts: () => void
  filterProducts: (params: {
    [query: string]: string | string[] | number[]
  }) => void
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
  sizes: string[] | string
  isBest?: boolean
}

export type ICreateProduct = {
  title: string
  category: string
  brand: string
  price: number
  color?: string
  sizes: string[] | string
}

export enum ProductKeys {
  TITLE = 'title',
  CATEGORY = 'category',
  BRAND = 'brand',
  PRICE = 'price',
  COLOR = 'color',
  SIZES = 'sizes',
}
