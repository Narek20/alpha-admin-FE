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
  isLoading: false,
  getProducts: () => {},
  filterProducts: (params: {
    [query: string]: string | string[] | number[]
  }) => {},
})

// Custom hook to access the ProductsContext
export const useProducts = () => useContext(ProductsContext)

// ProductsProvider component that wraps your app
export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getProducts = async () => {
    setIsLoading(true)
    const data = await getAllProducts()
    setIsLoading(false)

    if (data.success) {
      setProducts([...data.data])
    }
  }

  const filterProducts = async (params: {
    [query: string]: string | string[] | number[]
  }) => {
    setIsLoading(true)
    const data = await getAllProducts(params)
    setIsLoading(false)

    if (data.success) {
      setProducts([...data.data])
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <ProductsContext.Provider
      value={{ products, isLoading, getProducts, filterProducts }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
