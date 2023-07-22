import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { getAllCategories } from 'services/category.service'
import { ICategory, ICategoryContext } from 'types/category.types'

// Create a DriverContext
export const CategoriesContext = createContext<ICategoryContext>({
  categories: [],
  isLoading: false,
  getCategories: () => {},
  setCategories: () => {},
})

// Custom hook to access the DriverContext
export const useCategories = () => useContext(CategoriesContext)

// CategoryContext component that wraps your app
export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<ICategory[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getCategories = async () => {
    setIsLoading(true)
    const data = await getAllCategories()

    if (data.success) {
      setCategories([...data.data])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <CategoriesContext.Provider
      value={{ categories, isLoading, getCategories, setCategories }}
    >
      {children}
    </CategoriesContext.Provider>
  )
}
