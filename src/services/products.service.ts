import { axiosInstance } from './axios.service'
import { ICreateProduct, IProduct } from 'types/product.types'
import { IResponse } from 'types/response.types'
import { ProductEndpoints } from 'types/endpoints.types'

export const getAllProducts = async (): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(ProductEndpoints.GET_PRODUCTS)

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
    const data = await axiosInstance.get(
      ProductEndpoints.GET_PRODUCTS_BY_ID + orderId
    )

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
      message: err.message,
    }
  }
}

export const removeProduct = async (orderId: string): Promise<IResponse> => {
  try {
    const data = await axiosInstance.delete(
      ProductEndpoints.DELETE_PRODUCT + orderId
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}
