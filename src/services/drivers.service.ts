import { axiosInstance } from './axios.service'
import { ICreateDriver, IDriver } from 'types/driver.types'
import { IResponse } from 'types/response.types'
import { DriverEndpoints } from 'types/endpoints.types'

export const getAllDrivers = async (params?: {
  [query: string]: string | string[] | number[]
}): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(DriverEndpoints.DRIVERS, { params })

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const createDriver = async (
  driverData: ICreateDriver
): Promise<IResponse> => {
  try {
    const data = await axiosInstance.post(
      DriverEndpoints.CREATE_DRIVER,
      driverData
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.response.data.message,
    }
  }
}

export const updateDriver = async (driverData: IDriver): Promise<IResponse> => {
  try {
    const data = await axiosInstance.put(
      DriverEndpoints.UPDATE_DRIVER + driverData.id,
      driverData
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const removeDriver = async (driverData: number): Promise<IResponse> => {
  try {
    const data = await axiosInstance.delete(
      DriverEndpoints.DELETE_DRIVER + driverData
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}
