export type IResponse = {
  success: boolean
  message: string
  data?: any
  accessToken?: string
  pagination?: {
    count: number
    take: number
    skip: number
  }
}
