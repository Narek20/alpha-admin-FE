import { createContext, useContext, ReactNode } from 'react'
import { ToastType } from 'types/toast.types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Create a ToastContext
const ToastContext = createContext({
  showToast: (type: ToastType, message: string, options?: object) => {},
})

// Custom hook to access the ToastContext
export const useToast = () => useContext(ToastContext)

// ToastProvider component that wraps your app
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const showToast = (type: ToastType, message: string, options = {}) => {
    toast[type](message, {
      ...options,
      autoClose: 2000,
    })
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}
