import { axiosInstance } from './axios.service'
import { ICreateProduct, IProduct } from 'types/product.types'
import { IResponse } from 'types/response.types'
import { ProductEndpoints } from 'types/endpoints.types'

export const getAllProducts = async (
  params?: {
    [query: string]: string | string[] | number[]
  },
  abortController?: AbortController,
): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(ProductEndpoints.PRODUCTS, {
      params,
      signal: abortController?.signal,
    })

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const search = async (
  searchTerm: string,
  abortController?: AbortController,
  categories?: string,
): Promise<IResponse> => {
  try {
    const data = await axiosInstance.post(ProductEndpoints.SEARCH, {
      params: { search: searchTerm },
      signal: abortController?.signal,
      categories
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
    const data = await axiosInstance.get(ProductEndpoints.GET_ONE + orderId)

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
      },
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.response.data.message,
    }
  }
}

export const updateProduct = async (
  formData: FormData,
  id: number,
): Promise<IResponse> => {
  try {
    const data = await axiosInstance.put(
      ProductEndpoints.GET_ONE + id,
      formData,
      {
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const removeProduct = async (productId: string): Promise<IResponse> => {
  try {
    const data = await axiosInstance.delete(
      ProductEndpoints.GET_ONE + productId,
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}
