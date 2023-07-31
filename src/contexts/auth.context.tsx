import { FC, createContext, ReactNode, useEffect, useState } from 'react'
import { getSingleUser } from 'services/users.service'
import { IUser, IUserContext, UserStatus } from 'types/user.types'

// Create a AuthContext
export const AuthContext = createContext<IUserContext>({
  isLoggedIn: false,
  isLoading: false,
  userData: null,
  login: () => {},
  logout: () => {},
  getUserData: () => {},
  setUserData: () => {},
})

// AuthContext component that wraps your app
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<IUser | null>(null)

  const login = () => {
    setIsLoggedIn(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('token')
    setUserData(null)
  }

  const getUserData = async () => {
    setIsLoading(true)
    const data = await getSingleUser()

    if (data.success) {
      setUserData({
        ...data.data,
        isAdmin: data.data.status === UserStatus.ADMIN,
      })
      login()
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) getUserData()
    else setIsLoading(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        login,
        logout,
        userData,
        getUserData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
