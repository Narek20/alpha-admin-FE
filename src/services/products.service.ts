import { axiosInstance } from './axios.service'
import { ICreateProduct, IProduct } from 'types/product.types'
import { IResponse } from 'types/response.types'
import { ProductEndpoints } from 'types/endpoints.types'

export const getAllProducts = async (params?: {
  [query: string]: string | string[] | number[]
}): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(ProductEndpoints.PRODUCTS, {
      params,
    })

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const getProductById = async (orderId: string): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(ProductEndpoints.PRODUCTS + orderId)

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const createProduct = async (formData: FormData): Promise<IResponse> => {
  try {
    const data = await axiosInstance.post(
      ProductEndpoints.CREATE_PRODUCT,
      formData,
      {
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: 'Պարամետրերը բացակայում են',
    }
  }
}

export const updateProduct = async (
  formData: FormData,
  id: number
): Promise<IResponse> => {
  try {
    const data = await axiosInstance.put(
      ProductEndpoints.PRODUCTS + id,
      formData,
      {
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const removeProduct = async (orderId: string): Promise<IResponse> => {
  try {
    const data = await axiosInstance.delete(ProductEndpoints.PRODUCTS + orderId)

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}