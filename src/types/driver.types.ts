import { Dispatch, SetStateAction } from 'react'

export interface IDriverContext {
  drivers: IDriver[] | []
  isLoading: boolean
  getDrivers: () => void
  setDrivers: Dispatch<SetStateAction<IDriver[]>>
}

export interface IDriver {
  id: string
  fullName: string
  phone: string
  status: DriverStatus
  direction: string
}

export interface ICreateDriver {
  fullName: string
  phone: string
  direction: string
}

export enum DriverKeys {
  FULL_NAME = 'fullName',
  PHONE = 'phone',
  DIRECTION = 'direction',
}

export enum DriverStatus {
  FREE = 'Ազատ է',
  DELIVERY = 'Զբաղված է',
}
