import { axiosInstance } from './axios.service'
import { IResponse } from 'types/response.types'
import { IUser } from 'types/user.types'
import { UsersEndpoints } from 'types/endpoints.types'

export const getAllUsers = async (params?: {
  [query: string]: string | string[] | number[]
}): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(UsersEndpoints.USERS, { params })

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const getSingleUser = async (): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(UsersEndpoints.GET_ONE)

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const getUserByPhoneNumber = async (phone: string): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(UsersEndpoints.USERS + phone)

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const verifyPhone = async (phoneNumber: string): Promise<IResponse> => {
  try {
    const data = await axiosInstance.post(UsersEndpoints.USER_VERIFY, {
      phone: phoneNumber,
    })

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const createUser = async (userData: {
  phone: string
  fullName: string
}): Promise<IResponse> => {
  try {
    const data = await axiosInstance.post(UsersEndpoints.CREATE_USER, userData)

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.response.data.message,
    }
  }
}

export const updateUser = async (userData: IUser): Promise<IResponse> => {
  try {
    const data = await axiosInstance.put(
      UsersEndpoints.UPDATE_USER + userData.id,
      userData
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const removeUser = async (userData: number): Promise<IResponse> => {
  try {
    const data = await axiosInstance.delete(
      UsersEndpoints.DELETE_USER + userData
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}
