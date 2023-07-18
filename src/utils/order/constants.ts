import { OrderStatus, OrderTableKeysType, IOrder } from 'types/order.types'

export const OrderTableColumns = [
  'Համարը',
  'Պատվիրատու',
  'Հեռախոսահամար',
  'Հասցեն',
  'Ստեղծման օրը',
  'Ստատուսը',
  'Գործողություններ',
]

export const OrderTableKeys = [
  OrderTableKeysType.ID,
  OrderTableKeysType.FULL_NAME,
  OrderTableKeysType.PHONE,
  OrderTableKeysType.ADDRESS,
  OrderTableKeysType.FORMATTED_DATE,
]
export const CreateOrderKeys = [
  OrderTableKeysType.FULL_NAME,
  OrderTableKeysType.PHONE,
  OrderTableKeysType.ADDRESS,
]

export const OrderStatuses = [
  OrderStatus.COMPLETED,
  OrderStatus.ISSUE,
  OrderStatus.DELIVERY,
  OrderStatus.PACKING,
  OrderStatus.RECEIVED,
]

export const OrderDetailsKeys = [
  {
    label: 'Պատվիրատու',
    key: OrderTableKeysType.FULL_NAME,
  },
  {
    label: 'Հեռախոսահամար',
    key: OrderTableKeysType.PHONE,
  },
  {
    label: 'Հասցե',
    key: OrderTableKeysType.ADDRESS,
  },
  {
    label: 'Ստեղծվել է',
    key: OrderTableKeysType.FORMATTED_DATE,
  },
  {
    label: 'Թարմացվել է',
    key: OrderTableKeysType.FORMATTED_DATE,
  },
  {
    label: 'Նշումներ',
    key: OrderTableKeysType.NOTES,
  },
]

export const orderStatusStyles = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.ISSUE:
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

export const orderRowColor = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.ISSUE:
      return '#FF0000'
    case OrderStatus.PACKING:
      return '#881AD7'
    case OrderStatus.DELIVERY:
      return '#F4CB00'
    case OrderStatus.COMPLETED:
      return '#C4C4C4'
    case OrderStatus.SPECIAL_ORDER:
      return '#4984E5'
    default:
      return '#A4F46B'
  }
}
