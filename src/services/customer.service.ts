import { axiosInstance } from './axios.service'
import { IResponse } from 'types/response.types'
import { CustomerEndpoints } from 'types/endpoints.types'

export const getOneCustomer = async (fullName: string): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(CustomerEndpoints.CUSTOMER + fullName)

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}
