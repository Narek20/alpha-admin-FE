import { ProductType, IProductsContext } from 'types/products.types'
import { createContext, useContext, ReactNode, useState } from 'react'
import koshik from '@assets/images/koshik.jpg'

// Create a ProductsContext
export const ProductsContext = createContext<IProductsContext>({
  products: [],
})

// Custom hook to access the ProductsContext
export const useProducts = () => useContext(ProductsContext)

// ProductsProvider component that wraps your app
export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductType[] | []>([
    {
      id: 1,
      title: 'Կայֆոտ կոշիկ',
      category: 'Կաշիկ',
      brand: 'Alpha',
      updatedAt: '23.06.23',
      createdAt: '23.06.23',
      color: 'black',
      img: [koshik, koshik, koshik],
      sizes: ['46', '47', '48'],
      barcode: '2334524235',
      quantity: 12,
    },
    {
      id: 1,
      title: 'Կայֆոտ կոշիկ',
      category: 'Կաշիկ',
      brand: 'Alpha',
      updatedAt: '23.06.23',
      createdAt: '23.06.23',
      color: 'black',
      img: [koshik],
      sizes: ['46', '47', '48'],
      barcode: '2334524235',
      quantity: 12,
    },
    {
      id: 1,
      title: 'Կայֆոտ կոշիկ',
      category: 'Կաշիկ',
      brand: 'Alpha',
      updatedAt: '23.06.23',
      createdAt: '23.06.23',
      color: 'black',
      img: [koshik],
      sizes: ['46', '47', '48'],
      barcode: '2334524235',
      quantity: 12,
    },
    {
      id: 1,
      title: 'Կայֆոտ կոշիկ',
      category: 'Կաշիկ',
      brand: 'Alpha',
      updatedAt: '23.06.23',
      createdAt: '23.06.23',
      color: 'black',
      img: [koshik],
      sizes: ['46', '47', '48'],
      barcode: '2334524235',
      quantity: 12,
    },
    {
      id: 1,
      title: 'Կայֆոտ կոշիկ',
      category: 'Կաշիկ',
      brand: 'Alpha',
      updatedAt: '23.06.23',
      createdAt: '23.06.23',
      color: 'black',
      img: [koshik, koshik],
      sizes: ['46', '47', '48'],
      barcode: '2334524235',
      quantity: 12,
    },
    {
      id: 1,
      title: 'Կայֆոտ կոշիկ',
      category: 'Կաշիկ',
      brand: 'Alpha',
      updatedAt: '23.06.23',
      createdAt: '23.06.23',
      color: 'black',
      img: [koshik],
      sizes: ['46', '47', '48'],
      barcode: '2334524235',
      quantity: 12,
    },
    {
      id: 2,
      title: 'Կայֆոտ կոշիկ',
      category: 'Կաշիկ',
      brand: 'Alpha',
      updatedAt: '23.06.23',
      createdAt: '23.06.23',
      color: 'black',
      img: [koshik],
      sizes: ['46', '47', '48'],
      barcode: '2334524235',
      quantity: 12,
    },
    {
      id: 3,
      title: 'Կայֆոտ կոշիկ',
      category: 'Կաշիկ',
      brand: 'Alpha',
      updatedAt: '23.06.23',
      createdAt: '23.06.23',
      color: 'black',
      img: [koshik],
      sizes: ['46', '47', '48'],
      barcode: '2334524235',
      quantity: 12,
    },
    {
      id: 4,
      title: 'Կայֆոտ կոշիկ',
      category: 'Կաշիկ',
      brand: 'Alpha',
      updatedAt: '23.06.23',
      createdAt: '23.06.23',
      color: 'black',
      img: [koshik],
      sizes: ['46', '47', '48'],
      barcode: '2334524235',
      quantity: 12,
    },
    {
      id: 5,
      title: 'Կայֆոտ կոշիկ',
      category: 'Կաշիկ',
      brand: 'Alpha',
      updatedAt: '23.06.23',
      createdAt: '23.06.23',
      color: 'black',
      img: [koshik],
      sizes: ['46', '47', '48'],
      barcode: '2334524235',
      quantity: 12,
    },
  ])

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  )
}
