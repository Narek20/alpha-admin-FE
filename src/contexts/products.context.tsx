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
  pagination: { count: 20, skip: 0, take: 10 },
  getProducts: () => {},
  filters: {},
  setFilters: () => {},
})

// Custom hook to access the ProductsContext
export const useProducts = () => useContext(ProductsContext)

// ProductsProvider component that wraps your app
export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<{
    count: number
    skip: number
    take: number
  }>({ count: 20, skip: 0, take: 10 })
  const [filters, setFilters] = useState<{
    [param: string]: string | string[] | number[]
  }>({})

  const getProducts = async () => {
    setIsLoading(true)
    const data = await getAllProducts(filters)
    setIsLoading(false)

    if (data.success) {
      setProducts([...data.data])
      setPagination(data.pagination || pagination)
    }
  }

  useEffect(() => {
    getProducts()
  }, [filters])

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        filters,
        pagination,
        getProducts,
        setFilters,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
