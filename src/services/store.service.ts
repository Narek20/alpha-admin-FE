import { axiosInstance } from './axios.service'
import { IResponse } from 'types/response.types'
import { IStoreItem } from 'types/store.types'
import { StoreEndpoints } from 'types/endpoints.types'

export const searchAllStoreItems = async (
  params?: {
    [query: string]: string | number | string[] | number[]
  },
  abortController?: AbortController,
): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(StoreEndpoints.SEARCH_ITEMS, {
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

export const getItemById = async (itemId: string): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(
      StoreEndpoints.GET_ITEM_BY_ID + itemId,
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const placeOrder = async (storeItem: IStoreItem): Promise<IResponse> => {
  try {
    const data = await axiosInstance.post(StoreEndpoints.PLACE_ORDER, storeItem)

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.response.data.message,
    }
  }
}

export const updateOrder = async (storeItem: IStoreItem): Promise<IResponse> => {
  try {
    const data = await axiosInstance.put(
      StoreEndpoints.GET_ITEMS + storeItem.id,
      storeItem,
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const removeOrder = async (orderId: number): Promise<IResponse> => {
  try {
    const data = await axiosInstance.delete(
      StoreEndpoints.DELETE_ORDER + orderId,
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}
