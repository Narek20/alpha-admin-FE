import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { getAllDrivers } from 'services/drivers.service'
import { IDriverContext, IDriver } from 'types/driver.types'

// Create a DriverContext
export const DriversContext = createContext<IDriverContext>({
  drivers: [],
  isLoading: false,
  getDrivers: () => {},
  setDrivers: () => {},
})

// Custom hook to access the DriverContext
export const useDrivers = () => useContext(DriversContext)

// DriversProvider component that wraps your app
export const DriversProvider = ({ children }: { children: ReactNode }) => {
  const [drivers, setDrivers] = useState<IDriver[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getDrivers = async () => {
    setIsLoading(true)
    const data = await getAllDrivers()

    if (data.success) {
      setDrivers([...data.data])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getDrivers()
  }, [])

  return (
    <DriversContext.Provider
      value={{ drivers, isLoading, getDrivers, setDrivers }}
    >
      {children}
    </DriversContext.Provider>
  )
}
