import { ICustomer, ICustomerContext } from 'types/customer.types'
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { getAllCustomers } from 'services/customer.service'

// Create a DriverContext
export const CustomersContext = createContext<ICustomerContext>({
  customers: [],
  isLoading: false,
  getCustomers: () => {},
})

// Custom hook to access the DriverContext
export const useCustomers = () => useContext(CustomersContext)

// CustomersProvider component that wraps your app
export const CustomersProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<ICustomer[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getCustomers = async () => {
    setIsLoading(true)
    const data = await getAllCustomers()

    if (data.success) {
      setCustomers([...data.data])
    }
    
    setIsLoading(false)
  }

  useEffect(() => {
    getCustomers()
  }, [])

  return (
    <CustomersContext.Provider value={{ customers, isLoading, getCustomers }}>
      {children}
    </CustomersContext.Provider>
  )
}
