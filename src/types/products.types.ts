export interface IProductsContext {
  products: ProductType[]
}

export type ProductType = {
  id: number
  title: string
  category: string
  brand: string
  img: string[]
  rating?: number
  updatedAt: string
  createdAt: string
  color: string
  sizes: string[]
  barcode: string
  quantity: number
  isBest?: boolean
}
