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
  name: string
  phone: string
  status: UserStatus
}

export enum UserStatus {
  ADMIN = 'admin',
  USER = 'user',
}
