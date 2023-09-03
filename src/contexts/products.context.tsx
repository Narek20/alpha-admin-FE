import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from 'react'
import { IPagination, IProduct, IProductsContext } from 'types/product.types'
import { search } from 'services/products.service'

const initialPagination = {
  count: 0,
  skip: 0,
  take: 10,
}

// Create a ProductsContext
export const ProductsContext = createContext<IProductsContext>({
  products: [],
  isLoading: false,
  pagination: initialPagination,
  getProducts: () => {},
  setProducts: () => {},
  filters: {},
  setFilters: () => {},
})

// Custom hook to access the ProductsContext
export const useProducts = () => useContext(ProductsContext)

// ProductsProvider component that wraps your app
// ... (imports remain the same)

// ProductsProvider component that wraps your app
export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const pagination = useRef<IPagination>(initialPagination)
  const [filters, setFilters] = useState<{
    [param: string]: string | string[] | number[]
  }>({})

  // Use an AbortController to cancel previous requests
  const abortControllerRef = useRef<AbortController | null>(null)

  const getProducts = async () => {
    setIsLoading(true)
    if (abortControllerRef.current) {
      // If there's an existing request, abort it before making a new one
      abortControllerRef.current.abort()
    }

    const abortController = new AbortController()
    abortControllerRef.current = abortController

    const searchKey = Object.values(filters).join(' ')

    const data = await search(
      searchKey,
      abortController,
      filters.category as string,
      pagination.current,
    )

    if (data.success) {
      setProducts(data.data)
      if (data.pagination) {
        pagination.current = data.pagination
      }
    }

    setIsLoading(false)
  }

  useEffect(() => {
    pagination.current = initialPagination
    getProducts()

    // Cleanup function to abort the request if the component unmounts or the filters change
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [filters])

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        filters,
        pagination: pagination.current,
        getProducts,
        setFilters,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
