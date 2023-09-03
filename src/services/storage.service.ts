import { axiosInstance } from './axios.service'
import { IStorage } from 'types/storage.types'
import { IResponse } from 'types/response.types'
import { StorageEndpoints } from 'types/endpoints.types'

export const getAllStorageImports = async (params?: {
  [query: string]: string | string[] | number[]
}): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(StorageEndpoints.STORAGE_IMPORTS, {
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

export const getStorageImportById = async (
  storageId: string,
): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(
      StorageEndpoints.STORAGE_IMPORTS + storageId,
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const getAllStorages = async () => {
  try {
    const data = await axiosInstance.get(StorageEndpoints.STORAGES)

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const createStorageImports = async (
  storageData: IStorage,
): Promise<IResponse> => {
  try {
    const data = await axiosInstance.post(
      StorageEndpoints.ADD_STORAGE_IMPORTS,
      storageData,
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.response.data.message,
    }
  }
}

export const updateStorageImports = async (
  storageData: IStorage,
): Promise<IResponse> => {
  try {
    const data = await axiosInstance.put(
      StorageEndpoints.UPDATE_STORAGE_IMPORT + storageData.id,
      storageData,
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const removeStorageImports = async (
  storageId: number,
): Promise<IResponse> => {
  try {
    const data = await axiosInstance.delete(
      StorageEndpoints.DELETE_STORAGE_IMPORTS + storageId,
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}
