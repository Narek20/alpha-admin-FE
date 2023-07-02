export interface IOrdersContext {
  orders: OrderType[] | []
}

export type OrderType = {
  id: number
  title: string
  category: string
  brand: string
  img: string
  updatedAt: string
  createdAt: string
  storage: string
  color: string
  size: string
  status: OrderStatus
  address: string
  customer_phone: string
  customer_name: string
  quantity: number
  isDrafted: boolean
  price: string
}

export enum OrderStatus {
  COMPLETED = 'Ավարտված է',
  PENDING = 'Ընդունված է',
  DELIVERY = 'Առաքվում է',
  PACKING = 'Փաթեթավորվում է',
  CANCELED = 'Չեղարկված է',
}

export enum OrderTableKeysType {
  ID = 'id',
  CUSTOMER_NAME = 'customer_name',
  CUSTOMER_PHONE = 'customer_phone',
  TITLE = 'title',
  ADDRESS = 'address',
  CATEGORY = 'category',
  STORAGE = 'storage',
  CREATED_AT = 'createdAt',
  QUANTITY = 'quantity',
  PRICE = 'price',
  STATUS = 'status',
}
