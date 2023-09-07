import { axiosInstance } from './axios.service'
import { IOrder, StatusCounts } from 'types/order.types'
import { IResponse } from 'types/response.types'
import { OrderEndpoints } from 'types/endpoints.types'

export const getAllOrders = async (
  params?: {
    [query: string]: string | string[] | number[]
  },
  abortController?: AbortController,
): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(OrderEndpoints.GET_ORDERS, {
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

export const searchAllOrders = async (
  searchTerms?: string,
  params?: {
    [query: string]: string | string[] | number[]
  },
  abortController?: AbortController,
): Promise<IResponse & { statusCounts?: StatusCounts }> => {
  try {
    const data = await axiosInstance.get(OrderEndpoints.SEARCH_ORDERS, {
      params: {
        ...params,
        search: searchTerms,
      },
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

export const getOrderById = async (orderId: string): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(
      OrderEndpoints.GET_ORDER_BY_ID + orderId,
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const placeOrder = async (orderData: IOrder): Promise<IResponse> => {
  try {
    const data = await axiosInstance.post(OrderEndpoints.PLACE_ORDER, orderData)

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.response.data.message,
    }
  }
}

export const updateOrder = async (orderData: IOrder): Promise<IResponse> => {
  try {
    const data = await axiosInstance.put(
      OrderEndpoints.GET_ORDERS + orderData.id,
      orderData,
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
      OrderEndpoints.DELETE_ORDER + orderId,
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}
