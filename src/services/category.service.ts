import { CategoryEndpoints } from 'types/endpoints.types'
import { axiosInstance } from './axios.service'
import { IResponse } from 'types/response.types'
import { ICategory } from 'types/category.types'

export const getAllCategories = async (): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(CategoryEndpoints.CATEGORIES)

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const createCategory = async (
  CategoryData: ICategory
): Promise<IResponse> => {
  try {
    const data = await axiosInstance.post(
      CategoryEndpoints.CREATE_CATEGORY,
      CategoryData
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.response.data.message,
    }
  }
}

export const updateCategory = async (
  CategoryData: ICategory
): Promise<IResponse> => {
  try {
    const data = await axiosInstance.put(
      CategoryEndpoints.UPDATE_CATEGORY + CategoryData.id,
      CategoryData
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const removeCategory = async (
  CategoryData: number
): Promise<IResponse> => {
  try {
    const data = await axiosInstance.delete(
      CategoryEndpoints.DELETE_CATEGORY + CategoryData
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}
