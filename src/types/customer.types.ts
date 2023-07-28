import { IOrder } from "./order.types"

export interface ICustomer {
  id: number,
  fullName: string,
  phone: string
  orders: IOrder[]
}