export type IResponse = {
  success: boolean
  message: string
  data?: any
  token?: string
  pagination?: {
    count: number
    take: number
    skip: number
  }
}
