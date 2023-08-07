import { Dispatch, SetStateAction } from 'react'
export interface IUserContext {
  isLoggedIn: boolean
  isLoading: boolean
  login: () => void
  logout: () => void
  getUserData: () => void
  userData: IUser | null
  setUserData: Dispatch<SetStateAction<IUser | null>>
}

export type IUser = {
  id: number
  fullName: string
  login: string
  password: string
  status: UserStatus
  isAdmin: boolean
}

export enum UserStatus {
  ADMIN = 'admin',
  USER = 'user',
  MANAGER = 'manager',
}
