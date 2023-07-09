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
  sizes: string
  smSizes: string
  isBest?: boolean
  selectedSizes: string
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
  sizes: string[]
  smSizes: string[]
  purchasePrice: number
  clasp: string
  gender: string
  season: string
  weight: string
  shoesHeight: string
  country: string
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
  SM_SIZES = 'smSizes',
  PURCHASE_PRICE = 'purchasePrice',
  CLASP = 'clasp',
  SHOES_HEIGHT = 'shoesHeight',
}
