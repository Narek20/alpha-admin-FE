import { OrderStatus, OrderTableKeysType } from 'types/order.types'

export const OrderTableColumns = [
  'Համարը',
  'Պատվիրատու',
  'Հեռախոս',
  'Հասցե',
  'Նշումներ',
  'Ստեղծման օր',
  'Առաքման օր',
  'Ստատուսը',
  'Գործողություններ',
]

export const OrderTableKeys = [
  OrderTableKeysType.ID,
  OrderTableKeysType.FULL_NAME,
  OrderTableKeysType.PHONE,
  OrderTableKeysType.ADDRESS,
  OrderTableKeysType.NOTES,
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
    label: 'Առաքիչ',
    key: OrderTableKeysType.DRIVER,
  },
  {
    label: 'Առաքման օրը',
    key: OrderTableKeysType.DELIVERY_DATE,
  },
  {
    label: 'Ստեղծվել է',
    key: OrderTableKeysType.FORMATTED_DATE,
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
      return '#FF00FE'
    case OrderStatus.DELIVERY:
      return '#FFFD02'
    case OrderStatus.COMPLETED:
      return '#B7B7B7'
    default:
      return '#FE9901'
  }
}
