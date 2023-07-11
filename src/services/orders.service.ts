import { axiosInstance } from "./axios.service";
import { IOrder } from "types/order.types";
import { IResponse } from "types/response.types";
import { OrderEndpoints } from "types/endpoints.types";

export const getOrders = async (userId: string): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(
      OrderEndpoints.GET_CURRENT_ORDERS + userId
    );

    return data.data;
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export const getOrdersHistory = async (userId: string): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(
      OrderEndpoints.GET_ORDERS_HISTORY + userId
    );

    return data.data;
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export const getOrdersById = async (orderId: string): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(
      OrderEndpoints.GET_ORDER_BY_ID + orderId
    );

    return data.data;
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export const placeOrder = async (
  orderData: IOrder
): Promise<IResponse> => {
  try {
    const data = await axiosInstance.post(
      OrderEndpoints.PLACE_ORDER,
      orderData
    );

    return data.data;
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export const removeOrder = async (orderId: string): Promise<IResponse> => {
  try {
    const data = await axiosInstance.delete(
      OrderEndpoints.DELETE_ORDER + orderId
    );

    return data.data;
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};