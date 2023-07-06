import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { IProduct, IProductsContext } from 'types/product.types'
import { getAllProducts } from 'services/products.service'

// Create a ProductsContext
export const ProductsContext = createContext<IProductsContext>({
  products: [],
  getProducts: () => {}
})

// Custom hook to access the ProductsContext
export const useProducts = () => useContext(ProductsContext)

// ProductsProvider component that wraps your app
export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[] | []>([])

  const getProducts = async () => {
    const data = await getAllProducts()

    if (data.success) {
      setProducts(data.data)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <ProductsContext.Provider value={{ products, getProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}
