import { OrderStatus, OrderTableKeysType } from 'types/order.types'

export const OrderTableColumns = [
  'Համարը',
  'Պատվիրատու',
  'Հեռախոսահամար',
  'Ապրանքը',
  'Տիպը',
  'Հասցեն',
  'Ստեղծման օրը',
  'Քանակը',
  'Պահեստ',
  'Գինը',
  'Կարգավիճակը',
  'Գործողություններ',
]

export const OrderTableKeys = [
  OrderTableKeysType.ID,
  OrderTableKeysType.CUSTOMER_NAME,
  OrderTableKeysType.CUSTOMER_PHONE,
  OrderTableKeysType.TITLE,
  OrderTableKeysType.CATEGORY,
  OrderTableKeysType.ADDRESS,
  OrderTableKeysType.CREATED_AT,
  OrderTableKeysType.QUANTITY,
  OrderTableKeysType.STORAGE,
  OrderTableKeysType.PRICE,
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
