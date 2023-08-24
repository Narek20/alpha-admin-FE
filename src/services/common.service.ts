import { axiosInstance } from "./axios.service"
import { IResponse } from "types/response.types"
import { CommonEndpoints } from "types/endpoints.types"

export const searchAll = async (
  searchTerms: string,
  abortController?: AbortController
): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(CommonEndpoints.SEARCH, {
      params: {
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