import { OrderStatus, OrderTableKeysType } from 'types/order.types'

export const OrderTableColumns = [
  'Համարը',
  'Պատվիրատու',
  'Հեռախոսահամար',
  'Հասցեն',
  'Ստեղծման օրը',
  'Գործողություններ',
]

export const OrderTableKeys = [
  OrderTableKeysType.ID,
  OrderTableKeysType.CUSTOMER_NAME,
  OrderTableKeysType.CUSTOMER_PHONE,
  OrderTableKeysType.ADDRESS,
  OrderTableKeysType.CREATED_AT,
]

export const OrderStatuses = [
  OrderStatus.COMPLETED,
  OrderStatus.CANCELED,
  OrderStatus.DELIVERY,
  OrderStatus.PACKING,
  OrderStatus.PENDING,
]

export const orderStatusStyles = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.CANCELED:
      return 'canceled'
    case OrderStatus.PACKING:
      return 'packing'
    case OrderStatus.DELIVERY:
      return 'delivery'
    case OrderStatus.COMPLETED:
      return 'completed'
    default:
      return 'received'
  }
}

export const orderRowColor = (status: OrderStatus) : string => {
  switch (status) {
    case OrderStatus.CANCELED:
      return '#FF0000'
    case OrderStatus.PACKING:
      return '#881AD7'
    case OrderStatus.DELIVERY:
      return '#067B00'
    case OrderStatus.COMPLETED:
      return '#CCCCCC'
    default:
      return '#4984E5'
  }
}
